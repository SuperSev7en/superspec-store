import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin(`/admin/products/${id}`);
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      id, handle, title, description_html, vendor, product_type, product_category, tags, status, published, seo_title, seo_description, updated_at,
      variants:variants(id,title,price,compare_at_price,sku,option1,inventory_quantity),
      images:product_images(id,storage_path,alt,position,width,height)
    `,
    )
    .eq('id', id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product: data });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin(`/admin/products/${id}`);
  const patch = (await req.json().catch(() => null)) as null | Record<string, unknown>;
  if (!patch) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const before = await supabase.from('products').select('*').eq('id', id).maybeSingle();
  if (before.error) return NextResponse.json({ error: before.error.message }, { status: 500 });

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
  for (const k of allowed) {
    if (k in patch) update[k] = patch[k];
  }

  const { data, error } = await supabase.from('products').update(update).eq('id', id).select('id, handle').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product',
    entity_id: id,
    action: 'update',
    before: before.data,
    after: update,
  } as any);

  return NextResponse.json({ product: data });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin(`/admin/products/${id}`);
  const before = await supabase.from('products').select('*').eq('id', id).maybeSingle();

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product',
    entity_id: id,
    action: 'delete',
    before: before.data ?? null,
    after: null,
  } as any);

  return NextResponse.json({ ok: true });
}

