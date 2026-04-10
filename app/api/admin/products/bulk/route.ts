import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

export async function PATCH(req: Request) {
  const { supabase, user } = await requireAdmin('/admin/products');
  const body = (await req.json().catch(() => null)) as null | {
    ids?: string[];
    set?: Record<string, unknown>;
  };
  const ids = Array.isArray(body?.ids) ? body!.ids.map(String).filter(Boolean) : [];
  const set = body?.set && typeof body.set === 'object' ? body.set : null;
  if (ids.length === 0 || !set) return NextResponse.json({ error: 'Missing ids/set' }, { status: 400 });

  const allowed = ['status', 'published', 'vendor', 'product_type', 'tags'] as const;
  const update: Record<string, unknown> = {};
  for (const k of allowed) if (k in set) update[k] = (set as any)[k];
  if (Object.keys(update).length === 0) return NextResponse.json({ error: 'No allowed fields' }, { status: 400 });

  const { error } = await supabase.from('products').update(update).in('id', ids);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product',
    entity_id: null,
    action: 'bulk_update',
    before: null,
    after: { ids, update },
  } as any);

  return NextResponse.json({ ok: true });
}

