import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

/**
 * Abandoned cart detection cron — runs hourly.
 * Reads abandoned_carts table, schedules emails at 1hr, 24hr, 48hr.
 * Configure in vercel.json:
 * { "crons": [{ "path": "/api/cron/abandoned-carts", "schedule": "0 * * * *" }] }
 */

export async function GET(req: Request) {
  const secret = req.headers.get('x-cron-secret');
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  const now = Date.now();

  // Find carts abandoned > 1hr ago that haven't been emailed yet
  const { data: carts } = await supabase
    .from('abandoned_carts')
    .select('*')
    .eq('converted', false)
    .is('email_1hr_sent_at', null)
    .lte('updated_at', new Date(now - 3600000).toISOString()) // 1 hour ago
    .limit(100);

  if (!carts || carts.length === 0) return NextResponse.json({ scheduled: 0 });

  let scheduled = 0;
  for (const cart of carts) {
    if (!cart.email) continue;

    const baseTime = new Date(cart.updated_at).getTime();

    await supabase.from('scheduled_emails').insert([
      {
        to_email: cart.email,
        template: 'abandoned_cart_1hr',
        send_at: new Date(baseTime + 3600000).toISOString(),
        status: 'pending',
        metadata: { cart_id: cart.id },
      },
      {
        to_email: cart.email,
        template: 'abandoned_cart_24hr',
        send_at: new Date(baseTime + 86400000).toISOString(),
        status: 'pending',
        metadata: { cart_id: cart.id },
      },
      {
        to_email: cart.email,
        template: 'abandoned_cart_48hr',
        send_at: new Date(baseTime + 172800000).toISOString(),
        status: 'pending',
        metadata: { cart_id: cart.id },
      },
    ]);

    await supabase
      .from('abandoned_carts')
      .update({ email_1hr_sent_at: new Date().toISOString() })
      .eq('id', cart.id);

    scheduled++;
  }

  return NextResponse.json({ scheduled });
}
