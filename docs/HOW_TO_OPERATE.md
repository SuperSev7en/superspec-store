# SUPER Spec. — How to Operate

> For full architecture, brand standards, env vars, and issue tracker — see **[MASTER_STATUS.md](./MASTER_STATUS.md)**
> This file covers day-to-day operations only.

---

## Database Setup

1. Go to [Supabase Dashboard](https://supabase.com) → your project → **SQL Editor**
2. Click **New Query**
3. Open `supabase/COMPLETE_SCHEMA.sql` from this project
4. Paste the entire contents → click **Run**
5. Tables, RLS, indexes, and seed data are created. Safe to re-run.

To make yourself an admin after first login:
```sql
UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';
```

---

## Admin Portal

URL: `https://superspec.studio/admin`

Requires: a profile row with `is_admin = true`.

| Section | What it does |
|---------|-------------|
| Dashboard | Revenue snapshot, recent orders |
| Orders | View, fulfill, track all orders |
| Products | Add/edit products, variants, images |
| Customers | Customer profiles & order history |
| Discounts | Create/manage discount codes |
| Analytics | Traffic, conversion, top products |

---

## Adding Products

1. Admin → Products → **Add Product**
2. Set **Type**: `art` / `clothing` / `engineered`
3. Set **Collection Handle**: `super-spectrum` / `super-speck` / `super-specification`
4. Upload images, set variants with prices & inventory
5. Set status to **Active** and toggle **Published**

The collection pages filter by `collection_handle` in the database.

---

## Updating Hero Images

Hero slides are controlled by the theme config file:
`Shopify files/[theme]/config/settings_data.json`

Find the `slideshow` section and update the `image` field for each block to point to a local asset path like `/assets/product-images/filename.jpg`.

---

## Deploying

```bash
# Push to Vercel production
vercel deploy --prod --yes

# Or just push to main branch (auto-deploys via Vercel GitHub integration)
git push origin main
```

After deploy, verify at https://superspec.studio.

---

## Environment Variables

Set in `.env.local` (local) and Vercel Dashboard (production).
See [MASTER_STATUS.md](./MASTER_STATUS.md) for the full table.

Critical ones:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` + `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`
- `JWT_SECRET` (32+ char random string)

---

## Stripe Webhook

Configure in Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://superspec.studio/api/stripe/webhook`
- Events: `payment_intent.succeeded`, `checkout.session.completed`

Copy the **Signing Secret** → paste as `STRIPE_WEBHOOK_SECRET` in Vercel env vars.

---

## Email (Resend)

1. Sign up at https://resend.com
2. Verify your domain `superspec.studio`
3. Create an API key → paste as `RESEND_API_KEY`
4. From address used: `service@superspec.studio`

---

## Testing a Purchase

1. Start dev server: `npm run dev`
2. Add product to cart
3. Go to `/checkout`
4. Use Stripe test card: `4242 4242 4242 4242` exp `12/34` CVC `123`
5. Check Supabase → `orders` table for the new row
