import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { createClient } from '@/lib/supabase';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('superspec_token')?.value;
  if (!token) return NextResponse.json({ user: null });

  const payload = await verifyToken(token);
  if (!payload || typeof payload.id !== 'string') {
    return NextResponse.json({ user: null });
  }

  // Try to fetch fresh user data from DB
  try {
    const supabase = await createClient();
    const { data: user } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, newsletter, created_at')
      .eq('id', payload.id)
      .single();

    if (user) {
      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          newsletter: user.newsletter,
          createdAt: user.created_at,
        },
      });
    }
  } catch {}

  // Fall back to JWT payload
  return NextResponse.json({
    user: { id: payload.id, email: payload.email },
  });
}
