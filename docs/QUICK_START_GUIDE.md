# SUPER Spec. — Quick Start Guide

> Get your store running in 30 minutes. This is the essential checklist to start taking orders.

---

## 🚀 30-Minute Setup

### Step 1: Environment Variables (5 minutes)
Go to **Vercel → Project Settings → Environment Variables** and add:

```bash
# Required - Get these from each service
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_test_...  # Use test keys first
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
JWT_SECRET=any-random-string-here
```

### Step 2: Stripe Setup (10 minutes)
1. **Create Stripe account** at https://dashboard.stripe.com
2. **Add webhook endpoint:** `https://your-domain.com/api/stripe/webhook`
3. **Select events:** `payment_intent.succeeded`, `payment_intent.payment_failed`
4. **Copy webhook secret** to Vercel env vars
5. **Test with:** Card `4242 4242 4242 4242`

### Step 3: Supabase Setup (10 minutes)
1. **Create project** at https://supabase.com
2. **Run SQL from docs/DATABASE_SCHEMA.sql** in Supabase SQL Editor
3. **Enable Row Level Security** (RLS) on all tables
4. **Copy URL and keys** to Vercel env vars

### Step 4: Email Setup (5 minutes)
1. **Create account** at https://resend.com
2. **Verify your domain** in Settings → Domains
3. **Copy API key** to Vercel env vars
4. **Test email** with their API playground

---

## 📱 Testing Your Store

### Test Checkout Flow
1. **Add product to cart**
2. **Proceed to checkout**
3. **Fill contact info**
4. **Add shipping address**
5. **Select shipping method**
6. **Pay with test card:** `4242 4242 4242 4242`
7. **Check email** for order confirmation

### Test Admin Panel
1. **Go to:** `https://your-domain.com/admin`
2. **Create admin account** or login
3. **View order** that was just created
4. **Test fulfillment:** Enter tracking info
5. **Check customer email** for shipping notification

---

## 📦 First Order Processing

### When You Get Your First Real Order
1. **Check Stripe dashboard** for payment
2. **View order in admin panel**
3. **Package the items** securely
4. **Buy shipping label** (see Shipping Guide)
5. **Enter tracking** in admin panel
6. **Customer gets shipping email** automatically

### Quick Shipping Options
- **Easiest:** Take package to post office
- **Better:** Use Pirate Ship (free, discounted rates)
- **Professional:** ShipStation (paid, for high volume)

---

## ⚡ Common Questions

### "Do I need to connect Shippo or ShipStation?"
**No!** You can start with:
- Post office (walk-in)
- Pirate Ship (free online)
- Upgrade to paid services later when you have 50+ orders/month

### "How do I handle shipping rates?"
Your store already has flat rates configured:
- Standard: $5.99 (free over $75)
- Express: $14.99
- You keep the shipping amount, buy labels separately

### "What about Apple Pay/Google Pay?"
Already set up! Just need to:
- Verify your domain in Stripe
- Use HTTPS (Vercel provides this)
- Test in Safari/Chrome

### "How do I get order notifications?"
Two ways:
1. **Email notifications** (automatic)
2. **Admin panel** - check dashboard for new orders
3. **Mobile app** - install Expo Go for on-the-go

### "What if something breaks?"
1. **Check TROUBLESHOOTING.md** for common issues
2. **Verify environment variables** in Vercel
3. **Check service status** (Stripe, Supabase, Vercel)
4. **Contact developer** for technical issues

---

## 🎯 Next Steps

### Day 1: Launch
- [ ] Complete environment setup
- [ ] Test checkout with test card
- [ ] Verify order creation works
- [ ] Test admin fulfillment

### Week 1: First Orders
- [ ] Process real orders as they come in
- [ ] Set up shipping routine (Pirate Ship recommended)
- [ ] Check email deliverability
- [ ] Monitor for any issues

### Month 1: Optimize
- [ ] Review sales analytics
- [ ] Add more products if needed
- [ ] Consider shipping software if high volume
- [ ] Set up marketing campaigns

---

## 📞 Quick Help

### Most Common Issues
| Problem | Solution |
|---------|----------|
| Checkout not working | Check Stripe keys in Vercel |
| No orders appearing | Check webhook setup in Stripe |
| Emails not sending | Verify domain in Resend |
| Can't access admin | Check JWT secret and login |

### Emergency Contacts
- **Stripe Support:** https://stripe.com/support
- **Supabase Support:** https://supabase.com/support  
- **Vercel Support:** https://vercel.com/support
- **Developer:** [Your contact info]

### Important Links
- **Admin Panel:** `https://your-domain.com/admin`
- **Stripe Dashboard:** `https://dashboard.stripe.com`
- **Supabase Dashboard:** `https://supabase.com/dashboard`
- **Vercel Dashboard:** `https://vercel.com/dashboard`

---

## ✅ Launch Checklist

Before you go live:
- [ ] All environment variables set in Vercel
- [ ] Stripe webhook configured and tested
- [ ] Supabase database schema applied
- [ ] Email domain verified in Resend
- [ ] Test checkout completed successfully
- [ ] Test order fulfillment works
- [ ] Admin panel accessible
- [ ] Mobile app loads (optional)

---

**You're ready to start selling!** The system is designed to work out of the box. Focus on processing orders and providing great customer service - the technical stuff is handled automatically.

Remember: You can always upgrade shipping software and add features later. Start simple and scale as you grow.
