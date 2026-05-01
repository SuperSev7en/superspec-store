# SUPER Spec. — Troubleshooting Guide

> Quick solutions to common issues. For detailed setup, see SETUP_CHECKLIST.md.

---

## Critical Issues (Store Down)

### Website Not Loading
**Symptoms:** Blank page, 404 errors, or "Application error"
**Causes & Solutions:**
- **Vercel deployment failed** → Check Vercel dashboard for build errors
- **Environment variables missing** → Verify all env vars in Vercel project settings
- **Database connection failed** → Check Supabase URL and keys
- **Domain DNS issues** → Verify DNS records point to Vercel

**Quick Check:**
```bash
# Check if site is accessible
curl -I https://your-domain.com
# Should return 200 OK
```

### Payments Not Working
**Symptoms:** Checkout fails, Stripe errors, payment not processing
**Causes & Solutions:**
- **Stripe API keys incorrect** → Verify keys in Vercel env vars
- **Webhook not configured** → Add webhook endpoint in Stripe dashboard
- **Domain not verified** → Verify domain for Apple Pay in Stripe
- **CORS issues** → Check Stripe domain settings

**Test with Stripe test mode:**
```
Card number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

### Orders Not Appearing in Admin
**Symptoms:** Successful payments but no orders in database
**Causes & Solutions:**
- **Webhook endpoint not receiving events** → Check Stripe webhook configuration
- **Webhook secret mismatch** → Verify STRIPE_WEBHOOK_SECRET in Vercel
- **Database permissions** → Check Supabase RLS policies on orders table
- **Webhook handler errors** → Check Vercel function logs

**Debug webhook:**
```bash
# Check recent webhook deliveries in Stripe dashboard
# Look for failed deliveries and error messages
```

---

## Customer-Facing Issues

### Products Not Showing
**Symptoms:** Empty product pages, 404 on product URLs
**Causes & Solutions:**
- **Products not published** → Check `published` field in products table
- **Out of stock items** → Verify inventory counts
- **Image URLs broken** → Check image paths in database
- **Cache issues** → Clear browser cache, restart Vercel

### Cart Not Working
**Symptoms:** Can't add items, cart empties on refresh
**Causes & Solutions:**
- **JavaScript errors** → Check browser console for errors
- **LocalStorage disabled** → Browser privacy settings
- **Product data missing** → Verify product variants exist
- **Session expired** → Clear cookies, refresh page

### Shipping Calculator Wrong
**Symptoms:** Incorrect shipping costs, free shipping not applying
**Causes & Solutions:**
- **Hardcoded rates** → Update shipping logic in checkout
- **Country restrictions** → Check shipping method availability
- **Weight-based rules** → Verify product weights
- **Tax calculation** → Check tax settings

---

## Email Issues

### Order Confirmation Not Sending
**Symptoms:** Customers don't receive order emails
**Causes & Solutions:**
- **Resend API key invalid** → Verify RESEND_API_KEY in Vercel
- **Domain not verified** → Check DNS records in Resend dashboard
- **Email template broken** → Test email template manually
- **Spam filters** → Check email deliverability

**Test email:**
```bash
curl -X POST https://api.resend.com/emails \
  -H 'Authorization: Bearer re_your_key' \
  -H 'Content-Type: application/json' \
  -d '{"from":"orders@your-domain.com","to":"test@example.com","subject":"Test","html":"<p>Test</p>"}'
