import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, GoldLink, GhostLink, SectionTitle, Lead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ZAKELIJK } from "@/lib/products";

export const metadata: Metadata = {
  title: "Zakelijk — VIVYNQ",
  description:
    "Systemische team- en leiderschapscoaching voor zorg, onderwijs en gemeente. TeamScan + Rapport, TeamScan + Interventiedag en Eigenaarschapstraject. Op aanvraag.",
};

const WAAROM = [
  {
    n: "01",
    t: "Systemisch werken",
    d: "Wij kijken verder dan gedrag. We analyseren de patronen en dynamieken die onder het zichtbare liggen — en die de prestaties van uw team bepalen.",
  },
  {
    n: "02",
    t: "Meetbaar resultaat",
    d: "Geen vaag 'beter samenwerken'. Wij definiëren gedragsKPI's en leveren een rapport dat u kunt presenteren aan de directie.",
  },
  {
    n: "03",
    t: "Minimale contacttijd",
    d: "Online methodieken zorgen ervoor dat uw medewerkers op elk moment en elke locatie kunnen deelnemen. Geen onnodige reistijd.",
  },
];

const KLANTEN = [
  "Teams in zorg, onderwijs en gemeente",
  "Afdelingshoofden en HR-managers",
  "Teams van 4–12 personen",
  "Leidinggevenden die eigenaarschap willen verankeren",
  "Organisaties met terugkerende teamdynamieken",
];

const TEAMSCAN_FLOW = [
  { stap: "Invite", omschrijving: "Elk teamlid ontvangt een persoonlijke link" },
  { stap: "Scan", omschrijving: "30 minuten — DISC + systemische vragen" },
  { stap: "Analyse", omschrijving: "Collectief Q.Code-profiel + Lencioni-meting" },
  { stap: "Rapport", omschrijving: "25–35 pagina's, klaar zodra het team klaar is" },
  { stap: "Gesprek", omschrijving: "Gespreksklare rapportage voor uw volgende sessie" },
];

