"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { submitLead } from "@/app/actions";
import type { ActionState } from "@/app/actions";

// ── Patroon-definities ───────────────────────────────────────────────────────

type Pattern = "aanpasser" | "presteerder" | "denker" | "verbinder";
type Stap = "intro" | "quiz" | "capture" | "result";

interface PatroonInfo {
  naam: string;
  subtitle: string;
  beschrijving: string;
  vervolg: string;
  ctaSlug: string;
  ctaNaam: string;
  ctaPrijs: string;
}

const PATRONEN: Record<Pattern, PatroonInfo> = {
  aanpasser: {
    naam: "De Aanpasser",
    subtitle: "Jij houdt de wereld overeind — vaak ten koste van jezelf.",
    beschrijving:
      "Je bent goed in voelen wat anderen nodig hebben. Misschien té goed. De grens tussen zorgen voor anderen en zorgen voor jezelf is vaag. Je zegt vaker ja dan je wilt. En ergens weet je: dit patroon kost je energie, maar steken doet het stil.",
    vervolg:
      "Het goede nieuws: het Aanpasser-patroon heeft altijd een oorsprong. En als je die ziet, kun je iets anders kiezen — niet harder je best doen.",
    ctaSlug: "zelfscan-qcode",
    ctaNaam: "Zelfscan Q.Code",
    ctaPrijs: "€127",
  },
  presteerder: {
    naam: "De Presteerder",
    subtitle: "Jij haalt het beste uit jezelf — totdat er niets meer over is.",
    beschrijving:
      "Je werkt hard. Harder dan de meesten. Je lat ligt hoog — voor jezelf én voor anderen. Succes voelt goed, maar nooit helemaal genoeg. Er is altijd een volgend doel. En af en toe vraag je je af: wanneer is het genoeg?",
    vervolg:
      "Prestaties zijn zelden het echte thema. Achter het Presteerder-patroon zit bijna altijd iets kleiner en ouder. Dat is waar het interessant wordt.",
    ctaSlug: "zelfscan-qcode",
    ctaNaam: "Zelfscan Q.Code",
    ctaPrijs: "€127",
  },
  denker: {
    naam: "De Denker",
    subtitle: "Jij begrijpt meer dan je laat zien — maar dat begrip houdt je soms vast.",
    beschrijving:
      "Je denkt voordat je spreekt. Je analyseert voordat je beslist. Je bent zelden impulsief. Maar soms loop je vast in je eigen hoofd. Je begrijpt precies wat er speelt — en toch verandert er niets. Dat is niet een gebrek aan inzicht. Dat is iets anders.",
    vervolg:
      "Inzicht is het begin, niet het einde. Als begrijpen genoeg was, was je al lang vrij. Wat er nodig is, speelt op een ander niveau.",
    ctaSlug: "zelfscan-qcode",
    ctaNaam: "Zelfscan Q.Code",
    ctaPrijs: "€127",
  },
  verbinder: {
    naam: "De Verbinder",
    subtitle: "Jij houdt iedereen bij elkaar — maar wie houdt jou bij elkaar?",
    beschrijving:
      "Jij voelt de sfeer in een ruimte voor je binnenkomt. Je bent de lijm. Mensen komen naar jou. Dat voelt goed — en soms zwaar. Want verbinding kan ook een manier zijn om jezelf niet te hoeven zien.",
    vervolg:
      "Verbonden zijn met anderen terwijl je ook verbonden bent met jezelf — dat is een balans die het Verbinder-patroon lastig vindt. Maar het is te leren.",
    ctaSlug: "zelfscan-qcode",
    ctaNaam: "Zelfscan Q.Code",
    ctaPrijs: "€127",
  },
};

// ── Quiz-vragen ──────────────────────────────────────────────────────────────

interface Vraag {
  tekst: string;
  opties: { label: string; patroon: Pattern }[];
}