```

### Shipping Notification Not Sending
**Symptoms:** No email when order is marked shipped
**Causes & Solutions:**
- **Fulfillment API failing** → Check admin fulfillment logs
- **Tracking number missing** → Ensure tracking data is saved
- **Email template error** → Verify shipping email template
- **Rate limiting** → Check Resend usage limits

---

## Admin Panel Issues

### Can't Access Admin
**Symptoms:** Login fails, 403 errors, admin pages not loading
**Causes & Solutions:**
- **Wrong credentials** → Reset admin password
- **JWT secret mismatch** → Verify JWT_SECRET in Vercel
- **Session expired** → Clear browser cookies
- **Permission issues** → Check user role in database

### Orders Not Loading
**Symptoms:** Empty orders list, slow loading, error messages
**Causes & Solutions:**
- **Database connection** → Check Supabase status
- **Large dataset** → Add pagination or filters
- **RLS policies** → Verify admin can read orders table
- **API rate limits** → Check Supabase usage

### Fulfillment Not Working
**Symptoms:** Can't mark orders shipped, tracking not saving
**Causes & Solutions:**
- **API endpoint broken** → Check `/api/admin/orders/[id]/fulfill`
- **Database constraints** → Verify table schema
- **Permission denied** → Check admin role permissions
- **Validation errors** → Check required fields

---

## Mobile App Issues

### App Won't Connect
**Symptoms:** "Network error", "Can't reach server"
**Causes & Solutions:**
- **Different WiFi networks** → Use same network or tunnel mode
- **Firewall blocking** → Check computer firewall settings
- **Wrong IP address** → Update connection URL
- **Server not running** → Start development server

**Alternative connection:**
```bash
# Use tunnel mode for any network
npx expo start --tunnel
```

### Orders Not Syncing
**Symptoms:** Mobile shows different orders than web
**Causes & Solutions:**
- **Cache issues** → Pull to refresh mobile app
- **Realtime disabled** → Check Supabase realtime settings
- **Different endpoints** → Verify API URLs match
- **Authentication** → Re-login to mobile app

---

## Performance Issues

### Site Slow Loading
**Symptoms:** Pages take >5 seconds to load
**Causes & Solutions:**
- **Large images** → Optimize and compress images
- **Unoptimized queries** → Add database indexes
- **No caching** → Enable CDN and browser caching
- **Third-party scripts** → Remove unused analytics

**Performance check:**
```bash
# Test page load time
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com
```

### Database Slow
**Symptoms:** Admin pages lag, checkout takes forever
**Causes & Solutions:**
- **Missing indexes** → Add indexes on order_date, customer_email
- **Large queries** → Add LIMIT and pagination
- **Connection pooling** → Check Supabase connection limits
- **Expensive joins** → Optimize product queries

---

## Security Issues

### Stripe Webhook Fails
**Symptoms:** "Signature verification failed" errors
**Causes & Solutions:**
- **Wrong webhook secret** → Update STRIPE_WEBHOOK_SECRET
- **Request tampered** → Check for man-in-the-middle attacks
- **Clock sync** → Verify server time is correct
- **Endpoint changed** → Update webhook URL in Stripe

### Admin Access Breached
**Symptoms:** Unknown admin logins, suspicious orders
**Causes & Solutions:**
- **Weak password** → Change all admin passwords
- **JWT leaked** → Regenerate JWT_SECRET
- **No 2FA** → Enable two-factor authentication
- **Shared computer** → Log out all sessions

**Security audit:**
```bash
# Check for exposed secrets
grep -r "sk_test\|pk_live\|re_" --exclude-dir=node_modules .
```

---

## Development Issues

### Build Fails Locally
**Symptoms:** `npm run build` errors
**Causes & Solutions:**
- **TypeScript errors** → Run `tsc --noEmit` to see details
- **Missing dependencies** → Run `npm install`
- **Environment variables** → Create `.env.local` file
- **Node version** → Use Node.js 18+

### Git Push Fails
**Symptoms:** Deployment fails on Vercel
**Causes & Solutions:**
- **Build errors** → Check Vercel build logs
- **Missing env vars** → Add to Vercel project settings
- **Large files** → Remove large assets from repo
- **Branch protection** → Check branch rules

---

## Emergency Procedures

### Site Completely Down
1. **Check Vercel status** → https://www.vercel-status.com
2. **Check Supabase status** → https://www.supabase-status.com
3. **Check Stripe status** → https://www.stripe.com/status
4. **Roll back deployment** → Vercel → Deployments → Rollback
5. **Enable maintenance mode** → Add maintenance page

### Database Corruption
1. **Stop all writes** → Disable checkout temporarily
2. **Export current data** → Supabase → Settings → Backup
3. **Restore from backup** → Choose recent clean backup
4. **Verify data integrity** → Check orders and products
5. **Resume operations** → Re-enable checkout

### Security Breach
1. **Change all passwords** → Admin, Stripe, Supabase
2. **Regenerate secrets** → JWT, API keys, webhooks
3. **Review access logs** → Check for unauthorized access
4. **Enable 2FA** → Add two-factor authentication
5. **Contact support** → Report breach to providers

---

## Contact Support

### When to Contact Developer
- You've tried all troubleshooting steps
- Error messages you don't understand
- Features not working as documented
- Performance issues persisting

### Information to Provide
- **Exact error messages** (screenshots help)
- **Steps to reproduce** the issue
- **What you've tried** already
- **Urgency level** (store down vs minor issue)

### Emergency Contacts
- **Developer:** [Contact info]
- **Vercel Support:** https://vercel.com/support
- **Stripe Support:** https://stripe.com/support
- **Supabase Support:** https://supabase.com/support

---

## Prevention

### Regular Maintenance
- **Weekly:** Check orders, update inventory
- **Monthly:** Review analytics, check email deliverability
- **Quarterly:** Security audit, dependency updates
- **Yearly:** Domain renewal, SSL certificate check

### Monitoring Setup
- **Uptime monitoring** → UptimeRobot or Pingdom
- **Error tracking** → Sentry or Vercel Analytics
- **Performance monitoring** → Lighthouse CI
- **Backup verification** → Test restore procedures

### Documentation Updates
- **Keep this guide updated** with new issues
- **Document new procedures** as they're added
- **Share with team** any critical changes
- **Version control** for documentation

---

**Remember:** Most issues are caused by configuration problems, not code bugs. Always check environment variables and service status first.
