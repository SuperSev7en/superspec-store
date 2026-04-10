import type { Metadata } from 'next';
import { getProductByHandle } from '@/lib/catalog/catalog';
import { getProductByHandleFromSupabase } from '@/lib/catalog/supabaseCatalog';
import { stripHtml } from '@/lib/catalog/htmlUtils';
import { AddToCartButton } from '@/components/store/AddToCartButton';
import { ProductImageFrame } from '@/components/store/ProductImageFrame';

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

  const firstVariant = product.variants[0];
  const images = product.images.length > 0 ? product.images : [];

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
            <div className="Product__Info">
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

                <div className="ProductMeta__PriceList Heading">
                  <span className="ProductMeta__Price Price Text--subdued">${firstVariant?.price?.toFixed(2)}</span>
                </div>

                {product.descriptionHtml ? (
                  <div className="ProductMeta__Description Rte">
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                  </div>
                ) : null}

                <div className="ProductForm">
                  <AddToCartButton handle={product.handle} variantId={firstVariant?.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
