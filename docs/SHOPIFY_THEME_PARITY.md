# Shopify theme ↔ Next.js parity

Theme export: `Shopify files/theme_export__superspec-studio-theme-export-www-superspec-store-superspec-upd__03APR2026-0504pm/` (Prestige-based).

This document maps **Liquid** building blocks to **this repo**. Goal: one clear picture of what was converted and what remains reference-only.

## Global assets

| Shopify | Next.js |
|---------|---------|
| `assets/theme.css`, `theme.min.js`, `custom.js`, icons | `public/assets/` — loaded from `app/layout.tsx` |
| `assets/background-effects.*` | `public/assets/` + mirror in theme export folder |
| `config/settings_data.json` | `lib/shopify/themeConfig.ts` reads theme colors + section JSON |
| `config/settings_schema.json` | Used for defaults in `lib/shopify/themeSettings.ts` |

## Templates → routes

| Liquid template | Next route | Implementation |
|-----------------|------------|----------------|
| `templates/index.json` (home) | `/` | `app/page.tsx` + section components |
| `templates/product.liquid` | `/products/[handle]` | `app/products/[handle]/page.tsx` |
| `templates/collection.liquid` | `/collections/[handle]` | `app/collections/[handle]/page.tsx` |
| `templates/cart.liquid` | `/cart` | `app/cart/page.tsx` |
| `templates/page.liquid` | — | **Replaced** by explicit routes (about, mission, contact, FAQ) |
| `templates/page.contact.liquid` | `/contact` | `app/contact/page.tsx` + `ContactForm` |
| `templates/page.faq.liquid` | `/faq` | `app/faq/page.tsx` + Prestige `Faq` markup + theme JS |
| `templates/search.liquid` | `/search` | `app/search/page.tsx` (catalog search, not Shopify Search) |
| `templates/blog.liquid`, `article.liquid` | — | **Not implemented** (no blog pipeline in Next yet) |
| `templates/customers/*.liquid` | `/login`, `/register`, `/account` | Supabase auth; account redirects until session UI exists |
| `templates/404.liquid` | — | `app/not-found.tsx` |

## Sections → components

| Section file | React component / notes |
|--------------|-------------------------|
| `announcement.liquid` | `AnnouncementBarGate.tsx` |
| `header.liquid` | `Header.tsx` |
| `footer.liquid` | `Footer.tsx` |
| `slideshow.liquid` | `Slideshow.tsx` |
| `collection-list.liquid` | `CollectionList.tsx` + `CollectionListItem.tsx` |
| `featured-collections.liquid` | `FeaturedCollections.tsx` + `FeaturedCollectionsClient.tsx` |
| `featured-product.liquid` | `FeaturedProduct.tsx` |
| `timeline.liquid` | `Timeline.tsx` |
| `blog-posts.liquid` | `BlogPosts.tsx` |
| `shop-the-look.liquid` | `ShopTheLook.tsx` |
| `product-template.liquid` | Product PDP structure in `app/products/[handle]/page.tsx` (subset of theme features) |
| `collection-template.liquid` | Partially mirrored in collections page (no full faceted Shopify filters) |
| `cart-template.liquid` | Simplified in `app/cart` |
| `sidebar-menu.liquid`, `popup.liquid`, cart drawer | **Not fully ported** — noted in `ThemeLayout` TODO |

## Behaviors preserved via theme JS/CSS

- Prestige **element staggering** on catalog routes is overridden in `app/globals.css` where the theme section JS does not mount.
- **FAQ** accordion uses `data-section-type="faq"` so `theme.js` registers `FaqSection`.
- **Product images** use `Image--lazyLoaded` where lazySizes is not driving the tag.

## Intentional differences

- **Checkout**: Not Shopify Checkout; Stripe / custom flow as implemented in `app/api`.
- **Search**: Server-side filter over CSV catalog, not Shopify Search & Discovery.
- **Forms**: Contact form posts to `POST /api/contact` instead of Liquid `{% form 'contact' %}`.

## When you change the Shopify export

1. Copy updated `settings_data.json` into the same path under `Shopify files/.../config/`.
2. Re-run the dev server; theme colors and home sections update.
3. If new section types appear, add a case in `app/page.tsx` `renderSection` and a matching component.
