import type { MetadataRoute } from "next";
import { ONLINE_PROGRAMMAS, B2C_INSTAP } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivynq.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/programmas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/scan`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/prijzen`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/diensten`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/gratis`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/gesprek`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/zakelijk`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/hoe-het-werkt`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/over`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacybeleid`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/voorwaarden`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = [...ONLINE_PROGRAMMAS, ...B2C_INSTAP].map((p) => ({
    url: `${BASE}/programma/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.92 : 0.85,
  }));

  return [...staticPages, ...productPages];
}
