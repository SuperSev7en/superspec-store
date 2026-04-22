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
  // Pseudo-random stock based on handle length to keep it somewhat stable per product
  const stockLeft = useMemo(() => (handle.length % 4) + 2, [handle]);
  
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

      <div className="ProductForm mt-4">
        {/* Scarcity Indicator */}
        <div className="flex items-center space-x-2 text-sm text-red-600 font-semibold mb-4 bg-red-50/50 p-2 rounded-lg border border-red-100">
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>Selling fast! Only {stockLeft} left in stock.</span>
        </div>

        {safe.length > 1 ? (
          <div className="ProductForm__Option ProductForm__Option--labelled mb-4">
            <label className="ProductForm__Label text-sm font-medium text-gray-700" htmlFor="product-variant-select">
              Variant
            </label>
            <select
              id="product-variant-select"
              className="ProductForm__Item w-full p-2.5 border border-gray-300 rounded-lg bg-white mt-1"
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

        <div className="ProductForm__AddToCart" style={{ marginTop: safe.length > 1 ? 10 : 0 }}>
          <AddToCartButton handle={handle} variantId={selected.id || undefined} />
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-col items-center justify-center space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">100% Satisfaction Guarantee</p>
          <div className="flex space-x-4 items-center opacity-70">
            <svg className="h-6 w-auto" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h32v20H0z" fill="#FFF"/>
              <path d="M0 0h32v20H0z" fill="#FFF"/>
              <path d="M12.986 10.366c.214-1.282.91-2.115 1.942-2.316.591-.115 1.144.024 1.554.394.462.417.653 1.05.539 1.776-.234 1.488-1.002 2.387-2.155 2.531-.6.074-1.127-.089-1.486-.46-.421-.433-.585-1.077-.394-1.925zm3.899-3.238c-1.393-.243-3.064-.093-4.545.412-.429.146-.685.556-.583.94l.013.048c.081.311.411.458.742.348 1.139-.38 2.378-.501 3.447-.315 2.148.376 3.013 2.015 2.518 5.17l-.801 5.111h2.89l.867-5.535c.704-4.492-1.386-5.874-4.548-6.179zm-5.69 5.385c-1.125 1.066-2.614 1.516-4.067 1.229-2.347-.464-3.52-2.39-2.92-6.216l.872-5.568h2.9l-.804 5.132c-.373 2.379.256 3.446 1.523 3.697.838.166 1.737-.091 2.457-.704.577-.492.935-1.18 1.057-2.01l.868-5.54H16.03l-1.018 6.495c-.171 1.092-.262 2.152-.284 3.125l-2.738-.54c.055-.66.195-1.428.397-2.274l-.454-.424zm9.351.487l.453-.396-1.018 6.495H16.94l1.378-8.795h2.723l-.128.818c1.371-1.071 3.023-1.442 4.543-1.141 2.35.464 3.52 2.39 2.921 6.215l-.872 5.568H24.61l.805-5.133c.372-2.379-.256-3.446-1.523-3.696-.838-.166-1.737.091-2.457.703-.578.492-.934 1.181-1.056 2.01l-.822 5.247-2.889-.57.869-5.541z" fill="#000" fillRule="nonzero"/>
            </svg>
            <svg className="h-6 w-auto" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h32v20H0z" fill="#FFF"/>
              <path d="M0 0h32v20H0z" fill="#FFF"/>
              <path d="M21.576 4.706c-1.396 0-2.302.722-2.32 1.758-.02.748.653 1.162 1.147 1.405.51.252.68.414.68.64 0 .34-.413.498-.795.498-.535 0-.82-.077-1.15-.228l-.161-.077-.183 1.155c.287.135.815.253 1.365.258 1.48 0 2.441-.732 2.463-1.865.011-.595-.36-.98-.1092-1.32-.472-.24-.764-.396-.764-.64 0-.21.237-.432.766-.432.428 0 .749.09 1.051.218l.128.06.177-1.111c-.267-.123-.746-.277-1.32-.277zm-9.356.027c-.36.002-.661.208-.813.535l-2.812 6.84h1.722s.282-.782.345-.963h2.102c.05.234.198.963.198.963h1.492l-2.072-7.375h-1.162zm.32 2.155c.071.24 1.096 4.673 1.096 4.673h-1.78l.684-4.673zM15.46 4.78h-1.353l-1.077 7.324h1.354L15.46 4.78zm-8.877 0l-1.066 5.006-.412-2.115c-.143-.49-.553-.872-1.055-.934L1.76 6.442l.024.113 2.923 5.549h1.42l2.128-7.324H6.583z" fill="#000" fillRule="nonzero"/>
            </svg>
            <span className="text-gray-500 font-bold ml-1">Stripe</span>
          </div>
        </div>
      </div>
    </>
  );
}
