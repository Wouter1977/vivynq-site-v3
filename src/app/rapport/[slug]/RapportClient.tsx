"use client";

import { useEffect, useState } from "react";
import type { Product, ReflectieVraag } from "@/lib/products";

interface Props {
  product: Pick<Product, "slug" | "name" | "tagline" | "systemischInzicht" | "reflectieVragen">;
}

type Antwoorden = Record<string, string | number>;

const STORAGE_KEY = (slug: string) => `vq-reflectie-${slug}`;

function SchaalpijlSvg({ waarde }: { waarde: number }) {
  const pct = ((waarde - 1) / 9) * 100;
  return (
    <div style={{ margin: "0.5rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(250,248,242,0.4)" }}>1</span>
        <span className="font-ui" style={{ fontSize: "0.72rem", color: "rgba(250,248,242,0.4)" }}>10</span>
      </div>
      <div style={{ position: "relative", height: "6px", background: "rgba(250,248,242,0.1)", borderRadius: "3px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, rgba(201,168,76,0.4), #C9A84C)", borderRadius: "3px" }} />
        <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%, -50%)", width: "14px", height: "14px", background: "#C9A84C", borderRadius: "50%", border: "2px solid #0F0318" }} />
      </div>
      <div style={{ textAlign: "right", marginTop: "0.4rem" }}>
        <span className="font-ui" style={{ fontSize: "0.85rem", color: "#C9A84C", fontWeight: 700 }}>{waarde} / 10</span>
      </div>
    </div>
  );
}

