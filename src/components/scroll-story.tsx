"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollStory — Apple-stijl pinned scroll-sectie.
 * De achtergrond blijft gepind; tekst en visuals wisselen
 * terwijl je scrolt. 4 hoofdstukken over het Vivynq-model.
 */

const CHAPTERS = [
  {
    n: "01",
    eyebrow: "Jouw patroon",
    title: "Elk gedrag heeft\neen verhaal.",
    body: "Wat je ziet aan de buitenkant — hoe iemand communiceert, reageert, leidt — is slechts het topje van de ijsberg. Vivynq begint waar anderen stoppen.",
    accent: "#C9A84C",
    glow: "rgba(201,168,76,0.12)",
  },
  {
    n: "02",
    eyebrow: "DISC · Boven water",
    title: "Gedragsstijl in\nkaart gebracht.",
    body: "DISC onthult hoe jij werkt, communiceert en beslissingen neemt. Meetbaar, direct inzetbaar — en de basis voor alles wat volgt.",
    accent: "#C9A84C",
    glow: "rgba(201,168,76,0.15)",
  },
  {
    n: "03",
    eyebrow: "Systemisch · Onder water",
    title: "De wortels van\ngedrag blootgelegd.",
    body: "Loyaliteiten, familiepatronen, onbewuste balansen — systemisch werk gaat naar de diepte. Pas hier vindt structurele verandering zijn oorsprong.",
    accent: "#8B6FA0",
    glow: "rgba(139,111,160,0.15)",
  },
  {
    n: "04",
    eyebrow: "Het Vivynq-model",
    title: "Samen: verandering\ndie blijft.",
    body: "Vivynq combineert DISC en systemisch werk in één traject. Zichtbaar gedrag begrijpen én de diepe oorzaken aanpakken. Dat is het verschil.",
    accent: "#C9A84C",
    glow: "rgba(201,168,76,0.10)",
  },
];

export function ScrollStory() {
  const reduced = useReducedMotion();
  const sectionRef  = useRef<HTMLElement>(null);
  const pinRef      = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin     = pinRef.current;
    if (!section || !pin) return;

    // Wacht tot ScrollTrigger gereed is
    const ctx = gsap.context(() => {
      // Elk hoofdstuk: fade in/out op scroll
      chaptersRef.current.forEach((el, i) => {
        if (!el) return;

        const isFirst = i === 0;
        const isLast  = i === CHAPTERS.length - 1;

        gsap.fromTo(
          el,
          {
            opacity: isFirst ? 1 : 0,
            y:       isFirst ? 0 : 32,
            filter:  isFirst ? "blur(0px)" : "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 25}% top`,
              end:   `top+=${i * 25 + 20}% top`,
              scrub: 1.2,
              toggleActions: "play none none reverse",
            },
          }
        );

        if (!isLast) {
          gsap.to(el, {
            opacity: 0,
            y: -28,
            filter: "blur(6px)",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 25 + 22}% top`,
              end:   `top+=${i * 25 + 25}% top`,
              scrub: 1.2,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="Het Vivynq-verhaal in vier stappen"
      style={{
        position: "relative",
        height: reduced ? "auto" : "400vh",
        background: "#030108",
      }}
    >
      {/* Pinned container */}
      <div
        ref={pinRef}
        style={{
          position: reduced ? "relative" : "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Achtergrond-glow die wisselt per hoofdstuk */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Grid-lijnen decoratie */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {[20, 40, 60, 80].map((x) => (
            <div
              key={x}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: 0,
                bottom: 0,
                width: "1px",
                background: "rgba(201,168,76,0.04)",
              }}
            />
          ))}
          {[25, 50, 75].map((y) => (
            <div
              key={y}
              style={{
                position: "absolute",
                top: `${y}%`,
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(201,168,76,0.04)",
              }}
            />
          ))}
        </div>

        {/* Hoofdstuk-inhoud */}
        <div style={{ position: "relative", width: "100%", maxWidth: "900px", padding: "0 32px" }}>
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.n}
              ref={(el) => { if (el) chaptersRef.current[i] = el; }}
              style={{
                position: i === 0 ? "relative" : "absolute",
                inset: i === 0 ? "auto" : 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "0 32px",
                opacity: reduced ? 1 : (i === 0 ? 1 : 0),
              }}
            >
              {/* Nummer */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  fontWeight: 400,
                  color: ch.accent,
                  lineHeight: 0.85,
                  opacity: 0.12,
                  position: "absolute",
                  right: "32px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  userSelect: "none",
                  letterSpacing: "-0.05em",
                }}
                aria-hidden="true"
              >
                {ch.n}
              </p>

              {/* Eyebrow */}
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  fontWeight: 700,
                  color: ch.accent,
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  opacity: 0.85,
                }}
              >
                {ch.eyebrow}
              </p>

              {/* Titel */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                  fontWeight: 400,
                  color: "#FAF8F2",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  marginBottom: "28px",
                  whiteSpace: "pre-line",
                  maxWidth: "640px",
                }}
              >
                {ch.title}
              </h2>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "clamp(0.96rem, 1.4vw, 1.1rem)",
                  color: "rgba(220,210,235,0.72)",
                  lineHeight: 1.88,
                  maxWidth: "520px",
                }}
              >
                {ch.body}
              </p>

              {/* Goud-lijn */}
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  background: `linear-gradient(90deg, ${ch.accent}, transparent)`,
                  marginTop: "32px",
                }}
              />
            </div>
          ))}

          {/* Voortgangs-indicator */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              right: "32px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {CHAPTERS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "4px",
                  height: i === 0 ? "24px" : "8px",
                  background: i === 0 ? "#C9A84C" : "rgba(201,168,76,0.25)",
                  borderRadius: "2px",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
