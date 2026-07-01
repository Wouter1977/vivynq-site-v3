import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivynq.nl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/bedankt", "/afrekenen", "/rapport/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
