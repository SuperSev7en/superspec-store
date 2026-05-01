"use client";

import { useState } from "react";
import type { CatalogProduct } from "@/lib/catalog/catalog";
import { ProductItem } from "@/components/shopify/sections/ProductItem";

export type FeaturedCollectionTab = {
  blockId: string;
  title: string;
  products: CatalogProduct[];
  limit: number;
  layoutMode: string;
  mobileCols: string;
  desktopCols: string;
  showProductInfo: boolean;
  showVendor: boolean;
};

export function FeaturedCollectionsClient({
  id,
  sectionTitle,
  tabs,
}: {
  id: string;
  sectionTitle?: string;
  tabs: FeaturedCollectionTab[];
}) {
  const [active, setActive] = useState(0);
  if (tabs.length === 0) return null;

  const sectionSettings = JSON.stringify({
    layout: tabs[0]?.layoutMode === "carousel" ? "carousel" : "grid",
  });

  return (
    <section
      className="Section Section--spacingNormal"
      data-section-id={id}
      data-section-type="featured-collections"
      data-settings={sectionSettings}
    >
      <header className="SectionHeader SectionHeader--center">
        <div className="Container">
          {sectionTitle && tabs.length > 1 ? (
            <h3 className="SectionHeader__SubHeading Heading u-h6">
              {sectionTitle}
            </h3>
          ) : null}
          {tabs.length > 1 ? (
            <div className="SectionHeader__TabList TabList" role="tablist">
              {tabs.map((t, i) => (
                <button
                  key={t.blockId}
                  type="button"
                  className={`Heading u-h1 TabList__Item ${i === active ? "is-active" : ""}`}
                  data-action="toggle-tab"
                  aria-controls={`block-${t.blockId}`}
                  aria-selected={i === active}
                  role="tab"
                  onClick={() => setActive(i)}
                >
                  {t.title}
                </button>
              ))}
            </div>
          ) : (
            <h2 className="SectionHeader__Heading Heading u-h1">
              {tabs[0]?.title}
            </h2>
          )}
        </div>
      </header>

      {tabs.map((t, i) => {
        const m = t.mobileCols || "2";
        const d = t.desktopCols || "4";
        const cellGrid = `Grid__Cell 1/${m}--phone 1/2--tablet 1/${d}--lap-and-up`;

        return (
          <div
            key={t.blockId}
            className="TabPanel"
            id={`block-${t.blockId}`}
            role="tabpanel"
            aria-hidden={i !== active}
            hidden={i !== active}
          >
            <div className="ProductListWrapper">
              {t.layoutMode === "carousel" ? (
                <div className="ProductList ProductList--carousel Carousel">
                  {t.products.map((p) => (
                    <div key={p.handle} className="Carousel__Cell">
                      <ProductItem
                        product={p}
                        showProductInfo={t.showProductInfo}
                        showVendor={t.showVendor}
                        showLabels
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="ProductList ProductList--grid ProductList--removeMargin Grid"
                  data-mobile-count={m}
                  data-desktop-count={d}
                >
                  {t.products.map((p) => (
                    <ProductItem
                      key={p.handle}
                      product={p}
                      showProductInfo={t.showProductInfo}
                      showVendor={t.showVendor}
                      showLabels
                      cellClassName={cellGrid}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
