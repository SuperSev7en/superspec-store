import type { Metadata } from 'next';
import { getProductByHandle } from '@/lib/catalog/catalog';
import { getProductByHandleFromSupabase } from '@/lib/catalog/supabaseCatalog';
import { stripHtml } from '@/lib/catalog/htmlUtils';
import { ProductImageFrame } from '@/components/store/ProductImageFrame';
import { ProductPurchaseClient } from '@/components/store/ProductPurchaseClient';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = (await getProductByHandleFromSupabase(handle)) ?? (await getProductByHandle(handle));
  if (!product) {
    return { title: 'Not found' };
  }
  const description =
    product.seoDescription?.trim() ||
    stripHtml(product.descriptionHtml).slice(0, 160) ||
    undefined;
  return {
    title: product.seoTitle?.trim() || product.title,
    description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = (await getProductByHandleFromSupabase(handle)) ?? (await getProductByHandle(handle));

  if (!product) {
    return (
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">Not found</h1>
        </header>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [];
  const purchaseVariants = product.variants.map((v) => ({
    id: v.id,
    title: v.title,
    price: v.price,
    compareAtPrice: v.compareAtPrice ?? null,
  }));
  const canPurchase = purchaseVariants.length > 0;

  return (
    <div className="Product">
      <div className="Container">
        <div className="Product__Wrapper">
          <div className="Product__Gallery Product__Gallery--withDots">
            <div className="Product__Slideshow Carousel">
              {images.map((src, i) => (
                <div key={src} className={`Carousel__Cell ${i === 0 ? 'is-selected' : ''}`.trim()}>
                  <ProductImageFrame
                    src={src}
                    alt={i === 0 ? product.title : `${product.title} ${i + 1}`}
                    maxWidth="1200px"
                    aspectRatio={1}
                    imgClassName="Image--fadeIn Image--zoomOut"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="Product__InfoWrapper">
            <div className="Product__Info text-backdrop">
              <div className="Container">
                {product.vendor ? (
                  <p className="ProductMeta__Vendor Heading u-h6 Text--subdued">{product.vendor}</p>
                ) : null}
                <h1 className="ProductMeta__Title Heading u-h2">{product.title}</h1>

                {product.productType ? (
                  <p className="Text--subdued" style={{ marginTop: 4 }}>
                    {product.productType}
                  </p>
                ) : null}

                {canPurchase ? (
                  <ProductPurchaseClient handle={product.handle} variants={purchaseVariants} />
                ) : (
                  <p className="Text--subdued" style={{ marginTop: 16 }}>
                    This product is not available for purchase.
                  </p>
                )}

                {product.descriptionHtml ? (
                  <div className="ProductMeta__Description Rte" style={{ marginTop: 28 }}>
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
