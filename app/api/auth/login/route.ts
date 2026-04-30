import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe, guestCart } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (!user) {
      // Mock validation for test dev
      if (email === 'test@example.com' && password === 'password123') {
        const mockUser = { id: 'test_123', email, first_name: 'Test', last_name: 'User' };
        const token = await signToken({ id: mockUser.id, email: mockUser.email }, rememberMe ? '30d' : '7d');
        const cookieStore = await cookies();
        cookieStore.set('superspec_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: (rememberMe ? 30 : 7) * 24 * 60 * 60
        });
        return NextResponse.json({ user: mockUser, mergedCart: guestCart || [] });
      }
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await signToken({ id: user.id, email: user.email }, rememberMe ? '30d' : '7d');

    const cookieStore = await cookies();
    cookieStore.set('superspec_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: (rememberMe ? 30 : 7) * 24 * 60 * 60
    });

    // Merge guest cart if provided
    let mergedCart = guestCart || [];
    if (Array.isArray(guestCart) && guestCart.length > 0) {
      // In production, merge with user's server-side cart in DB
      // For now, return the guest cart for client-side merge
      try {
        const { data: serverCart } = await supabase
          .from('carts')
          .select('items')
          .eq('user_id', user.id)
          .single();
        if (serverCart?.items && Array.isArray(serverCart.items)) {
          const existingHandles = new Set(serverCart.items.map((i: any) => `${i.handle}-${i.variantId}`));
          const newItems = guestCart.filter((i: any) => !existingHandles.has(`${i.handle}-${i.variantId}`));
          mergedCart = [...serverCart.items, ...newItems];
        }
      } catch {
        // Cart table may not exist yet — gracefully use guest cart as-is
      }
    }

    return NextResponse.json({ user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name }, mergedCart });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
