import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeLayout } from '@/components/shopify/ThemeLayout';
import { getThemeBodyClassName } from '@/lib/shopify/themeUtils';
import { getThemeSettings, getThemeSections, getThemeBrandAssets } from '@/lib/shopify/themeConfig';
import { resolveShopifyAssetUrl } from '@/lib/shopify/assetUrls';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'SUPER Spec',
  description: 'SUPER Spec',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getThemeSettings();
  const sections = await getThemeSections();
  const brandAssets = await getThemeBrandAssets();
  const faviconUrl = resolveShopifyAssetUrl(brandAssets.favicon);

  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0"
        />
        <meta name="theme-color" content={settings.button_background} />

        {faviconUrl ? <link rel="shortcut icon" href={faviconUrl} type="image/png" /> : null}

        <link rel="stylesheet" href="/assets/theme.css" />
        <link rel="stylesheet" href="/assets/theme-toggle.css" />
        <link rel="stylesheet" href="/assets/background-effects.css" />

        <Script id="disable-context-menu" strategy="beforeInteractive">
          {`document.addEventListener('contextmenu', event => event.preventDefault());`}
        </Script>

        <Script id="theme-globals" strategy="beforeInteractive">
          {`window.theme = {
pageType: "index",
moneyFormat: "\u0024{{amount}}",
moneyWithCurrencyFormat: "\u0024{{amount}} USD",
productImageSize: ${JSON.stringify(settings.product_image_size)},
searchMode: ${JSON.stringify(settings.search_mode)},
showPageTransition: ${JSON.stringify(settings.show_page_transition)},
showElementStaggering: ${JSON.stringify(settings.show_element_staggering)},
showImageZooming: ${JSON.stringify(settings.show_image_zooming)}
};

window.routes = {
rootUrl: "/",
rootUrlWithoutSlash: "",
cartUrl: "/cart",
cartAddUrl: "/cart/add",
cartChangeUrl: "/cart/change",
searchUrl: "/search",
productRecommendationsUrl: "/recommendations/products"
};

window.languages = {
cartAddNote: "Add a note",
cartEditNote: "Edit note",
productImageLoadingError: "An error occurred while loading the image",
productFormAddToCart: "Add to cart",
productFormUnavailable: "Unavailable",
productFormSoldOut: "Sold out",
shippingEstimatorOneResult: "Shipping",
shippingEstimatorMoreResults: "Shipping",
shippingEstimatorNoResults: "Shipping"
};

window.lazySizesConfig = {
loadHidden: false,
hFac: 0.5,
expFactor: 2,
ricTimeout: 150,
lazyClass: "Image--lazyLoad",
loadingClass: "Image--lazyLoading",
loadedClass: "Image--lazyLoaded"
};

document.documentElement.className = document.documentElement.className.replace("no-js", "js");
document.documentElement.style.setProperty("--window-height", window.innerHeight + "px");

(function() {
  document.documentElement.className += ((window.CSS && window.CSS.supports("(position: sticky) or (position: -webkit-sticky)")) ? " supports-sticky" : " no-supports-sticky");
  document.documentElement.className += (window.matchMedia("(-moz-touch-enabled: 1), (hover: none)").matches ? " no-supports-hover" : " supports-hover");
}());`}
        </Script>

        <Script src="/assets/lazysizes.min.js" strategy="afterInteractive" async />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
        <Script
          src="https://cdn.polyfill.io/v3/polyfill.min.js?unknown=polyfill&features=fetch,Element.prototype.closest,Element.prototype.remove,Element.prototype.classList,Array.prototype.includes,Array.prototype.fill,Object.assign,CustomEvent,IntersectionObserver,IntersectionObserverEntry,URL"
          strategy="afterInteractive"
        />
        <Script src="/assets/libs.min.js" strategy="afterInteractive" />
        <Script src="/assets/theme.min.js" strategy="afterInteractive" />
        <Script src="/assets/custom.js" strategy="afterInteractive" />
        <Script src="/assets/background-effects.js" strategy="afterInteractive" />
      </head>

      <body className={getThemeBodyClassName(settings)}>
        <ThemeLayout settings={settings} sections={sections}>
          {children}
        </ThemeLayout>
        <Analytics />
        <Script src="/assets/theme-toggle.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}