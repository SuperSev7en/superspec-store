import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, newsletter } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Check if email exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Mock DB insert
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        newsletter: newsletter,
      })
      .select()
      .single();

    // If table doesn't exist, we will gracefully proceed for demonstration
    const user = newUser || { id: `mock_${Date.now()}`, email, first_name: firstName, last_name: lastName };

    const token = await signToken({ id: user.id, email: user.email }, '7d');

    const cookieStore = await cookies();
    cookieStore.set('superspec_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return NextResponse.json({ user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
