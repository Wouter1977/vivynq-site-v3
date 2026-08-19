import "server-only";
import {
  createMollieClient,
  Locale,
  PaymentMethod,
  SequenceType,
  type MollieClient,
  type PaymentCreateParams,
} from "@mollie/api-client";

const mollie: MollieClient | null = process.env.MOLLIE_API_KEY
  ? createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })
  : null;

export function paymentsConfigured(): boolean {
  return !!mollie;
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

function toEuroValue(cents: number): string {
  return (cents / 100).toFixed(2);
}

export async function createCheckoutSession(args: CheckoutArgs): Promise<CheckoutResult> {
  if (!mollie) {
    return { configured: false, error: "Online betalen is nog niet geactiveerd." };
  }
  if (args.amountCents <= 0) {
    return { configured: true, error: "Bedrag moet groter dan nul zijn." };
  }

  const finalAmount =
    args.discountPercent && args.discountPercent > 0
      ? Math.round(args.amountCents * (1 - args.discountPercent / 100))
      : args.amountCents;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3300";
  const webhookUrl = `${siteUrl}/api/mollie/webhook`;

  try {
    // Voor een terugkerend abonnement leggen we eerst een Mollie-klant vast: de
    // eerste betaling (sequenceType "first") legt daarna automatisch een mandaat
    // vast waarmee de webhook na bevestiging het maandabonnement kan aanmaken.
    let customerId: string | undefined;
    if (args.recurring && args.customerEmail) {
      const customer = await mollie.customers.create({ email: args.customerEmail });
      customerId = customer.id;
    }

    const params: PaymentCreateParams = {
      amount: { currency: "EUR", value: toEuroValue(finalAmount) },
      description: `${args.productName} — ${args.description}`.slice(0, 255),
      redirectUrl: args.successUrl,
      cancelUrl: args.cancelUrl,
      webhookUrl,
      method: [PaymentMethod.ideal, PaymentMethod.creditcard],
      locale: Locale.nl_NL,
      metadata: {
        order_id: args.orderId,
        ...(args.relatieCode
          ? { relatie_code: args.relatieCode, discount_percent: String(args.discountPercent ?? 0) }
          : {}),
      },
    };
    if (customerId) {
      params.customerId = customerId;
      params.sequenceType = SequenceType.first;
    }

    const payment = await mollie.payments.create(params);

    return { configured: true, url: payment.getCheckoutUrl() ?? undefined };
  } catch (e) {
    return { configured: true, error: e instanceof Error ? e.message : "Betaalfout." };
  }
}

export { mollie };
