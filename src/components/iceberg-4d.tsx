"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   VIVYNQ IJSBERG 4D — canvas-animatie
   3D perspectief + tijd-as: particles, goud-waterline shimmer,
   ademende ijsberg, progressive label-reveal.
   Geen externe dependencies.
───────────────────────────────────────────────────────────── */

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number; base: number;
  zone: "air" | "deep";
}

function makeDots(W: number, H: number, waterY: number): Dot[] {
  const dots: Dot[] = [];
  for (let i = 0; i < 28; i++) {
    dots.push({
      x: Math.random() * W,
      y: waterY + 30 + Math.random() * (H - waterY - 50),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.15 + Math.random() * 0.25),
      r: 0.8 + Math.random() * 1.8,
      base: 0.08 + Math.random() * 0.22,
      zone: "deep",
    });
  }
  for (let i = 0; i < 10; i++) {
    dots.push({
      x: Math.random() * W,
      y: 8 + Math.random() * (waterY - 20),
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.08 + Math.random() * 0.15),
      r: 0.6 + Math.random() * 1.2,
      base: 0.06 + Math.random() * 0.14,
      zone: "air",
    });
  }
  return dots;
}

function polygon(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}

function easeIn(t: number) { return t * t; }

export function IcebergCanvas4D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, animId = 0, frame = 0;
    let dots: Dot[] = [];

    function resize() {
      W = wrap!.offsetWidth;
      H = Math.round(W * 0.60);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.scale(DPR, DPR);
      dots = makeDots(W, H, H * 0.40);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw() {
      if (!ctx) return;
      animId = requestAnimationFrame(draw);
      frame++;
      const t = frame / 60;
      const breath = reduced ? 0 : Math.sin(t * 0.7) * 0.006;

      const waterY = H * 0.40;
      const cx = W * 0.44; // slight left offset to leave room for right-side labels
      const peakY = H * 0.06;
      const btm = H * 0.97;

      ctx.clearRect(0, 0, W, H);

      // ── OCEAN BG ──────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#05080F");
      bg.addColorStop(waterY / H * 0.9, "#091420");
      bg.addColorStop(1, "#010408");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // deep glow behind berg
      const dg = ctx.createRadialGradient(cx, waterY + (H - waterY) * 0.38, 0, cx, waterY + (H - waterY) * 0.38, W * 0.32);
      dg.addColorStop(0, "rgba(30,60,90,0.40)");
      dg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = dg;
      ctx.fillRect(0, 0, W, H);

      // ── PARTICLES ────────────────────────────
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.zone === "deep") {
          if (d.y < waterY + 15) { d.y = H - 15; d.x = Math.random() * W; }
        } else {
          if (d.y < 0) { d.y = waterY - 12; d.x = Math.random() * W; }
        }
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        const flicker = d.base * (0.7 + 0.3 * Math.sin(t * 1.2 + d.x));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.zone === "deep"
          ? `rgba(90,150,195,${flicker})`
          : `rgba(190,215,235,${flicker})`;
        ctx.fill();
      }

      // ── BELOW-WATER BERG ─────────────────────
      ctx.save();
      ctx.translate(cx, waterY);
      ctx.scale(1 + breath * 0.5, 1 + breath * 0.5);
      ctx.translate(-cx, -waterY);

      const bw = W * 0.28;
      const bPts: [number, number][] = [
        [cx - bw * 0.70, waterY],
        [cx - bw * 0.90, waterY + (H - waterY) * 0.28],
        [cx - bw * 1.05, waterY + (H - waterY) * 0.54],
        [cx - bw * 0.85, waterY + (H - waterY) * 0.76],
        [cx - bw * 0.45, waterY + (H - waterY) * 0.90],
        [cx, btm],
        [cx + bw * 0.45, waterY + (H - waterY) * 0.90],
        [cx + bw * 0.85, waterY + (H - waterY) * 0.76],
        [cx + bw * 1.05, waterY + (H - waterY) * 0.54],
        [cx + bw * 0.90, waterY + (H - waterY) * 0.28],
        [cx + bw * 0.70, waterY],
      ];
      const bg2 = ctx.createLinearGradient(cx - bw, waterY, cx + bw, btm);
      bg2.addColorStop(0, "rgba(50,82,112,0.93)");
      bg2.addColorStop(0.5, "rgba(22,52,76,0.90)");
      bg2.addColorStop(1, "rgba(6,20,34,0.87)");
      polygon(ctx, bPts);
      ctx.fillStyle = bg2;
      ctx.fill();
      ctx.strokeStyle = "rgba(90,150,200,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Facet shading
      ctx.fillStyle = "rgba(55,95,135,0.28)";
      polygon(ctx, [[cx - bw * 0.70, waterY], [cx - bw * 0.90, waterY + (H - waterY) * 0.28], [cx - bw * 0.30, waterY + (H - waterY) * 0.22]]);
      ctx.fill();
      ctx.fillStyle = "rgba(35,70,105,0.22)";
      polygon(ctx, [[cx - bw * 1.05, waterY + (H - waterY) * 0.54], [cx - bw * 0.85, waterY + (H - waterY) * 0.76], [cx - bw * 0.20, waterY + (H - waterY) * 0.60]]);
      ctx.fill();
      ctx.restore();

      // ── ABOVE-WATER BERG ─────────────────────
      ctx.save();
      ctx.translate(cx, waterY);
      ctx.scale(1 + breath, 1 + breath);
      ctx.translate(-cx, -waterY);

      const aw = W * 0.13;
      const aPts: [number, number][] = [
        [cx - aw * 1.55, waterY],
        [cx - aw * 1.00, waterY * 0.58],
        [cx - aw * 0.55, waterY * 0.30],
        [cx, peakY],
        [cx + aw * 0.55, waterY * 0.30],
        [cx + aw * 1.00, waterY * 0.58],
        [cx + aw * 1.55, waterY],
      ];
      const ag = ctx.createLinearGradient(cx, waterY, cx, peakY);
      ag.addColorStop(0, "#8CB0C8");
      ag.addColorStop(0.5, "#C0D4E4");
      ag.addColorStop(1, "#E4EDF4");
      polygon(ctx, aPts);
      ctx.fillStyle = ag;
      ctx.fill();
      ctx.strokeStyle = "rgba(200,225,242,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Glare
      const gg = ctx.createLinearGradient(cx - aw * 0.3, peakY, cx + aw * 0.1, waterY * 0.5);
      gg.addColorStop(0, "rgba(255,255,255,0.60)");
      gg.addColorStop(1, "rgba(255,255,255,0)");
      polygon(ctx, [[cx, peakY], [cx - aw * 0.25, waterY * 0.28], [cx + aw * 0.08, waterY * 0.30]]);
      ctx.fillStyle = gg;
      ctx.fill();

      // Left facet
      ctx.fillStyle = "rgba(170,205,228,0.38)";
      polygon(ctx, [[cx - aw * 1.55, waterY], [cx - aw * 1.0, waterY * 0.58], [cx - aw * 0.5, waterY * 0.70]]);
      ctx.fill();
      ctx.restore();

      // ── WATER SURFACE ────────────────────────
      ctx.fillStyle = "#0C1E30";
      ctx.fillRect(0, waterY - 7, W, 14);

      // animated gold shimmer
      const sp = ((t * 0.25) % 1) * W * 2.2 - W * 0.6;
      const sg = ctx.createLinearGradient(sp, 0, sp + W * 0.75, 0);
      sg.addColorStop(0, "rgba(201,168,76,0)");
      sg.addColorStop(0.28, "rgba(243,226,176,0.92)");
      sg.addColorStop(0.50, "rgba(201,168,76,1)");
      sg.addColorStop(0.72, "rgba(243,226,176,0.92)");
      sg.addColorStop(1, "rgba(201,168,76,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, waterY - 1.5, W, 3);

      // ripples
      for (let i = 0; i < 3; i++) {
        const rx = cx + Math.sin(t * 0.45 + i * 2.2) * W * 0.08;
        const ra = 0.08 + 0.06 * Math.sin(t + i);
        ctx.strokeStyle = `rgba(140,195,225,${ra})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(rx, waterY + 5, W * 0.05 + i * W * 0.02, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── LABELS ───────────────────────────────
      const FONT_LABEL = `500 ${Math.max(9, Math.round(W * 0.013))}px 'Manrope',system-ui,sans-serif`;
      const FONT_ZONE  = `600 ${Math.max(8, Math.round(W * 0.010))}px 'Manrope',system-ui,sans-serif`;

      // DISC labels (above water, right side)
      const discAlpha = reduced ? 1 : Math.min(1, Math.max(0, easeIn((frame - 35) / 35)));
      if (discAlpha > 0) {
        const lx = cx + aw * 1.7;
        const disc = ["D · Daadkracht", "I · Invloed", "S · Stabiliteit", "C · Consciëntie"];
        disc.forEach((label, i) => {
          const ly = peakY + (waterY - peakY) * (0.16 + i * 0.21);
          const la = discAlpha * Math.min(1, Math.max(0, easeIn((frame - 35 - i * 10) / 20)));
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = `rgba(201,168,76,${la * 0.38})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(cx + aw * 1.0, ly);
          ctx.lineTo(lx - 6, ly);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(201,168,76,${la * 0.75})`;
          ctx.beginPath(); ctx.arc(lx - 6, ly, 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(201,168,76,${la * 0.88})`;
          ctx.font = FONT_LABEL; ctx.textAlign = "left";
          ctx.fillText(label, lx, ly + 4);
        });
        ctx.fillStyle = `rgba(201,168,76,${discAlpha * 0.50})`;
        ctx.font = FONT_ZONE; ctx.textAlign = "left";
        ctx.fillText("DISC · BOVEN WATER", cx - aw * 1.5, peakY - 6);
      }

      // Systemisch labels (below water, right side)
      const sysAlpha = reduced ? 1 : Math.min(1, Math.max(0, easeIn((frame - 75) / 35)));
      if (sysAlpha > 0) {
        const sx = cx + W * 0.13;
        const sys = ["Loyaliteitspatronen", "Familiedynamieken", "Onbewuste drivers", "Systemische balans"];
        const deepH = H - waterY;
        sys.forEach((label, i) => {
          const ly = waterY + deepH * (0.17 + i * 0.20);
          const la = sysAlpha * Math.min(1, Math.max(0, easeIn((frame - 75 - i * 12) / 22)));
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = `rgba(139,111,160,${la * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(cx + bw * 0.60, ly);
          ctx.lineTo(sx - 6, ly);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(139,111,160,${la * 0.65})`;
          ctx.beginPath(); ctx.arc(sx - 6, ly, 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(139,111,160,${la * 0.80})`;
          ctx.font = FONT_LABEL; ctx.textAlign = "left";
          ctx.fillText(label, sx, ly + 4);
        });
        ctx.fillStyle = `rgba(139,111,160,${sysAlpha * 0.48})`;
        ctx.font = FONT_ZONE; ctx.textAlign = "left";
        ctx.fillText("SYSTEMISCH · ONDER WATER", cx - bw * 0.65, waterY + deepH * 0.08);

        // 7× badge
        const badgeA = sysAlpha * Math.min(1, Math.max(0, (frame - 130) / 20));
        if (badgeA > 0) {
          const bx = cx - bw * 1.18, by = waterY + deepH * 0.50;
          ctx.fillStyle = `rgba(201,168,76,${badgeA * 0.80})`;
          ctx.font = `700 ${Math.max(10, Math.round(W * 0.014))}px 'Manrope',system-ui,sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("7×", bx, by + 4);
          ctx.fillStyle = `rgba(201,168,76,${badgeA * 0.40})`;
          ctx.font = `400 ${Math.max(8, Math.round(W * 0.009))}px 'Manrope',system-ui,sans-serif`;
          ctx.fillText("groter", bx, by + 16);
        }
      }

      // Waterline badge
      const wlA = reduced ? 1 : Math.min(1, Math.max(0, (frame - 25) / 18));
      if (wlA > 0) {
        ctx.fillStyle = `rgba(250,248,242,${wlA * 0.38})`;
        ctx.font = FONT_ZONE; ctx.textAlign = "center";
        ctx.fillText("WATERLINE", cx, waterY - 11);
      }
    }

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [visible]);

  return (
    <div
      ref={wrapRef}
      className="w-full rounded-sm overflow-hidden"
      style={{ background: "#05080F", minHeight: "240px" }}
      aria-label="VIVYNQ IJsberg 4D: DISC boven water, Systemisch onder water"
      role="img"
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
