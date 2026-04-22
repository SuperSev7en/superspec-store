# How to operate SuperSpec.store

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm
- Optional: Vercel account + CLI for production deploys

## Environment variables

Create `.env.local` (never commit secrets):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (auth + data) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (browser + server user sessions) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only.** Used by `POST /api/stripe/webhook` to insert customers/orders (bypasses RLS). Never commit to client code. |
| `STRIPE_SECRET_KEY` | Create Checkout sessions server-side |
| `STRIPE_WEBHOOK_SECRET` | Verify Stripe webhook signatures |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional today; reserved for future client-side Stripe.js |
| `CONTACT_WEBHOOK_URL` | Optional. If set, `POST /api/contact` and newsletter signups from `POST /api/newsletter` can forward JSON here. If unset, payloads are logged server-side only. |
| `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASSWORD` | Optional **production** extra gate on `/admin/*` (see `middleware.ts`). After passing Basic auth, you still sign in with Supabase on `/login`. |

### Stripe webhooks (orders in Supabase)

1. Deploy the site so `https://YOUR_DOMAIN/api/stripe/webhook` exists.
2. In [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks), add an endpoint for that URL.
3. Subscribe to **`checkout.session.completed`** (Checkout mode: `payment`).
4. Copy the **Signing secret** into `STRIPE_WEBHOOK_SECRET` in Vercel (or `.env.local`).
5. Ensure **`SUPABASE_SERVICE_ROLE_KEY`** is set in the same environment.

When a customer pays, Stripe calls your webhook; the handler creates/updates **`customers`**, **`orders`**, and **`order_items`** (idempotent per `stripe_session_id`). You then see the order under **`/admin/orders`**.

### Admin access (beginner checklist)

1. Run the SQL in `supabase/migrations/` on your Supabase project if you have not already.
2. Create a user: Supabase **Authentication → Users** (email/password), or your `/register` flow if enabled.
3. Mark yourself admin: in **Table Editor → `profiles`**, set **`is_admin`** to `true` for your user row (or run SQL `update profiles set is_admin = true where email = 'you@example.com';`).
4. Open **`/login?next=/admin`**, sign in, then use **Products** and **Orders** from the sidebar. On your phone, use the **menu icon** in the top bar to open the same links.
5. In production, set **`ADMIN_BASIC_*`** if you want the extra password layer described in `middleware.ts`.

### Expo hub — remote push & “only me”

1. Apply **`supabase/migrations/20260422_push_subscriptions.sql`** so devices can store Expo push tokens.
2. On **Vercel**, set optional **`ADMIN_PUSH_USER_IDS`** to a comma-separated list of your Supabase `auth.users` UUIDs. When set, **only those users** receive push notifications from the Stripe webhook (everyone else’s tokens are ignored server-side).
3. In **`apps/admin-mobile/.env`**, set optional **`EXPO_PUBLIC_ADMIN_LOCK_EMAIL`** to your email so the app signs out anyone else immediately after login (pairs with `is_admin = false` for other users in `profiles`).
4. Run **`eas init`** inside `apps/admin-mobile`, set **`EAS_PROJECT_ID`** in that `.env`, rebuild the dev client or store build when you are ready for production push.

## Local development

```bash
npm install
npm run dev
```

Visit `/products`, `/collections/{handle}`, `/about`, `/contact`, `/mission-and-sustainability`, `/search?q=`, `/checkout/success` (after a test payment), `/admin` (admin users only).

**Super Spec Hub (Expo):** dedicated mobile/web admin lives in `apps/admin-mobile/`. Quick start: copy `NEXT_PUBLIC_SUPABASE_*` from your root `.env` into `apps/admin-mobile/.env` as `EXPO_PUBLIC_SUPABASE_*`, then from the repo root run `npm run mobile`. Full notes: [apps/admin-mobile/README.md](../apps/admin-mobile/README.md). Architecture reference: [ADMIN_MOBILE_PLAN.md](./ADMIN_MOBILE_PLAN.md).

## Product images (offline / no Shopify CDN)

1. **Automatic download** (while source URLs still respond):

   ```bash
   npm run images:download
   ```

   Output: `public/assets/product-images/` + `manifest.json`. The catalog maps CSV `Image Src` URLs to local paths.

2. **Manual**: Add files under `public/assets/product-images/` and add entries to `manifest.json` keyed by the exact CSV URL.

## Production deploy to Vercel

**Live site:** [https://superspec.studio](https://superspec.studio) (production alias on Vercel project `superspec-store`).

1. Install CLI: `npm i -g vercel`
2. Log in: `vercel login` (once per machine)
3. Link this repo to the Vercel project (once per clone; `.vercel/` is gitignored):

   ```bash
   vercel link
   ```

   Choose your Vercel team and project **superspec-store** (or the project shown in the Vercel dashboard).

4. Deploy with version tag + production:

   ```bash
   npm run deploy:vercel
   ```

   Or: `vercel deploy --prod --yes`

The script (`scripts/deploy-vercel.sh`) attempts to:

- Commit uncommitted changes (if any)
- Create an annotated git tag `v/<timestamp-or-name>`
- Push branch and tags to `origin` (if configured)
- Run `vercel deploy --prod --yes`

**Also:** Pushes to `main` on GitHub trigger Vercel builds when the repo is connected in project settings.

**Rollback:** Vercel dashboard → Deployments → promote a previous deployment. Git tags record deploy markers locally.

## Animated background

The site loads `public/assets/background-effects.js` + `background-effects.css` from `app/layout.tsx`. Layers use `z-index: 0`; main content is in `.PageContainer` with `z-index: 1` (see `app/globals.css`). If the canvas does not appear, check the browser console for WebGL errors and ensure `three.min.js` loads.

## Navigation

Primary links are defined once in `lib/siteNavigation.ts` (`MAIN_NAV_LINKS`) and used by the header and footer.

## Support

Store contact emails are listed on `/contact` and in the README for business use.