export function RapportClient({ product }: Props) {
  const [antwoorden, setAntwoorden] = useState<Antwoorden | null>(null);
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY(product.slug));
      if (raw) setAntwoorden(JSON.parse(raw) as Antwoorden);
    } catch {
      // ignore
    }
    setGeladen(true);
  }, [product.slug]);

  if (!geladen) {
    return (
      <div style={{ padding: "4rem 0", textAlign: "center" }}>
        <p className="font-ui" style={{ color: "rgba(250,248,242,0.4)" }}>Laden…</p>
      </div>
    );
  }

  if (!antwoorden || Object.keys(antwoorden).length === 0) {
    return (
      <div style={{ padding: "4rem 0", textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: "1.3rem", color: "var(--cream)", marginBottom: "1rem" }}>
          Geen reflectieantwoorden gevonden.
        </p>
        <p className="font-ui" style={{ color: "rgba(250,248,242,0.55)", marginBottom: "2rem" }}>
          Voltooi eerst de reflectievragen op de programma-pagina.
        </p>
        <a
          href={`/programma/${product.slug}`}
          className="font-ui"
          style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600, borderBottom: "1px solid rgba(201,168,76,0.4)" }}
        >
          ← Terug naar {product.name}
        </a>
      </div>
    );
  }

  const vragen: ReflectieVraag[] = product.reflectieVragen ?? [];

  return (
    <>
      {/* Print-stijlen — alleen actief bij window.print() */}
      <style>{`
        @media print {
          body { background: #fff !important; color: #1a1a1a !important; }
          .rapport-print-hide { display: none !important; }
          .rapport-card { break-inside: avoid; }
          .rapport-upsell { display: none !important; }
        }
      `}</style>

      {/* Rapport header */}
      <div style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <p className="font-ui" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "0.4rem" }}>
              Persoonlijk reflectierapport
            </p>
            <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--cream)", lineHeight: 1.2, fontWeight: 400 }}>
              {product.name}
            </h1>
          </div>

          <button
            onClick={() => window.print()}
            className="font-ui rapport-print-hide"
            style={{
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.35)",
              color: "rgba(201,168,76,0.85)",
              borderRadius: "0.5rem",
              padding: "0.6rem 1.25rem",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
            </svg>
            PDF opslaan
          </button>
        </div>

        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)",
            marginBottom: "3rem",
          }}
        />
      </div>

      {/* Systemisch inzicht */}
      {product.systemischInzicht && (
        <div
          className="rapport-card vq-glass-gold"
          style={{
            borderRadius: "1.25rem",
            padding: "2rem 2.25rem",
            marginBottom: "3rem",
            borderLeft: "3px solid #C9A84C",
          }}
        >
          <p className="font-ui" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "0.75rem" }}>
            Systemisch inzicht
          </p>
          <p className="font-display" style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "var(--cream)", lineHeight: 1.7, fontStyle: "italic" }}>
            &ldquo;{product.systemischInzicht}&rdquo;
          </p>
        </div>
      )}

      {/* Vragen & antwoorden */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "4rem" }}>
        {vragen.map((vraag, i) => {
          const antwoord = antwoorden[vraag.id];
          return (
            <div
              key={vraag.id}
              className="rapport-card vq-glass"
              style={{ borderRadius: "1.25rem", padding: "2rem 2.25rem" }}
            >
              <p className="font-ui" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,248,242,0.35)", marginBottom: "0.6rem" }}>
                Vraag {i + 1}
              </p>
              <p className="font-ui" style={{ fontSize: "1rem", color: "rgba(250,248,242,0.8)", lineHeight: 1.6, marginBottom: "1rem", fontWeight: 500 }}>
                {vraag.vraag}
              </p>

              {antwoord !== undefined ? (
                vraag.type === "schaal" ? (
                  <SchaalpijlSvg waarde={antwoord as number} />
                ) : (
                  <p
                    className="font-display"
                    style={{
                      fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                      color: "var(--cream)",
                      lineHeight: 1.7,
                      borderLeft: "2px solid rgba(201,168,76,0.35)",
                      paddingLeft: "1rem",
                      margin: 0,
                    }}
                  >
                    {antwoord}
                  </p>
                )
              ) : (
                <p className="font-ui" style={{ color: "rgba(250,248,242,0.3)", fontStyle: "italic", fontSize: "0.9rem" }}>
                  Niet beantwoord
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Commerciële upsell: Systemisch Portret */}
      <div
        className="rapport-upsell"
        style={{
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(15,3,24,0) 100%)",
          border: "1px solid rgba(201,168,76,0.3)",
          padding: "clamp(2rem, 5vw, 3rem)",
          marginBottom: "3rem",
        }}
      >
        <p className="font-ui" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: "1rem" }}>
          Wil je dieper gaan?
        </p>
        <h2 className="font-display" style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", color: "var(--cream)", marginBottom: "1rem", fontWeight: 400 }}>
          Systemisch Portret — €97
        </h2>
        <p className="font-ui" style={{ fontSize: "0.95rem", color: "rgba(250,248,242,0.68)", lineHeight: 1.7, maxWidth: "52ch", marginBottom: "1.75rem" }}>
          Op basis van jouw reflecties schrijft Wouter een persoonlijk inzichtrapport van 12 pagina&apos;s. Jouw patronen, jouw systemische bindingen, jouw bewegingsrichting — concreet benoemd. Geen template. Jouw verhaal.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {[
            "12 pagina's · persoonlijk geschreven",
            "Systemische duiding van jouw antwoorden",
            "Concrete bewegingsrichting",
            "Binnen 5 werkdagen per e-mail",
          ].map((punt) => (
            <span
              key={punt}
              className="font-ui"
              style={{
                fontSize: "0.8rem",
                color: "rgba(250,248,242,0.6)",
                background: "rgba(250,248,242,0.05)",
                border: "1px solid rgba(250,248,242,0.1)",
                borderRadius: "2rem",
                padding: "0.3rem 0.85rem",
              }}
            >
              {punt}
            </span>
          ))}
        </div>

        <a
          href="/afrekenen?product=systemisch-portret"
          className="font-ui"
          style={{
            display: "inline-block",
            background: "#C9A84C",
            color: "#0F0318",
            textDecoration: "none",
            borderRadius: "0.5rem",
            padding: "0.85rem 2.25rem",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.03em",
          }}
        >
          Ja, ik wil mijn Systemisch Portret →
        </a>
      </div>

      {/* Terug-link */}
      <div style={{ paddingBottom: "2rem" }}>
        <a
          href={`/programma/${product.slug}`}
          className="font-ui rapport-print-hide"
          style={{ color: "rgba(250,248,242,0.4)", textDecoration: "none", fontSize: "0.9rem" }}
        >
          ← Terug naar {product.name}
        </a>
      </div>
    </>
  );
}
