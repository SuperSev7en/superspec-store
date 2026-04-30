import type { ThemeSettings } from '@/lib/shopify/themeSettings';

export function getThemeBodyClassName(settings: ThemeSettings) {
  let classes = `prestige--v4 features--heading-${settings.heading_size}`;

  if (settings.uppercase_heading) classes += ' features--heading-uppercase';
  if (settings.product_show_price_on_hover) classes += ' features--show-price-on-hover';
  if (settings.show_page_transition) classes += ' features--show-page-transition';
  if (settings.show_button_transition) classes += ' features--show-button-transition';
  if (settings.show_image_zooming) classes += ' features--show-image-zooming';
  if (settings.show_element_staggering) classes += ' features--show-element-staggering';

  return classes;
}

export function getProductListSpacingVars(settings: ThemeSettings) {
  const horizontalBySize: Record<ThemeSettings['product_list_horizontal_spacing'], number> = {
    extra_small: 20,
    small: 40,
    medium: 60,
    large: 80,
    extra_large: 100,
  };

  const verticalFourBySize: Record<ThemeSettings['product_list_vertical_spacing'], number> = {
    extra_small: 40,
    small: 60,
    medium: 80,
    large: 100,
    extra_large: 120,
  };

  const verticalTwoBySize: Record<ThemeSettings['product_list_vertical_spacing'], number> = {
    extra_small: 50,
    small: 75,
    medium: 100,
    large: 125,
    extra_large: 150,
  };

  const horizontal = horizontalBySize[settings.product_list_horizontal_spacing];
  return {
    '--horizontal-spacing-four-products-per-row': `${horizontal}px`,
    '--horizontal-spacing-two-products-per-row': `${horizontal}px`,
    '--vertical-spacing-four-products-per-row': `${verticalFourBySize[settings.product_list_vertical_spacing]}px`,
    '--vertical-spacing-two-products-per-row': `${verticalTwoBySize[settings.product_list_vertical_spacing]}px`,
  } as const;
}

function hexToRgbTriplet(hex: string) {
  const normalized = hex.replace('#', '').trim();
  const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized;
  if (full.length !== 6) return '0, 0, 0';
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// Shopify's `color_mix` is more complex, but the theme CSS typically only uses the result for subtle borders.
function mix(hexA: string, hexB: string, weightBPercent: number) {
  const a = hexToRgbTriplet(hexA).split(',').map((x) => Number(x.trim()));
  const b = hexToRgbTriplet(hexB).split(',').map((x) => Number(x.trim()));
  const wb = Math.min(100, Math.max(0, weightBPercent)) / 100;
  const wa = 1 - wb;
  const r = Math.round((a[0] ?? 0) * wa + (b[0] ?? 0) * wb);
  const g = Math.round((a[1] ?? 0) * wa + (b[1] ?? 0) * wb);
  const b2 = Math.round((a[2] ?? 0) * wa + (b[2] ?? 0) * wb);
  return `rgb(${r}, ${g}, ${b2})`;
}

export function getCssVariables(settings: ThemeSettings) {
  const borderColor = mix(settings.background, settings.text_color, 85);
  const headerBorderColor = mix(settings.header_background, settings.header_heading_color, 85);
  const footerBorderColor = mix(settings.footer_background, settings.footer_text_color, 85);

  return {
    '--heading-font-family': 'Futura, "Century Gothic", "Apple Gothic", AppleGothic, "URW Gothic L", sans-serif',
    '--heading-font-weight': '400',
    '--heading-font-style': 'normal',
    '--text-font-family': '"Century Gothic", CenturyGothic, Futura, "URW Gothic L", sans-serif',
    '--text-font-weight': '400',
    '--text-font-style': 'normal',
    '--base-text-font-size': `${settings.base_text_font_size}px`,
    '--default-text-font-size': '14px',

    '--background': settings.background,
    '--background-rgb': hexToRgbTriplet(settings.background),
    '--light-background': settings.light_background,
    '--light-background-rgb': hexToRgbTriplet(settings.light_background),
    '--heading-color': settings.heading_color,
    '--text-color': settings.text_color,
    '--text-color-rgb': hexToRgbTriplet(settings.text_color),
    '--text-color-light': settings.text_light_color,
    '--text-color-light-rgb': hexToRgbTriplet(settings.text_light_color),
    '--link-color': settings.link_color,
    '--link-color-rgb': hexToRgbTriplet(settings.link_color),
    '--border-color': borderColor,
    '--border-color-rgb': borderColor.replace(/^rgb\(|\)$/g, ''),

    '--button-background': settings.button_background,
    '--button-background-rgb': hexToRgbTriplet(settings.button_background),
    '--button-text-color': settings.button_text_color,

    '--header-background': settings.header_background,
    '--header-heading-color': settings.header_heading_color,
    '--header-light-text-color': settings.header_light_color,
    '--header-border-color': headerBorderColor,

    '--footer-background': settings.footer_background,
    '--footer-text-color': settings.footer_text_color,
    '--footer-heading-color': settings.footer_heading_color,
    '--footer-border-color': footerBorderColor,

    '--navigation-background': settings.navigation_background,
    '--navigation-background-rgb': hexToRgbTriplet(settings.navigation_background),
    '--navigation-text-color': settings.navigation_text_color,

    '--newsletter-popup-background': settings.newsletter_popup_background,
    '--newsletter-popup-text-color': settings.newsletter_popup_text_color,
    '--newsletter-popup-text-color-rgb': hexToRgbTriplet(settings.newsletter_popup_text_color),

    '--secondary-elements-background': settings.secondary_elements_background,
    '--secondary-elements-background-rgb': hexToRgbTriplet(settings.secondary_elements_background),
    '--secondary-elements-text-color': settings.secondary_elements_text_color,

    '--product-sale-price-color': settings.product_on_sale_color,
    '--product-sale-price-color-rgb': hexToRgbTriplet(settings.product_on_sale_color),

    ...getProductListSpacingVars(settings),

    '--cursor-zoom-in-svg': "url('/assets/cursor-zoom-in.svg')",
    '--cursor-zoom-in-2x-svg': "url('/assets/cursor-zoom-in-2x.svg')",
  } as const;
}

