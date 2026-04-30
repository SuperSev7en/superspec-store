import { getProductByHandle } from "@/lib/catalog/catalog";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { ProductImageFrame } from "@/components/store/ProductImageFrame";

export async function FeaturedProduct({
  id,
  settings,
}: {
  id: string;
  settings: Record<string, unknown>;
}) {
  const subheading =
    typeof settings.subheading === "string" ? settings.subheading : "";
  const title = typeof settings.title === "string" ? settings.title : "";
  const showHeadingsOnMobile = Boolean(
    settings.show_headings_on_mobile ?? true,
  );
  const handle =
    typeof settings.product === "string" ? settings.product.trim() : "";
  const showVendor = Boolean(settings.show_vendor ?? false);
  const showDescription = Boolean(settings.show_description ?? true);
  const descriptionBelowAtc = Boolean(
    settings.description_below_add_to_cart ?? false,
  );
  const showPriceInButton = Boolean(settings.show_price_in_button ?? false);
  const product = handle ? await getProductByHandle(handle) : null;
  const variant = product?.variants[0];
  const sectionSettings = JSON.stringify({
    enableHistoryState: false,
    usePlaceholder: !product,
    showInventoryQuantity: settings.show_inventory_quantity,
    showSku: settings.show_sku,
    inventoryQuantityThreshold: settings.inventory_quantity_threshold,
    showPriceInButton,
    showPaymentButton: settings.show_payment_button,
    useAjaxCart: false,
  });

  return (
    <section
      className="Section Section--spacingNormal"
      data-section-id={id}
      data-section-type="featured-product"
      data-section-settings={sectionSettings}
    >
      <div className="Container">
        {subheading || title ? (
          <header
            className={`SectionHeader SectionHeader--center ${showHeadingsOnMobile ? "" : "hidden-phone"}`.trim()}
          >
            {subheading ? (
              <h3 className="SectionHeader__SubHeading Heading u-h6">
                {subheading}
              </h3>
            ) : null}
            {title ? (
              <h2 className="SectionHeader__Heading Heading u-h1">{title}</h2>
            ) : null}
          </header>
        ) : null}

        <div
          className={`FeaturedProduct ${!showDescription || !product?.descriptionHtml ? "FeaturedProduct--center" : ""}`.trim()}
        >
          {product && variant ? (
            <>
              {product.images[0] ? (
                <a
                  href={`/products/${product.handle}`}
                  className="FeaturedProduct__Gallery"
                >
                  <ProductImageFrame
                    src={product.images[0]}
                    alt={product.title}
                    maxWidth="1000px"
                    aspectRatio={1}
                    imgClassName="Image--fadeIn"
                  />
                </a>
              ) : null}

              <div className="FeaturedProduct__Info">
                <div className="ProductMeta">
                  {showVendor && product.vendor ? (
                    <h2 className="ProductMeta__Vendor Heading u-h6">
                      {product.vendor}
                    </h2>
                  ) : null}
                  <h1 className="ProductMeta__Title Heading u-h2">
                    {product.title}
                  </h1>
                  <div className="ProductMeta__PriceList Heading">
                    <span className="ProductMeta__Price Price Text--subdued u-h4">
                      ${variant.price.toFixed(2)}
                    </span>
                  </div>
                  {showDescription &&
                  !descriptionBelowAtc &&
                  product.descriptionHtml ? (
                    <div className="ProductMeta__Description Rte">
                      {/* eslint-disable-next-line react/no-danger */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="ProductForm">
                  <AddToCartButton
                    handle={product.handle}
                    variantId={variant.id}
                    className="ProductForm__AddToCart Button Button--full"
                    label={
                      showPriceInButton
                        ? `Add to cart — $${variant.price.toFixed(2)}`
                        : "Add to cart"
                    }
                  />
                </div>

                {showDescription &&
                descriptionBelowAtc &&
                product.descriptionHtml ? (
                  <div className="ProductMeta__Description Rte">
                    {/* eslint-disable-next-line react/no-danger */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.descriptionHtml,
                      }}
                    />
                  </div>
                ) : null}

                <div className="FeaturedProduct__ViewWrapper">
                  <a
                    href={`/products/${product.handle}`}
                    className="Link Link--underline"
                  >
                    View product
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="FeaturedProduct__Gallery">
                <div
                  className="PlaceholderSvg PlaceholderSvg--dark"
                  style={{
                    minHeight: 280,
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
              </div>
              <div className="FeaturedProduct__Info">
                <div className="ProductMeta">
                  {showVendor ? (
                    <h2 className="ProductMeta__Vendor Heading u-h6">Vendor</h2>
                  ) : null}
                  <h1 className="ProductMeta__Title Heading u-h2">
                    Sample product
                  </h1>
                  <div className="ProductMeta__PriceList Heading">
                    <span className="ProductMeta__Price Price Text--subdued u-h4">
                      $45
                    </span>
                  </div>
                  {showDescription && !descriptionBelowAtc ? (
                    <div className="ProductMeta__Description Rte">
                      <p>
                        Add a product handle in theme settings to feature a real
                        catalog item.
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="ProductForm">
                  <button
                    type="button"
                    className="ProductForm__AddToCart Button Button--primary Button--full"
                  >
                    <span>Add to cart</span>
                    {showPriceInButton ? (
                      <>
                        <span className="Button__SeparatorDot"></span>
                        <span>$45.00</span>
                      </>
                    ) : null}
                  </button>
                </div>
                {showDescription && descriptionBelowAtc ? (
                  <div className="ProductMeta__Description Rte">
                    <p>Description appears below the button when enabled.</p>
                  </div>
                ) : null}
                <div className="FeaturedProduct__ViewWrapper">
                  <span
                    className="Link Link--underline"
                    style={{ opacity: 0.7 }}
                  >
                    View product
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
