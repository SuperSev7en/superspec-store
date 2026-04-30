# SUPER Spec. — Master Status & Operations Guide
> **Single source of truth.** Last updated: 2026-04-30
> Live site: **https://superspec.studio** | Repo: `/SuperSpec.store` | Deploy: Vercel → `superspec-store`

---

## QUICK REFERENCE

| Thing | Value |
|-------|-------|
| Live URL | https://superspec.studio |
| Vercel project | `superspec-store` |
| Supabase project | See `.env` → `NEXT_PUBLIC_SUPABASE_URL` |
| Stripe dashboard | https://dashboard.stripe.com |
| Email (Resend) | https://resend.com |
| Deploy command | `vercel deploy --prod --yes` or push to `main` |
| Dev server | `npm run dev` (port 3000) |
| Admin portal | https://superspec.studio/admin (requires `is_admin = true` in profiles) |

---

## ARCHITECTURE

```
Next.js 15 (App Router)
├── app/                  — All pages (storefront + admin)
│   ├── page.tsx          — Homepage (renders theme JSON sections)
│   ├── products/         — /products and /products/[handle]
│   ├── collections/      — /collections/[handle]
│   ├── cart/             — /cart (localStorage-based)
│   ├── checkout/         — Full guest checkout (Stripe)
│   ├── about/            — About page
│   ├── contact/          — Contact page
│   ├── mission-and-sustainability/
│   ├── admin/            — Protected admin portal (JWT role = admin)
│   └── api/              — Route handlers (auth, checkout, stripe, cron)
├── components/
│   ├── store/            — Customer-facing components
│   └── shopify/          — Theme layout, header, footer, sections
├── lib/
│   ├── catalog/          — Product data layer (Supabase + CSV fallback)
│   ├── shopify/          — Theme config reader (settings_data.json)
│   └── stripe.ts / auth.ts / supabase.ts / toast.ts
├── public/assets/        — Local product images + theme CSS/JS
└── supabase/             — DB migration SQL files
```

**Stack:** Next.js 15 · Supabase (PostgreSQL + Auth) · Stripe (PaymentIntent flow) · Resend (email) · Vercel (hosting)
**Styling:** Prestige Shopify theme CSS (`/public/assets/theme.css`) + custom overrides in `app/globals.css` and `/public/assets/fixes.css`
**Cart:** localStorage key `superspec-cart` (synced to Supabase `cart_sessions` for logged-in users)

---

## DATABASE SETUP

> Run `supabase/COMPLETE_SCHEMA.sql` in Supabase SQL Editor to initialize all tables.
> This is the ONLY script you need — it is idempotent (safe to re-run).

### Tables

| Table | Purpose |
|-------|---------|
| `profiles` | Extends Supabase auth users; `is_admin` flag |
| `products` | Product catalog (handle, title, type, collection_handle, image_url) |
| `product_images` | Product image URLs (position-ordered) |
| `variants` | SKUs: price, inventory, size, color |
| `product_metafields` | Extra product data (artist statement, specs) |
| `collections` | Collection metadata |
| `orders` | Customer orders (supports `user_id = null` for guests) |
| `order_items` | Line items per order |
| `order_shipping_address` | Shipping address per order |
| `order_fulfillments` | Tracking info |
| `order_timeline` | Event log per order |
| `discounts` | Discount codes |
| `reviews` | Product reviews (loaded per product_id) |
| `wishlists` | User wishlist items |
| `cart_sessions` | Server-side cart for logged-in users |
| `abandoned_carts` | Abandoned cart tracking for email sequences |
| `email_subscribers` | Newsletter signups |
| `scheduled_emails` | Queued transactional emails |
| `password_reset_tokens` | Password reset flow |
| `store_settings` | Key-value store config |
| `analytics_events` | Storefront event tracking |

### How to add/update products
1. Go to https://superspec.studio/admin/products
2. Click "Add Product" or edit existing
3. Set `type` to one of: `art` | `clothing` | `engineered`
4. Set `collection_handle` to: `super-spectrum` (art) | `super-speck` (clothing)
5. Upload images via the admin product editor

### Making yourself admin
```sql
UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';
```

---

## COLLECTIONS

| Collection | Handle | Type | URL |
|------------|--------|------|-----|
| SUPER Spectrum | `super-spectrum` | Art prints & digital | /collections/super-spectrum |
| SUPER Speck | `super-speck` | Clothing & apparel | /collections/super-speck |
| SUPER Specification | `super-specification` | Engineered goods | /collections/super-specification |

**Collection filtering logic:** `app/collections/[handle]/page.tsx` filters by `productType` and tags.
After running `COMPLETE_SCHEMA.sql` and setting `collection_handle` on products, filtering can be done directly via DB query.

---

## BRAND STANDARDS

| Element | Standard |
|---------|----------|
| Brand name | **SUPER Spec.** (uppercase both words, period at end) |
| Tab title format | `SUPER Spec. — [Page Name]` |
| Contact email | service@superspec.studio / sales@superspec.studio / info@superspec.studio |
| Domain | superspec.studio (NOT superspec.store) |
| Collections | SUPER Speck (clothing) · SUPER Spectrum (art) · SUPER Specification (engineered) |

---

## ENVIRONMENT VARIABLES

| Variable | Purpose | Required |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase admin key | ✅ Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | ✅ Yes |
| `RESEND_API_KEY` | Transactional email via Resend | ✅ Yes |
| `JWT_SECRET` | Signs user session tokens (32+ chars random) | ✅ Yes |
| `CRON_SECRET` | Protects hourly cron routes | ✅ Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Address autocomplete at checkout | Optional |

> ⚠️ Never commit `.env` to git. Add all vars to Vercel Dashboard → Settings → Environment Variables for production.

---

## KNOWN ISSUES & FIX STATUS

