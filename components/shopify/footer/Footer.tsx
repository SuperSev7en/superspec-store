import type { ThemeSettings } from '@/lib/shopify/themeSettings';
import { MAIN_NAV_LINKS } from '@/lib/siteNavigation';

type FooterBlock =
  | { type: 'text'; title?: string; contentHtml?: string; showSocialMedia?: boolean }
  | { type: 'links'; title?: string; links: Array<{ title: string; url: string }> }
  | { type: 'newsletter'; title?: string; contentHtml?: string };

export function Footer({
  settings,
  section,
  shopName = 'SUPER Spec',
  poweredBy = 'Powered by SUPER Spec',
}: {
  settings: ThemeSettings;
  section?: { settings?: Record<string, unknown>; blocks?: Record<string, unknown>; block_order?: string[] };
  shopName?: string;
  poweredBy?: string;
}) {
  const blocks: FooterBlock[] = [];

  const sectionBlocks = section?.blocks ?? {};
  const order = section?.block_order ?? [];
  for (const blockId of order) {
    const block = sectionBlocks[blockId] as { type?: string; settings?: Record<string, unknown> } | undefined;
    if (!block?.type) continue;

    if (block.type === 'text') {
      blocks.push({
        type: 'text',
        title: typeof block.settings?.title === 'string' ? block.settings.title : undefined,
        contentHtml: typeof block.settings?.content === 'string' ? block.settings.content : undefined,
        showSocialMedia: Boolean(block.settings?.show_social_media),
      });
      continue;
    }

    if (block.type === 'links') {
      blocks.push({
        type: 'links',
        title: 'Quick links',
        links: [...MAIN_NAV_LINKS],
      });
      continue;
    }

    if (block.type === 'newsletter') {
      blocks.push({
        type: 'newsletter',
        title: typeof block.settings?.title === 'string' ? block.settings.title : undefined,
        contentHtml: typeof block.settings?.content === 'string' ? block.settings.content : undefined,
      });
      continue;
    }
  }

  if (blocks.length === 0) {
    blocks.push(
      {
        type: 'links',
        title: 'Quick links',
        links: [...MAIN_NAV_LINKS],
      },
      {
        type: 'newsletter',
        title: 'Newsletter',
        contentHtml: '<p>Subscribe to receive updates, access to exclusive deals, and more.</p>',
      },
    );
  }

  return (
    <>
      <footer
        id="section-footer"
        data-section-id="footer"
        data-section-type="footer"
        className={`Footer ${blocks.length <= 2 ? 'Footer--center' : ''}`.trim()}
        role="contentinfo"
      >
        <div className="Container">
          {blocks.length > 0 ? (
            <div className="Footer__Inner">
              {blocks.map((block, idx) => {
                if (block.type === 'text') {
                  return (
                    <div key={idx} className="Footer__Block Footer__Block--text">
                      {block.title ? <h2 className="Footer__Title Heading u-h6">{block.title}</h2> : null}
                      {block.contentHtml ? (
                        <div
                          className="Footer__Content Rte"
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{ __html: block.contentHtml }}
                        />
                      ) : null}
                    </div>
                  );
                }

                if (block.type === 'links') {
                  return (
                    <div key={idx} className="Footer__Block Footer__Block--links">
                      {block.title ? <h2 className="Footer__Title Heading u-h6">{block.title}</h2> : null}
                      <ul className="Linklist">
                        {block.links.map((link) => (
                          <li key={`${link.url}-${link.title}`} className="Linklist__Item">
                            <a href={link.url} className="Link Link--primary">
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="Footer__Block Footer__Block--newsletter">
                    {block.title ? <h2 className="Footer__Title Heading u-h6">{block.title}</h2> : null}
                    {block.contentHtml ? (
                      <div
                        className="Footer__Content Rte"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: block.contentHtml }}
                      />
                    ) : null}

                    <form id="footer-newsletter" className="Footer__Newsletter Form">
                      <input type="hidden" name="contact[tags]" value="newsletter" />
                      <input type="email" name="contact[email]" className="Form__Input" aria-label="Email" placeholder="Email" required />
                      <button type="submit" className="Form__Submit Button Button--primary">
                        Subscribe
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Legal Disclaimers */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginTop: 8 }}>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--text-color-secondary, #666)', margin: '0 0 6px', opacity: 0.8 }}>
              All artwork and designs are original creations of SUPER Spec. and are protected under applicable copyright laws. 
              Unauthorized reproduction, distribution, or use of any content, images, or designs from this site is strictly prohibited.
            </p>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--text-color-secondary, #666)', margin: '0 0 6px', opacity: 0.8 }}>
              All sales are final. Returns and exchanges are handled on a case-by-case basis. 
              Please contact us at support@superspec.studio for any order inquiries.
            </p>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--text-color-secondary, #666)', margin: 0, opacity: 0.8 }}>
              Prices are in USD. Shipping times and costs vary by location. Limited edition items are subject to availability.
            </p>
          </div>

          <div className="Footer__Aside">
            <div className="Footer__Copyright">
              <a href="/" className="Footer__StoreName Heading u-h7 Link Link--secondary">
                &copy; {new Date().getFullYear()} {shopName}
              </a>
              <p className="Footer__ThemeAuthor">{poweredBy}</p>
            </div>

            {/* Payment method icons */}
            <ul className="Footer__PaymentList HorizontalList" style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: '8px 0 0', justifyContent: 'center', flexWrap: 'wrap' }}>
              <li className="HorizontalList__Item" style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Visa</li>
              <li className="HorizontalList__Item" style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Mastercard</li>
              <li className="HorizontalList__Item" style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Amex</li>
              <li className="HorizontalList__Item" style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Apple Pay</li>
              <li className="HorizontalList__Item" style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Google Pay</li>
              <li className="HorizontalList__Item" style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>PayPal</li>
            </ul>
          </div>
        </div>
      </footer>

      {settings.footer_background === settings.background ? (
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `.Footer{border-top:1px solid var(--border-color);}`,
          }}
        />
      ) : null}
    </>
  );
}
