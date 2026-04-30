import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: resetRecord } = await supabase
      .from('password_reset_tokens')
      .select('user_id, expires_at')
      .eq('token', token)
      .single();

    if (!resetRecord) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
    }

    if (new Date(resetRecord.expires_at) < new Date()) {
      await supabase.from('password_reset_tokens').delete().eq('token', token);
      return NextResponse.json({ error: 'Reset link has expired' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await supabase
      .from('users')
      .update({ password_hash: passwordHash })
      .eq('id', resetRecord.user_id);

    // Delete used token
    await supabase.from('password_reset_tokens').delete().eq('token', token);

    // Fetch user and auto-login
    const { data: user } = await supabase
      .from('users')
      .select('id, email, first_name, last_name')
      .eq('id', resetRecord.user_id)
      .single();

    if (user) {
      const jwtToken = await signToken({ id: user.id, email: user.email }, '7d');
      const cookieStore = await cookies();
      cookieStore.set('superspec_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return NextResponse.json({ user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name } });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
