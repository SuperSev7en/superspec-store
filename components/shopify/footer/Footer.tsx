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
            {/* Links block */}
            <div className="Footer__Block Footer__Block--links">
              <h2 className="Footer__Title Heading u-h6">Quick Links</h2>
              <ul className="Linklist">
                {[
                  { title: "Shop", url: "/products" },
                  { title: "About", url: "/about" },
                  { title: "Contact", url: "/contact" },
                  { title: "Shipping Policy", url: "/policies/shipping" },
                  { title: "Refund Policy", url: "/policies/refund" },
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

            {/* Newsletter block */}
            <div className="Footer__Block Footer__Block--newsletter">
              <h2 className="Footer__Title Heading u-h6">Newsletter</h2>
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
