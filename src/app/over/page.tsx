import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, GoldLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Over Wouter — VIVYNQ",
  description:
    "Holistisch coach en DISC-specialist. Ik help ambitieuze professionals hun patroon doorbreken en bewuste keuzes maken. Geen trucjes — diepgang die werkt.",
};

const OVERTUIGINGEN = [
  {
    nr: "I",
    stelling: "Verandering begint bij eerlijkheid — niet bij een nieuw plan.",
    toelichting:
      "De meeste mensen weten al wat ze moeten doen. Wat ontbreekt is inzicht in wat hen tegenhoudt.",
  },
  {
    nr: "II",
    stelling: "Wat jij draagt, heb je niet altijd zelf gekozen.",
    toelichting:
      "Veel patronen zijn overgenomen — uit je gezin, je systeem, je geschiedenis. Zien is de eerste stap naar kiezen.",
  },
  {
    nr: "III",
    stelling: "Coaching zonder diepgang is oppervlaktewerk.",
    toelichting:
      "Ik ga naar het patroon onder het gedrag. Dat is waar de echte beweging zit.",
  },
];

const METHODIEK = [
  {
    mark: "D",
    naam: "DISC · Q.Code",
    sub: "Boven het water",
    kleur: "#C9A84C",
    omschrijving:
      "Zichtbaar gedrag, communicatiestijl, drijfveren. DISC brengt in kaart hoe jij beweegt in de wereld — en hoe dat overkomt op anderen.",
  },
  {
    mark: "S",
    naam: "Systemisch werk",
    sub: "Onder het water",
    kleur: "#8B6FA0",
    omschrijving:
      "Loyaliteiten, uitsluitingen, volgorde in het systeem. Wat jij draagt, van wie het is, en hoe je de ruimte terugkrijgt die van jou is.",
  },
  {
    mark: "H",
    naam: "Hechtingstheorie",
    sub: "De basis",
    kleur: "#6B8FA0",
    omschrijving:
      "Hoe jij je in vroege relaties hebt leren aanpassen vormt je tot op de dag van vandaag. Inzicht hierin maakt gedragsverandering duurzaam.",
  },
  {
    mark: "A",
    naam: "ACT · Mindfulness",
    sub: "De praktijk",
    kleur: "#4A7A5C",
    omschrijving:
      "Acceptatie en commitment als tools om anders om te gaan met moeilijke gedachten en gevoelens. Praktisch, niet therapeutisch.",
  },
];

const CREDENTIALS = [
  { jaar: "2018", titel: "ZOMA Holistisch Coach", org: "ZOMA Academie · gecertificeerd" },
  { jaar: "2020", titel: "DISC Practitioner", org: "TalentFirst · gecertificeerd" },
  { jaar: "2021", titel: "Q.Code Methodiek", org: "Systemisch gedragsmodel · verdieping" },
  { jaar: "2023", titel: "Systemisch Werk", org: "Opstelling en systeemkijken · opleiding" },
];

