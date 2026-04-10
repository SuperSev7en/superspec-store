import { createClient } from '@/lib/supabase';

export type DbVariant = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  sku?: string | null;
  option1?: string | null;
  inventoryQuantity?: number;
};

export type DbProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  vendor?: string | null;
  productType?: string | null;
  productCategory?: string | null;
  tags: string[];
  images: string[];
  variants: DbVariant[];
  published: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

function storagePublicUrl(storagePath: string) {
  // Bucket is public; this path is returned by Storage upload (e.g. `product-media/<productId>/<file>`).
  // We use the public URL endpoint so the storefront can render without signed URLs.
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${storagePath.replace(/^\/+/, '')}`;
}

export async function loadCatalogFromSupabase(): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select(
      `
      id, handle, title, description_html, vendor, product_type, product_category, tags, published, seo_title, seo_description,
      variants:variants(id,title,price,compare_at_price,sku,option1,inventory_quantity),
      images:product_images(storage_path,alt,position)
    `,
    )
    .order('updated_at', { ascending: false });

  if (error || !products) return [];

  return products.map((p: any) => {
    const imgs = Array.isArray(p.images)
      ? p.images
          .slice()
          .sort((a: { position?: number | null }, b: { position?: number | null }) => (a.position ?? 1) - (b.position ?? 1))
      : [];
    return {
      id: String(p.id),
      handle: String(p.handle),
      title: String(p.title ?? ''),
      descriptionHtml: String(p.description_html ?? ''),
      vendor: p.vendor ?? null,
      productType: p.product_type ?? null,
      productCategory: p.product_category ?? null,
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
      published: Boolean(p.published),
      seoTitle: p.seo_title ?? null,
      seoDescription: p.seo_description ?? null,
      images: imgs.map((im: any) => storagePublicUrl(String(im.storage_path))),
      variants: Array.isArray(p.variants)
        ? p.variants.map((v: any) => ({
            id: String(v.id),
            title: String(v.title ?? ''),
            price: Number(v.price ?? 0),
            compareAtPrice: v.compare_at_price ?? null,
            sku: v.sku ?? null,
            option1: v.option1 ?? null,
            inventoryQuantity: typeof v.inventory_quantity === 'number' ? v.inventory_quantity : undefined,
          }))
        : [],
    } satisfies DbProduct;
  });
}

export async function getProductByHandleFromSupabase(handle: string): Promise<DbProduct | null> {
  const supabase = await createClient();
  const { data: p, error } = await supabase
    .from('products')
    .select(
      `
      id, handle, title, description_html, vendor, product_type, product_category, tags, published, seo_title, seo_description,
      variants:variants(id,title,price,compare_at_price,sku,option1,inventory_quantity),
      images:product_images(storage_path,alt,position)
    `,
    )
    .eq('handle', handle)
    .maybeSingle();
  if (error || !p) return null;

  const imgs = Array.isArray((p as any).images)
    ? (p as any).images
        .slice()
        .sort((a: { position?: number | null }, b: { position?: number | null }) => (a.position ?? 1) - (b.position ?? 1))
    : [];

  return {
    id: String((p as any).id),
    handle: String((p as any).handle),
    title: String((p as any).title ?? ''),
    descriptionHtml: String((p as any).description_html ?? ''),
    vendor: (p as any).vendor ?? null,
    productType: (p as any).product_type ?? null,
    productCategory: (p as any).product_category ?? null,
    tags: Array.isArray((p as any).tags) ? (p as any).tags.map(String) : [],
    published: Boolean((p as any).published),
    seoTitle: (p as any).seo_title ?? null,
    seoDescription: (p as any).seo_description ?? null,
    images: imgs.map((im: any) => storagePublicUrl(String(im.storage_path))),
    variants: Array.isArray((p as any).variants)
      ? (p as any).variants.map((v: any) => ({
          id: String(v.id),
          title: String(v.title ?? ''),
          price: Number(v.price ?? 0),
          compareAtPrice: v.compare_at_price ?? null,
          sku: v.sku ?? null,
          option1: v.option1 ?? null,
          inventoryQuantity: typeof v.inventory_quantity === 'number' ? v.inventory_quantity : undefined,
        }))
      : [],
  } satisfies DbProduct;
}

function normalizeTag(t: string) {
  return t.trim().toLowerCase().replace(/\s+/g, '-');
}

export async function getProductsForCollectionHandleFromSupabase(collectionHandle: string, limit: number): Promise<DbProduct[]> {
  const h = collectionHandle.trim().toLowerCase();
  if (!h) return [];
  const catalog = await loadCatalogFromSupabase();

  const matched = catalog.filter((p) => {
    const tags = p.tags.map(normalizeTag);
    if (tags.includes(h) || tags.includes(`collection:${h}`) || tags.some((t) => t.replace(/^collection:/, '') === h)) {
      return true;
    }

    // Heuristic fallback: many imported catalogs don't preserve collection tags.
    // Try handle keyword matching over title/vendor/type and tags.
    const keywords = h.split('-').filter(Boolean);
    const hay = normalizeTag([p.title, p.vendor ?? '', p.productType ?? '', p.productCategory ?? '', p.tags.join(' ')].join(' '));
    return keywords.every((k) => hay.includes(k));
  });

  return matched.slice(0, Math.max(0, limit));
}

