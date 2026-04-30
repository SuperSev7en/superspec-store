import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { Resend } from 'resend';

/**
 * Vercel Cron endpoint — configure in vercel.json:
 * { "crons": [{ "path": "/api/cron/send-scheduled-emails", "schedule": "0 * * * *" }] }
 *
 * Guards with CRON_SECRET header to prevent public access.
 */

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://superspec.studio';

const TEMPLATES: Record<string, { subject: string; html: (email: string) => string }> = {
  welcome_day2: {
    subject: 'The story behind SUPER Spec',
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">Built different, for a reason.</h2>
        <p style="color:#555;line-height:1.8">
          SUPER Spec started with one question: why does everything have to compromise?<br><br>
          Clothing that dissolves after three washes. Art prints that fade in sunlight. Components machined to tolerances that barely hold.
          We disagreed. So we built a brand around the opposite.
        </p>
        <a href="${BASE_URL}/collections/all" style="display:inline-block;margin-top:28px;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Explore the Collection</a>
      </div>
    `,
  },
  welcome_day5: {
    subject: "What everyone's buying right now",
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">The most popular pieces this month.</h2>
        <p style="color:#555;line-height:1.8;margin-bottom:28px">These are the drops that keep selling out. Grab them before they're gone.</p>
        <a href="${BASE_URL}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Shop Now</a>
      </div>
    `,
  },
  review_request: {
    subject: 'How was your order? Leave a review.',
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">How did we do?</h2>
        <p style="color:#555;line-height:1.8;margin-bottom:28px">Your feedback helps us improve and helps other customers make informed decisions. It takes less than 60 seconds.</p>
        <a href="${BASE_URL}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Leave a Review</a>
      </div>
    `,
  },
  reorder_nudge: {
    subject: "Time to restock? We're ready when you are.",
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">It's been a while.</h2>
        <p style="color:#555;line-height:1.8;margin-bottom:28px">Running low? New colorways just dropped. Your past purchases are saved in your account — reorder in one click.</p>
        <a href="${BASE_URL}/account/orders" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">View My Orders</a>
      </div>
    `,
  },
  abandoned_cart_1hr: {
    subject: "You left something behind.",
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">Your cart is waiting.</h2>
        <p style="color:#555;line-height:1.8;margin-bottom:28px">You left some items in your cart. We're holding them for you — but stock is limited.</p>
        <a href="${BASE_URL}/cart" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Return to Cart</a>
      </div>
    `,
  },
  abandoned_cart_24hr: {
    subject: "Still thinking it over?",
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">These items are still waiting for you.</h2>
        <p style="color:#555;line-height:1.8;margin-bottom:28px">A few pieces from yesterday are still in your cart. They won't last forever — especially the limited editions.</p>
        <a href="${BASE_URL}/cart" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Complete My Purchase</a>
      </div>
    `,
  },
  abandoned_cart_48hr: {
    subject: "Last chance — your cart expires soon.",
    html: (email) => `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:48px 24px">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:3px">SUPER Spec</h1>
        <h2 style="font-size:20px;margin:20px 0 12px">This is your final reminder.</h2>
        <p style="color:#555;line-height:1.8;margin-bottom:12px">Your cart will be cleared in 24 hours. Don't miss out on:</p>
        <p style="color:#555;margin-bottom:28px">Use code <strong>SAVE10</strong> for 10% off to seal the deal.</p>
        <a href="${BASE_URL}/cart" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600">Shop Now — Save 10%</a>
      </div>
    `,
  },
};

export async function GET(req: Request) {
  const secret = req.headers.get('x-cron-secret');
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ skipped: true, reason: 'No RESEND_API_KEY' });
  }

  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data: pendingEmails } = await supabase
    .from('scheduled_emails')
    .select('*')
    .eq('status', 'pending')
    .lte('send_at', now)
    .limit(50);

  if (!pendingEmails || pendingEmails.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;
  for (const scheduled of pendingEmails) {
    const template = TEMPLATES[scheduled.template];
    if (!template) continue;

    try {
      await resend.emails.send({
        from: 'SUPER Spec <hello@superspec.studio>',
        to: scheduled.to_email,
        subject: scheduled.subject || template.subject,
        html: template.html(scheduled.to_email),
      });

      await supabase.from('scheduled_emails').update({ status: 'sent', sent_at: new Date().toISOString() }).eq('id', scheduled.id);
      sent++;
    } catch {
      await supabase.from('scheduled_emails').update({ status: 'failed' }).eq('id', scheduled.id);
    }
  }

  return NextResponse.json({ sent });
}
