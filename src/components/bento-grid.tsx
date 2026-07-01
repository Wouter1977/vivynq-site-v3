"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { StaggerGrid, StaggerItem } from "@/components/motion-primitives";

/**
 * BentoGrid — Apple-stijl modulair feature-grid voor VIVYNQ.
 * 6 kaarten in asymmetrisch bento-patroon.
 * Liquid Glass effect via backdrop-filter + morphing borders.
 */

const BENTO_ITEMS = [
  {
    id: "qcode",
    size: "large",          // col-span-2, row-span-2
    eyebrow: "Q.Code Scan",
    title: "In 15 minuten weet jij wat anderen pas na jaren doorhebben.",
    body: "DISC + systemisch in één wetenschappelijk onderbouwde scan. Binnen 48 uur je persoonlijk rapport.",
    price: "€127",
    cta: { label: "Doe de scan", href: "/scan" },
    accent: "#C9A84C",
    bg: "linear-gradient(135deg, rgba(30,8,44,0.95) 0%, rgba(15,3,24,0.98) 100%)",
    border: "rgba(201,168,76,0.35)",
    glow: "rgba(201,168,76,0.12)",
    visual: "qcode",
  },
  {
    id: "disc",
    size: "medium",
    eyebrow: "DISC Methodiek",
    title: "Gedragsstijl zichtbaar gemaakt",
    body: "4 dimensies. Meetbaar. Direct inzetbaar voor leiderschap en teamwork.",
    price: null,
    cta: null,
    accent: "#C9A84C",
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(201,168,76,0.18)",
    glow: "rgba(201,168,76,0.06)",
    visual: "disc-bars",
  },
  {
    id: "systemisch",
    size: "medium",
    eyebrow: "Systemisch Werk",
    title: "De wortels van gedrag",
    body: "Loyaliteiten, patronen, onbewuste balansen — 7× groter dan het zichtbare.",
    price: null,
    cta: null,
    accent: "#8B6FA0",
    bg: "rgba(139,111,160,0.04)",
    border: "rgba(139,111,160,0.22)",
    glow: "rgba(139,111,160,0.08)",
    visual: "iceberg-mini",
  },
  {
    id: "van-dragen-naar-kiezen",
    size: "tall",           // col-span-1, row-span-2
    eyebrow: "Meest gekozen programma",
    title: "Van dragen naar kiezen",
    body: "12 weken. Van patroonherkenning naar duurzame gedragsverandering. DISC + systemisch geïntegreerd.",
    price: "€497",
    cta: { label: "Begin", href: "/programma/van-dragen-naar-kiezen" },
    accent: "#C9A84C",
    bg: "linear-gradient(180deg, rgba(201,168,76,0.09) 0%, rgba(15,3,24,0.96) 100%)",
    border: "rgba(201,168,76,0.40)",
    glow: "rgba(201,168,76,0.15)",
    visual: "phases",
  },
  {
    id: "teamscan-rapport",
    size: "small",
    eyebrow: "Zakelijk",
    title: "TeamScan + Rapport",
    body: "Collectief gedragsprofiel van je team. Zichtbaar wat er echt speelt.",
    price: "Op aanvraag",
    cta: { label: "Plan gesprek", href: "/zakelijk" },
    accent: "#C9A84C",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(201,168,76,0.16)",
    glow: "rgba(201,168,76,0.05)",
    visual: null,
  },
  {
    id: "meditaties",
    size: "small",
    eyebrow: "Dagelijkse praktijk",
    title: "Meditaties",
    body: "20 begeleide sessies afgestemd op jouw Q.Code thema's.",
    price: "€ 19/mnd",
    cta: { label: "Probeer", href: "/programma/meditaties" },
    accent: "#8B6FA0",
    bg: "rgba(139,111,160,0.05)",
    border: "rgba(139,111,160,0.18)",
    glow: "rgba(139,111,160,0.06)",
    visual: null,
  },
];

/* DISC-balk minivisualisatie */
function DiscBars() {
  const bars = [
    { label: "D", pct: 72, color: "#B03A2E" },
    { label: "I", pct: 45, color: "#C9842A" },
    { label: "S", pct: 58, color: "#1E8449" },
    { label: "C", pct: 84, color: "#1A5276" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
      {bars.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3">
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.60rem", fontWeight: 700, color: b.color, width: "10px" }}>{b.label}</span>
          <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", background: b.color, transformOrigin: "left", borderRadius: "2px", width: `${b.pct}%` }}
            />
          </div>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", color: "rgba(201,168,76,0.55)", width: "28px", textAlign: "right" }}>{b.pct}%</span>
        </div>
      ))}
    </div>
  );
}

