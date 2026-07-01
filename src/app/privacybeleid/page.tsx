import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Hoe VIVYNQ omgaat met jouw persoonsgegevens conform de AVG.",
};

const SECTION = {
  marginBottom: "36px",
} as const;

const H2 = {
  fontSize: "1.15rem",
  color: "#fff",
  fontWeight: 400,
  marginBottom: "12px",
} as const;

const P = {
  fontSize: "0.88rem",
  color: "rgba(200,168,216,0.82)",
  lineHeight: 1.8,
  marginBottom: "10px",
} as const;

const TABLE_CELL = {
  padding: "10px 14px",
  fontSize: "0.82rem",
  color: "rgba(200,168,216,0.82)",
  lineHeight: 1.6,
  border: "1px solid rgba(201,168,76,0.12)",
} as const;

export default function PrivacybeleidPage() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 28px 120px" }}>
      <p
        className="font-ui uppercase"
        style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A84C", marginBottom: "8px" }}
      >
        Juridisch
      </p>
      <h1
        className="font-display"
        style={{ fontSize: "clamp(1.7rem, 4vw, 2.2rem)", color: "#fff", fontWeight: 400, marginBottom: "8px" }}
      >
        Privacybeleid
      </h1>
      <p className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(200,168,216,0.5)", marginBottom: "40px" }}>
        Laatst bijgewerkt: 27 mei 2026
      </p>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>1. Wie zijn wij?</h2>
        <p className="font-body" style={P}>
          VIVYNQ is een handelsnaam van Wouter Huijbregts, gevestigd in Nederland. Wij zijn verantwoordelijk voor de
          verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.
        </p>
        <p className="font-body" style={P}>
          Contactgegevens: hello@vivynq.nl
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>2. Welke gegevens verzamelen wij?</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
          <thead>
            <tr style={{ background: "rgba(201,168,76,0.08)" }}>
              <th className="font-ui" style={{ ...TABLE_CELL, color: "#C9A84C", fontWeight: 600, textAlign: "left" }}>Categorie</th>
              <th className="font-ui" style={{ ...TABLE_CELL, color: "#C9A84C", fontWeight: 600, textAlign: "left" }}>Gegevens</th>
              <th className="font-ui" style={{ ...TABLE_CELL, color: "#C9A84C", fontWeight: 600, textAlign: "left" }}>Grondslag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-body" style={TABLE_CELL}>Accountgegevens</td>
              <td className="font-body" style={TABLE_CELL}>Naam, e-mailadres, telefoonnummer</td>
              <td className="font-body" style={TABLE_CELL}>Uitvoering overeenkomst</td>
            </tr>
            <tr>
              <td className="font-body" style={TABLE_CELL}>Betalingsgegevens</td>
              <td className="font-body" style={TABLE_CELL}>Transactie-ID, betaalmethode (via Mollie/Stripe)</td>
              <td className="font-body" style={TABLE_CELL}>Uitvoering overeenkomst</td>
            </tr>
            <tr>
              <td className="font-body" style={TABLE_CELL}>Coaching-profieldata</td>
              <td className="font-body" style={TABLE_CELL}>Q.Code gedragsstijlanalyse, VIVYNQ-programmavoortgang, reflecties</td>
              <td className="font-body" style={TABLE_CELL}>Uitvoering van de overeenkomst (Art. 6 lid 1 sub b AVG) / toestemming voor optionele profieldata (Art. 6 lid 1 sub a AVG)</td>
            </tr>
            <tr>
              <td className="font-body" style={TABLE_CELL}>Coachingdata</td>
              <td className="font-body" style={TABLE_CELL}>Sessienotities, reflecties, voortgang</td>
              <td className="font-body" style={TABLE_CELL}>Uitvoering van de overeenkomst (Art. 6 lid 1 sub b AVG)</td>
            </tr>
            <tr>
              <td className="font-body" style={TABLE_CELL}>Contactformulier</td>
              <td className="font-body" style={TABLE_CELL}>Naam, e-mail, bericht</td>
              <td className="font-body" style={TABLE_CELL}>Toestemming</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>3. Waarvoor gebruiken wij jouw gegevens?</h2>
        <ul style={{ paddingLeft: "20px" }}>
          {[
            "Het leveren van onze diensten (scans, coaching, programma's, meditaties)",
            "Het verwerken van betalingen via Mollie en Stripe",
            "Het genereren van gepersonaliseerde rapporten met behulp van AI (Anthropic Claude)",
            "Het versturen van transactionele e-mails (bevestigingen, uitnodigingen)",
            "Het verbeteren van onze dienstverlening",
          ].map((item) => (
            <li key={item} className="font-body" style={{ ...P, marginBottom: "6px" }}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>4. AI-verwerking</h2>
        <p className="font-body" style={P}>
          Voor het genereren van het Q.Code gedragsstijlrapport worden jouw vragenlijstantwoorden verwerkt door
          Anthropic (Claude API). Deze verwerking vindt plaats als onderdeel van de uitvoering van de overeenkomst, dan
          wel op basis van jouw toestemming voor optionele profieldata. Anthropic verwerkt deze data conform hun Data
          Processing Agreement en bewaart geen klantdata na verwerking.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>5. Verwerkers (sub-verwerkers)</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
          <thead>
            <tr style={{ background: "rgba(201,168,76,0.08)" }}>
              <th className="font-ui" style={{ ...TABLE_CELL, color: "#C9A84C", fontWeight: 600, textAlign: "left" }}>Dienst</th>
              <th className="font-ui" style={{ ...TABLE_CELL, color: "#C9A84C", fontWeight: 600, textAlign: "left" }}>Doel</th>
              <th className="font-ui" style={{ ...TABLE_CELL, color: "#C9A84C", fontWeight: 600, textAlign: "left" }}>Locatie</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Supabase", "Database en authenticatie", "EU (Frankfurt)"],
              ["Anthropic", "AI-rapportgeneratie", "VS (met DPA)"],
              ["Mollie", "Betalingsverwerking", "Nederland"],
              ["Stripe", "Betalingsverwerking", "EU/VS (met SCC)"],
              ["Vercel", "Hosting", "EU/VS (met DPA)"],
              ["Google Workspace", "E-mailcommunicatie", "EU (met DPA)"],
            ].map(([dienst, doel, locatie]) => (
              <tr key={dienst}>
                <td className="font-body" style={TABLE_CELL}>{dienst}</td>
                <td className="font-body" style={TABLE_CELL}>{doel}</td>
                <td className="font-body" style={TABLE_CELL}>{locatie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>6. Bewaartermijnen</h2>
        <p className="font-body" style={P}>
          Accountgegevens: zolang je account actief is, plus 12 maanden na laatste activiteit.
          Betalingsgegevens: 7 jaar (wettelijke bewaarplicht).
          Coaching-profieldata en coachingdata: 24 maanden na laatste sessie, tenzij je eerder om verwijdering vraagt.
          Contactformulierdata: 12 maanden.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>7. Jouw rechten</h2>
        <p className="font-body" style={P}>
          Op grond van de AVG heb je recht op:
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          {[
            "Inzage — opvragen welke gegevens wij van je hebben",
            "Rectificatie — onjuiste gegevens laten corrigeren",
            "Verwijdering — je gegevens laten wissen ('recht op vergetelheid')",
            "Dataportabiliteit — je gegevens in een gangbaar formaat ontvangen",
            "Beperking — de verwerking tijdelijk laten stopzetten",
            "Bezwaar — bezwaar maken tegen verwerking op basis van gerechtvaardigd belang",
            "Intrekking toestemming — je toestemming op elk moment intrekken",
          ].map((right) => (
            <li key={right} className="font-body" style={{ ...P, marginBottom: "6px" }}>{right}</li>
          ))}
        </ul>
        <p className="font-body" style={P}>
          Voor het uitoefenen van je rechten kun je contact opnemen via hello@vivynq.nl. Wij reageren binnen 30 dagen.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>8. Cookies</h2>
        <p className="font-body" style={P}>
          VIVYNQ gebruikt uitsluitend functionele cookies die noodzakelijk zijn voor de werking van de website en app
          (authenticatie, sessie). Wij gebruiken geen tracking cookies, geen analytics cookies en geen marketing cookies.
          Voor functionele cookies is geen toestemming vereist.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>9. Beveiliging</h2>
        <p className="font-body" style={P}>
          Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te beschermen, waaronder:
          versleutelde verbindingen (TLS), passwordless authenticatie (OTP), Row Level Security op databaseniveau,
          en beperkte toegang tot persoonsgegevens.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>10. Klachten</h2>
        <p className="font-body" style={P}>
          Als je een klacht hebt over de verwerking van je persoonsgegevens, neem dan eerst contact met ons op via
          hello@vivynq.nl. Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens
          (autoriteitpersoonsgegevens.nl).
        </p>
      </div>
    </div>
  );
}
