import "server-only";
import { createServiceClient } from "./supabase";

/**
 * De marketingsite maakt — via de gedeelde database — een client-profiel, een
 * scan en een invite-token aan, precies zoals de coach dat in de app zou doen.
 * De koper vult de scan in op de vivynq-app (/invite/<token>), waarna het
 * Q.Code-rapport wordt gegenereerd.
 *
 * De service-role omzeilt RLS; de create_scan_invite-RPC kan hier niet (die
 * vereist auth.uid() = coach), dus we repliceren de token-logica één-op-één.
 */

interface Customer {
  first_name: string;
  last_name?: string;
  email: string;
}

export interface ProvisionResult {
  scanId: string;
  token: string;
  inviteUrl: string;
}

function genToken(): string {
  // Spiegelt create_scan_invite: twee uuid's zonder streepjes (64 hex tekens).
  const a = crypto.randomUUID().replace(/-/g, "");
  const b = crypto.randomUUID().replace(/-/g, "");
  return a + b;
}

// Aantal modules per programma-slug (synchroon met vivynq-app/src/lib/programmas)
const PROGRAM_MODULE_COUNTS: Record<string, number> = {
  "van-dragen-naar-kiezen": 8,
  wortels: 8,
  raak: 6,
  adem: 6,
  wending: 6,
};

// Leesbare namen voor factuuromschrijvingen
const PROGRAM_NAMES: Record<string, string> = {
  "van-dragen-naar-kiezen": "Van dragen naar kiezen — 8-weeks online programma",
  wortels: "Wortels — 8-weeks online programma",
  raak: "Raak — 6-weeks online programma",
  adem: "Adem — 6-weeks online programma",
  wending: "Wending — 6-weeks online programma",
  "zelfscan-qcode": "Zelfscan Q.Code — persoonlijk DISC-rapport",
  "qcode-compleet": "Q.Code Compleet — DISC + systemische analyse",
};

