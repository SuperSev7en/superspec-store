import { getProductsForCollectionHandle, loadCatalog } from '@/lib/catalog/catalog';
import { getProductsForCollectionHandleFromSupabase, loadCatalogFromSupabase } from '@/lib/catalog/supabaseCatalog';
import { ProductCatalogClient } from '@/components/store/ProductCatalogClient';

export const revalidate = 0;

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const fromDb = await getProductsForCollectionHandleFromSupabase(handle, 500);
  const matched = fromDb.length > 0 ? fromDb : await getProductsForCollectionHandle(handle, 500);
  const fallbackCatalog = await loadCatalogFromSupabase();
  const fallback = fallbackCatalog.length > 0 ? fallbackCatalog : await loadCatalog();
  const products = matched.length > 0 ? matched : fallback;
  const title = handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">{title}</h1>
        </header>

        <ProductCatalogClient
          products={products}
          layout="collection"
          collectionCellClassName="Grid__Cell 1/2--phone 1/2--tablet 1/3--lap-and-up"
        />
      </div>
    </div>
  );
}
