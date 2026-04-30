# How to Operate SuperSpec.store

This document provides a comprehensive guide for store owners to manage the store and for developers to understand the codebase.

---

## 1. How to Open and Use the Admin Portal

The Admin Portal is your central hub for managing orders, products, customers, and analytics.

### Accessing the Admin Portal
1. Make sure your local server is running (`npm run dev`) or visit your live website.
2. Navigate to **`/login`** and sign in. (If you haven't created an account yet, go to `/register` to create one).
3. **Important:** Your account must be marked as an Admin. 
   - Go to your Supabase dashboard → **Table Editor** → **`profiles`** table.
   - Find your user row and set the **`is_admin`** column to `true`.
4. Once logged in as an admin, navigate to **`/admin`** in your browser.

### Using the Admin Portal Features
- **Dashboard:** Gives you a quick glance at your recent orders, revenue, and pending tasks.
- **Orders (`/admin/orders`):** View all customer orders. Click on any order to see its details, mark it as processing or shipped, issue refunds (which integrates with Stripe), or print a packing slip.
- **Products (`/admin/products`):** View your catalog. Click "Add product" to create a new one, or click an existing product to edit its title, images, variants (size/color), pricing, and stock levels.
- **Customers (`/admin/customers`):** View customer profiles, their total spend (Lifetime Value), and order history.
- **Discounts (`/admin/discounts`):** Create and manage discount codes (e.g., 10% off, $5 off) with optional usage limits and expiration dates.
- **Analytics (`/admin/analytics`):** Track your store's performance with charts showing revenue over time, conversion funnels, top products, and device breakdowns.
- **Pages / Settings:** Manage store policies, shipping zones, tax rates, and staff accounts.

---

## 2. Environment Variables Explained

Your `.env` file (or `.env.local` for local development) holds the secret keys needed for the store to function. 

### What are `RESEND_API_KEY` and `CRON_SECRET`?
Yes, these are now explicitly listed in your `.env` file. Here is what they do:

- **`RESEND_API_KEY`**: 
  - **What it is:** We use a service called [Resend](https://resend.com) to send all transactional emails.
  - **What it does:** It sends Order Confirmations, Welcome Emails (when someone subscribes to the newsletter), Abandoned Cart reminders, and Post-Purchase Follow-ups (asking for reviews 7 days later, or restocking nudges 45 days later).
  - **Action Needed:** Sign up for a free account at Resend.com, generate an API key, and paste it here. If left as the placeholder, emails will simply be skipped without crashing the site.

- **`CRON_SECRET`**:
  - **What it is:** A random password that protects your automated background tasks (Cron jobs).
  - **What it does:** The store has automated tasks that run every hour (e.g., checking for abandoned carts and sending emails). You don't want random people on the internet triggering these manually. Vercel automatically sends this secret when it triggers the hourly task, and your code verifies it.
  - **Action Needed:** Generate a random string (e.g., `my_super_secret_cron_key_123`) and put it here. In Vercel, set the same value in your Environment Variables.

- **`JWT_SECRET`**:
  - **What it is:** A private "master key" used to lock and unlock your user sessions.
  - **What it does:** When a customer or admin logs in, the server gives them a digital "passport" (JWT). This passport is signed with your `JWT_SECRET` so that the server can trust it hasn't been tampered with. Without this, anyone could pretend to be an admin.
  - **Action Needed:** Generate a secure 32+ character random string. You can use the command in your `.env` file to generate one instantly: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Paste the result into your `.env` and Vercel settings.

---

## 3. Developer Handover: Codebase Overview

If another developer needs to work on this site, here is exactly how it is structured:

### Architecture
- **Framework:** Next.js 15 (App Router). All pages live in the `app/` directory.
- **Database:** Supabase (PostgreSQL). We use `@supabase/ssr` for secure cookie-based authentication.
- **Styling:** Tailwind CSS + custom CSS (`app/globals.css`).
- **Payments:** Stripe (Checkout Sessions + Webhooks).
- **Emails:** Resend.

### Key Directories
- **`app/(storefront)`** (Implicit): Pages like `app/page.tsx`, `app/products/[handle]/page.tsx`, `app/checkout/page.tsx`. This is the customer-facing side.
- **`app/admin/*`**: The protected Admin Portal. It checks for a valid JWT with the `admin` role in `middleware.ts`.
- **`app/api/*`**: 
  - `/api/auth/*`: Handles login, register, password reset. Custom JWTs are stored in HTTP-only cookies.
  - `/api/checkout/*`: Creates Stripe Payment Intents and confirms orders.
  - `/api/cron/*`: Hourly tasks for marketing automation (abandoned carts, scheduled emails). Protected by `CRON_SECRET`.
  - `/api/stripe/webhook/route.ts`: Listens to Stripe to finalize orders when payments succeed.
- **`components/`**: Reusable UI parts. `components/store/` has customer-facing components (e.g., `CartDrawer`, `ProductDetailBase`), and `components/admin/` has admin UI parts.

### Recent Major Updates (Phases 6, 7, 8)
1. **Auth Hardening:** Replaced basic password protection for the Admin portal with secure JWT role-based checks. Added "Guest Cart Merge" so if a user adds items while logged out, then logs in, their items are kept.
2. **Marketing Automation:** Wired up automated emails using a `scheduled_emails` table in Supabase. When an order is placed, a "Review Request" is scheduled for 7 days later, and a "Reorder Nudge" for 45 days later.
3. **Admin Rebuild:** Completely rebuilt the Admin Orders, Products, Customers, and Analytics pages to be production-ready with real data mapping, charts (via `recharts`), and CSV exports.

### Maintenance & Deployment
- **To Deploy:** Push to your `main` branch connected to Vercel, or run `npm run deploy:vercel`.
- **To add new Environment Variables:** Always add them in your local `.env.local` first to test, then add them in the Vercel Dashboard → Settings → Environment Variables.

---

## 4. Cleanup Notes
We recently ran a cleanup script that removed unnecessary development/legacy files:
- Removed obsolete scripts (`modify_settings.js`, `test-catalog.mjs`).
- Removed old Shopify UI screenshots and the `.factory` / `.kilocode` hidden directories.
- The project root is now clean and contains only production-necessary code and documentation.