/** Genereert het volgende VVQ-JJJJ-NNN factuurnummer via de gedeelde DB. */
async function nextInvoiceNumber(offset = 0): Promise<string> {
  const supabase = createServiceClient();
  const year = new Date().getFullYear();
  const prefix = `VVQ-${year}-`;
  const { data: last } = await supabase
    .from("invoices")
    .select("invoice_number")
    .like("invoice_number", `${prefix}%`)
    .order("invoice_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  let seq = 1 + offset;
  const m = last?.invoice_number?.match(/(\d+)$/);
  if (m?.[1]) seq = parseInt(m[1], 10) + 1 + offset;
  return `${prefix}${String(seq).padStart(3, "0")}`;
}

/** Schrijft een betaalde online factuur naar de invoices-tabel in de app.
 *  Herprobeert tot 3× bij een uniqueness-conflict (PG 23505) om race conditions
 *  bij gelijktijdige betalingen op te vangen.
 */
async function writeInvoice(
  clientId: string,
  description: string,
  amountCents: number
): Promise<void> {
  const supabase = createServiceClient();
  for (let attempt = 0; attempt < 3; attempt++) {
    const invoiceNumber = await nextInvoiceNumber(attempt);
    const { error } = await supabase.from("invoices").insert({
      client_id: clientId,
      invoice_number: invoiceNumber,
      description,
      amount_cents: amountCents,
      tax_cents: 0,
      tax_exempt: true,
      status: "paid",
      source: "online",
      paid_at: new Date().toISOString(),
    });
    if (!error) return;
    // 23505 = unique_violation — probeer met volgend nummer
    if (error.code !== "23505") {
      console.error("[fulfillment] factuur aanmaken mislukt:", error.message);
      return;
    }
  }
  console.error("[fulfillment] factuur aanmaken mislukt na 3 pogingen (race condition)");
}

export async function provisionScan(
  customer: Customer,
  scanType: "persoonlijk" | "team" = "persoonlijk",
  priceCents?: number
): Promise<ProvisionResult> {
  const supabase = createServiceClient();

  // De (solo) coach die eigenaar wordt van de scan.
  const { data: coach, error: coachErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "coach")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();
  if (coachErr || !coach) throw new Error("Geen coach gevonden om de scan aan te koppelen.");

  // Client-profiel voor de koper — check eerst op e-mail zodat Mollie-webhook-retries
  // geen duplicaten aanmaken.
  let clientId: string;
  const { data: existingClient } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", customer.email)
    .eq("role", "client")
    .maybeSingle();
  if (existingClient) {
    clientId = existingClient.id;
  } else {
    const { data: client, error: clientErr } = await supabase
      .from("profiles")
      .insert({
        role: "client",
        first_name: customer.first_name,
        last_name: customer.last_name ?? "",
        email: customer.email,
        pipeline_stage: "scan",
        client_type: "individu",
      })
      .select("id")
      .single();
    if (clientErr || !client) throw new Error(clientErr?.message ?? "Kon client-profiel niet aanmaken.");
    clientId = client.id;
  }

  // Scan (pending) gekoppeld aan coach + client.
  const { data: scan, error: scanErr } = await supabase
    .from("scans")
    .insert({
      coach_id: coach.id,
      client_id: clientId,
      scan_type: scanType,
      status: "pending",
    })
    .select("id")
    .single();
  if (scanErr || !scan) throw new Error(scanErr?.message ?? "Kon scan niet aanmaken.");

  // Invite-token (30 dagen geldig) — repliceert create_scan_invite.
  const token = genToken();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: inviteErr } = await supabase
    .from("scan_invites")
    .insert({ scan_id: scan.id, token, expires_at: expires });
  if (inviteErr) throw new Error(inviteErr.message);

  // Factuur aanmaken (indien prijs meegegeven)
  if (priceCents && priceCents > 0) {
    const description = PROGRAM_NAMES["zelfscan-qcode"] ?? "Zelfscan Q.Code";
    await writeInvoice(clientId, description, priceCents);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return { scanId: scan.id, token, inviteUrl: `${appUrl}/invite/${token}` };
}

export interface PortalResult {
  portalUrl: string;
}

/** Verleent toegang tot een programma in het portaal en maakt zo nodig een koper-profiel aan. */
export async function provisionProgram(
  customer: Customer,
  slug: string,
  priceCents?: number
): Promise<PortalResult> {
  const supabase = createServiceClient();

  const { data: coach, error: coachErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "coach")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();
  if (coachErr || !coach) throw new Error("Geen coach gevonden.");

  let profileId: string;
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", customer.email)
    .eq("role", "client")
    .maybeSingle();
  if (existing) {
    profileId = existing.id;
  } else {
    const { data: created, error } = await supabase
      .from("profiles")
      .insert({
        role: "client",
        first_name: customer.first_name,
        last_name: customer.last_name ?? "",
        email: customer.email,
        pipeline_stage: "scan",
        client_type: "individu",
      })
      .select("id")
      .single();
    if (error || !created) throw new Error(error?.message ?? "Kon profiel niet aanmaken.");
    profileId = created.id;
  }

  // Toegang verlenen (idempotent via on conflict ignore)
  const { error: progErr } = await supabase.from("user_programs").insert({
    profile_id: profileId,
    email: customer.email,
    program_slug: slug,
    status: "active",
    purchased_at: new Date().toISOString(),
  });
  if (progErr && !progErr.message.includes("duplicate")) {
    throw new Error(progErr.message);
  }

  // Module-voortgang initialiseren: module 1 = unlocked, rest = locked
  const moduleCount = PROGRAM_MODULE_COUNTS[slug];
  if (moduleCount) {
    const progressRows = Array.from({ length: moduleCount }, (_, i) => ({
      profile_id: profileId,
      program_slug: slug,
      module_number: i + 1,
      status: i === 0 ? "unlocked" : "locked",
    }));
    // Bestaande rijen overslaan (idempotent bij webhook-retries)
    await supabase.from("program_progress").upsert(progressRows, {
      onConflict: "profile_id,program_slug,module_number",
      ignoreDuplicates: true,
    });
  }

  // Factuur aanmaken
  if (priceCents && priceCents > 0) {
    const description = PROGRAM_NAMES[slug] ?? `Online programma: ${slug}`;
    await writeInvoice(profileId, description, priceCents);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const path = slug === "patroonwijzer" ? "/portaal/patroonwijzer" : `/portaal/online-programmas/${slug}`;
  return { portalUrl: `${appUrl}${path}` };
}

/** Slaat een bestelling op voor handmatig te leveren producten (bijv. Q.Code Compleet). */
export async function provisionOrder(
  customer: Customer,
  slug: string,
  priceCents?: number
): Promise<{ orderId: string }> {
  const supabase = createServiceClient();

  let clientId: string;
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", customer.email)
    .eq("role", "client")
    .maybeSingle();
  if (existing) {
    clientId = existing.id;
  } else {
    const { data: coach } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "coach")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    const { data: created, error } = await supabase
      .from("profiles")
      .insert({
        role: "client",
        first_name: customer.first_name,
        last_name: customer.last_name ?? "",
        email: customer.email,
        pipeline_stage: "lead",
        client_type: "individu",
      })
      .select("id")
      .single();
    if (error || !created) throw new Error(error?.message ?? "Kon profiel niet aanmaken.");
    clientId = created.id;
  }

  if (priceCents && priceCents > 0) {
    const description = PROGRAM_NAMES[slug] ?? `Bestelling: ${slug}`;
    await writeInvoice(clientId, description, priceCents);
  }

  return { orderId: clientId };
}

/** Activeert een meditatie-abonnement in het portaal en maakt zo nodig een koper-profiel aan. */
export async function provisionSubscription(
  customer: Customer,
  amountCents: number
): Promise<PortalResult> {
  const supabase = createServiceClient();

  const { data: coach, error: coachErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "coach")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();
  if (coachErr || !coach) throw new Error("Geen coach gevonden.");

  let profileId: string;
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", customer.email)
    .eq("role", "client")
    .maybeSingle();
  if (existing) {
    profileId = existing.id;
  } else {
    const { data: created, error } = await supabase
      .from("profiles")
      .insert({
        role: "client",
        first_name: customer.first_name,
        last_name: customer.last_name ?? "",
        email: customer.email,
        pipeline_stage: "scan",
        client_type: "individu",
      })
      .select("id")
      .single();
    if (error || !created) throw new Error(error?.message ?? "Kon profiel niet aanmaken.");
    profileId = created.id;
  }

  const { error: subErr } = await supabase.from("subscriptions").insert({
    profile_id: profileId,
    email: customer.email,
    product_slug: "meditaties",
    status: "active",
    amount_cents: amountCents,
  });
  if (subErr) throw new Error(subErr.message);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return { portalUrl: `${appUrl}/portaal/meditaties` };
}
