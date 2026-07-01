import "server-only";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase";
import { provisionScan, provisionProgram, provisionSubscription } from "@/lib/fulfillment";
import { getProduct } from "@/lib/products";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return new Response("Stripe niet geconfigureerd", { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret ontbreekt", { status: 503 });
  }

  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return new Response("Geen Stripe-signature", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return new Response("Webhook-verificatie mislukt", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id ?? null;

    if (!orderId) {
      return new Response("Geen order_id in sessie-metadata", { status: 400 });
    }

    const supabase = createServiceClient();
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return new Response("Bestelling niet gevonden", { status: 404 });
    }

    if (order.status === "fulfilled") {
      return new Response("Bestelling al verwerkt", { status: 200 });
    }

    const product = getProduct(order.product_slug);
    if (!product) {
      return new Response("Product niet gevonden", { status: 404 });
    }

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
          .update({ scan_id: prov.scanId, invite_token: prov.token, status: "fulfilled" })
          .eq("id", orderId);
      } else if (product.fulfillment === "program") {
        await provisionProgram(customer, product.slug);
        await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
      } else if (product.fulfillment === "subscription") {
        await provisionSubscription(customer, product.priceCents);
        await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
      } else {
        await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
      }
    } catch (provisionError) {
      console.error("Fulfillment mislukt voor order", orderId, provisionError);
      return new Response("Fulfillment mislukt", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
