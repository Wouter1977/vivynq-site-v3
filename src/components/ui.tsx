import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const GOLD = "#C9A84C";
const MUTED = "rgba(200,168,216,0.82)";

/** Sectie-wrapper met consistente horizontale marges en max-breedte. */
export function Container({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </div>
  );
}

/** Kleine bovenkop-label in goud, uppercase. */
export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className="font-ui uppercase text-goud" style={{ fontSize: "0.74rem", letterSpacing: "0.18em", fontWeight: 700, ...style }}>
      {children}
    </p>
  );
}

/** Primaire goud-knop (link). */
export function GoldLink({ href, children, style }: { href: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <Link
      href={href}
      className="font-ui uppercase inline-flex items-center justify-center transition-all hover:brightness-110"
      style={{
        fontSize: "0.78rem",
        letterSpacing: "0.12em",
        fontWeight: 700,
        color: "#0F0318",
        background: GOLD,
        padding: "13px 26px",
        border: `1px solid ${GOLD}`,
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

/** Secundaire (ghost) knop (link). */
export function GhostLink({ href, children, style }: { href: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <Link
      href={href}
      className="font-ui uppercase inline-flex items-center justify-center transition-all hover:brightness-125"
      style={{
        fontSize: "0.78rem",
        letterSpacing: "0.12em",
        fontWeight: 700,
        color: GOLD,
        background: "transparent",
        padding: "13px 26px",
        border: `1px solid rgba(201,168,76,0.4)`,
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

/** Donkere kaart met goud-rand. */
export function Card({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{ background: "rgba(45,8,50,0.5)", border: "1px solid rgba(201,168,76,0.18)", padding: "26px", ...style }}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <h2 className="font-display text-white" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)", lineHeight: 1.15, ...style }}>
      {children}
    </h2>
  );
}

export function Lead({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className="font-ui" style={{ fontSize: "1rem", color: MUTED, lineHeight: 1.75, ...style }}>
      {children}
    </p>
  );
}

export { GOLD, MUTED };
