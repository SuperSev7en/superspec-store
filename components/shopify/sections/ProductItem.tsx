import type { ReactNode } from 'react';
import type { CatalogProduct } from '@/lib/catalog/catalog';
import { ProductImageFrame } from '@/components/store/ProductImageFrame';

function labelFromTags(tags: string[]) {
  for (const t of tags) {
    if (t.toLowerCase().includes('__label')) {
      const parts = t.split('__label:');
      return parts[parts.length - 1]?.trim() || null;
    }
  }
  return null;
}

export function ProductItem({
  product,
  showProductInfo = true,
  showVendor = false,
  showLabels = true,
  cellClassName = '',
}: {
  product: CatalogProduct;
  showProductInfo?: boolean;
  showVendor?: boolean;
  showLabels?: boolean;
  cellClassName?: string;
}) {
  const first = product.variants[0];
  const compareAt = first?.compareAtPrice;
  const onSale = compareAt != null && compareAt > (first?.price ?? 0);
  const customLabel = labelFromTags(product.tags);

  const wrap = (inner: ReactNode) =>
    cellClassName ? <div className={cellClassName}>{inner}</div> : inner;

  return wrap(
    <div className="ProductItem">
      <div className="ProductItem__Wrapper">
        <a href={`/products/${product.handle}`} className="ProductItem__ImageWrapper">
          {product.images[0] ? (
            <ProductImageFrame
              src={product.images[0]}
              alt={product.title}
              maxWidth="800px"
              aspectRatio={1}
              imgClassName="ProductItem__Image"
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

        {showProductInfo ? (
          <div className="ProductItem__Info ProductItem__Info--left">
            {showVendor && product.vendor ? <p className="ProductItem__Vendor Heading">{product.vendor}</p> : null}
            <h2 className="ProductItem__Title Heading">
              <a href={`/products/${product.handle}`}>{product.title}</a>
            </h2>
            <div className="ProductItem__PriceList Heading">
              <span className="ProductItem__Price Price Text--subdued">${first?.price?.toFixed(2)}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>,
  );
}
