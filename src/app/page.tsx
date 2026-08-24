import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";

function IcebergSvg() {
  return (
    <svg viewBox="0 0 400 520" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Ijsberg: DISC boven de waterlijn, Systemisch werk onder de waterlijn"
      style={{ width: "100%", maxWidth: "420px", margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F0318"/><stop offset="100%" stopColor="#2E0832"/>
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A0525"/><stop offset="100%" stopColor="#0D011A"/>
        </linearGradient>
        <linearGradient id="iceTop" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#F3E2B0"/><stop offset="45%" stopColor="#CCA840"/><stop offset="100%" stopColor="#8B6F2E" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="iceBot" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#8B6FA0" stopOpacity="0.65"/><stop offset="55%" stopColor="#4A2860" stopOpacity="0.80"/><stop offset="100%" stopColor="#1A0525" stopOpacity="0.92"/>
        </linearGradient>
        <radialGradient id="depthGlow" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#8B6FA0" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#8B6FA0" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>

      {/* Achtergrond */}
      <rect width="400" height="230" fill="url(#skyGrad)" rx="12"/>
      <rect y="218" width="400" height="302" fill="url(#waterGrad)"/>

      {/* Diepteglans onder de ijsberg — suggereert hoeveel groter het is dan wat je ziet */}
      <ellipse cx="160" cy="345" rx="150" ry="125" fill="url(#depthGlow)" filter="url(#softBlur)"/>

      {/* Onderwater massa — breder en organischer dan de punt erboven */}
      <path d="M120 228 L85 250 L58 292 L52 340 L68 385 L102 420 L140 445 L175 455 L208 446 L238 422 L255 388 L262 340 L254 292 L228 250 L200 228 Z" fill="url(#iceBot)"/>
      <path d="M120 228 L90 265 L65 310 L58 355 L75 395" stroke="rgba(200,180,220,0.22)" strokeWidth="0.8" fill="none"/>
      <path d="M200 228 L222 270 L238 315 L232 360 L212 398" stroke="rgba(139,111,160,0.22)" strokeWidth="0.8" fill="none"/>
      <path d="M160 455 L160 300" stroke="rgba(139,111,160,0.15)" strokeWidth="0.8" fill="none"/>

      {/* Boven water — ruwe, asymmetrische ijspiek met facetten */}
      <path d="M120 228 L128 168 L142 184 L154 118 L165 66 L178 132 L190 108 L198 172 L200 228 Z" fill="url(#iceTop)"/>
      <path d="M165 66 L128 168 L120 228 L142 184 Z" fill="#FAF3DC" opacity="0.22"/>
      <path d="M165 66 L198 172 L190 108 Z" fill="#3D2A0A" opacity="0.16"/>
      <path d="M165 66 L142 184" stroke="rgba(255,255,255,0.30)" strokeWidth="0.8" fill="none"/>
      <path d="M165 66 L190 108 L198 172" stroke="rgba(90,65,10,0.35)" strokeWidth="0.8" fill="none"/>

      {/* Waterlijn */}
      <line x1="0" y1="228" x2="400" y2="228" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7" filter="url(#glow)"/>
      <path d="M0 228 Q50 220 100 228 Q150 236 200 228 Q250 220 300 228 Q350 236 400 228" stroke="rgba(201,168,76,0.50)" strokeWidth="1.2" fill="none"/>

      {/* Spiegeling in het water */}
      <path d="M120 233 L128 245 L142 239 L154 253 L165 261 L178 251 L190 255 L198 241 L200 233" stroke="rgba(201,168,76,0.35)" strokeWidth="2" fill="none" filter="url(#softBlur)"/>

      {/* Zwevende ijsdeeltjes */}
      <circle cx="62" cy="118" r="2" fill="#F3E2B0" opacity="0.55"/>
      <circle cx="256" cy="92" r="1.6" fill="#F3E2B0" opacity="0.40"/>
      <circle cx="44" cy="170" r="1.3" fill="#F3E2B0" opacity="0.35"/>

      {/* Labels */}
      <text x="280" y="165" fontFamily="Manrope,sans-serif" fontSize="9" fontWeight="700" letterSpacing="3" fill="rgba(201,168,76,0.85)" textAnchor="start">DISC</text>
      <line x1="197" y1="162" x2="275" y2="162" stroke="rgba(201,168,76,0.40)" strokeWidth="0.8"/>
      <text x="280" y="176" fontFamily="Manrope,sans-serif" fontSize="7.5" fill="rgba(242,237,227,0.55)" textAnchor="start">boven de waterlijn</text>
      <text x="290" y="355" fontFamily="Manrope,sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="rgba(139,111,160,0.85)" textAnchor="start">SYSTEMISCH</text>
      <line x1="260" y1="352" x2="286" y2="352" stroke="rgba(139,111,160,0.35)" strokeWidth="0.8"/>
      <text x="290" y="367" fontFamily="Manrope,sans-serif" fontSize="7.5" fill="rgba(200,180,220,0.45)" textAnchor="start">onder de waterlijn</text>
      <rect x="90" y="221" width="140" height="14" rx="3" fill="rgba(15,3,24,0.80)"/>
      <text x="160" y="231" fontFamily="Manrope,sans-serif" fontSize="6" fontWeight="700" letterSpacing="3" fill="rgba(201,168,76,0.70)" textAnchor="middle">WATERLIJN</text>
    </svg>
  );
}

function ProgrammaRij({ naam, prijs, omschrijving, href }: { naam: string; prijs: string; omschrijving: string; href: string }) {
  return (
    <Link href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 0", borderBottom: "1px solid rgba(201,168,76,0.10)", textDecoration: "none" }}>
      <div>
        <p className="font-display" style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(242,237,227,0.95)", marginBottom: "2px" }}>{naam}</p>
        <p className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(220,200,236,0.65)", lineHeight: 1.4 }}>{omschrijving}</p>
      </div>
      <span className="font-display" style={{ flexShrink: 0, fontSize: "1rem", fontWeight: 500, color: "#C9A84C" }}>{prijs}</span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section aria-labelledby="hero-title" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", background: "#0F0318", overflow: "hidden", paddingTop: "68px" }} className="vq-grain">
        <div aria-hidden="true" style={{ position: "absolute", width: "520px", height: "520px", top: "-120px", right: "-100px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(46,8,50,0.65) 0%, transparent 70%)", filter: "blur(80px)", animation: "orb-a 18s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: "380px", height: "380px", bottom: "10%", left: "-80px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,111,160,0.18) 0%, transparent 70%)", filter: "blur(80px)", animation: "orb-b 22s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: "260px", height: "260px", top: "40%", right: "20%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)", filter: "blur(80px)", animation: "orb-c 28s ease-in-out infinite" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 96px", position: "relative", zIndex: 2, width: "100%" }}>
          <p className="font-ui" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ width: "32px", height: "1px", background: "rgba(201,168,76,0.55)" }} aria-hidden="true" />
            Holistisch &amp; Systemisch Coach &nbsp;·&nbsp; DISC-Gecertificeerd
          </p>
          <h1 id="hero-title" className="font-display" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 500, color: "rgba(242,237,227,0.95)", maxWidth: "18ch", marginBottom: "32px" }}>
            Gedrag zie je. Wat eronder zit, <em className="shimmer">bepaalt alles.</em>
          </h1>
          <p className="font-ui" style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.35rem)", lineHeight: 1.72, color: "#FAF8F2", maxWidth: "52ch", marginBottom: "48px", fontWeight: 400 }}>
            Vivynq maakt zichtbaar waar jouw gedrag vandaan komt — zodat je eindelijk kunt kiezen wie je wilt zijn.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link href="/scan" className="btn-gold">
              Begin met jouw Q.Code
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/#programmas" className="btn-ghost-dk">Bekijk de programma&apos;s</Link>
          </div>
          <p className="font-ui" style={{ marginTop: "16px", fontSize: "0.82rem", color: "rgba(201,168,76,0.55)", letterSpacing: "0.03em" }}>
            In 15 minuten weet je wat anderen pas na jaren doorhebben.
          </p>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.55))", animation: "scroll-line 2s ease-in-out infinite" }} />
          <span className="font-ui" style={{ fontSize: "0.52rem", letterSpacing: "0.22em", color: "rgba(201,168,76,0.45)", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── STRIP ─────────────────────────────────────── */}
      <div role="complementary" aria-label="Certificeringen" style={{ background: "#2E0832", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "16px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 32px", justifyContent: "center" }}>
          {["Holistisch Coach", "Systemisch Coach", "DISC-Gecertificeerd", "MKB · Zorg · Onderwijs"].map((item, i) => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {i > 0 && <span aria-hidden="true" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(201,168,76,0.30)", flexShrink: 0 }} />}
              <span className="strip-item">{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── KIES JE PAD ───────────────────────────────── */}
      <section id="programmas" aria-labelledby="pad-title" style={{ background: "#FAF8F2", padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <p className="font-ui" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(26,5,37,0.62)", marginBottom: "16px" }}>Kies je pad</p>
            <h2 id="pad-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.018em", fontWeight: 500, color: "#1A0525", marginBottom: "16px" }}>Persoonlijk of team?</h2>
            <p className="font-ui" style={{ fontSize: "clamp(1rem, 1.1vw, 1.20rem)", lineHeight: 1.72, color: "rgba(26,5,37,0.80)", maxWidth: "60ch" }}>
              Of je als individu patronen wil doorbreken of als team duurzame samenwerking wil verankeren — elk traject start met dezelfde twee lagen: DISC + systemisch werk.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "48px", alignItems: "stretch" }}>
            <Reveal delay={80} style={{ height: "100%" }}>
              <div style={{ background: "#0F0318", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "16px", padding: "36px 32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <p className="font-ui" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}><span className="shimmer">Persoonlijke ontwikkeling</span></p>
                <h3 className="font-display" style={{ fontSize: "1.45rem", fontWeight: 500, color: "rgba(242,237,227,0.95)", lineHeight: 1.2, marginBottom: "8px" }}>Voor jou als professional</h3>
                <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(220,200,236,0.75)", lineHeight: 1.65, marginBottom: "24px" }}>Voor professionals 30–55 die vastlopen in oververantwoordelijkheid, pleasen of grensproblemen — en willen begrijpen waarom ze steeds hetzelfde doen.</p>
                <div style={{ flex: 1 }}>
                  <ProgrammaRij naam="Zelfscan Q.Code" prijs="€127" omschrijving="DISC-profiel + AI-analyse, 12 pagina's rapport binnen 48 uur" href="/scan" />
                  <ProgrammaRij naam="Q.Code Compleet" prijs="€197" omschrijving="Zelfscan + uitgebreide systemische analyse — meer dan 20 pagina's" href="/product/qcode-compleet" />
                  <ProgrammaRij naam="Van dragen naar kiezen" prijs="€497" omschrijving="8 weken — van automatische hulpverlener naar bewuste kiezer" href="/programma/van-dragen-naar-kiezen" />
                  <ProgrammaRij naam="1:1 Coachtraject" prijs="€2.497" omschrijving="6 sessies persoonlijk traject op basis van jouw Q.Code profiel" href="/gesprek" />
                </div>
                <div style={{ marginTop: "24px" }}>
                  <Link href="/scan" className="btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}>
                    Begin met de Zelfscan
                    <svg className="btn-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160} style={{ height: "100%" }}>
              <div style={{ background: "#0F0318", border: "1px solid rgba(201,168,76,0.30)", borderRadius: "16px", padding: "36px 32px", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ position: "absolute", top: "-11px", left: "24px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: "#C9A84C", color: "#0F0318", padding: "3px 10px", borderRadius: "4px" }}>Meest gekozen</span>
                <p className="font-ui" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}><span className="shimmer">Teamontwikkeling</span></p>
                <h3 className="font-display" style={{ fontSize: "1.45rem", fontWeight: 500, color: "rgba(242,237,227,0.95)", lineHeight: 1.2, marginBottom: "8px" }}>Voor jullie als team</h3>
                <p className="font-ui" style={{ fontSize: "0.90rem", color: "rgba(220,200,236,0.75)", lineHeight: 1.65, marginBottom: "24px" }}>Voor teams in zorg, onderwijs en gemeente die eigenaarschap en samenwerking niet langer willen bespreken maar willen verankeren.</p>
                <div style={{ flex: 1 }}>
                  <ProgrammaRij naam="TeamScan + Rapport" prijs="Op aanvraag" omschrijving="DISC per teamlid + systemische rapportage + debrief" href="/zakelijk" />
                  <ProgrammaRij naam="TeamScan + Interventiedag" prijs="Op aanvraag" omschrijving="Scan + rapport + dag van 6 uur herkenning en dialoog" href="/zakelijk" />
                  <ProgrammaRij naam="Eigenaarschapstraject" prijs="Op aanvraag" omschrijving="6 sessies over 3 maanden — eigenaarschap structureel verankerd" href="/gesprek" />
                </div>
                <div style={{ marginTop: "24px" }}>
                  <Link href="/gesprek" className="btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}>
                    Plan een gesprek over jouw team
                    <svg className="btn-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── METHODE ───────────────────────────────────── */}
      <section id="methode" aria-labelledby="methode-title" style={{ background: "#FAF8F2", padding: "96px 0", borderTop: "1px solid rgba(26,5,37,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "48px", alignItems: "center" }}>
            <Reveal><IcebergSvg /></Reveal>
            <div>
              <Reveal><p className="font-ui" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(26,5,37,0.62)", marginBottom: "16px" }}>De methodiek</p></Reveal>
              <Reveal delay={80}><h2 id="methode-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.018em", fontWeight: 500, color: "#1A0525", marginBottom: "24px" }}>De IJsberg-methode:<br />DISC + systemisch werk</h2></Reveal>
              <Reveal delay={160}>
                <p className="font-ui" style={{ fontSize: "clamp(1rem, 1.1vw, 1.20rem)", lineHeight: 1.72, color: "rgba(26,5,37,0.80)", marginBottom: "16px" }}>Boven water zie je jouw gedrag: hoe jij communiceert, reageert en beslissingen neemt. Dat is jouw DISC-profiel — jouw Q.Code rapport. Onder water zitten de patronen die dat gedrag aansturen: loyaliteiten, familiesystemen, rollen die je al lang geleden hebt aangenomen.</p>
                <p className="font-ui" style={{ fontSize: "0.92rem", lineHeight: 1.72, color: "rgba(26,5,37,0.65)" }}>Vivynq werkt op beide lagen tegelijk. Dat is wat het onderscheid maakt.</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px", marginTop: "40px" }}>
                  <div style={{ padding: "24px", borderRadius: "12px", background: "#F5F0E6", border: "1px solid rgba(26,5,37,0.10)" }}>
                    <p className="font-ui shimmer" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>▲ Boven water</p>
                    <h4 className="font-display" style={{ fontSize: "1rem", fontWeight: 500, color: "#1A0525", marginBottom: "8px" }}>DISC</h4>
                    <p className="font-ui" style={{ fontSize: "0.94rem", lineHeight: 1.65, color: "rgba(26,5,37,0.65)" }}>Gedrag, communicatiestijl, sterktes, valkuilen: wat zichtbaar is in samenwerking en leiderschap.</p>
                  </div>
                  <div style={{ padding: "24px", borderRadius: "12px", background: "rgba(46,8,50,0.07)", border: "1px solid rgba(139,111,160,0.20)" }}>
                    <p className="font-ui" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8B6FA0", marginBottom: "8px" }}>▼ Onder water</p>
                    <h4 className="font-display" style={{ fontSize: "1rem", fontWeight: 500, color: "#1A0525", marginBottom: "8px" }}>Systemisch werk</h4>
                    <p className="font-ui" style={{ fontSize: "0.94rem", lineHeight: 1.65, color: "rgba(26,5,37,0.65)" }}>Patronen, loyaliteiten, dynamieken en onbewuste drijfveren: wat het zichtbare gedrag stuurt.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOOR WIE ──────────────────────────────────── */}
      <section id="voor-wie" aria-labelledby="voor-wie-title" style={{ background: "#0F0318", padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <p className="font-ui shimmer" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", marginBottom: "16px" }}>Voor wie</p>
              <h2 id="voor-wie-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.018em", fontWeight: 500, color: "rgba(242,237,227,0.95)", maxWidth: "22ch", margin: "0 auto" }}>
                Voor teams die verder willen dan de symptomen
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginTop: "48px" }}>
            {[
              { titel: "MKB & bedrijven", tekst: "Teams van 5–100 medewerkers die willen groeien zonder de onderlinge dynamiek te verliezen.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", delay: 0 },
              { titel: "Zorg & onderwijs", tekst: "Multidisciplinaire teams in ziekenhuizen, scholen en GGZ. Thema's: grenzen en leiderschap onder druk.", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10", delay: 80 },
              { titel: "Gemeente & corporaties", tekst: "Afdelingshoofden en HR-managers in semi-overheid. Structurele aanpak van patronen die samenwerking belemmeren.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", delay: 160 },
              { titel: "Individuele professionals", tekst: "Directeuren en ondernemers (30–55) die vastlopen door oververantwoordelijkheid of systemische patronen.", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8", delay: 240 },
            ].map((card) => (
              <Reveal key={card.titel} delay={card.delay}>
                <article style={{ padding: "28px 24px", borderRadius: "12px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)" }} className="vq-lift">
                  <div className="icon-glow" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={card.icon}/></svg>
                  </div>
                  <h4 className="font-display" style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(242,237,227,0.95)", marginBottom: "8px" }}>{card.titel}</h4>
                  <p className="font-ui" style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(232,222,244,0.92)" }}>{card.tekst}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ─────────────────────────────── */}
      <section id="hoe-het-werkt" aria-labelledby="proces-title" style={{ background: "#FAF8F2", padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <Reveal>
                <p className="font-ui" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(26,5,37,0.62)", marginBottom: "16px" }}>Het proces</p>
                <h2 id="proces-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.018em", fontWeight: 500, color: "#1A0525", marginBottom: "24px" }}>Van eerste gesprek<br />tot zichtbaar resultaat</h2>
                <p className="font-ui" style={{ fontSize: "clamp(1rem, 1.1vw, 1.20rem)", lineHeight: 1.72, color: "rgba(26,5,37,0.80)", marginBottom: "40px" }}>Geen langdurig intake-traject, geen massa-coaching. U bent snel van start en weet van tevoren wat elk moment oplevert.</p>
              </Reveal>
              {[
                { nr: "01", titel: "Vrijblijvend kennismakingsgesprek", tekst: "We bespreken waar u nu staat, wat de gewenste situatie is en of Vivynq daarbij past. Geen verkoopgesprek, een eerlijk oriëntatiegesprek." },
                { nr: "02", titel: "Scan & analyse", tekst: "Elk teamlid (of u persoonlijk) ontvangt een uitnodigingslink. De scan duurt 30 minuten en is volledig digitaal via de Vivynq-app." },
                { nr: "03", titel: "Rapport & inzichten", tekst: "U ontvangt een uitgebreid rapport met DISC-profielen, systemische analyse en concrete aanbevelingen. Direct presenteerbaar aan het MT." },
                { nr: "04", titel: "Interventie & traject", tekst: "Op basis van het rapport bepalen we samen de vervolgstap: interventiedag, coachtraject of verdiepend gesprek met het management." },
                { nr: "05", titel: "Borging & nazorg", tekst: "De inzichten worden verankerd in het dagelijkse werk. Begeleiding tot u ziet dat het beklijft." },
              ].map((stap, i) => (
                <Reveal key={stap.nr} delay={i * 60}>
                  <div style={{ display: "grid", gridTemplateColumns: "48px 1px 1fr", gap: "0 24px", paddingBottom: i < 4 ? "40px" : 0 }}>
                    <span className="font-display" style={{ fontSize: "2.13rem", fontWeight: 300, color: "rgba(201,168,76,0.55)", lineHeight: 1, paddingTop: "2px" }}>{stap.nr}</span>
                    <div style={{ width: "1px", background: i < 4 ? "rgba(26,5,37,0.10)" : "transparent", margin: "8px 0" }} aria-hidden="true" />
                    <div>
                      <h4 className="font-display" style={{ fontSize: "1.20rem", fontWeight: 500, marginBottom: "8px", color: "#1A0525" }}>{stap.titel}</h4>
                      <p className="font-ui" style={{ fontSize: "0.92rem", lineHeight: 1.70, color: "rgba(26,5,37,0.62)" }}>{stap.tekst}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div style={{ background: "#2E0832", borderRadius: "16px", padding: "48px 40px", border: "1px solid rgba(201,168,76,0.14)", marginBottom: "24px" }}>
                <p className="font-display" style={{ fontStyle: "italic", fontSize: "1.60rem", lineHeight: 1.45, color: "rgba(242,237,227,0.95)", marginBottom: "24px" }}>
                  &ldquo;We werken pas aan wat je wilt bereiken als we weten wat je ervan weerhoudt.&rdquo;
                </p>
                <p className="font-ui" style={{ fontSize: "0.935rem", color: "rgba(201,168,76,0.55)" }}>Wouter Huijbregts, holistisch &amp; systemisch coach · DISC-gecertificeerd</p>
              </div>
              <div style={{ padding: "28px 32px", borderRadius: "12px", background: "#F5F0E6", border: "1px solid rgba(26,5,37,0.10)" }}>
                <p className="font-ui" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,5,37,0.62)", marginBottom: "16px" }}>De 5 basisvragen</p>
                <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {["Waar komt dit vandaan?", "Wie horen erbij?", "Wat zijn hun taken en verantwoordelijkheden?", "Is er een balans tussen geven en nemen?", "Waar neigt het naartoe als we niets zouden doen?"].map((v, i) => (
                    <li key={i} style={{ display: "flex", gap: "12px", fontSize: "0.88rem", color: "rgba(26,5,37,0.70)", lineHeight: 1.55 }}>
                      <span className="font-display shimmer" style={{ flexShrink: 0, fontSize: "0.75rem", fontWeight: 600, marginTop: "1px" }}>0{i + 1}</span>
                      {v}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RESULTATEN ────────────────────────────────── */}
      <section aria-labelledby="resultaten-title" style={{ background: "#0F0318", padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <p className="font-ui shimmer" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", marginBottom: "16px" }}>Wat het oplevert</p>
              <h2 id="resultaten-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.018em", fontWeight: 500, color: "rgba(242,237,227,0.95)" }}>Coaching die beklijft</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(201,168,76,0.15)", borderRadius: "16px", overflow: "hidden", marginTop: "56px" }}>
              {[{ val: "2×", label: "Methodieken gecombineerd\nDISC + systemisch werk" }, { val: "30 min", label: "Doorlooptijd scan\nvolledig digitaal, op elk moment" }, { val: "100%", label: "Flexibel in te zetten\nonline of op locatie in Nederland" }].map((s) => (
                <div key={s.val} style={{ background: "rgba(201,168,76,0.04)", padding: "40px 32px", textAlign: "center" }}>
                  <div className="font-display shimmer tabular" style={{ fontSize: "3.79rem", fontWeight: 500, lineHeight: 1, marginBottom: "8px" }}>{s.val}</div>
                  <div className="font-ui" style={{ fontSize: "0.94rem", color: "rgba(232,222,244,0.92)", lineHeight: 1.58, whiteSpace: "pre-line" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "40px" }}>
            {[
              { label: "Helderheid", titel: "Weet waar je staat", tekst: "Je patroon, communicatiestijl en blinde vlekken in beeld: geen aannames, maar gefundeerde analyse.", delay: 80 },
              { label: "Richting", titel: "Bepaal je koers", tekst: "Een concreet plan dat past bij wie jij bent, niet bij een algemene formule of een training van 2 dagen.", delay: 160 },
              { label: "Resultaat", titel: "Zet het om in actie", tekst: "Coaching die doorpakt totdat het zichtbaar wordt, in samenwerking, leiderschap en dagelijks gedrag.", delay: 240 },
            ].map((c) => (
              <Reveal key={c.titel} delay={c.delay}>
                <div style={{ padding: "28px", borderRadius: "12px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <p className="font-ui" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "10px" }}>{c.label}</p>
                  <h4 className="font-display" style={{ fontSize: "1.05rem", color: "rgba(242,237,227,0.95)", marginBottom: "8px", fontWeight: 500 }}>{c.titel}</h4>
                  <p className="font-ui" style={{ fontSize: "0.88rem", color: "rgba(232,222,244,0.92)", lineHeight: 1.65 }}>{c.tekst}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section id="faq" aria-labelledby="faq-title" style={{ background: "#F5F0E6", padding: "96px 0" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <p className="font-ui" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(26,5,37,0.62)", marginBottom: "16px" }}>Veelgestelde vragen</p>
              <h2 id="faq-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.018em", fontWeight: 500, color: "#1A0525" }}>Wat u wilt weten</h2>
            </div>
          </Reveal>
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA BLOCK ─────────────────────────────────── */}
      <section id="kennismaking" aria-labelledby="cta-title" style={{ position: "relative", background: "#0F0318", padding: "112px 0", overflow: "hidden", textAlign: "center" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <Reveal>
            <p className="font-ui shimmer" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", marginBottom: "20px" }}>Plan een gesprek</p>
            <h2 id="cta-title" className="font-display" style={{ fontSize: "clamp(2.13rem, 3.5vw, 2.84rem)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "rgba(242,237,227,0.95)", maxWidth: "22ch", margin: "0 auto 20px" }}>
              Klaar om verder te kijken<br />dan het gedrag?
            </h2>
            <p className="font-ui" style={{ fontSize: "1rem", color: "rgba(232,222,244,0.92)", maxWidth: "46ch", margin: "0 auto 40px", lineHeight: 1.70 }}>
              Plan een vrijblijvend kennismakingsgesprek van 30 minuten. We bespreken waar uw team of u nu staat, en of Vivynq de juiste aanpak is.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
              <Link href="/gesprek" className="btn-gold">
                Plan een kennismaking
                <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/#programmas" className="btn-ghost-dk">Bekijk de programma&apos;s</Link>
            </div>
            <p className="font-ui" style={{ marginTop: "20px", fontSize: "0.80rem", color: "rgba(200,180,220,0.40)", letterSpacing: "0.04em" }}>Vrijblijvend · Geen verplichtingen · Reactie binnen 1 werkdag</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
