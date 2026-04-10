import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

function csvEscape(val: unknown) {
  const s = String(val ?? '');
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const { supabase } = await requireAdmin('/admin/products');
  const { data: products, error } = await supabase
    .from('products')
    .select(
      `
      id, handle, title, description_html, vendor, product_type, product_category, tags, published, seo_title, seo_description, status,
      variants:variants(id,title,price,compare_at_price,sku,option1,inventory_quantity),
      images:product_images(storage_path,position)
    `,
    )
    .order('updated_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Shopify-ish CSV: one row per variant; images are best-effort (first image only in this MVP)
  const header = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Type',
    'Tags',
    'Published',
    'SEO Title',
    'SEO Description',
    'Option1 Value',
    'Variant SKU',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Inventory Qty',
    'Image Src',
    'Image Position',
  ];

  const lines = [header.join(',')];
  for (const p of products ?? []) {
    const tags = Array.isArray((p as any).tags) ? (p as any).tags.join(', ') : '';
    const imgs = Array.isArray((p as any).images) ? (p as any).images.slice().sort((a: any, b: any) => (a.position ?? 1) - (b.position ?? 1)) : [];
    const firstImg = imgs[0]?.storage_path ? `/${String(imgs[0].storage_path).replace(/^\/+/, '')}` : '';
    const variants = Array.isArray((p as any).variants) && (p as any).variants.length > 0 ? (p as any).variants : [{ title: (p as any).title, price: 0 }];

    for (const v of variants) {
      const row = [
        (p as any).handle,
        (p as any).title,
        (p as any).description_html ?? '',
        (p as any).vendor ?? '',
        (p as any).product_type ?? '',
        tags,
        (p as any).published ? 'TRUE' : 'FALSE',
        (p as any).seo_title ?? '',
        (p as any).seo_description ?? '',
        v.option1 ?? v.title ?? '',
        v.sku ?? '',
        v.price ?? 0,
        v.compare_at_price ?? '',
        v.inventory_quantity ?? '',
        firstImg,
        firstImg ? 1 : '',
      ].map(csvEscape);
      lines.push(row.join(','));
    }
  }

  const csv = lines.join('\n');
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename=\"superspec-products-export.csv\"',
    },
  });
}

