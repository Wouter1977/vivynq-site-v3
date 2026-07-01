import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, GoldLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IcebergVideo } from "@/components/iceberg-video";

export const metadata: Metadata = {
  title: "Hoe het werkt — VIVYNQ",
  description:
    "Van klik tot diepgaand inzicht: hoe Vivynq's methodiek werkt, wat je kunt verwachten en waarom dit anders is dan een gewone persoonlijkheidstest.",
};

const STAPPEN = [
  {
    nr: "01",
    t: "Kies en reken af",
    d: "Selecteer de scan, analyse of het programma dat past bij wat je zoekt. Reken veilig af — geen account, geen wachtlijst, geen intakegesprek.",
    detail: "Direct beschikbaar na betaling",
  },
  {
    nr: "02",
    t: "Vul de begeleide vragenlijst in",
    d: "Je doorloopt een rustige, begeleide vragenlijst van ±30 minuten. Er is geen goed of fout antwoord — je kiest steeds wat het meest bij je past.",
    detail: "±30 minuten · geen voorbereiding nodig",
  },
  {
    nr: "03",
    t: "De methodieken werken",
    d: "DISC, Q.Code en systemisch denken worden gecombineerd tot één analyse van jouw unieke profiel. Geen algoritme, maar een gefundeerd raamwerk.",
    detail: "DISC × Q.Code × Systemisch",
  },
  {
    nr: "04",
    t: "Ontvang je persoonlijk rapport",
    d: "Je krijgt een helder, persoonlijk rapport: jouw sterktes, valkuilen, groeirichtingen en concrete stappen. Bewaar als PDF of deel met je coach.",
    detail: "8–12 pagina's · PDF · direct klaar",
  },
];

const METHODIEK = [
  {
    code: "D",
    naam: "DISC",
    sub: "Gedragsstijl",
    kleur: "#C9A84C",
    tekst:
      "DISC brengt jouw dominante gedragsstijl in kaart: hoe je communiceert, besluiten neemt en reageert onder druk. Niet wat je kunt, maar hoe je het doet.",
  },
  {
    code: "Q",
    naam: "Q.Code",
    sub: "Jouw unieke patroon",
    kleur: "#8B6FA0",
    tekst:
      "Q.Code vertaalt jouw DISC-profiel naar vier dimensies: Lichaam, Denken, Gevoel en Ziel. Zo krijg je een holistisch beeld van wat jou drijft en wat jou remt.",
  },
  {
    code: "S",
    naam: "Systemisch",
    sub: "Patronen & loyaliteiten",
    kleur: "#6B8FA0",
    tekst:
      "Systemisch denken kijkt naar de context waarin je functioneert: loyaliteiten, overgenomen patronen en je plek in je gezin, team of organisatie.",
  },
];

const VERGELIJKING = [
  { aspect: "Doorlooptijd", elders: "Weken tot maanden", vivynq: "30 minuten" },
  { aspect: "Kosten", elders: "€ 200–€ 2.000+", vivynq: "Vanaf € 97" },
  { aspect: "Rapport", elders: "Standaardprofiel", vivynq: "Persoonlijk Q.Code-rapport" },
  { aspect: "Methodiek", elders: "Eén model", vivynq: "DISC × Q.Code × Systemisch" },
  { aspect: "Toegang", elders: "Via tussenpersoon", vivynq: "Direct na betaling" },
];

