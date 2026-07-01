"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────
   Reveal — Framer Motion viewport-triggered animatie
   Spring physics voor Apple-niveau smoothness.
   prefers-reduced-motion: FM respecteert dit automatisch.
───────────────────────────────────────────────────────── */

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={VARIANTS}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
