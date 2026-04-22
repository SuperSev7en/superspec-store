import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createServiceRoleClient } from '@/lib/supabaseServiceRole';
import { persistCheckoutSession } from '@/lib/stripe/orderFromCheckoutSession';
import { notifyAdminsNewOrder } from '@/lib/push/notifyAdminsNewOrder';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[stripe webhook] STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid payload';
    console.error('[stripe webhook] signature', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.mode !== 'payment') {
      return NextResponse.json({ received: true });
    }
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true });
    }

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product'],
      });

      let supabase;
      try {
        supabase = createServiceRoleClient();
      } catch (e) {
        console.error('[stripe webhook] Supabase service role', e);
        return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
      }

      const result = await persistCheckoutSession(supabase, fullSession);
      if (result.error) {
        console.error('[stripe webhook] persist', result.error);
      } else if (result.orderId && !result.skipped) {
        void notifyAdminsNewOrder(supabase, {
          orderNumber: result.orderNumber,
          total: result.total,
          currency: result.currency,
        }).catch((e) => console.error('[stripe webhook] push notify', e));
      }
    } catch (e) {
      console.error('[stripe webhook]', e);
      return NextResponse.json({ error: 'persist_failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
