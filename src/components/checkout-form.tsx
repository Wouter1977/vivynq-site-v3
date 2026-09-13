"use client";

import { useActionState, useState } from "react";
import { startProduct, type ActionState } from "@/app/actions";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(15,3,24,0.6)",
  border: "1px solid rgba(201,168,76,0.25)",
  color: "#fff",
  padding: "11px 14px",
  fontSize: "0.9rem",
};

function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="animate-spin"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(200,168,216,0.8)", letterSpacing: "0.04em" }}>
        {label} {required && <span style={{ color: "#C9A84C" }}>*</span>}
      </span>
      <input className="font-ui" name={name} type={type} required={required} placeholder={placeholder} style={inputStyle} />
    </label>
  );
}

const TEAM_SIZES = [
  { value: "2-5", label: "2–5 personen" },
  { value: "6-10", label: "6–10 personen" },
  { value: "11-20", label: "11–20 personen" },
  { value: "20+", label: "20+ personen" },
];

export function CheckoutForm({
  slug,
  ctaLabel,
  priceLabel,
  business,
  showMessage,
  isScan,
}: {
  slug: string;
  ctaLabel: string;
  priceLabel: string;
  business?: boolean;
  showMessage?: boolean;
  isScan?: boolean;
}) {
  const action = startProduct.bind(null, slug);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, {});
  const [isTeam, setIsTeam] = useState(false);
  const [teamGrootte, setTeamGrootte] = useState("2-5");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Voornaam" name="first_name" required placeholder="Voornaam" />
        <Field label="Achternaam" name="last_name" placeholder="Achternaam" />
      </div>
      <Field label="E-mailadres" name="email" type="email" required placeholder="jij@voorbeeld.nl" />

      {/* Relatiecode */}
      <label className="flex flex-col gap-1.5">
        <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(200,168,216,0.8)", letterSpacing: "0.04em" }}>
          Relatiecode <span style={{ color: "rgba(200,168,216,0.40)" }}>(optioneel)</span>
        </span>
        <input
          className="font-ui"
          name="relatie_code"
          type="text"
          placeholder="Bijv. WOUTER10"
          style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: "0.06em" }}
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      {/* Team-toggle voor scans */}
      {isScan && (
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.15)",
            paddingTop: "1rem",
          }}
        >
          <label
            className="flex items-center gap-3 cursor-pointer"
            style={{ marginBottom: isTeam ? "1.25rem" : 0 }}
          >
            <input
              type="checkbox"
              name="is_team"
              value="1"
              checked={isTeam}
              onChange={(e) => setIsTeam(e.target.checked)}
              style={{ width: "16px", height: "16px", flexShrink: 0, accentColor: "#C9A84C" }}
            />
            <span className="font-ui" style={{ fontSize: "0.82rem", color: "rgba(250,248,242,0.78)", lineHeight: 1.5 }}>
              Ik bestel voor een <strong style={{ color: "rgba(250,248,242,0.95)" }}>team of organisatie</strong> (meer dan 1 persoon)
            </span>
          </label>

          {isTeam && (
            <div className="flex flex-col gap-4">
              {/* Teamgrootte */}
              <div>
                <p className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(200,168,216,0.8)", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
                  Aantal deelnemers <span style={{ color: "#C9A84C" }}>*</span>
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {TEAM_SIZES.map((opt) => (
                    <label key={opt.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="team_grootte"
                        value={opt.value}
                        checked={teamGrootte === opt.value}
                        onChange={() => setTeamGrootte(opt.value)}
                        style={{ position: "absolute", opacity: 0, width: 0 }}
                        required={isTeam}
                      />
                      <span
                        className="font-ui"
                        style={{
                          display: "inline-block",
                          padding: "0.45rem 1rem",
                          fontSize: "0.80rem",
                          borderRadius: "0.35rem",
                          border: teamGrootte === opt.value ? "1px solid #C9A84C" : "1px solid rgba(250,248,242,0.15)",
                          background: teamGrootte === opt.value ? "rgba(201,168,76,0.12)" : "transparent",
                          color: teamGrootte === opt.value ? "#C9A84C" : "rgba(250,248,242,0.55)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Organisatie */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Organisatie / team" name="organization" required={isTeam} placeholder="Bijv. Gemeente Utrecht" />
                <Field label="Telefoon" name="phone" placeholder="06 …" />
              </div>

              {/* Informatieformulier */}
              <div
                style={{
                  background: "rgba(201,168,76,0.05)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: "0.5rem",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p className="font-ui" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)" }}>
                  Informatieformulier team
                </p>

                <label className="flex flex-col gap-1.5">
                  <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(200,168,216,0.8)", letterSpacing: "0.04em" }}>
                    Wat wil je laten analyseren? <span style={{ color: "#C9A84C" }}>*</span>
                  </span>
                  <textarea
                    className="font-ui"
                    name="analyse_omschrijving"
                    rows={3}
                    required={isTeam}
                    placeholder="Bijv. teamdynamiek bij fusie, leiderschapsontwikkeling MT, communicatiestijlen in zorgteam…"
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(200,168,216,0.8)", letterSpacing: "0.04em" }}>
                    Gewenst resultaat / context
                  </span>
                  <textarea
                    className="font-ui"
                    name="analyse_doel"
                    rows={2}
                    placeholder="Bijv. aanleiding, wat er speelt, wat jullie hopen te bereiken…"
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  />
                </label>

                <p className="font-ui" style={{ fontSize: "0.76rem", color: "rgba(250,248,242,0.45)", lineHeight: 1.65 }}>
                  Na jouw bestelling neem ik persoonlijk contact op om de teamscans uit te sturen en een multidisciplinaire aanpak voor te stellen. Teamprijs voor 6+ scans op aanvraag.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {business && !isScan && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Organisatie" name="organization" placeholder="Bedrijf / team" />
          <Field label="Telefoon" name="phone" placeholder="06 …" />
        </div>
      )}
      {showMessage && (
        <label className="flex flex-col gap-1.5">
          <span className="font-ui" style={{ fontSize: "0.74rem", color: "rgba(200,168,216,0.8)", letterSpacing: "0.04em" }}>
            Beschrijf kort je vraag
          </span>
          <textarea className="font-ui" name="message" rows={4} placeholder="Waar gaat het over?" style={inputStyle} />
        </label>
      )}

      {state.error && (
        <div style={{ background: "rgba(232,145,122,0.10)", border: "1px solid rgba(232,145,122,0.35)", padding: "10px 14px" }}>
          <p className="font-ui" style={{ fontSize: "0.8rem", color: "#E8917A", lineHeight: 1.55 }}>{state.error}</p>
        </div>
      )}

      {/* Herroepingsrecht waiver — verplicht bij digitale goederen met directe levering (Art. 6:230p sub m BW) */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="herroepingsrecht_waiver"
          required
          style={{ width: "16px", height: "16px", flexShrink: 0, marginTop: "3px", accentColor: "#C9A84C" }}
        />
        <span className="font-ui" style={{ fontSize: "0.70rem", color: "rgba(250,248,242,0.78)", lineHeight: 1.6 }}>
          Ik verzoek uitdrukkelijk om directe levering en begrijp dat ik daarmee afstand doe van mijn
          herroepingsrecht (<abbr title="Artikel 6:230p sub m Burgerlijk Wetboek">Art. 6:230p sub m BW</abbr>).{" "}
          <span aria-hidden="true" style={{ color: "#C9A84C" }}>*</span>
        </span>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="font-ui uppercase transition-all hover:brightness-110 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.12em",
          fontWeight: 700,
          color: "#0F0318",
          background: "#C9A84C",
          padding: "14px 24px",
          marginTop: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {isPending ? (
          <>
            <SpinnerIcon />
            <span>Bezig…</span>
          </>
        ) : (
          `${ctaLabel} · ${priceLabel}`
        )}
      </button>

      <p className="font-ui" style={{ fontSize: "0.70rem", color: "rgba(250,248,242,0.65)", lineHeight: 1.55 }}>
        Veilig afrekenen via iDEAL of creditcard via Mollie. Geen account nodig.
      </p>
      <p className="font-ui" style={{ fontSize: "0.67rem", color: "rgba(250,248,242,0.48)", lineHeight: 1.60 }}>
        Door te bestellen ga je akkoord met onze{" "}
        <a href="/privacybeleid" style={{ color: "#C9A84C", textDecoration: "underline" }}>privacyverklaring</a>
        {" "}en{" "}
        <a href="/voorwaarden" style={{ color: "#C9A84C", textDecoration: "underline" }}>algemene voorwaarden</a>.
        Jouw gegevens worden uitsluitend verwerkt voor de uitvoering van je bestelling en niet gedeeld
        met derden, behoudens Mollie (betalingsverwerker).
      </p>
    </form>
  );
}
