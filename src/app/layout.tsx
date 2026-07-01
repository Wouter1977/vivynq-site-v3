import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/cursor";
import { IntroScreen } from "@/components/intro";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3300";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Systemisch coaching & DISC-profiel online | VIVYNQ",
    template: "%s · VIVYNQ",
  },
  description:
    "Systemisch coaching en DISC-profiel online in Nederland. VIVYNQ begeleidt professionals naar eigenaarschap, zelfinzicht en gedragsverandering. Gefundeerd, persoonlijk, resultaat.",
  applicationName: "VIVYNQ",
  keywords: [
    "systemisch coaching",
    "DISC profiel",
    "DISC test",
    "online coaching Nederland",
    "zelfinzicht",
    "coaching voor professionals",
    "gedragsverandering",
    "burnout coaching",
    "familiepatronen",
    "persoonlijke ontwikkeling",
  ],
  openGraph: {
    type: "website",
    siteName: "VIVYNQ",
    title: "VIVYNQ — Systemisch coaching en DISC-profiel online",
    description:
      "Systemisch coaching voor professionals die willen stoppen met dragen, begrijpen waar hun patronen vandaan komen, en vanuit echte keuze leven.",
    locale: "nl_NL",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "VIVYNQ — Systemisch coaching" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Systemisch coaching & DISC-profiel | VIVYNQ",
    description:
      "Systemisch coaching voor professionals die willen stoppen met dragen en beginnen vanuit echte keuze.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VIVYNQ",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.svg`,
              description:
                "Systemisch coaching en DISC-profiel online. VIVYNQ begeleidt professionals naar eigenaarschap, zelfinzicht en gedragsverandering.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NL",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "wouter@vivynq.nl",
                contactType: "customer service",
                availableLanguage: "Dutch",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="h-full">
        {/* Intro-loading screen */}
        <IntroScreen />

        {/* Custom goud cursor */}
        <CustomCursor />

        <a href="#main" className="vq-skip font-ui uppercase">
          Ga naar inhoud
        </a>

        {/* Lenis smooth scroll wrapper */}
        <SmoothScroll>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>

        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
