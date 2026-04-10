import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let cached: ReturnType<typeof createSupabaseClient> | null = null;

export function getBrowserSupabase() {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  cached = createSupabaseClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return cached;
}

