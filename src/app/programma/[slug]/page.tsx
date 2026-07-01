import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow, GoldLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { getProduct, PRODUCTS } from "@/lib/products";
import { ProgrammaReflectie } from "@/components/programma-reflectie";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.filter((p) => p.fulfillment !== "lead").map((p) => ({ slug: p.slug }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3300";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const description = (product.beschrijving ?? product.marktgat ?? "").slice(0, 160);
  const canonical = `${SITE_URL}/programma/${slug}`;
  return {
    title: `${product.name} — VIVYNQ`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${product.name} — VIVYNQ`,
      description,
      url: canonical,
      siteName: "VIVYNQ",
      locale: "nl_NL",
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: `${product.name} — VIVYNQ` }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.fulfillment === "lead") notFound();

  const isZakelijk = product.audience === "zakelijk";
  const needsContact =
    product.fulfillment === "order" &&
    (product.priceCents > 50000 || isZakelijk);

  const buyHref = needsContact ? "/start" : `/afrekenen?product=${product.slug}`;

  const isCourse = product.fulfillment === "program";
  const jsonLd = isCourse
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: product.name,
        description: (product.beschrijving ?? product.marktgat ?? "").slice(0, 300),
        url: `${SITE_URL}/programma/${product.slug}`,
        provider: {
          "@type": "Organization",
          name: "VIVYNQ",
          url: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          price: (product.priceCents / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/afrekenen?product=${product.slug}`,
        },
        courseMode: "online",
        educationalLevel: "beginner",
        inLanguage: "nl",
      }
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: (product.beschrijving ?? product.marktgat ?? "").slice(0, 300),
        url: `${SITE_URL}/programma/${product.slug}`,
        brand: { "@type": "Brand", name: "VIVYNQ" },
        offers: {
          "@type": "Offer",
          price: (product.priceCents / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0F0318",
          paddingTop: "96px",
          paddingBottom: "104px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)" }} />
        </div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="max-w-[780px]">
            <div className="vq-rise">
              <Eyebrow>{isZakelijk ? "Zakelijk" : "Persoonlijk"} · Vivynq</Eyebrow>
            </div>

            {/* Openingsstelling als emotionele haak */}
            {product.openingsstelling && (
              <p
                className="font-display vq-rise"
                style={{
                  fontSize: "clamp(1.05rem, 1.8vw, 1.22rem)",
                  color: "rgba(201,168,76,0.72)",
                  lineHeight: 1.65,
                  marginTop: "16px",
                  maxWidth: "640px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "0.005em",
                }}
              >
                {product.openingsstelling}
              </p>
            )}

            <h1
              className="font-display text-white vq-rise-2"
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                lineHeight: 1.06,
                margin: "22px 0 0",
                letterSpacing: "-0.018em",
                fontWeight: 500,
              }}
            >
              {product.name}
            </h1>

            <p
              className="font-display vq-rise-3"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.14rem)",
                color: "rgba(250,248,242,0.58)",
                lineHeight: 1.72,
                marginTop: "16px",
                maxWidth: "600px",
                fontWeight: 400,
              }}
            >
              {product.tagline}
            </p>

            {product.beschrijving && (
              <div className="vq-rise-3">
                <p className="font-ui" style={{ fontSize: "0.96rem", color: "rgba(250,248,242,0.60)", lineHeight: 1.85, marginTop: "16px", maxWidth: "620px" }}>
                  {product.beschrijving}
                </p>
              </div>
            )}

            <div className="flex items-baseline gap-4 vq-rise-4" style={{ marginTop: "30px" }}>
              <span className="font-display" style={{ fontSize: "2.8rem", color: "#C9A84C", lineHeight: 1 }}>
                {product.priceLabel}
              </span>
              {product.duur && (
                <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(201,168,76,0.50)", letterSpacing: "0.04em" }}>
                  · {product.duur}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 vq-rise-4" style={{ marginTop: "26px" }}>
              <Link
                href={buyHref}
                className="vq-cta font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
                style={{ fontSize: "0.76rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "14px 28px", borderRadius: "2px" }}
              >
                {product.cta} <span className="vq-cta-arrow">→</span>
              </Link>
              <Link
                href={isZakelijk ? "/zakelijk" : "/programmas"}
                className="font-ui uppercase transition-colors"
                style={{ fontSize: "0.72rem", letterSpacing: "0.12em", color: "rgba(250,248,242,0.36)", alignSelf: "center" }}
              >
                ← Terug naar {isZakelijk ? "zakelijk" : "programma's"}
              </Link>
            </div>

            {/* Garantie-badge direct in hero */}
            {product.garantie && (
              <div
                className="vq-rise-4"
                style={{
                  marginTop: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  border: "1px solid rgba(201,168,76,0.20)",
                  borderRadius: "2px",
                }}
              >
                <span aria-hidden="true" style={{ color: "#C9A84C", fontSize: "0.80rem" }}>✓</span>
                <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(250,248,242,0.50)", letterSpacing: "0.02em" }}>
                  {product.garantie}
                </span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── TRANSFORMATIE ARC ────────────────────────────────────────── */}
      {product.transformatie && (
        <section
          className="vq-section-glow"
          style={{ background: "#13052A", paddingTop: "80px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}
        >
          {/* Atmosferische achtergrond */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "50%", left: "25%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)", transform: "translateY(-50%)" }} />
          </div>

          <Container style={{ position: "relative", zIndex: 1 }}>
            <Reveal style={{ marginBottom: "44px" }}>
              <Eyebrow style={{ color: "rgba(201,168,76,0.65)" }}>Wat er verandert</Eyebrow>
              <h2
                className="font-display text-white"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.14, margin: "14px 0 0" }}
              >
                De transformatie, concreet.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4">
              {/* VOOR */}
              <Reveal>
                <div
                  className="vq-glass"
                  style={{ padding: "36px", borderRadius: "3px", height: "100%" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(250,248,242,0.20)", flexShrink: 0 }} />
                    <p
                      className="font-ui uppercase"
                      style={{ fontSize: "0.60rem", letterSpacing: "0.22em", fontWeight: 700, color: "rgba(250,248,242,0.32)" }}
                    >
                      Hoe het nu voelt
                    </p>
                  </div>
                  <p
                    className="font-ui"
                    style={{ fontSize: "1rem", color: "rgba(250,248,242,0.55)", lineHeight: 1.85 }}
                  >
                    {product.transformatie.voor}
                  </p>
                </div>
              </Reveal>

              {/* NA */}
              <Reveal delay={120}>
                <div
                  className="vq-glass-gold"
                  style={{ padding: "36px", borderRadius: "3px", height: "100%" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C9A84C", boxShadow: "0 0 10px rgba(201,168,76,0.60)", flexShrink: 0 }} />
                    <p
                      className="font-ui uppercase"
                      style={{ fontSize: "0.60rem", letterSpacing: "0.22em", fontWeight: 700, color: "#C9A84C" }}
                    >
                      Na dit programma
                    </p>
                  </div>
                  <p
                    className="font-ui"
                    style={{ fontSize: "1rem", color: "rgba(250,248,242,0.88)", lineHeight: 1.85 }}
                  >
                    {product.transformatie.na}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Quote als extra overtuigingslaag */}
            {product.quote && (
              <Reveal delay={150}>
                <blockquote
                  style={{
                    marginTop: "40px",
                    paddingLeft: "28px",
                    borderLeft: "2px solid rgba(201,168,76,0.45)",
                  }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.05rem, 2vw, 1.26rem)",
                      color: "rgba(250,248,242,0.72)",
                      lineHeight: 1.68,
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    "{product.quote}"
                  </p>
                </blockquote>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {/* ── WAT JE KRIJGT ────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Inhoud-checklist */}
            <Reveal>
              <Eyebrow>Wat je krijgt</Eyebrow>
              <h2 className="font-display" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 24px" }}>
                Alles inbegrepen. Niets vaags.
              </h2>
              <ul className="flex flex-col gap-3.5">
                {product.inhoud.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span aria-hidden="true" style={{ width: "20px", height: "20px", background: "#C9A84C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                      <span style={{ fontSize: "0.60rem", color: "#0F0318", fontWeight: 800 }}>✓</span>
                    </span>
                    <span className="font-ui" style={{ fontSize: "0.92rem", color: "rgba(15,3,24,0.76)", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
              {product.duur && (
                <div style={{ marginTop: "28px", padding: "16px 20px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.20)", borderRadius: "2px" }}>
                  <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C", marginBottom: "4px" }}>Doorlooptijd</p>
                  <p className="font-display" style={{ fontSize: "1.10rem", color: "#0F0318" }}>{product.duur}</p>
                </div>
              )}
            </Reveal>

            {/* Marktgat + CTA-kaart */}
            <Reveal delay={120}>
              <div style={{ background: "#fff", border: "1px solid rgba(15,3,24,0.08)", padding: "32px", borderRadius: "3px", marginBottom: "24px" }}>
                <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C", marginBottom: "12px" }}>
                  Waarom dit product?
                </p>
                <p className="font-ui" style={{ fontSize: "0.94rem", color: "rgba(15,3,24,0.70)", lineHeight: 1.82 }}>
                  {product.marktgat}
                </p>
              </div>

              {/* Prijskaart + CTA */}
              <div style={{ background: "#0F0318", border: "1px solid rgba(201,168,76,0.26)", padding: "28px 30px", borderRadius: "3px" }}>
                <div className="flex items-baseline gap-3" style={{ marginBottom: "8px" }}>
                  <span className="font-display" style={{ fontSize: "2.4rem", color: "#C9A84C", lineHeight: 1 }}>{product.priceLabel}</span>
                </div>
                <p className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(250,248,242,0.55)", lineHeight: 1.6, marginBottom: "20px" }}>
                  {product.belofte}
                </p>
                <Link
                  href={buyHref}
                  className="vq-cta font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110 w-full justify-center"
                  style={{ fontSize: "0.74rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "14px 20px", borderRadius: "2px" }}
                >
                  {product.cta} <span className="vq-cta-arrow">→</span>
                </Link>
                <p className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(250,248,242,0.36)", lineHeight: 1.6, marginTop: "12px", textAlign: "center" }}>
                  {needsContact
                    ? "Vrijblijvend kennismakingsgesprek — geen verplichtingen"
                    : "Directe toegang na betaling · Veilig via Stripe"}
                </p>
                {product.urgentie && (
                  <p className="font-ui" style={{ fontSize: "0.70rem", color: "rgba(201,168,76,0.52)", textAlign: "center", marginTop: "8px", letterSpacing: "0.03em" }}>
                    {product.urgentie}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── RESULTAATPROFIEL ────────────────────────────────────────── */}
      {product.resultaatprofiel && product.resultaatprofiel.length > 0 && (
        <section style={{ background: "#fff", paddingTop: "80px", paddingBottom: "80px" }}>
          <Container>
            <Reveal style={{ marginBottom: "40px" }}>
              <Eyebrow>Wat je bereikt</Eyebrow>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 0" }}
              >
                Concrete resultaten.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {product.resultaatprofiel.map((resultaat, i) => (
                <Reveal key={resultaat} delay={i * 80}>
                  <div
                    style={{
                      padding: "28px 24px",
                      background: "#FAF8F2",
                      border: "1px solid rgba(15,3,24,0.06)",
                      borderTop: "3px solid #C9A84C",
                      borderRadius: "0 0 3px 3px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "rgba(201,168,76,0.12)",
                        border: "1px solid rgba(201,168,76,0.28)",
                        color: "#C9A84C",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-ui" style={{ fontSize: "0.94rem", color: "rgba(15,3,24,0.74)", lineHeight: 1.72 }}>
                      {resultaat}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── HOE HET WERKT ────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal>
            <Eyebrow>Hoe het werkt</Eyebrow>
            <h2 className="font-display" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 32px" }}>
              Direct van start. Zonder gedoe.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: needsContact ? "Plan een gesprek" : "Kies en reken af", d: needsContact ? "Vul het formulier in en plan een vrijblijvend kennismakingsgesprek." : "Eénmalige betaling via Stripe. Direct en veilig." },
              { n: "02", t: needsContact ? "Kennismakingsgesprek" : "Direct toegang", d: needsContact ? "We verkennen je situatie en stellen het traject op maat samen." : "Je ontvangt direct toegang via de VIVYNQ-app. Op elk apparaat." },
              { n: "03", t: "Start jouw traject", d: "Op jouw tempo, op jouw moment. Met begeleiding als je er om vraagt." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 130}>
                <p className="font-display" style={{ fontSize: "2.2rem", lineHeight: 1, color: "#C9A84C" }}>{s.n}</p>
                <div style={{ height: "2px", background: "#C9A84C", margin: "12px 0 14px", width: "36px" }} />
                <h3 className="font-display" style={{ fontSize: "1.18rem", color: "#0F0318", marginBottom: "7px" }}>{s.t}</h3>
                <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(15,3,24,0.62)", lineHeight: 1.72 }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── MODULE-REIS (alleen voor programma's) ────────────────────── */}
      {product.programmaStappen && product.programmaStappen.length > 0 && (
        <section style={{ background: "#0F0318", paddingTop: "80px", paddingBottom: "80px" }}>
          <Container>
            <Reveal style={{ marginBottom: "48px" }}>
              <Eyebrow style={{ color: "rgba(201,168,76,0.68)" }}>Jouw reis</Eyebrow>
              <h2 className="font-display text-white" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, margin: "14px 0 0" }}>
                Module voor module — op jouw tempo.
              </h2>
            </Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2px",
              }}
            >
              {product.programmaStappen.map((stap, i) => (
                <Reveal key={stap.nummer} delay={i * 60}>
                  <div
                    style={{
                      padding: "24px 26px",
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(201,168,76,0.12)",
                      display: "flex",
                      gap: "18px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      className="font-display"
                      style={{ fontSize: "1.5rem", color: "rgba(201,168,76,0.35)", lineHeight: 1, flexShrink: 0, paddingTop: "2px" }}
                    >
                      {stap.nummer}
                    </span>
                    <div>
                      <p className="font-display" style={{ fontSize: "1rem", color: "#fff", marginBottom: "5px", fontWeight: 400 }}>
                        {stap.titel}
                      </p>
                      <p className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(250,248,242,0.48)", lineHeight: 1.65 }}>
                        {stap.omschrijving}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── REFLECTIEVRAGEN (alleen voor programma's met vragen) ─────── */}
      {product.fulfillment === "program" && product.reflectieVragen && product.reflectieVragen.length > 0 && (
        <section style={{ background: "#0F0318", paddingTop: "80px", paddingBottom: "80px" }}>
          <Container style={{ maxWidth: "760px" }}>
            <Reveal style={{ marginBottom: "12px" }}>
              <Eyebrow style={{ color: "rgba(201,168,76,0.68)" }}>Reflectie</Eyebrow>
              <h2 className="font-display text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.18, margin: "12px 0 4px" }}>
                Verdiep wat je hebt geleerd.
              </h2>
              <p className="font-ui" style={{ fontSize: "0.9rem", color: "rgba(250,248,242,0.5)", lineHeight: 1.7, marginTop: "8px" }}>
                Vijf vragen om het geleerde te verankeren. Jouw antwoorden vormen de basis van een persoonlijk eindrapport.
              </p>
            </Reveal>

            <ProgrammaReflectie
              slug={product.slug}
              programNaam={product.name}
              vragen={product.reflectieVragen}
            />
          </Container>
        </section>
      )}

      {/* ── VOOR WIE ─────────────────────────────────────────────────── */}
      {product.voorWie && product.voorWie.length > 0 && (
        <section style={{ background: "#fff", paddingTop: "72px", paddingBottom: "72px" }}>
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <Reveal>
                <Eyebrow>Voor wie</Eyebrow>
                <h2 className="font-display" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 24px" }}>
                  Dit programma is voor jou als…
                </h2>
                <ul className="flex flex-col gap-3.5">
                  {product.voorWie.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span style={{ width: "6px", height: "6px", background: "#C9A84C", borderRadius: "50%", flexShrink: 0, marginTop: "8px" }} />
                      <span className="font-ui" style={{ fontSize: "0.94rem", color: "rgba(15,3,24,0.72)", lineHeight: 1.70 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                <div style={{ background: "#0F0318", border: "1px solid rgba(201,168,76,0.20)", padding: "32px", borderRadius: "3px" }}>
                  <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(201,168,76,0.68)", marginBottom: "12px" }}>
                    Niet voor wie
                  </p>
                  <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(250,248,242,0.55)", lineHeight: 1.80, marginBottom: "24px" }}>
                    Dit programma levert geen therapie. Als je acute psychische klachten hebt of onder behandeling bent, adviseren wij altijd eerst je behandelaar te raadplegen.
                  </p>
                  <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "20px" }}>
                    <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(201,168,76,0.68)", marginBottom: "10px" }}>
                      Wat je nodig hebt
                    </p>
                    <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(250,248,242,0.50)", lineHeight: 1.72 }}>
                      Bereidheid om eerlijk naar jezelf te kijken. Geen voorkennis van systemisch werk vereist.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* ── VEILIGHEID / JURIDISCH ───────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "56px", paddingBottom: "56px" }}>
        <Container>
          <Reveal>
            <div style={{ background: "#fff", border: "1px solid rgba(15,3,24,0.07)", padding: "28px 32px", borderRadius: "3px", maxWidth: "720px" }}>
              <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(15,3,24,0.42)", marginBottom: "12px" }}>
                Coaching — geen zorg
              </p>
              <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(15,3,24,0.62)", lineHeight: 1.80, marginBottom: "10px" }}>
                Vivynq biedt uitsluitend persoonlijke coaching gericht op zelfinzicht,
                gedragsverandering en persoonlijke ontwikkeling. Onze programma's vallen
                niet onder de Wet kwaliteit, klachten en geschillen zorg (Wkkgz) en staan
                niet onder toezicht van de Nederlandse Zorgautoriteit (NZa).
              </p>
              <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(15,3,24,0.62)", lineHeight: 1.80 }}>
                Dit programma is niet bedoeld voor mensen met acute of ernstige
                psychische klachten, of voor mensen die onder behandeling zijn van een
                GGZ-instelling, psychiater of psycholoog. Bij twijfel adviseren wij
                altijd eerst uw behandelaar te raadplegen. Coaching sluit reguliere zorg
                niet uit — het is een aanvulling daarop, geen vervanging.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── DEFINITIEVE CTA ──────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal className="text-center max-w-[600px] mx-auto">
            {product.openingsstelling && (
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(0.92rem, 1.6vw, 1.06rem)",
                  color: "rgba(201,168,76,0.55)",
                  lineHeight: 1.70,
                  marginBottom: "20px",
                  fontStyle: "italic",
                }}
              >
                {product.openingsstelling.split(".")[0] + "."}
              </p>
            )}
            <h2 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, marginBottom: "12px" }}>
              {product.name}
            </h2>
            <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(250,248,242,0.45)", lineHeight: 1.72, marginBottom: "28px" }}>
              {product.belofte}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <GoldLink href={buyHref}>{product.cta}</GoldLink>
            </div>
            {product.garantie && (
              <p className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(201,168,76,0.40)", marginTop: "16px", letterSpacing: "0.03em" }}>
                {product.garantie}
              </p>
            )}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
