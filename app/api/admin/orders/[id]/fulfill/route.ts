import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

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

  await supabase.from('orders').update({ status: 'fulfilled' }).eq('id', id);

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'order',
    entity_id: id,
    action: 'fulfill',
    before: null,
    after: { fulfillment: f },
  } as any);

  return NextResponse.json({ ok: true, fulfillment: f });
}

