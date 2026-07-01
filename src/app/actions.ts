"use server";

import { redirect } from "next/navigation";
import { createAnonClient, createServiceClient } from "@/lib/supabase";
import { getProduct } from "@/lib/products";
import { provisionScan, provisionProgram, provisionSubscription } from "@/lib/fulfillment";
import { createCheckoutSession, paymentsConfigured } from "@/lib/payments";
import { validateRelatieCode } from "@/lib/relatie-codes";

export type ActionState = { error?: string; ok?: boolean };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function submitLead(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const first_name = ((formData.get("first_name") as string) ?? "").trim();
  const last_name = ((formData.get("last_name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const organization = ((formData.get("organization") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();

  if (!first_name || !email) return { error: "Vul minimaal je naam en e-mailadres in." };
  if (!EMAIL_RE.test(email)) return { error: "Vul een geldig e-mailadres in." };

  const supabase = createAnonClient();
  const { error } = await supabase.rpc("submit_lead", {
    p_first_name: first_name,
    p_last_name: last_name,
    p_email: email,
    p_phone: phone,
    p_organization: organization,
    p_message: message,
  });
  if (error) return { error: "Er ging iets mis. Probeer het later opnieuw." };

  try {
    const svc = createServiceClient();
    const { data: coach } = await svc
      .from("profiles")
      .select("id")
      .eq("role", "coach")
      .limit(1)
      .maybeSingle();
    if (coach) {
      await svc.from("notifications").insert({
        coach_id: coach.id,
        type: "lead",
        title: `Nieuwe lead: ${first_name} ${last_name}`.trim(),
        body: `${email}${organization ? ` · ${organization}` : ""}${message ? ` — "${message.slice(0, 120)}"` : ""}`,
        link: "/clients",
      });
    }
  } catch {
    // notificatie is nice-to-have, niet blokkeren
  }

  return { ok: true };
}

/**
 * Koop-/start-actie voor een product. Legt de bestelling vast en stuurt door:
 *  - Stripe actief + betaald product → naar Stripe Checkout.
 *  - Stripe inactief (testmodus)     → bestelling genoteerd; scanproduct wordt
 *    alvast bij de vivynq-app klaargezet zodat de koppeling end-to-end te testen
 *    is. /bedankt toont de status + (in testmodus) de scanlink.
 */
export async function startProduct(slug: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const product = getProduct(slug);
  if (!product) return { error: "Onbekend product." };

  const first_name = ((formData.get("first_name") as string) ?? "").trim();
  const last_name = ((formData.get("last_name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const organization = ((formData.get("organization") as string) ?? "").trim();
  const rawMessage = ((formData.get("message") as string) ?? "").trim();
  const relatieCodeInput = ((formData.get("relatie_code") as string) ?? "").trim();

  // Team-order context (alleen bij scan-producten met team-toggle)
  const isTeam = formData.get("is_team") === "1";
  const teamGrootte = ((formData.get("team_grootte") as string) ?? "").trim();
  const analyseOmschrijving = ((formData.get("analyse_omschrijving") as string) ?? "").trim();
  const analyseDoel = ((formData.get("analyse_doel") as string) ?? "").trim();

  // Bouw een samengesteld bericht voor team-orders
  const teamContext = isTeam
    ? [
        `[TEAMORDER] Grootte: ${teamGrootte || "onbekend"}`,
        analyseOmschrijving ? `Analyse: ${analyseOmschrijving}` : "",
        analyseDoel ? `Doel: ${analyseDoel}` : "",
        rawMessage ? `Extra: ${rawMessage}` : "",
      ]
        .filter(Boolean)
        .join(" · ")
    : rawMessage;

  const message = teamContext;

  if (!first_name || !email) return { error: "Vul minimaal je naam en e-mailadres in." };
  if (!EMAIL_RE.test(email)) return { error: "Vul een geldig e-mailadres in." };

  // Rate limiting: max 3 bestellingen per e-mailadres per uur
  {
    const rateSupa = createServiceClient();
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await rateSupa
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("customer_email", email)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) return { error: "Te veel bestellingen in korte tijd. Probeer het later opnieuw." };
  }

  // Invoerlengte-limieten (voorkomen van oversized DB-inserts)
  if (first_name.length > 100) return { error: "Naam is te lang (max. 100 tekens)." };
  if (last_name.length > 100) return { error: "Achternaam is te lang (max. 100 tekens)." };
  if (email.length > 254) return { error: "E-mailadres is te lang." };
  if (phone.length > 30) return { error: "Telefoonnummer is te lang (max. 30 tekens)." };
  if (organization.length > 200) return { error: "Organisatienaam is te lang (max. 200 tekens)." };
  if (message.length > 4000) return { error: "Bericht is te lang (max. 4000 tekens)." };

  // Relatiecode validatie
  let discountPercent = 0;
  let validatedCode: string | undefined;
  if (relatieCodeInput) {
    const match = validateRelatieCode(relatieCodeInput);
    if (!match) return { error: "Ongeldige of inactieve relatiecode." };
    discountPercent = match.discountPercent;
    validatedCode = match.code;
  }

  const supabase = createServiceClient();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      product_slug: product.slug,
      product_name: product.name,
      amount_cents: product.priceCents,
      fulfillment: product.fulfillment,
      status: "pending",
      customer_first_name: first_name,
      customer_last_name: last_name || null,
      customer_email: email,
      customer_phone: phone || null,
      organization: organization || null,
      message: message || null,
    })
    .select("id")
    .single();
  if (orderErr || !order) return { error: "Kon de bestelling niet vastleggen. Probeer het later opnieuw." };

  const orderId = order.id as string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3300";
  const isPaid = product.priceCents > 0;
  const isRecurring = product.fulfillment === "subscription";

  // Betaalde producten met Stripe actief worden gevuld via de webhook
  // (checkout.session.completed). Alleen in testmodus (Stripe uit) direct provisionen.
  const willUsePaidStripe = isPaid && paymentsConfigured();

  // Scanproduct → alleen in testmodus direct klaarzetten.
  if (product.fulfillment === "scan" && !willUsePaidStripe) {
    const prov = await provisionScan(
      { first_name, last_name, email },
      product.scanType ?? "persoonlijk"
    );
    await supabase
      .from("orders")
      .update({ scan_id: prov.scanId, invite_token: prov.token, status: "fulfilled" })
      .eq("id", orderId);
  }

  // Programmaproduct → alleen in testmodus direct toegang verlenen.
  if (product.fulfillment === "program" && !willUsePaidStripe) {
    await provisionProgram({ first_name, last_name, email }, product.slug);
    await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
  }

  // Abonnement → alleen in testmodus direct activeren.
  if (product.fulfillment === "subscription" && !willUsePaidStripe) {
    await provisionSubscription({ first_name, last_name, email }, product.priceCents);
    await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
  }

  // Betaald product met actieve Stripe → naar Stripe Checkout.
  // Fulfillment vindt plaats via /api/webhooks/stripe na bevestiging van betaling.
  if (isPaid && paymentsConfigured()) {
    const checkout = await createCheckoutSession({
      orderId,
      amountCents: product.priceCents,
      productName: product.name,
      description: product.tagline,
      customerEmail: email,
      successUrl: `${siteUrl}/bedankt?order=${orderId}`,
      cancelUrl: `${siteUrl}/programma/${product.slug}`,
      recurring: isRecurring,
      relatieCode: validatedCode,
      discountPercent,
    });
    if (checkout.url) {
      await supabase
        .from("orders")
        .update({ payment_provider: "stripe", status: "awaiting_payment" })
        .eq("id", orderId);
      redirect(checkout.url);
    }
    return { error: checkout.error ?? "Betaling starten lukte niet." };
  }

  // Gratis lead-magnet → genoteerd.
  if (product.fulfillment === "lead") {
    await supabase.from("orders").update({ status: "fulfilled" }).eq("id", orderId);
  }

  // Teamorder-notificatie: Wouter proactief alerteren met team-context
  if (isTeam) {
    try {
      const svc = createServiceClient();
      const { data: coach } = await svc
        .from("profiles")
        .select("id")
        .eq("role", "coach")
        .limit(1)
        .maybeSingle();
      if (coach) {
        await svc.from("notifications").insert({
          coach_id: coach.id,
          type: "lead",
          title: `Teamorder ${product.name} — ${teamGrootte || "?"} personen${organization ? ` · ${organization}` : ""}`,
          body: analyseOmschrijving
            ? `Analyse: ${analyseOmschrijving.slice(0, 200)}${analyseDoel ? ` | Doel: ${analyseDoel.slice(0, 120)}` : ""}`
            : "Geen omschrijving opgegeven.",
          link: "/clients",
        });
      }
    } catch {
      // notificatie is nice-to-have
    }
  }

  redirect(`/bedankt?order=${orderId}`);
}
