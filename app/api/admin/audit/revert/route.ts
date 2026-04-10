import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

// MVP undo: revert a product using an audit_log row containing `before` snapshot (from product update/delete).
export async function POST(req: Request) {
  const { supabase, user } = await requireAdmin('/admin/audit');
  const body = (await req.json().catch(() => null)) as null | { auditId?: string };
  const auditId = String(body?.auditId ?? '').trim();
  if (!auditId) return NextResponse.json({ error: 'Missing auditId' }, { status: 400 });

  const row = await supabase.from('audit_log').select('*').eq('id', auditId).maybeSingle();
  if (row.error) return NextResponse.json({ error: row.error.message }, { status: 500 });
  if (!row.data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (row.data.entity_type !== 'product') return NextResponse.json({ error: 'Only product revert supported' }, { status: 400 });
  if (!row.data.entity_id) return NextResponse.json({ error: 'Missing entity_id' }, { status: 400 });
  if (!row.data.before) return NextResponse.json({ error: 'No before snapshot' }, { status: 400 });

  const before = row.data.before as Record<string, unknown>;
  const allowed = [
    'handle',
    'title',
    'description_html',
    'vendor',
    'product_type',
    'product_category',
    'tags',
    'status',
    'published',
    'seo_title',
    'seo_description',
  ] as const;

  const update: Record<string, unknown> = {};
  for (const k of allowed) if (k in before) update[k] = (before as any)[k];

  const { error } = await supabase.from('products').update(update).eq('id', row.data.entity_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product',
    entity_id: row.data.entity_id,
    action: 'revert',
    before: null,
    after: { revertedFromAuditId: auditId },
  } as any);

  return NextResponse.json({ ok: true, productId: row.data.entity_id });
}

