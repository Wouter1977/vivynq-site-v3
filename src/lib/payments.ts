import "server-only";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export function paymentsConfigured(): boolean {
  return !!stripe;
}

export interface CheckoutArgs {
  orderId: string;
  amountCents: number;
  productName: string;
  description: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  recurring?: boolean;
  relatieCode?: string;
  discountPercent?: number;
}

export interface CheckoutResult {
  configured: boolean;
  url?: string;
  error?: string;
}

export async function createCheckoutSession(args: CheckoutArgs): Promise<CheckoutResult> {
  if (!stripe) {
    return { configured: false, error: "Online betalen is nog niet geactiveerd." };
  }
  if (args.amountCents <= 0) {
    return { configured: true, error: "Bedrag moet groter dan nul zijn." };
  }

  const finalAmount =
    args.discountPercent && args.discountPercent > 0
      ? Math.round(args.amountCents * (1 - args.discountPercent / 100))
      : args.amountCents;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: args.recurring ? "subscription" : "payment",
      payment_method_types: ["ideal", "card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: args.productName, description: args.description.slice(0, 500) },
            unit_amount: finalAmount,
            ...(args.recurring ? { recurring: { interval: "month" as const } } : {}),
          },
          quantity: 1,
        },
      ],
      customer_email: args.customerEmail || undefined,
      success_url: args.successUrl,
      cancel_url: args.cancelUrl,
      metadata: {
        order_id: args.orderId,
        ...(args.relatieCode ? { relatie_code: args.relatieCode, discount_percent: String(args.discountPercent ?? 0) } : {}),
      },
      locale: "nl",
    });

    return { configured: true, url: session.url ?? undefined };
  } catch (e) {
    return { configured: true, error: e instanceof Error ? e.message : "Betaalfout." };
  }
}

export { stripe };
