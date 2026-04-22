/** Public env (set in `apps/admin-mobile/.env` — copy from repo root `.env` using `EXPO_PUBLIC_` names). */
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
/** Storefront URL — “View store” (Shopify-style). */
export const SITE_URL = (process.env.EXPO_PUBLIC_SITE_URL ?? 'https://superspec.studio').replace(/\/$/, '');

export function isSupabaseEnvConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function assertSupabaseConfigured(): void {
  if (!isSupabaseEnvConfigured()) {
    throw new Error(
      'Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY. Copy values from your root .env into apps/admin-mobile/.env (see .env.example).',
    );
  }
}
