"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * IntroScreen — premium loading-curtain.
 * VIVYNQ letters staggeren in, goldline vult, dan schuift het scherm omhoog.
 * Blocking: geen scroll totdat intro klaar is.
 */
const LETTERS = "VIVYNQ".split("");

export function IntroScreen() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"letters" | "bar" | "exit" | "done">("letters");

  useEffect(() => {
    if (reduced) { setPhase("done"); return; }

    // Geen intro als al eerder bezocht in deze sessie
    if (sessionStorage.getItem("vq-intro-seen")) { setPhase("done"); return; }
    sessionStorage.setItem("vq-intro-seen", "1");

    // Blokkeer scroll
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("bar"),    1800);
    const t2 = setTimeout(() => setPhase("exit"),   4000);
    const t3 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 5800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.body.style.overflow = ""; };
  }, [reduced]);

  if ((phase as string) === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          style={{
            position: "fixed",
            inset: 0,
            background: "#030108",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Achtergrond-aura */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* VIVYNQ letters — stagger */}
          <div className="flex gap-[0.06em]" aria-label="VIVYNQ">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.1 + i * 0.09,
                  type: "spring",
                  stiffness: 80,
                  damping: 14,
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(6rem, 18vw, 14rem)",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  color: "#FAF8F2",
                  lineHeight: 1,
                  display: "inline-block",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Goudlijn — laadt op */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "1px",
              background: "rgba(201,168,76,0.18)",
              marginTop: "28px",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "bar" || phase === "exit" ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, #C9A84C, #F3E2B0, #C9A84C, transparent)",
                transformOrigin: "left",
              }}
            />
          </div>

          {/* Subtekst */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "bar" || phase === "exit" ? 0.9 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "1.1rem",
              letterSpacing: "0.28em",
              color: "#E4D4A6",
              textTransform: "uppercase",
              marginTop: "28px",
            }}
          >
            Premium Coaching · Nederland
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
