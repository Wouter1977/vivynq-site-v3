"use client";

import { useEffect, useRef } from "react";
import { QCodeMark } from "@/components/qcode-mark";

/* ─────────────────────────────────────────────────────────
   Hero achtergrond — GSAP-gestuurde particles + blobs
   60fps GPU-composited, prefers-reduced-motion veilig
───────────────────────────────────────────────────────── */

const PARTICLES = [
  { top: "18%", left: "12%", size: 5, delay: "0s" },
  { top: "32%", left: "82%", size: 4, delay: "1.2s" },
  { top: "62%", left: "22%", size: 6, delay: "2.1s" },
  { top: "74%", left: "68%", size: 4, delay: "0.6s" },
  { top: "26%", left: "54%", size: 3, delay: "1.8s" },
  { top: "84%", left: "40%", size: 5, delay: "2.6s" },
  { top: "46%", left: "90%", size: 3, delay: "3.1s" },
  { top: "10%", left: "65%", size: 2, delay: "0.9s" },
  { top: "52%", left: "5%",  size: 4, delay: "1.5s" },
];

export function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    /* Respecteer prefers-reduced-motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    function resize() {
      const el = canvas!.parentElement;
      if (!el) return;
      W = canvas!.width  = el.offsetWidth;
      H = canvas!.height = el.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    /* Sterrenveld-deeltjes — goud + paars */
    type Star = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; da: number; gold: boolean };
    const stars: Star[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      da: (Math.random() - 0.5) * 0.008,
      gold: Math.random() > 0.45,
    }));

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha = Math.min(0.85, Math.max(0.08, s.alpha + s.da));
        if (s.alpha >= 0.85 || s.alpha <= 0.08) s.da *= -1;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(201,168,76,${s.alpha})`
          : `rgba(139,111,160,${s.alpha * 0.7})`;

        /* Glow voor grotere deeltjes */
        if (s.r > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = s.gold ? "rgba(201,168,76,0.6)" : "rgba(139,111,160,0.4)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      /* Subtiele verbindingslijnen tussen nabije sterren */
      ctx.shadowBlur = 0;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const a = (1 - dist / 80) * 0.08;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="vq-grain" aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* CSS blob-animaties */}
      <div
        className="vq-blob-a"
        style={{
          position: "absolute", top: "-14%", right: "-8%",
          width: "52vw", height: "52vw", maxWidth: "760px", maxHeight: "760px",
          background: "radial-gradient(closest-side, rgba(201,168,76,0.28), transparent 70%)",
          filter: "blur(32px)",
        }}
      />
      <div
        className="vq-blob-b"
        style={{
          position: "absolute", bottom: "-18%", left: "-12%",
          width: "46vw", height: "46vw", maxWidth: "640px", maxHeight: "640px",
          background: "radial-gradient(closest-side, rgba(46,8,50,0.45), transparent 70%)",
          filter: "blur(32px)",
        }}
      />
      <div
        className="vq-blob-a"
        style={{
          position: "absolute", top: "30%", left: "40%",
          width: "30vw", height: "30vw", maxWidth: "420px", maxHeight: "420px",
          background: "radial-gradient(closest-side, rgba(139,111,160,0.18), transparent 70%)",
          filter: "blur(36px)", animationDelay: "4s",
        }}
      />

      {/* Q.Code merk-anker */}
      <div style={{ position: "absolute", right: "-9%", bottom: "-12%", color: "rgba(201,168,76,0.09)", transform: "rotate(-6deg)" }}>
        <QCodeMark size={560} />
      </div>

      {/* Canvas-sterrenveld */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />

      {/* CSS float-particles (fallback + extra laag) */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="vq-float"
          style={{
            position: "absolute", top: p.top, left: p.left,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: "50%", background: "#C9A84C",
            boxShadow: "0 0 10px rgba(201,168,76,0.75)",
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
