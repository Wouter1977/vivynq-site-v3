import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Plan een gesprek — VIVYNQ Zakelijk",
  description:
    "Plan een vrijblijvend kennismakingsgesprek voor een Vivynq zakelijk traject. We verkennen samen wat er werkelijk speelt in jouw team of organisatie.",
};

const STAPPEN = [
  {
    nr: "01",
    titel: "Verkennen",
    tekst:
      "We luisteren naar wat er speelt — in jouw team, bij jouw leiders, in je organisatie. Geen standaarddeck, geen pitch.",
  },
  {
    nr: "02",
    titel: "Afstemmen",
    tekst:
      "Op basis van jouw situatie kijken we welk traject het beste past. Maatwerk begint met een eerlijk gesprek.",
  },
  {
    nr: "03",
    titel: "Offerte of voorstel",
    tekst:
      "Na het gesprek ontvang je binnen twee werkdagen een concreet voorstel — inclusief aanpak, tijdlijn en investering.",
  },
];

const GESPREK_SLUGS = ["teamscan-rapport", "teamscan-interventiedag", "eigenaarschapstraject", "coachtraject-6-sessies"];
const GESPREK_PRODUCTEN = PRODUCTS.filter((p) => GESPREK_SLUGS.includes(p.slug));

export default function GesprekPage() {
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
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,111,160,0.07) 0%, transparent 65%)" }} />
        </div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="max-w-[700px]">
            <div className="vq-rise">
              <Eyebrow>Vrijblijvend · Zakelijk · 30 minuten</Eyebrow>
            </div>
            <h1
              className="font-display text-white vq-rise-2"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)", lineHeight: 1.08, margin: "18px 0 0", letterSpacing: "-0.015em" }}
            >
              Plan een gesprek
            </h1>
            <div className="vq-rise-3">
              <p
                className="font-ui"
                style={{ fontSize: "1.02rem", color: "rgba(250,248,242,0.62)", lineHeight: 1.80, marginTop: "20px", maxWidth: "540px" }}
              >
                Voor leidinggevenden en opdrachtgevers die willen begrijpen wat er
                werkelijk speelt — voordat ze een beslissing nemen. Geen druk,
                geen verplichtingen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── HOE HET WERKT ────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal style={{ marginBottom: "44px" }}>
            <Eyebrow>Wat te verwachten</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.12, color: "#0F0318", margin: "12px 0 0" }}
            >
              Drie stappen,{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>één richting</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {STAPPEN.map((stap, i) => (
              <Reveal key={stap.nr} delay={i * 80}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(15,3,24,0.07)",
                    padding: "28px 24px",
                    borderRadius: "3px",
                    borderTop: "3px solid #C9A84C",
                    height: "100%",
                  }}
                >
                  <span
                    className="font-display"
                    style={{ fontSize: "2rem", color: "rgba(201,168,76,0.25)", lineHeight: 1 }}
                  >
                    {stap.nr}
                  </span>
                  <h3
                    className="font-display"
                    style={{ fontSize: "1.10rem", color: "#0F0318", lineHeight: 1.20, marginTop: "12px", marginBottom: "10px" }}
                  >
                    {stap.titel}
                  </h3>
                  <p className="font-ui" style={{ fontSize: "0.86rem", color: "rgba(15,3,24,0.58)", lineHeight: 1.68 }}>
                    {stap.tekst}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TRAJECTEN VIA DIT PAD ────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "72px", paddingBottom: "72px" }}>
        <Container>
          <Reveal style={{ marginBottom: "36px" }}>
            <Eyebrow>Via dit pad</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", lineHeight: 1.12, color: "#0F0318", margin: "12px 0 0" }}
            >
              Welke trajecten bespreken we?
            </h2>
            <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(15,3,24,0.54)", lineHeight: 1.70, marginTop: "10px", maxWidth: "520px" }}>
              Elk van deze programma&apos;s is maatwerk. Ze beginnen altijd met een gesprek.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GESPREK_PRODUCTEN.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <div
                  style={{
                    background: "#0F0318",
                    border: "1px solid rgba(201,168,76,0.14)",
                    padding: "22px",
                    borderRadius: "3px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div>
                    <p
                      className="font-ui uppercase"
                      style={{ fontSize: "0.56rem", letterSpacing: "0.16em", fontWeight: 700, color: "rgba(201,168,76,0.55)", marginBottom: "8px" }}
                    >
                      {p.duur ?? "Maatwerk"}
                    </p>
                    <h3
                      className="font-display text-white"
                      style={{ fontSize: "1.05rem", lineHeight: 1.20 }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <p className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(250,248,242,0.50)", lineHeight: 1.60, flex: 1 }}>
                    {p.tagline}
                  </p>
                  <p
                    className="font-display"
                    style={{ fontSize: "1.05rem", color: "#C9A84C", marginTop: "4px" }}
                  >
                    {p.priceLabel}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INPLANNEN ────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal style={{ marginBottom: "44px" }}>
            <Eyebrow>Plan het gesprek</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", lineHeight: 1.12, color: "#0F0318", margin: "12px 0 0" }}
            >
              Kies een moment dat jou past
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Calendly embed */}
            <Reveal>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(15,3,24,0.08)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  minHeight: "620px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "40px",
                }}
              >
                {/* TODO (Wouter): vervang dit blok door de Calendly-embed zodra jouw link klaar is.
                    Stap 1: Maak een Calendly-event aan op calendly.com
                    Stap 2: Kopieer de "Inline Embed"-code van Calendly
                    Stap 3: Vervang de placeholder hieronder door de iframe-src */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(201,168,76,0.10)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>📅</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p className="font-display" style={{ fontSize: "1.05rem", color: "#0F0318", marginBottom: "8px" }}>
                    Calendly-agenda volgt
                  </p>
                  <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(15,3,24,0.50)", lineHeight: 1.65, maxWidth: "280px" }}>
                    Zodra je Calendly-link actief is, verschijnt hier de inplanner.
                    Gebruik in de tussentijd het formulier.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contactformulier fallback */}
            <Reveal delay={80}>
              <div>
                <p
                  className="font-ui uppercase"
                  style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(15,3,24,0.38)", marginBottom: "16px" }}
                >
                  Of laat je gegevens achter
                </p>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(15,3,24,0.08)",
                    padding: "clamp(22px, 3.5vw, 36px)",
                    borderRadius: "4px",
                  }}
                >
                  <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.20em", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>
                    Jouw organisatie
                  </p>
                  <LeadForm />
                </div>
                <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(15,3,24,0.38)", lineHeight: 1.60, marginTop: "14px" }}>
                  We nemen binnen twee werkdagen contact op om een moment af te stemmen.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── FOOTER-QUOTE ─────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "64px", paddingBottom: "64px" }}>
        <Container>
          <Reveal className="max-w-[580px] mx-auto text-center">
            <p
              className="font-display text-white"
              style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.70rem)", lineHeight: 1.30, fontStyle: "italic" }}
            >
              &ldquo;Een team dat begrijpt wat het aanstuurt, heeft{" "}
              <span style={{ color: "#C9A84C", fontStyle: "normal" }}>meer ruimte</span>{" "}
              om te bewegen.&rdquo;
            </p>
            <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.35)", margin: "24px auto 0" }} />
            <p className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(250,248,242,0.35)", marginTop: "12px", letterSpacing: "0.08em" }}>
              — Vivynq
            </p>
          </Reveal>

          <Reveal style={{ marginTop: "40px", textAlign: "center" }}>
            <Link
              href="/prijzen"
              className="font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
              style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 700, color: "rgba(250,248,242,0.45)", textDecoration: "none" }}
            >
              ← Terug naar prijzen
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