export default function ZakelijkPage() {
  const teamscan = ZAKELIJK.find((p) => p.slug === "teamscan-rapport")!;
  const interventiedag = ZAKELIJK.find((p) => p.slug === "teamscan-interventiedag")!;
  const eigenaarschap = ZAKELIJK.find((p) => p.slug === "eigenaarschapstraject")!;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          background: "#0F0318",
          paddingTop: "88px",
          paddingBottom: "120px",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,111,160,0.08) 0%, transparent 65%)" }} />
        </div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="vq-rise"><Eyebrow>Vivynq Zakelijk</Eyebrow></div>
              <h1
                className="font-display text-white vq-rise-2"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.0rem)", lineHeight: 1.06, margin: "22px 0 0", letterSpacing: "-0.015em", fontWeight: 500 }}
              >
                Organisaties die presteren,{" "}
                <span className="vq-shimmer" style={{ fontStyle: "italic", fontWeight: 400 }}>
                  begrijpen hun mensen diep.
                </span>
              </h1>
              <div className="vq-rise-3">
                <p className="font-ui" style={{ maxWidth: "540px", marginTop: "24px", fontSize: "1.04rem", color: "rgba(250,248,242,0.72)", lineHeight: 1.82 }}>
                  Vivynq levert systemische team- en leiderschapscoaching met meetbare resultaten.
                  Van een snelle teamscan tot een volledig leiderschapstraject — online, efficiënt,
                  zonder onnodige reistijd.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 vq-rise-4" style={{ marginTop: "32px" }}>
                <Link
                  href="/start"
                  className="vq-cta font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
                  style={{ fontSize: "0.74rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "14px 26px", borderRadius: "2px" }}
                >
                  Plan een oriëntatiegesprek <span className="vq-cta-arrow">→</span>
                </Link>
                <GhostLink href="#producten">Bekijk trajecten</GhostLink>
              </div>
            </div>

            <div className="lg:col-span-5 vq-rise-3">
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.20)", padding: "28px 30px", borderRadius: "3px" }}>
                <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.22em", fontWeight: 700, color: "#C9A84C", marginBottom: "18px" }}>
                  Geschikt voor
                </p>
                <ul className="flex flex-col gap-3">
                  {KLANTEN.map((k) => (
                    <li key={k} className="flex gap-3 items-start">
                      <span style={{ color: "#C9A84C", fontSize: "0.75rem", marginTop: "2px", flexShrink: 0 }}>✦</span>
                      <span className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(242,237,227,0.84)", lineHeight: 1.5 }}>{k}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                  <p className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(200,168,216,0.60)", lineHeight: 1.65 }}>
                    Trajecten zijn online inzetbaar — maximale opbrengst, minimale reistijd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── AANPAK ───────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F2", paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Reveal style={{ marginBottom: "48px" }}>
            <Eyebrow>De aanpak</Eyebrow>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.12, color: "#0F0318", marginTop: "12px" }}>
              Verder dan gedrag. Dieper dan training.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {WAAROM.map((w, i) => (
              <Reveal key={w.n} delay={i * 120}>
                <p className="font-display" style={{ fontSize: "2.4rem", lineHeight: 1, color: "#C9A84C" }}>{w.n}</p>
                <div style={{ height: "2px", background: "#C9A84C", margin: "14px 0 16px", width: "40px" }} />
                <h3 className="font-display" style={{ fontSize: "1.22rem", color: "#0F0318", marginBottom: "8px" }}>{w.t}</h3>
                <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(15,3,24,0.64)", lineHeight: 1.78 }}>{w.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TEAMSCAN-FLOW ─────────────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <Eyebrow>Teamscan in 5 stappen</Eyebrow>
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", lineHeight: 1.12, color: "#0F0318", margin: "14px 0 16px" }}>
                Het collectieve patroon van uw team, zichtbaar
              </h2>
              <p className="font-ui" style={{ fontSize: "0.96rem", color: "rgba(15,3,24,0.66)", lineHeight: 1.82 }}>
                Een teamassessment vereist normaal een dure facilitator en weken doorlooptijd.
                Vivynq levert een collectief rapport voor teams tot 8 personen — direct inzetbaar.
              </p>
              <div className="flex items-baseline gap-4" style={{ marginTop: "22px" }}>
                <p className="font-display" style={{ fontSize: "2rem", color: "#C9A84C", lineHeight: 1 }}>{teamscan.priceLabel}</p>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Link
                  href="/gesprek"
                  className="vq-cta font-ui uppercase inline-flex items-center gap-2 transition-all hover:brightness-110"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "12px 22px", borderRadius: "2px" }}
                >
                  Plan een kennismakingsgesprek <span className="vq-cta-arrow">→</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex flex-col">
                {TEAMSCAN_FLOW.map((item, i) => (
                  <div key={item.stap} className="flex gap-5 items-start">
                    <div className="flex flex-col items-center" style={{ flexShrink: 0, width: "32px" }}>
                      <div style={{ width: "32px", height: "32px", background: "#0F0318", border: "1.5px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", flexShrink: 0 }}>
                        <span className="font-ui" style={{ fontSize: "0.68rem", fontWeight: 700, color: "#C9A84C" }}>{i + 1}</span>
                      </div>
                      {i < TEAMSCAN_FLOW.length - 1 && (
                        <div style={{ width: "1px", height: "32px", background: "rgba(201,168,76,0.22)", margin: "4px 0" }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < TEAMSCAN_FLOW.length - 1 ? "24px" : 0, paddingTop: "5px" }}>
                      <p className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "#C9A84C", marginBottom: "3px" }}>{item.stap}</p>
                      <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(15,3,24,0.68)", lineHeight: 1.6 }}>{item.omschrijving}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── PRODUCTEN B2B ─────────────────────────────────────────────── */}
      <section id="producten" style={{ background: "#FAF8F2", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal style={{ marginBottom: "48px" }}>
            <Eyebrow>Trajecten & Producten</Eyebrow>
            <SectionTitle style={{ marginTop: "12px", color: "#0F0318" }}>
              Van snel inzicht tot diepgaand traject
            </SectionTitle>
          </Reveal>

          <div className="flex flex-col gap-5">
            {/* Teamscan */}
            <Reveal>
              <div className="vq-lift-light" style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.20)", borderLeft: "4px solid #C9A84C", padding: "32px", borderRadius: "3px" }}>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <span className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(15,3,24,0.38)" }}>Snel inzicht</span>
                    <h3 className="font-display" style={{ fontSize: "1.50rem", color: "#0F0318", marginTop: "6px", marginBottom: "10px" }}>{teamscan.name}</h3>
                    <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(15,3,24,0.60)", lineHeight: 1.78 }}>{teamscan.marktgat}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2" style={{ marginTop: "14px" }}>
                      {teamscan.inhoud.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span style={{ color: "#C9A84C", fontSize: "0.72rem", flexShrink: 0, marginTop: "3px" }}>✓</span>
                          <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(15,3,24,0.66)", lineHeight: 1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="font-display" style={{ fontSize: "2.1rem", color: "#C9A84C", lineHeight: 1 }}>{teamscan.priceLabel}</p>
                    <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(15,3,24,0.44)", marginTop: "2px", marginBottom: "16px" }}>vrijblijvend gesprek</p>
                    <Link href="/gesprek" className="vq-cta font-ui uppercase inline-flex items-center gap-1.5 transition-all hover:brightness-110" style={{ fontSize: "0.66rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "10px 16px", borderRadius: "2px" }}>
                      {teamscan.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* TeamScan + Interventiedag */}
            <Reveal>
              <div className="vq-lift-light" style={{ background: "#0F0318", border: "1px solid rgba(201,168,76,0.26)", borderLeft: "4px solid #C9A84C", padding: "32px", borderRadius: "3px" }}>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <span className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(201,168,76,0.55)" }}>Meest gekozen</span>
                    <h3 className="font-display text-white" style={{ fontSize: "1.50rem", marginTop: "6px", marginBottom: "10px" }}>{interventiedag.name}</h3>
                    <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(250,248,242,0.62)", lineHeight: 1.78 }}>{interventiedag.marktgat}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2" style={{ marginTop: "14px" }}>
                      {interventiedag.inhoud.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span style={{ color: "#C9A84C", fontSize: "0.72rem", flexShrink: 0, marginTop: "3px" }}>✓</span>
                          <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(242,237,227,0.70)", lineHeight: 1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="font-display" style={{ fontSize: "2.1rem", color: "#C9A84C", lineHeight: 1 }}>{interventiedag.priceLabel}</p>
                    <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(201,168,76,0.48)", marginTop: "2px", marginBottom: "16px" }}>vrijblijvend gesprek</p>
                    <Link href="/gesprek" className="vq-cta font-ui uppercase inline-flex items-center gap-1.5 transition-all hover:brightness-110" style={{ fontSize: "0.66rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "10px 16px", borderRadius: "2px" }}>
                      {interventiedag.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Eigenaarschapstraject */}
            <Reveal>
              <div className="vq-lift-light" style={{ background: "#fff", border: "1px solid rgba(15,3,24,0.08)", borderLeft: "4px solid rgba(201,168,76,0.35)", padding: "32px", borderRadius: "3px" }}>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <span className="font-ui uppercase" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", fontWeight: 700, color: "rgba(15,3,24,0.38)" }}>Diepgaand traject</span>
                    <h3 className="font-display" style={{ fontSize: "1.50rem", color: "#0F0318", marginTop: "6px", marginBottom: "10px" }}>{eigenaarschap.name}</h3>
                    <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(15,3,24,0.60)", lineHeight: 1.78 }}>{eigenaarschap.marktgat}</p>
                    <ul className="flex flex-col gap-1.5" style={{ marginTop: "14px" }}>
                      {eigenaarschap.inhoud.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span style={{ color: "#C9A84C", fontSize: "0.72rem", flexShrink: 0, marginTop: "3px" }}>✓</span>
                          <span className="font-ui" style={{ fontSize: "0.80rem", color: "rgba(15,3,24,0.66)", lineHeight: 1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="font-display" style={{ fontSize: "2.1rem", color: "#C9A84C", lineHeight: 1 }}>{eigenaarschap.priceLabel}</p>
                    <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(15,3,24,0.44)", marginTop: "2px", marginBottom: "16px" }}>vrijblijvend gesprek</p>
                    <Link href="/gesprek" className="vq-cta font-ui uppercase inline-flex items-center gap-1.5 transition-all hover:brightness-110" style={{ fontSize: "0.66rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "10px 16px", borderRadius: "2px" }}>
                      {eigenaarschap.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#0F0318", paddingTop: "88px", paddingBottom: "88px" }}>
        <Container>
          <Reveal className="text-center max-w-[620px] mx-auto">
            <Eyebrow style={{ color: "rgba(201,168,76,0.72)" }}>Vrijblijvend kennismaken</Eyebrow>
            <h2 className="font-display text-white" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", lineHeight: 1.12, margin: "16px auto 18px" }}>
              Plan een oriëntatiegesprek
            </h2>
            <p className="font-ui" style={{ fontSize: "0.96rem", color: "rgba(250,248,242,0.58)", lineHeight: 1.82, marginBottom: "28px" }}>
              We kijken samen welk traject aansluit bij uw team of organisatie.
              Geen verplichtingen — wel direct concrete inzichten.
            </p>
            <GoldLink href="/start">Plan een gesprek</GoldLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
