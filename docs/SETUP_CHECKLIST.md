# SUPER Spec. — One-Time Setup Checklist

> Complete this checklist once to get your store fully operational.

---

## Environment Variables Setup

### 1. Vercel Environment Variables
Go to **Vercel → Project Settings → Environment Variables** and add:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# JWT
JWT_SECRET=your-random-jwt-secret-string
```

### 2. Where to Get Each Key

#### Supabase
1. Go to https://supabase.com/dashboard
2. Create new project or use existing
3. Settings → API → Copy URL and keys
4. **Important:** Keep Service Role Key secret (server-side only)

#### Stripe
1. Go to https://dashboard.stripe.com
2. Developers → API Keys → Copy keys
3. Toggle to "Live mode" for production
4. Create webhook (see below)

#### Resend
1. Go to https://resend.com
2. Sign up → API Keys → Create new key
3. Verify your sending domain in Settings → Domains

---

## Stripe Configuration

### 1. Webhook Setup
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
   - `checkout.session.completed`
4. Copy signing secret to Vercel env vars

### 2. Apple Pay Domain Verification
1. Stripe → Settings → Payment Methods → Apple Pay
2. Add your domain: `your-domain.com`
3. Domain ID should be: `pmd_1TSD6nAzeNVyZRkgQE5pfrpi`
4. Download verification file and upload to your domain root

### 3. Payment Methods
Enable in Stripe → Settings → Payment Methods:
- Card payments (always on)
- Apple Pay
- Google Pay
- Link (for saved cards)

---

## Supabase Database Setup

### 1. Run Database Schema
Execute the SQL from `docs/DATABASE_SCHEMA.sql` in Supabase SQL Editor:

```sql
-- Tables: products, orders, discount_codes, newsletter_subscribers
-- Add missing columns to existing tables
-- Set up Row Level Security (RLS)
```

### 2. Enable RLS Policies
```sql
-- Allow public read access to products
-- Allow authenticated users to manage their own orders
-- Allow admin full access
```

### 3. Storage Setup
Create storage buckets:
- `product-images` (public)
- `assets` (public)

---

## Email Configuration

### 1. Verify Domain in Resend
1. Resend → Settings → Domains
2. Add your domain: `your-domain.com`
3. Add DNS records to your domain provider
4. Wait for verification (can take 24-48 hours)

### 2. Test Email
```bash
curl -X POST https://api.resend.com/emails \
  -H 'Authorization: Bearer re_...' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "orders@your-domain.com",
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<p>This is a test email from SUPER Spec.</p>"
  }'
```

---

## Production Deployment

### 1. Connect GitHub to Vercel
1. Vercel → Add New → Project
2. Import your GitHub repository
3. Set Build Command: `npm run build`
4. Set Output Directory: `.next`
5. Add all environment variables
6. Deploy

### 2. Custom Domain
1. Vercel → Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (usually < 1 hour)

### 3. Test Everything
- [ ] Homepage loads correctly
- [ ] Products display and add to cart
- [ ] Checkout process works (test with 4242 4242 4242 4242)
- [ ] Apple Pay/Google Pay buttons appear
- [ ] Order confirmation email received
- [ ] Admin panel accessible
- [ ] Mobile app loads (Expo Go)

---

## Security Checklist

### 1. API Keys
- [ ] No API keys in client-side code
- [ ] Only public keys in `NEXT_PUBLIC_*` vars
- [ ] Secret keys only in server-side env vars

### 2. Database Security
- [ ] RLS policies enabled on all tables
- [ ] Service role key never exposed to client
- [ ] Admin authentication working

### 3. Webhook Security
- [ ] Webhook endpoint secured with signature verification
- [ ] Only Stripe can call webhook endpoint
- [ ] Idempotency checks prevent duplicate orders

---

## Performance Optimization

### 1. Image Optimization
- [ ] Product images compressed and WebP format
- [ ] Next.js Image component used everywhere
- [ ] CDN properly configured

### 2. Caching
- [ ] Static pages cached on Vercel Edge
- [ ] Product data cached with appropriate TTL
- [ ] API responses cached where safe

### 3. SEO
- [ ] Meta tags on all pages
- [ ] Structured data for products
- [ ] XML sitemap generated
- [ ] robots.txt configured

---

## Monitoring & Analytics

### 1. Error Tracking
- [ ] Vercel Analytics enabled
- [ ] Error logging configured
- [ ] Uptime monitoring set up

### 2. Business Metrics
- [ ] Conversion tracking set up
- [ ] Revenue dashboard working
- [ ] Customer analytics configured

---

## Final Verification

### End-to-End Test Flow
1. **Browse** products → Add to cart
2. **Checkout** with test card → Order created
3. **Check email** → Order confirmation received
4. **Admin panel** → Order shows up
5. **Fulfill order** → Enter tracking
6. **Check email** → Shipping notification received
7. **Mobile app** → Order appears and can be fulfilled

### Launch Checklist
- [ ] All environment variables set
- [ ] Database schema applied
- [ ] Webhooks configured
- [ ] Email domain verified
- [ ] Custom domain working
- [ ] SSL certificate active
- [ ] Test transactions successful
- [ ] Admin access working
- [ ] Documentation complete
- [ ] Backup strategy in place

---

## Post-Launch

### First Week Tasks
- Monitor for any errors or issues
- Check email deliverability
- Verify all order processing works
- Test refund flow
- Monitor performance metrics

### Ongoing Maintenance
- Weekly order review
- Monthly analytics check
- Quarterly security audit
- Annual domain renewal

---

## Emergency Contacts

| Service | Support URL | Emergency Contact |
|---------|-------------|------------------|
| Vercel | https://vercel.com/support | Discord/Email |
| Stripe | https://stripe.com/support | 24/7 Phone |
| Supabase | https://supabase.com/support | Discord/Email |
| Resend | https://resend.com/support | Email |

---

## Troubleshooting Quick Reference

| Issue | First Check | Then Check |
|-------|-------------|------------|
| Site not loading | Vercel deployment status | DNS propagation |
| Payments failing | Stripe API keys | Webhook configuration |
| Emails not sending | Resend API key | Domain verification |
| Admin not working | JWT secret | Database connection |
| Mobile app crashing | Expo Go version | API endpoints accessible |

---

**Once you complete this checklist, your store is ready for business! 🎉**
