import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Sign up user via official Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const user = authData.user;
    if (!user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
    }

    // 2. Update profile with names (trigger in SQL handles creation, we just enrich it)
    await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName
      })
      .eq('id', user.id);

    return NextResponse.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        firstName, 
        lastName 
      } 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
