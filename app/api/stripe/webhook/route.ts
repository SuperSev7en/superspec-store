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
  } else if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Fallback order creation: if client-side confirm-order failed or was skipped
    try {
      const supabase = createServiceRoleClient();
      const piId = paymentIntent.id;

      // Check if order already exists (created by confirm-order endpoint)
      const { data: existing } = await supabase
        .from('orders')
        .select('id')
        .eq('stripe_payment_intent_id', piId)
        .single();

      if (!existing) {
        // Order not yet created — create it from PI metadata
        const meta = paymentIntent.metadata || {};
        const email = meta.email || paymentIntent.receipt_email || '';
        const orderNumber = `SP-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

        await supabase.from('orders').insert({
          order_number: orderNumber,
          email,
          total: paymentIntent.amount / 100,
          status: 'paid',
          stripe_payment_intent_id: piId,
          currency: 'USD',
          shipping_method: meta.shippingMethod || 'standard',
          fulfillment_status: 'unfulfilled',
        });
      }
    } catch (e) {
      console.error('[stripe webhook] payment_intent.succeeded fallback', e);
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.error('[stripe webhook] payment_intent.payment_failed', paymentIntent.last_payment_error?.message);
    // Log failure
  } else if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;

    
    // Attempt to update order status in DB
    try {
      const supabase = createServiceRoleClient();
      await supabase
        .from('orders')
        .update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', charge.payment_intent);
    } catch (e) {
      console.error('[stripe webhook] failed to update refunded status', e);
    }
  }

  return NextResponse.json({ received: true });
}
