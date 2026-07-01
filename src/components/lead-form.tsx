"use client";

import { useActionState } from "react";
import { submitLead, type ActionState } from "@/app/actions";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(15,3,24,0.6)",
  border: "1px solid rgba(201,168,76,0.25)",
  color: "#fff",
  padding: "11px 14px",
  fontSize: "0.9rem",
};

export function LeadForm({ showMessage, cta = "Verstuur" }: { showMessage?: boolean; cta?: string }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitLead, {});

  if (state.ok) {
    return (
      <div style={{ background: "rgba(30,132,73,0.12)", border: "1px solid rgba(30,132,73,0.4)", padding: "20px 22px" }}>
        <p className="font-ui text-white" style={{ fontSize: "0.92rem", fontWeight: 600, marginBottom: "4px" }}>Gelukt — bedankt!</p>
        <p className="font-ui" style={{ fontSize: "0.84rem", color: "rgba(200,168,216,0.85)", lineHeight: 1.6 }}>
          Je staat genoteerd. Je ontvangt snel een persoonlijke uitnodiging in je inbox.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input className="font-ui" name="first_name" required placeholder="Voornaam *" style={inputStyle} />
        <input className="font-ui" name="email" type="email" required placeholder="E-mailadres *" style={inputStyle} />
      </div>
      {showMessage && (
        <textarea className="font-ui" name="message" rows={3} placeholder="Je vraag of doel (optioneel)" style={inputStyle} />
      )}
      <label className="flex items-start gap-3 cursor-pointer" style={{ fontSize: "0.76rem" }}>
        <input type="checkbox" name="consent" required className="mt-1 shrink-0 accent-[#C9A84C]" />
        <span className="font-ui" style={{ color: "rgba(200,168,216,0.7)", lineHeight: 1.5 }}>
          Ik ga akkoord met het{" "}
          <a href="/privacybeleid" target="_blank" rel="noopener" style={{ color: "#C9A84C" }}>privacybeleid</a>
          {" "}en geef toestemming om gecontacteerd te worden.
        </span>
      </label>
      {state.error && <p className="font-ui" style={{ fontSize: "0.8rem", color: "#E8917A" }}>{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="font-ui uppercase transition-all hover:brightness-110 disabled:opacity-60"
        style={{ fontSize: "0.8rem", letterSpacing: "0.12em", fontWeight: 700, color: "#0F0318", background: "#C9A84C", padding: "13px 22px" }}
      >
        {isPending ? "Bezig…" : cta}
      </button>
    </form>
  );
}
