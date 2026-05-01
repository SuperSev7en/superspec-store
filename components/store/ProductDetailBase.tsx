"use client";

import { useState, useEffect } from "react";
import type { DbProduct } from "@/lib/catalog/supabaseCatalog";
import { ProductGallery } from "./ProductGallery";
import { StickyATC } from "./StickyATC";
import { WishlistButton } from "./WishlistButton";
import { SocialShare } from "./SocialShare";
import { ProductReviews } from "./ProductReviews";
import { RecentlyViewed } from "./RecentlyViewed";
import { RelatedProducts } from "./RelatedProducts";
import { AddToCartButton } from "./AddToCartButton";
import { ReturnPolicyBadge } from "./TrustBadges";
import { ClothingOverlay } from "./ClothingOverlay";
import { ArtOverlay } from "./ArtOverlay";
import { EngineeredOverlay } from "./EngineeredOverlay";

// Type helper for the server-passed related products
type RelatedProd = any;

export function ProductDetailBase({
  product,
  relatedProducts,
  collectionTitle,
}: {
  product: DbProduct;
  relatedProducts: RelatedProd[];
  collectionTitle?: string;
}) {
  const [activeTab, setActiveTab] = useState("description");
  const [mounted, setMounted] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(product.variants.length === 1 ? product.variants[0]?.id : undefined);

  const fallbackImage = product.images?.[0] || "";

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];
  const price = selectedVariant?.price ?? 0;
  const compareAt = selectedVariant?.compareAtPrice;
  const onSale = compareAt != null && compareAt > price;

  // Derive product type heuristics if not strictly set
  const pType = (product.productType || "").toLowerCase();
  const tags = product.tags.map((t) => t.toLowerCase());
  let derivedType = "general";
  if (
    pType === "clothing" ||
    tags.includes("clothing") ||
    product.handle.includes("-tee")
  )
    derivedType = "clothing";
  else if (
    pType === "art print" ||
    pType === "art" ||
    tags.includes("art") ||
    tags.includes("super-spectrum")
  )
    derivedType = "art";
  else if (pType === "engineered" || tags.includes("engineered"))
    derivedType = "engineered";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <section
        className="Product Product--large"
        data-section-id="product-template"
        data-section-type="product"
      >
        <div className="Product__Wrapper">
          {/* Gallery */}
          <div className="Product__Gallery Product__Gallery--withThumbnails">
            <ProductGallery images={product.images || []} alt={product.title} />
          </div>

          {/* Info */}
          <div className="Product__InfoWrapper">
            <div className="Product__Info">
              <div className="Container">
                <div className="ProductMeta">
                  {collectionTitle && (
                    <h2 className="ProductMeta__Vendor Heading u-h6">
                      {collectionTitle}
                    </h2>
                  )}
                  <h1 className="ProductMeta__Title Heading u-h2">
                    {product.title}
                  </h1>

                  <div className="ProductMeta__PriceList Heading">
                    {onSale ? (
                      <>
                        <span className="ProductMeta__Price Price Price--highlight Text--subdued u-h4">
                          ${price.toFixed(2)}
                        </span>
                        <span
                          className="ProductMeta__Price Price Price--compareAt Text--subdued u-h4"
                          style={{ textDecoration: "line-through" }}
                        >
                          ${compareAt.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="ProductMeta__Price Price Text--subdued u-h4">
                        ${price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="ProductMeta__Description Rte">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.descriptionHtml || "",
                      }}
                    />
                  </div>
                </div>

                <div className="ProductForm">
                  <div className="ProductForm__Variants">
                    {derivedType === "clothing" && (
                      <ClothingOverlay
                        product={product}
                        selectedVariantId={selectedVariantId}
                        onVariantChange={setSelectedVariantId}
                      />
                    )}
                    {derivedType === "art" && (
                      <ArtOverlay
                        product={product}
                        selectedVariantId={selectedVariantId}
                        onVariantChange={setSelectedVariantId}
                      />
                    )}
                    {derivedType === "engineered" && (
                      <EngineeredOverlay
                        product={product}
                        selectedVariantId={selectedVariantId}
                        onVariantChange={setSelectedVariantId}
                      />
                    )}
                  </div>

                  <div
                    className="ProductForm__BuyButtons"
                    style={{ marginTop: "30px", display: "flex", gap: "10px" }}
                  >
                    <AddToCartButton
                      handle={product.handle}
                      variantId={selectedVariantId}
                      title={product.title}
                      price={price}
                      image={fallbackImage}
                      variantTitle={selectedVariant?.title}
                    />
                    <WishlistButton productHandle={product.handle} />
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <SocialShare
                      title={product.title}
                      url={`https://superspec.studio/products/${product.handle}`}
                    />
                  </div>
                </div>

                {/* Return Policy */}
                <div style={{ marginTop: "30px" }}>
                  <ReturnPolicyBadge />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="Container">
        <ProductReviews productId={product.id} />

        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        <RecentlyViewed
          currentProduct={{
            handle: product.handle,
            title: product.title,
            price: `$${price.toFixed(2)}`,
            image: fallbackImage,
          }}
        />
      </div>

      <StickyATC
        productHandle={product.handle}
        title={product.title}
        price={`$${price.toFixed(2)}`}
        variantId={selectedVariantId}
        image={fallbackImage}
      />
    </>
  );
}
