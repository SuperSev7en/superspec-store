'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CatalogProduct } from '@/lib/catalog/catalog';
import { ProductItem } from '@/components/shopify/sections/ProductItem';

const STORAGE_KEY = 'superspec-catalog-view-mode';

export type ViewMode = 'grid' | 'list';

export type CatalogRowProduct = CatalogProduct & { listingExcerpt?: string };

export function ProductCatalogClient({
  products,
  layout = 'collection',
  collectionCellClassName = 'Grid__Cell 1/2--phone 1/2--tablet 1/3--lap-and-up',
}: {
  products: CatalogRowProduct[];
  layout?: 'collection' | 'shop';
  collectionCellClassName?: string;
}) {
  const [mode, setMode] = useState<ViewMode>('grid');

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'list' || v === 'grid') setMode(v);
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

  const useGrid = mode === 'grid';
  const listClassName = useGrid
    ? 'ProductList ProductList--grid ProductList--spacingNormal Grid'
    : 'ProductList ProductList--viewList ProductList--spacingNormal';

  return (
    <>
      <div
        className="ProductViewToggle"
        role="group"
        aria-label="Product display layout"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        <span className="Heading Text--subdued u-h7" style={{ marginRight: 'auto' }}>
          View
        </span>
        <button
          type="button"
          className={`Button Button--secondary ${useGrid ? 'ProductViewToggle__btn--active' : ''}`.trim()}
          aria-pressed={useGrid}
          onClick={() => setPersist('grid')}
        >
          Grid
        </button>
        <button
          type="button"
          className={`Button Button--secondary ${!useGrid ? 'ProductViewToggle__btn--active' : ''}`.trim()}
          aria-pressed={!useGrid}
          onClick={() => setPersist('list')}
        >
          List
        </button>
      </div>

      <div className={listClassName}>
        {products.map((product) => (
          <ProductItem
            key={product.handle}
            product={product}
            showProductInfo
            showVendor={false}
            showLabels
            cellClassName={useGrid ? collectionCellClassName : ''}
            subtext={layout === 'shop' ? product.listingExcerpt : undefined}
            listLayout={!useGrid}
          />
        ))}
      </div>
    </>
  );
}
