import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin(`/admin/products/${id}`);
  const body = (await req.json().catch(() => null)) as null | {
    storage_path?: string;
    alt?: string | null;
    position?: number;
    width?: number | null;
    height?: number | null;
  };
  if (!body?.storage_path) return NextResponse.json({ error: 'Missing storage_path' }, { status: 400 });

  const insert = {
    product_id: id,
    storage_path: String(body.storage_path),
    alt: body.alt ?? null,
    position: typeof body.position === 'number' ? body.position : 1,
    width: typeof body.width === 'number' ? body.width : null,
    height: typeof body.height === 'number' ? body.height : null,
  };

  const { data, error } = await supabase.from('product_images').insert(insert).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product_image',
    entity_id: data.id,
    action: 'create',
    before: null,
    after: insert,
  } as any);

  return NextResponse.json({ image: data });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin(`/admin/products/${id}`);
  const body = (await req.json().catch(() => null)) as null | { images?: Array<{ id: string; position: number; alt?: string | null }> };
  if (!body?.images || !Array.isArray(body.images)) return NextResponse.json({ error: 'Missing images' }, { status: 400 });

  // Reorder/update alts in a best-effort loop (small N). For larger N we’ll use a single SQL RPC later.
  for (const im of body.images) {
    if (!im?.id) continue;
    await supabase
      .from('product_images')
      .update({ position: Number(im.position) || 1, ...(im.alt !== undefined ? { alt: im.alt } : {}) })
      .eq('id', im.id)
      .eq('product_id', id);
  }

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product',
    entity_id: id,
    action: 'reorder_images',
    before: null,
    after: { images: body.images },
  } as any);

  return NextResponse.json({ ok: true });
}

