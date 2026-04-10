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

## Admin mobile (Expo) — see `docs/ADMIN_MOBILE_PLAN.md`

- [Expo documentation](https://docs.expo.dev/) — including [Expo Go vs development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Supabase + Expo (tutorial)](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime) — optional live collaboration
- [Shopify Admin API](https://shopify.dev/docs/api/admin-rest) — only if re-integrating Shopify backend

## Design parity

- [Shopify Polaris](https://polaris.shopify.com/) — admin UX patterns for web + mobile admin shells