> Updated after audit of 2026-04-30. See git history for change details.

| # | Issue | Status | File |
|---|-------|--------|------|
| 1 | Cart page blank | ✅ Fixed | `app/cart/page.tsx` |
| 2 | Guest checkout flow | ✅ Fixed | `app/checkout/page.tsx` |
| 3 | Size selector shows 20× duplicates | ✅ Fixed | `components/store/ClothingOverlay.tsx` |
| 4 | Art products show "Edition Sold Out" always | ✅ Fixed | `components/store/ArtOverlay.tsx` |
| 5 | Description rendered twice on PDP | ✅ Fixed | `components/store/ProductDetailBase.tsx` |
| 6 | Fake reviews on every product | ✅ Fixed | `components/store/ProductReviews.tsx` |
| 7 | "SuperSpec Store" label on PDP | ✅ Fixed | `components/store/ProductDetailBase.tsx` |
| 8 | Shopify CDN fit chart image | ✅ Fixed | Product description HTML in DB |
| 9 | Viewer count hardcoded to "2" | ✅ Fixed | `components/store/ProductDetailBase.tsx` |
| 10 | Add to cart without size selected | ✅ Fixed | `components/store/ProductDetailBase.tsx` |
| 11 | Contact emails wrong domain | ✅ Fixed | `app/contact/page.tsx` |
| 12 | Collections show wrong products | ✅ Fixed | `app/collections/[handle]/page.tsx` |
| 13 | Product types/collections wrong in DB | ⚠️ SQL ready | `supabase/COMPLETE_SCHEMA.sql` |
| 14 | Messy product URL slugs | ⚠️ SQL + redirects ready | `next.config.js` |
| 15 | Load More button (no infinite scroll) | ✅ Fixed | `components/store/ProductCatalogClient.tsx` |
| 16 | Description text on product cards | ✅ Fixed | `components/shopify/sections/ProductItem.tsx` |
| 17 | Homepage shows "Sample product" placeholders | ✅ Fixed | `app/page.tsx` + DB |
| 18 | Hero slides both use same image | ✅ Fixed | Theme settings JSON |
| 19 | About page plain text | ✅ Fixed | `app/about/page.tsx` |
| 20 | Mission page plain text | ✅ Fixed | `app/mission-and-sustainability/page.tsx` |
| 21 | Footer missing social icons, wrong structure | ✅ Fixed | `components/shopify/footer/Footer.tsx` |
| 22 | Contact page unstyled | ✅ Fixed | `app/contact/page.tsx` |
| 23 | Brand name inconsistent | ✅ Fixed | Multiple files |
| 24 | Double newsletter form | ✅ Fixed | `components/shopify/footer/Footer.tsx` |

---

## CHECKOUT FLOW

Guest checkout requires NO login. Flow:
1. **Express** — Apple Pay / Google Pay (Stripe `ExpressCheckoutElement`)
2. **Contact** — Email only. "Log in" link is optional.
3. **Shipping** — Address + method selection (Standard $0/$5.99, Express $14.99)
4. **Payment** — Stripe `PaymentElement` (card, Apple Pay, Google Pay, Link)
5. **Success** — `/checkout/success?orderNumber=XX` — no account creation prompt

Auth middleware (`middleware.ts`) only protects `/admin` and `/account`. Checkout is fully open.

---

## DEPLOYMENT CHECKLIST

Before going live / after changes:
- [ ] All env vars set in Vercel Dashboard
- [ ] `supabase/COMPLETE_SCHEMA.sql` has been run in Supabase
- [ ] Products have `type` and `collection_handle` set correctly
- [ ] Stripe webhook endpoint configured: `https://superspec.studio/api/stripe/webhook`
- [ ] Resend domain verified for `@superspec.studio`
- [ ] Run `npm run build` locally — zero errors
- [ ] Test add-to-cart → checkout → payment with Stripe test card `4242 4242 4242 4242`

---

## CONTENT CALENDAR (manual tasks for store owner)

| Task | How |
|------|-----|
| Add new product | Admin → /admin/products → Add Product |
| Update hero images | Edit `Shopify files/.../config/settings_data.json` → `slideshow` blocks → `image` field |
| Run discount | Admin → /admin/discounts → New Code |
| View orders | Admin → /admin/orders |
| Check abandoned carts | Supabase → `abandoned_carts` table |

---

## FILE GLOSSARY

| File | What it does |
|------|-------------|
| `app/page.tsx` | Homepage — renders sections from theme JSON |
| `app/products/[handle]/page.tsx` | Product detail page server component |
| `app/collections/[handle]/page.tsx` | Collection listing page |
| `app/cart/page.tsx` | Cart page (reads localStorage) |
| `app/checkout/page.tsx` | Full 4-step guest checkout |
| `app/checkout/success/page.tsx` | Order confirmation page |
| `components/store/ProductDetailBase.tsx` | PDP layout: gallery, overlays, tabs, reviews |
| `components/store/ClothingOverlay.tsx` | Size selector + care info for clothing PDPs |
| `components/store/ArtOverlay.tsx` | Edition badge + format selector for art PDPs |
| `components/store/ProductReviews.tsx` | Fetches real reviews from Supabase per product |
| `components/store/CartDrawer.tsx` | Slide-out cart (reads localStorage) |
| `components/shopify/footer/Footer.tsx` | Site footer |
| `lib/catalog/supabaseCatalog.ts` | Fetches products from Supabase |
| `lib/catalog/catalog.ts` | CSV fallback catalog reader |
| `middleware.ts` | Auth guard — only /admin and /account routes |
| `supabase/COMPLETE_SCHEMA.sql` | **Run this in Supabase** — full DB setup |
| `next.config.js` | Next.js config — redirects for old Shopify slugs |
