import { loadCatalog } from '@/lib/catalog/catalog';
import { stripHtml } from '@/lib/catalog/htmlUtils';
import { ProductImageFrame } from '@/components/store/ProductImageFrame';

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await loadCatalog();

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">Products</h1>
        </header>

        <div className="ProductList ProductList--grid ProductList--spacingNormal">
          {products.map((product) => {
            const excerpt = stripHtml(product.descriptionHtml);
            const short = excerpt.length > 180 ? `${excerpt.slice(0, 180)}…` : excerpt;
            return (
              <div key={product.handle} className="ProductItem">
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

                  <div className="ProductItem__Info ProductItem__Info--left">
                    <h2 className="ProductItem__Title Heading">
                      <a href={`/products/${product.handle}`}>{product.title}</a>
                    </h2>

                    <div className="ProductItem__PriceList Heading">
                      <span className="ProductItem__Price Price Text--subdued">
                        ${product.variants[0]?.price?.toFixed(2)}
                      </span>
                    </div>

                    {short ? (
                      <p className="Text--subdued" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>
                        {short}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
