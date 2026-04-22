# Admin portal: multi‑platform (Expo / iOS / Android / Web) — plan

This document is the blueprint for a **Shopify‑admin‑style** companion app that manages the same Supabase catalog, storage, and orders as the existing Next.js `/admin` UI. It is written so we can implement in phases without blocking the current web admin.

## Goals

- **Parity**: Product list/detail, media upload, CSV import/export (later), orders/fulfillment, audit trail — aligned with what the web admin already does.
- **Live updates**: When you tap **Save** or finish an **upload**, the **production storefront** reflects changes immediately (same database + Supabase Storage as today; Next.js pages already use `revalidate = 0` / dynamic reads from Supabase).
- **Platforms**: **Expo** for **iOS**, **Android**, and **web** (`expo start --web`). **Expo Go** is fine for early development; see limitations below.

## Research summary (official sources)

| Topic | Takeaway | Link |
|--------|-----------|------|
| Expo Go vs dev builds | Expo Go is a **fixed native shell**; only modules shipped inside Expo Go work. Production apps usually move to **development builds** or **EAS Build** when adding custom native code. | [Expo — Development builds intro](https://docs.expo.dev/develop/development-builds/introduction/) |
| Supabase + Expo | Use **`@supabase/supabase-js`** with **secure session storage** (e.g. `expo-secure-store` + AsyncStorage pattern from Supabase tutorial). **Anon key + user JWT** is intended for client apps; RLS enforces admin vs public. | [Supabase — Expo user management](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) |
| Example repo | Supabase maintains **expo-user-management** under `supabase/examples`. Useful for auth + storage patterns. | [GitHub — supabase/examples](https://github.com/supabase/supabase/tree/master/examples/user-management/expo-user-management) |

## Architecture (recommended)

### Data path — two viable approaches

**A. Supabase client in the mobile app (recommended for v1)**  
- Authenticate with **Supabase Auth** (same users as web).  
- Perform **CRUD** with `supabase.from('products')`, `product_images`, `variants`, `orders`, etc.  
- **RLS** already restricts writes to admins (`profiles.is_admin`).  
- **Live storefront**: reads are already from Supabase on the Next site; no extra “push” step beyond committing rows to Postgres/Storage.  
- **Audit log**: either call existing **RPC** or insert into `audit_log` from the app (add RLS policy for admin insert if missing), or add thin **Next API routes** later (approach B).

**B. Next.js `/api/admin/*` from mobile**  
- Reuse existing route handlers and **audit_log** inserts.  
- Requires **session on the API**: today routes use **cookie** sessions via `requireAdmin`. Mobile must send **`Authorization: Bearer <supabase_access_token>`** (or a dedicated API token).  
- **Implementation work**: add `requireAdminFromRequest(request)` that validates JWT with `supabase.auth.getUser(token)` and checks `profiles.is_admin`, then use in `app/api/admin/*`.

For **file uploads**, mobile can:  
- Use **signed upload URLs** pattern you already have (`/api/admin/storage/upload-url`) once Bearer auth is supported, **or**  
- Upload via **Supabase Storage client** with the user session if bucket policies allow admin uploads from JWT.

### Environment variables (Expo)

Prefix public vars with **`EXPO_PUBLIC_`** (Exposed to the client bundle — same as `NEXT_PUBLIC_`).

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_SUPABASE_URL` | Same as `NEXT_PUBLIC_SUPABASE_URL` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Same as `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `EXPO_PUBLIC_SITE_URL` | Production storefront origin (e.g. `https://superspec.studio`) for deep links / “view on site” |
| `EXPO_PUBLIC_API_BASE_URL` | Optional; **only if** calling Next admin APIs (approach B), e.g. `https://superspec.studio` |

**Never** put `service_role` or secrets in Expo env.

### Networking (device → your machine)

- **Physical iPhone**: `localhost` does not work. Use your **LAN IP** (e.g. `http://192.168.1.x:3000`) for Next during hybrid testing, or test against **deployed** Vercel + Supabase cloud only.
- **Supabase**: always use the **hosted project URL** from the dashboard for real devices.

## UX — “like Shopify admin”

Use a **mobile‑first** layout inspired by [Shopify Polaris](https://polaris.shopify.com/) patterns (lists, detail screens, sticky save bar, image grid, status badges). On web (Expo web), widen to a **two‑column** master‑detail where possible.

Suggested screens (mirror web admin):

1. Sign in (email/password or magic link — match Supabase config).  
2. **Products** — search, filters, published/draft, bulk select (later).  
3. **Product detail** — title, handle, body HTML editor (simplified), tags, variants, prices, **Save**.  
4. **Media** — pick from library / camera, upload, reorder (Supabase Storage + `product_images`).  
5. **Orders** — list + detail + fulfill (same fields as web).  
6. **Analytics** (read‑only KPIs from Supabase + note linking to Vercel Analytics).  
7. **Audit** (optional list view).

## Phased execution

| Phase | Scope |
|-------|--------|
| **P0** | Monorepo folder `apps/admin-mobile` (Expo TS), Supabase client + login, read products list. |
| **P1** | Product edit + save; image upload; verify storefront updates without redeploy. |
| **P2** | Orders + fulfillment; optional Bearer auth on Next `/api/admin/*` for parity with audit endpoints. |
| **P3** | CSV import/export, bulk edit, push notifications (requires dev build / EAS). |

## Expo Go limitations

- Only libraries **bundled in Expo Go** work without a custom dev client.  
- For **full** native modules or guaranteed parity with production, plan a **development build** ([Expo docs](https://docs.expo.dev/develop/development-builds/introduction/)).

## Security checklist

- RLS stays the source of truth for who can write.  
- No service role in the app.  
- Rotate keys if accidentally committed.  
- Deep links for auth callbacks configured in Supabase dashboard for the Expo scheme.

## Status (implemented)

The **`apps/admin-mobile`** Expo Router app (“**Super Spec Hub**”) is scaffolded and wired to Supabase:

- **P0/P1/P2 (core)**: email/password auth, admin gate via `profiles.is_admin`, Home / Orders / Products / Analytics / More, order fulfillment + audit insert, product title/status/published save, customers + audit lists, Shopify-style palette, **Realtime + local notifications** on new orders (`hooks/useOrdersRealtime.ts`).
- **Run**: from repo root, `npm run mobile` (see `apps/admin-mobile/README.md`).

Remaining optional work: **Bearer**-authenticated calls to Next `/api/admin/*` (if you want server-side audit only), **EAS** builds + **remote push**, CSV import inside the app, richer product editor (variants/media).

This file remains the **architecture reference**; day-to-day instructions for the app live in `apps/admin-mobile/README.md`.
