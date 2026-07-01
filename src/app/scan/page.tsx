import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, GoldLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CheckoutForm } from "@/components/checkout-form";
import { getProduct } from "@/lib/products";

const scan = getProduct("zelfscan-qcode")!;

export const metadata: Metadata = {
  title: "Zelfscan Q.Code — VIVYNQ",
  description:
    "In 15 minuten weet jij wat anderen pas na jaren doorhebben. Jouw Q.Code rapport: 12 pagina's DISC-profiel + AI-analyse. Binnen 48 uur in jouw inbox. €127.",
};

/* SVG checkmark — geen emoji */
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="8" cy="8" r="7.5" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
      <path d="M5 8.2l2 2.3 4-4.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRUST = [
  { icon: "⏱", label: "30 minuten", sub: "Klaar in één zitting" },
  { icon: "📄", label: "Direct rapport", sub: "8–12 pagina's PDF" },
  { icon: "🔒", label: "Privacy-first", sub: "Veilig versleuteld" },
  { icon: "✦", label: "Eenmalig", sub: "Geen abonnement" },
];

/* Decoratieve Q.Code dimensie preview */
const DIMS = [
  { l: "Lichaam", v: 72, color: "#C9A84C" },
  { l: "Denken",  v: 58, color: "#8B6FA0" },
  { l: "Gevoel",  v: 44, color: "#6B8FA0" },
  { l: "Ziel",    v: 83, color: "#4A7A5C" },
];

const FAQ = [
  {
    q: "Is er technische kennis nodig?",
    a: "Nee. De scan is volledig begeleide — je hoeft niets te installeren of in te loggen. Je klikt de link aan, beantwoordt de vragen en ontvangt je rapport.",
  },
  {
    q: "Wanneer ontvang ik mijn rapport?",
    a: "Direct na het invullen. De verwerking duurt een paar minuten; je rapport staat klaar zodra je de laatste vraag hebt beantwoord.",
  },
  {
    q: "Is dit een vervanging voor therapie?",
    a: "Nee. De Zelfscan is coaching en zelfinzicht — geen therapie of diagnose. Bij acute klachten verwijs ik altijd door naar een bevoegd behandelaar.",
  },
  {
    q: "Wat als ik niet tevreden ben?",
    a: "Neem contact op via de contactpagina. We zoeken altijd een goede oplossing.",
  },
];