const VRAGEN: Vraag[] = [
  {
    tekst: "Als er spanning is in een groep, wat doe jij dan het vaakst?",
    opties: [
      { label: "Ik neem de regie en los het op", patroon: "presteerder" },
      { label: "Ik zorg dat iedereen zich goed voelt, ook als ik er zelf bij inschiet", patroon: "aanpasser" },
      { label: "Ik analyseer eerst wat er speelt voor ik iets doe", patroon: "denker" },
      { label: "Ik werk aan de relaties — sfeer gaat voor mij boven alles", patroon: "verbinder" },
    ],
  },
  {
    tekst: "Wanneer voel je je het meest oncomfortabel?",
    opties: [
      { label: "Als ik het resultaat niet in de hand heb", patroon: "presteerder" },
      { label: "Als iemand teleurgesteld in mij is", patroon: "aanpasser" },
      { label: "Als ik een beslissing moet nemen zonder alle informatie", patroon: "denker" },
      { label: "Als de sfeer gespannen is en niemand het benoemt", patroon: "verbinder" },
    ],
  },
  {
    tekst: "Wat herken je het sterkst in jezelf?",
    opties: [
      { label: "Ik leg de lat hoog — voor mezelf én voor anderen", patroon: "presteerder" },
      { label: "Ik zeg vaker ja dan ik eigenlijk wil", patroon: "aanpasser" },
      { label: "Ik wil alles begrijpen voor ik iets doe", patroon: "denker" },
      { label: "Ik voel snel aan wat anderen nodig hebben", patroon: "verbinder" },
    ],
  },
  {
    tekst: "Hoe reageer je als je een fout maakt?",
    opties: [
      { label: "Ik analyseer wat er misging en zorg dat het niet meer gebeurt", patroon: "presteerder" },
      { label: "Ik voel me schuldig, zeker als het iemand anders raakt", patroon: "aanpasser" },
      { label: "Ik laat het niet los totdat ik de oorzaak begrijp", patroon: "denker" },
      { label: "Ik maak het goed door extra zorg voor de ander", patroon: "verbinder" },
    ],
  },
  {
    tekst: "Wat zouden mensen die jou goed kennen over je zeggen?",
    opties: [
      { label: "\"Jij wil altijd winnen — of in ieder geval niet verliezen\"", patroon: "presteerder" },
      { label: "\"Jij houdt altijd rekening met anderen, soms te veel\"", patroon: "aanpasser" },
      { label: "\"Jij hebt altijd een mening én een onderbouwing\"", patroon: "denker" },
      { label: "\"Jij houdt iedereen bij elkaar\"", patroon: "verbinder" },
    ],
  },
];

function berekenPatroon(antwoorden: Pattern[]): Pattern {
  const score: Record<Pattern, number> = { aanpasser: 0, presteerder: 0, denker: 0, verbinder: 0 };
  for (const a of antwoorden) score[a]++;
  return (Object.entries(score).sort((a, b) => b[1] - a[1])[0][0]) as Pattern;
}

// ── Gedeelde stijl-constanten ────────────────────────────────────────────────

const BG = "#0F0318";
const GOUD = "#C9A84C";
const GOUD_SOFT = "rgba(201,168,76,0.15)";
const BORDER_GOUD = "rgba(201,168,76,0.25)";
const TEKST = "rgba(250,248,242,0.88)";
const TEKST_SOFT = "rgba(250,248,242,0.52)";

// ── Hoofd-component ──────────────────────────────────────────────────────────

export default function GratisPage() {
  const [stap, setStap] = useState<Stap>("intro");
  const [vraagIndex, setVraagIndex] = useState(0);
  const [antwoorden, setAntwoorden] = useState<Pattern[]>([]);
  const [patroon, setPatroon] = useState<Pattern | null>(null);

  const [formState, formAction, isPending] = useActionState<ActionState, FormData>(
    submitLead,
    {}
  );

  useEffect(() => {
    if (formState.ok && stap === "capture") {
      setStap("result");
    }
  }, [formState.ok, stap]);

  function kiesAntwoord(p: Pattern) {
    const nieuweAntwoorden = [...antwoorden, p];
    setAntwoorden(nieuweAntwoorden);

    if (vraagIndex < VRAGEN.length - 1) {
      setVraagIndex(vraagIndex + 1);
    } else {
      const gevonden = berekenPatroon(nieuweAntwoorden);
      setPatroon(gevonden);
      setStap("capture");
    }
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEKST }}>
      <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {stap === "intro" && <StapIntro onStart={() => setStap("quiz")} />}
        {stap === "quiz" && (
          <StapQuiz
            vraag={VRAGEN[vraagIndex]}
            index={vraagIndex}
            totaal={VRAGEN.length}
            onKies={kiesAntwoord}
          />
        )}
        {stap === "capture" && patroon && (
          <StapCapture
            patroon={patroon}
            formAction={formAction}
            formState={formState}
            isPending={isPending}
          />
        )}
        {stap === "result" && patroon && <StapResultaat patroon={patroon} />}
      </Container>
    </div>
  );
}

// ── Stap 1: Intro ────────────────────────────────────────────────────────────

