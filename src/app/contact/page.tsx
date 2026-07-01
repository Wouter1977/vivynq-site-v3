import type { Metadata } from "next";
import { Container, Eyebrow, SectionTitle, Lead, Card } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Plan een vrijblijvend gesprek met Vivynq. hello@vivynq.nl — Nederland.",
};

export default function ContactPage() {
  return (
    <section style={{ background: "#0F0318", paddingTop: "72px", paddingBottom: "96px" }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <SectionTitle style={{ margin: "14px 0 18px" }}>
              Jouw transformatie begint met <span className="text-goud" style={{ fontStyle: "italic" }}>één</span> gesprek
            </SectionTitle>
            <Lead style={{ marginBottom: "32px" }}>
              Laat je gegevens achter voor een vrijblijvende kennismaking. We nemen
              binnen één werkdag contact met je op om samen te kijken wat mogelijk is.
            </Lead>

            <div className="flex flex-col gap-5">
              <div>
                <p className="font-ui uppercase text-goud" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", fontWeight: 700, marginBottom: "4px" }}>E-mail</p>
                <a href="mailto:hello@vivynq.nl" className="font-ui transition-colors hover:text-goud" style={{ fontSize: "0.95rem", color: "rgba(200,168,216,0.85)" }}>hello@vivynq.nl</a>
              </div>
              <div>
                <p className="font-ui uppercase text-goud" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", fontWeight: 700, marginBottom: "4px" }}>Locatie</p>
                <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(200,168,216,0.85)" }}>Nederland · online &amp; op locatie</p>
              </div>
            </div>
          </div>

          <div>
            <Card style={{ padding: "32px" }}>
              <h2 className="font-display text-white" style={{ fontSize: "1.4rem", marginBottom: "4px" }}>Plan een gesprek</h2>
              <p className="font-ui" style={{ fontSize: "0.85rem", color: "rgba(200,168,216,0.75)", lineHeight: 1.6, marginBottom: "20px" }}>
                Vertel kort waar je staat en wat je wilt bereiken.
              </p>
              <LeadForm cta="Verstuur aanvraag" showMessage />
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
