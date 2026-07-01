import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Container, Eyebrow, SectionTitle, Lead, Card } from "@/components/ui";
import { CheckoutForm } from "@/components/checkout-form";
import { getProduct, PRODUCTS } from "@/lib/products";

// Producten met een eigen pagina worden doorverwezen.
const DEDICATED: Record<string, string> = {
  zelfscan: "/scan",
  teamscan: "/zakelijk",
  // systeemanalyse is een add-on bij het teamtraject — geen losse kooppagina
  systeemanalyse: "/zakelijk",
  // begeleidingsplan is een intern coach-tool — niet via de website te kopen
  begeleidingsplan: "/aanmelden",
  // leiderschapstraining heeft een eigen dedicated landingspagina
  leiderschapstraining: "/product/leiderschapskern",
};

export function generateStaticParams() {
  return PRODUCTS.filter((p) => !DEDICATED[p.slug]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product niet gevonden" };
  return { title: product.name, description: product.marktgat };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (DEDICATED[slug]) redirect(DEDICATED[slug]);

  const product = getProduct(slug);
  if (!product) notFound();

  const isOrder = product.fulfillment === "order";

  return (
    <section style={{ paddingTop: "56px" }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Eyebrow>{product.audience === "zakelijk" ? "Zakelijk" : "Persoonlijk"}</Eyebrow>
            <SectionTitle style={{ margin: "14px 0 16px" }}>{product.name}</SectionTitle>
            <Lead>{product.marktgat}</Lead>

            <div style={{ marginTop: "26px" }}>
              <p className="font-ui uppercase text-goud" style={{ fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700, marginBottom: "12px" }}>
                Wat je krijgt
              </p>
              <ul className="flex flex-col gap-3">
                {product.inhoud.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span style={{ color: "#C9A84C" }}>✓</span>
                    <span className="font-ui" style={{ fontSize: "0.9rem", color: "rgba(200,168,216,0.9)", lineHeight: 1.55 }}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3" style={{ marginTop: "26px", paddingTop: "20px", borderTop: "1px solid rgba(201,168,76,0.14)" }}>
              <span className="font-display text-goud" style={{ fontSize: "2.2rem" }}>{product.priceLabel}</span>
              <span className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(200,168,216,0.7)" }}>
                {product.recurringLabel ?? "eenmalig"} · {product.belofte}
              </span>
            </div>
          </div>

          <div>
            <Card style={{ padding: "30px" }}>
              <h2 className="font-display text-white" style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{product.cta}</h2>
              <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(200,168,216,0.75)", lineHeight: 1.6, marginBottom: "20px" }}>
                {isOrder
                  ? "Vertel ons kort waar het over gaat. Je ontvangt je resultaat in je inbox."
                  : "Vul je gegevens in om te starten."}
              </p>
              <CheckoutForm
                slug={product.slug}
                ctaLabel={product.cta}
                priceLabel={product.priceLabel}
                showMessage={isOrder}
              />
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
