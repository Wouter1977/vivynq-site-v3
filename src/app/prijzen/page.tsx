import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, GoldLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PARTICULIER, ONLINE_PROGRAMMAS, ZAKELIJK } from "@/lib/products";

export const metadata: Metadata = {
  title: "Producten & prijzen — VIVYNQ",
  description:
    "Alle Vivynq-producten en prijzen. Van Zelfscan Q.Code (€127) tot online programma's (€497–€597). Alles gebaseerd op DISC + systemisch werk.",
};

const STARTPUNTEN = [
  {
    vraag: "Ik wil eerst weten wie ik ben",
    advies: "Zelfscan Q.Code",
    prijs: "€127",
    href: "/scan",
    kleur: "#C9A84C",
  },
  {
    vraag: "Ik wil een patroon echt doorbreken",
    advies: "Van dragen naar kiezen",
    prijs: "€497",
    href: "/programma/van-dragen-naar-kiezen",
    kleur: "#8B6FA0",
  },
  {
    vraag: "Ik wil systemische lasten begrijpen",
    advies: "Wortels",
    prijs: "€497",
    href: "/programma/wortels",
    kleur: "#6B8FA0",
  },
  {
    vraag: "Ik zoek iets voor mijn team",
    advies: "TeamScan + Rapport",
    prijs: "Op aanvraag",
    href: "/zakelijk",
    kleur: "#4A7A5C",
  },
];

