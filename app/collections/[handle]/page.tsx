import { loadCatalog } from '@/lib/catalog/catalog';
import { loadCatalogFromSupabase } from '@/lib/catalog/supabaseCatalog';
import { ProductCatalogClient, type CatalogRowProduct } from '@/components/store/ProductCatalogClient';
import { stripHtml } from '@/lib/catalog/htmlUtils';

export const revalidate = 0;

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  
  // Load full catalog to filter manually by tags if specific collection
  const fromDb = await loadCatalogFromSupabase();
  const allProducts = fromDb.length > 0 ? fromDb : await loadCatalog();
  
  let filtered = allProducts;
  let title = handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  if (handle === 'super-speck') {
    title = 'SUPER Speck';
    // User mentioned shirts are part of this division
    filtered = allProducts.filter(p => 
      p.tags.some(t => t.toLowerCase() === 'super-speck' || t.toLowerCase() === 'shirts' || t.toLowerCase() === 'clothing')
    );
  } else if (handle === 'super-spectrum') {
    title = 'SUPER Spectrum';
    // User mentioned this is for art
    filtered = allProducts.filter(p => 
      p.tags.some(t => t.toLowerCase() === 'super-spectrum' || t.toLowerCase() === 'art')
    );
  }

  const products: CatalogRowProduct[] = filtered.map((product) => {
    const excerpt = stripHtml(product.descriptionHtml);
    const short = excerpt.length > 180 ? `${excerpt.slice(0, 180)}…` : excerpt;
    return { ...product, listingExcerpt: short || undefined };
  });

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">{title}</h1>
          </div>
        </header>

        <ProductCatalogClient
          products={products}
          layout="shop"
          collectionCellClassName="Grid__Cell 1/2--phone 1/2--tablet 1/3--lap-and-up"
        />
      </div>
    </div>
  );
}
