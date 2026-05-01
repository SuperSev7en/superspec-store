import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { Resend } from 'resend';
import { orderConfirmationHtml } from '@/lib/email/templates/orderConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { paymentIntentId, cart, email, address, total } = await req.json();

    if (!paymentIntentId || !cart || cart.length === 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const supabase = await createClient();

    // Idempotency: check if order already exists for this payment intent
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('order_number')
      .eq('stripe_payment_intent_id', paymentIntentId)
      .single();

    if (existingOrder) {
      return NextResponse.json({ orderNumber: existingOrder.order_number });
    }
    
    // Generate order number
    const orderNumber = `SP-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    // 1. Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        email,
        total: total,
        status: 'paid',
        stripe_payment_intent_id: paymentIntentId,
        currency: 'USD',
        fulfillment_status: 'unfulfilled',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      // We continue anyway to show success page, but log it
    }

    // 2. Insert order_items and decrement inventory
    const orderId = order?.id;
    if (orderId) {
      for (const item of cart) {
        if (item.variantId) {
          // Insert item
          await supabase.from('order_items').insert({
            order_id: orderId,
            product_id: (await supabase.from('products').select('id').eq('handle', item.handle).single()).data?.id,
            variant_id: item.variantId,
            quantity: item.quantity,
            price: item.price
          });

          // Decrement inventory
          const { data: v } = await supabase.from('variants').select('inventory_quantity').eq('id', item.variantId).single();
          if (v) {
            await supabase.from('variants').update({ 
              inventory_quantity: Math.max(0, v.inventory_quantity - item.quantity) 
            }).eq('id', item.variantId);
          }
        }
      }
    }

    // 3. Trigger order confirmation email via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        const items = cart.map((item: any) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          variantTitle: item.variantTitle,
        }));

        await resend.emails.send({
          from: 'SUPER Spec <orders@superspec.studio>',
          to: email,
          subject: `Order Confirmed — ${orderNumber}`,
          html: orderConfirmationHtml({
            orderNumber,
            email,
            total,
            items,
            address,
            shippingMethod: 'standard',
          }),
        });
      }
    } catch (emailErr) {
      console.error('Failed to send email:', emailErr);
    }

    // 4. Schedule post-purchase email flow
    try {
      await supabase.from('scheduled_emails').insert([
        {
          to_email: email,
          template: 'review_request',
          subject: 'How was your order? Leave a review.',
          send_at: new Date(Date.now() + 7 * 86400000).toISOString(),
          status: 'pending',
          metadata: { order_number: orderNumber },
        },
        {
          to_email: email,
          template: 'reorder_nudge',
          subject: "Time to restock? We're ready when you are.",
          send_at: new Date(Date.now() + 45 * 86400000).toISOString(),
          status: 'pending',
          metadata: { order_number: orderNumber },
        },
      ]);
    } catch {
      // Table may not exist yet — graceful degradation
    }

    return NextResponse.json({ orderNumber });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