function StapIntro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <Eyebrow style={{ marginBottom: "24px" }}>Gratis mini-scan · 5 vragen · 3 minuten</Eyebrow>

      <h1
        className="font-serif"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15, marginBottom: "24px", color: "#FAF8F2" }}
      >
        Welk patroon stuurt jou?
      </h1>

      <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: TEKST_SOFT, marginBottom: "40px" }}>
        Achter elk herhalend gedrag zit een patroon. In vijf vragen breng jij in kaart welk
        patroon bij jou het sterkst op de voorgrond staat — en wat dat betekent.
      </p>

      <div
        style={{
          background: GOUD_SOFT,
          border: `1px solid ${BORDER_GOUD}`,
          padding: "20px 24px",
          marginBottom: "40px",
          textAlign: "left",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: TEKST_SOFT, lineHeight: 1.7, margin: 0 }}>
          Er is geen goed of fout antwoord. Kies wat als eerste bij je opkomt — niet wat je denkt
          dat het zou moeten zijn.
        </p>
      </div>

      <button
        onClick={onStart}
        className="font-ui uppercase transition-all hover:brightness-110"
        style={{
          background: GOUD,
          color: "#0F0318",
          border: "none",
          padding: "16px 36px",
          fontSize: "0.82rem",
          letterSpacing: "0.12em",
          fontWeight: 700,
          cursor: "pointer",
          width: "100%",
        }}
      >
        Begin de scan
      </button>
    </div>
  );
}

// ── Stap 2: Quiz ─────────────────────────────────────────────────────────────

