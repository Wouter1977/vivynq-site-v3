import Link from "next/link";

const DIENSTEN = [
  { label: "Zelfscan Q.Code — €127",       href: "/scan" },
  { label: "Q.Code Compleet — €197",       href: "/product/qcode-compleet" },
  { label: "TeamScan + Rapport",           href: "/zakelijk" },
  { label: "Eigenaarschapstraject",        href: "/gesprek" },
  { label: "1:1 Coachtraject",             href: "/gesprek" },
];

const MEER = [
  { label: "Methodiek",    href: "/#methode" },
  { label: "Voor wie",     href: "/#voor-wie" },
  { label: "Hoe het werkt",href: "/#hoe-het-werkt" },
  { label: "FAQ",          href: "/#faq" },
  { label: "Over Wouter",  href: "/over" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0F0318", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="max-sm:grid-cols-1 max-md:grid-cols-2"
        >
          {/* Merkblok */}
          <div>
            <p
              className="font-display shimmer-logo"
              style={{ fontSize: "1.1rem", letterSpacing: "0.08em", fontWeight: 500, marginBottom: "12px", display: "inline-block" }}
            >
              VIVYNQ.
            </p>
            <p
              className="font-ui"
              style={{ fontSize: "0.95rem", color: "rgba(232,222,244,0.88)", lineHeight: 1.68, maxWidth: "32ch", marginBottom: "20px" }}
            >
              DISC &amp; systemische coaching voor teams en professionals die verder willen dan de symptomen.
            </p>
            <span
              className="font-ui shimmer-slow"
              style={{ fontSize: "0.74rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}
            >
              Holistisch &amp; Systemisch Coach · DISC-Gecertificeerd
            </span>
          </div>

          {/* Diensten */}
          <div>
            <p
              className="font-ui shimmer-slow"
              style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}
            >
              Diensten
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {DIENSTEN.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-ui"
                    style={{ fontSize: "0.94rem", color: "rgba(242,237,227,0.76)", textDecoration: "none", transition: "color 0.2s ease" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Meer */}
          <div>
            <p
              className="font-ui shimmer-slow"
              style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}
            >
              Meer
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {MEER.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-ui"
                    style={{ fontSize: "0.94rem", color: "rgba(242,237,227,0.76)", textDecoration: "none", transition: "color 0.2s ease" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-ui shimmer-slow"
              style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}
            >
              Contact
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a
                  href="mailto:hello@vivynq.nl"
                  className="font-ui"
                  style={{ fontSize: "0.94rem", color: "rgba(242,237,227,0.76)", textDecoration: "none" }}
                >
                  hello@vivynq.nl
                </a>
              </li>
              <li>
                <Link
                  href="/#kennismaking"
                  className="font-ui"
                  style={{ fontSize: "0.94rem", color: "rgba(242,237,227,0.76)", textDecoration: "none" }}
                >
                  Plan een kennismaking
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Onderbalk */}
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", padding: "24px 0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p className="font-ui" style={{ fontSize: "0.78rem", color: "rgba(220,210,235,0.55)" }}>
            © {year} VIVYNQ · KvK 62397230 · BTW NL001939591B68 · Nederland
          </p>
          <nav className="flex gap-5" aria-label="Juridische links">
            <Link href="/privacybeleid" className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(220,210,235,0.62)", textDecoration: "none" }}>
              Privacybeleid
            </Link>
            <Link href="/voorwaarden" className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(220,210,235,0.62)", textDecoration: "none" }}>
              Algemene voorwaarden
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
