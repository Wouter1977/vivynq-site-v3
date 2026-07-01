import type { Metadata } from "next";
import { Container, Eyebrow, SectionTitle, Lead, GoldLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Diensten",
  description: "Wat Vivynq voor je doet: 1-op-1 coaching, diepte-analyse en teamtrajecten — premium coaching voor echte verandering.",
};

const DIENSTEN = [
  {
    nr: "01",
    t: "1-op-1 Coaching",
    d: "Persoonlijke, intensieve coaching op jouw tempo. We werken aan de patronen die je tegenhouden en bouwen aan de versie van jezelf die je voor ogen hebt.",
    pts: ["Volledig op maat", "Online of op locatie", "Doelgericht en confronterend waar nodig"],
    href: "/programmas",
    cta: "Bekijk trajecten",
  },
  {
    nr: "02",
    t: "Diepte-scan & analyse",
    d: "De basis van elk traject: een diepe analyse van jouw stijl, drijfveren en blinde vlekken. Direct online beschikbaar.",
    pts: ["Q.Code-profiel: jouw unieke patroon", "Systeem- & vraagstukanalyse", "Concrete groeirichtingen"],
    href: "/scan",
    cta: "Doe de scan",
  },
  {
    nr: "03",
    t: "Team- & organisatietrajecten",
    d: "Maak het collectieve patroon van je team zichtbaar en zet het om in samenwerking die werkt. Schaalbaar, onderbouwd en gespreksklaar.",
    pts: ["Collectief teamprofiel", "Lencioni-teamanalyse", "Coaching voor leiders & teams"],
    href: "/zakelijk",
    cta: "Voor teams",
  },
];

export default function DienstenPage() {
  return (
    <>
      <section style={{ background: "#0F0318", paddingTop: "72px", paddingBottom: "64px" }}>
        <Container>
          <div className="max-w-[720px]">
            <Eyebrow>Diensten</Eyebrow>
            <SectionTitle style={{ margin: "14px 0 16px" }}>
              Coaching die <span className="text-goud" style={{ fontStyle: "italic" }}>doorpakt</span>
            </SectionTitle>
            <Lead>
              Geen losse trucjes, maar een samenhangende aanpak: van diep inzicht naar
              een concreet traject naar zichtbaar resultaat.
            </Lead>
          </div>
        </Container>
      </section>

      <section style={{ background: "#FAF8F2", paddingTop: "72px", paddingBottom: "84px" }}>
        <Container>
          <div className="flex flex-col gap-6">
            {DIENSTEN.map((s) => (
              <div key={s.nr} className="grid md:grid-cols-12 gap-6 items-start" style={{ background: "#fff", border: "1px solid rgba(15,3,24,0.08)", padding: "32px", borderLeft: "3px solid #C9A84C" }}>
                <div className="md:col-span-1">
                  <p className="font-display text-goud" style={{ fontSize: "2rem", lineHeight: 1 }}>{s.nr}</p>
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-display" style={{ fontSize: "1.5rem", color: "#0F0318", marginBottom: "8px" }}>{s.t}</h2>
                  <p className="font-ui" style={{ fontSize: "0.94rem", color: "rgba(15,3,24,0.72)", lineHeight: 1.7 }}>{s.d}</p>
                </div>
                <div className="md:col-span-4">
                  <ul className="flex flex-col gap-2 mb-5">
                    {s.pts.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span style={{ color: "#C9A84C", fontSize: "0.82rem" }}>✓</span>
                        <span className="font-ui" style={{ fontSize: "0.85rem", color: "rgba(15,3,24,0.8)", lineHeight: 1.5 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <GoldLink href={s.href} style={{ fontSize: "0.72rem", padding: "11px 20px" }}>{s.cta}</GoldLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section style={{ background: "#0F0318", paddingTop: "80px", paddingBottom: "92px" }}>
        <Container>
          <div className="text-center max-w-[600px] mx-auto">
            <SectionTitle style={{ marginBottom: "20px" }}>Niet zeker welk traject?</SectionTitle>
            <Lead style={{ margin: "0 auto 28px", maxWidth: "460px" }}>
              Plan een vrijblijvend gesprek — we kijken samen wat het beste bij jou past.
            </Lead>
            <GoldLink href="/contact">Plan een gesprek</GoldLink>
          </div>
        </Container>
      </section>
    </>
  );
}
