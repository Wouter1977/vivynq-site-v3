"use client";

import { useState, useEffect } from "react";
import type { ReflectieVraag } from "@/lib/products";

interface Props {
  slug: string;
  programNaam: string;
  vragen: ReflectieVraag[];
}

type Antwoorden = Record<string, string | number>;

const STORAGE_KEY = (slug: string) => `vq-reflectie-${slug}`;

export function ProgrammaReflectie({ slug, programNaam, vragen }: Props) {
  const [stap, setStap] = useState<"intro" | "vragen" | "klaar">("intro");
  const [huidigIndex, setHuidigIndex] = useState(0);
  const [antwoorden, setAntwoorden] = useState<Antwoorden>({});
  const [huidigAntwoord, setHuidigAntwoord] = useState<string | number>("");
  const [opgeslagenAntwoorden, setOpgeslagenAntwoorden] = useState<Antwoorden>({});

  useEffect(() => {
    try {
      const opgeslagen = localStorage.getItem(STORAGE_KEY(slug));
      if (opgeslagen) {
        const parsed = JSON.parse(opgeslagen) as Antwoorden;
        setOpgeslagenAntwoorden(parsed);
      }
    } catch {
      // localStorage niet beschikbaar
    }
  }, [slug]);

  const huidigVraag = vragen[huidigIndex];
  const totaal = vragen.length;
  const heeftOpgeslagenAntwoorden = Object.keys(opgeslagenAntwoorden).length > 0;

  function slaAntwoordOp() {
    if (!huidigAntwoord && huidigAntwoord !== 0) return;
    const nieuw = { ...antwoorden, [huidigVraag.id]: huidigAntwoord };
    setAntwoorden(nieuw);
    setHuidigAntwoord("");

    if (huidigIndex < totaal - 1) {
      setHuidigIndex(huidigIndex + 1);
    } else {
      try {
        localStorage.setItem(STORAGE_KEY(slug), JSON.stringify(nieuw));
      } catch {
        // ignore
      }
      setStap("klaar");
    }
  }

  function gaTerug() {
    if (huidigIndex > 0) {
      setHuidigIndex(huidigIndex - 1);
      setHuidigAntwoord(antwoorden[vragen[huidigIndex - 1].id] ?? "");
    }
  }

  function herstart() {
    setAntwoorden({});
    setHuidigAntwoord("");
    setHuidigIndex(0);
    setStap("vragen");
  }

  if (stap === "intro") {
    return (
      <section
        className="vq-glass"
        style={{
          borderRadius: "1.5rem",
          padding: "clamp(2rem, 5vw, 3.5rem)",
          margin: "3rem 0",
        }}
      >
        <p
          className="font-display"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--cream)", marginBottom: "1rem", lineHeight: 1.5 }}
        >
          Verdiep jouw ervaring met {programNaam}
        </p>
        <p
          className="font-ui"
          style={{ fontSize: "0.95rem", color: "rgba(250,248,242,0.72)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "52ch" }}
        >
          Deze vijf reflectievragen helpen je het geleerde te verankeren. Jouw antwoorden worden lokaal opgeslagen en vormen de basis van jouw persoonlijke eindrapport.
        </p>

        {heeftOpgeslagenAntwoorden && (
          <p
            className="font-ui"
            style={{ fontSize: "0.85rem", color: "rgba(201,168,76,0.9)", marginBottom: "1.5rem" }}
          >
            Je hebt deze reflectie eerder ingevuld. Je kunt hem opnieuw bekijken of opnieuw beginnen.
          </p>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setStap("vragen")}
            className="font-ui"
            style={{
              background: "#C9A84C",
              color: "#0F0318",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.75rem 1.75rem",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}
          >
            {heeftOpgeslagenAntwoorden ? "Opnieuw beginnen" : "Start reflectie →"}
          </button>

          {heeftOpgeslagenAntwoorden && (
            <a
              href={`/rapport/${slug}`}
              className="font-ui"
              style={{
                background: "transparent",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.4)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1.75rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                textDecoration: "none",
                letterSpacing: "0.03em",
              }}
            >
              Bekijk mijn rapport →
            </a>
          )}
        </div>
      </section>
    );
  }

  if (stap === "klaar") {
    return (
      <section
        className="vq-glass"
        style={{
          borderRadius: "1.5rem",
          padding: "clamp(2rem, 5vw, 3.5rem)",
          margin: "3rem 0",
          textAlign: "center",
        }}
      >
        <p
          className="font-display"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "var(--cream)", marginBottom: "1rem" }}
        >
          Jouw reflectie is opgeslagen.
        </p>
        <p
          className="font-ui"
          style={{ fontSize: "0.95rem", color: "rgba(250,248,242,0.72)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "48ch", margin: "0 auto 2rem" }}
        >
          Op basis van jouw antwoorden kun je nu een persoonlijk eindrapport genereren — of dit systemisch verder laten verdiepen.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href={`/rapport/${slug}`}
            className="font-ui"
            style={{
              background: "#C9A84C",
              color: "#0F0318",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.85rem 2rem",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            Genereer mijn rapport →
          </a>

          <button
            onClick={herstart}
            className="font-ui"
            style={{
              background: "transparent",
              color: "rgba(250,248,242,0.6)",
              border: "1px solid rgba(250,248,242,0.2)",
              borderRadius: "0.5rem",
              padding: "0.85rem 2rem",
              fontWeight: 500,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Opnieuw beginnen
          </button>
        </div>
      </section>
    );
  }

  // Stap: vragen
  const voortgang = ((huidigIndex) / totaal) * 100;

  return (
    <section
      className="vq-glass"
      style={{
        borderRadius: "1.5rem",
        padding: "clamp(2rem, 5vw, 3.5rem)",
        margin: "3rem 0",
      }}
    >
      {/* Voortgangsbalk */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span className="font-ui" style={{ fontSize: "0.8rem", color: "rgba(201,168,76,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Vraag {huidigIndex + 1} van {totaal}
          </span>
          <span className="font-ui" style={{ fontSize: "0.8rem", color: "rgba(250,248,242,0.4)" }}>
            {Math.round(voortgang)}% voltooid
          </span>
        </div>
        <div
          style={{
            height: "3px",
            background: "rgba(250,248,242,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${voortgang}%`,
              background: "#C9A84C",
              borderRadius: "2px",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Vraag */}
      <p
        className="font-display"
        style={{
          fontSize: "clamp(1.05rem, 2.8vw, 1.35rem)",
          color: "var(--cream)",
          lineHeight: 1.55,
          marginBottom: huidigVraag.toelichting ? "0.75rem" : "1.75rem",
        }}
      >
        {huidigVraag.vraag}
      </p>

      {huidigVraag.toelichting && (
        <p
          className="font-ui"
          style={{ fontSize: "0.85rem", color: "rgba(250,248,242,0.5)", marginBottom: "1.5rem", fontStyle: "italic" }}
        >
          {huidigVraag.toelichting}
        </p>
      )}

      {/* Antwoordveld */}
      {huidigVraag.type === "open" ? (
        <textarea
          value={huidigAntwoord as string}
          onChange={(e) => setHuidigAntwoord(e.target.value)}
          placeholder="Schrijf hier jouw antwoord..."
          rows={4}
          className="font-ui"
          style={{
            width: "100%",
            background: "rgba(250,248,242,0.05)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "0.75rem",
            padding: "1rem 1.25rem",
            color: "var(--cream)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            resize: "vertical",
            outline: "none",
            marginBottom: "1.5rem",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; }}
        />
      ) : (
        /* Schaalvraag: 1-10 */
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              marginBottom: "0.75rem",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <button
                key={n}
                onClick={() => setHuidigAntwoord(n)}
                className="font-ui"
                style={{
                  width: "2.6rem",
                  height: "2.6rem",
                  borderRadius: "0.5rem",
                  border: huidigAntwoord === n ? "2px solid #C9A84C" : "1px solid rgba(250,248,242,0.15)",
                  background: huidigAntwoord === n ? "rgba(201,168,76,0.15)" : "transparent",
                  color: huidigAntwoord === n ? "#C9A84C" : "rgba(250,248,242,0.6)",
                  fontWeight: huidigAntwoord === n ? 700 : 400,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {n}
              </button>
            ))}
          </div>
          {huidigVraag.schaallabels && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="font-ui" style={{ fontSize: "0.75rem", color: "rgba(250,248,242,0.4)" }}>
                1 = {huidigVraag.schaallabels.min}
              </span>
              <span className="font-ui" style={{ fontSize: "0.75rem", color: "rgba(250,248,242,0.4)" }}>
                10 = {huidigVraag.schaallabels.max}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Navigatie */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={gaTerug}
          disabled={huidigIndex === 0}
          className="font-ui"
          style={{
            background: "transparent",
            color: huidigIndex === 0 ? "rgba(250,248,242,0.2)" : "rgba(250,248,242,0.55)",
            border: "none",
            padding: "0.75rem 0",
            fontSize: "0.9rem",
            cursor: huidigIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← Vorige
        </button>

        <button
          onClick={slaAntwoordOp}
          disabled={!huidigAntwoord && huidigAntwoord !== 0}
          className="font-ui"
          style={{
            background: huidigAntwoord || huidigAntwoord === 0 ? "#C9A84C" : "rgba(201,168,76,0.3)",
            color: huidigAntwoord || huidigAntwoord === 0 ? "#0F0318" : "rgba(250,248,242,0.3)",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem 1.75rem",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: huidigAntwoord || huidigAntwoord === 0 ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            letterSpacing: "0.03em",
          }}
        >
          {huidigIndex === totaal - 1 ? "Afronden →" : "Volgende →"}
        </button>
      </div>
    </section>
  );
}
