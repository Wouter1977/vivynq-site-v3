"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

/**
 * CustomCursor — goud magnetisch cursor-systeem.
 * Ring volgt met spring-vertraging, dot zit precies op de cursor.
 * Vergroot bij hover op interactieve elementen.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useRef(0);
  const rawY = useRef(0);

  const ringX = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const ringY = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const dotX  = useSpring(0, { stiffness: 500, damping: 28 });
  const dotY  = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Alleen op desktop — op touch is er geen cursor
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function onLeave()  { setVisible(false); }
    function onEnter()  { setVisible(true);  }
    function onDown()   { setClicking(true); }
    function onUp()     { setClicking(false); }

    // Detecteer interactieve elementen
    function onOver(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [role='button'], input, textarea, select, label");
      setHovering(!!isInteractive);
    }

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onOver,  { passive: true });

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onOver);
    };
  }, [reduced, visible, ringX, ringY, dotX, dotY]);

  if (reduced) return null;

  const ringSize = hovering ? 52 : clicking ? 20 : 36;
  const ringOpacity = visible ? (hovering ? 0.55 : 0.35) : 0;

  return (
    <>
      {/* Buitenste ring — vertraagd, pulseerbaar */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          border: "1.5px solid rgba(201,168,76,0.8)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: ringOpacity,
          mixBlendMode: "difference",
        }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        animate={{ width: ringSize, height: ringSize, opacity: ringOpacity }}
      />

      {/* Binnenste dot — direct op cursor */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? 4 : 6,
          height: clicking ? 4 : 6,
          background: "#C9A84C",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 8px rgba(201,168,76,0.8)",
        }}
        animate={{ width: clicking ? 4 : 6, height: clicking ? 4 : 6, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      />
    </>
  );
}
