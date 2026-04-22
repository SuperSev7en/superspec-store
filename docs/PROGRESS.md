# Progress tracker — Shopify theme → Next.js

Last updated: 2026-04-21

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
| Checkout | Done | Stripe Checkout; success `/checkout/success?session_id=…`; cancel `/checkout/cancel`; webhook `POST /api/stripe/webhook` writes Supabase orders |
| Search | Done | `app/search/page?q=` (catalog search) |
| Static pages | Done | About, Mission & Sustainability, Contact |
| Admin mobile (Expo) | Done (v1) | `apps/admin-mobile` — Home/Orders/Products/Analytics/**Settings** (Polaris-style hub), Supabase auth, Realtime + **remote Expo push** on new orders; see [apps/admin-mobile/README.md](../apps/admin-mobile/README.md) |
| Account | Stub | Redirects to `/login?next=/account` |
| Admin UI | Done | `/admin` — products, orders + fulfillment, customers list, analytics, audit; mobile nav in `AdminShell`; discounts page = Stripe guidance until DB coupons exist |

## Theme / UX

| Area | Status | Notes |
|------|--------|--------|
| Header / footer | Done | Prestige classes; nav from `lib/siteNavigation.ts`; footer newsletter → `POST /api/newsletter`; `fixes.css` scoped so footer keeps theme colors |
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
| Supabase catalog + orders | `lib/catalog/supabaseCatalog.ts`, `supabase/migrations/*` (when enabled, overrides CSV for products) |
| Local images | `public/assets/product-images/` + `manifest.json` |
| Theme settings | `Shopify files/.../config/settings_data.json` |

## Not in scope (headless Next)

- Native Shopify checkout / Shop Pay (use Stripe or external flow as configured)
- Shopify Admin API for content (optional future admin app)
