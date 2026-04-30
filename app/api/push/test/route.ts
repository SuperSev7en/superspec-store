import { NextResponse } from 'next/server';
import { getAdminFromBearer } from '@/lib/auth/adminFromBearer';
import { sendExpoPushMessages } from '@/lib/push/expoPushServer';

export const runtime = 'nodejs';

/**
 * Sends a test push to every Expo token registered for the authenticated admin.
 * Mobile app: `Authorization: Bearer <supabase_access_token>`.
 */
export async function POST(req: Request) {
  let context = await getAdminFromBearer(req);
  
  if (!context) {
    // Fallback for web admin (cookies)
    const { createClient: createWebClient } = await import('@/lib/supabase');
    const supabase = await createWebClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: prof } = await supabase.from('profiles').select('is_admin').eq('id', user.id).maybeSingle();
      if (prof?.is_admin) context = { supabase, user };
    }
  }

  if (!context) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { supabase, user } = context;
  const { data: subs, error } = await supabase.from('push_subscriptions').select('expo_push_token').eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const tokens = [
    ...new Set(
      (subs ?? [])
        .map((s) => String((s as { expo_push_token: string }).expo_push_token))
        .filter((t) => t.startsWith('ExponentPushToken[') || t.startsWith('ExpoPushToken')),
    ),
  ];
  if (tokens.length === 0) {
    return NextResponse.json({ ok: false, error: 'No push tokens registered for this account.' }, { status: 400 });
  }

  await sendExpoPushMessages(
    tokens.map((to) => ({
      to,
      title: 'Super Spec Hub',
      body: 'Test notification — push is working.',
      sound: 'default',
      priority: 'high',
    })),
  );

  return NextResponse.json({ ok: true, sent: tokens.length });
}
