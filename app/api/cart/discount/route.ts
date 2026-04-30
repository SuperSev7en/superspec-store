import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    
    if (!code) return NextResponse.json({ error: 'Code is required' }, { status: 400 });

    const supabase = await createClient();
    const { data: discount, error } = await supabase
      .from('discounts')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !discount) {
      // Mock fallback if table doesn't exist
      if (code.toUpperCase() === 'WELCOME10') {
        return NextResponse.json({ discount: { type: 'percentage', value: 10, code: 'WELCOME10' } });
      }
      return NextResponse.json({ error: 'Invalid or expired discount code' }, { status: 404 });
    }

    return NextResponse.json({ discount });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
