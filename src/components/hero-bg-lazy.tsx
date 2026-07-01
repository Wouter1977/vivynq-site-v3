"use client";

import dynamic from "next/dynamic";

/**
 * Client-side dynamic loader voor HeroBg.
 * Decoratieve laag (blobs/particles/grain + Q.Code-anker) — niet kritiek voor
 * LCP of SEO. Door ssr:false uit het kritisch render-pad te houden valt de
 * paint van het hero-tekstblok eerder.
 */
export const HeroBgLazy = dynamic(
  () => import("./hero-bg").then((m) => ({ default: m.HeroBg })),
  { ssr: false }
);
