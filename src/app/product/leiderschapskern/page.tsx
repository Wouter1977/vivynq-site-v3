import type { Metadata } from "next";
import { Container, Eyebrow, SectionTitle, Lead, Card, GoldLink, GhostLink } from "@/components/ui";
import { CheckoutForm } from "@/components/checkout-form";
import { PILLARS, MODULES, PRICING, FLOW, FAQ, USP, DELIVERABLES } from "./data";

export const metadata: Metadata = {
  title: "LEIDERSCHAPSKERN | Eigenaarschap & Burnoutpreventie | Vivynq",
  description:
    "Systemisch leiderschapsprogramma met DISC, geweldloze communicatie en meetbare gedragsKPI's. Voor teams van 25–250 medewerkers. Vraag vrijblijvend advies aan.",
  openGraph: {
    title: "LEIDERSCHAPSKERN | Vivynq",
    description:
      "Systemisch leiderschapsprogramma met DISC, geweldloze communicatie en meetbare gedragsKPI's.",
    images: [{ url: "/og-leiderschapskern.jpg", width: 1200, height: 628, alt: "LEIDERSCHAPSKERN door VIVYNQ" }],
  },
};

export default function LeiderschapskernPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ paddingTop: "64px", paddingBottom: "80px" }}>
        <Container>
          <Eyebrow>Zakelijk &mdash; Leiderschapsontwikkeling</Eyebrow>
          <h1
            className="font-display text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.1, margin: "16px 0 20px", maxWidth: "780px" }}
          >
            Leiders die eigenaarschap nemen, bouwen teams die het{" "}
            <span className="text-goud italic">houden.</span>
          </h1>
          <Lead style={{ maxWidth: "600px", marginBottom: "32px" }}>
            Een systemisch leiderschapsprogramma voor organisaties van 25 tot 250 medewerkers.
            Gebouwd op DISC-diagnostiek, geweldloze communicatie en meetbare gedragsKPI&apos;s
            &mdash; met automatische rapportage en 90-dagen voortgangsborging.
          </Lead>
          <div className="flex flex-wrap gap-4">
            <GoldLink href="#intake">Vraag een kennismakingsgesprek aan</GoldLink>
            <GhostLink href="#programma">Bekijk het programma</GhostLink>
          </div>
          <div
            style={{ marginTop: "48px", padding: "18px 22px", border: "1px solid rgba(201,168,76,0.22)", background: "rgba(201,168,76,0.04)", maxWidth: "560px" }}
          >
            <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(200,168,216,0.85)", lineHeight: 1.65 }}>
              <span className="text-goud font-bold">ROI-perspectief:</span> één burnout-geval kost een
              organisatie gemiddeld &euro;&thinsp;40.000&ndash;&euro;&thinsp;80.000. Het volledige
              LEIDERSCHAPSKERN-programma kost &euro;&thinsp;4.750. ROI-ratio minimaal 1&thinsp;:&thinsp;8.
            </p>
          </div>
        </Container>
      </section>

      {/* ── PROBLEEM ── */}
      <section
        style={{ paddingTop: "72px", paddingBottom: "72px", background: "rgba(15,3,24,0.65)", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
      >
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>Het probleem</Eyebrow>
              <SectionTitle style={{ margin: "14px 0 20px" }}>
                Waarom de meeste leiderschapstrainingen{" "}
                <span className="text-goud italic">onvoldoende beklijven</span>
              </SectionTitle>
              <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(200,168,216,0.85)", lineHeight: 1.75, marginBottom: "18px" }}>
                De meeste leiderschapstrainingen stoppen bij inzicht. Een deelnemer begrijpt zichzelf
                beter na twee dagen en gaat maandag terug naar het werk &mdash; waar niets is veranderd.
                Zonder een gestructureerde vertaalslag van inzicht naar gedrag, zonder meting, en
                zonder systemisch begrip van de context verdampt wat geleerd is binnen zes weken.
              </p>
              <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(200,168,216,0.85)", lineHeight: 1.75 }}>
                Burnout, hoog verloop en lage betrokkenheid zijn zelden het gevolg van individueel
                falen. Ze zijn symptomen van een systeem dat leiders onvoldoende toerust om
                eigenaarschap te activeren. LEIDERSCHAPSKERN brengt dat systeem in kaart &mdash;
                en geeft uw leidinggevenden de gereedschappen om het structureel te veranderen.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {USP.map((u) => (
                <Card key={u.label} style={{ padding: "22px 24px" }}>
                  <p className="font-ui font-bold text-goud" style={{ fontSize: "0.82rem", letterSpacing: "0.04em", marginBottom: "8px" }}>
                    ◆ {u.label}
                  </p>
                  <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(200,168,216,0.82)", lineHeight: 1.65 }}>
                    {u.body}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── DRIE PIJLERS ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }} id="programma">
        <Container>
          <Eyebrow>De drie pijlers van LEIDERSCHAPSKERN</Eyebrow>
          <SectionTitle style={{ margin: "14px 0 48px", maxWidth: "700px" }}>
            Eigenaarschap, communicatie en{" "}
            <span className="text-goud italic">welzijn</span>
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <Card key={p.nr} style={{ padding: "28px" }}>
                <span className="font-display text-goud" style={{ fontSize: "2rem", lineHeight: 1, opacity: 0.35, display: "block", marginBottom: "14px" }}>
                  {p.nr}
                </span>
                <h3 className="font-display text-white" style={{ fontSize: "1.1rem", marginBottom: "12px", lineHeight: 1.25 }}>
                  {p.label}
                </h3>
                <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(200,168,216,0.82)", lineHeight: 1.7, marginBottom: "16px" }}>
                  {p.body}
                </p>
                <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(201,168,76,0.8)", borderTop: "1px solid rgba(201,168,76,0.14)", paddingTop: "12px", lineHeight: 1.55 }}>
                  {p.kpi}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROGRAMMAFLOW ── */}
      <section
        style={{ paddingTop: "72px", paddingBottom: "80px", background: "rgba(15,3,24,0.6)", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
      >
        <Container>
          <Eyebrow>Van opdracht tot eindadvies</Eyebrow>
          <SectionTitle style={{ margin: "14px 0 48px" }}>
            De <span className="text-goud italic">geautomatiseerde</span> programmaflow
          </SectionTitle>
          <div className="flex flex-col">
            {FLOW.map((step, i) => (
              <div
                key={step.nr}
                className="grid md:grid-cols-[72px_1fr] gap-6"
                style={{ paddingTop: i > 0 ? "28px" : "0", paddingBottom: "28px", borderBottom: i < FLOW.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none" }}
              >
                <span className="font-display text-goud" style={{ fontSize: "2.2rem", lineHeight: 1, opacity: 0.4 }}>
                  {step.nr}
                </span>
                <div>
                  <h3 className="font-display text-white" style={{ fontSize: "1.1rem", marginBottom: "7px" }}>
                    {step.title}
                  </h3>
                  <p className="font-ui" style={{ fontSize: "0.9rem", color: "rgba(200,168,216,0.82)", lineHeight: 1.7 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5 MODULES ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Eyebrow>Programma-inhoud</Eyebrow>
          <SectionTitle style={{ margin: "14px 0 14px" }}>
            Vijf modules, &eacute;&eacute;n <span className="text-goud italic">teamdag</span>
          </SectionTitle>
          <Lead style={{ marginBottom: "48px", maxWidth: "560px" }}>
            Elke module bouwt voort op de vorige. Deelnemers brengen huiswerk, echte situaties
            en persoonlijk reflectiemateriaal mee.
          </Lead>
          <div className="flex flex-col gap-5">
            {MODULES.map((m) => (
              <div key={m.nr} className="grid md:grid-cols-[56px_1fr] gap-5 items-start" style={{ borderLeft: "2px solid rgba(201,168,76,0.3)", paddingLeft: "20px" }}>
                <span className="font-display text-goud" style={{ fontSize: "1.8rem", lineHeight: 1, opacity: 0.5 }}>
                  {m.nr}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-display text-white" style={{ fontSize: "1.05rem" }}>{m.title}</h3>
                    <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(201,168,76,0.65)", letterSpacing: "0.06em" }}>{m.duur}</span>
                  </div>
                  <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(200,168,216,0.82)", lineHeight: 1.65 }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "56px" }}>
            <p className="font-ui uppercase text-goud" style={{ fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700, marginBottom: "16px" }}>
              Wat deelnemers meenemen
            </p>
            <ul className="flex flex-col gap-3">
              {DELIVERABLES.map((line) => (
                <li key={line} className="flex gap-3">
                  <span style={{ color: "#C9A84C", flexShrink: 0 }}>&#10003;</span>
                  <span className="font-ui" style={{ fontSize: "0.9rem", color: "rgba(200,168,216,0.9)", lineHeight: 1.55 }}>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── PRICING ── */}
      <section
        style={{ paddingTop: "72px", paddingBottom: "80px", background: "rgba(15,3,24,0.65)", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
      >
        <Container>
          <Eyebrow>Tarieven</Eyebrow>
          <SectionTitle style={{ margin: "14px 0 14px" }}>
            Drie instapniveaus &mdash; <span className="text-goud italic">begin waar het past</span>
          </SectionTitle>
          <Lead style={{ marginBottom: "48px", maxWidth: "540px" }}>
            Start laagdrempelig met de Eigenaarschapsscan en besluit na het rapport of het volledige
            programma past. Conversie target van scan naar programma: 60&thinsp;%.
          </Lead>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((tier) => (
              <Card
                key={tier.tier}
                style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px", border: !tier.ghost ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(201,168,76,0.18)" }}
              >
                <div>
                  <p className="font-ui font-bold text-goud" style={{ fontSize: "0.76rem", letterSpacing: "0.08em", marginBottom: "10px" }}>
                    {tier.tier}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-white" style={{ fontSize: "2rem" }}>{tier.prijs}</span>
                    <span className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(200,168,216,0.6)" }}>{tier.btw}</span>
                  </div>
                </div>
                <p className="font-ui" style={{ fontSize: "0.85rem", color: "rgba(200,168,216,0.82)", lineHeight: 1.65, flexGrow: 1 }}>
                  {tier.omschrijving}
                </p>
                {tier.ghost ? (
                  <GhostLink href={tier.href} style={{ textAlign: "center" }}>{tier.cta}</GhostLink>
                ) : (
                  <GoldLink href={tier.href} style={{ textAlign: "center" }}>{tier.cta}</GoldLink>
                )}
              </Card>
            ))}
          </div>
          <p className="font-ui" style={{ marginTop: "20px", fontSize: "0.78rem", color: "rgba(200,168,216,0.5)", lineHeight: 1.6, maxWidth: "680px" }}>
            Annulering tot 14 kalenderdagen voor start: geen kosten. Daarna: 50&thinsp;% verschuldigd.
            No-show: 100&thinsp;%. Betalingstermijn: 50&thinsp;% bij ondertekening, 50&thinsp;% uiterlijk 5 werkdagen voor de teamdag.
          </p>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Container>
          <Eyebrow>Veelgestelde vragen</Eyebrow>
          <SectionTitle style={{ margin: "14px 0 48px" }}>
            Alles wat u wilt <span className="text-goud italic">weten</span>
          </SectionTitle>
          <div className="flex flex-col gap-6" style={{ maxWidth: "760px" }}>
            {FAQ.map((item) => (
              <div key={item.q} style={{ borderLeft: "2px solid rgba(201,168,76,0.35)", paddingLeft: "20px" }}>
                <h3 className="font-display text-white" style={{ fontSize: "1rem", marginBottom: "8px", lineHeight: 1.3 }}>
                  {item.q}
                </h3>
                <p className="font-ui" style={{ fontSize: "0.9rem", color: "rgba(200,168,216,0.82)", lineHeight: 1.7 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INTAKE CTA ── */}
      <section
        id="intake"
        style={{ paddingTop: "80px", paddingBottom: "96px", background: "rgba(15,3,24,0.65)", borderTop: "1px solid rgba(201,168,76,0.12)" }}
      >
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>Kennismakingsgesprek</Eyebrow>
              <SectionTitle style={{ margin: "14px 0 16px" }}>
                Klaar om uw team te{" "}
                <span className="text-goud italic">transformeren?</span>
              </SectionTitle>
              <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(200,168,216,0.85)", lineHeight: 1.75, marginBottom: "24px" }}>
                U werkt rechtstreeks met Wouter Huijbregts &mdash; geen junior consultant, geen
                gestandaardiseerd format. Binnen twee werkdagen ontvangt u een reactie.
              </p>
              <div style={{ padding: "16px 18px", border: "1px solid rgba(201,168,76,0.15)", background: "rgba(15,3,24,0.5)" }}>
                <p className="font-ui" style={{ fontSize: "0.73rem", color: "rgba(200,168,216,0.5)", lineHeight: 1.65 }}>
                  <strong style={{ color: "rgba(200,168,216,0.65)" }}>Disclaimer:</strong> De diensten van
                  VIVYNQ (Wouter Huijbregts) zijn vormen van professionele begeleiding en geen medische of
                  psychologische behandeling in de zin van de Wet BIG of de WGBO. VIVYNQ stelt geen
                  psychologische of medische diagnoses en vervangt geen professionele geestelijke
                  gezondheidszorg. Bij psychische klachten of ernstige werkgerelateerde stresssymptomen
                  wordt doorverwezen naar een geregistreerde BIG-zorgverlener of bedrijfsarts.
                </p>
                <p className="font-ui" style={{ fontSize: "0.73rem", color: "rgba(200,168,216,0.5)", lineHeight: 1.65, marginTop: "8px" }}>
                  De Q.Code-assessment en DISC-gedragsprofielen zijn ontwikkelingsinstrumenten. De uitkomsten
                  zijn niet geschikt als grondslag voor personeelsbeslissingen. Gebruik voor dergelijke
                  doeleinden is contractueel uitgesloten.
                </p>
              </div>
            </div>
            <div>
              <Card style={{ padding: "30px" }}>
                <h2 className="font-display text-white" style={{ fontSize: "1.35rem", marginBottom: "4px" }}>
                  Vraag een kennismakingsgesprek aan
                </h2>
                <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(200,168,216,0.75)", lineHeight: 1.6, marginBottom: "20px" }}>
                  Vertel ons kort waar het over gaat. We nemen binnen 2 werkdagen contact op.
                </p>
                <CheckoutForm
                  slug="leiderschapstraining"
                  ctaLabel="Vraag een kennismakingsgesprek aan"
                  priceLabel="Vrijblijvend gesprek"
                  business
                  showMessage
                />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ── JSON-LD SCHEMA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "LEIDERSCHAPSKERN — Systemisch Leiderschapsprogramma",
                description: "Systemisch leiderschapsprogramma met DISC-diagnostiek, geweldloze communicatie en meetbare gedragsKPI's voor organisaties van 25–250 medewerkers.",
                provider: { "@type": "Person", name: "Wouter Huijbregts", url: "https://vivynq.nl" },
                serviceType: "Leiderschapsontwikkeling Training",
                areaServed: "NL",
                offers: [
                  { "@type": "Offer", name: "Team Eigenaarschapsscan", price: "750", priceCurrency: "EUR" },
                  { "@type": "Offer", name: "LEIDERSCHAPSKERN Programma", price: "4750", priceCurrency: "EUR" },
                  { "@type": "Offer", name: "Kwartaalbegeleiding", price: "590", priceCurrency: "EUR" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
