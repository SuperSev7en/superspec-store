import { getProductsForCollectionHandle, loadCatalog } from '@/lib/catalog/catalog';
import { getProductsForCollectionHandleFromSupabase, loadCatalogFromSupabase } from '@/lib/catalog/supabaseCatalog';
import { ProductItem } from '@/components/shopify/sections/ProductItem';

export const revalidate = 0;

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const fromDb = await getProductsForCollectionHandleFromSupabase(handle, 500);
  const products = fromDb.length > 0 ? fromDb : await getProductsForCollectionHandle(handle, 500);
  const fallbackCatalog = await loadCatalogFromSupabase();
  const fallback = products.length === 0 ? (fallbackCatalog.length > 0 ? fallbackCatalog : await loadCatalog()) : products;
  const list = products.length > 0 ? products : fallback;
  const title = handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">{title}</h1>
          {products.length === 0 ? (
            <p className="Text--subdued" style={{ marginTop: 8 }}>
              No products explicitly matched this collection yet; showing the full catalog for now.
            </p>
          ) : null}
        </header>

        <div className="ProductList ProductList--grid ProductList--spacingNormal Grid">
          {list.map((product) => (
            <ProductItem
              key={product.handle}
              product={product}
              showProductInfo
              showVendor={false}
              showLabels
              cellClassName="Grid__Cell 1/2--phone 1/2--tablet 1/3--lap-and-up"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
