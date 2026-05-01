# SUPER Spec. — Owner's Guide

> Everything you need to run your online store, from daily operations to troubleshooting.

---

## Table of Contents
1. [How Your Store Works](#how-your-store-works)
2. [Daily Operations](#daily-operations)
3. [Processing Orders](#processing-orders)
4. [Adding & Editing Products](#adding--editing-products)
5. [Shipping & Fulfillment](#shipping--fulfillment)
6. [Refunds](#refunds)
7. [Discount Codes](#discount-codes)
8. [Email Notifications](#email-notifications)
9. [Deploying Updates](#deploying-updates)
10. [Accounts & Keys](#accounts--keys)

---

## How Your Store Works

Your store is a **self-hosted e-commerce website** that replaces Shopify. Here's what powers it:

| Service | What It Does | Dashboard URL |
|---------|-------------|---------------|
| **Vercel** | Hosts your website | https://vercel.com/dashboard |
| **Stripe** | Processes payments (cards, Apple Pay, Google Pay) | https://dashboard.stripe.com |
| **Supabase** | Stores your products, orders, and data | https://supabase.com/dashboard |
| **Resend** | Sends order confirmation & shipping emails | https://resend.com/emails |

**Flow:** Customer places order → Stripe charges card → Order saved to Supabase → Confirmation email sent via Resend → You fulfill the order from admin panel.

---

## Daily Operations

### Checking for New Orders
1. Go to **https://superspec.studio/admin/orders**
2. New orders appear at the top with status "paid"
3. You'll also see them in your Stripe dashboard under "Payments"

### Admin Panel Access
- URL: `https://superspec.studio/admin`
- Protected by login (your admin account)
- Sections: Dashboard, Orders, Products, Inventory, Analytics, Settings

---

## Processing Orders

### Order Lifecycle
```
Customer Pays → "paid" → You Process → "processing" → You Ship → "fulfilled" → Customer Receives → "delivered"
```

### Step-by-Step
1. **Go to** `/admin/orders` → Click on the new order
2. **Review** the items, shipping address, and payment info
3. **Print Packing Slip** (click the printer icon) for your shipping label
4. **Package the items** and drop off at carrier (USPS, UPS, FedEx)
5. **Get the tracking number** from your carrier receipt
6. **Click "Mark Shipped"** → Enter carrier name and tracking number → Confirm
7. **Done!** The customer automatically receives a shipping notification email with tracking link

---

## Adding & Editing Products

### From Admin Panel
1. Go to `/admin/products`
2. Click "New Product" or click an existing product to edit
3. Fill in: Title, Description, Price, Images, Variants (sizes/colors), Tags
4. Set inventory quantities for each variant
5. Click Save

### Bulk Import from CSV
1. Go to `/admin/products/import`
2. Upload your Shopify-format products CSV
3. The system maps columns automatically
4. Review and confirm the import

### Product Images
- Upload via the product edit page
- Recommended: Square images, minimum 1000x1000px
- Supported formats: JPG, PNG, WebP

---

## Shipping & Fulfillment

### How Shipping Costs Work
Your store uses **flat-rate shipping** (configured in the checkout):

| Method | Cost | Delivery Time |
|--------|------|---------------|
| Standard | $5.99 (FREE over $75) | 5-7 business days |
| Express | $14.99 | 2-3 business days |

### What You Need to Ship
1. **Packaging materials** — boxes, bubble mailers, tissue paper
2. **A carrier account** — USPS is cheapest for small items, UPS/FedEx for larger
3. **Shipping labels** — Buy at post office, or use Pirate Ship (https://pirateship.com) for discounted rates

### Recommended: Pirate Ship
- Free to sign up
- Gives you USPS Commercial rates (much cheaper)
- Print labels from home
- Auto-generates tracking numbers

### Process
1. Package the order
2. Go to pirateship.com → "Create a Shipment"
3. Enter the customer's address (from your admin panel)
4. Select service → Pay → Print label
5. Copy tracking number → Mark shipped in your admin panel

---

## Refunds

### Full or Partial Refund
1. Go to the order in admin → Click "Refund"
2. Enter amount (or click "Full refund")
3. The refund is processed through Stripe (takes 5-10 business days to appear on customer's card)

### Alternative: Refund via Stripe Dashboard
1. Go to https://dashboard.stripe.com/payments
2. Find the payment → Click "Refund"
3. This also works and updates the order status automatically via webhook

---

## Discount Codes

### Current Active Codes
- `WELCOME10` — 10% off first order (hardcoded)

### Adding New Codes (Future)
- Admin → Discounts page (`/admin/discounts`)
- Set: code name, percentage or fixed amount, minimum order, expiration date

---

## Email Notifications

Your store automatically sends these emails:

| Email | When | Content |
|-------|------|---------|
| Order Confirmation | Immediately after payment | Order summary, total, shipping address |
| Shipping Notification | When you mark "shipped" | Tracking number + clickable tracking link |

### Email Sender Address
- From: `orders@superspec.studio`
- Make sure your domain is verified in Resend dashboard

### If Emails Aren't Sending
1. Check Resend dashboard for errors: https://resend.com/emails
2. Verify `RESEND_API_KEY` is set in your Vercel environment variables
3. Verify your domain DNS records in Resend settings

---

## Deploying Updates

Your website automatically deploys when you push code changes:

```
Edit code locally → git push → Vercel auto-builds → Live in ~60 seconds
```

### If You Need to Update Text/Content
1. Edit the file in your code editor
2. Save → `git add . && git commit -m "update content" && git push`
3. Check https://vercel.com/dashboard for build status

### If Build Fails
- Check the error in Vercel's deployment logs
- Common causes: TypeScript type errors, missing environment variables

---

## Accounts & Keys

### Environment Variables (in Vercel)
Go to Vercel → Project Settings → Environment Variables:

| Variable | Where to Get It |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (secret!) |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks |
| `RESEND_API_KEY` | Resend → API Keys |
| `JWT_SECRET` | Any random string (generate once, never change) |

### Stripe Webhook Setup
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://superspec.studio/api/stripe/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`, `checkout.session.completed`
4. Copy the signing secret → Set as `STRIPE_WEBHOOK_SECRET` in Vercel

### Apple Pay Domain Verification
- Already configured with domain ID: `pmd_1TSD6nAzeNVyZRkgQE5pfrpi`
- If it stops working, re-verify in Stripe → Settings → Payment Methods → Apple Pay

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Checkout not working | Check Stripe API keys in Vercel env vars |
| Express checkout (Apple/Google Pay) not showing | Only works on HTTPS with verified domain |
| Emails not sending | Check RESEND_API_KEY and domain verification |
| Products not showing | Check Supabase connection; verify products are published |
| Build failed on deploy | Check Vercel logs for TypeScript errors |
| Admin page won't load | Make sure you're logged in with admin account |

---

## Monthly Checklist

- [ ] Review unfulfilled orders
- [ ] Check Stripe for any disputed payments
- [ ] Review analytics in admin dashboard
- [ ] Backup product data (export CSV from admin)
- [ ] Check Resend for email delivery issues
- [ ] Update product inventory counts if needed
