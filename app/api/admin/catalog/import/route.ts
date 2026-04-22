import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

function csvBool(input: unknown) {
  if (typeof input === 'boolean') return input;
  if (typeof input !== 'string') return false;
  return input.trim().toLowerCase() === 'true' || input.trim().toLowerCase() === 'yes';
}

function toNumber(input: unknown): number | null {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (typeof input !== 'string') return null;
  const n = Number.parseFloat(input);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  const { supabase, user } = await requireAdmin('/admin/products');

  // `Request#formData()` resolves to the DOM FormData at runtime; some TS lib setups type it as Node’s FormData (no `.get`).
  const form = (await req.formData()) as unknown as { get: (name: string) => FormDataEntryValue | null };
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file field' }, { status: 400 });
  }
  const raw = await file.text();

  const records = parse(raw, {
    columns: true,
    relax_quotes: true,
    relax_column_count: true,
    skip_empty_lines: true,
  }) as Array<Record<string, unknown>>;

  // Upsert products by handle, gather variant rows by handle
  const byHandle = new Map<
    string,
    {
      title: string;
      description_html: string;
      vendor: string | null;
      product_type: string | null;
      product_category: string | null;
      tags: string[];
      published: boolean;
      status: 'draft' | 'active' | 'archived';
      seo_title: string | null;
      seo_description: string | null;
      variants: Array<{ title: string; sku: string | null; option1: string | null; price: number; compare_at_price: number | null; inventory_quantity: number | null }>;
    }
  >();

  for (const r of records) {
    const handle = typeof r.Handle === 'string' ? r.Handle.trim() : '';
    if (!handle) continue;
    const title = typeof r.Title === 'string' ? r.Title.trim() : handle;
    const body = typeof r['Body (HTML)'] === 'string' ? r['Body (HTML)'].trim() : '';
    const vendor = typeof r.Vendor === 'string' ? r.Vendor.trim() : '';
    const pType = typeof r.Type === 'string' ? r.Type.trim() : '';
    const pCat = typeof r['Product Category'] === 'string' ? r['Product Category'].trim() : '';
    const tags = typeof r.Tags === 'string' ? r.Tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    const published = csvBool(r.Published);

    const seoT = typeof r['SEO Title'] === 'string' ? r['SEO Title'].trim() : '';
    const seoD = typeof r['SEO Description'] === 'string' ? r['SEO Description'].trim() : '';

    const option1 = typeof r['Option1 Value'] === 'string' ? r['Option1 Value'].trim() : '';
    const sku = typeof r['Variant SKU'] === 'string' ? r['Variant SKU'].trim() : '';
    const price = toNumber(r['Variant Price']) ?? 0;
    const compareAt = toNumber(r['Variant Compare At Price']);
    const inv = typeof r['Variant Inventory Qty'] === 'string' ? Number.parseInt(r['Variant Inventory Qty'], 10) : null;

    const existing =
      byHandle.get(handle) ??
      ({
        title,
        description_html: body,
        vendor: vendor || null,
        product_type: pType || null,
        product_category: pCat || null,
        tags,
        published,
        status: published ? 'active' : 'draft',
        seo_title: seoT || null,
        seo_description: seoD || null,
        variants: [],
      });

    // prefer longest description
    const desc = body.length > existing.description_html.length ? body : existing.description_html;
    const mergedTags = Array.from(new Set([...(existing.tags ?? []), ...tags]));
    const status: 'draft' | 'active' | 'archived' = published ? 'active' : existing.status;

    const next = {
      ...existing,
      title: existing.title || title,
      description_html: desc,
      vendor: existing.vendor || (vendor || null),
      product_type: existing.product_type || (pType || null),
      product_category: existing.product_category || (pCat || null),
      tags: mergedTags,
      published: existing.published || published,
      status,
      seo_title: existing.seo_title || (seoT || null),
      seo_description: existing.seo_description || (seoD || null),
      variants: existing.variants,
    };

    next.variants.push({
      title: option1 || title,
      sku: sku || null,
      option1: option1 || null,
      price,
      compare_at_price: compareAt,
      inventory_quantity: Number.isFinite(inv as any) ? (inv as any) : null,
    });

    byHandle.set(handle, next);
  }

  const handles = Array.from(byHandle.keys());
  if (handles.length === 0) return NextResponse.json({ ok: true, imported: 0 });

  // Upsert products
  const upserts = handles.map((h) => ({ handle: h, ...byHandle.get(h)! }));
  const { data: upserted, error: upErr } = await supabase
    .from('products')
    .upsert(
      upserts.map((p) => ({
        handle: p.handle,
        title: p.title,
        description_html: p.description_html,
        vendor: p.vendor,
        product_type: p.product_type,
        product_category: p.product_category,
        tags: p.tags,
        published: p.published,
        status: p.status,
        seo_title: p.seo_title,
        seo_description: p.seo_description,
      })),
      { onConflict: 'handle' },
    )
    .select('id, handle');

  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const idByHandle = new Map<string, string>((upserted ?? []).map((x: any) => [String(x.handle), String(x.id)]));

  // Replace variants per product (MVP)
  for (const h of handles) {
    const pid = idByHandle.get(h);
    if (!pid) continue;
    await supabase.from('variants').delete().eq('product_id', pid);
    const vars = byHandle.get(h)!.variants;
    if (vars.length > 0) {
      await supabase.from('variants').insert(vars.map((v) => ({ ...v, product_id: pid })));
    }
  }

  await supabase.from('audit_log').insert({
    actor_user_id: user.id,
    entity_type: 'catalog',
    entity_id: null,
    action: 'csv_import',
    before: null,
    after: { handlesImported: handles.length, filename: file.name },
  } as any);

  return NextResponse.json({ ok: true, imported: handles.length });
}

