import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { CheckoutForm } from "@/components/checkout-form";
import { getProduct } from "@/lib/products";

type Props = { searchParams: Promise<{ product?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { product: slug } = await searchParams;
  const product = slug ? getProduct(slug) : undefined;
  return {
    title: product ? `Afrekenen · ${product.name} — VIVYNQ` : "Afrekenen — VIVYNQ",
  };
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="7.5" cy="7.5" r="7" stroke="rgba(201,168,76,0.30)" strokeWidth="1" />
      <path d="M4.5 7.7l2 2.3 4-4.5" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default async function AfrekenPage({ searchParams }: Props) {
  const { product: slug } = await searchParams;

  if (!slug) notFound();
  const product = getProduct(slug);
  // Block free lead magnets (no payment flow), allow paid lead products (e.g. Systemisch Portret)
  if (!product || (product.fulfillment === "lead" && product.priceCents === 0)) notFound();

  const isProgram = product.fulfillment === "program";
  const isScan = product.fulfillment === "scan";

  const backHref =
    product.fulfillment === "scan" ? "/scan" :
    product.fulfillment === "program" ? `/programma/${product.slug}` :
    product.fulfillment === "lead" ? `/programma/${product.slug}` :
    "/programmas";

  return (
    <>
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "80px", paddingBottom: "64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)" }} />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Link
            href={backHref}
            className="font-ui uppercase"
            style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "rgba(201,168,76,0.55)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "22px" }}
          >
            ← Terug naar {product.name}
          </Link>
          <div className="vq-rise">
            <Eyebrow>Afrekenen</Eyebrow>
          </div>
          <h1
            className="font-display text-white vq-rise-2"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1, margin: "16px 0 0", fontWeight: 500 }}
          >
            {product.name}
          </h1>
          <p className="font-ui vq-rise-3" style={{ fontSize: "0.96rem", color: "rgba(250,248,242,0.62)", marginTop: "12px", maxWidth: "520px", lineHeight: 1.75 }}>
            {product.tagline}
          </p>
        </Container>
      </section>

      {/* ── CHECKOUT GRID ────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "64px", paddingBottom: "88px" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Links: wat je krijgt */}
            <div>
              <p className="font-ui uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(15,3,24,0.42)", marginBottom: "20px" }}>
                Inbegrepen
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {product.inhoud.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <Check />
                    <span className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(15,3,24,0.72)", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Belofte badge */}
              <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.22)", borderRadius: "2px", padding: "14px 18px", display: "inline-flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "#C9A84C", marginTop: "1px" }}>
                  <LockIcon />
                </span>
                <div>
                  <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", fontWeight: 700, color: "rgba(15,3,24,0.42)", marginBottom: "3px" }}>
                    Veilig & privé
                  </p>
                  <p className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(15,3,24,0.60)", lineHeight: 1.55 }}>
                    {isProgram
                      ? "Direct toegang na betaling · portaal beschermd met e-mailcode"
                      : product.belofte}
                  </p>
                </div>
              </div>

              {product.duur && (
                <div style={{ marginTop: "16px", background: "#fff", border: "1px solid rgba(15,3,24,0.07)", borderRadius: "2px", padding: "14px 18px" }}>
                  <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", fontWeight: 700, color: "rgba(15,3,24,0.38)", marginBottom: "3px" }}>
                    Doorlooptijd
                  </p>
                  <p className="font-display" style={{ fontSize: "1.05rem", color: "#0F0318" }}>{product.duur}</p>
                </div>
              )}
            </div>

            {/* Rechts: prijs + formulier */}
            <div>
              <div style={{ background: "#0F0318", border: "1px solid rgba(201,168,76,0.22)", borderRadius: "3px", padding: "32px 30px" }}>
                {/* Prijs */}
                <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", color: "rgba(201,168,76,0.55)", marginBottom: "8px" }}>
                    Totaal
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display" style={{ fontSize: "2.6rem", color: "#C9A84C", lineHeight: 1 }}>
                      {product.priceLabel}
                    </span>
                    {product.recurringLabel && (
                      <span className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(201,168,76,0.50)" }}>
                        {product.recurringLabel}
                      </span>
                    )}
                  </div>
                  <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(200,168,216,0.45)", marginTop: "6px" }}>
                    Incl. btw · eenmalige betaling
                  </p>
                </div>

                {/* Formulier */}
                <CheckoutForm
                  slug={product.slug}
                  ctaLabel={product.cta}
                  priceLabel={product.priceLabel}
                  isScan={isScan}
                />
              </div>

              {/* Vertrouwen-strip */}
              <div className="grid grid-cols-3 gap-3" style={{ marginTop: "16px" }}>
                {[
                  { icon: "🔒", label: "Veilige betaling" },
                  { icon: "✓", label: "Direct toegang" },
                  { icon: "★", label: "DISC gecertificeerd" },
                ].map((t) => (
                  <div key={t.label} style={{ background: "#fff", border: "1px solid rgba(15,3,24,0.06)", borderRadius: "2px", padding: "10px 12px", textAlign: "center" }}>
                    <p style={{ fontSize: "1rem", marginBottom: "3px" }}>{t.icon}</p>
                    <p className="font-ui" style={{ fontSize: "0.65rem", color: "rgba(15,3,24,0.48)", letterSpacing: "0.04em", lineHeight: 1.3 }}>{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "40px", paddingBottom: "40px" }}>
        <Container>
          <p className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(200,168,216,0.35)", lineHeight: 1.78, maxWidth: "640px" }}>
            Vivynq levert coaching, geen therapie. Dit programma is niet bedoeld voor mensen met acute
            psychische klachten of een actieve behandeling. Bij twijfel adviseer ik altijd eerst een
            bevoegd behandelaar te raadplegen.{" "}
            <Link href="/voorwaarden" style={{ color: "rgba(201,168,76,0.45)", textDecoration: "underline" }}>
              Algemene voorwaarden
            </Link>{" "}
            ·{" "}
            <Link href="/privacybeleid" style={{ color: "rgba(201,168,76,0.45)", textDecoration: "underline" }}>
              Privacybeleid
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
