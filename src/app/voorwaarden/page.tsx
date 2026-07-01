import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description: "Algemene voorwaarden van VIVYNQ coaching en digitale producten.",
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

export default function VoorwaardenPage() {
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
        Algemene Voorwaarden
      </h1>
      <p className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(200,168,216,0.5)", marginBottom: "40px" }}>
        Laatst bijgewerkt: 16 juni 2026 · herzien o.b.v. Zvw/Wlz/Wtza-kader
      </p>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>1. Definities</h2>
        <p className="font-body" style={P}>
          <strong>VIVYNQ:</strong> handelsnaam van Wouter Huijbregts, gevestigd in Nederland, aanbieder van
          coaching-diensten en digitale producten.
        </p>
        <p className="font-body" style={P}>
          <strong>Klant:</strong> de natuurlijke of rechtspersoon die een product of dienst afneemt van VIVYNQ.
        </p>
        <p className="font-body" style={P}>
          <strong>Digitale producten:</strong> Zelfscan · Q.Code, De Patroonwijzer, Systeem- &amp; Vraagstukanalyse,
          Begeleidingsplan-on-demand, Team- &amp; Organisatiescan, Meditatie-bibliotheek.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>2. Toepasselijkheid</h2>
        <p className="font-body" style={P}>
          Deze voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en leveringen van VIVYNQ.
          Door een aankoop te doen of een dienst af te nemen, ga je akkoord met deze voorwaarden.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>3. Aanbod en prijzen</h2>
        <p className="font-body" style={P}>
          Alle prijzen voor particulieren (B2C) zijn inclusief BTW. Prijzen voor zakelijke klanten (B2B) zijn exclusief BTW,
          tenzij anders vermeld. VIVYNQ behoudt zich het recht voor prijzen te wijzigen; lopende overeenkomsten worden
          gerespecteerd.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>4. Betaling en levering</h2>
        <p className="font-body" style={P}>
          Betaling van digitale producten geschiedt vooraf via Mollie (iDEAL, creditcard) of Stripe.
          Na succesvolle betaling ontvang je direct toegang tot het product per e-mail. Voor diensten die
          handmatige verwerking vereisen (Systeemanalyse, Begeleidingsplan) geldt levering binnen 1 werkdag.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>5. Herroepingsrecht</h2>
        <p className="font-body" style={P}>
          Op grond van de Wet Koop op Afstand heb je als consument 14 dagen bedenktijd na aankoop.
          Voor digitale producten die direct na aankoop worden geleverd (scan, programma-toegang),
          stem je bij het afrekeningsproces uitdrukkelijk in met directe levering en doe je afstand van
          het herroepingsrecht conform Art. 6:230p lid 1 sub m BW.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>6. Abonnementen</h2>
        <p className="font-body" style={P}>
          De Meditatie-bibliotheek is een maandelijks abonnement. Je kunt op elk moment opzeggen.
          Na opzegging heb je toegang tot het einde van de lopende betaalperiode. Er vindt geen
          restitutie plaats van reeds betaalde periodes.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>7. Intellectueel eigendom</h2>
        <p className="font-body" style={P}>
          Alle content, teksten, rapporten, meditaties, methodieken en software van VIVYNQ zijn en
          blijven eigendom van VIVYNQ. Het is niet toegestaan om content te kopiëren, verspreiden of
          commercieel te gebruiken zonder voorafgaande schriftelijke toestemming.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>8. Aard van de dienstverlening</h2>
        <p className="font-body" style={P}>
          VIVYNQ is een professioneel coachingbureau gericht op persoonlijke ontwikkeling,
          gedragsverandering, systemisch zelfonderzoek en prestatieverbetering. VIVYNQ is geen
          zorgaanbieder in de zin van de Zorgverzekeringswet (Zvw), de Wet langdurige zorg (Wlz)
          of de Wet toetreding zorgaanbieders (Wtza). VIVYNQ is niet ingeschreven bij het CIBG als
          zorgaanbieder en staat niet onder toezicht van de Nederlandse Zorgautoriteit (NZa) of de
          Inspectie Gezondheidszorg en Jeugd (IGJ).
        </p>
        <p className="font-body" style={P}>
          VIVYNQ verricht geen handelingen op het gebied van de individuele gezondheidszorg in de
          zin van de Wet BIG. Onze diensten worden volledig privaat afgenomen — er worden nooit
          DBC-codes, prestatiecodes of zorgdeclaraties bij zorgverzekeraars ingediend. De Wet
          kwaliteit, klachten en geschillen zorg (Wkkgz) is niet van toepassing op VIVYNQ, nu
          onze dienstverlening uitsluitend is gericht op functioneren en doelgerichte ontwikkeling,
          niet op het vaststellen of behandelen van medische of psychische aandoeningen.
        </p>
        <p className="font-body" style={P}>
          Coaching is geen vervanging van professionele medische of psychologische hulp. De Zelfscan,
          het Q.Code-rapport en alle VIVYNQ-programma&apos;s zijn ontwikkelingsinstrumenten, geen
          diagnostische of therapeutische tools. Bij acute medische of psychische zorgbehoefte
          raden wij aan contact op te nemen met een daartoe bevoegde zorgverlener.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>9. Aansprakelijkheid</h2>
        <p className="font-body" style={P}>
          VIVYNQ is niet aansprakelijk voor besluiten of handelingen die een cliënt neemt op basis
          van coaching-sessies of digitale programma&apos;s. VIVYNQ is evenmin aansprakelijk voor
          indirecte schade, gevolgschade of gederfde winst. De totale aansprakelijkheid is beperkt
          tot het bedrag dat de klant heeft betaald voor het betreffende product of de betreffende
          dienst. Deze beperking geldt niet voor opzet of grove nalatigheid.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>10. Privacy</h2>
        <p className="font-body" style={P}>
          Wij verwerken persoonsgegevens conform ons{" "}
          <a href="/privacybeleid" style={{ color: "#C9A84C" }}>Privacybeleid</a>.
          Door gebruik te maken van onze diensten ga je akkoord met de daarin beschreven verwerkingen.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>11. Geschillen</h2>
        <p className="font-body" style={P}>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de
          bevoegde rechter in het arrondissement van de vestigingsplaats van VIVYNQ.
        </p>
      </div>

      <div style={SECTION}>
        <h2 className="font-display" style={H2}>12. Contact</h2>
        <p className="font-body" style={P}>
          Vragen over deze voorwaarden? Neem contact op via hello@vivynq.nl.
        </p>
      </div>
    </div>
  );
}
