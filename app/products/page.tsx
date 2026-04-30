import { loadCatalog } from "@/lib/catalog/catalog";
import { loadCatalogFromSupabase } from "@/lib/catalog/supabaseCatalog";
import { stripHtml } from "@/lib/catalog/htmlUtils";
import {
  ProductCatalogClient,
  type CatalogRowProduct,
} from "@/components/store/ProductCatalogClient";

export const revalidate = 0;

export default async function ProductsPage() {
  const fromDb = await loadCatalogFromSupabase();
  const raw = fromDb.length > 0 ? fromDb : await loadCatalog();

  const products: CatalogRowProduct[] = raw.map((product) => {
    const excerpt = stripHtml(product.descriptionHtml);
    const short = excerpt.length > 180 ? `${excerpt.slice(0, 180)}…` : excerpt;
    return { ...product, listingExcerpt: short || undefined };
  });

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">Products</h1>
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
