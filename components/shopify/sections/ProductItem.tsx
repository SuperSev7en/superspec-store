'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { CatalogProduct } from '@/lib/catalog/catalog';
import { ProductImageFrame } from '@/components/store/ProductImageFrame';
import { addToCart } from '@/components/store/cart';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics';

function labelFromTags(tags: string[]) {
  for (const t of tags) {
    if (t.toLowerCase().includes('__label')) {
      const parts = t.split('__label:');
      return parts[parts.length - 1]?.trim() || null;
    }
  }
  return null;
}

function priceLabelForProduct(product: CatalogProduct) {
  const first = product.variants[0];
  const prices = product.variants.map((v) => v.price).filter((n) => Number.isFinite(n));
  if (prices.length === 0) return '$0.00';
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  if (prices.length > 1 && minP !== maxP) {
    return `From $${minP.toFixed(2)}`;
  }
  return `$${(first?.price ?? minP).toFixed(2)}`;
}

export function ProductItem({
  product,
  showProductInfo = true,
  showVendor = false,
  showLabels = true,
  cellClassName = '',
  subtext,
  listLayout = false,
  useTextBackdrop = false,
  collectionType = 'all',
}: {
  product: CatalogProduct;
  showProductInfo?: boolean;
  showVendor?: boolean;
  showLabels?: boolean;
  cellClassName?: string;
  subtext?: string;
  listLayout?: boolean;
  useTextBackdrop?: boolean;
  collectionType?: 'clothing' | 'art' | 'engineered' | 'all';
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const first = product.variants[0];
  const compareAt = first?.compareAtPrice;
  const onSale = compareAt != null && compareAt > (first?.price ?? 0);
  const customLabel = labelFromTags(product.tags);
  const priceText = priceLabelForProduct(product);

  const totalInventory = product.variants.reduce((sum, v) => sum + (v.inventoryQuantity || 0), 0);

  const handleQuickAdd = () => {
    if (product.variants.length === 1) {
      const v = product.variants[0];
      addToCart({ handle: product.handle, variantId: v.id, quantity: 1, title: product.title, price: v.price, image: product.images[0], variantTitle: v.title });
      trackEvent('add_to_cart', { currency: 'USD', value: v.price, items: [{ item_id: v.id, item_name: product.title, price: v.price, quantity: 1 }] });
      toast.success(`Added ${product.title} to cart`);
    } else {
      setShowQuickAdd(!showQuickAdd);
    }
  };

  const handleVariantAdd = (variantId: string, variantTitle: string, variantPrice: number) => {
    addToCart({ handle: product.handle, variantId, quantity: 1, title: product.title, price: variantPrice, image: product.images[0], variantTitle });
    trackEvent('add_to_cart', { currency: 'USD', value: variantPrice, items: [{ item_id: variantId, item_name: product.title, price: variantPrice, quantity: 1 }] });
    toast.success(`Added ${product.title} - ${variantTitle} to cart`);
    setShowQuickAdd(false);
  };

  const wrap = (inner: ReactNode) =>
    cellClassName ? <div className={cellClassName}>{inner}</div> : inner;

  const imageToShow = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return wrap(
    <div 
      className={`ProductItem ${listLayout ? 'ProductItem--listRow' : ''}`.trim()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      <div className={`ProductItem__Wrapper ${listLayout ? 'ProductItem__Wrapper--listRow' : ''}`.trim()} style={{ position: 'relative' }}>
        <a href={`/products/${product.handle}`} className="ProductItem__ImageWrapper">
          {imageToShow ? (
            <ProductImageFrame
              src={imageToShow}
              alt={product.title}
              maxWidth="800px"
              aspectRatio={1}
              imgClassName={`ProductItem__Image ${isHovered && product.images.length > 1 ? 'ProductItem__Image--alternate' : ''}`}
            />
          ) : null}
        </a>

        {showLabels ? (
          <div className="ProductItem__LabelList">
            {customLabel ? <span className="ProductItem__Label Heading Text--subdued">{customLabel}</span> : null}
            {onSale ? (
              <span className="ProductItem__Label ProductItem__Label--onSale Heading Text--subdued">On sale</span>
            ) : null}
          </div>
        ) : null}

        {/* Quick Add Overlay */}
        <div 
          className="ProductItem__QuickAdd" 
          style={{ 
            position: 'absolute', 
            bottom: showProductInfo ? '120px' : '20px', 
            left: 0, 
            right: 0, 
            padding: '0 20px',
            opacity: isHovered || showQuickAdd ? 1 : 0,
            transform: isHovered || showQuickAdd ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.2s ease-in-out',
            zIndex: 10,
            pointerEvents: isHovered || showQuickAdd ? 'auto' : 'none'
          }}
        >
          {showQuickAdd && product.variants.length > 1 ? (
            <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', padding: 10, borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="Heading u-h7">Select Variant</span>
                <button onClick={() => setShowQuickAdd(false)} style={{ fontSize: 12 }}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {product.variants.map(v => (
                  <button 
                    key={v.id} 
                    className="Button Button--primary Button--small" 
                    style={{ padding: '6px', fontSize: 12 }}
                    disabled={v.inventoryQuantity !== undefined && v.inventoryQuantity <= 0}
                    onClick={() => handleVariantAdd(v.id, v.title, v.price)}
                  >
                    {v.title} - ${v.price}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button 
              className="Button Button--primary Button--full" 
              onClick={handleQuickAdd}
              disabled={totalInventory === 0 && product.variants[0]?.inventoryQuantity !== undefined}
            >
              {totalInventory === 0 && product.variants[0]?.inventoryQuantity !== undefined ? 'Sold Out' : 'Quick Add'}
            </button>
          )}
        </div>

        {showProductInfo ? (
          <div className={`ProductItem__Info ProductItem__Info--left ${useTextBackdrop ? 'text-backdrop-sm' : ''}`.trim()}>
            {showVendor && product.vendor ? <p className="ProductItem__Vendor Heading">{product.vendor}</p> : null}
            <h2 className="ProductItem__Title Heading">
              <a href={`/products/${product.handle}`}>{product.title}</a>
            </h2>
            <div className="ProductItem__PriceList Heading">
              {onSale && compareAt ? (
                <>
                  <span className="ProductItem__Price Price Price--highlight Text--subdued">{priceText}</span>
                  <span className="ProductItem__Price Price Price--compareAt Text--subdued" style={{ marginLeft: 8 }}>${compareAt.toFixed(2)}</span>
                </>
              ) : (
                <span className="ProductItem__Price Price Text--subdued">{priceText}</span>
              )}
            </div>

            {/* Collection specific info */}
            {collectionType === 'clothing' && totalInventory > 0 && totalInventory <= 5 && (
              <p className="Text--subdued" style={{ fontSize: 12, color: 'var(--product-on-sale-color)', fontWeight: 600, marginTop: 4 }}>
                Only {totalInventory} left!
              </p>
            )}

            {collectionType === 'art' && (
              <p className="Text--subdued" style={{ fontSize: 12, marginTop: 4 }}>
                {totalInventory > 0 ? `${totalInventory} of 50 remaining` : 'Edition Sold Out'}
              </p>
            )}

            {collectionType === 'engineered' && listLayout && (
              <div className="ProductItem__SpecSummary" style={{ marginTop: 12, padding: 12, background: 'var(--secondary-elements-background)', borderRadius: 4 }}>
                <p className="Heading u-h7" style={{ marginBottom: 4 }}>Tech Specs</p>
                <ul style={{ fontSize: 13, color: 'var(--text-light-color)', margin: 0, paddingLeft: 16 }}>
                  {/* @ts-ignore - Assuming metafields are injected dynamically in a real setup */}
                  {product.metafields?.technical_specs ? (
                    // @ts-ignore
                    Object.entries(product.metafields.technical_specs).slice(0, 4).map(([k, v]) => (
                      <li key={k}>{k}: {String(v)}</li>
                    ))
                  ) : (
                    <>
                      <li>Material: 6061 Aluminum</li>
                      <li>Tolerance: ±0.01mm</li>
                      <li>Weight: 142g</li>
                      <li>Finish: Anodized Matte</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {subtext && (!listLayout || collectionType !== 'engineered') ? (
              <p className="Text--subdued" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>
                {subtext}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
