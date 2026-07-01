"use client";

/**
 * Vivynq Motion Primitives — Framer Motion building blocks
 * Apple-niveau: spring-physics, character stagger, magnetic buttons,
 * scroll-parallax. Alle componenten respecteren prefers-reduced-motion.
 */

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────
   1. CharReveal — Apple letter-by-letter stagger
      Elke letter zweeft op vanuit y:80, met blur.
───────────────────────────────────────────────────── */

const CHAR_CONTAINER: Variants = {
  hidden: {},
  visible: (stagger = 0.032) => ({
    transition: { staggerChildren: stagger },
  }),
};

const CHAR_ITEM: Variants = {
  hidden: {
    opacity: 0,
    y: 68,
    rotateX: 28,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
      mass: 0.7,
    },
  },
};

interface CharRevealProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function CharReveal({
  text,
  className = "",
  style,
  stagger = 0.032,
  delay = 0,
  as: Tag = "span",
}: CharRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={className} style={{ ...style, display: "block", perspective: "800px" }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em" }}>
          <motion.span
            style={{ display: "inline-flex" }}
            variants={CHAR_CONTAINER}
            initial="hidden"
            animate="visible"
            custom={stagger}
            transition={{ delayChildren: delay + wi * stagger * word.length * 0.5 }}
          >
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                style={{ display: "inline-block", transformOrigin: "50% 100%" }}
                variants={CHAR_ITEM}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────
   2. WordReveal — woord-voor-woord fade-up
      Gebruikt voor subtekst, lead, labels.
───────────────────────────────────────────────────── */

const WORD_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055 },
  },
};

const WORD_ITEM: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 75,
      damping: 16,
    },
  },
};

interface WordRevealProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: "p" | "span" | "h2" | "h3";
}

export function WordReveal({
  text,
  className = "",
  style,
  delay = 0,
  as: Tag = "p",
}: WordRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={WORD_CONTAINER}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      <Tag style={{ margin: 0 }}>
        {text.split(" ").map((word, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.26em", verticalAlign: "bottom" }}>
            <motion.span style={{ display: "inline-block" }} variants={WORD_ITEM}>
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   3. MagneticButton — magnetisch hover-effect + spring-press
      Cursor trekt de knop naar zich toe (Apple Vision Pro stijl)
───────────────────────────────────────────────────── */

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  style,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const xRaw = useSpring(0, { stiffness: 200, damping: 22 });
  const yRaw = useSpring(0, { stiffness: 200, damping: 22 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    xRaw.set((e.clientX - cx) * strength);
    yRaw.set((e.clientY - cy) * strength);
  }
  function onLeave() { xRaw.set(0); yRaw.set(0); }

  const inner = (
    <motion.div
      className={className}
      style={{ ...style, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: xRaw, y: yRaw, display: "inline-flex" }}
    >
      {href ? (
        <Link href={href} style={{ textDecoration: "none" }}>
          {inner}
        </Link>
      ) : (
        <button onClick={onClick} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   4. ParallaxLayer — scroll-gestuurde parallax
      Elementen bewegen trager/sneller dan de scroll.
───────────────────────────────────────────────────── */

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;         /* 0 = mee met scroll, -1 = tegengesteld, 0.5 = half speed */
  className?: string;
  style?: CSSProperties;
}

export function ParallaxLayer({
  children,
  speed = 0.4,
  className = "",
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);
  const y = useSpring(raw, { stiffness: 60, damping: 20 });

  if (reduced) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   5. FadeIn — eenvoudige entrance met delay-prop
───────────────────────────────────────────────────── */

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay,
        type: "spring",
        stiffness: 72,
        damping: 17,
        mass: 0.9,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   6. StaggerGrid — kinderen staggered in view
───────────────────────────────────────────────────── */

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
};

const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export function StaggerGrid({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={STAGGER_CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={STAGGER_ITEM}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   7. LineReveal — sectiekoppen scrollen in per lijn
───────────────────────────────────────────────────── */

export function LineReveal({
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
  const reduced = useReducedMotion();
  return (
    <div className={className} style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={reduced ? false : { y: "102%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay,
          type: "spring",
          stiffness: 70,
          damping: 16,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
