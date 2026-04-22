import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient, User } from '@supabase/supabase-js';

export type AdminBearerContext = { supabase: SupabaseClient; user: User };

/**
 * Validates `Authorization: Bearer <jwt>` for a user with `profiles.is_admin`.
 * Use in Route Handlers so the mobile app can call APIs without browser cookies.
 */
export async function getAdminFromBearer(req: Request): Promise<AdminBearerContext | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const header = req.headers.get('authorization');
  if (!header?.toLowerCase().startsWith('bearer ')) return null;
  const jwt = header.slice(7).trim();
  if (!jwt) return null;

  const supabase = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${jwt}` } },
  });

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser(jwt);
  if (userErr || !user) return null;

  const { data: prof, error: profErr } = await supabase.from('profiles').select('is_admin').eq('id', user.id).maybeSingle();
  if (profErr || !prof?.is_admin) return null;

  return { supabase, user };
}
