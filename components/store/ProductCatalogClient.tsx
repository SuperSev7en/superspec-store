"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import type { CatalogProduct } from "@/lib/catalog/catalog";
import { ProductItem } from "@/components/shopify/sections/ProductItem";
import { Icon } from "@/components/shopify/icons/Icon";

const STORAGE_KEY = "superspec-catalog-view-mode";

export type ViewMode = "grid" | "list";

export type CatalogRowProduct = CatalogProduct & { listingExcerpt?: string };

type FilterState = {
  [key: string]: string[];
};

export function ProductCatalogClient({
  products,
  layout = "collection",
  collectionCellClassName = "Grid__Cell 1/2--phone 1/2--tablet 1/4--lap-and-up",
  collectionType = "all",
}: {
  products: CatalogRowProduct[];
  layout?: "collection" | "shop";
  collectionCellClassName?: string;
  collectionType?: "clothing" | "art" | "engineered" | "all";
}) {
  const [mode, setMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<FilterState>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "list" || v === "grid") setMode(v);
    } catch {
      /* ignore */
    }
  }, []);

  const setPersist = useCallback((m: ViewMode) => {
    setMode(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const handleFilterToggle = (category: string, value: string) => {
    setFilters((prev) => {
      const existing = prev[category] || [];
      if (existing.includes(value)) {
        const updated = existing.filter((v) => v !== value);
        if (updated.length === 0) {
          const next = { ...prev };
          delete next[category];
          return next;
        }
        return { ...prev, [category]: updated };
      }
      return { ...prev, [category]: [...existing, value] };
    });
    setPage(1); // Reset pagination on filter change
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    for (const [category, values] of Object.entries(filters)) {
      if (values.length === 0) continue;

      if (category === "in-stock") {
        if (values.includes("true")) {
          result = result.filter((p) =>
            p.variants.some(
              (v) =>
                v.inventoryQuantity === undefined || v.inventoryQuantity > 0,
            ),
          );
        }
      } else if (category === "price") {
        // Simple price filtering for demo
        const maxPrice = Math.max(
          ...values.map((v) => parseInt(v.split("-")[1] || "9999", 10)),
        );
        result = result.filter(
          (p) => Math.min(...p.variants.map((v) => v.price)) <= maxPrice,
        );
      } else {
        // Tag-based filtering
        result = result.filter((p) =>
          p.tags.some((t) => values.includes(t.toLowerCase())),
        );
      }
    }

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort(
        (a, b) =>
          Math.min(...a.variants.map((v) => v.price)) -
          Math.min(...b.variants.map((v) => v.price)),
      );
    } else if (sortBy === "price-desc") {
      result.sort(
        (a, b) =>
          Math.max(...a.variants.map((v) => v.price)) -
          Math.max(...b.variants.map((v) => v.price)),
      );
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
    }

    return result;
  }, [products, filters, sortBy]);

  const displayedProducts = filteredProducts.slice(0, page * itemsPerPage);
  const hasMore = displayedProducts.length < filteredProducts.length;

  const useGrid = mode === "grid";
  const listClassName = useGrid
    ? "ProductList ProductList--grid ProductList--spacingNormal Grid"
    : "ProductList ProductList--viewList ProductList--spacingNormal";

  // Available filter options per collection type
  const filterOptions = {
    clothing: [
      { id: "size", label: "Size", options: ["S", "M", "L", "XL"] },
      { id: "color", label: "Color", options: ["black", "white", "grey"] },
      { id: "in-stock", label: "Availability", options: ["true"] },
    ],
    art: [
      { id: "medium", label: "Medium", options: ["canvas", "paper", "metal"] },
      { id: "size", label: "Size", options: ["small", "medium", "large"] },
      { id: "edition", label: "Edition", options: ["limited", "open"] },
    ],
    engineered: [
      {
        id: "material",
        label: "Material",
        options: ["aluminum", "steel", "titanium"],
      },
      {
        id: "category",
        label: "Category",
        options: ["hardware", "tools", "accessories"],
      },
      { id: "in-stock", label: "Availability", options: ["true"] },
      {
        id: "lead-time",
        label: "Lead Time",
        options: ["in-stock", "made-to-order"],
      },
    ],
    all: [{ id: "in-stock", label: "Availability", options: ["true"] }],
  };

  const currentFilters = filterOptions[collectionType] || filterOptions.all;
  const activeFilterCount = Object.values(filters).reduce(
    (acc, val) => acc + val.length,
    0,
  );

  return (
    <div className="CollectionMain">
      <div className="CollectionToolbar">
        <div className="CollectionToolbar__Group">
          <div className="CollectionToolbar__Item CollectionToolbar__Item--filter">
            <span className="Heading u-h6">Filters</span>
            <div className="FilterList">
              {currentFilters.map((group) => (
                <div key={group.id} className="FilterGroup">
                  <span className="FilterGroup__Label">
                    {group.label}:
                  </span>
                  <select
                    className="Form__Input"
                    onChange={(e) => {
                      if (e.target.value)
                        handleFilterToggle(group.id, e.target.value);
                      e.target.value = "";
                    }}
                  >
                    <option value="">Select...</option>
                    {group.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === "true" ? "In Stock" : opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="CollectionToolbar__Group CollectionToolbar__Group--layout">
          <div className="CollectionToolbar__Item CollectionToolbar__Item--sort">
            <span className="Heading u-h6">Sort</span>
            <select
              className="Form__Input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>

          <div className="CollectionToolbar__Item CollectionToolbar__Item--layout">
            <div
              className="ProductViewToggle"
              role="group"
              aria-label="Product display layout"
            >
              <button
                type="button"
                className={`Button Button--secondary ${useGrid ? "ProductViewToggle__btn--active" : ""}`.trim()}
                aria-pressed={useGrid}
                onClick={() => setPersist("grid")}
              >
                Grid
              </button>
              <button
                type="button"
                className={`Button Button--secondary ${!useGrid ? "ProductViewToggle__btn--active" : ""}`.trim()}
                aria-pressed={!useGrid}
                onClick={() => setPersist("list")}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div
          className="CollectionActiveFilters"
          style={{
            display: "flex",
            gap: 8,
            padding: "15px 0",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {Object.entries(filters).map(([category, values]) =>
            values.map((val) => (
              <button
                key={`${category}-${val}`}
                className="Button Button--primary Button--small"
                style={{ padding: "4px 12px", fontSize: 12, borderRadius: 16 }}
                onClick={() => handleFilterToggle(category, val)}
              >
                {val === "true" ? "In Stock" : val} <Icon icon="close" />
              </button>
            )),
          )}
          <button
            className="Text--subdued Link Link--underline"
            style={{ fontSize: 12, marginLeft: 8 }}
            onClick={clearFilters}
          >
            Clear all
          </button>
        </div>
      )}

      <div className={listClassName}>
        {displayedProducts.map((product) => (
          <ProductItem
            key={product.handle}
            product={product}
            showProductInfo
            showVendor={false}
            showLabels
            cellClassName={useGrid ? collectionCellClassName : ""}
            subtext={layout === "shop" ? product.listingExcerpt : undefined}
            listLayout={!useGrid}
            useTextBackdrop={true}
            collectionType={collectionType}
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={(node) => {
            if (!node) return;
            const observer = new IntersectionObserver(
              (entries) => {
                if (entries[0].isIntersecting) {
                  setPage((p) => p + 1);
                }
              },
              { rootMargin: "200px" },
            );
            observer.observe(node);
            return () => observer.disconnect();
          }}
          className="Pagination"
          style={{ textAlign: "center", marginTop: 40, height: "20px" }}
        >
          <span className="Text--subdued" style={{ fontSize: 13 }}>
            Loading more products...
          </span>
        </div>
      )}
    </div>
  );
}
