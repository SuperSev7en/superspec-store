import type { ThemeSettings } from '@/lib/shopify/themeSettings';
import { Icon } from '@/components/shopify/icons/Icon';
import { resolveShopifyAssetUrl } from '@/lib/shopify/assetUrls';

type MenuLink = { title: string; url: string; active?: boolean };

export function Header({
  settings,
  sectionSettings,
  shopName = 'SUPER Spec',
  menu = [
    { title: 'Shop', url: '/products' },
    { title: 'About', url: '/about' },
    { title: 'Contact', url: '/contact' },
    { title: 'FAQ', url: '/faq' },
  ],
  cartItemCount = 0,
}: {
  settings: ThemeSettings;
  sectionSettings: Record<string, unknown>;
  shopName?: string;
  menu?: MenuLink[];
  cartItemCount?: number;
}) {
  const useStickyHeader = Boolean(sectionSettings.use_sticky_header ?? true);
  const navigationStyle = String(sectionSettings.navigation_style ?? 'inline');
  const logo = typeof sectionSettings.logo === 'string' ? resolveShopifyAssetUrl(sectionSettings.logo) : null;
  const logoMaxWidth = Number(sectionSettings.logo_max_width ?? 140);

  return (
    <>
      <div id="Search" className="Search" aria-hidden="true">
        <div className="Search__Inner">
          <div className="Search__SearchBar">
            <form action="/search" name="GET" role="search" className="Search__Form">
              <div className="Search__InputIconWrapper">
                <span className="hidden-tablet-and-up">
                  <Icon icon="search" />
                </span>
                <span className="hidden-phone">
                  <Icon icon="search-desktop" />
                </span>
              </div>

              <input
                type="search"
                className="Search__Input Heading"
                name="q"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="Search"
                placeholder="Search"
                autoFocus
              />
              <input type="hidden" name="type" value="product" />
            </form>

            <button className="Search__Close Link Link--primary" data-action="close-search" aria-label="Close search">
              <Icon icon="close" />
            </button>
          </div>

          <div className="Search__Results" aria-hidden="true">
            {settings.search_mode !== 'product' ? (
              <div className="PageLayout PageLayout--breakLap">
                <div className="PageLayout__Section"></div>
                <div className="PageLayout__Section PageLayout__Section--secondary"></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <header
        id="section-header"
        className="Header"
        data-section-id="header"
        data-section-type="header"
        data-section-settings={JSON.stringify({
          navigationStyle,
          hasTransparentHeader: false,
          isSticky: useStickyHeader,
        })}
      >
        <div className="Header__Wrapper">
          <div className="Header__LogoContainer">
            <a href="/" className="Header__Logo">
              {logo ? (
                <img className="Header__LogoImage" src={logo} alt={shopName} style={{ maxWidth: `${logoMaxWidth}px` }} />
              ) : (
                <span className="Heading u-h4">{shopName}</span>
              )}
            </a>
          </div>

          <nav className="Header__MainNav" aria-label="Main navigation">
            <ul className="HorizontalList">
              {menu.map((link) => (
                <li
                  key={`${link.url}-${link.title}`}
                  className={`HorizontalList__Item ${link.active ? 'is-active' : ''}`.trim()}
                >
                  <a href={link.url} className="Heading u-h6">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="Header__SecondaryNav">
            <a href="/account" className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable" aria-label="Account">
              <Icon icon="account" />
            </a>

            <a
              href="/search"
              className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable"
              data-action="toggle-search"
              aria-label="Search"
            >
              <Icon icon="search" />
            </a>

            <a
              href="/cart"
              className={`Header__Icon Icon-Wrapper Icon-Wrapper--clickable ${
                settings.cart_type === 'drawer' ? 'js-drawer-open-cart' : ''
              }`.trim()}
              {...(settings.cart_type === 'drawer' ? { 'aria-controls': 'sidebar-cart' } : {})}
              data-action={settings.cart_type === 'drawer' ? 'open-drawer' : undefined}
              aria-expanded="false"
              aria-label="Open cart"
            >
              <Icon icon="cart" />
              <span className={`Header__CartDot ${cartItemCount > 0 ? 'is-visible' : ''}`.trim()}></span>
            </a>
          </div>
        </div>
      </header>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `:root{--use-sticky-header:${useStickyHeader ? 1 : 0};--use-unsticky-header:${useStickyHeader ? 0 : 1};--header-is-not-transparent:1;--header-is-transparent:0;}`,
        }}
      />
    </>
  );
}

