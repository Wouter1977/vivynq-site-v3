"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/lib/products";

/** Waar de "koop/start"-knop heen gaat per product. */
export function productHref(p: Product): string {
  if (p.slug === "zelfscan-qcode") return "/scan";
  if (p.slug === "teamscan-rapport" || p.slug === "teamscan-interventiedag" || p.slug === "eigenaarschapstraject") return "/zakelijk";
  return `/programma/${p.slug}`;
}

/* ─────────────────────────────────────────────────────
   3D-tilt magnetic card — Apple Vision Pro stijl
   Pure CSS transforms, geen deps, GPU-composited
───────────────────────────────────────────────────── */
export function ProductCard({ product }: { product: Product }) {
  const href = productHref(product);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 14 });
    setGlow({ x: px * 100, y: py * 100, opacity: 0.18 });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 });
    setGlow((g) => ({ ...g, opacity: 0 }));
    setHovered(false);
  }

  const isFeatured = product.featured;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        height: "100%",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(6px)" : "translateZ(0)"}`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
        borderRadius: "3px",
        cursor: "pointer",
      }}
    >
      {/* Glow spot (folgt muis) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "3px",
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(201,168,76,0.32) 0%, transparent 60%)`,
          opacity: glow.opacity,
          transition: hovered ? "opacity 0.15s" : "opacity 0.4s",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Kaart-lichaam */}
      <div
        className="flex flex-col h-full"
        style={{
          position: "relative",
          background: isFeatured
            ? "linear-gradient(145deg, rgba(30,8,44,0.98) 0%, rgba(15,3,24,0.98) 100%)"
            : "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(250,248,242,0.98) 100%)",
          border: isFeatured
            ? `1px solid rgba(201,168,76,${hovered ? "0.60" : "0.28"})`
            : `1px solid rgba(15,3,24,${hovered ? "0.14" : "0.07"})`,
          borderTop: isFeatured
            ? `2px solid rgba(201,168,76,${hovered ? "0.90" : "0.55"})`
            : `2px solid rgba(201,168,76,${hovered ? "0.60" : "0.25"})`,
          padding: "26px",
          borderRadius: "3px",
          boxShadow: hovered
            ? isFeatured
              ? "0 28px 70px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.15)"
              : "0 20px 56px -12px rgba(15,3,24,0.14), 0 0 0 1px rgba(201,168,76,0.12)"
            : "0 4px 20px -8px rgba(0,0,0,0.08)",
          transition: "border-color 0.3s ease, box-shadow 0.4s ease",
          zIndex: 2,
        }}
      >
        {/* Featured badge */}
        {isFeatured && (
          <span
            className="font-ui uppercase"
            style={{
              display: "inline-block",
              fontSize: "0.56rem",
              letterSpacing: "0.18em",
              fontWeight: 700,
              color: "#0F0318",
              background: "#C9A84C",
              padding: "3px 8px",
              borderRadius: "1px",
              marginBottom: "14px",
              alignSelf: "flex-start",
            }}
          >
            Populair
          </span>
        )}

        {/* Naam */}
        <h3
          className="font-display"
          style={{
            fontSize: "1.18rem",
            lineHeight: 1.2,
            color: isFeatured ? "rgba(242,237,227,0.95)" : "#0F0318",
            marginBottom: "7px",
          }}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p
          className="font-ui"
          style={{
            fontSize: "0.82rem",
            color: isFeatured ? "rgba(200,168,216,0.72)" : "rgba(15,3,24,0.56)",
            lineHeight: 1.58,
            marginBottom: "18px",
          }}
        >
          {product.tagline}
        </p>

        {/* Prijs */}
        <div className="flex items-baseline gap-2" style={{ marginBottom: "18px" }}>
          <span
            className="font-display"
            style={{ fontSize: "1.85rem", color: "#C9A84C", lineHeight: 1 }}
          >
            {product.priceLabel}
          </span>
          {product.recurringLabel && (
            <span
              className="font-ui"
              style={{
                fontSize: "0.72rem",
                color: isFeatured ? "rgba(201,168,76,0.55)" : "rgba(15,3,24,0.42)",
              }}
            >
              {product.recurringLabel}
            </span>
          )}
        </div>

        {/* Inhoud-punten */}
        <ul className="flex flex-col gap-2 mb-6">
          {product.inhoud.slice(0, 4).map((line) => (
            <li key={line} className="flex gap-2.5">
              <span style={{ color: "#C9A84C", fontSize: "0.76rem", lineHeight: 1.55, flexShrink: 0, marginTop: "1px" }}>
                ✓
              </span>
              <span
                className="font-ui"
                style={{
                  fontSize: "0.80rem",
                  color: isFeatured ? "rgba(200,168,216,0.80)" : "rgba(15,3,24,0.64)",
                  lineHeight: 1.55,
                }}
              >
                {line}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto">
          <p
            className="font-ui"
            style={{
              fontSize: "0.70rem",
              color: isFeatured ? "rgba(200,168,216,0.48)" : "rgba(15,3,24,0.42)",
              marginBottom: "12px",
            }}
          >
            {product.belofte}
          </p>
          <Link
            href={href}
            className="font-ui uppercase block text-center transition-all"
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.13em",
              fontWeight: 700,
              color: isFeatured ? "#0F0318" : "#C9A84C",
              background: isFeatured ? "#C9A84C" : "transparent",
              border: `1px solid rgba(201,168,76,${isFeatured ? "1" : "0.40"})`,
              padding: "12px 18px",
              borderRadius: "2px",
            }}
          >
            {product.cta} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export const ProgramCard = ProductCard;
