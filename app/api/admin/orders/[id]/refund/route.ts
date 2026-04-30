import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceRoleClient } from '@/lib/supabaseServiceRole';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { amount, reason } = await req.json();

    const supabase = createServiceRoleClient();
    const { data: order } = await supabase
      .from('orders')
      .select('stripe_payment_intent_id, stripe_session_id, total')
      .eq('id', id)
      .single();

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const paymentIntentId = order.stripe_payment_intent_id;
    if (!paymentIntentId) return NextResponse.json({ error: 'No payment intent on record' }, { status: 400 });

    const refundAmount = amount ? Math.round(amount * 100) : undefined; // undefined = full refund

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: refundAmount,
      reason: reason || 'requested_by_customer',
    });

    await supabase
      .from('orders')
      .update({ status: refundAmount ? 'partially_refunded' : 'refunded' })
      .eq('id', id);

    return NextResponse.json({ refund: { id: refund.id, amount: refund.amount / 100 } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
