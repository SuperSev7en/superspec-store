import type Stripe from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

type OrderStatus = 'pending' | 'paid' | 'unfulfilled' | 'fulfilled' | 'cancelled' | 'refunded';

/**
 * Persists a paid Checkout session as `customers`, `orders`, and `order_items`.
 * Idempotent: skips if `orders.stripe_session_id` already exists.
 */
export async function persistCheckoutSession(
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
): Promise<{
  orderId: string | null;
  orderNumber?: string | null;
  total?: number;
  currency?: string;
  skipped: boolean;
  error?: string;
}> {
  const stripeSessionId = session.id;

  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('stripe_session_id', stripeSessionId)
    .maybeSingle();
  if (existing?.id) {
    return { orderId: existing.id, skipped: true };
  }

  const email =
    session.customer_details?.email?.trim() ||
    session.customer_email?.trim() ||
    null;
  if (!email) {
    return { orderId: null, skipped: false, error: 'missing_customer_email' };
  }

  const name =
    typeof session.customer_details?.name === 'string' ? session.customer_details.name.trim() : null;

  const { data: customerRow, error: custErr } = await supabase
    .from('customers')
    .upsert({ email, name: name || null }, { onConflict: 'email' })
    .select('id')
    .single();
  if (custErr || !customerRow) {
    return { orderId: null, skipped: false, error: custErr?.message ?? 'customer_upsert_failed' };
  }

  const total = typeof session.amount_total === 'number' ? session.amount_total / 100 : 0;
  const currency = (session.currency ?? 'usd').toUpperCase();

  const { data: lastOrder } = await supabase
    .from('orders')
    .select('order_number')
    .not('order_number', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let nextNumber = 1001;
  if (lastOrder?.order_number && /^\d+$/.test(String(lastOrder.order_number))) {
    nextNumber = Number.parseInt(String(lastOrder.order_number), 10) + 1;
  }

  const status: OrderStatus = 'unfulfilled';

  const { data: orderRow, error: orderErr } = await supabase
    .from('orders')
    .insert({
      customer_id: customerRow.id,
      order_number: String(nextNumber),
      status,
      total,
      currency,
      stripe_session_id: stripeSessionId,
    })
    .select('id')
    .single();

  if (orderErr || !orderRow) {
    return { orderId: null, skipped: false, error: orderErr?.message ?? 'order_insert_failed' };
  }

  const orderId = orderRow.id as string;
  const lineItems = session.line_items?.data ?? [];

  for (const line of lineItems) {
    const qty = typeof line.quantity === 'number' ? line.quantity : 1;
    const lineCents = typeof line.amount_total === 'number' ? line.amount_total : 0;
    const lineTotal = lineCents / 100;
    const unitPrice = qty > 0 ? Math.round((lineTotal / qty) * 100) / 100 : lineTotal;

    let productId: string | null = null;
    let variantId: string | null = null;

    const price = line.price;
    const productRef = price?.product;
    if (productRef && typeof productRef === 'object' && 'metadata' in productRef) {
      const meta = (productRef as Stripe.Product).metadata ?? {};
      const handle = typeof meta.handle === 'string' ? meta.handle.trim() : '';
      const metaVariant = typeof meta.variantId === 'string' ? meta.variantId.trim() : '';
      if (handle) {
        const { data: prod } = await supabase.from('products').select('id').eq('handle', handle).maybeSingle();
        if (prod?.id) {
          productId = String(prod.id);
          if (metaVariant) {
            const { data: vari } = await supabase
              .from('variants')
              .select('id')
              .eq('id', metaVariant)
              .eq('product_id', productId)
              .maybeSingle();
            if (vari?.id) variantId = String(vari.id);
          }
        }
      }
    }

    const { error: itemErr } = await supabase.from('order_items').insert({
      order_id: orderId,
      product_id: productId,
      variant_id: variantId,
      quantity: qty,
      price: unitPrice,
    });
    if (itemErr) {
      console.error('[stripe webhook] order_items insert', itemErr.message);
    }
  }

  return {
    orderId,
    orderNumber: String(nextNumber),
    total,
    currency,
    skipped: false,
  };
}
