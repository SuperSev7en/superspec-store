import type { SupabaseClient } from '@supabase/supabase-js';
import { sendExpoPushMessages } from '@/lib/push/expoPushServer';

/**
 * Sends a high-priority push to all admin devices with registered Expo tokens.
 * Optional env `ADMIN_PUSH_USER_IDS` (comma-separated UUIDs) limits recipients to those accounts only.
 */
export async function notifyAdminsNewOrder(
  supabase: SupabaseClient,
  payload: { orderNumber: string | null | undefined; total: number | undefined; currency: string | undefined },
): Promise<void> {
  const allow = (process.env.ADMIN_PUSH_USER_IDS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  let query = supabase.from('profiles').select('id').eq('is_admin', true);
  if (allow.length > 0) {
    query = query.in('id', allow);
  }

  const { data: admins, error: adminErr } = await query;
  if (adminErr || !admins?.length) {
    if (adminErr) console.error('[push] admin list', adminErr.message);
    return;
  }

  const ids = admins.map((a) => a.id as string);
  const { data: subs, error: subErr } = await supabase.from('push_subscriptions').select('expo_push_token').in('user_id', ids);
  if (subErr) {
    console.error('[push] subscriptions', subErr.message);
    return;
  }

  const tokens = [
    ...new Set(
      (subs ?? [])
        .map((s) => String((s as { expo_push_token: string }).expo_push_token))
        .filter((t) => t.startsWith('ExponentPushToken[') || t.startsWith('ExpoPushToken')),
    ),
  ];
  if (tokens.length === 0) return;

  const num = payload.orderNumber ? `#${payload.orderNumber}` : 'New order';
  const amt =
    payload.total != null && payload.currency
      ? `${payload.currency} ${payload.total.toFixed(2)}`
      : payload.total != null
        ? `$${payload.total.toFixed(2)}`
        : '';

  const body = amt ? `${num} · ${amt}` : num;

  await sendExpoPushMessages(
    tokens.map((to) => ({
      to,
      title: 'New order',
      body,
      sound: 'default',
      priority: 'high',
    })),
  );
}
