"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   VIVYNQ ICEBERG — Apple-niveau scroll-animatie
   Scroll-triggered, zuivere CSS + SVG, geen deps
───────────────────────────────────────────── */

const BOVEN = [
  { label: "Gedragsstijl", sub: "D · I · S · C profiel", delay: 0.9 },
  { label: "Communicatie", sub: "Hoe je reageert op anderen", delay: 1.15 },
  { label: "Werkstijl", sub: "Tempo, structuur, relatie", delay: 1.4 },
];

const ONDER = [
  { label: "Loyaliteitspatronen", sub: "Onbewuste trouw aan het systeem", delay: 2.1 },
  { label: "Familiedynamieken", sub: "Wat van vroeger meekomt", delay: 2.4 },
  { label: "Onbewuste drivers", sub: "Wat gedrag vanuit de diepte stuurt", delay: 2.7 },
  { label: "Systemische balans", sub: "Geven · Nemen · Orde · Verbinding", delay: 3.0 },
];

export function IcebergAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const css = (delay: number, base = "vq-ib-fade") =>
    reduced ? {} : { animationName: active ? base : "none", animationDelay: `${delay}s`, animationFillMode: "both" };

  return (
    <div ref={ref} className="vq-iceberg-root" aria-label="Vivynq IJsberg-model: DISC boven water, Systemisch onder water">
      {/* ── SVG-scène ────────────────────────────── */}
      <div className="vq-ib-scene" style={reduced ? {} : { opacity: active ? 1 : 0, transition: "opacity 1s ease 0.1s" }}>

        {/* Achtergrond glow-aura */}
        <div className="vq-ib-aura" style={css(0.3, "vq-ib-aura-pulse")} aria-hidden="true" />

        {/* Ocean */}
        <svg className="vq-ib-svg" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            {/* Iceberg boven water — wit/blauw gletsjer */}
            <linearGradient id="ibTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8EEF4" />
              <stop offset="45%" stopColor="#C8D8E8" />
              <stop offset="100%" stopColor="#9AB8D0" />
            </linearGradient>
            {/* Iceberg onder water — dieper, donkerder */}
            <linearGradient id="ibBot" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#3A5C78" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#1E3A52" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#0A1E2E" stopOpacity="0.85" />
            </linearGradient>
            {/* Diepzee */}
            <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A1828" />
              <stop offset="100%" stopColor="#020810" />
            </linearGradient>
            {/* Glans op ijs */}
            <linearGradient id="glare" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="0.45" />
              <stop offset="60%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            {/* Water oppervlak goud-shimmer */}
            <linearGradient id="waterLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="25%" stopColor="#F3E2B0" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="1" />
              <stop offset="75%" stopColor="#F3E2B0" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </linearGradient>
            {/* Onder-water glow */}
            <radialGradient id="deepGlow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#2A4A6A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#020810" stopOpacity="0" />
            </radialGradient>
            {/* Ijs-facet highlight */}
            <linearGradient id="facet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="deepBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <clipPath id="aboveWater">
              <rect x="0" y="0" width="600" height="268" />
            </clipPath>
            <clipPath id="belowWater">
              <rect x="0" y="268" width="600" height="432" />
            </clipPath>
          </defs>

          {/* Diepzee achtergrond */}
          <rect width="600" height="700" fill="url(#ocean)" />

          {/* Diepe glow achter het ijsberg-blok */}
          <ellipse cx="300" cy="480" rx="200" ry="180" fill="url(#deepGlow)" />

          {/* ══ ICEBERG ONDER WATER ══ */}
          <g clipPath="url(#belowWater)" className={active && !reduced ? "vq-ib-under-reveal" : ""}>
            {/* Hoofd-massa onder water */}
            <path
              d="M 220 268 L 170 340 L 130 420 L 100 510 L 120 600 L 200 660 L 300 675 L 400 660 L 480 600 L 500 510 L 470 420 L 430 340 L 380 268 Z"
              fill="url(#ibBot)"
              stroke="rgba(100,160,200,0.15)"
              strokeWidth="1"
            />
            {/* Facet-details onder water */}
            <path d="M 220 268 L 170 340 L 250 380 Z" fill="rgba(60,100,140,0.4)" />
            <path d="M 380 268 L 430 340 L 350 380 Z" fill="rgba(60,100,140,0.4)" />
            <path d="M 130 420 L 100 510 L 200 470 Z" fill="rgba(40,80,120,0.3)" />
            <path d="M 470 420 L 500 510 L 400 470 Z" fill="rgba(40,80,120,0.3)" />
            {/* Diepste punt sfeer */}
            <ellipse cx="300" cy="620" rx="80" ry="40" fill="rgba(10,20,40,0.6)" />
          </g>

          {/* ══ ICEBERG BOVEN WATER ══ */}
          <g clipPath="url(#aboveWater)" className={active && !reduced ? "vq-ib-top-reveal" : ""}>
            {/* Hoofd-vorm */}
            <path
              d="M 220 268 L 255 200 L 240 140 L 265 80 L 300 30 L 335 80 L 360 140 L 345 200 L 380 268 Z"
              fill="url(#ibTop)"
              stroke="rgba(200,225,240,0.4)"
              strokeWidth="1"
            />
            {/* Linker facet */}
            <path d="M 220 268 L 255 200 L 280 240 Z" fill="rgba(180,210,230,0.5)" />
            {/* Rechter facet */}
            <path d="M 380 268 L 345 200 L 320 240 Z" fill="rgba(150,190,215,0.4)" />
            {/* Glans */}
            <path
              d="M 275 50 L 260 120 L 275 160 L 290 120 Z"
              fill="url(#glare)"
            />
            {/* Top-facet highlight */}
            <path d="M 300 30 L 335 80 L 300 70 Z" fill="rgba(255,255,255,0.5)" />
            <path d="M 300 30 L 265 80 L 300 70 Z" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* ══ WATER OPPERVLAK ══ */}
          {/* Water body */}
          <rect x="0" y="262" width="600" height="12" fill="#0D2236" opacity="0.9" />

          {/* Goud shimmer-lijn */}
          <rect
            x="0" y="265" width="600" height="2.5"
            fill="url(#waterLine)"
            className={active && !reduced ? "vq-ib-waterline-glow" : ""}
          />

          {/* Water oppervlak golfje links */}
          <path
            d="M 0 268 Q 60 263 120 268 Q 180 273 240 268"
            stroke="rgba(150,200,230,0.22)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Water oppervlak golfje rechts */}
          <path
            d="M 360 268 Q 420 263 480 268 Q 540 273 600 268"
            stroke="rgba(150,200,230,0.22)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Reflectie top van ijsberg in water */}
          <g clipPath="url(#belowWater)" opacity="0.12">
            <path
              d="M 220 268 L 255 330 L 240 380 L 265 420 L 300 450 L 335 420 L 360 380 L 345 330 L 380 268 Z"
              fill="url(#ibTop)"
            />
          </g>

          {/* Lucht licht-gradient boven water */}
          <rect x="0" y="0" width="600" height="262" fill="url(#ocean)" opacity="0.15" />

          {/* Sterren / licht-punten in de lucht */}
          {[[80,40],[150,20],[420,55],[520,30],[560,80],[50,100],[490,15]].map(([x,y],i) => (
            <circle
              key={i}
              cx={x} cy={y} r="1.2"
              fill="white"
              opacity={0.3 + (i * 0.08)}
              className={active && !reduced ? "vq-ib-star" : ""}
              style={active && !reduced ? { animationDelay: `${0.2 + i * 0.1}s` } : {}}
            />
          ))}

          {/* Goud aura rond de waterline (flash effect) */}
          <ellipse
            cx="300" cy="265" rx="180" ry="8"
            fill="#C9A84C"
            opacity="0"
            className={active && !reduced ? "vq-ib-flash" : ""}
          />
        </svg>

        {/* ── LABELS BOVEN WATER ─────────────────── */}
        <div className="vq-ib-labels-top" aria-hidden="true">
          <div className="vq-ib-zone-label vq-ib-zone-top" style={css(0.7, "vq-ib-fade-up")}>
            <span className="vq-ib-zone-dot vq-ib-zone-dot--gold" />
            <span className="vq-ib-zone-text">DISC · Boven water</span>
          </div>

          {BOVEN.map((item) => (
            <div
              key={item.label}
              className="vq-ib-label vq-ib-label--top"
              style={css(item.delay, "vq-ib-fade-right")}
            >
              <div className="vq-ib-label-line" />
              <div className="vq-ib-label-body">
                <span className="vq-ib-label-title">{item.label}</span>
                <span className="vq-ib-label-sub">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── LABELS ONDER WATER ─────────────────── */}
        <div className="vq-ib-labels-bottom" aria-hidden="true">
          <div className="vq-ib-zone-label vq-ib-zone-bottom" style={css(1.8, "vq-ib-fade-up")}>
            <span className="vq-ib-zone-dot vq-ib-zone-dot--purple" />
            <span className="vq-ib-zone-text vq-ib-zone-text--dim">Systemisch · Onder water</span>
          </div>

          {ONDER.map((item) => (
            <div
              key={item.label}
              className="vq-ib-label vq-ib-label--bottom"
              style={css(item.delay, "vq-ib-fade-right")}
            >
              <div className="vq-ib-label-line vq-ib-label-line--dim" />
              <div className="vq-ib-label-body">
                <span className="vq-ib-label-title vq-ib-label-title--dim">{item.label}</span>
                <span className="vq-ib-label-sub vq-ib-label-sub--dim">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── WATERLINE BADGE ────────────────────── */}
        <div className="vq-ib-waterline-badge" style={css(1.6, "vq-ib-scale-in")} aria-hidden="true">
          <span className="vq-ib-badge-text">Waterline</span>
          <span className="vq-ib-badge-line" />
        </div>

        {/* ── ICOON GROOTTE-INDICATOR ────────────── */}
        <div className="vq-ib-size-hint" style={css(3.4, "vq-ib-fade-up")} aria-hidden="true">
          <svg viewBox="0 0 16 40" className="vq-ib-size-svg" fill="none">
            <line x1="8" y1="0" x2="8" y2="18" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 2" />
            <text x="8" y="30" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="7" fontFamily="Manrope,sans-serif" letterSpacing="1">7×</text>
            <line x1="8" y1="34" x2="8" y2="40" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
          <span className="vq-ib-size-label">Systemisch is 7× groter dan het zichtbare</span>
        </div>
      </div>

      {/* ── TOELICHTING TEKST ONDER ─────────────── */}
      <div className="vq-ib-caption" style={reduced ? {} : { opacity: active ? 1 : 0, transform: active ? "none" : "translateY(20px)", transition: "opacity 0.9s ease 3.6s, transform 0.9s ease 3.6s" }}>
        <div className="vq-ib-caption-grid">
          <div className="vq-ib-caption-col">
            <div className="vq-ib-caption-dot vq-ib-caption-dot--gold" />
            <div>
              <p className="vq-ib-caption-heading">Boven water — DISC</p>
              <p className="vq-ib-caption-body">
                DISC brengt zichtbaar gedrag in kaart: hoe jij communiceert,
                reageert en werkt. Herkenbaar, meetbaar, direct inzetbaar.
                Maar het verklaart <em>niet</em> waar het gedrag vandaan komt.
              </p>
            </div>
          </div>
          <div className="vq-ib-caption-divider" aria-hidden="true" />
          <div className="vq-ib-caption-col">
            <div className="vq-ib-caption-dot vq-ib-caption-dot--purple" />
            <div>
              <p className="vq-ib-caption-heading">Onder water — Systemisch</p>
              <p className="vq-ib-caption-body">
                Systemisch werk onthult wat gedrag <em>vanuit de diepte stuurt</em>:
                loyaliteiten, familiepatronen en onbewuste dynamieken. Pas als
                je deze ziet, kun je ze structureel doorbreken.
              </p>
            </div>
          </div>
        </div>
        <p className="vq-ib-caption-conclusion">
          Vivynq combineert beiden. <strong>DISC</strong> geeft de kaart van het zichtbare —{" "}
          <strong>Systemisch werk</strong> gaat naar de wortels eronder.
          Samen vormen ze de basis voor verandering die blijft.
        </p>
      </div>
    </div>
  );
}