/* Ijsberg mini */
function IcebergMini() {
  return (
    <div style={{ marginTop: "auto", position: "relative", height: "80px" }}>
      <svg viewBox="0 0 160 80" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
        <rect width="160" height="80" fill="none" />
        {/* Waterline */}
        <line x1="0" y1="40" x2="160" y2="40" stroke="rgba(201,168,76,0.30)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="140" y="37" fill="rgba(201,168,76,0.45)" fontSize="6" fontFamily="Manrope,sans-serif" letterSpacing="1">DISC</text>
        <text x="136" y="50" fill="rgba(139,111,160,0.55)" fontSize="6" fontFamily="Manrope,sans-serif">Systemisch</text>
        {/* Top */}
        <path d="M 60 40 L 70 24 L 80 10 L 90 24 L 100 40 Z" fill="rgba(200,220,235,0.25)" stroke="rgba(200,220,235,0.35)" strokeWidth="0.5" />
        {/* Bottom — larger */}
        <path d="M 50 40 L 30 58 L 20 72 L 80 78 L 140 72 L 130 58 L 110 40 Z" fill="rgba(139,111,160,0.20)" stroke="rgba(139,111,160,0.30)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

/* Fasen-dots voor Patroonwijzer */
function PhasesDots() {
  const phases = ["Land", "Zie", "Voel", "Integreer", "Verander"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
      {phases.map((p, i) => (
        <div key={p} className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
            style={{ width: "8px", height: "8px", borderRadius: "50%", background: i < 3 ? "#C9A84C" : "rgba(201,168,76,0.25)", flexShrink: 0 }}
          />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: i < 3 ? "rgba(242,237,227,0.82)" : "rgba(242,237,227,0.35)" }}>
            {String(i + 1).padStart(2, "0")} · {p}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Liquid Glass kaart-component */
function BentoCard({ item, className = "" }: { item: typeof BENTO_ITEMS[0]; className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{
        position: "relative",
        background: item.bg,
        border: `1px solid ${item.border}`,
        borderRadius: "16px",
        padding: "28px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(12px) saturate(1.4)",
        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        height: "100%",
        boxShadow: `0 0 40px -20px ${item.glow}`,
        cursor: item.cta ? "pointer" : "default",
      }}
      className={className}
    >
      {/* Glow-blob achtergrond */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 80% 20%, ${item.glow} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Liquid Glass randglans */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${item.accent}44, transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Eyebrow */}
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.22em", fontWeight: 700, color: item.accent, textTransform: "uppercase", marginBottom: "10px", opacity: 0.85 }}>
          {item.eyebrow}
        </p>

        {/* Titel */}
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: item.size === "large" ? "clamp(1.4rem, 2.2vw, 1.85rem)" : "1.10rem", lineHeight: 1.2, color: "#FAF8F2", marginBottom: "10px", fontWeight: 400 }}>
          {item.title}
        </h3>

        {/* Body */}
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "rgba(210,195,230,0.65)", lineHeight: 1.72, marginBottom: "16px" }}>
          {item.body}
        </p>

        {/* Visual element */}
        {item.visual === "disc-bars"    && <DiscBars />}
        {item.visual === "iceberg-mini" && <IcebergMini />}
        {item.visual === "phases"       && <PhasesDots />}

        {/* Prijs + CTA */}
        {(item.price || item.cta) && (
          <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "16px", borderTop: `1px solid ${item.border}` }}>
            {item.price && (
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: item.accent, lineHeight: 1 }}>
                {item.price}
              </span>
            )}
            {item.cta && (
              <Link
                href={item.cta.href}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  color: "#0F0318",
                  background: item.accent,
                  padding: "9px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  display: "inline-block",
                  transition: "opacity 0.2s",
                }}
              >
                {item.cta.label} →
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section
      aria-label="Vivynq producten en methodiek overzicht"
      style={{ background: "#030108", paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <StaggerGrid style={{ marginBottom: "52px" }}>
          <StaggerItem>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.66rem", letterSpacing: "0.24em", fontWeight: 700, color: "rgba(201,168,76,0.70)", textTransform: "uppercase", marginBottom: "14px" }}>
              Alles wat Vivynq biedt
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 400, color: "#FAF8F2", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: "640px" }}>
              Eén ecosysteem.<br />
              <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Onbeperkte diepgang.</span>
            </h2>
          </StaggerItem>
        </StaggerGrid>

        {/* Bento grid — asymmetrisch 3-koloms */}
        <StaggerGrid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto",
            gap: "14px",
          }}
        >
          {/* Grote kaart links — Q.Code (col 1-2, row 1-2) */}
          <StaggerItem style={{ gridColumn: "1 / 3", gridRow: "1 / 2", minHeight: "280px" }}>
            <BentoCard item={BENTO_ITEMS[0]} />
          </StaggerItem>

          {/* Tall kaart rechts — Patroonwijzer (col 3, row 1-2) */}
          <StaggerItem style={{ gridColumn: "3 / 4", gridRow: "1 / 3", minHeight: "420px" }}>
            <BentoCard item={BENTO_ITEMS[3]} />
          </StaggerItem>

          {/* Medium DISC (col 1) */}
          <StaggerItem style={{ gridColumn: "1 / 2", gridRow: "2 / 3", minHeight: "200px" }}>
            <BentoCard item={BENTO_ITEMS[1]} />
          </StaggerItem>

          {/* Medium Systemisch (col 2) */}
          <StaggerItem style={{ gridColumn: "2 / 3", gridRow: "2 / 3", minHeight: "200px" }}>
            <BentoCard item={BENTO_ITEMS[2]} />
          </StaggerItem>

          {/* Small kaarten onderaan */}
          <StaggerItem style={{ gridColumn: "1 / 2", minHeight: "160px" }}>
            <BentoCard item={BENTO_ITEMS[4]} />
          </StaggerItem>
          <StaggerItem style={{ gridColumn: "2 / 4", minHeight: "160px" }}>
            <BentoCard item={BENTO_ITEMS[5]} />
          </StaggerItem>
        </StaggerGrid>
      </div>
    </section>
  );
}
