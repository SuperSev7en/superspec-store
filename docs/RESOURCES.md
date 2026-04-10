# Research & resources

Curated links for maintaining and extending this project.

## Next.js

- [Next.js Documentation](https://nextjs.org/docs) — App Router, `metadata`, Route Handlers
- [Deployment on Vercel](https://vercel.com/docs/frameworks/nextjs)

## Shopify (reference — original theme)

- [Shopify Theme Architecture](https://shopify.dev/docs/storefronts/themes/architecture)
- [Liquid reference](https://shopify.dev/docs/api/liquid)
- [Prestige theme vendor (Maestrooo)](https://support.maestrooo.com/) — support articles for the exported theme

## Images & catalog

- CSV columns match Shopify product export format (`Image Src`, `Handle`, etc.)
- Local mapping: `public/assets/product-images/manifest.json` keys = full CDN URLs from CSV

## Vercel

- [Vercel CLI](https://vercel.com/docs/cli)
- [Environment variables](https://vercel.com/docs/projects/environment-variables)

## Supabase

- [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- Used for auth in this project (`@supabase/ssr`)

## Real-time admin (future)

- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Shopify Admin API](https://shopify.dev/docs/api/admin-rest) (if re-integrating Shopify backend)

## Design parity

- Polaris / admin patterns: [Shopify Polaris](https://polaris.shopify.com/) (for a future Expo or web admin)
