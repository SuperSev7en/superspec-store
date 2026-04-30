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
  const [viewers, setViewers] = useState(2);
  const [mounted, setMounted] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(product.variants.length === 1 ? product.variants[0]?.id : undefined);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];
  const price = selectedVariant?.price ?? 0;
  const compareAt = selectedVariant?.compareAtPrice;
  const onSale = compareAt != null && compareAt > price;
  const discountPercent = onSale
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

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
    setViewers(Math.floor(Math.random() * 11) + 2);
    const interval = setInterval(() => {
      setViewers(Math.floor(Math.random() * 11) + 2);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="Container">
        {/* Breadcrumbs */}
        <nav
          className="Breadcrumb Text--subdued"
          style={{ padding: "20px 0", fontSize: 13 }}
        >
          <a href="/" className="Link Link--underline">
            Home
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          {collectionTitle ? (
            <>
              <a
                href={`/collections/${collectionTitle.toLowerCase().replace(" ", "-")}`}
                className="Link Link--underline"
              >
                {collectionTitle}
              </a>
              <span style={{ margin: "0 8px" }}>/</span>
            </>
          ) : null}
          <span>{product.title}</span>
        </nav>

        <div
          className="Product__Wrapper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            alignItems: "flex-start",
          }}
        >
          {/* Gallery */}
          <div
            className="Product__Gallery"
            style={{ flex: "1 1 500px", minWidth: 0 }}
          >
            <ProductGallery images={product.images} alt={product.title} />
          </div>

          {/* Info */}
          <div className="Product__InfoWrapper" style={{ flex: "1 1 400px" }}>
            {collectionTitle && (
              <span
                className="Text--subdued"
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  opacity: 0.6,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                {collectionTitle}
              </span>
            )}
            <h1
              className="ProductMeta__Title Heading u-h2"
              style={{ marginBottom: 12 }}
            >
              {product.title}
            </h1>

            <div
              className="ProductMeta__PriceList Heading"
              style={{
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {onSale ? (
                <>
                  <span
                    className="ProductMeta__Price Price Price--highlight Text--subdued"
                    style={{ fontSize: 24 }}
                  >
                    ${price.toFixed(2)}
                  </span>
                  <span
                    className="ProductMeta__Price Price Price--compareAt Text--subdued"
                    style={{ fontSize: 18, textDecoration: "line-through" }}
                  >
                    ${compareAt.toFixed(2)}
                  </span>
                  <span
                    className="Badge"
                    style={{
                      background: "var(--product-on-sale-color)",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                    }}
                  >
                    Save {discountPercent}%
                  </span>
                </>
              ) : (
                <span
                  className="ProductMeta__Price Price Text--subdued"
                  style={{ fontSize: 24 }}
                >
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Social Proof */}
            {mounted && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                  color: "var(--text-light-color)",
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    background: "#4ade80",
                    borderRadius: "50%",
                    animation: "pulse 2s infinite",
                  }}
                ></span>
                <strong>{viewers}</strong> people are viewing this right now
              </div>
            )}

            {/* Type Specific Overlays */}
            <div style={{ marginBottom: 30 }}>
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

            {/* General Variant Selector (if no overlay handled it and there are variants) */}
            {derivedType === "general" && product.variants.length > 1 && (
              <div style={{ marginBottom: 20 }}>
                <label
                  className="Heading u-h6"
                  style={{ display: "block", marginBottom: 8 }}
                >
                  Variant
                </label>
                <select
                  className="Form__Input"
                  value={selectedVariantId}
                  onChange={(e) => setSelectedVariantId(e.target.value)}
                >
                  {product.variants.map((v) => (
                    <option
                      key={v.id}
                      value={v.id}
                      disabled={
                        v.inventoryQuantity !== undefined &&
                        v.inventoryQuantity <= 0
                      }
                    >
                      {v.title}{" "}
                      {v.inventoryQuantity !== undefined &&
                      v.inventoryQuantity <= 0
                        ? "(Sold Out)"
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Bar */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <style>{`
                  @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                  }
                  .shake { animation: shake 0.4s ease-in-out; border: 1px solid red !important; border-radius: 4px; padding: 10px; margin: -11px; }
                `}</style>
                <AddToCartButton
                  handle={product.handle}
                  variantId={selectedVariantId}
                  title={product.title}
                  price={price}
                  image={product.images[0]}
                  variantTitle={selectedVariant?.title}
                  onClick={(e) => {
                    if (!selectedVariantId && product.variants.length > 1) {
                      e.preventDefault();
                      import("sonner").then((mod) =>
                        mod.toast.error("Please select a size first"),
                      );

                      let overlay =
                        document.querySelector(".ClothingOverlay") ||
                        document.querySelector(".ArtOverlay") ||
                        document.querySelector(".EngineeredOverlay");
                      if (!overlay && derivedType === "general") {
                        overlay =
                          e.currentTarget
                            .closest(".Product__InfoWrapper")
                            ?.querySelector("select")?.parentElement || null;
                      }

                      if (overlay) {
                        overlay.classList.add("shake");
                        overlay.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        setTimeout(
                          () => overlay.classList.remove("shake"),
                          400,
                        );
                      }
                      return false;
                    }
                  }}
                />
              </div>
              <WishlistButton productHandle={product.handle} />
            </div>

            {/* Return Policy */}
            <div style={{ marginBottom: 12 }}>
              <ReturnPolicyBadge />
            </div>

            <p
              className="Text--subdued"
              style={{
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 30,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
              Usually ships in 1-2 business days
            </p>

            <SocialShare title={product.title} />

            {/* Accordion Tabs */}
            <div
              className="Accordion"
              style={{
                marginTop: 40,
                borderTop: "1px solid var(--border-color)",
              }}
            >
              {[
                {
                  id: "description",
                  title: "Description",
                  content: product.descriptionHtml,
                },
                {
                  id: "shipping",
                  title: "Shipping",
                  content:
                    "<p>Free standard shipping on orders over $100. Expedited options available at checkout.</p>",
                },
                {
                  id: "returns",
                  title: "Returns",
                  content:
                    "<p>Returns accepted within 30 days of delivery. Items must be in original condition.</p>",
                },
              ].map((tab) => (
                <div
                  key={tab.id}
                  style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === tab.id ? "" : tab.id)
                    }
                    style={{
                      width: "100%",
                      padding: "20px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span className="Heading u-h6">{tab.title}</span>
                    <span style={{ fontSize: 20 }}>
                      {activeTab === tab.id ? "−" : "+"}
                    </span>
                  </button>
                  {activeTab === tab.id && (
                    <div
                      className="Rte Text--subdued"
                      style={{ paddingBottom: 20, fontSize: 14 }}
                      dangerouslySetInnerHTML={{ __html: tab.content }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Below the Fold */}
        <ProductReviews productId={product.id} />

        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        <RecentlyViewed
          currentProduct={{
            handle: product.handle,
            title: product.title,
            price: `$${price.toFixed(2)}`,
            image: product.images[0],
          }}
        />
      </div>

      <StickyATC
        productHandle={product.handle}
        title={product.title}
        price={`$${price.toFixed(2)}`}
        variantId={selectedVariantId}
        image={product.images[0]}
      />
    </>
  );
}
