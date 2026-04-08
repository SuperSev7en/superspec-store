'use client';

import { useState } from 'react';
import type { CatalogProduct } from '@/lib/catalog/catalog';
import { ProductItem } from '@/components/shopify/sections/ProductItem';

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

  const sectionSettings = JSON.stringify({ layout: tabs[0]?.layoutMode === 'carousel' ? 'carousel' : 'grid' });

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
            <h3 className="SectionHeader__SubHeading Heading u-h6">{sectionTitle}</h3>
          ) : null}
          {tabs.length > 1 ? (
            <div className="SectionHeader__TabList TabList" role="tablist">
              {tabs.map((t, i) => (
                <button
                  key={t.blockId}
                  type="button"
                  className={`Heading u-h1 TabList__Item ${i === active ? 'is-active' : ''}`}
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
            <h2 className="SectionHeader__Heading Heading u-h1">{tabs[0]?.title}</h2>
          )}
        </div>
      </header>

      {tabs.map((t, i) => {
        const m = t.mobileCols || '2';
        const d = t.desktopCols || '4';
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
              {t.products.length === 0 ? (
                <PlaceholderGrid count={t.limit} layoutMode={t.layoutMode} mobileCols={m} desktopCols={d} />
              ) : t.layoutMode === 'carousel' ? (
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

function PlaceholderGrid({
  count,
  layoutMode,
  mobileCols,
  desktopCols,
}: {
  count: number;
  layoutMode: string;
  mobileCols: string;
  desktopCols: string;
}) {
  const n = Math.min(8, Math.max(1, count));
  const cellGrid = `Grid__Cell 1/${mobileCols}--phone 1/2--tablet-and-up 1/${desktopCols}--lap-and-up`;
  const cells = Array.from({ length: n }, (_, idx) => (
    <div key={idx} className={layoutMode === 'grid' ? cellGrid : 'Carousel__Cell'}>
      <div className="ProductItem">
        <div className="ProductItem__Wrapper">
          <a href="#" className="ProductItem__ImageWrapper" onClick={(e) => e.preventDefault()}>
            <div
              className="ProductItem__Image PlaceholderSvg PlaceholderSvg--dark"
              style={{ minHeight: 200, background: 'rgba(255,255,255,0.06)' }}
            />
          </a>
          <div className="ProductItem__Info ProductItem__Info--left">
            <h2 className="ProductItem__Title Heading">Sample product</h2>
            <div className="ProductItem__PriceList Heading">
              <span className="ProductItem__Price Price Text--subdued">$30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  if (layoutMode === 'grid') {
    return (
      <div
        className="ProductList ProductList--grid ProductList--removeMargin Grid"
        data-mobile-count={mobileCols}
        data-desktop-count={desktopCols}
      >
        {cells}
      </div>
    );
  }
  return <div className="ProductList ProductList--carousel Carousel">{cells}</div>;
}
