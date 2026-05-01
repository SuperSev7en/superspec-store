import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Sign in via official Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    const user = authData.user;
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // 2. Get profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name, is_admin')
      .eq('id', user.id)
      .single();

    return NextResponse.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        firstName: profile?.first_name, 
        lastName: profile?.last_name,
        isAdmin: profile?.is_admin
      } 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
