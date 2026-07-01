import type { CSSProperties } from "react";

/**
 * Q.Code merk-mark — asymmetrische 4-kwadrant compositie als visueel anker.
 * Verwijst naar de Vivynq Q.Code-methodiek (4 DISC-dimensies, ongelijk).
 * Strokes/dots erven `currentColor`, zodat het meeschaalt met text-kleur.
 */
export function QCodeMark({
  size = 48,
  strokeOpacity = 1,
  dotOpacity = 1,
  className,
  style,
  title,
}: {
  size?: number;
  strokeOpacity?: number;
  dotOpacity?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Buitenkader — half-open hoeken (couture detail) */}
      <path
        d="M 14 6 L 6 6 L 6 14 M 94 6 L 86 6 M 94 6 L 94 14 M 6 86 L 6 94 L 14 94 M 86 94 L 94 94 L 94 86"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
        strokeOpacity={strokeOpacity}
      />
      {/* Asymmetrisch kruis: vertical op 38, horizontal op 58 — bewust niet 50/50 */}
      <line x1="38" y1="14" x2="38" y2="86" stroke="currentColor" strokeWidth="0.7" strokeOpacity={strokeOpacity * 0.85} />
      <line x1="14" y1="58" x2="86" y2="58" stroke="currentColor" strokeWidth="0.7" strokeOpacity={strokeOpacity * 0.85} />
      {/* 4 kwadrant-punten, golden-ratio variërend in grootte */}
      <circle cx="22" cy="34" r="3.4" fill="currentColor" fillOpacity={dotOpacity} />
      <circle cx="64" cy="30" r="4.6" fill="currentColor" fillOpacity={dotOpacity} />
      <circle cx="20" cy="74" r="2.6" fill="currentColor" fillOpacity={dotOpacity * 0.85} />
      <circle cx="66" cy="76" r="3.8" fill="currentColor" fillOpacity={dotOpacity} />
    </svg>
  );
}
