import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const supabase = await createClient();

    // Upsert into email_subscribers
    const { error } = await supabase.from('email_subscribers').upsert(
      { email: email.toLowerCase(), source: source || 'storefront', subscribed: true },
      { onConflict: 'email', ignoreDuplicates: false }
    );

    // Send welcome email series via Resend
    if (!error && process.env.RESEND_API_KEY) {
      // Email 1: Immediate welcome + 10% off
      await resend.emails.send({
        from: 'SUPER Spec <hello@superspec.store>',
        to: email,
        subject: 'Welcome to SUPER Spec — here\'s 10% off',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
            <h1 style="font-size:28px;font-weight:700;letter-spacing:3px;margin-bottom:8px">SUPER Spec</h1>
            <h2 style="font-size:22px;margin-bottom:16px">You made the list.</h2>
            <p style="color:#555;line-height:1.7;margin-bottom:24px">
              Welcome to the SUPER Spec inner circle. You'll be first to know about new drops, limited editions, and engineered goods that don't make it to the main site.
            </p>
            <p style="font-size:18px;margin-bottom:8px">Your welcome code:</p>
            <div style="background:#000;color:#fff;padding:20px;text-align:center;border-radius:4px;margin-bottom:24px;font-size:24px;letter-spacing:4px;font-weight:700">WELCOME10</div>
            <a href="${BASE_URL}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Shop Now</a>
          </div>
        `,
      });

      // Schedule Day 2 and Day 5 emails — in production use Vercel cron + scheduled_emails table
      await supabase.from('scheduled_emails').insert([
        {
          to_email: email,
          subject: 'The story behind SUPER Spec',
          template: 'welcome_day2',
          send_at: new Date(Date.now() + 2 * 86400000).toISOString(),
          status: 'pending',
        },
        {
          to_email: email,
          subject: 'What everyone\'s buying right now',
          template: 'welcome_day5',
          send_at: new Date(Date.now() + 5 * 86400000).toISOString(),
          status: 'pending',
        },
      ]).maybeSingle(); // suppress error if table doesn't exist yet
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
