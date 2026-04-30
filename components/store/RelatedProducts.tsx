"use client";

import { CatalogRowProduct } from "@/components/store/ProductCatalogClient";
import { ProductItem } from "@/components/shopify/sections/ProductItem";

export function RelatedProducts({
  products,
}: {
  products: CatalogRowProduct[];
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="Section Section--spacingNormal">
      <header className="SectionHeader SectionHeader--center">
        <h3 className="SectionHeader__Heading Heading u-h3">
          You May Also Like
        </h3>
      </header>
      <div
        className="ProductList ProductList--grid Grid"
        style={{ marginTop: 30 }}
      >
        {products.map((product) => (
          <ProductItem
            key={product.handle}
            product={product}
            showProductInfo
            showLabels
            cellClassName="Grid__Cell 1/2--phone 1/3--tablet 1/4--lap-and-up"
          />
        ))}
      </div>
    </section>
  );
}
