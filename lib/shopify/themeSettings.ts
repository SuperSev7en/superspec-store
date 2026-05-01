export type ThemeSettings = {
  // Typography
  heading_size: 'small' | 'normal' | 'large';
  uppercase_heading: boolean;
  base_text_font_size: number;

  // Colors
  background: string;
  light_background: string;
  heading_color: string;
  text_color: string;
  text_light_color: string;
  link_color: string;
  button_background: string;
  button_text_color: string;
  header_background: string;
  header_heading_color: string;
  header_light_color: string;
  footer_background: string;
  footer_text_color: string;
  footer_heading_color: string;
  navigation_background: string;
  navigation_text_color: string;
  newsletter_popup_background: string;
  newsletter_popup_text_color: string;
  secondary_elements_background: string;
  secondary_elements_text_color: string;
  product_on_sale_color: string;

  // Behavior
  product_show_price_on_hover: boolean;
  show_page_transition: boolean;
  show_button_transition: boolean;
  show_image_zooming: boolean;
  show_element_staggering: boolean;
  search_mode: 'product' | 'product,page' | 'product,article' | 'product,article,page';
  product_image_size: 'natural' | 'short' | 'square' | 'tall';
  product_list_horizontal_spacing: 'extra_small' | 'small' | 'medium' | 'large' | 'extra_large';
  product_list_vertical_spacing: 'extra_small' | 'small' | 'medium' | 'large' | 'extra_large';
  cart_type: 'drawer' | 'page';
};

// Defaults pulled from your exported `config/settings_schema.json` (Prestige v4.14.5).
export const defaultThemeSettings: ThemeSettings = {
  heading_size: 'small',
  uppercase_heading: true,
  base_text_font_size: 14,

  heading_color: '#ffffff',
  text_color: '#ffffff',
  text_light_color: '#e0e0e0',
  link_color: '#ffffff',
  background: '#000000',
  light_background: '#1c1b1b',
  product_on_sale_color: '#f94c43',
  button_background: '#ffffff',
  button_text_color: '#000000',
  header_background: '#000000',
  header_heading_color: '#ffffff',
  header_light_color: '#e0e0e0',
  footer_background: '#000000',
  footer_text_color: '#e0e0e0',
  footer_heading_color: '#ffffff',
  navigation_background: '#ffffff',
  navigation_text_color: '#000000',
  newsletter_popup_background: '#000000',
  newsletter_popup_text_color: '#ffffff',
  secondary_elements_background: '#ffffff',
  secondary_elements_text_color: '#000000',

  product_show_price_on_hover: false,
  show_page_transition: false,
  show_button_transition: true,
  show_image_zooming: true,
  show_element_staggering: true,
  search_mode: 'product,article',
  product_image_size: 'natural',
  product_list_horizontal_spacing: 'medium',
  product_list_vertical_spacing: 'medium',
  cart_type: 'drawer',
};

