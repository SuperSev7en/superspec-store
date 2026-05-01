import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { parse } from 'csv-parse/sync';

export type CatalogVariant = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  sku?: string | null;
  option1?: string | null;
  inventoryQuantity?: number;
};

export type CatalogProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  vendor?: string | null;
  productType?: string | null;
  productCategory?: string | null;
  tags: string[];
  images: string[];
  variants: CatalogVariant[];
  published: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt?: string | null;
};

type Manifest = Record<string, { localPath: string; filename: string }>;

type ImageSlot = { pos: number; url: string };

const ROOT = process.cwd();
const CSV_PATHS = [
  path.join(ROOT, 'shopify files copy', 'products_export 3.csv'),
];

const MANIFEST_PATH = path.join(ROOT, 'public', 'assets', 'product-images', 'manifest.json');

function toNumber(input: unknown): number | null {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (typeof input !== 'string') return null;
  const n = Number.parseFloat(input);
  return Number.isFinite(n) ? n : null;
}

function toInt(input: unknown): number | null {
  if (typeof input === 'number' && Number.isFinite(input)) return Math.trunc(input);
  if (typeof input !== 'string' || !input.trim()) return null;
  const n = Number.parseInt(input, 10);
  return Number.isFinite(n) ? n : null;
}

function csvBool(input: unknown) {
  if (typeof input === 'boolean') return input;
  if (typeof input !== 'string') return false;
  return input.trim().toLowerCase() === 'true';
}

async function readManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(raw) as Manifest;
  } catch {
    return {};
  }
}

function manifestLookup(url: string, manifest: Manifest): string | undefined {
  const direct = manifest[url];
  if (direct) return direct.localPath;

  const noQuery = url.split('?')[0];
  if (noQuery !== url && manifest[noQuery]) return manifest[noQuery].localPath;

  for (const [key, val] of Object.entries(manifest)) {
    if (key.split('?')[0] === noQuery) return val.localPath;
  }
  return undefined;
}

function mapImageUrl(url: string, manifest: Manifest) {
  const local = manifestLookup(url.trim(), manifest);
  if (local) return local;
  return url;
}

function addImageSlot(map: Map<string, ImageSlot[]>, handle: string, rawUrl: string, sortKey: number, manifest: Manifest) {
  const u = rawUrl.trim();
  if (!u) return;
  const mapped = mapImageUrl(u, manifest);
  let list = map.get(handle);
  if (!list) {
    list = [];
    map.set(handle, list);
  }
  if (list.some((x) => x.url === mapped)) return;
  list.push({ pos: sortKey, url: mapped });
}

function isPublished(r: Record<string, any>) {
  const status = String(r.Status || '').toLowerCase();
  if (status === 'active') return true;
  return csvBool(r.Published);
}

