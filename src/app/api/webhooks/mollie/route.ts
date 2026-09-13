import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { createServiceClient } from "@/lib/supabase";
import { getMolliePayment } from "@/lib/payments";
import {
  provisionScan,
  provisionProgram,
  provisionOrder,
  provisionSubscription,
} from "@/lib/fulfillment";
import { getProduct } from "@/lib/products";

const MOLLIE_ID_RE = /^tr_[A-Za-z0-9]{10,}$/;

/**
 * Mollie stuurt alleen een betaal-id. De echte controle is dat we de betaling
 * daarna bij Mollie zelf ophalen en pas leveren bij status "paid" én een bedrag
 * dat overeenkomt met de bestelling. De HMAC-controle hieronder is een extra
 * laag en spiegelt de aanpak in vivynq-app.
 */
function verifySignature(req: Request, rawBody: string): boolean {
  const secret = process.env.MOLLIE_WEBHOOK_SECRET;
  if (!secret) return false;

  const signature = req.headers.get("Mollie-Signature");
  if (!signature) return false;

  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signature);
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}

export async function POST(req: Request) {
  if (!process.env.MOLLIE_API_KEY) {
    return new Response("Betaalkoppeling niet geconfigureerd", { status: 503 });
  }

  const rawBody = await req.text();

  if (!verifySignature(req, rawBody)) {
    return new Response("Ongeldige handtekening", { status: 403 });
  }

  const paymentId = new URLSearchParams(rawBody).get("id");
  if (!paymentId || !MOLLIE_ID_RE.test(paymentId)) {
    // Niets te doen, maar wel een 200 zodat Mollie niet blijft herhalen.
    return new Response("ok", { status: 200 });
  }

  const payment = await getMolliePayment(paymentId);
  if (!payment) {
    // Ophalen mislukt: 500 zodat Mollie het opnieuw probeert.
    return new Response("Betaling niet op te halen", { status: 500 });
  }

  // Alleen een daadwerkelijk betaalde betaling leidt tot levering.
  if (payment.status !== "paid") {
    return new Response("ok", { status: 200 });
  }

  const orderId = payment.metadata?.order_id;
  if (!orderId) return new Response("ok", { status: 200 });

  const supabase = createServiceClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, status, product_slug, amount_cents, customer_first_name, customer_last_name, customer_email")
    .eq("id", orderId)
    .maybeSingle();

  if (error) return new Response("Databasefout", { status: 500 });
  if (!order) return new Response("ok", { status: 200 });

  // Idempotent: al geleverd, dan niets opnieuw doen.
  if (order.status === "fulfilled") {
    return new Response("ok", { status: 200 });
  }

  // Het betaalde bedrag moet overeenkomen met de bestelling, zodat een te lage
  // betaling nooit tot levering leidt.
  const betaaldCents = Math.round(parseFloat(payment.amount?.value ?? "0") * 100);
  if (!Number.isFinite(betaaldCents) || betaaldCents < (order.amount_cents as number)) {
    console.error(
      `Mollie: bedrag komt niet overeen voor bestelling ${orderId} — betaald ${betaaldCents}, verwacht ${order.amount_cents}`
    );
    await supabase
      .from("orders")
      .update({ status: "payment_mismatch", payment_provider: "mollie", payment_id: paymentId })
      .eq("id", orderId);
    return new Response("ok", { status: 200 });
  }

  const product = getProduct(order.product_slug as string);
  if (!product) return new Response("ok", { status: 200 });

  const customer = {
    first_name: order.customer_first_name as string,
    last_name: (order.customer_last_name as string) ?? "",
    email: order.customer_email as string,
  };

  try {
    if (product.fulfillment === "scan") {
      const prov = await provisionScan(customer, product.scanType ?? "persoonlijk");
      await supabase
        .from("orders")
        .update({
          scan_id: prov.scanId,
          invite_token: prov.token,
          status: "fulfilled",
          payment_provider: "mollie",
          payment_id: paymentId,
        })
        .eq("id", orderId);
      return new Response("ok", { status: 200 });
    }

    if (product.fulfillment === "program") {
      await provisionProgram(customer, product.slug);
    } else if (product.fulfillment === "order") {
      await provisionOrder(customer, product.slug, order.amount_cents as number);
    } else if (product.fulfillment === "subscription") {
      // Let op: dit levert toegang, maar zet geen terugkerende incasso op. Zodra
      // er werkelijk een abonnementsproduct komt, is een Mollie customer plus
      // subscription nodig, zoals vivynq-app dat voor de meditaties doet.
      await provisionSubscription(customer, order.amount_cents as number);
    }

    await supabase
      .from("orders")
      .update({ status: "fulfilled", payment_provider: "mollie", payment_id: paymentId })
      .eq("id", orderId);

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(`Mollie: levering mislukt voor bestelling ${orderId}`, e);
    // 500 zodat Mollie het opnieuw aanbiedt; de bestelling blijft onafgerond.
    return new Response("Levering mislukt", { status: 500 });
  }
}
