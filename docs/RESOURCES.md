# SUPER Spec. — Resources

## Core Stack Docs

| Tool | Link |
|------|------|
| Next.js 15 App Router | https://nextjs.org/docs |
| Supabase + Next.js | https://supabase.com/docs/guides/getting-started/quickstarts/nextjs |
| Stripe PaymentElement | https://stripe.com/docs/payments/payment-element |
| Resend Email API | https://resend.com/docs |
| Vercel Deployment | https://vercel.com/docs/frameworks/nextjs |

## Design System

The storefront uses the **Prestige** Shopify theme CSS as a base (`/public/assets/theme.css`).
Custom overrides live in `app/globals.css` and `public/assets/fixes.css`.

CSS variable reference: look for `:root` and `[data-theme]` blocks in `theme.css`.

Key classes used throughout:
- `Button Button--primary` / `Button--secondary` / `Button--full`
- `Heading u-h1` through `u-h6`
- `Text--subdued`
- `Form__Input` / `Form__Label`
- `Container` (max-width wrapper)

## Image System

Product images are stored in Supabase Storage (bucket: `product-media`).
Local legacy images: `public/assets/product-images/` with `manifest.json` mapping CDN URLs → local filenames.

The `storagePublicUrl()` function in `lib/catalog/supabaseCatalog.ts` builds public URLs from storage paths.

## Admin Mobile App

The Expo React Native admin app lives in `apps/admin-mobile/`.
See `apps/admin-mobile/README.md` for setup and build instructions.
Uses Supabase Realtime for live order notifications.
