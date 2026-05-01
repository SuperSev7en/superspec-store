import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { Resend } from 'resend';
import { shippingNotificationHtml } from '@/lib/email/templates/shippingNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'nodejs';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin(`/admin/orders/${id}`);
  const body = (await req.json().catch(() => null)) as null | { carrier?: string; tracking_number?: string };

  const carrier = typeof body?.carrier === 'string' ? body.carrier.trim() : null;
  const tracking_number = typeof body?.tracking_number === 'string' ? body.tracking_number.trim() : null;

  const { data: f, error } = await supabase
    .from('fulfillments')
    .insert({
      order_id: id,
      status: 'in_transit',
      carrier,
      tracking_number,
      shipped_at: new Date().toISOString(),
    })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('orders').update({
    status: 'fulfilled',
    fulfillment_status: 'fulfilled',
    tracking_number,
    tracking_carrier: carrier,
  }).eq('id', id);

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'order',
    entity_id: id,
    action: 'fulfill',
    before: null,
    after: { fulfillment: f },
  } as any);

  // Send shipping notification email to customer
  try {
    if (process.env.RESEND_API_KEY && tracking_number && carrier) {
      const { data: order } = await supabase
        .from('orders')
        .select('email, order_number')
        .eq('id', id)
        .single();

      if (order?.email) {
        const carrierUrls: Record<string, string> = {
          ups: `https://www.ups.com/track?tracknum=${tracking_number}`,
          fedex: `https://www.fedex.com/fedextrack/?trknbr=${tracking_number}`,
          usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`,
        };
        const trackingUrl = carrierUrls[carrier.toLowerCase()] ||
          `https://www.google.com/search?q=${carrier}+tracking+${tracking_number}`;

        await resend.emails.send({
          from: 'SUPER Spec <orders@superspec.studio>',
          to: order.email,
          subject: `Your Order Has Shipped — ${order.order_number}`,
          html: shippingNotificationHtml({
            orderNumber: order.order_number,
            trackingNumber: tracking_number,
            carrier,
            trackingUrl,
          }),
        });
      }
    }
  } catch (emailErr) {
    console.error('[fulfill] Failed to send shipping email:', emailErr);
  }

  return NextResponse.json({ ok: true, fulfillment: f });
}

