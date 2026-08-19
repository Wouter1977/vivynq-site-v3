import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createMollieClient, PaymentStatus, SequenceType } from "@mollie/api-client";
import { createServiceClient } from "@/lib/supabase";
import { provisionScan, provisionProgram, provisionSubscription, provisionOrder } from "@/lib/fulfillment";
import { getProduct } from "@/lib/products";

const mollie = process.env.MOLLIE_API_KEY
  ? createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })
  : null;

/** Vertaalt een Mollie-betaalstatus naar de status die de orders-tabel gebruikt. */
function orderStatusFor(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.canceled:
    case PaymentStatus.expired:
    case PaymentStatus.failed:
      return "cancelled";
    default:
      return "awaiting_payment";
  }
}

export async function POST(req: NextRequest) {
  if (!mollie) {
    return NextResponse.json({ error: "Mollie niet geconfigureerd" }, { status: 503 });
  }

  // Mollie stuurt alleen een payment-id mee (application/x-www-form-urlencoded, "id=tr_xxx").
  // De payload zelf wordt nooit vertrouwd: we halen de betaling altijd verifieerbaar op bij
  // Mollie zelf met onze eigen API-key — dat is Mollie's equivalent van signature-verificatie.
  const body = await req.text();
  const paymentId = new URLSearchParams(body).get("id");
  if (!paymentId) {
    return NextResponse.json({ error: "Geen payment-id" }, { status: 400 });
  }

  const payment = await mollie.payments.get(paymentId).catch(() => null);
  if (!payment) {
    return NextResponse.json({ error: "Betaling niet gevonden bij Mollie" }, { status: 404 });
  }

  const orderId = (payment.metadata as { order_id?: string } | null)?.order_id;
  if (!orderId) {
    return NextResponse.json({ received: true });
  }

  const supabase = createServiceClient();
  const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (!order) {
    return NextResponse.json({ error: "Bestelling niet gevonden" }, { status: 404 });
  }

  // Idempotent: een retry van dezelfde webhook (of een status-update na fulfillment,
  // bijv. een latere terugboeking) levert een reeds afgeronde order niet opnieuw uit.
  if (order.status === "fulfilled") {
    return NextResponse.json({ received: true });
  }

  if (payment.status !== PaymentStatus.paid) {
    await supabase.from("orders").update({ status: orderStatusFor(payment.status) }).eq("id", orderId);
    return NextResponse.json({ received: true });
  }

  // `stripe_session_id` is de bestaande kolomnaam in de gedeelde orders-tabel
  // (schema leeft in vivynq-app); we hergebruiken 'm hier voor de Mollie payment-id
  // tot die kolom in de app-database hernoemd kan worden.
  await supabase
    .from("orders")
    .update({ status: "paid", stripe_session_id: payment.id })
    .eq("id", orderId);

  const product = getProduct(order.product_slug);
  if (!product) {
    return NextResponse.json({ error: "Product niet gevonden" }, { status: 404 });
  }

  const customer = {
    first_name: order.customer_first_name as string,
    last_name: (order.customer_last_name as string) ?? "",
    email: order.customer_email as string,
  };

  try {
    if (product.fulfillment === "scan") {
      const prov = await provisionScan(customer, product.scanType ?? "persoonlijk", order.amount_cents);
      await supabase
        .from("orders")
        .update({ scan_id: prov.scanId, invite_token: prov.token, status: "fulfilled" })
        .eq("id", orderId);
    } else if (product.fulfillment === "program") {
      await provisionProgram(customer, product.slug, order.amount_cents);
      await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
    } else if (product.fulfillment === "subscription") {
      await provisionSubscription(customer, order.amount_cents);

      // Eerste betaling van een abonnement: het mandaat is nu bevestigd, dus we
      // kunnen het maandelijkse Mollie-abonnement daadwerkelijk aanmaken.
      if (payment.sequenceType === SequenceType.first && payment.customerId && payment.mandateId) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3300";
        await mollie.customerSubscriptions.create({
          customerId: payment.customerId,
          mandateId: payment.mandateId,
          amount: { currency: "EUR", value: (order.amount_cents / 100).toFixed(2) },
          interval: "1 month",
          description: product.name,
          webhookUrl: `${siteUrl}/api/mollie/webhook`,
        });
      }
      await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
    } else if (product.fulfillment === "order") {
      await provisionOrder(customer, product.slug, order.amount_cents);
      await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
    } else {
      await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
    }
  } catch (provisionError) {
    console.error("Fulfillment mislukt voor order", orderId, provisionError);
    return NextResponse.json({ error: "Fulfillment mislukt" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