export default function ScanPage() {
  return (
    <>
      {/* ── HERO — full-bleed donker, checkout boven de vouw ─────────── */}
      <section
        style={{
          background: "#08060F",
          paddingTop: "0",
          paddingBottom: "0",
          position: "relative",
          overflow: "hidden",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Grain */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat", backgroundSize: "128px", opacity: 0.55,
          }}
        />

        {/* Groot decoratief getal */}
        <div
          aria-hidden="true"
          className="font-display"
          style={{
            position: "absolute", top: "50%", left: "-0.05em",
            transform: "translateY(-50%)",
            fontSize: "clamp(18rem, 40vw, 36rem)",
            lineHeight: 1,
            fontStyle: "italic",
            color: "transparent",
            WebkitTextStroke: "1px rgba(201,168,76,0.06)",
            userSelect: "none", pointerEvents: "none",
          }}
        >
          15
        </div>

        {/* Goud gloed */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,111,160,0.06) 0%, transparent 65%)" }} />
        </div>

        <Container style={{ position: "relative", zIndex: 2, paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Links — propositie */}
            <div>
              <div className="vq-rise"><Eyebrow>Zelfscan · Q.Code</Eyebrow></div>

              <h1
                className="font-display text-white vq-rise-2"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.07, margin: "18px 0 0", letterSpacing: "-0.018em" }}
              >
                In 15 minuten weet jij wat anderen pas na{" "}
                <em style={{ color: "#C9A84C" }}>jaren doorhebben.</em>
              </h1>

              <div className="vq-rise-3">
                <p
                  className="font-ui"
                  style={{ fontSize: "1.04rem", color: "rgba(250,248,242,0.62)", lineHeight: 1.80, marginTop: "20px", maxWidth: "480px" }}
                >
                  Jouw Q.Code rapport: 12 pagina&apos;s over wie jij écht bent.
                  DISC-profiel gecombineerd met AI-analyse. Binnen 48 uur
                  in jouw inbox.
                </p>
              </div>

              {/* Trust-badges */}
              <div
                className="vq-rise-4 flex flex-wrap gap-x-6 gap-y-3"
                style={{ marginTop: "32px" }}
              >
                {[
                  ["15 min", "klaar in één zitting"],
                  ["48 uur rapport", "12 pagina's PDF in je inbox"],
                  ["€127", "eenmalig, geen abo"],
                ].map(([label, sub]) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                    <span className="font-display" style={{ fontSize: "1.05rem", color: "#C9A84C", lineHeight: 1.2 }}>{label}</span>
                    <span className="font-ui" style={{ fontSize: "0.68rem", color: "rgba(250,248,242,0.38)", letterSpacing: "0.06em", marginTop: "1px" }}>{sub}</span>
                  </div>
                ))}
              </div>

              {/* Wat je krijgt — checklist */}
              <div style={{ marginTop: "36px" }}>
                <p className="font-ui uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(201,168,76,0.65)", marginBottom: "14px" }}>
                  Wat je krijgt
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", margin: 0, padding: 0, listStyle: "none" }}>
                  {scan.inhoud.map((line) => (
                    <li key={line} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <Check />
                      <span className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(250,248,242,0.75)", lineHeight: 1.58 }}>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rechts — checkout kaart */}
            <div className="vq-rise-3">
              <div
                style={{
                  background: "rgba(250,248,242,0.04)",
                  border: "1px solid rgba(201,168,76,0.22)",
                  padding: "clamp(24px,4vw,36px)",
                  borderRadius: "3px",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Prijskop */}
                <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid rgba(201,168,76,0.14)" }}>
                  <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.20em", fontWeight: 700, color: "rgba(201,168,76,0.62)", marginBottom: "8px" }}>
                    Jouw investering
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span className="font-display" style={{ fontSize: "2.8rem", color: "#C9A84C", lineHeight: 1 }}>
                      {scan.priceLabel}
                    </span>
                    <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(250,248,242,0.40)" }}>
                      eenmalig · {scan.belofte}
                    </span>
                  </div>
                </div>

                <h2
                  className="font-display text-white"
                  style={{ fontSize: "1.35rem", marginBottom: "6px", lineHeight: 1.2 }}
                >
                  Start je scan
                </h2>
                <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(250,248,242,0.50)", lineHeight: 1.65, marginBottom: "22px" }}>
                  Vul je gegevens in — je gaat direct door naar de vragenlijst.
                </p>

                <CheckoutForm slug={scan.slug} ctaLabel="Doe de scan" priceLabel={scan.priceLabel} />

                {/* Veiligheid */}
                <p className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(250,248,242,0.30)", lineHeight: 1.6, marginTop: "14px", textAlign: "center" }}>
                  Veilige betaling · Geen account nodig · Privacy gewaarborgd
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Q.CODE PREVIEW — decoratief rapport-voorbeeld ────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal style={{ marginBottom: "48px" }}>
            <Eyebrow>Je Q.Code-rapport</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 0" }}
            >
              Vier dimensies.{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Jouw unieke profiel.</em>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Decoratief rapport preview */}
            <Reveal>
              <div
                style={{
                  background: "#0F0318",
                  border: "1px solid rgba(201,168,76,0.18)",
                  padding: "28px",
                  borderRadius: "3px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Rapport header */}
                <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid rgba(201,168,76,0.10)" }}>
                  <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.20em", fontWeight: 700, color: "rgba(201,168,76,0.55)" }}>
                    Q.Code Rapport · Voorbeeld
                  </p>
                  <p className="font-display text-white" style={{ fontSize: "1.2rem", marginTop: "6px", fontStyle: "italic" }}>
                    Jouw naam hier
                  </p>
                </div>

                {/* Dimensie-bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {DIMS.map((d, i) => (
                    <div key={d.l}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                        <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(250,248,242,0.72)", fontWeight: 500 }}>{d.l}</span>
                        <span className="font-display" style={{ fontSize: "1.05rem", color: d.color }}>{d.v}</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${d.v}%`,
                            background: `linear-gradient(90deg, ${d.color}60, ${d.color})`,
                            borderRadius: "2px",
                            transition: "width 1.5s ease",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* DISC badge */}
                <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1px solid rgba(201,168,76,0.10)", display: "flex", gap: "8px" }}>
                  {["D", "I", "S", "C"].map((letter, i) => (
                    <div
                      key={letter}
                      style={{
                        width: "36px", height: "36px",
                        border: `1px solid rgba(201,168,76,${i === 0 ? "0.70" : "0.20"})`,
                        background: i === 0 ? "rgba(201,168,76,0.12)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: "2px",
                      }}
                    >
                      <span
                        className="font-display"
                        style={{ fontSize: "1rem", color: i === 0 ? "#C9A84C" : "rgba(250,248,242,0.28)", fontStyle: "italic" }}
                      >
                        {letter}
                      </span>
                    </div>
                  ))}
                  <div style={{ marginLeft: "8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p className="font-ui" style={{ fontSize: "0.68rem", color: "rgba(250,248,242,0.38)", lineHeight: 1.3 }}>
                      Dominante stijl
                    </p>
                    <p className="font-display" style={{ fontSize: "0.88rem", color: "#C9A84C" }}>
                      D-stijl · Daadkracht
                    </p>
                  </div>
                </div>

                {/* Placeholder-markering */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute", top: "12px", right: "12px",
                    fontSize: "0.52rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.12em",
                    color: "rgba(201,168,76,0.30)",
                  }}
                >
                  VOORBEELD
                </div>
              </div>
            </Reveal>

            {/* Rapport beschrijving */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {[
                  {
                    nr: "01",
                    t: "Jouw Q.Code profiel",
                    d: "De vier dimensies van je persoonlijkheid — Lichaam, Denken, Gevoel en Ziel — worden zichtbaar als een uniek patroon. Geen label, maar een dynamisch beeld.",
                    kleur: "#C9A84C",
                  },
                  {
                    nr: "02",
                    t: "DISC-stijlanalyse",
                    d: "Hoe je communiceert, beslissingen neemt en reageert onder druk. Direct inzetbaar in werkrelaties, leiderschap en samenwerking.",
                    kleur: "#8B6FA0",
                  },
                  {
                    nr: "03",
                    t: "Sterktes, valkuilen & groei",
                    d: "Concrete, persoonlijke inzichten over wat je goed doet, wat je tegenhoudt en welke drie stappen het meeste verschil maken voor jou.",
                    kleur: "#6B8FA0",
                  },
                ].map((item, i) => (
                  <Reveal key={item.nr} delay={i * 80}>
                    <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                      <div style={{ width: "3px", height: "100%", minHeight: "52px", background: item.kleur, flexShrink: 0, borderRadius: "2px" }} />
                      <div>
                        <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.16em", fontWeight: 700, color: item.kleur, marginBottom: "4px" }}>
                          {item.nr}
                        </p>
                        <h3 className="font-display" style={{ fontSize: "1.12rem", color: "#0F0318", lineHeight: 1.2, marginBottom: "6px" }}>{item.t}</h3>
                        <p className="font-ui" style={{ fontSize: "0.87rem", color: "rgba(15,3,24,0.62)", lineHeight: 1.72 }}>{item.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}

                <Reveal delay={240}>
                  <GoldLink href="#scan-checkout" style={{ display: "inline-flex" }}>Ontvang jouw Q.Code rapport — €127</GoldLink>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Veelgestelde vragen</Eyebrow>
              <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 16px" }}>
                Wat je misschien wilt{" "}
                <em style={{ fontStyle: "italic", color: "#C9A84C" }}>weten</em>
              </h2>
              <p className="font-ui" style={{ fontSize: "0.92rem", color: "rgba(15,3,24,0.62)", lineHeight: 1.75 }}>
                Staat je vraag er niet bij?{" "}
                <Link href="/contact" style={{ color: "#C9A84C", borderBottom: "1px solid rgba(201,168,76,0.35)" }}>Stuur een berichtje.</Link>
              </p>
            </Reveal>
            <div className="lg:col-span-8">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <details
                    className="group"
                    style={{
                      borderTop: i === 0 ? "1px solid rgba(15,3,24,0.08)" : undefined,
                      borderBottom: "1px solid rgba(15,3,24,0.08)",
                    }}
                  >
                    <summary
                      className="flex items-center justify-between gap-6 cursor-pointer list-none"
                      style={{ padding: "18px 4px" }}
                    >
                      <span className="font-display" style={{ fontSize: "clamp(0.98rem, 1.8vw, 1.12rem)", color: "#0F0318", lineHeight: 1.35 }}>
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 transition-transform group-open:rotate-45"
                        style={{
                          width: "24px", height: "24px",
                          border: "1px solid rgba(201,168,76,0.38)",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          color: "#C9A84C", fontSize: "1rem", flexShrink: 0, borderRadius: "1px",
                        }}
                      >
                        +
                      </span>
                    </summary>
                    <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(15,3,24,0.68)", lineHeight: 1.80, padding: "0 4px 18px", maxWidth: "580px" }}>
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA — final ──────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal className="max-w-[560px] mx-auto text-center">
            <p
              className="font-display text-white"
              style={{ fontSize: "clamp(1.55rem, 3.4vw, 2.3rem)", lineHeight: 1.22, fontStyle: "italic", marginBottom: "20px" }}
            >
              15 minuten. Jouw profiel. Helder voor altijd.
            </p>
            <GoldLink href="#scan-checkout">Start de Zelfscan — €127</GoldLink>
            <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(250,248,242,0.28)", marginTop: "14px", lineHeight: 1.6 }}>
              Eenmalig · Direct rapport · Geen abonnement
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