export async function loadCatalog(): Promise<CatalogProduct[]> {
  const manifest = await readManifest();

  const byHandle = new Map<string, CatalogProduct>();
  const imageSlots = new Map<string, ImageSlot[]>();
  let rowCounter = 0;

  for (const csvPath of CSV_PATHS) {
    let raw: string;
    try {
      raw = await readFile(csvPath, 'utf8');
    } catch {
      continue;
    }
    const records = parse(raw, {
      columns: true,
      relax_quotes: true,
      relax_column_count: true,
      skip_empty_lines: true,
    }) as Array<Record<string, any>>;

    for (const r of records) {
      rowCounter += 1;
      const handle = typeof r.Handle === 'string' ? r.Handle.trim() : '';
      if (!handle) continue;

      const body = typeof r['Body (HTML)'] === 'string' ? r['Body (HTML)'].trim() : '';
      const title = typeof r.Title === 'string' ? r.Title.trim() : '';

      const existing =
        byHandle.get(handle) ??
        ({
          id: handle,
          handle,
          title: title || handle,
          descriptionHtml: '',
          vendor: null,
          productType: null,
          productCategory: null,
          tags: [],
          images: [],
          variants: [],
          published: isPublished(r),
          seoTitle: null,
          seoDescription: null,
        } satisfies CatalogProduct);

      if (body.length > existing.descriptionHtml.length) {
        existing.descriptionHtml = body;
      }
      if (!existing.title && title) existing.title = title;

      const vendor = typeof r.Vendor === 'string' ? r.Vendor.trim() : '';
      if (vendor && !existing.vendor) existing.vendor = vendor;

      const pType = typeof r.Type === 'string' ? r.Type.trim() : '';
      if (pType && !existing.productType) existing.productType = pType;

      const pCat = typeof r['Product Category'] === 'string' ? r['Product Category'].trim() : '';
      if (pCat && !existing.productCategory) existing.productCategory = pCat;

      const seoT = typeof r['SEO Title'] === 'string' ? r['SEO Title'].trim() : '';
      if (seoT && !existing.seoTitle) existing.seoTitle = seoT;

      const seoD = typeof r['SEO Description'] === 'string' ? r['SEO Description'].trim() : '';
      if (seoD && !existing.seoDescription) existing.seoDescription = seoD;

      if (typeof r.Tags === 'string' && r.Tags.trim()) {
        const rowTags = r.Tags.split(',').map((t) => t.trim()).filter(Boolean);
        const merged = new Set([...existing.tags, ...rowTags]);
        existing.tags = Array.from(merged);
      }

      // If any row for this handle is active, the whole product is active
      existing.published = existing.published || isPublished(r);

      const imgPos = toInt(r['Image Position']);
      const sortBase = imgPos !== null && imgPos > 0 ? imgPos * 1000 : 1_000_000 + rowCounter;

      const imgSrc = typeof r['Image Src'] === 'string' ? r['Image Src'] : '';
      if (imgSrc) addImageSlot(imageSlots, handle, imgSrc, sortBase, manifest);

      const vImg = typeof r['Variant Image'] === 'string' ? r['Variant Image'] : '';
      if (vImg) addImageSlot(imageSlots, handle, vImg, sortBase + 1, manifest);

      const option1 = typeof r['Option1 Value'] === 'string' ? r['Option1 Value'].trim() : null;
      const sku = typeof r['Variant SKU'] === 'string' ? r['Variant SKU'].trim() : null;
      const price = toNumber(r['Variant Price']);
      if (price !== null) {
        const compareAt = toNumber(r['Variant Compare At Price']);
        const variantId = `${handle}:${sku ?? option1 ?? existing.variants.length}`;
        existing.variants.push({
          id: variantId,
          title: option1 ?? existing.title,
          price,
          compareAtPrice: compareAt,
          sku,
          option1,
        });
      }

      byHandle.set(handle, existing);
    }
  }

  for (const p of byHandle.values()) {
    const slots = imageSlots.get(p.handle) ?? [];
    slots.sort((a, b) => a.pos - b.pos || a.url.localeCompare(b.url));
    p.images = slots.map((s) => s.url);
  }

  return Array.from(byHandle.values()).filter((p) => p.published);
}

export async function getProductByHandle(handle: string) {
  const products = await loadCatalog();
  return products.find((p) => p.handle === handle) ?? null;
}

function normalizeTag(t: string) {
  return t.trim().toLowerCase().replace(/\s+/g, '-');
}

/** Match CSV products to a Shopify collection handle via tags or smart heuristics. */
export async function getProductsForCollectionHandle(collectionHandle: string, limit: number) {
  const h = collectionHandle.trim().toLowerCase();
  if (!h) return [];
  const catalog = await loadCatalog();
  if (h === 'all') return catalog.slice(0, Math.max(0, limit));

  const matched = catalog.filter((p) => {
    const tags = p.tags.map(normalizeTag);
    // 1. Direct tag match
    if (tags.includes(h) || tags.includes(`collection:${h}`)) return true;

    // 2. Multi-word tag/handle decomposition
    const parts = h.split('-');
    if (parts.length > 1) {
      if (parts.every(part => tags.some(t => t.includes(part)))) return true;
    }

    // 3. Keyword heuristic on title/type/vendor
    const keywords = h.split('-').filter((k) => k.length >= 3);
    const searchable = normalizeTag([p.title, p.vendor ?? '', p.productType ?? '', p.tags.join(' ')].join(' '));
    if (keywords.length > 0 && keywords.every(k => searchable.includes(k))) return true;

    return false;
  });

  return matched.slice(0, Math.max(0, limit));
}
