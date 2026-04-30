import { resolveShopifyAssetUrl } from "@/lib/shopify/assetUrls";
import Image from "next/image";

export function Slideshow({
  id,
  settings,
  blocks,
  blockOrder,
}: {
  id: string;
  settings: Record<string, unknown>;
  blocks: Record<string, unknown>;
  blockOrder: string[];
}) {
  const showFullscreen = Boolean(settings.show_fullscreen ?? false);
  const showArrow = Boolean(settings.show_arrow ?? false);
  const autoplay = Boolean(settings.autoplay ?? true);
  const cycleSpeed = Number(settings.cycle_speed ?? 5);
  const textColor =
    typeof settings.text_color === "string" ? settings.text_color : "#ffffff";
  const buttonColor =
    typeof settings.button_color === "string"
      ? settings.button_color
      : "#363636";
  const buttonBackground =
    typeof settings.button_background === "string"
      ? settings.button_background
      : "#ffffff";

  const flickityConfig = {
    prevNextButtons: false,
    setGallerySize: showFullscreen ? false : true,
    adaptiveHeight: showFullscreen ? false : true,
    wrapAround: true,
    dragThreshold: 15,
    pauseAutoPlayOnHover: false,
    autoPlay: autoplay ? cycleSpeed * 1000 : false,
    pageDots: blockOrder.length > 1,
  };

  const slides = blockOrder
    .map((blockId, idx) => {
      const block = blocks[blockId] as
        | { settings?: Record<string, unknown> }
        | undefined;
      const s = block?.settings ?? {};

      const image =
        typeof s.image === "string" ? resolveShopifyAssetUrl(s.image) : null;
      const mobileImage =
        typeof s.mobile_image === "string"
          ? resolveShopifyAssetUrl(s.mobile_image)
          : null;
      const applyOverlay = Boolean(s.apply_overlay ?? false);
      const contentPosition =
        typeof s.content_position === "string"
          ? s.content_position
          : "bottomLeft";
      const subheading = typeof s.subheading === "string" ? s.subheading : "";
      const title = typeof s.title === "string" ? s.title : "";
      const b1Text = typeof s.button_1_text === "string" ? s.button_1_text : "";
      const b1Link =
        typeof s.button_1_link === "string"
          ? resolveShopifyAssetUrl(s.button_1_link)
          : "";
      const b2Text = typeof s.button_2_text === "string" ? s.button_2_text : "";
      const b2Link =
        typeof s.button_2_link === "string"
          ? resolveShopifyAssetUrl(s.button_2_link)
          : "";

      const hasContent = Boolean(subheading || title || b1Text || b2Text);

      const isClickableImage = !b1Text && Boolean(b1Link);
      const SlideTag = (isClickableImage ? "a" : "div") as "a" | "div";
      const slideProps = isClickableImage
        ? ({ href: b1Link || "#" } as const)
        : ({} as const);

      return (
        <SlideTag
          key={blockId}
          id={`Slide${blockId}`}
          className={`Slideshow__Slide Carousel__Cell ${idx === 0 ? "is-selected" : ""}`.trim()}
          style={idx === 0 ? { visibility: "visible" } : undefined}
          data-slide-index={idx}
          {...slideProps}
        >
          {mobileImage ? (
            <div
              className={`Slideshow__ImageContainer ${applyOverlay ? "Image--contrast" : ""} ${
                showFullscreen ? "" : "AspectRatio"
              } hidden-tablet-and-up`.trim()}
              style={{
                ...(showFullscreen ? {} : { ["--aspect-ratio" as any]: 1 }),
                backgroundImage: `url(${mobileImage})`,
              }}
            >
              <Image
                className="Slideshow__Image Image--lazyLoad"
                src={mobileImage}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                priority={idx === 0}
              />
              <noscript>
                <Image
                  className="Slideshow__Image"
                  src={mobileImage}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </noscript>
            </div>
          ) : null}

          {image ? (
            <div
              className={`Slideshow__ImageContainer ${applyOverlay ? "Image--contrast" : ""} ${
                showFullscreen ? "" : "AspectRatio AspectRatio--withFallback"
              } hidden-phone`.trim()}
              style={{
                ...(showFullscreen
                  ? {}
                  : {
                      paddingBottom: "44.44%",
                      ["--aspect-ratio" as any]: 2.25,
                    }),
                backgroundImage: `url(${image})`,
              }}
            >
              <Image
                className="Slideshow__Image Image--lazyLoad hide-no-js"
                src={image}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                priority={idx === 0}
              />
              <noscript>
                <Image
                  className="Slideshow__Image"
                  src={image}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </noscript>
            </div>
          ) : (
            <div
              className={`Slideshow__ImageContainer ${applyOverlay ? "Image--contrast" : ""} PlaceholderSvg--dark`.trim()}
            >
              <div className="Slideshow__Image PlaceholderBackground__Svg" />
            </div>
          )}

          {hasContent ? (
            <div
              className={`Slideshow__Content Slideshow__Content--${contentPosition}`.trim()}
            >
              <header className="SectionHeader">
                {subheading ? (
                  <h3 className="SectionHeader__SubHeading Heading u-h6">
                    {subheading}
                  </h3>
                ) : null}
                {title ? (
                  <h2 className="SectionHeader__Heading SectionHeader__Heading--emphasize Heading u-h1">
                    {title}
                  </h2>
                ) : null}
                {b1Text || b2Text ? (
                  <div className="SectionHeader__ButtonWrapper">
                    <div
                      className={`ButtonGroup ButtonGroup--spacingSmall ${b1Text && b2Text ? "ButtonGroup--sameSize" : ""}`.trim()}
                    >
                      {b1Text ? (
                        <a
                          href={b1Link || "#"}
                          className="ButtonGroup__Item Button"
                        >
                          {b1Text}
                        </a>
                      ) : null}
                      {b2Text ? (
                        <a
                          href={b2Link || "#"}
                          className="ButtonGroup__Item Button"
                        >
                          {b2Text}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </header>
            </div>
          ) : null}
        </SlideTag>
      );
    })
    .filter(Boolean);

  const sectionStyle = `
#section-${id} .Heading,
#section-${id} .flickity-page-dots { color: ${textColor}; }
#section-${id} .Button { color: ${buttonColor}; border-color: ${buttonBackground}; }
#section-${id} .Button::before { background-color: ${buttonBackground}; }
`;

  return (
    <>
      <section
        id={`section-${id}`}
        data-section-id={id}
        data-section-type="slideshow"
      >
        <div
          className={`Slideshow ${showFullscreen ? "Slideshow--fullscreen" : ""}`.trim()}
        >
          <div
            className={`Slideshow__Carousel ${showArrow ? "Slideshow__Carousel--withScrollButton" : ""} Carousel Carousel--fadeIn ${
              showFullscreen ? "Carousel--fixed" : ""
            } Carousel--insideDots`.trim()}
            data-flickity-config={JSON.stringify(flickityConfig)}
          >
            {slides}
          </div>

          {showArrow ? (
            <button
              data-href={`#section-${id}-end`}
              className="Slideshow__ScrollButton RoundButton RoundButton--medium"
              aria-label="Scroll to content"
            >
              ↓
            </button>
          ) : null}
        </div>

        <span id={`section-${id}-end`} className="Anchor"></span>
      </section>

      <style // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sectionStyle }}
      />
    </>
  );
}
