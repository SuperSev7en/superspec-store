import { CollectionItem } from '@/components/shopify/sections/CollectionListItem';

export function CollectionList({
  id,
  settings,
  blocks,
  blockOrder,
  template = 'index',
}: {
  id: string;
  settings: Record<string, unknown>;
  blocks: Record<string, unknown>;
  blockOrder: string[];
  template?: string;
}) {
  const stackOnMobile = Boolean(settings.stack_on_mobile ?? true);
  const addSpacing = Boolean(settings.add_spacing ?? true);
  const expandCollection = Boolean(settings.expand_collection ?? false);
  const imageSize = typeof settings.image_size === 'string' ? settings.image_size : 'normal';
  const textColor = typeof settings.text_color === 'string' ? settings.text_color : '#ffffff';
  const buttonColor = typeof settings.button_color === 'string' ? settings.button_color : '#363636';

  const sectionStyle = `
#section-${id} .CollectionItem .Heading,
#section-${id} .flickity-page-dots { color: ${textColor}; }
#section-${id} .CollectionItem__Link { color: ${buttonColor}; border-color: ${textColor}; }
#section-${id} .CollectionItem__Link::before { background-color: ${textColor}; }
@media (-moz-touch-enabled: 0), (hover: hover) {
  #section-${id} .CollectionItem__Link:hover { color: ${textColor}; }
}
`;

  const items = blockOrder
    .map((blockId, idx) => {
      const block = blocks[blockId] as { type?: string; settings?: Record<string, unknown> } | undefined;
      if (!block?.settings) return null;
      return (
        <CollectionItem
          key={blockId}
          blockId={blockId}
          blockIndex={idx}
          blockSettings={block.settings}
          sectionSettings={{ expand_collection: expandCollection, image_size: imageSize }}
          template={template}
        />
      );
    })
    .filter(Boolean);

  return (
    <>
      <section id={`section-${id}`} data-section-id={id} data-section-type="collection-list">
        {stackOnMobile ? (
          <div className={`CollectionList CollectionList--grid ${addSpacing ? 'CollectionList--spaced' : ''}`.trim()}>
            {items}
          </div>
        ) : (
          <div className={`Carousel Carousel--insideDots CollectionList ${addSpacing ? 'CollectionList--spaced' : ''}`.trim()}>
            {items}
          </div>
        )}
      </section>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sectionStyle }}
      />
    </>
  );
}

