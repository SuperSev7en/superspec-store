# SUPER Spec. — Admin Portal Complete Guide

> Step-by-step guide to running your store from the admin dashboard.

---

## Table of Contents
1. [Accessing the Admin Portal](#accessing-the-admin-portal)
2. [Dashboard Overview](#dashboard-overview)
3. [Order Management](#order-management)
4. [Product Management](#product-management)
5. [Customer Management](#customer-management)
6. [Analytics & Reports](#analytics--reports)
7. [Settings & Configuration](#settings--configuration)

---

## Accessing the Admin Portal

### URL and Login
- **Admin URL:** `https://superspec.studio/admin`
- **Login:** Use your admin email and password
- **First Time:** Create admin account through `/register` then contact developer to upgrade to admin role

### Navigation Structure
```
Dashboard (main)
├── Orders (view/manage orders)
├── Products (manage catalog)
├── Customers (view customer accounts)
├── Analytics (sales reports)
├── Settings (store configuration)
└── Audit Log (admin actions)
```

---

## Dashboard Overview

### Key Metrics
- **Today's Revenue:** Sales from the last 24 hours
- **Order Count:** Total orders in selected period
- **Conversion Rate:** Checkout completion percentage
- **Top Products:** Best-selling items

### Quick Actions
- **View New Orders:** Direct link to pending orders
- **Add Product:** Quick product creation
- **View Analytics:** Detailed sales reports
- **Settings:** Store configuration

---

## Order Management

### Viewing Orders

#### Orders List
1. Go to **Admin → Orders**
2. **Filter by status:**
   - `paid` - New orders awaiting processing
   - `processing` - Orders being prepared
   - `fulfilled` - Shipped orders
   - `cancelled` - Cancelled orders
3. **Search:** By order number or customer email
4. **Sort:** By date (newest/oldest) or total amount

#### Order Details
Click any order to see:
- **Customer Information:** Name, email, shipping address
- **Order Items:** Products, quantities, prices
- **Payment Details:** Amount, payment method, Stripe ID
- **Timeline:** Order status history
- **Tracking:** Shipping information (if fulfilled)

### Processing Orders

#### Step 1: Mark as Processing
1. **Select order** from the list
2. **Click "Mark Processing"** button
3. **Status changes** to "processing"
4. **Customer notified** (optional email)

#### Step 2: Package Items
1. **Print packing slip** using the printer icon
2. **Gather items** from your inventory
3. **Package securely** with appropriate materials
4. **Weigh package** for shipping calculation

#### Step 3: Ship Order
1. **Click "Mark Shipped"** button
2. **Enter carrier:** USPS, UPS, FedEx, etc.
3. **Enter tracking number** from shipping label
4. **Click "Confirm Shipment"**
5. **Customer automatically receives** shipping notification email

### Order Status Flow
```
Customer Pays → "paid" → You Process → "processing" → 
You Ship → "fulfilled" → Customer Receives → "delivered"
```

### Refunds and Cancellations

#### Issue Refund
1. **Click "Refund"** on order details
2. **Enter amount** (or click "Full refund")
3. **Confirm refund** → Processed through Stripe
4. **Customer automatically refunded** (5-10 business days)

#### Cancel Order
1. **Click "Cancel"** on order details
2. **Confirm cancellation** → Order marked as cancelled
3. **Refund processed** automatically if paid
4. **Customer notified** of cancellation

---

## Product Management

### Viewing Products
1. Go to **Admin → Products**
2. **View all products** with current inventory
3. **Search** by product name or SKU
4. **Filter** by category or availability

### Adding New Products

#### Basic Information
1. **Click "New Product"** button
2. **Enter product details:**
   - **Title:** Product name (e.g., "SUPER Spec. Pro Frame")
   - **Description:** Detailed product description
   - **Price:** Selling price in USD
   - **Category:** Product category (clothing, engineered, etc.)

#### Product Images
1. **Upload images:** Click "Add Images"
2. **Recommended specs:**
   - **Size:** 1000x1000px minimum
   - **Format:** JPG, PNG, or WebP
   - **Quality:** High resolution, clear background
3. **Arrange order:** Drag to reorder images
4. **Main image:** First image is the primary product photo

#### Product Variants
1. **Add variants** if product has options (size, color):
   - **Variant Title:** "Large", "Black", etc.
   - **SKU:** Unique identifier
   - **Price:** Can vary by variant
   - **Inventory:** Stock count per variant
   - **Weight:** For shipping calculations

#### Inventory Management
1. **Set initial stock** for each variant
2. **Track inventory:** Automatically decrements on orders
3. **Low stock alerts:** When inventory ≤ 5 items
4. **Out of stock:** Product shows as unavailable

### Editing Products
1. **Click product** from the products list
2. **Edit any field:** Price, description, images, variants
3. **Update inventory:** Adjust stock counts
4. **Save changes:** Click "Update Product"

### Bulk Operations
1. **Import products:** Upload CSV file with product data
2. **Export products:** Download current catalog as CSV
3. **Bulk edit:** Update multiple products at once
4. **Delete products:** Remove from catalog (with confirmation)

---

## Customer Management

### Viewing Customers
1. Go to **Admin → Customers**
2. **See all registered customers**
3. **View customer details:**
   - **Contact information:** Email, name
   - **Order history:** All past orders
   - **Total spent:** Lifetime value
   - **Account status:** Active/inactive

### Customer Orders
1. **Click customer** to view their profile
2. **See order history:** All past and current orders
3. **Contact customer:** Email link (opens default email client)
4. **View addresses:** Saved shipping addresses

### Customer Support
1. **Look up customer** by email or name
2. **Review order history** for context
3. **Access order details** for specific issues
4. **Process refunds** or reshipments as needed

---

## Analytics & Reports

### Dashboard Analytics
1. **Revenue Overview:** Total sales by period
2. **Order Volume:** Number of orders over time
3. **Top Products:** Best-selling items by quantity/revenue
4. **Customer Metrics:** New customers, repeat purchases

### Detailed Reports
1. **Sales Report:**
   - **Date range:** Custom period selection
   - **Revenue breakdown:** By product, category
   - **Growth trends:** Month-over-month comparison
   - **Export data:** Download as CSV/Excel

2. **Product Performance:**
   - **Best sellers:** Top 10 products
   - **Low performers:** Products with no sales
   - **Inventory analysis:** Stock vs. sales ratio
   - **Category breakdown:** Sales by product type

3. **Customer Analytics:**
   - **Acquisition:** New customers over time
   - **Retention:** Repeat purchase rate
   - **Lifetime value:** Average customer value
   - **Geographic:** Sales by location

### Understanding Metrics
- **Conversion Rate:** Percentage of visitors who purchase
- **Average Order Value (AOV):** Average amount spent per order
- **Customer Lifetime Value (CLV):** Total revenue per customer
- **Cart Abandonment:** Percentage of carts not completed

---

## Settings & Configuration

### Store Information
1. **Go to Admin → Settings**
2. **Basic Information:**
   - **Store Name:** "SUPER Spec."
   - **Contact Email:** Customer support email
   - **Phone Number:** Customer service phone
   - **Store Address:** Your business address

### Shipping Configuration
1. **Shipping Methods:** Set up available options
2. **Shipping Rates:** Configure pricing
3. **Free Shipping Threshold:** Set minimum order amount
4. **Processing Time:** Average order preparation time

### Payment Settings
1. **Stripe Integration:** Already configured
2. **Accepted Cards:** Visa, Mastercard, Amex, Discover
3. **Express Checkout:** Apple Pay, Google Pay enabled
4. **Currency:** USD (can be changed for future markets)

### Email Configuration
1. **From Address:** `orders@superspec.studio`
2. **Email Templates:** Branded order confirmations
3. **Notification Settings:** Which emails to send
4. **Test Emails:** Send test confirmations

### Tax Settings
1. **Sales Tax:** Configure based on your location
2. **Tax-Inclusive Prices:** Show prices with/without tax
3. **Tax Reporting:** Automatic tax calculation

---

## Daily Operations Guide

### Morning Routine
1. **Check new orders:** Process any overnight orders
2. **Review inventory:** Update stock levels if needed
3. **Respond to customers:** Handle any customer inquiries
4. **Check analytics:** Review yesterday's performance

### Order Processing Workflow
1. **Receive order notification** (email/dashboard)
2. **Verify payment** (automatic via Stripe)
3. **Check inventory** for all items
4. **Package order** securely
5. **Purchase shipping label** (see shipping guide)
6. **Enter tracking** in admin panel
7. **Mark order shipped** (automatically notifies customer)

### Weekly Tasks
1. **Inventory audit:** Count physical inventory
2. **Sales review:** Analyze weekly performance
3. **Customer follow-up:** Address any issues
4. **Product updates:** Add new items or update descriptions

### Monthly Tasks
1. **Financial review:** Reconcile payments with Stripe
2. **Inventory planning:** Order new stock if needed
3. **Marketing review:** Plan promotions or sales
4. **Performance analysis:** Review monthly metrics

---

## Troubleshooting Common Issues

### Order Not Showing Up
- **Check Stripe:** Payment may still be processing
- **Webhook Issues:** May need manual order creation
- **Check Email:** Look for payment confirmation

### Customer Can't Pay
- **Stripe Status:** Check Stripe service status
- **Browser Issues:** Ask customer to try different browser
- **Card Declined:** Customer needs to contact bank

### Shipping Label Problems
- **Address Verification:** Confirm address is correct
- **Weight Issues:** Re-weigh package if needed
- **Carrier Restrictions:** Check if carrier ships to address

### Inventory Mismatch
- **Manual Adjustment:** Update inventory counts
- **Sync Issues:** Refresh product page
- **Bulk Updates:** Use CSV import for large changes

---

## Security Best Practices

### Admin Security
1. **Strong Password:** Use unique, complex password
2. **Two-Factor Auth:** Enable if available
3. **Regular Logout:** Sign out when done
4. **Secure Network:** Use trusted internet connection

### Data Protection
1. **Customer Privacy:** Never share customer information
2. **Secure Storage:** Don't write down passwords
3. **Regular Backups:** Data is automatically backed up
4. **Access Control:** Only authorized admin access

---

## Getting Help

### Common Questions
- **"Where do I find tracking numbers?"** → From your shipping carrier
- **"How do I handle returns?"** → Process refunds through admin panel
- **"Why isn't an order showing?"** → Check Stripe payment status
- **"How do I update product prices?"** → Edit product in admin panel

### Support Resources
- **Documentation:** Check these guides first
- **Troubleshooting Guide:** See TROUBLESHOOTING.md
- **Developer Contact:** For technical issues
- **Stripe Support:** For payment-related problems

### Emergency Procedures
- **Site Down:** Check Vercel status, contact developer
- **Payment Issues:** Check Stripe dashboard
- **Database Issues:** Contact developer immediately
- **Security Concerns:** Change passwords, notify developer

---

This guide covers everything you need to run your SUPER Spec. store efficiently. The admin portal is designed to be intuitive, but don't hesitate to refer back to this documentation as needed.
