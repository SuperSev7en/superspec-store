import { getProductsForCollectionHandle, loadCatalog } from '@/lib/catalog/catalog';
import { ProductItem } from '@/components/shopify/sections/ProductItem';

export const revalidate = 0;

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const products = await getProductsForCollectionHandle(handle, 500);
  const fallback = products.length === 0 ? await loadCatalog() : products;
  const list = products.length > 0 ? products : fallback;
  const title = handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">{title}</h1>
          {products.length === 0 ? (
            <p className="Text--subdued" style={{ marginTop: 8 }}>
              No products tagged for this collection yet; showing the full catalog. Add tag{' '}
              <strong>{handle}</strong> or <strong>collection:{handle}</strong> to products in your CSV to filter
              this page.
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
