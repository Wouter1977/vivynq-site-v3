"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Methode",   href: "/#methode" },
  { label: "Voor wie",  href: "/#voor-wie" },
  { label: "Producten", href: "/#producten" },
  { label: "Proces",    href: "/#hoe-het-werkt" },
  { label: "FAQ",       href: "/#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled ? "rgba(15,3,24,0.96)" : "rgba(15,3,24,0.82)";
  const shadow = scrolled ? "0 1px 0 rgba(201,168,76,0.10)" : "none";

  return (
    <header
      className="site-header fixed top-0 left-0 right-0 z-50"
      style={{
        height: "68px",
        background: bg,
        backdropFilter: "blur(16px) saturate(1.3)",
        WebkitBackdropFilter: "blur(16px) saturate(1.3)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        boxShadow: shadow,
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "100%" }}
        className="flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="VIVYNQ — naar homepage"
          className="font-display shimmer-logo shrink-0"
          style={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none" }}
        >
          VIVYNQ.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link font-ui transition-colors"
              style={{ fontSize: "0.935rem", fontWeight: 500, color: "rgba(242,237,227,0.70)", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link
          href="/#kennismaking"
          className="btn-gold hidden md:inline-flex"
          style={{ fontSize: "0.78rem", padding: "10px 20px", borderRadius: "6px" }}
        >
          Plan een gesprek
        </Link>

        {/* Hamburger mobiel */}
        <button
          type="button"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center"
          style={{ width: "44px", height: "44px", background: "none", border: "none", cursor: "pointer", gap: "5px" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "rgba(242,237,227,0.9)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: open
                  ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "none"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobiel menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            background: "rgba(15,3,24,0.98)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(201,168,76,0.15)",
            padding: "24px",
          }}
        >
          <div className="flex flex-col gap-0">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-ui"
                style={{
                  display: "block",
                  padding: "16px 0",
                  fontSize: "1rem",
                  color: "rgba(242,237,227,0.88)",
                  borderBottom: "1px solid rgba(201,168,76,0.12)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#kennismaking"
              onClick={() => setOpen(false)}
              className="btn-gold mt-6 justify-center"
              style={{ fontSize: "0.85rem" }}
            >
              Plan een gesprek
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
