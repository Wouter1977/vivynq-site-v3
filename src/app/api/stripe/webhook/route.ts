import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/payments";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;
      if (!orderId) break;

      await supabase
        .from("orders")
        .update({
          status: "paid",
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
        })
        .eq("id", orderId);

      // Scan-orders met invite_token → status fulfilled (scan is al klaargemaakt).
      const { data: order } = await supabase
        .from("orders")
        .select("fulfillment, invite_token")
        .eq("id", orderId)
        .single();

      if (order?.invite_token) {
        await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const orderId = sub.metadata?.order_id;
      if (orderId) {
        await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
