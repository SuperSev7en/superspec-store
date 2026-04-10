import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export async function requireAdmin(nextPathname = '/admin') {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPathname)}`);

  // Profiles table is created by our Supabase schema migration (see `supabase/migrations/*`).
  const prof = await supabase.from('profiles').select('is_admin').eq('id', user.id).maybeSingle();
  const isAdmin = Boolean(prof.data?.is_admin);
  if (!isAdmin) redirect('/');

  return { supabase, user };
}

