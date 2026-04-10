'use client';

import { useMemo, useState } from 'react';
import { AddToCartButton } from '@/components/store/AddToCartButton';

export type PurchaseVariant = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
};

export function ProductPurchaseClient({ handle, variants }: { handle: string; variants: PurchaseVariant[] }) {
  const safe = useMemo(
    () => (variants.length > 0 ? variants : [{ id: '', title: 'Default', price: 0, compareAtPrice: null as number | null }]),
    [variants],
  );
  const [variantId, setVariantId] = useState(() => safe[0]?.id ?? '');

  const selected = safe.find((v) => v.id === variantId) ?? safe[0];
  if (!selected) return null;

  const onSale = selected.compareAtPrice != null && selected.compareAtPrice > selected.price;

  return (
    <>
      <div className="ProductMeta__PriceList Heading">
        {onSale ? (
          <span className="ProductMeta__Price ProductMeta__Price--compareAt Text--subdued" style={{ textDecoration: 'line-through', marginRight: 10 }}>
            ${Number(selected.compareAtPrice).toFixed(2)}
          </span>
        ) : null}
        <span className="ProductMeta__Price Price Text--subdued">${selected.price.toFixed(2)}</span>
      </div>

      <div className="ProductForm">
        {safe.length > 1 ? (
          <div className="ProductForm__Option ProductForm__Option--labelled">
            <label className="ProductForm__Label" htmlFor="product-variant-select">
              Variant
            </label>
            <select
              id="product-variant-select"
              className="ProductForm__Item"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              aria-label="Select variant"
            >
              {safe.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title || 'Default'} — ${v.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="ProductForm__AddToCart" style={{ marginTop: safe.length > 1 ? 20 : 0 }}>
          <AddToCartButton handle={handle} variantId={selected.id || undefined} />
        </div>
      </div>
    </>
  );
}
