import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

export async function GET() {
  const { supabase } = await requireAdmin('/admin/products');
  const { data, error } = await supabase
    .from('products')
    .select('id, handle, title, status, published, vendor, product_type, tags, updated_at')
    .order('updated_at', { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data ?? [] });
}

export async function POST(req: Request) {
  const { supabase, user } = await requireAdmin('/admin/products');
  const body = (await req.json().catch(() => null)) as null | Partial<{
    handle: string;
    title: string;
    description_html: string;
    vendor: string | null;
    product_type: string | null;
    tags: string[];
    status: 'draft' | 'active' | 'archived';
    published: boolean;
    seo_title: string | null;
    seo_description: string | null;
  }>;

  const handle = String(body?.handle ?? '').trim();
  const title = String(body?.title ?? '').trim();
  if (!handle || !title) return NextResponse.json({ error: 'Missing handle/title' }, { status: 400 });

  const insert = {
    handle,
    title,
    description_html: String(body?.description_html ?? ''),
    vendor: body?.vendor ?? null,
    product_type: body?.product_type ?? null,
    tags: Array.isArray(body?.tags) ? body!.tags.map(String) : [],
    status: (body?.status as any) ?? 'draft',
    published: Boolean(body?.published ?? false),
    seo_title: body?.seo_title ?? null,
    seo_description: body?.seo_description ?? null,
  };

  const { data, error } = await supabase.from('products').insert(insert).select('id, handle').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'product',
    entity_id: data.id,
    action: 'create',
    before: null,
    after: insert,
  } as any);

  return NextResponse.json({ product: data });
}

