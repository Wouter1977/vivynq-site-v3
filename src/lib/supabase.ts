import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Anon-client — voor publieke, anonieme RPC's die zelf valideren via
 * SECURITY DEFINER (bv. submit_lead). Spiegelt hoe de vivynq-app dit doet.
 */
export function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase-configuratie ontbreekt.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Service-role client — omzeilt RLS. Uitsluitend server-side, voor vertrouwde
 * operaties: het vastleggen van bestellingen en het provisioneren van een scan
 * + invite in het gedeelde vivynq-project (de "vervaardiging" door de app).
 * De SUPABASE_SERVICE_ROLE_KEY staat alleen in .env.local — NOOIT naar de client.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Service-role configuratie ontbreekt.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
