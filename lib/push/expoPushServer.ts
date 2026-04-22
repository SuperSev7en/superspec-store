/**
 * Expo Push Notification HTTP API (no secret key required for basic send).
 * @see https://docs.expo.dev/push-notifications/sending-notifications/
 */

export type ExpoPushMessage = {
  to: string;
  title: string;
  body: string;
  sound?: 'default' | null;
  priority?: 'default' | 'normal' | 'high';
};

type ExpoPushTicket = { status: 'ok' | 'error'; id?: string; message?: string; details?: unknown };

export async function sendExpoPushMessages(messages: ExpoPushMessage[]): Promise<void> {
  if (messages.length === 0) return;

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[expo push] HTTP', res.status, text);
    return;
  }

  const json = (await res.json()) as { data?: ExpoPushTicket[] };
  const tickets = json.data ?? [];
  for (const t of tickets) {
    if (t.status === 'error') {
      console.error('[expo push] ticket error', t.message, t.details);
    }
  }
}
