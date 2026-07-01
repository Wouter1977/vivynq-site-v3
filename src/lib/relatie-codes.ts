/**
 * Relatiecode-systeem voor Vivynq.
 *
 * Configureer codes via omgevingsvariabele RELATIE_CODES:
 *   RELATIE_CODES=WOUTER10:10:10% Wouter-netwerk,PARTNER15:15:15% partnerkorting
 *
 * Formaat: CODE:PERCENT:LABEL (kommagescheiden)
 */

export interface RelatieCode {
  code: string;
  discountPercent: number;
  label: string;
}

function parseEnvCodes(): RelatieCode[] {
  const raw = process.env.RELATIE_CODES ?? "";
  return raw
    .split(",")
    .filter(Boolean)
    .flatMap((entry) => {
      const parts = entry.split(":");
      if (parts.length < 2) return [];
      const [code, pct, ...rest] = parts;
      const rawPercent = parseInt(pct.trim(), 10);
      if (!code.trim() || isNaN(rawPercent)) return [];
      const discountPercent = Math.max(0, Math.min(100, rawPercent));
      return [
        {
          code: code.trim().toUpperCase(),
          discountPercent,
          label: rest.join(":").trim() || `${discountPercent}% relatievoordeel`,
        },
      ];
    });
}

// Parse once per cold start — env vars change only on redeploy
const PARSED_CODES = parseEnvCodes();

export function validateRelatieCode(input: string): RelatieCode | null {
  if (!input?.trim()) return null;
  const normalized = input.trim().toUpperCase();
  return PARSED_CODES.find((c) => c.code === normalized) ?? null;
}

export function applyDiscount(amountCents: number, discountPercent: number): number {
  const clamped = Math.max(0, Math.min(100, discountPercent));
  return Math.round(amountCents * (1 - clamped / 100));
}

export function formatDiscountedLabel(amountCents: number): string {
  const euros = amountCents / 100;
  return `€${euros % 1 === 0 ? euros.toFixed(0) : euros.toFixed(2)}`;
}
