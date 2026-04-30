import { loadCatalog } from "@/lib/catalog/catalog";
import type { CatalogProduct } from "@/lib/catalog/catalog";
import { ProductItem } from "@/components/shopify/sections/ProductItem";
import { resolveShopifyAssetUrl } from "@/lib/shopify/assetUrls";

export async function ShopTheLook({
  id,
  settings,
  blocks,
  blockOrder,
}: {
  id: string;
  settings: Record<string, unknown>;
  blocks: Record<string, { type?: string; settings?: Record<string, unknown> }>;
  blockOrder: string[];
}) {
  const subheading =
    typeof settings.subheading === "string" ? settings.subheading : "";
  const title = typeof settings.title === "string" ? settings.title : "";
  const showMobileProductInfo = Boolean(
    settings.show_mobile_product_info ?? false,
  );

  const catalog = await loadCatalog();
  const byHandle = new Map(catalog.map((p) => [p.handle, p]));

  type LookBlock = {
    blockId: string;
    image: string | null;
    dotStyle: string;
    products: CatalogProduct[];
    positions: { left: number; top: number }[];
  };

  const looks: LookBlock[] = [];

  for (const bid of blockOrder) {
    const b = blocks[bid];
    const s = b?.settings ?? {};
    const image =
      typeof s.image === "string" ? resolveShopifyAssetUrl(s.image) : null;
    const dotStyle = typeof s.dot_style === "string" ? s.dot_style : "light";
    const handles: string[] = [];
    const positions: { left: number; top: number }[] = [];
    for (let i = 1; i <= 3; i++) {
      const h =
        typeof s[`product_${i}`] === "string"
          ? String(s[`product_${i}`]).trim()
          : "";
      const left = Number(s[`product_${i}_horizontal_position`]) || 30 + i * 10;
      const top = Number(s[`product_${i}_vertical_position`]) || 40 + i * 5;
      if (h) {
        handles.push(h);
        positions.push({ left, top });
      }
    }
    const products = handles
      .map((h) => byHandle.get(h))
      .filter(Boolean) as CatalogProduct[];
    const onboarding = !image && products.length === 0;

    looks.push({
      blockId: bid,
      image,
      dotStyle,
      products: onboarding ? [] : products,
      positions,
    });
  }

  const firstProduct = looks.flatMap((l) => l.products)[0];
  const firstHref = firstProduct
    ? `/products/${firstProduct.handle}`
    : "/products";

  return (
    <section
      className="Section Section--spacingNormal"
      data-section-id={id}
      data-section-type="shop-the-look"
    >
      {subheading || title ? (
        <header className="SectionHeader SectionHeader--center">
          <div className="Container">
            {subheading ? (
              <h3 className="SectionHeader__SubHeading Heading u-h6">
                {subheading}
              </h3>
            ) : null}
            {title ? (
              <h2 className="SectionHeader__Heading Heading u-h1">{title}</h2>
            ) : null}
          </div>
        </header>
      ) : null}

      <div className="ShopTheLook Carousel">
        {looks.map((look, slideIdx) => {
          const onboarding = !look.image && look.products.length === 0;
          const dots =
            onboarding || look.products.length === 0
              ? [1, 2, 3].map((_, i) => ({
                  left: 30 + i * 15,
                  top: 40 + i * 8,
                  href: "#",
                }))
              : look.products.map((p, i) => ({
                  left: look.positions[i]?.left ?? 30,
                  top: look.positions[i]?.top ?? 40,
                  href: `/products/${p.handle}`,
                }));

          return (
            <div
              key={look.blockId}
              className={`ShopTheLook__Item Carousel__Cell ${slideIdx === 0 ? "is-selected" : ""}`.trim()}
              id={`block-${look.blockId}`}
              data-slide-index={slideIdx}
            >
              <div className="ShopTheLook__Inner">
                <div
                  className="ShopTheLook__ImageWrapper"
                  style={{ maxWidth: 550, position: "relative" }}
                >
                  <div
                    className={
                      look.image ? "AspectRatio AspectRatio--withFallback" : ""
                    }
                    style={{
                      minHeight: 360,
                      background: look.image
                        ? `url(${look.image}) center/cover`
                        : undefined,
                    }}
                  >
                    {!look.image ? (
                      <div
                        className="PlaceholderSvg PlaceholderSvg--dark"
                        style={{ minHeight: 360, opacity: 0.5 }}
                      />
                    ) : null}
                  </div>
                  {dots.map((d, i) => (
                    <a
                      key={i}
                      href={d.href}
                      className={`ShopTheLook__Dot ShopTheLook__Dot--${look.dotStyle} ${i === 0 ? "is-active" : ""}`.trim()}
                      data-product-index={i + 1}
                      style={{
                        position: "absolute",
                        left: `${d.left}%`,
                        top: `${d.top}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      aria-label={`Product ${i + 1}`}
                    />
                  ))}
                </div>

                <div
                  className={`ShopTheLook__ProductList Carousel hidden-pocket ${showMobileProductInfo ? "" : ""}`.trim()}
                  data-look-index={slideIdx}
                >
                  {onboarding || look.products.length === 0
                    ? [0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`ShopTheLook__ProductItem Carousel__Cell ${i === 0 ? "is-selected" : ""}`.trim()}
                        >
                          <div className="ProductItem">
                            <div className="ProductItem__Wrapper">
                              <span
                                className="ProductItem__ImageWrapper"
                                style={{ cursor: "default" }}
                              >
                                <div
                                  className="ProductItem__Image PlaceholderSvg"
                                  style={{
                                    minHeight: 200,
                                    background: "rgba(255,255,255,0.06)",
                                  }}
                                />
                              </span>
                              <div className="ProductItem__Info ProductItem__Info--center">
                                <h2 className="ProductItem__Title Heading">
                                  Sample product
                                </h2>
                                <div className="ProductItem__PriceList Heading">
                                  <span className="ProductItem__Price Price Text--subdued">
                                    $45
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : look.products.map((p, i) => (
                        <div
                          key={p.handle}
                          className={`ShopTheLook__ProductItem Carousel__Cell ${i === 0 ? "is-selected" : ""}`.trim()}
                        >
                          <ProductItem product={p} showLabels={false} />
                        </div>
                      ))}
                  <a
                    href={firstHref}
                    className="ShopTheLook__ViewButton Button Button--primary Button--full"
                  >
                    View product
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
