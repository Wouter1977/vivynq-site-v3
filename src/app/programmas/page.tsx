import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, SectionTitle, Lead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ONLINE_PROGRAMMAS, B2C_INSTAP, ZAKELIJK } from "@/lib/products";
import type { Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Programma's — VIVYNQ",
  description:
    "Online coachingsprogramma's van Vivynq. Systemisch werk + DISC-inzicht. Direct starten, op jouw tempo. Van zelfscan tot 8-weeks transformatietraject.",
};

function ProgrammaCard({ p, featured }: { p: Product; featured?: boolean }) {
  return (
    <Link
      href={`/programma/${p.slug}`}
      className="vq-lift-light block h-full"
      style={{
        background: featured ? "#0F0318" : "#fff",
        border: featured ? "1px solid rgba(201,168,76,0.30)" : "1px solid rgba(15,3,24,0.08)",
        borderLeft: `4px solid ${featured ? "#C9A84C" : "rgba(201,168,76,0.28)"}`,
        padding: "28px",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "280px",
        textDecoration: "none",
      }}
    >
      <div>
        {featured && (
          <span className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "3px 8px", borderRadius: "1px", display: "inline-block", marginBottom: "12px" }}>
            Flagship
          </span>
        )}
        <h3 className="font-display" style={{ fontSize: "1.28rem", color: featured ? "#fff" : "#0F0318", lineHeight: 1.20, marginBottom: "10px" }}>
          {p.name}
        </h3>
        {p.openingsstelling ? (
          <p className="font-ui" style={{ fontSize: "0.84rem", color: featured ? "rgba(250,248,242,0.55)" : "rgba(15,3,24,0.55)", lineHeight: 1.65 }}>
            {p.openingsstelling.split(".")[0] + "."}
          </p>
        ) : (
          <p className="font-ui" style={{ fontSize: "0.84rem", color: featured ? "rgba(250,248,242,0.55)" : "rgba(15,3,24,0.55)", lineHeight: 1.65 }}>
            {p.tagline}
          </p>
        )}
      </div>
      <div
        style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: `1px solid ${featured ? "rgba(201,168,76,0.20)" : "rgba(15,3,24,0.07)"}`,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span className="font-display" style={{ fontSize: "1.55rem", color: "#C9A84C", lineHeight: 1 }}>{p.priceLabel}</span>
          {p.duur && (
            <span className="font-ui" style={{ fontSize: "0.68rem", color: featured ? "rgba(201,168,76,0.45)" : "rgba(15,3,24,0.36)", marginLeft: "8px" }}>
              · {p.duur}
            </span>
          )}
        </div>
        <span className="font-ui" style={{ fontSize: "0.72rem", color: "#C9A84C", fontWeight: 600 }}>Bekijk →</span>
      </div>
    </Link>
  );
}

function InstapCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/programma/${p.slug}`}
      className="vq-lift-light block"
      style={{
        background: "#fff",
        border: "1px solid rgba(15,3,24,0.08)",
        borderLeft: "4px solid rgba(201,168,76,0.35)",
        padding: "22px 24px",
        borderRadius: "3px",
        textDecoration: "none",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div style={{ flex: 1 }}>
          <h3 className="font-display" style={{ fontSize: "1.10rem", color: "#0F0318", lineHeight: 1.22, marginBottom: "6px" }}>
            {p.name}
          </h3>
          <p className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(15,3,24,0.55)", lineHeight: 1.60 }}>
            {p.tagline}
          </p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p className="font-display" style={{ fontSize: "1.32rem", color: "#C9A84C", lineHeight: 1 }}>{p.priceLabel}</p>
          <p className="font-ui" style={{ fontSize: "0.66rem", color: "rgba(15,3,24,0.36)", marginTop: "4px" }}>Bekijk →</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProgrammasPage() {
  const featured = ONLINE_PROGRAMMAS.find((p) => p.featured);
  const overige = ONLINE_PROGRAMMAS.filter((p) => !p.featured);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "96px", paddingBottom: "96px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)" }} />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="max-w-[720px]">
            <div className="vq-rise"><Eyebrow>Alle Programma&apos;s</Eyebrow></div>
            <h1
              className="font-display text-white vq-rise-2"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", lineHeight: 1.04, margin: "20px 0 0", letterSpacing: "-0.018em", fontWeight: 500 }}
            >
              Jij weet al wat er moet veranderen.{" "}
              <span className="vq-shimmer" style={{ fontStyle: "italic", fontWeight: 400 }}>Dit helpt je het doen.</span>
            </h1>
            <div className="vq-rise-3">
              <Lead style={{ marginTop: "24px", fontSize: "1.04rem", color: "rgba(250,248,242,0.65)", maxWidth: "560px" }}>
                Systemisch werk gecombineerd met DISC-inzicht. Direct starten na aankoop,
                op jouw eigen tempo. Persoonlijk rapport na elke module.
              </Lead>
            </div>
            <div className="vq-rise-4" style={{ marginTop: "28px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { getal: "5", label: "online programma's" },
                { getal: "2 – 8", label: "weken doorlooptijd" },
                { getal: "100%", label: "op jouw tempo" },
              ].map((stat) => (
                <div key={stat.label} style={{ paddingRight: "24px", borderRight: "1px solid rgba(201,168,76,0.18)" }}>
                  <p className="font-display" style={{ fontSize: "1.80rem", color: "#C9A84C", lineHeight: 1 }}>{stat.getal}</p>
                  <p className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(250,248,242,0.42)", letterSpacing: "0.06em", marginTop: "4px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── ONLINE PROGRAMMA'S ────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "88px", paddingBottom: "64px" }}>
        <Container>
          <Reveal style={{ marginBottom: "48px" }}>
            <Eyebrow>Online programma&apos;s</Eyebrow>
            <SectionTitle style={{ marginTop: "12px", color: "#0F0318" }}>
              Systemisch werken. Op jouw moment.
            </SectionTitle>
            <Lead style={{ marginTop: "14px", color: "rgba(15,3,24,0.58)", maxWidth: "560px" }}>
              Elk programma is gebouwd op één van de vijf systemische basisvragen.
              DISC-gesplitst, lichaamsgeoriënteerd, direct toepasbaar.
            </Lead>
          </Reveal>

          {/* Flagship prominently featured */}
          {featured && (
            <Reveal style={{ marginBottom: "20px" }}>
              <Link
                href={`/programma/${featured.slug}`}
                className="vq-lift-light block"
                style={{
                  background: "linear-gradient(135deg, #0F0318 0%, #1A0729 100%)",
                  border: "1px solid rgba(201,168,76,0.32)",
                  borderLeft: "5px solid #C9A84C",
                  padding: "40px 44px",
                  borderRadius: "3px",
                  textDecoration: "none",
                  boxShadow: "0 2px 40px -8px rgba(201,168,76,0.08)",
                }}
              >
                <div className="grid md:grid-cols-[1fr,auto] gap-6 items-end">
                  <div>
                    <span className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.20em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "3px 9px", borderRadius: "1px", display: "inline-block", marginBottom: "14px" }}>
                      Meest gekozen
                    </span>
                    <h3 className="font-display text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.14, marginBottom: "12px", fontWeight: 500 }}>
                      {featured.name}
                    </h3>
                    <p className="font-ui" style={{ fontSize: "0.94rem", color: "rgba(250,248,242,0.55)", lineHeight: 1.75, maxWidth: "600px" }}>
                      {featured.openingsstelling ?? featured.tagline}
                    </p>
                    {featured.transformatie && (
                      <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(201,168,76,0.65)", marginTop: "12px", lineHeight: 1.65, fontStyle: "italic" }}>
                        Van: {featured.transformatie.voor.split(".")[0]}.
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: "right", minWidth: "120px" }}>
                    <p className="font-display" style={{ fontSize: "2.2rem", color: "#C9A84C", lineHeight: 1 }}>{featured.priceLabel}</p>
                    {featured.duur && (
                      <p className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(201,168,76,0.45)", marginTop: "6px" }}>{featured.duur}</p>
                    )}
                    <p className="font-ui uppercase" style={{ fontSize: "0.70rem", letterSpacing: "0.10em", color: "rgba(250,248,242,0.40)", fontWeight: 600, marginTop: "14px" }}>
                      Bekijk programma →
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Overige programma's */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
            {overige.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProgrammaCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INSTAP ───────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "72px", paddingBottom: "72px" }}>
        <Container>
          <Reveal style={{ marginBottom: "36px" }}>
            <Eyebrow>Laagdrempelig beginnen</Eyebrow>
            <SectionTitle style={{ marginTop: "10px", color: "#0F0318" }}>
              Begin met een zelfscan
            </SectionTitle>
            <Lead style={{ marginTop: "12px", color: "rgba(15,3,24,0.58)", maxWidth: "520px" }}>
              Jouw Q.Code rapport geeft direct taal voor wat je altijd al voelde maar niet kon benoemen.
              Het beste vertrekpunt voor elk programma of traject.
            </Lead>
          </Reveal>

          <div className="flex flex-col gap-4 max-w-[640px]">
            {B2C_INSTAP.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <InstapCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SYSTEMISCH METHODE INTERMEZZO ────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "72px", paddingBottom: "72px" }}>
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-[1fr,1.4fr] gap-16 items-center">
              <div>
                <Eyebrow style={{ color: "rgba(201,168,76,0.65)" }}>De methode</Eyebrow>
                <h2 className="font-display text-white" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", lineHeight: 1.12, margin: "14px 0 0" }}>
                  Systemisch werk + DISC. Twee lagen. Één antwoord.
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { v: "Gedrag zien", o: "DISC-profiel laat zien hoe jij je gedraagt in contact met anderen." },
                  { v: "Patronen begrijpen", o: "Systemisch werk laat zien waar jouw gedrag vandaan komt en wat het in stand houdt." },
                  { v: "Bewust kiezen", o: "De combinatie geeft je de vrijheid om anders te kiezen — vanuit inzicht, niet vanuit reflex." },
                ].map((item, i) => (
                  <Reveal key={item.v} delay={i * 80}>
                    <div style={{ padding: "18px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "2px" }}>
                      <p className="font-display" style={{ fontSize: "1rem", color: "#C9A84C", marginBottom: "6px" }}>{item.v}</p>
                      <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(250,248,242,0.52)", lineHeight: 1.70 }}>{item.o}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── ZAKELIJK ─────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal style={{ marginBottom: "44px" }}>
            <Eyebrow>Voor organisaties</Eyebrow>
            <SectionTitle style={{ marginTop: "10px", color: "#0F0318" }}>
              Team- en leiderschapscoaching
            </SectionTitle>
            <Lead style={{ marginTop: "12px", color: "rgba(15,3,24,0.62)", maxWidth: "540px" }}>
              Systemisch werken op team- en leiderschapsniveau. Minimale contacttijd, maximale impact — in zorg, onderwijs en gemeente.
            </Lead>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ZAKELIJK.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href="/start"
                  className="vq-lift-light block h-full"
                  style={{
                    background: p.featured ? "#0F0318" : "#fff",
                    border: p.featured ? "1px solid rgba(201,168,76,0.28)" : "1px solid rgba(15,3,24,0.08)",
                    borderLeft: `4px solid ${p.featured ? "#C9A84C" : "rgba(201,168,76,0.28)"}`,
                    padding: "28px",
                    borderRadius: "3px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "240px",
                    textDecoration: "none",
                  }}
                >
                  <div>
                    {p.featured && (
                      <span className="font-ui uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "3px 8px", borderRadius: "1px", display: "inline-block", marginBottom: "12px" }}>
                        Aanbevolen
                      </span>
                    )}
                    <h2 className="font-display" style={{ fontSize: "1.22rem", color: p.featured ? "#fff" : "#0F0318", lineHeight: 1.22, marginBottom: "10px" }}>
                      {p.name}
                    </h2>
                    <p className="font-ui" style={{ fontSize: "0.82rem", color: p.featured ? "rgba(250,248,242,0.55)" : "rgba(15,3,24,0.55)", lineHeight: 1.65 }}>
                      {p.openingsstelling ? p.openingsstelling.split(".")[0] + "." : p.tagline}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: "18px",
                      paddingTop: "16px",
                      borderTop: `1px solid ${p.featured ? "rgba(201,168,76,0.18)" : "rgba(15,3,24,0.07)"}`,
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="font-display" style={{ fontSize: "1.20rem", color: "#C9A84C", lineHeight: 1 }}>{p.priceLabel}</span>
                    <span className="font-ui" style={{ fontSize: "0.70rem", color: "#C9A84C", fontWeight: 600 }}>Plan gesprek →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── COACHING DISCLAIMER ──────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "40px", paddingBottom: "40px", borderTop: "1px solid rgba(15,3,24,0.06)" }}>
        <Container>
          <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(15,3,24,0.40)", lineHeight: 1.80, maxWidth: "680px" }}>
            <strong style={{ color: "rgba(15,3,24,0.55)", fontWeight: 600 }}>Coaching — geen zorg.</strong>{" "}
            Vivynq biedt uitsluitend persoonlijke coaching gericht op zelfinzicht, gedragsverandering en persoonlijke
            ontwikkeling. Onze programma's vallen niet onder de Wkkgz en staan niet onder toezicht van de NZa.
            De programma's zijn niet bedoeld als vervanging van reguliere (geestelijke) gezondheidszorg.
            Bij psychische klachten adviseren wij altijd een bevoegd behandelaar te raadplegen.
          </p>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal className="text-center max-w-[580px] mx-auto">
            <Eyebrow style={{ color: "rgba(201,168,76,0.65)" }}>Weet je het nog niet zeker?</Eyebrow>
            <h2 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", lineHeight: 1.12, margin: "16px auto 16px" }}>
              We kijken samen welk programma bij jou past.
            </h2>
            <p className="font-ui" style={{ fontSize: "0.92rem", color: "rgba(250,248,242,0.50)", lineHeight: 1.82, marginBottom: "28px" }}>
              Gratis, vrijblijvend kennismakingsgesprek.
              Wouter denkt mee — geen salesgesprek.
            </p>
            <Link
              href="/start"
              className="vq-cta font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
              style={{ fontSize: "0.76rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "14px 28px", borderRadius: "2px" }}
            >
              Plan een gesprek <span className="vq-cta-arrow">→</span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
