import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabaseServiceRole';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();
    if (!cart || !Array.isArray(cart)) {
      return NextResponse.json({ error: 'Invalid cart' }, { status: 400 });
    }

    // Attempt to get user session to link the cart
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;
    const email = session?.user?.email || null;

    // Only save if we know who they are, since we can't email an anonymous user
    if (userId && email && cart.length > 0) {
      const adminDb = createServiceRoleClient();
      
      // Upsert the cart state for this user
      const { error } = await adminDb
        .from('abandoned_carts')
        .upsert({
          user_id: userId,
          email: email,
          cart_state: cart,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) console.error('Error saving abandoned cart:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cart sync error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
