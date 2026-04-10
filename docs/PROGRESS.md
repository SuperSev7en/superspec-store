# Progress tracker — Shopify theme → Next.js

Last updated: 2026-04-09

## Deployment

| Area | Status | Notes |
|------|--------|--------|
| Vercel production | Done | Alias **superspec.studio** — project `superspec-store`; CLI `vercel deploy --prod --yes` |

## Core storefront

| Area | Status | Notes |
|------|--------|--------|
| Home (`index` sections) | Done | `app/page.tsx` renders sections from `settings_data.json` |
| Products listing | Done | `app/products/page.tsx` + catalog |
| Product detail | Done | `app/products/[handle]/page.tsx` |
| Collections | Done | `app/collections/[handle]/page.tsx` (tag-based) |
| Cart | Basic | `app/cart/page.tsx` |
| Checkout | Basic | `app/checkout/page.tsx` |
| Search | Done | `app/search/page?q=` (catalog search) |
| Static pages | Done | About, Mission & Sustainability, Contact |
| Account | Stub | Redirects to `/login?next=/account` |
| Admin UI | Stub | `app/admin/page.tsx` — future: uploads / management |

## Theme / UX

| Area | Status | Notes |
|------|--------|--------|
| Header / footer | Done | Prestige classes; nav from `lib/siteNavigation.ts` |
| Product images | Done | Manifest + `Image--lazyLoaded` / visibility fixes |
| Collection list panels | Done | Contain-fit + lazy loaded state |
| Background animation | Done | z-index stacking + Three.js layer |
| Shopify customer templates | N/A | Login/register adapted for Supabase, not Liquid |

## Shopify sections (reference export)

Full section list and React mapping: [SHOPIFY_THEME_PARITY.md](./SHOPIFY_THEME_PARITY.md).

## Data

| Source | Status |
|--------|--------|
| CSV exports | `Shopify files/products_export*.csv` |
| Local images | `public/assets/product-images/` + `manifest.json` |
| Theme settings | `Shopify files/.../config/settings_data.json` |

## Not in scope (headless Next)

- Native Shopify checkout / Shop Pay (use Stripe or external flow as configured)
- Shopify Admin API for content (optional future admin app)
