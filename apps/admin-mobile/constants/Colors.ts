/** Shopify-admin-inspired neutrals + brand green (Polaris “success” tone). */

export type ColorPalette = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  card: string;
  border: string;
  muted: string;
};

const shopifyGreen = '#008060';

const light: ColorPalette = {
  text: '#202223',
  background: '#f6f6f7',
  tint: shopifyGreen,
  tabIconDefault: '#8c9196',
  tabIconSelected: shopifyGreen,
  card: '#ffffff',
  border: '#e1e3e5',
  muted: '#6d7175',
};

const dark: ColorPalette = {
  text: '#f6f6f7',
  background: '#0f0f10',
  tint: '#25d366',
  tabIconDefault: '#8c9196',
  tabIconSelected: '#25d366',
  card: '#202123',
  border: '#2d2f31',
  muted: '#b5babf',
};

export default {
  light,
  dark,
};

export { shopifyGreen };