export default function HoeHetWerktPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0F0318",
          paddingTop: "96px",
          paddingBottom: "88px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,111,160,0.06) 0%, transparent 65%)" }} />
        </div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="max-w-[720px]">
            <div className="vq-rise"><Eyebrow>Hoe het werkt</Eyebrow></div>
            <h1
              className="font-display text-white vq-rise-2"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.08, margin: "18px 0 0", letterSpacing: "-0.015em" }}
            >
              Van klik tot{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>diepgaand inzicht</em>
            </h1>
            <div className="vq-rise-3">
              <p
                className="font-ui"
                style={{ fontSize: "1.05rem", color: "rgba(250,248,242,0.65)", lineHeight: 1.80, marginTop: "22px", maxWidth: "580px" }}
              >
                Vivynq geeft je de diepgang van een professioneel assessment — zonder
                wachtlijst, zonder consultant-tarief en zonder dat je er weken op hoeft
                te wachten.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STAPPEN — verticale timeline ─────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "96px", paddingBottom: "96px" }}>
        <Container>
          <Reveal style={{ marginBottom: "64px" }}>
            <Eyebrow>Het proces</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 0" }}
            >
              Vier stappen.{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Één traject.</em>
            </h2>
          </Reveal>

          <div className="flex flex-col gap-0">
            {STAPPEN.map((s, i) => (
              <Reveal key={s.nr} delay={i * 80}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "96px 1fr",
                    gap: "0",
                    position: "relative",
                  }}
                >
                  {/* Nummers + verbindingslijn */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "clamp(2.2rem, 4vw, 3rem)",
                        color: "#C9A84C",
                        lineHeight: 1,
                        fontStyle: "italic",
                        opacity: 0.9,
                      }}
                    >
                      {s.nr}
                    </div>
                    {i < STAPPEN.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          flex: 1,
                          minHeight: "40px",
                          background: "linear-gradient(to bottom, rgba(201,168,76,0.35), rgba(201,168,76,0.08))",
                          margin: "12px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Inhoud */}
                  <div style={{ paddingBottom: i < STAPPEN.length - 1 ? "40px" : "0", paddingLeft: "8px" }}>
                    <h3
                      className="font-display"
                      style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", color: "#0F0318", lineHeight: 1.20, margin: "0 0 10px" }}
                    >
                      {s.t}
                    </h3>
                    <p
                      className="font-ui"
                      style={{ fontSize: "0.92rem", color: "rgba(15,3,24,0.64)", lineHeight: 1.78, maxWidth: "560px", marginBottom: "12px" }}
                    >
                      {s.d}
                    </p>
                    <span
                      className="font-ui uppercase"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        fontWeight: 700,
                        color: "#C9A84C",
                        background: "rgba(201,168,76,0.08)",
                        border: "1px solid rgba(201,168,76,0.18)",
                        padding: "4px 10px",
                        borderRadius: "2px",
                        display: "inline-block",
                      }}
                    >
                      {s.detail}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── DE METHODIEK ─────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "96px", paddingBottom: "96px", overflow: "hidden" }}>
        <Container>
          <Reveal style={{ marginBottom: "56px" }}>
            <Eyebrow style={{ color: "rgba(201,168,76,0.72)" }}>De methodiek</Eyebrow>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, margin: "14px 0 0" }}
            >
              Drie lagen.{" "}
              <em style={{ color: "#C9A84C" }}>Eén antwoord.</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {METHODIEK.map((m, i) => (
              <Reveal key={m.code} delay={i * 100}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "28px",
                    borderRadius: "3px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decoratieve letter */}
                  <div
                    aria-hidden="true"
                    className="font-display"
                    style={{
                      position: "absolute",
                      bottom: "-0.15em",
                      right: "-0.05em",
                      fontSize: "7rem",
                      lineHeight: 1,
                      fontStyle: "italic",
                      color: "transparent",
                      WebkitTextStroke: `1px ${m.kleur}20`,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {m.code}
                  </div>

                  <div style={{ position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <div style={{ width: "3px", height: "24px", background: m.kleur, flexShrink: 0 }} />
                      <div>
                        <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", fontWeight: 700, color: m.kleur }}>{m.sub}</p>
                        <p className="font-display text-white" style={{ fontSize: "1.15rem", lineHeight: 1.15 }}>{m.naam}</p>
                      </div>
                    </div>
                    <p className="font-ui" style={{ fontSize: "0.87rem", color: "rgba(250,248,242,0.60)", lineHeight: 1.75 }}>
                      {m.tekst}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── IJSBERG VIDEO ────────────────────────────────────────────── */}
      <section style={{ background: "#060E18", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal style={{ marginBottom: "40px" }}>
            <Eyebrow style={{ color: "rgba(201,168,76,0.72)" }}>Het Vivynq-model</Eyebrow>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, margin: "14px 0 0" }}
            >
              Boven water:{" "}
              <em style={{ color: "#C9A84C" }}>gedrag.</em>{" "}
              Onder water:{" "}
              <em style={{ color: "rgba(139,111,160,0.95)" }}>de oorzaak.</em>
            </h2>
            <p
              className="font-ui"
              style={{ fontSize: "0.96rem", color: "rgba(250,248,242,0.55)", lineHeight: 1.78, marginTop: "14px", maxWidth: "560px" }}
            >
              DISC brengt het zichtbare in kaart. Systemisch werk onthult wat er
              onder de oppervlakte speelt. Samen vormen ze de basis voor verandering
              die niet na een week weer weg is.
            </p>
          </Reveal>

          <Reveal>
            <IcebergVideo />
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6" style={{ marginTop: "40px" }}>
            <Reveal>
              <div style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "20px" }}>
                <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C", marginBottom: "6px" }}>
                  Boven water · DISC
                </p>
                <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(250,248,242,0.60)", lineHeight: 1.75 }}>
                  Zichtbaar gedrag: hoe je communiceert, beslissingen neemt en
                  reageert onder druk. Herkenbaar, meetbaar, direct inzetbaar —
                  maar verklaart niet <em>waar</em> het vandaan komt.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ borderLeft: "3px solid rgba(139,111,160,0.80)", paddingLeft: "20px" }}>
                <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(139,111,160,0.90)", marginBottom: "6px" }}>
                  Onder water · Systemisch
                </p>
                <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(250,248,242,0.60)", lineHeight: 1.75 }}>
                  Loyaliteiten, familiepatronen en onbewuste dynamieken. Het
                  systemische deel is 7× groter dan wat je ziet. Pas als je dit
                  ziet, kun je het structureel doorbreken.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── VERGELIJKING ─────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal style={{ marginBottom: "48px" }}>
            <Eyebrow>Waarom Vivynq</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 0" }}
            >
              Hetzelfde inzicht.{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Zonder de drempels.</em>
            </h2>
          </Reveal>

          <Reveal>
            <div style={{ border: "1px solid rgba(15,3,24,0.07)", borderRadius: "3px", overflow: "hidden" }}>
              {/* Koptitels */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  background: "#0F0318",
                  padding: "14px 20px",
                }}
              >
                <span className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(250,248,242,0.40)" }}>Aspect</span>
                <span className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(250,248,242,0.40)" }}>Traditioneel</span>
                <span className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C" }}>Vivynq</span>
              </div>

              {VERGELIJKING.map((r, i) => (
                <div
                  key={r.aspect}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    padding: "16px 20px",
                    background: i % 2 === 0 ? "#fff" : "#FAF8F2",
                    borderTop: "1px solid rgba(15,3,24,0.05)",
                    alignItems: "center",
                  }}
                >
                  <span className="font-ui uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.10em", fontWeight: 600, color: "rgba(15,3,24,0.50)" }}>{r.aspect}</span>
                  <span className="font-ui" style={{ fontSize: "0.87rem", color: "rgba(15,3,24,0.45)" }}>{r.elders}</span>
                  <span className="font-display" style={{ fontSize: "0.95rem", color: "#0F0318", fontWeight: 500 }}>{r.vivynq}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "0", paddingBottom: "0" }}>
        <Container>
          <Reveal>
            <div
              style={{
                padding: "24px 28px",
                background: "#FAF8F2",
                border: "1px solid rgba(15,3,24,0.06)",
                borderLeft: "3px solid rgba(15,3,24,0.15)",
                borderRadius: "2px",
              }}
            >
              <p className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(15,3,24,0.38)", marginBottom: "8px" }}>
                Belangrijk
              </p>
              <p className="font-ui" style={{ fontSize: "0.87rem", color: "rgba(15,3,24,0.60)", lineHeight: 1.78, maxWidth: "740px" }}>
                Vivynq biedt coaching en zelfinzicht — geen therapie, diagnose of
                medische behandeling. Heb je acute klachten of zit je in een crisis?
                Neem contact op met je huisarts of een bevoegd behandelaar. Bij nood
                bel je 112.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal className="max-w-[600px] mx-auto text-center">
            <Eyebrow style={{ color: "rgba(201,168,76,0.72)" }}>Direct van start</Eyebrow>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, margin: "16px auto 18px" }}
            >
              Klaar voor{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>echt</em>{" "}
              inzicht?
            </h2>
            <p
              className="font-ui"
              style={{ fontSize: "0.96rem", color: "rgba(250,248,242,0.56)", lineHeight: 1.78, margin: "0 auto 28px", maxWidth: "440px" }}
            >
              Start met de Zelfscan en ontvang je persoonlijk Q.Code-rapport binnen
              30 minuten. Of plan een vrijblijvende kennismaking.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <GoldLink href="/scan">Doe de Zelfscan</GoldLink>
              <Link
                href="/start"
                className="font-ui"
                style={{ fontSize: "0.86rem", color: "rgba(250,248,242,0.42)", alignSelf: "center" }}
              >
                Of plan een gesprek →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
