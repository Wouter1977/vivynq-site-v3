"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { QCodeMark } from "@/components/qcode-mark";
import { Container, Eyebrow } from "@/components/ui";
import { CharReveal, WordReveal, FadeIn, MagneticButton } from "@/components/motion-primitives";

const CanvasHero = dynamic(
  () => import("@/components/canvas-hero").then((m) => ({ default: m.CanvasHero })),
  { ssr: false }
);

/* ─────────────────────────────────────────────────────
   HeroSection — volledig Framer Motion geanimeerde hero
   • CharReveal headline (letter-by-letter, Apple-stijl)
   • WordReveal subkop
   • Magnetic CTA knoppen
   • Scroll-parallax op Q.Code card
   • Scroll-fade-out op de gehele hero bij wegscrollen
───────────────────────────────────────────────────── */

const QCODE_DIMS = [
  { l: "Lichaam", v: "32" },
  { l: "Denken",  v: "44" },
  { l: "Gevoel",  v: "19" },
  { l: "Ziel",    v: "27" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();

  /* Scroll-parallax: kaart drijft omhoog naarmate je scrollt */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardYRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cardY    = useSpring(cardYRaw, { stiffness: 60, damping: 20 });

  /* Hero fade-out bij scrollen */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.97]);

  return (
    <motion.section
      ref={sectionRef}
      className="diag-bottom"
      style={{
        position: "relative",
        background: "#0F0318",
        paddingTop: "80px",
        paddingBottom: "140px",
        overflow: "hidden",
        opacity: reduced ? 1 : heroOpacity,
        scale:   reduced ? 1 : heroScale,
      }}
    >
      {/* Fullscreen canvas aurora + particle field */}
      <CanvasHero />

      {/* Drijvende orbs */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <motion.div
          className="vq-orb-a"
          style={{ position: "absolute", top: "15%", left: "8%", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 70%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        />
        <motion.div
          className="vq-orb-b"
          style={{ position: "absolute", top: "40%", right: "5%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.16) 0%, transparent 70%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.8 }}
        />
        <motion.div
          className="vq-orb-c"
          style={{ position: "absolute", bottom: "10%", left: "30%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.1 }}
        />
      </div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LINKS: tekst ──────────────────────── */}
          <div className="lg:col-span-7">

            {/* Eyebrow — slide up */}
            <FadeIn delay={0.05} y={14}>
              <Eyebrow>Premium Coaching · Nederland</Eyebrow>
            </FadeIn>

            {/* H1 — letter-by-letter stagger (Apple-stijl) */}
            <h1
              className="font-display text-white"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 4.8rem)",
                lineHeight: 1.04,
                margin: "22px 0 0",
                letterSpacing: "-0.018em",
                fontWeight: 500,
              }}
              aria-label="Jouw Leven. Jouw Regels. Jouw Tijd."
            >
              {/* Lijn 1 */}
              <CharReveal
                text="Jouw Leven."
                delay={0.18}
                stagger={0.038}
                style={{ display: "block", marginBottom: "0.04em" }}
              />

              {/* Lijn 2 — goud shimmer + italics */}
              <span
                className="vq-shimmer"
                style={{ fontStyle: "italic", fontWeight: 400, display: "block", marginBottom: "0.04em" }}
                aria-hidden="true"
              >
                <CharReveal
                  text="Jouw Regels."
                  delay={0.52}
                  stagger={0.036}
                />
              </span>

              {/* Lijn 3 */}
              <CharReveal
                text="Jouw Tijd."
                delay={0.86}
                stagger={0.040}
                style={{ display: "block" }}
              />
            </h1>

            {/* Lead — woord voor woord */}
            <WordReveal
              text="Vivynq begeleidt ambitieuze mensen naar de versie van zichzelf die ze altijd al wilden zijn. Gefundeerd. Persoonlijk. Resultaat."
              delay={1.4}
              style={{ maxWidth: "520px", marginTop: "26px", fontSize: "1.06rem", color: "rgba(250,248,242,0.78)", lineHeight: 1.80 }}
            />

            {/* CTA knoppen — magnetic + spring */}
            <FadeIn delay={1.75} y={16}>
              <div className="flex flex-wrap gap-4" style={{ marginTop: "34px" }}>
                <MagneticButton
                  href="/start"
                  className="font-ui uppercase inline-flex items-center gap-2"
                  style={{
                    fontSize: "0.76rem",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    color: "#0F0318",
                    background: "#C9A84C",
                    padding: "15px 28px",
                    borderRadius: "2px",
                  }}
                >
                  Begin hier <span>→</span>
                </MagneticButton>

                <MagneticButton
                  href="/programmas"
                  className="font-ui uppercase inline-flex items-center gap-2"
                  style={{
                    fontSize: "0.76rem",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    color: "#C9A84C",
                    background: "transparent",
                    border: "1px solid rgba(201,168,76,0.40)",
                    padding: "15px 28px",
                    borderRadius: "2px",
                  }}
                >
                  Bekijk programma&apos;s
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          {/* ── RECHTS: Q.Code card met parallax ─── */}
          <motion.div
            ref={cardRef}
            className="lg:col-span-5"
            style={{ y: reduced ? 0 : cardY }}
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 65, damping: 16 }}
          >
            <figure
              aria-label="Voorbeeld van een Q.Code-rapport — vier dimensies"
              style={{
                position: "relative",
                aspectRatio: "1 / 1.05",
                background: "linear-gradient(155deg, rgba(45,8,50,0.55) 0%, rgba(15,3,24,0.85) 100%)",
                border: "1px solid rgba(201,168,76,0.28)",
                padding: "clamp(20px, 3vw, 32px)",
                overflow: "hidden",
                borderRadius: "3px",
              }}
            >
              {/* Glassmorphism glans */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
                  pointerEvents: "none",
                  borderRadius: "3px",
                }}
              />

              <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
                <motion.span
                  className="font-ui uppercase"
                  style={{ fontSize: "0.60rem", letterSpacing: "0.22em", fontWeight: 700, color: "#C9A84C" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  Jouw Q.Code
                </motion.span>
                <motion.span
                  className="font-ui uppercase"
                  style={{ fontSize: "0.60rem", letterSpacing: "0.18em", color: "rgba(200,168,216,0.50)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  Voorbeeld
                </motion.span>
              </div>

              {/* Q.Code mark met rotatie-entrance */}
              <div className="relative flex items-center justify-center" style={{ minHeight: "200px", marginBottom: "18px" }}>
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", inset: "-20%", background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.14) 0%, transparent 65%)" }}
                />
                <motion.div
                  initial={reduced ? false : { scale: 0.6, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.85, type: "spring", stiffness: 60, damping: 14 }}
                  style={{ position: "relative" }}
                >
                  <QCodeMark size={200} style={{ color: "rgba(201,168,76,0.92)" }} />
                </motion.div>
              </div>

              {/* Dimensie-labels — staggered in */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3" style={{ borderTop: "1px solid rgba(201,168,76,0.16)", paddingTop: "16px" }}>
                {QCODE_DIMS.map(({ l, v }, i) => (
                  <motion.div
                    key={l}
                    className="flex items-baseline justify-between"
                    initial={reduced ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.08, type: "spring", stiffness: 80 }}
                  >
                    <span className="font-ui uppercase" style={{ fontSize: "0.64rem", letterSpacing: "0.15em", color: "rgba(232,216,246,0.76)", fontWeight: 600 }}>
                      {l}
                    </span>
                    <span className="font-display tabular-nums" style={{ fontSize: "1rem", color: "#C9A84C", fontWeight: 500 }}>
                      {v}<span style={{ fontSize: "0.60rem", marginLeft: "1px", color: "rgba(201,168,76,0.60)" }}>%</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </figure>
          </motion.div>
        </div>
      </Container>

      {/* Scroll-cue — pulserend */}
      <FadeIn delay={2.0} y={0}>
        <div className="hidden md:block" style={{ position: "absolute", bottom: "56px", left: "50%", transform: "translateX(-50%)", zIndex: 2 }} aria-hidden="true">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: "24px", height: "38px", border: "1.5px solid rgba(201,168,76,0.45)", borderRadius: "12px", display: "flex", justifyContent: "center", paddingTop: "7px" }}
          >
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ width: "3px", height: "7px", borderRadius: "2px", background: "#C9A84C", display: "block" }}
            />
          </motion.div>
        </div>
      </FadeIn>
    </motion.section>
  );
}
