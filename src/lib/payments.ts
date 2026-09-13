import "server-only";

/**
 * Betalingen lopen via Mollie (iDEAL, creditcard), net als in vivynq-app.
 * Er wordt bewust geen npm-pakket gebruikt: de app spreekt de Mollie REST API
 * rechtstreeks aan, en die conventie houden we hier aan.
 */

const MOLLIE_API = "https://api.mollie.com/v2";

/** Mollie is actief zodra de API-sleutel in de omgeving staat. */
export function paymentsConfigured(): boolean {
  return !!process.env.MOLLIE_API_KEY;
}

export interface PaymentArgs {
  orderId: string;
  amountCents: number;
  description: string;
  customerEmail?: string;
  redirectUrl: string;
  webhookUrl: string;
}

export interface PaymentResult {
  url?: string;
  paymentId?: string;
  error?: string;
}

export interface MolliePayment {
  id: string;
  status: string;
  amount?: { currency: string; value: string };
  metadata?: { order_id?: string } | null;
}

/** Maakt een Mollie-betaling aan en geeft de checkout-URL terug. */
export async function createMolliePayment(args: PaymentArgs): Promise<PaymentResult> {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) return { error: "Online betalen is niet geactiveerd." };
  if (args.amountCents <= 0) return { error: "Bedrag moet groter dan nul zijn." };

  try {
    const res = await fetch(`${MOLLIE_API}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: { currency: "EUR", value: (args.amountCents / 100).toFixed(2) },
        description: args.description.slice(0, 255) || "VIVYNQ",
        redirectUrl: args.redirectUrl,
        webhookUrl: args.webhookUrl,
        billingEmail: args.customerEmail || undefined,
        metadata: { order_id: args.orderId },
        locale: "nl_NL",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      // Nooit de ruwe providerfout naar de browser sturen.
      console.error("Mollie: betaling aanmaken mislukt", data);
      return { error: "Betaling starten lukte niet. Probeer het later opnieuw." };
    }

    return { url: data?._links?.checkout?.href, paymentId: data?.id };
  } catch (e) {
    console.error("Mollie: betaling aanmaken mislukt", e);
    return { error: "Betaling starten lukte niet. Probeer het later opnieuw." };
  }
}

/**
 * Haalt een betaling op bij Mollie. Dit is de kern van de webhookbeveiliging:
 * de webhook van Mollie bevat alleen een id, dus de status wordt altijd bij de
 * bron opgehaald en nooit uit het verzoek zelf overgenomen.
 */
export async function getMolliePayment(paymentId: string): Promise<MolliePayment | null> {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(`${MOLLIE_API}/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return null;
    return (await res.json()) as MolliePayment;
  } catch (e) {
    console.error("Mollie: betaling ophalen mislukt", e);
    return null;
  }
}
