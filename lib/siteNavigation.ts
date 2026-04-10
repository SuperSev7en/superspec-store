/** Single source of truth for primary storefront navigation (header + footer quick links). */
export const MAIN_NAV_LINKS = [
  { title: 'Shop', url: '/products' },
  { title: 'About', url: '/about' },
  { title: 'Mission & Sustainability', url: '/mission-and-sustainability' },
  { title: 'Contact', url: '/contact' },
  { title: 'FAQ', url: '/faq' },
] as const;

export type MainNavLink = (typeof MAIN_NAV_LINKS)[number];
