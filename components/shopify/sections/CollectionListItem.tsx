import { resolveShopifyAssetUrl, resolveShopifyLink } from '@/lib/shopify/assetUrls';

function getAlignmentValue(v: unknown) {
  return typeof v === 'string' && v.trim() ? v : 'center center';
}

export function CollectionItem({
  blockId,
  blockIndex,
  blockSettings,
  sectionSettings,
  template,
}: {
  blockId: string;
  blockIndex: number;
  blockSettings: Record<string, unknown>;
  sectionSettings: { expand_collection: boolean; image_size: string };
  template: string;
}) {
  const image = typeof blockSettings.image === 'string' ? resolveShopifyAssetUrl(blockSettings.image) : null;
  const imageAlignment = getAlignmentValue(blockSettings.image_alignment);
  const contentPosition = typeof blockSettings.content_position === 'string' ? blockSettings.content_position : 'bottomLeft';
  const subheading = typeof blockSettings.subheading === 'string' ? blockSettings.subheading : '';
  const title = typeof blockSettings.title === 'string' ? blockSettings.title : '';
  const buttonText = typeof blockSettings.button_text === 'string' ? blockSettings.button_text : 'View products';
  const buttonLink = typeof blockSettings.button_link === 'string' ? resolveShopifyLink(blockSettings.button_link) : '#';
  const applyOverlay = Boolean(blockSettings.apply_overlay ?? false);

  const imageLayerClass = [
    'CollectionItem__Image',
    'CollectionItem__Image--containFit',
    applyOverlay ? 'Image--contrast' : '',
    image ? 'Image--lazyLoaded Image--zoomOut' : 'Image--lazyLoad Image--zoomOut',
    'hide-no-js',
  ]
    .join(' ')
    .trim();

  return (
    <a
      href={buttonLink || '#'}
      className={`CollectionItem ${sectionSettings.expand_collection ? 'CollectionItem--expand' : ''} ${
        template === 'index' ? `Carousel__Cell ${blockIndex === 0 ? 'is-selected' : ''}` : ''
      }`.trim()}
      data-slide-index={blockIndex}
    >
      <div className={`CollectionItem__Wrapper CollectionItem__Wrapper--${sectionSettings.image_size}`}>
        <div className="CollectionItem__ImageWrapper">
          <div
            className={imageLayerClass}
            style={{
              backgroundPosition: imageAlignment,
              ...(image ? { backgroundImage: `url(${image})` } : {}),
            }}
          >
            {!image ? (
              <div className="PlaceholderBackground PlaceholderSvg--dark">
                <div className="PlaceholderBackground__Svg" />
              </div>
            ) : null}
          </div>

          {image ? (
            <noscript>
              <div
                className={`CollectionItem__Image ${applyOverlay ? 'Image--contrast' : ''}`.trim()}
                style={{ backgroundPosition: imageAlignment, backgroundImage: `url(${image})` }}
              ></div>
            </noscript>
          ) : null}
        </div>

        <div className={`CollectionItem__Content CollectionItem__Content--${contentPosition}`.trim()}>
          <header className="SectionHeader">
            {subheading ? <h3 className="SectionHeader__SubHeading Heading u-h6">{subheading}</h3> : null}
            <h2 className="SectionHeader__Heading SectionHeader__Heading--emphasize Heading u-h1">{title}</h2>
            <div className="SectionHeader__ButtonWrapper">
              <span className="CollectionItem__Link Button">{buttonText}</span>
            </div>
          </header>
        </div>
      </div>
    </a>
  );
}

