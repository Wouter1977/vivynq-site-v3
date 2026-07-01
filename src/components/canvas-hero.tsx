"use client";

import { useEffect, useRef } from "react";

/**
 * CanvasHero — €100k-niveau fullscreen video-vervanging.
 * WebGL-achtig aurora + particle-veld op canvas.
 * 60fps, GPU-composited, prefers-reduced-motion veilig.
 */
export function CanvasHero() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, t = 0;

    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* ── AURORA-LAGEN ── */
    type Aurora = { cx: number; cy: number; rx: number; ry: number; hue: number; phase: number; speed: number };
    const auroras: Aurora[] = [
      { cx: 0.30, cy: 0.38, rx: 0.55, ry: 0.28, hue: 48,  phase: 0,    speed: 0.00018 },
      { cx: 0.70, cy: 0.52, rx: 0.50, ry: 0.30, hue: 270, phase: 1.8,  speed: 0.00014 },
      { cx: 0.50, cy: 0.20, rx: 0.40, ry: 0.22, hue: 38,  phase: 3.2,  speed: 0.00022 },
      { cx: 0.15, cy: 0.72, rx: 0.35, ry: 0.20, hue: 260, phase: 4.5,  speed: 0.00016 },
      { cx: 0.85, cy: 0.20, rx: 0.30, ry: 0.18, hue: 42,  phase: 0.9,  speed: 0.00020 },
    ];

    /* ── STERREN/PARTICLES ── */
    type Star = { x: number; y: number; r: number; a: number; da: number; vx: number; vy: number; gold: boolean };
    const stars: Star[] = Array.from({ length: reduced ? 0 : 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.7 + 0.1,
      da: (Math.random() - 0.5) * 0.006,
      vx: (Math.random() - 0.5) * 0.00008,
      vy: (Math.random() - 0.5) * 0.00008,
      gold: Math.random() > 0.5,
    }));

    function draw(ts: number) {
      if (!ctx) return;
      t = ts * 0.001;

      /* Achtergrond */
      ctx.fillStyle = "#030108";
      ctx.fillRect(0, 0, W, H);

      /* Aurora-lagen */
      ctx.globalCompositeOperation = "screen";
      for (const a of auroras) {
        const cx = W * (a.cx + 0.06 * Math.sin(t * a.speed * 1000 + a.phase));
        const cy = H * (a.cy + 0.04 * Math.cos(t * a.speed * 1000 * 0.7 + a.phase));
        const rx = W * (a.rx + 0.04 * Math.sin(t * a.speed * 1000 * 1.3 + a.phase));
        const ry = H * (a.ry + 0.03 * Math.cos(t * a.speed * 1000 * 0.9 + a.phase));

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
        const alpha = reduced ? 0.055 : (0.065 + 0.025 * Math.sin(t * a.speed * 800 + a.phase));
        g.addColorStop(0, `hsla(${a.hue},80%,55%,${alpha})`);
        g.addColorStop(0.4, `hsla(${a.hue},60%,40%,${alpha * 0.4})`);
        g.addColorStop(1, `hsla(${a.hue},40%,20%,0)`);

        ctx.save();
        ctx.scale(1, ry / rx);
        ctx.beginPath();
        ctx.ellipse(cx, cy * (rx / ry), rx, rx, 0, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      }

      /* Sterren */
      ctx.globalCompositeOperation = "lighter";
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        s.a  = Math.max(0.05, Math.min(0.85, s.a + s.da));
        if (s.a >= 0.85 || s.a <= 0.05) s.da *= -1;
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
        if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(220,185,80,${s.a})`
          : `rgba(160,130,200,${s.a * 0.6})`;
        if (s.r > 1.0) {
          ctx.shadowBlur  = 10;
          ctx.shadowColor = s.gold ? "rgba(220,185,80,0.5)" : "rgba(160,130,200,0.3)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      /* Dunne verbindingslijnen */
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 0.4;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = (stars[i].x - stars[j].x) * W;
          const dy = (stars[i].y - stars[j].y) * H;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x * W, stars[i].y * H);
            ctx.lineTo(stars[j].x * W, stars[j].y * H);
            ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 90) * 0.07})`;
            ctx.stroke();
          }
        }
      }

      /* Goud-glans-lijn over het midden */
      ctx.globalCompositeOperation = "screen";
      const lineY = H * (0.55 + 0.04 * Math.sin(t * 0.22));
      const lg = ctx.createLinearGradient(0, lineY - 1, W, lineY + 1);
      lg.addColorStop(0,   "transparent");
      lg.addColorStop(0.2, `rgba(201,168,76,${0.04 + 0.02 * Math.sin(t * 0.4)})`);
      lg.addColorStop(0.5, `rgba(243,226,176,${0.08 + 0.03 * Math.sin(t * 0.4)})`);
      lg.addColorStop(0.8, `rgba(201,168,76,${0.04 + 0.02 * Math.sin(t * 0.4)})`);
      lg.addColorStop(1,   "transparent");
      ctx.fillStyle = lg;
      ctx.fillRect(0, lineY - 1, W, 3);

      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(draw);
    }

    raf.current = requestAnimationFrame(draw);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
