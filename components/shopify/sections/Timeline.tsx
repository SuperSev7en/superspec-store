'use client';

import { useState } from 'react';
import { resolveShopifyAssetUrl } from '@/lib/shopify/assetUrls';

export function Timeline({
  id,
  textColor,
  blocks,
  blockOrder,
}: {
  id: string;
  textColor: string;
  blocks: Record<string, { type?: string; settings?: Record<string, unknown> }>;
  blockOrder: string[];
}) {
  const ordered = blockOrder.map((bid) => ({
    id: bid,
    settings: blocks[bid]?.settings ?? {},
  }));

  const [active, setActive] = useState(0);

  return (
    <>
      <section
        id={`section-${id}`}
        className="Section Section--spacingNormal"
        data-section-id={id}
        data-section-type="timeline"
      >
        <div className="Container">
          <div className="Timeline">
            <div className="Timeline__ListItem">
              {ordered.map((block, idx) => {
                const s = block.settings;
                const image =
                  typeof s.image === 'string' ? resolveShopifyAssetUrl(s.image) : null;
                const overlay = Boolean(s.apply_overlay ?? false);
                const subheading = typeof s.subheading === 'string' ? s.subheading : '';
                const heading = typeof s.heading === 'string' ? s.heading : '';
                const content = typeof s.content === 'string' ? s.content : '';
                const inner = subheading || heading || content;

                return (
                  <div
                    key={block.id}
                    className={`Timeline__Item ${idx === active ? 'is-selected' : ''}`.trim()}
                    data-index={idx}
                    hidden={idx !== active}
                  >
                    <div
                      className={`Timeline__ImageWrapper ${overlay ? 'Image--contrast' : ''}`.trim()}
                      style={image ? { backgroundImage: `url(${image})` } : undefined}
                    >
                      {image ? (
                        <div className="Timeline__Image" style={{ minHeight: 320, backgroundSize: 'cover' }} />
                      ) : (
                        <div className="Timeline__Image">
                          <div className="PlaceholderBackground">
                            <div
                              className="PlaceholderBackground__Svg PlaceholderSvg PlaceholderSvg--dark"
                              style={{ minHeight: 320, background: 'rgba(255,255,255,0.06)' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {inner ? (
                      <div className="Timeline__Inner">
                        <header className="Timeline__Header SectionHeader SectionHeader--center">
                          {subheading ? (
                            <h3 className="SectionHeader__SubHeading Heading u-h6">{subheading}</h3>
                          ) : null}
                          {heading ? <h2 className="SectionHeader__Heading Heading u-h1">{heading}</h2> : null}
                          {content ? (
                            <div
                              className="SectionHeader__Description Rte"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          ) : null}
                        </header>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {ordered.length >= 2 ? (
              <div className="Timeline__Nav">
                <div
                  className={`Timeline__NavWrapper ${ordered.length <= 3 ? 'Timeline__NavWrapper--center' : ''}`.trim()}
                >
                  {ordered.map((block, idx) => {
                    const title =
                      typeof block.settings.title === 'string'
                        ? block.settings.title
                        : `Step ${idx + 1}`;
                    const short = title.length > 20 ? `${title.slice(0, 20)}…` : title;
                    return (
                      <button
                        key={block.id}
                        type="button"
                        className={`Timeline__NavItem Link Link--primary ${idx === active ? 'is-selected' : ''}`.trim()}
                        data-index={idx}
                        onClick={() => setActive(idx)}
                      >
                        <span className="Timeline__NavLabel">{short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `#section-${id} .Timeline__ListItem { color: ${textColor}; }`,
        }}
      />
    </>
  );
}
