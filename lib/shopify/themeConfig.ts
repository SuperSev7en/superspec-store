import path from 'node:path';
import { readFile } from 'node:fs/promises';
import type { ThemeSettings } from '@/lib/shopify/themeSettings';
import { defaultThemeSettings } from '@/lib/shopify/themeSettings';

type ThemeSettingsData = {
  current?: {
    sections?: Record<string, { type: string; settings?: Record<string, unknown>; blocks?: Record<string, unknown>; block_order?: string[] }>;
    content_for_index?: string[];
    [key: string]: unknown;
  };
};

const SETTINGS_DATA_PATH = path.join(
  process.cwd(),
  'Shopify files',
  'theme_export__superspec-studio-theme-export-www-superspec-store-superspec-upd__03APR2026-0504pm',
  'config',
  'settings_data.json',
);

export async function readThemeSettingsData(): Promise<ThemeSettingsData> {
  const raw = await readFile(SETTINGS_DATA_PATH, 'utf8');
  return JSON.parse(raw) as ThemeSettingsData;
}

export async function getThemeSettings(): Promise<ThemeSettings> {
  const data = await readThemeSettingsData();
  const current = data.current ?? {};

  // Only pick keys we actually model; everything else stays in settings_data for section rendering.
  const merged: ThemeSettings = {
    ...defaultThemeSettings,
    heading_size: (current.heading_size as ThemeSettings['heading_size']) ?? defaultThemeSettings.heading_size,
    uppercase_heading: (current.uppercase_heading as boolean) ?? defaultThemeSettings.uppercase_heading,
    base_text_font_size: Number(current.base_text_font_size ?? defaultThemeSettings.base_text_font_size),

    background: String(current.background ?? defaultThemeSettings.background),
    light_background: String(current.light_background ?? defaultThemeSettings.light_background),
    heading_color: String(current.heading_color ?? defaultThemeSettings.heading_color),
    text_color: String(current.text_color ?? defaultThemeSettings.text_color),
    text_light_color: String(current.text_light_color ?? defaultThemeSettings.text_light_color),
    link_color: String(current.link_color ?? defaultThemeSettings.link_color),
    button_background: String(current.button_background ?? defaultThemeSettings.button_background),
    button_text_color: String(current.button_text_color ?? defaultThemeSettings.button_text_color),
    header_background: String(current.header_background ?? defaultThemeSettings.header_background),
    header_heading_color: String(current.header_heading_color ?? defaultThemeSettings.header_heading_color),
    header_light_color: String(current.header_light_color ?? defaultThemeSettings.header_light_color),
    footer_background: String(current.footer_background ?? defaultThemeSettings.footer_background),
    footer_text_color: String(current.footer_text_color ?? defaultThemeSettings.footer_text_color),
    footer_heading_color: String(current.footer_heading_color ?? defaultThemeSettings.footer_heading_color),
    navigation_background: String(current.navigation_background ?? defaultThemeSettings.navigation_background),
    navigation_text_color: String(current.navigation_text_color ?? defaultThemeSettings.navigation_text_color),
    newsletter_popup_background: String(current.newsletter_popup_background ?? defaultThemeSettings.newsletter_popup_background),
    newsletter_popup_text_color: String(current.newsletter_popup_text_color ?? defaultThemeSettings.newsletter_popup_text_color),
    secondary_elements_background: String(current.secondary_elements_background ?? defaultThemeSettings.secondary_elements_background),
    secondary_elements_text_color: String(current.secondary_elements_text_color ?? defaultThemeSettings.secondary_elements_text_color),
    product_on_sale_color: String(current.product_on_sale_color ?? defaultThemeSettings.product_on_sale_color),

    product_show_price_on_hover: Boolean(current.product_show_price_on_hover ?? defaultThemeSettings.product_show_price_on_hover),
    show_page_transition: Boolean(current.show_page_transition ?? defaultThemeSettings.show_page_transition),
    show_button_transition: Boolean(current.show_button_transition ?? defaultThemeSettings.show_button_transition),
    show_image_zooming: Boolean(current.show_image_zooming ?? defaultThemeSettings.show_image_zooming),
    show_element_staggering: Boolean(current.show_element_staggering ?? defaultThemeSettings.show_element_staggering),
    search_mode: (current.search_mode as ThemeSettings['search_mode']) ?? defaultThemeSettings.search_mode,
    product_image_size: (current.product_image_size as ThemeSettings['product_image_size']) ?? defaultThemeSettings.product_image_size,
    product_list_horizontal_spacing:
      (current.product_list_horizontal_spacing as ThemeSettings['product_list_horizontal_spacing']) ??
      defaultThemeSettings.product_list_horizontal_spacing,
    product_list_vertical_spacing:
      (current.product_list_vertical_spacing as ThemeSettings['product_list_vertical_spacing']) ??
      defaultThemeSettings.product_list_vertical_spacing,
    cart_type: (current.cart_type as ThemeSettings['cart_type']) ?? defaultThemeSettings.cart_type,
  };

  return merged;
}

export async function getThemeSections() {
  const data = await readThemeSettingsData();
  return data.current?.sections ?? {};
}

export async function getThemeBrandAssets() {
  const data = await readThemeSettingsData();
  const current = data.current ?? {};
  return {
    favicon: typeof current.favicon === 'string' ? current.favicon : null,
    checkoutLogo: typeof current.checkout_logo_image === 'string' ? current.checkout_logo_image : null,
  } as const;
}

export async function getHomePageSectionOrder() {
  const data = await readThemeSettingsData();
  const order = data.current?.content_for_index;
  return Array.isArray(order) ? order.filter((x) => typeof x === 'string') : [];
}