export default function OverPage() {
  return (
    <>
      {/* ── HERO — editorial typografie als visueel anker ─────────────── */}
      <section
        style={{
          background: "#08060F",
          position: "relative",
          overflow: "hidden",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />

        {/* Achtergrond gloed */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-8%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "-5%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,111,160,0.06) 0%, transparent 65%)",
            }}
          />
        </div>

        <Container style={{ position: "relative", zIndex: 2, paddingTop: "120px", paddingBottom: "100px" }}>
          <div className="max-w-[860px]">
            {/* Eyebrow */}
            <div className="vq-rise flex items-center gap-4" style={{ marginBottom: "32px" }}>
              <span
                className="font-ui uppercase"
                style={{ fontSize: "0.62rem", letterSpacing: "0.28em", fontWeight: 700, color: "rgba(201,168,76,0.65)" }}
              >
                Over Wouter Huijbregts
              </span>
              <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "rgba(201,168,76,0.25)" }} />
              <span
                className="font-ui"
                style={{ fontSize: "0.62rem", color: "rgba(250,248,242,0.30)", letterSpacing: "0.10em" }}
              >
                Holistisch Coach · DISC-specialist
              </span>
            </div>

            {/* Hoofd-statement — oversized Fraunces italic */}
            <h1
              className="font-display text-white vq-rise-2"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
                lineHeight: 1.04,
                fontWeight: 500,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Ik geloof in{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>eerlijkheid</em>
              <br />
              boven{" "}
              <em style={{ fontStyle: "italic", color: "rgba(250,248,242,0.90)" }}>makkelijke antwoorden.</em>
            </h1>

            {/* Subtekst */}
            <div className="vq-rise-3">
              <p
                className="font-ui"
                style={{
                  fontSize: "clamp(0.96rem, 1.8vw, 1.12rem)",
                  color: "rgba(250,248,242,0.60)",
                  lineHeight: 1.78,
                  marginTop: "28px",
                  maxWidth: "560px",
                }}
              >
                Vivynq is mijn praktijk: een plek voor mensen die klaar zijn om
                voorbij het symptoom te kijken. Naar het patroon eronder. Naar
                wat er echt speelt.
              </p>
            </div>

            {/* Scroll-hint */}
            <div className="vq-rise-4 flex items-center gap-3" style={{ marginTop: "52px" }}>
              <div
                style={{
                  width: "1px",
                  height: "48px",
                  background: "linear-gradient(to bottom, rgba(201,168,76,0.0), rgba(201,168,76,0.5))",
                }}
              />
              <span
                className="font-ui"
                style={{ fontSize: "0.66rem", letterSpacing: "0.18em", color: "rgba(201,168,76,0.50)", textTransform: "uppercase" }}
              >
                Mijn verhaal
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── OVERTUIGINGEN — drie kerngeloven als editorial quotes ─────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "96px", paddingBottom: "96px" }}>
        <Container>
          <Reveal style={{ marginBottom: "56px" }}>
            <Eyebrow>Mijn overtuigingen</Eyebrow>
          </Reveal>

          <div className="flex flex-col gap-0">
            {OVERTUIGINGEN.map((o, i) => (
              <Reveal key={o.nr} delay={i * 100}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    alignItems: "start",
                    gap: "32px",
                    paddingTop: "40px",
                    paddingBottom: "40px",
                    borderBottom: "1px solid rgba(15,3,24,0.08)",
                    borderTop: i === 0 ? "1px solid rgba(15,3,24,0.08)" : undefined,
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "rgba(201,168,76,0.22)",
                      lineHeight: 1,
                      fontStyle: "italic",
                      paddingTop: "4px",
                    }}
                  >
                    {o.nr}
                  </span>
                  <div>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "clamp(1.22rem, 2.5vw, 1.7rem)",
                        color: "#0F0318",
                        lineHeight: 1.25,
                        fontStyle: "italic",
                        marginBottom: "10px",
                      }}
                    >
                      {o.stelling}
                    </p>
                    <p
                      className="font-ui"
                      style={{ fontSize: "0.90rem", color: "rgba(15,3,24,0.58)", lineHeight: 1.72, maxWidth: "540px" }}
                    >
                      {o.toelichting}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── MIJN VERHAAL — split met portret-slot ────────────────────── */}
      <section
        style={{
          background: "#0F0318",
          paddingTop: "96px",
          paddingBottom: "96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Tekst-kant */}
            <div>
              <Reveal>
                <Eyebrow style={{ color: "rgba(201,168,76,0.72)" }}>Mijn achtergrond</Eyebrow>
                <h2
                  className="font-display text-white"
                  style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", lineHeight: 1.12, margin: "14px 0 26px" }}
                >
                  Praktisch geschoold,{" "}
                  <em style={{ color: "#C9A84C" }}>diepgaand</em> gevormd
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <p
                  className="font-ui"
                  style={{ fontSize: "1.00rem", color: "rgba(250,248,242,0.68)", lineHeight: 1.82, marginBottom: "22px" }}
                >
                  Mijn achtergrond is niet academisch — hij is praktisch. Ik leerde
                  het vak door er zelf doorheen te gaan. Door te ondernemen, te
                  falen, te bouwen en te begrijpen wat echt werkt.
                </p>
                <p
                  className="font-ui"
                  style={{ fontSize: "1.00rem", color: "rgba(250,248,242,0.68)", lineHeight: 1.82, marginBottom: "22px" }}
                >
                  Mijn opleiding tot holistisch coach (ZOMA) en mijn certificering
                  als DISC-specialist (TalentFirst) gaven taal aan wat ik
                  intuïtief al begreep: mensen handelen vanuit patronen die ze
                  zelf niet altijd zien.
                </p>
                <p
                  className="font-ui"
                  style={{ fontSize: "1.00rem", color: "rgba(250,248,242,0.68)", lineHeight: 1.82 }}
                >
                  Vivynq is mijn antwoord op de vraag: hoe geef ik mensen diepgang
                  zonder hen in therapie te trekken? Hoe maak ik systemisch inzicht
                  praktisch, toepasbaar, en eerlijk?
                </p>
              </Reveal>

              <Reveal delay={160}>
                <blockquote
                  style={{
                    margin: "36px 0 0",
                    padding: "24px 28px",
                    borderLeft: "3px solid #C9A84C",
                    background: "rgba(201,168,76,0.05)",
                  }}
                >
                  <p
                    className="font-display"
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.42rem)", color: "#FAF8F2", fontStyle: "italic", lineHeight: 1.35, margin: 0 }}
                  >
                    &ldquo;Ik werk niet met diagnoses of labels.
                    Ik werk met jouw leven, zoals het is.&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            </div>

            {/* Portret + credentials */}
            <Reveal delay={120}>
              <figure
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  background: "linear-gradient(160deg, rgba(45,8,50,0.45) 0%, rgba(15,3,24,0.90) 100%)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  overflow: "hidden",
                  marginBottom: "24px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    right: "24px",
                    bottom: "24px",
                    border: "1px solid rgba(201,168,76,0.10)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 50% 35%, rgba(201,168,76,0.06) 0%, transparent 65%)",
                  }}
                />
                {/* Decoratieve letter */}
                <div
                  aria-hidden="true"
                  className="font-display"
                  style={{
                    position: "absolute",
                    bottom: "-0.15em",
                    right: "-0.05em",
                    fontSize: "clamp(12rem, 28vw, 22rem)",
                    lineHeight: 1,
                    fontStyle: "italic",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(201,168,76,0.12)",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  W
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px",
                    textAlign: "center",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(201,168,76,0.40)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: "14px" }}
                  >
                    <circle cx="12" cy="9" r="3.5" />
                    <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
                  </svg>
                  <p
                    className="font-ui uppercase"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.20em", color: "rgba(201,168,76,0.55)", fontWeight: 600 }}
                  >
                    Portret volgt
                  </p>
                </div>
              </figure>

              {/* Credentials */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.jaar}
                    className="flex items-start gap-4"
                    style={{ paddingBottom: "10px", borderBottom: "1px solid rgba(201,168,76,0.10)" }}
                  >
                    <span
                      className="font-ui"
                      style={{
                        fontSize: "0.68rem",
                        color: "rgba(201,168,76,0.55)",
                        fontWeight: 700,
                        minWidth: "38px",
                        paddingTop: "1px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {c.jaar}
                    </span>
                    <div>
                      <p className="font-display" style={{ fontSize: "0.92rem", color: "#FAF8F2", lineHeight: 1.25 }}>{c.titel}</p>
                      <p className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(200,168,216,0.48)", lineHeight: 1.5 }}>{c.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── HOE IK WERK — methodiek in magazine-grid ─────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "96px", paddingBottom: "96px" }}>
        <Container>
          <Reveal style={{ marginBottom: "56px" }}>
            <Eyebrow>Hoe ik werk</Eyebrow>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 0" }}
            >
              Vier lagen.{" "}
              <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Één aanpak.</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {METHODIEK.map((m, i) => (
              <Reveal key={m.mark} delay={i * 90}>
                <div
                  className="vq-lift-light"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(15,3,24,0.07)",
                    padding: "28px 28px 28px 24px",
                    borderRadius: "2px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="font-display"
                    style={{
                      position: "absolute",
                      top: "-0.2em",
                      right: "-0.05em",
                      fontSize: "8rem",
                      lineHeight: 1,
                      fontStyle: "italic",
                      color: "transparent",
                      WebkitTextStroke: `1px ${m.kleur}25`,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {m.mark}
                  </div>
                  <div style={{ position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <div style={{ width: "3px", height: "28px", background: m.kleur, flexShrink: 0 }} />
                      <div>
                        <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: m.kleur }}>{m.sub}</p>
                        <p className="font-display" style={{ fontSize: "1.18rem", color: "#0F0318", lineHeight: 1.15 }}>{m.naam}</p>
                      </div>
                    </div>
                    <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(15,3,24,0.64)", lineHeight: 1.72 }}>
                      {m.omschrijving}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: "40px" }}>
            <div
              style={{
                background: "#0F0318",
                border: "1px solid rgba(201,168,76,0.18)",
                padding: "28px 32px",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <p
                className="font-display text-white"
                style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)", fontStyle: "italic", lineHeight: 1.35, margin: 0, flex: 1, minWidth: "280px" }}
              >
                Geen van deze methodieken is een trucje. Ze zijn lagen van
                hetzelfde inzicht: wie je bent, hoe je dat leerde, en hoe je
                kunt bewegen.
              </p>
              <Link
                href="/hoe-het-werkt"
                className="font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
                style={{ fontSize: "0.70rem", letterSpacing: "0.14em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "12px 20px", borderRadius: "2px", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Hoe het werkt →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── VOOR WIE — eerlijkheid over scope ────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-14">
            <Reveal>
              <Eyebrow>Duidelijkheid vooraf</Eyebrow>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 20px" }}
              >
                Coaching is niet{" "}
                <em style={{ fontStyle: "italic", color: "#C9A84C" }}>alles.</em>
              </h2>
              <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(15,3,24,0.66)", lineHeight: 1.80 }}>
                Ik werk met mensen die klaar zijn om te bewegen. Niet met mensen
                in acute psychische crisis — daarvoor verwijs ik door naar een
                bevoegd behandelaar. Coaching en therapie vullen elkaar aan; ze
                zijn niet hetzelfde.
              </p>
              <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(15,3,24,0.66)", lineHeight: 1.80, marginTop: "14px" }}>
                Dit is geen soft-skills training, geen motivatie-sessie en geen
                quick fix. Het is diepgang met richting — voor wie daar klaar
                voor is.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { ja: true, tekst: "Professionals die merken dat ze vastlopen in dezelfde patronen" },
                  { ja: true, tekst: "Teams die begrijpen willen waarom samenwerking stroef gaat" },
                  { ja: true, tekst: "Mensen die klaar zijn om voorbij het symptoom te kijken" },
                  { ja: false, tekst: "Acute psychische klachten of actieve psychiatrische behandeling" },
                  { ja: false, tekst: "Mensen die zoeken naar een quick fix of motivatie-boost" },
                ].map((item) => (
                  <div
                    key={item.tekst}
                    className="flex gap-3 items-start"
                    style={{
                      padding: "14px 18px",
                      background: item.ja ? "rgba(74,122,92,0.05)" : "rgba(176,58,46,0.04)",
                      border: `1px solid ${item.ja ? "rgba(74,122,92,0.15)" : "rgba(176,58,46,0.12)"}`,
                      borderRadius: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        color: item.ja ? "#4A7A5C" : "#B03A2E",
                        flexShrink: 0,
                        paddingTop: "2px",
                      }}
                    >
                      {item.ja ? "✓" : "×"}
                    </span>
                    <span className="font-ui" style={{ fontSize: "0.87rem", color: "rgba(15,3,24,0.70)", lineHeight: 1.60 }}>
                      {item.tekst}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CTA — persoonlijke uitnodiging ────────────────────────────── */}
      <section
        style={{
          background: "#0F0318",
          paddingTop: "96px",
          paddingBottom: "96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
            }}
          />
        </div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <Reveal className="max-w-[640px] mx-auto text-center">
            <p
              className="font-display text-white"
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.6rem)", lineHeight: 1.22, fontStyle: "italic", marginBottom: "12px" }}
            >
              Als dit klinkt als wat jij zoekt —{" "}
              <em style={{ color: "#C9A84C", fontStyle: "normal" }}>laten we praten.</em>
            </p>
            <p
              className="font-ui"
              style={{ fontSize: "0.95rem", color: "rgba(250,248,242,0.55)", lineHeight: 1.78, margin: "0 auto 32px", maxWidth: "440px" }}
            >
              Een vrijblijvende kennismaking van 30 minuten. We kijken samen
              of er een klik is en welk programma past. Geen druk.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <GoldLink href="/start">Plan een kennismaking</GoldLink>
              <Link
                href="/programmas"
                className="font-ui"
                style={{ fontSize: "0.86rem", color: "rgba(250,248,242,0.44)", alignSelf: "center" }}
              >
                Of bekijk de programma&apos;s →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