function StapQuiz({
  vraag,
  index,
  totaal,
  onKies,
}: {
  vraag: Vraag;
  index: number;
  totaal: number;
  onKies: (p: Pattern) => void;
}) {
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      {/* Voortgangsbalk */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span className="font-ui uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", color: GOUD }}>
            Vraag {index + 1} van {totaal}
          </span>
          <span style={{ fontSize: "0.7rem", color: TEKST_SOFT }}>
            {Math.round(((index) / totaal) * 100)}% klaar
          </span>
        </div>
        <div style={{ height: "2px", background: "rgba(201,168,76,0.15)", borderRadius: "1px" }}>
          <div
            style={{
              height: "100%",
              width: `${(index / totaal) * 100}%`,
              background: GOUD,
              borderRadius: "1px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <h2
        className="font-serif"
        style={{ fontSize: "clamp(1.3rem, 3vw, 1.75rem)", lineHeight: 1.35, marginBottom: "36px", color: "#FAF8F2" }}
      >
        {vraag.tekst}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {vraag.opties.map((optie) => (
          <button
            key={optie.patroon}
            onClick={() => onKies(optie.patroon)}
            className="vq-lift transition-all"
            style={{
              background: "rgba(46,8,50,0.6)",
              border: `1px solid ${BORDER_GOUD}`,
              padding: "18px 22px",
              textAlign: "left",
              cursor: "pointer",
              color: TEKST,
              fontSize: "1rem",
              lineHeight: 1.5,
              fontFamily: "inherit",
            }}
          >
            {optie.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Stap 3: Email-capture ────────────────────────────────────────────────────

function StapCapture({
  patroon,
  formAction,
  formState,
  isPending,
}: {
  patroon: Pattern;
  formAction: (payload: FormData) => void;
  formState: ActionState;
  isPending: boolean;
}) {
  const info = PATRONEN[patroon];

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      <Eyebrow style={{ marginBottom: "20px" }}>Jouw resultaat</Eyebrow>

      <h2
        className="font-serif"
        style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.2, marginBottom: "12px", color: "#FAF8F2" }}
      >
        Jij herkent je waarschijnlijk in{" "}
        <span style={{ color: GOUD, fontStyle: "italic" }}>{info.naam}</span>
      </h2>

      <p style={{ fontSize: "1rem", color: TEKST_SOFT, lineHeight: 1.7, marginBottom: "36px" }}>
        Laat je naam en e-mailadres achter om je volledige patroonprofiel te zien — inclusief
        wat dit patroon voor jou betekent en wat de volgende stap is.
      </p>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <input type="hidden" name="message" value={`Mini-scan patroon: ${info.naam}`} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label
              htmlFor="gs-first"
              className="font-ui uppercase"
              style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.14em", color: TEKST_SOFT, marginBottom: "8px" }}
            >
              Voornaam *
            </label>
            <input
              id="gs-first"
              name="first_name"
              type="text"
              required
              autoComplete="given-name"
              style={{
                width: "100%",
                background: "rgba(46,8,50,0.6)",
                border: `1px solid ${BORDER_GOUD}`,
                padding: "12px 14px",
                color: TEKST,
                fontSize: "1rem",
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="gs-last"
              className="font-ui uppercase"
              style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.14em", color: TEKST_SOFT, marginBottom: "8px" }}
            >
              Achternaam
            </label>
            <input
              id="gs-last"
              name="last_name"
              type="text"
              autoComplete="family-name"
              style={{
                width: "100%",
                background: "rgba(46,8,50,0.6)",
                border: `1px solid ${BORDER_GOUD}`,
                padding: "12px 14px",
                color: TEKST,
                fontSize: "1rem",
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="gs-email"
            className="font-ui uppercase"
            style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.14em", color: TEKST_SOFT, marginBottom: "8px" }}
          >
            E-mailadres *
          </label>
          <input
            id="gs-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            style={{
              width: "100%",
              background: "rgba(46,8,50,0.6)",
              border: `1px solid ${BORDER_GOUD}`,
              padding: "12px 14px",
              color: TEKST,
              fontSize: "1rem",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {formState.error && (
          <p style={{ color: "#e57373", fontSize: "0.9rem", margin: 0 }}>{formState.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="font-ui uppercase transition-all hover:brightness-110"
          style={{
            background: isPending ? "rgba(201,168,76,0.5)" : GOUD,
            color: "#0F0318",
            border: "none",
            padding: "16px 28px",
            fontSize: "0.82rem",
            letterSpacing: "0.12em",
            fontWeight: 700,
            cursor: isPending ? "default" : "pointer",
            marginTop: "4px",
          }}
        >
          {isPending ? "Even geduld…" : "Toon mijn patroonprofiel"}
        </button>

        <p style={{ fontSize: "0.78rem", color: TEKST_SOFT, lineHeight: 1.6, margin: 0 }}>
          Geen spam. Je gegevens worden vertrouwelijk behandeld conform onze{" "}
          <Link href="/privacybeleid" style={{ color: GOUD, textDecoration: "underline" }}>
            privacybeleid
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

// ── Stap 4: Resultaat ────────────────────────────────────────────────────────

function StapResultaat({ patroon }: { patroon: Pattern }) {
  const info = PATRONEN[patroon];

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <Eyebrow style={{ marginBottom: "20px" }}>Jouw patroonprofiel</Eyebrow>

      {/* Patroon-header */}
      <div
        style={{
          background: GOUD_SOFT,
          border: `1px solid ${BORDER_GOUD}`,
          padding: "32px",
          marginBottom: "32px",
        }}
      >
        <h2
          className="font-serif"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.2, marginBottom: "8px", color: "#FAF8F2" }}
        >
          {info.naam}
        </h2>
        <p
          className="font-serif"
          style={{ fontSize: "1.1rem", color: GOUD, fontStyle: "italic", marginBottom: "20px" }}
        >
          {info.subtitle}
        </p>
        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: TEKST, margin: 0 }}>
          {info.beschrijving}
        </p>
      </div>

      {/* Vervolg-inzicht */}
      <div style={{ marginBottom: "40px" }}>
        <h3
          className="font-ui uppercase"
          style={{ fontSize: "0.72rem", letterSpacing: "0.16em", color: GOUD, marginBottom: "12px" }}
        >
          Wat dit betekent
        </h3>
        <p style={{ fontSize: "1rem", lineHeight: 1.8, color: TEKST_SOFT }}>
          {info.vervolg}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: BORDER_GOUD, marginBottom: "40px" }} />

      {/* CTA sectie */}
      <div style={{ marginBottom: "16px" }}>
        <h3
          className="font-serif"
          style={{ fontSize: "1.3rem", lineHeight: 1.35, marginBottom: "12px", color: "#FAF8F2" }}
        >
          Wil je weten wat er echt onder speelt?
        </h3>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: TEKST_SOFT, marginBottom: "28px" }}>
          De mini-scan geeft je een eerste spiegel. De{" "}
          <strong style={{ color: TEKST }}>{info.ctaNaam}</strong> gaat een laag dieper — en
          geeft je een persoonlijk rapport met concrete eerste stappen afgestemd op jouw profiel.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href={info.ctaSlug === "zelfscan-qcode" ? "/scan" : `/product/${info.ctaSlug}`}
            className="font-ui uppercase inline-flex items-center justify-center transition-all hover:brightness-110"
            style={{
              background: GOUD,
              color: "#0F0318",
              padding: "16px 28px",
              fontSize: "0.82rem",
              letterSpacing: "0.12em",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            {info.ctaNaam} — {info.ctaPrijs}
          </Link>

          <Link
            href="/programmas"
            className="font-ui uppercase inline-flex items-center justify-center transition-all hover:brightness-125"
            style={{
              background: "transparent",
              color: GOUD,
              padding: "15px 28px",
              fontSize: "0.82rem",
              letterSpacing: "0.12em",
              fontWeight: 700,
              border: `1px solid rgba(201,168,76,0.35)`,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Bekijk alle programma's
          </Link>
        </div>
      </div>

      <p style={{ fontSize: "0.8rem", color: TEKST_SOFT, lineHeight: 1.6 }}>
        Dit is coaching, geen diagnostiek. De mini-scan is een indicatie, geen definitieve analyse.
      </p>
    </div>
  );
}
