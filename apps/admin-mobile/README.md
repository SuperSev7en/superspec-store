# Super Spec Hub (Expo)

Dedicated **store operations app** for iOS, Android, and web — same Supabase project and admin users as the Next.js site (`/admin`).

## How this maps to Shopify’s product (research)

Using the official **Shopify Help Center → Shopify admin** page ([Shopify admin](https://help.shopify.com/en/manual/shopify-admin), reviewed in-browser, April 2026), Shopify describes the mobile experience as:

- A **central hub** for running operations (desktop at `shopify.com/admin`, mobile via the **Shopify mobile app**).
- On mobile: **orders**, **products**, and **store analytics** — with a note that **most features** are available on mobile while **some advanced settings** still expect desktop.

This app mirrors that split:

| Shopify pattern | Super Spec Hub |
|-----------------|----------------|
| Home / performance snapshot | **Home** tab — KPI cards + live activity |
| Orders pipeline | **Orders** tab + fulfillment on order detail |
| Catalog edits | **Products** tab + product editor |
| Analytics overview | **Analytics** tab — revenue/order counts from Supabase |
| Settings / integrations | **Settings** tab — grouped rows (Polaris-style), notifications, deep links to web admin & dashboards |
| Push / instant awareness | **Supabase Realtime** (in-app) + **remote Expo push** when a paid order is written (Stripe webhook → Expo HTTP API) |

We intentionally **do not** rebuild every Shopify Admin surface in mobile — Shopify themselves steer complex configuration to desktop.

## Setup (beginner-friendly)

1. Apply the new migration in Supabase (SQL editor or CLI): `supabase/migrations/20260422_push_subscriptions.sql`.

2. From the **repo root** `.env`, copy into **`apps/admin-mobile/.env`**:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=...same as NEXT_PUBLIC_SUPABASE_URL...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...same as NEXT_PUBLIC_SUPABASE_ANON_KEY...
   EXPO_PUBLIC_SITE_URL=https://your-production-domain.com
   EAS_PROJECT_ID=...from `eas init` / Expo dashboard...
   ```

3. **EAS project** (required for real `ExponentPushToken` on device):

   ```bash
   cd apps/admin-mobile
   npx eas-cli@latest init
   ```

   Put the **Project ID** into `EAS_PROJECT_ID` in `.env` (and/or `extra.eas.projectId` is merged via `app.config.ts`).

4. Run from repo root:

   ```bash
   npm run mobile
   ```

5. Sign in with the **same** email/password as the website admin. Your user must have `profiles.is_admin = true`.

## Remote push (new orders)

1. After checkout, the **Stripe webhook** (`POST /api/stripe/webhook`) persists the order, then calls Expo’s **Push API** for every token in `push_subscriptions` belonging to **admin** users.
2. The hub registers your device on login (`usePushRegistration`) — physical device + notification permission + valid `EAS_PROJECT_ID`.
3. **Test push**: open **Settings → Send test push** (calls `POST /api/push/test` with your Supabase access token).

### Lock push to “only me” (recommended)

- **Server:** set `ADMIN_PUSH_USER_IDS` in Vercel to your auth user UUID(s) (comma-separated). Only those accounts receive webhook pushes.
- **Client:** set `EXPO_PUBLIC_ADMIN_LOCK_EMAIL` in `apps/admin-mobile/.env` to your email. Any other admin user is signed out immediately (defense in depth — still keep `is_admin` false for everyone else in Supabase).

## Instant in-app updates (Realtime)

The app subscribes to **`public.orders` INSERT** for the Home “Live activity” strip. In Supabase → **Database → Replication**, ensure **`orders`** is in the `supabase_realtime` publication.

## Quality commands (this folder)

```bash
npm run typecheck
npm run lint
```

From monorepo root: `npm run mobile:typecheck` and `npm run mobile:lint`.

## Next upgrades (optional)

- **`supabase gen types`**: generate `database.types.ts` and pass the generic into `createClient<Database>()` for full typing.
- **Richer catalog editor** (variants, media) inside the app.
