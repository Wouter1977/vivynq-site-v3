"use client";

import { useState } from "react";

interface FaqItem {
  vraag: string;
  antwoord: string;
}

const FAQS: FaqItem[] = [
  {
    vraag: "Voor welke organisaties is Vivynq geschikt?",
    antwoord:
      "Vivynq werkt voor teams in het MKB (10–250 medewerkers), zorg, onderwijs, gemeenten en woningcorporaties. De aanpak is schaalbaar, van een kleine TeamScan tot een volledig eigenaarschapstraject voor een afdeling. Kern is altijd: teamdynamiek en individueel eigenaarschap combineren.",
  },
  {
    vraag: "Wat is het verschil tussen DISC-coaching en een DISC-training?",
    antwoord:
      "Een DISC-training leert mensen hun stijl kennen en ermee te werken. Vivynq gaat een stap verder: we verbinden het DISC-profiel met systemisch werk, zodat u niet alleen het zichtbare gedrag beschrijft, maar ook begrijpt welke onderliggende patronen dat gedrag aansturen. Dat maakt de interventie duurzamer.",
  },
  {
    vraag: "Hoe lang duurt een TeamScan-traject?",
    antwoord:
      "De scan zelf duurt 30 minuten per teamlid en is volledig digitaal. Het rapport is klaar zodra het hele team de scan heeft ingevuld, doorgaans binnen 1–2 weken. De interventiedag vindt daarna op locatie of online plaats, afgestemd op uw agenda.",
  },
  {
    vraag: "Is dit coaching of therapie?",
    antwoord:
      "Vivynq is coaching, geen therapie. We werken aan patronen, koers en uitvoering, niet aan diagnoses of traumaverwerking. WKKGZ-vrijgesteld. Bij acute psychische klachten verwijzen we altijd door naar een bevoegd behandelaar.",
  },
  {
    vraag: "Hoe vraag ik een offerte of kennismaking aan?",
    antwoord:
      "Via de knop onderaan deze pagina plant u een vrijblijvend gesprek van 30 minuten. We bespreken uw situatie, het gewenste resultaat en de meest passende aanpak. Geen verkoopdruk, we kijken samen of het klopt.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ marginTop: "48px" }}>
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderTop: "1px solid rgba(26,5,37,0.14)",
              borderBottom: i === FAQS.length - 1 ? "1px solid rgba(26,5,37,0.14)" : undefined,
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="font-display w-full flex items-center justify-between gap-4"
              style={{
                padding: "26px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "#1A0525",
              }}
            >
              <span style={{ fontSize: "1.10rem", fontWeight: 500, lineHeight: 1.35, color: "#1A0525" }}>
                {item.vraag}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: "26px",
                  height: "26px",
                  border: isOpen ? "1.5px solid #C9A84C" : "1.5px solid rgba(26,5,37,0.25)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isOpen ? "rgba(201,168,76,0.08)" : "transparent",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  transition: "transform 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                }}
                aria-hidden="true"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#C9A84C" : "#1A0525"} strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? "600px" : "0",
                transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <p
                className="font-ui"
                style={{
                  paddingBottom: "28px",
                  fontSize: "1.00rem",
                  lineHeight: 1.82,
                  color: "rgba(26,5,37,0.82)",
                  maxWidth: "68ch",
                }}
              >
                {item.antwoord}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
