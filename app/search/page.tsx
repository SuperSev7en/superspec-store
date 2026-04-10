import type { Metadata } from 'next';
import { loadCatalog } from '@/lib/catalog/catalog';
import { loadCatalogFromSupabase } from '@/lib/catalog/supabaseCatalog';
import { stripHtml } from '@/lib/catalog/htmlUtils';
import { ProductCatalogClient, type CatalogRowProduct } from '@/components/store/ProductCatalogClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search products on SUPER Spec.',
};

export const revalidate = 0;

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? normalize(q) : '';
  const fromDb = await loadCatalogFromSupabase();
  const catalog = fromDb.length > 0 ? fromDb : await loadCatalog();

  const results =
    query.length === 0
      ? []
      : catalog.filter((p) => {
          const hay = normalize(
            [
              p.title,
              p.handle,
              p.vendor ?? '',
              p.productType ?? '',
              p.tags.join(' '),
              stripHtml(p.descriptionHtml),
            ].join(' '),
          );
          const words = query.split(/\s+/).filter(Boolean);
          return words.every((w) => hay.includes(w));
        });

  const rows: CatalogRowProduct[] = results.map((product) => {
    const excerpt = stripHtml(product.descriptionHtml);
    const short = excerpt.length > 140 ? `${excerpt.slice(0, 140)}…` : excerpt;
    return { ...product, listingExcerpt: short || undefined };
  });

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">Search</h1>
          <form action="/search" method="get" className="Form" style={{ marginTop: 16, maxWidth: 480 }}>
            <div className="Form__Item">
              <input
                type="search"
                name="q"
                defaultValue={q ?? ''}
                className="Form__Input"
                placeholder="Search products"
                aria-label="Search products"
              />
              <label className="Form__FloatingLabel">Search</label>
            </div>
            <button type="submit" className="Button Button--primary" style={{ marginTop: 12 }}>
              Search
            </button>
          </form>
        </header>

        {!query ? (
          <p className="Text--subdued">Enter a search term to find products.</p>
        ) : results.length === 0 ? (
          <p className="Text--subdued">No products matched &ldquo;{q}&rdquo;.</p>
        ) : (
          <ProductCatalogClient
            products={rows}
            layout="shop"
            collectionCellClassName="Grid__Cell 1/2--phone 1/2--tablet 1/3--lap-and-up"
          />
        )}
      </div>
    </div>
  );
}
