import type { ThemeSettings } from "@/lib/shopify/themeSettings";
import { FooterNewsletterForm } from "@/components/store/FooterNewsletterForm";

export function Footer({
  settings,
  shopName = "SUPER Spec.",
}: {
  settings: ThemeSettings;
  section?: unknown;
  shopName?: string;
  poweredBy?: string;
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
        style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: 60,
          paddingBottom: 32,
        }}
      >
        <div className="Container">
          {/* 4-Column Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "40px",
              marginBottom: "48px",
            }}
          >
            {/* Column 1 — Brand */}
            <div>
              <a
                href="/"
                className="Footer__StoreName Heading u-h5 Link Link--secondary"
                style={{ display: "block", marginBottom: 12 }}
              >
                {shopName}
              </a>
              <p
                className="Text--subdued"
                style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}
              >
                Art, apparel, and engineered goods for those who live beyond the
                ordinary.
              </p>
              {/* Social Icons */}
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                {[
                  {
                    label: "Instagram",
                    href: "#",
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle
                          cx="17.5"
                          cy="6.5"
                          r="1"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "TikTok",
                    href: "#",
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.94a8.16 8.16 0 004.77 1.52V7a4.85 4.85 0 01-1-.31z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Twitter / X",
                    href: "#",
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Pinterest",
                    href: "#",
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="Footer__SocialIcon"
                    style={{
                      color: "var(--text-light-color)",
                      transition: "color 0.2s",
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Shop */}
            <div>
              <h2
                className="Footer__Title Heading u-h6"
                style={{ marginBottom: 16 }}
              >
                Shop
              </h2>
              <ul
                className="Linklist"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { title: "Art Prints", url: "/collections/super-spectrum" },
                  { title: "Clothing", url: "/collections/super-speck" },
                  {
                    title: "Engineered Goods",
                    url: "/collections/super-specification",
                  },
                  { title: "New Arrivals", url: "/products?sort=newest" },
                  { title: "All Products", url: "/products" },
                ].map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      className="Link Link--secondary"
                      style={{ fontSize: 14 }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Help */}
            <div>
              <h2
                className="Footer__Title Heading u-h6"
                style={{ marginBottom: 16 }}
              >
                Help
              </h2>
              <ul
                className="Linklist"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { title: "Contact Us", url: "/contact" },
                  { title: "FAQ", url: "/policies/faq" },
                  { title: "Shipping Policy", url: "/policies/shipping" },
                  { title: "Returns & Exchanges", url: "/policies/refund" },
                  { title: "Track My Order", url: "/account/orders" },
                ].map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      className="Link Link--secondary"
                      style={{ fontSize: 14 }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Newsletter */}
            <div>
              <h2
                className="Footer__Title Heading u-h6"
                style={{ marginBottom: 8 }}
              >
                Join the Spec
              </h2>
              <p
                className="Text--subdued"
                style={{ fontSize: 13, marginBottom: 16 }}
              >
                Get 10% off your first order + early access to new drops.
              </p>
              <FooterNewsletterForm />
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div
            style={{
              borderTop: "1px solid var(--border-color)",
              paddingTop: 20,
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.6,
                color: "var(--text-light-color)",
                margin: 0,
              }}
            >
              All artwork and designs are original creations of SUPER Spec. and
              are protected under applicable copyright laws. Unauthorized
              reproduction or distribution is strictly prohibited.
            </p>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "var(--text-light-color)",
                margin: 0,
              }}
            >
              © {year} SUPER Spec.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { title: "Privacy Policy", url: "/policies/privacy" },
                { title: "Terms of Service", url: "/policies/terms" },
                { title: "Shipping Policy", url: "/policies/shipping" },
              ].map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="Link Link--secondary"
                  style={{ fontSize: 12 }}
                >
                  {link.title}
                </a>
              ))}
            </div>
            {/* Payment icons */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {["Visa", "MC", "Amex", "Apple Pay", "GPay"].map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: 10,
                    color: "var(--text-light-color)",
                    fontWeight: 600,
                    padding: "2px 6px",
                    border: "1px solid var(--border-color)",
                    borderRadius: 3,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {settings.footer_background === settings.background ? (
        <style
          dangerouslySetInnerHTML={{
            __html: `.Footer{border-top:1px solid var(--border-color);} .Footer__SocialIcon:hover { color: var(--text-color) !important; }`,
          }}
        />
      ) : (
        <style
          dangerouslySetInnerHTML={{
            __html: `.Footer__SocialIcon:hover { color: var(--text-color) !important; }`,
          }}
        />
      )}
    </>
  );
}
