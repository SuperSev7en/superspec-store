import type { ThemeSettings } from "@/lib/shopify/themeSettings";
import { FooterNewsletterForm } from "@/components/store/FooterNewsletterForm";

/**
 * Footer — matches `sections/footer.liquid` from the Prestige theme.
 *
 * Shopify config (settings_data.json):
 *   - Block 1: links (footer menu)
 *   - Block 2: newsletter
 *   - show_payment_methods: true
 *   - footer_background: #000000
 *   - footer_heading_color: #5c5c5c
 *   - footer_text_color: #000000
 */
export function Footer({
  settings,
  shopName = "SUPER Spec.",
}: {
  settings: ThemeSettings;
  section?: unknown;
  shopName?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <>
      <footer
        id="section-footer"
        data-section-id="footer"
        data-section-type="footer"
        className="Footer"
        role="contentinfo"
      >
        <div className="Container">
          {/* ── Footer blocks ── */}
            <div className="Footer__Inner">
            {/* Column 1: Brand */}
            <div className="Footer__Block Footer__Block--text">
              <h2 className="Footer__Title Heading u-h6">{shopName}</h2>
              <div className="Footer__Content Rte">
                <p>Love, diversity, and individuality through light and color.</p>
              </div>
              <div className="Footer__Social" style={{ marginTop: 20 }}>
                <ul className="HorizontalList HorizontalList--spacingLoose">
                  {[
                    { name: 'Instagram', url: 'https://www.instagram.com/superspec.store/' },
                    { name: 'TikTok', url: 'https://www.tiktok.com/@superspec.store' },
                    { name: 'Twitter', url: 'https://x.com/SUPERSpec_store' },
                    { name: 'Pinterest', url: 'https://www.pinterest.com/superspecstore/' },
                  ].map(social => (
                    <li key={social.name} className="HorizontalList__Item">
                      <a href={social.url} target="_blank" rel="noopener noreferrer" className="Link Link--primary" aria-label={social.name}>
                        <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{social.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Shop */}
            <div className="Footer__Block Footer__Block--links">
              <h2 className="Footer__Title Heading u-h6">Shop</h2>
              <ul className="Linklist">
                {[
                  { title: "Super Spectrum (Art)", url: "/collections/super-spectrum" },
                  { title: "Super Speck (Clothing)", url: "/collections/super-speck" },
                  { title: "New Arrivals", url: "/products" },
                ].map((link) => (
                  <li key={link.url} className="Linklist__Item">
                    <a href={link.url} className="Link Link--primary">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Help */}
            <div className="Footer__Block Footer__Block--links">
              <h2 className="Footer__Title Heading u-h6">Help</h2>
              <ul className="Linklist">
                {[
                  { title: "About", url: "/about" },
                  { title: "Mission & Sustainability", url: "/mission-and-sustainability" },
                  { title: "Contact", url: "/contact" },
                  { title: "Privacy Policy", url: "/policies/privacy" },
                  { title: "Terms of Service", url: "/policies/terms" },
                ].map((link) => (
                  <li key={link.url} className="Linklist__Item">
                    <a href={link.url} className="Link Link--primary">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="Footer__Block Footer__Block--newsletter">
              <h2 className="Footer__Title Heading u-h6">Join the Spec</h2>
              <div className="Footer__Content Rte">
                <p>
                  Subscribe to receive updates, access to exclusive deals, and
                  more.
                </p>
              </div>
              <FooterNewsletterForm />
            </div>
          </div>

          {/* ── Aside (copyright + payment) ── */}
          <div className="Footer__Aside">
            <div className="Footer__Copyright">
              <a
                href="/"
                className="Footer__StoreName Heading u-h7 Link Link--secondary"
              >
                © {year} {shopName}
              </a>
            </div>

            {/* Payment method icons */}
            <ul className="Footer__PaymentList HorizontalList">
              {["Visa", "MC", "Amex", "Apple Pay", "GPay"].map((p) => (
                <li key={p} className="HorizontalList__Item">
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--footer-heading-color)",
                      fontWeight: 600,
                      padding: "2px 6px",
                      border: "1px solid var(--footer-border-color)",
                      borderRadius: 3,
                      display: "inline-block",
                    }}
                  >
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Border when footer/background match */}
      {settings.footer_background === settings.background ? (
        <style
          dangerouslySetInnerHTML={{
            __html: `.Footer { border-top: 1px solid var(--border-color); }`,
          }}
        />
      ) : null}
    </>
  );
}
