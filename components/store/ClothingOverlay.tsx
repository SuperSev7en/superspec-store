"use client";

import { useState } from "react";
import type { DbProduct } from "@/lib/catalog/supabaseCatalog";

export function ClothingOverlay({
  product,
  selectedVariantId,
  onVariantChange,
}: {
  product: DbProduct;
  selectedVariantId?: string;
  onVariantChange: (id: string) => void;
}) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCare, setShowCare] = useState(false);

  // Group variants by Option1 (Color) and Option2 (Size) if applicable.
  // In the CSV structure provided, we only have `option1` explicitly mapped, but let's assume `option1` is Size for tees, or combination like "Black / Large".
  // For robustness, we will parse "Color / Size" from variant title if option1 is null.

  // Basic heuristic for this test since we don't have structured Option1/Option2 columns from Shopify in the db.
  // We'll just display a standard variant selector grid.
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];
  const stock = selectedVariant?.inventoryQuantity ?? 0;

  return (
    <div className="ClothingOverlay">
      {/* Fit Notes (Simulated Metafield) */}
      <p className="Text--subdued" style={{ fontSize: 13, marginBottom: 20 }}>
        <strong>Fit Note:</strong> Model is 6&apos;1&quot;, wearing size L. True
        to size.
      </p>

      {/* Size Selector */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span className="Heading u-h6">Select Size</span>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="Link Link--underline Text--subdued"
            style={{ fontSize: 12 }}
          >
            Size Guide
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(() => {
            const sizeMap = new Map<string, typeof product.variants>();

            product.variants.forEach((v) => {
              const label =
                v.title === "Default Title"
                  ? "One Size"
                  : v.title.includes(" / ")
                    ? v.title.split(" / ")[1].trim()
                    : v.title.trim();
              if (!label) return;
              if (!sizeMap.has(label)) sizeMap.set(label, []);
              sizeMap.get(label)!.push(v);
            });

            const uniqueSizes = Array.from(sizeMap.keys());

            return uniqueSizes.map((sizeLabel) => {
              const variantsForSize = sizeMap.get(sizeLabel)!;
              const isSoldOut = variantsForSize.every(
                (v) =>
                  v.inventoryQuantity !== undefined && v.inventoryQuantity <= 0,
              );

              // Find the first variant with this size that is selected, or just the first one if none selected
              const isSelected = variantsForSize.some(
                (v) => v.id === selectedVariantId,
              );
              const variantToSelect =
                variantsForSize.find(
                  (v) =>
                    v.inventoryQuantity === undefined ||
                    v.inventoryQuantity > 0,
                ) || variantsForSize[0];

              return (
                <button
                  key={sizeLabel}
                  type="button"
                  onClick={() => onVariantChange(variantToSelect.id)}
                  disabled={isSoldOut}
                  style={{
                    padding: "10px 16px",
                    border: isSelected
                      ? "2px solid var(--text-color)"
                      : "1px solid var(--border-color)",
                    background: isSelected
                      ? "var(--text-color)"
                      : "transparent",
                    color: isSelected
                      ? "var(--background)"
                      : isSoldOut
                        ? "var(--text-light-color)"
                        : "var(--text-color)",
                    textDecoration: isSoldOut ? "line-through" : "none",
                    opacity: isSoldOut ? 0.5 : 1,
                    borderRadius: 4,
                    minWidth: 60,
                    fontWeight: isSelected ? "bold" : "normal",
                    cursor: isSoldOut ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {sizeLabel}
                </button>
              );
            });
          })()}
        </div>
      </div>

      {stock > 0 && stock <= 5 && (
        <div
          style={{
            padding: "8px 12px",
            background: "rgba(249, 76, 67, 0.1)",
            color: "var(--product-on-sale-color)",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: "bold",
            marginBottom: 20,
            display: "inline-block",
          }}
        >
          Only {stock} left in your size!
        </div>
      )}

      {/* Care Instructions Accordion */}
      <div
        style={{
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setShowCare(!showCare)}
          style={{
            width: "100%",
            padding: "16px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span className="Heading u-h6">Care Instructions</span>
          <span style={{ fontSize: 20 }}>{showCare ? "−" : "+"}</span>
        </button>
        {showCare && (
          <div
            className="Rte Text--subdued"
            style={{ paddingBottom: 16, fontSize: 13 }}
          >
            <ul>
              <li>Machine wash cold with like colors</li>
              <li>Do not bleach</li>
              <li>Tumble dry low or hang dry</li>
              <li>Do not iron on print</li>
            </ul>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "var(--background)",
              padding: 30,
              borderRadius: 8,
              width: "90%",
              maxWidth: 500,
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              style={{
                position: "absolute",
                top: 15,
                right: 15,
                fontSize: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h3 className="Heading u-h3" style={{ marginBottom: 20 }}>
              Size Guide
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                  <th style={{ padding: "10px 0" }}>Size</th>
                  <th>Chest</th>
                  <th>Waist</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <tr
                    key={size}
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <td style={{ padding: "10px 0", fontWeight: "bold" }}>
                      {size}
                    </td>
                    <td>
                      {size === "S"
                        ? '36"'
                        : size === "M"
                          ? '40"'
                          : size === "L"
                            ? '44"'
                            : size === "XL"
                              ? '48"'
                              : '52"'}
                    </td>
                    <td>
                      {size === "S"
                        ? '30"'
                        : size === "M"
                          ? '34"'
                          : size === "L"
                            ? '38"'
                            : size === "XL"
                              ? '42"'
                              : '46"'}
                    </td>
                    <td>
                      {size === "S"
                        ? '28"'
                        : size === "M"
                          ? '29"'
                          : size === "L"
                            ? '30"'
                            : size === "XL"
                              ? '31"'
                              : '32"'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
