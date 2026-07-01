import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, SectionTitle, Lead, Card, GoldLink, GhostLink } from "@/components/ui";
import { createServiceClient } from "@/lib/supabase";
import { paymentsConfigured } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Bedankt",
  description: "Je bestelling is genoteerd.",
};

const PORTAL_PATHS: Record<string, string> = {
  patroonwijzer: "/portaal/patroonwijzer",
  "van-dragen-naar-kiezen": "/portaal/online-programmas",
  wortels: "/portaal/online-programmas",
  raak: "/portaal/online-programmas",
  adem: "/portaal/online-programmas",
  wending: "/portaal/online-programmas",
};

interface OrderRow {
  product_name: string;
  product_slug: string;
  fulfillment: string;
  status: string;
  amount_cents: number;
  invite_token: string | null;
  customer_first_name: string;
}

export default async function BedanktPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  let order: OrderRow | null = null;
  if (orderId) {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("orders")
      .select("product_name, product_slug, fulfillment, status, amount_cents, invite_token, customer_first_name")
      .eq("id", orderId)
      .single();
    order = (data as OrderRow | null) ?? null;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const dormant = !paymentsConfigured();
  const isPaid = (order?.amount_cents ?? 0) > 0;
  const hasScan = !!order?.invite_token;
  const portalPath = order?.product_slug ? PORTAL_PATHS[order.product_slug] : undefined;
  const hasPortal = !!portalPath && order?.fulfillment === "program";

  function pageTitle() {
    if (hasScan) return "Je scan staat klaar";
    if (hasPortal) return "Je toegang is actief";
    return "Je bestelling is genoteerd";
  }

  function leadCopy() {
    if (!order) return "Bedankt! Je ontvangt snel een persoonlijke uitnodiging in je inbox.";
    if (hasScan) return "Klik hieronder om direct te beginnen. Je ontvangt je persoonlijke rapport zodra je de vragenlijst hebt ingevuld.";
    if (hasPortal) return "Je programma staat direct klaar in de VIVYNQ-app. Log in met je e-mailadres — geen wachtwoord, gewoon een code in je inbox.";
    return "We gaan voor je aan de slag. Je ontvangt je resultaat binnen één werkdag in je inbox.";
  }

  return (
    <section style={{ paddingTop: "72px" }}>
      <Container>
        <div className="max-w-[680px] mx-auto text-center">
          <Eyebrow>Bedankt{order ? `, ${order.customer_first_name}` : ""}</Eyebrow>
          <SectionTitle style={{ margin: "16px 0 16px" }}>
            {pageTitle()}
          </SectionTitle>

          <Lead style={{ margin: "0 auto 28px", maxWidth: "520px" }}>
            {leadCopy()}
          </Lead>

          {/* Scanlink */}
          {hasScan && (
            <Card style={{ textAlign: "left", marginBottom: "20px" }}>
              <p className="font-ui uppercase text-goud" style={{ fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700, marginBottom: "8px" }}>
                {order?.product_name}
              </p>
              <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(200,168,216,0.84)", lineHeight: 1.6, marginBottom: "18px" }}>
                Je persoonlijke scan is klaargezet bij de Vivynq-app. Het invullen
                duurt ongeveer 5 minuten.
              </p>
              <GoldLink href={`${appUrl}/invite/${order!.invite_token}`}>Start de vragenlijst →</GoldLink>
            </Card>
          )}

          {/* Portaallink voor programma-producten */}
          {hasPortal && (
            <Card style={{ textAlign: "left", marginBottom: "20px" }}>
              <p className="font-ui uppercase text-goud" style={{ fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700, marginBottom: "8px" }}>
                {order?.product_name}
              </p>
              <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(200,168,216,0.84)", lineHeight: 1.6, marginBottom: "18px" }}>
                Jouw eerste module staat klaar. Je logt in via je e-mailadres — je ontvangt
                een eenmalige inlogcode in je inbox. Module 1 is direct ontgrendeld.
              </p>
              <GoldLink href={`${appUrl}${portalPath}`}>Open het portaal →</GoldLink>
            </Card>
          )}

          {/* Testmodus-banner bij dormant betalingen */}
          {dormant && isPaid && (
            <div style={{ background: "rgba(183,119,13,0.12)", border: "1px solid rgba(183,119,13,0.4)", padding: "16px 18px", textAlign: "left", marginBottom: "24px" }}>
              <p className="font-ui" style={{ fontSize: "0.78rem", color: "#E8C07A", lineHeight: 1.6 }}>
                <strong>Testmodus.</strong> Online betalen is nog niet geactiveerd, dus
                deze bestelling is genoteerd zonder betaling. Zodra de Stripe-koppeling
                live staat, loopt elke koop automatisch via iDEAL of creditcard — zonder
                verdere aanpassingen.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            <GhostLink href="/">Terug naar home</GhostLink>
            <Link href="/programmas" className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(200,168,216,0.7)", alignSelf: "center" }}>
              Bekijk andere programma&apos;s
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
