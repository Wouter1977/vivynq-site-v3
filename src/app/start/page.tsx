import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Plan een gesprek — VIVYNQ",
  description:
    "Plan een vrijblijvende kennismaking met Vivynq. We verkennen samen waar je staat en welk traject het beste bij jou past.",
};

const VRAGEN_FAQ = [
  {
    q: "Is dit gesprek gratis?",
    a: "Ja. Het kennismakingsgesprek is volledig vrijblijvend en gratis. Geen verplichtingen.",
  },
  {
    q: "Hoe lang duurt het gesprek?",
    a: "Circa 30 minuten via beeldbellen. Je ontvangt een link na bevestiging.",
  },
  {
    q: "Voor particulieren én organisaties?",
    a: "Voor beide. Vertel in het formulier kort waarover het gaat — particulier of zakelijk — dan stemmen we het gesprek erop af.",
  },
];

export default function StartPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0F0318",
          paddingTop: "88px",
          paddingBottom: "96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-15%", right: "0%", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.11) 0%, transparent 65%)" }} />
        </div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Links — tekst */}
            <div className="lg:col-span-5">
              <div className="vq-rise"><Eyebrow>Vrijblijvend · Gratis</Eyebrow></div>
              <h1
                className="font-display text-white vq-rise-2"
                style={{ fontSize: "clamp(2.1rem, 4.8vw, 3.5rem)", lineHeight: 1.08, margin: "20px 0 0", letterSpacing: "-0.015em", fontWeight: 500 }}
              >
                Plan een kennismakingsgesprek
              </h1>
              <div className="vq-rise-3">
                <p className="font-ui" style={{ fontSize: "1.02rem", color: "rgba(250,248,242,0.68)", lineHeight: 1.82, marginTop: "20px", maxWidth: "420px" }}>
                  We verkennen samen waar je staat, wat je wilt bereiken en
                  welk programma daar het beste bij past. Geen druk,
                  geen verplichtingen.
                </p>
              </div>

              <div style={{ marginTop: "36px" }}>
                {VRAGEN_FAQ.map((item) => (
                  <div
                    key={item.q}
                    style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                  >
                    <p className="font-display" style={{ fontSize: "0.96rem", color: "rgba(242,237,227,0.90)", marginBottom: "5px" }}>
                      {item.q}
                    </p>
                    <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(200,168,216,0.62)", lineHeight: 1.65 }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rechts — formulier */}
            <div className="lg:col-span-7 vq-rise-3">
              <div
                style={{
                  background: "#FAFAF8",
                  border: "1px solid rgba(201,168,76,0.20)",
                  padding: "clamp(24px, 4vw, 40px)",
                  borderRadius: "4px",
                }}
              >
                <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.20em", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>
                  Jouw informatie
                </p>
                <LeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── ONDERAAN: verwachtingen managen ─────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "64px", paddingBottom: "64px" }}>
        <Container>
          <Reveal className="max-w-[680px] mx-auto text-center">
            <p className="font-display" style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", color: "#0F0318", lineHeight: 1.28, fontStyle: "italic" }}>
              &ldquo;Verandering die blijft, begint niet bij een nieuw plan —
              maar bij <span style={{ color: "#C9A84C" }}>echt</span> begrijpen
              wie je bent.&rdquo;
            </p>
            <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.40)", margin: "24px auto 0" }} />
            <p className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(15,3,24,0.46)", marginTop: "14px", letterSpacing: "0.06em" }}>
              — Het Vivynq-manifest
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