export default function PrijzenPage() {
  const flagship = PARTICULIER.find((p) => p.featured);
  const instapProducten = PARTICULIER.filter((p) => p.fulfillment === "scan" || p.fulfillment === "order");
  const programmas = ONLINE_PROGRAMMAS.filter((p) => !p.featured);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0F0318",
          paddingTop: "88px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)" }} />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="max-w-[680px]">
            <div className="vq-rise"><Eyebrow>Producten &amp; prijzen</Eyebrow></div>
            <h1
              className="font-display text-white vq-rise-2"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)", lineHeight: 1.08, margin: "18px 0 0", letterSpacing: "-0.015em" }}
            >
              Begin waar{" "}
              <em style={{ color: "#C9A84C" }}>jij staat.</em>
            </h1>
            <div className="vq-rise-3">
              <p
                className="font-ui"
                style={{ fontSize: "1.02rem", color: "rgba(250,248,242,0.62)", lineHeight: 1.80, marginTop: "20px", maxWidth: "520px" }}
              >
                Elk traject start met de Zelfscan Q.Code — jouw basis voor elk
                vervolgtraject. Kies daarna het programma dat bij jouw thema past.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── WAAR BEGIN JE? ────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal style={{ marginBottom: "40px" }}>
            <Eyebrow>Waar begin je?</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.12, color: "#0F0318", margin: "12px 0 0" }}
            >
              Kies op basis van je{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>vraag</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-3">
            {STARTPUNTEN.map((s, i) => (
              <Reveal key={s.advies} delay={i * 70}>
                <Link
                  href={s.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 20px",
                    background: "#fff",
                    border: "1px solid rgba(15,3,24,0.07)",
                    borderRadius: "3px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  className="vq-lift-light"
                >
                  <div style={{ width: "4px", height: "40px", background: s.kleur, flexShrink: 0, borderRadius: "2px" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(15,3,24,0.60)", lineHeight: 1.4, marginBottom: "3px" }}>
                      {s.vraag}
                    </p>
                    <p className="font-display" style={{ fontSize: "1.05rem", color: "#0F0318", lineHeight: 1.2 }}>
                      {s.advies}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <span className="font-display" style={{ fontSize: "1.2rem", color: s.kleur }}>{s.prijs}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INSTAP — SCANS ───────────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "72px", paddingBottom: "72px" }}>
        <Container>
          <Reveal style={{ marginBottom: "32px" }}>
            <Eyebrow>Instap</Eyebrow>
            <h2 className="font-display" style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", color: "#0F0318", lineHeight: 1.15, marginTop: "10px" }}>
              Begin met jouw Q.Code
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {instapProducten.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={p.slug === "zelfscan-qcode" ? "/scan" : `/product/${p.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#FAF8F2",
                    border: "1px solid rgba(15,3,24,0.07)",
                    padding: "26px",
                    borderRadius: "3px",
                    textDecoration: "none",
                    height: "100%",
                    transition: "all 0.2s ease",
                  }}
                  className="vq-lift-light"
                >
                  <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", fontWeight: 700, color: "#C9A84C", marginBottom: "8px" }}>
                    {p.duur ?? "Scan"}
                  </p>
                  <h3 className="font-display" style={{ fontSize: "1.18rem", color: "#0F0318", lineHeight: 1.2, marginBottom: "8px" }}>
                    {p.name}
                  </h3>
                  <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(15,3,24,0.58)", lineHeight: 1.60, flex: 1 }}>
                    {p.tagline}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(15,3,24,0.06)" }}>
                    <span className="font-display" style={{ fontSize: "1.4rem", color: "#C9A84C" }}>{p.priceLabel}</span>
                    <span className="font-ui" style={{ fontSize: "0.68rem", color: "rgba(15,3,24,0.38)" }}>eenmalig</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FLAGSHIP PROGRAMMA ───────────────────────────────────────── */}
      {flagship && (
        <section style={{ background: "#FAF8F2", paddingTop: "80px", paddingBottom: "80px" }}>
          <Container>
            <Reveal style={{ marginBottom: "32px" }}>
              <Eyebrow>Meest gekozen programma</Eyebrow>
            </Reveal>
            <Reveal>
              <div
                style={{
                  background: "#0F0318",
                  border: "1px solid rgba(201,168,76,0.22)",
                  borderLeft: "4px solid #C9A84C",
                  padding: "36px 32px",
                  borderRadius: "3px",
                }}
              >
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <span
                      className="font-ui uppercase"
                      style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "4px 10px", borderRadius: "1px" }}
                    >
                      Meest gekozen · {flagship.duur}
                    </span>
                    <h3
                      className="font-display text-white"
                      style={{ fontSize: "clamp(1.55rem, 3vw, 2.1rem)", lineHeight: 1.15, marginTop: "16px" }}
                    >
                      {flagship.name}
                    </h3>
                    <p className="font-ui" style={{ fontSize: "0.92rem", color: "rgba(250,248,242,0.60)", lineHeight: 1.75, marginTop: "10px" }}>
                      {flagship.beschrijving}
                    </p>
                    <div className="flex items-baseline gap-3" style={{ marginTop: "20px" }}>
                      <span className="font-display" style={{ fontSize: "2.4rem", color: "#C9A84C" }}>{flagship.priceLabel}</span>
                      <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(201,168,76,0.50)" }}>eenmalig · {flagship.belofte}</span>
                    </div>
                    <div style={{ marginTop: "22px" }}>
                      <Link
                        href={`/programma/${flagship.slug}`}
                        className="vq-cta font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
                        style={{ fontSize: "0.74rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "13px 24px", borderRadius: "2px" }}
                      >
                        {flagship.cta} <span className="vq-cta-arrow">→</span>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="font-ui uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", fontWeight: 700, color: "#C9A84C", marginBottom: "14px" }}>
                      Wat je krijgt
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {flagship.inhoud.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span style={{ color: "#C9A84C", fontSize: "0.78rem", marginTop: "2px", flexShrink: 0 }}>✓</span>
                          <span className="font-ui" style={{ fontSize: "0.83rem", color: "rgba(250,248,242,0.70)", lineHeight: 1.55 }}>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── OVERIGE PROGRAMMA'S ───────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "72px", paddingBottom: "72px" }}>
        <Container>
          <Reveal style={{ marginBottom: "36px" }}>
            <p className="font-ui uppercase" style={{ fontSize: "0.66rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C", marginBottom: "4px" }}>
              Online programma&apos;s
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", color: "#0F0318", lineHeight: 1.15 }}>
              Kies jouw thema
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programmas.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  href={`/programma/${p.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#FAF8F2",
                    border: "1px solid rgba(15,3,24,0.07)",
                    padding: "22px",
                    borderRadius: "3px",
                    textDecoration: "none",
                    height: "100%",
                    transition: "all 0.2s ease",
                  }}
                  className="vq-lift-light"
                >
                  <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", fontWeight: 700, color: "#C9A84C", marginBottom: "8px" }}>
                    {p.duur ?? "Programma"}
                  </p>
                  <h3 className="font-display" style={{ fontSize: "1.12rem", color: "#0F0318", lineHeight: 1.20, marginBottom: "8px" }}>
                    {p.name}
                  </h3>
                  <p className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(15,3,24,0.58)", lineHeight: 1.60, flex: 1 }}>
                    {p.tagline}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginTop: "16px",
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(15,3,24,0.06)",
                    }}
                  >
                    <span className="font-display" style={{ fontSize: "1.4rem", color: "#C9A84C" }}>{p.priceLabel}</span>
                    <span className="font-ui" style={{ fontSize: "0.68rem", color: "rgba(15,3,24,0.38)" }}>eenmalig</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── B2B ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "72px", paddingBottom: "72px" }}>
        <Container>
          <Reveal style={{ marginBottom: "36px" }}>
            <p className="font-ui uppercase" style={{ fontSize: "0.66rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C", marginBottom: "4px" }}>
              Zakelijk
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", color: "#0F0318", lineHeight: 1.15 }}>
              Voor teams &amp; organisaties
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {ZAKELIJK.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(15,3,24,0.07)",
                    padding: "24px",
                    borderRadius: "3px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div>
                    <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", fontWeight: 700, color: "rgba(15,3,24,0.40)", marginBottom: "6px" }}>
                      Op aanvraag
                    </p>
                    <h3 className="font-display" style={{ fontSize: "1.15rem", color: "#0F0318", lineHeight: 1.20 }}>
                      {p.name}
                    </h3>
                    <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(15,3,24,0.58)", lineHeight: 1.65, marginTop: "6px" }}>
                      {p.tagline}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(15,3,24,0.06)",
                    }}
                  >
                    <span className="font-display" style={{ fontSize: "1.35rem", color: "#C9A84C" }}>{p.priceLabel}</span>
                    <Link
                      href="/gesprek"
                      className="font-ui uppercase inline-flex items-center gap-1.5 transition-all hover:brightness-90"
                      style={{ fontSize: "0.66rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "8px 14px", borderRadius: "2px" }}
                    >
                      Plan een gesprek →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FOOTER-NOTITIE + CTA ─────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "64px", paddingBottom: "64px", borderTop: "1px solid rgba(15,3,24,0.06)" }}>
        <Container>
          <Reveal className="max-w-[640px] mx-auto text-center">
            <p className="font-display" style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", color: "#0F0318", lineHeight: 1.28, fontStyle: "italic", marginBottom: "20px" }}>
              Niet zeker welk product past?{" "}
              <span style={{ color: "#C9A84C", fontStyle: "normal" }}>Plan een vrijblijvend gesprek.</span>
            </p>
            <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(15,3,24,0.56)", lineHeight: 1.72, marginBottom: "24px" }}>
              We kijken samen waar je staat en welk traject het meeste voor je doet.
              Geen druk, geen verplichtingen.
            </p>
            <GoldLink href="/gesprek">Plan een kennismaking</GoldLink>
          </Reveal>

          <Reveal style={{ marginTop: "48px" }}>
            <p className="font-ui text-center" style={{ fontSize: "0.76rem", color: "rgba(15,3,24,0.34)", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
              Prijzen incl. BTW voor B2C-producten. B2B-trajecten excl. BTW, op aanvraag.
              Vivynq biedt coaching en zelfinzicht — geen therapie, diagnose of medische behandeling.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
