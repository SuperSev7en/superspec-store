# How to operate SuperSpec.store

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm
- Optional: Vercel account + CLI for production deploys

## Environment variables

Create `.env.local` (never commit secrets):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (auth) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `CONTACT_WEBHOOK_URL` | Optional. If set, `POST /api/contact` forwards JSON payloads here (e.g. Zapier, Slack webhook, or email API). If unset, submissions are logged server-side only. |
| Stripe keys | Used by checkout API routes if configured |

## Local development

```bash
npm install
npm run dev
```

Visit `/products`, `/collections/{handle}`, `/about`, `/contact`, `/faq`, `/mission-and-sustainability`, `/search?q=`.

## Product images (offline / no Shopify CDN)

1. **Automatic download** (while source URLs still respond):

   ```bash
   npm run images:download
   ```

   Output: `public/assets/product-images/` + `manifest.json`. The catalog maps CSV `Image Src` URLs to local paths.

2. **Manual**: Add files under `public/assets/product-images/` and add entries to `manifest.json` keyed by the exact CSV URL.

## Production deploy to Vercel

1. Install CLI: `npm i -g vercel`
2. Link the repo: `vercel link` (once per machine)
3. Deploy with version tag:

   ```bash
   npm run deploy:vercel
   ```

The script (`scripts/deploy-vercel.sh`) attempts to:

- Commit staged changes (if any)
- Create an annotated git tag `v/<timestamp-or-name>`
- Push branch and tags to `origin` (if configured)
- Run `vercel deploy --prod`

**Rollback:** In the Vercel dashboard, promote a previous deployment, or revert git and redeploy. Git tags record deploy markers.

## Animated background

The site loads `public/assets/background-effects.js` + `background-effects.css` from `app/layout.tsx`. Layers use `z-index: 0`; main content is in `.PageContainer` with `z-index: 1` (see `app/globals.css`). If the canvas does not appear, check the browser console for WebGL errors and ensure `three.min.js` loads.

## Navigation

Primary links are defined once in `lib/siteNavigation.ts` (`MAIN_NAV_LINKS`) and used by the header and footer.

## Support

Store contact emails are listed on `/contact` and in the README for business use.
