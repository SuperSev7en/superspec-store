import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Always return success regardless of whether email exists (security best practice)
    const supabase = await createClient();
    const { data: user } = await supabase
      .from('users')
      .select('id, email, first_name')
      .eq('email', email.toLowerCase())
      .single();

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await supabase.from('password_reset_tokens').insert({
        user_id: user.id,
        token,
        expires_at: expiresAt.toISOString(),
      });

      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'SUPER Spec <noreply@superspec.studio>',
          to: user.email,
          subject: 'Reset your SUPER Spec password',
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
              <h1 style="font-size:24px;font-weight:700;letter-spacing:2px;margin-bottom:8px">SUPER Spec</h1>
              <h2 style="font-size:20px;font-weight:600;margin-bottom:16px">Password Reset</h2>
              <p style="color:#555;margin-bottom:24px">Hi ${user.first_name || 'there'},<br><br>We received a request to reset your password. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
              <a href="${BASE_URL}/reset-password/${token}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 28px;border-radius:4px;font-weight:600">Reset Password</a>
              <p style="color:#888;font-size:13px;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
