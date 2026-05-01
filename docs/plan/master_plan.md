# Master Plan: The Exact Replica

## Phase 1: Foundation & Visibility (COMPLETED - 100%)
*   [x] **Fix Text Visibility:** Updated `globals.css` and `ProductCatalogClient.tsx`. Filter/Sort text is now Gold (`#c3922e`) on dark backgrounds.
*   [x] **Fix Layout Overlap:** Refactored `CollectionToolbar` with flexbox and removed conflicting inline styles. Added mobile responsiveness.
*   [x] **Font Integration:** `Exo 2` variable font is now applied globally to all body text and headings via `app/layout.tsx` and `app/globals.css`.
*   [x] **Favicon:** Pointed favicon links to `/assets/Super_Star.png` and updated `theme-color` meta tag.

## Phase 2: Product & Homepage Refinement (COMPLETED - 100%)
*   [x] **Homepage Panels:** Re-centered and re-sized images in `globals.css` using `object-fit: contain` for `.CollectionItem__Image`. This prevents images from being cut off.
*   [x] **Product Descriptions:** Added product description rendering to `components/shopify/sections/ProductItem.tsx` with a 2-line clamp for clean catalog viewing.
*   [x] **Pricing Backgrounds:** Standardized `.ProductItem__Info` and added `.PriceBackground` with semi-transparent dark backgrounds for consistent readability on all screens.

## Phase 3: Functionality & Flow
*   [ ] **Guest Checkout Only:** Remove all account/login references. Ensure orders work perfectly with just an email.
*   [ ] **Coupon Popup:** Add a functional "Close" (X) button to the exit-intent popup.
*   [ ] **Shipping Integration:** Implement shipping calculation logic in the checkout flow.
*   [ ] **Tracking Emails:** Set up Resend templates for order confirmations with generated tracking placeholders.

## Phase 4: Build & Quality Control
*   [ ] **Lint & Type Check:** Run exhaustive `tsc` and `eslint` checks.
*   [ ] **Verbose Build:** Use verbose logging during build to catch silent failures.
*   [ ] **Shopify Replica Check:** Side-by-side comparison with the Shopify theme export.

---

## Checklist for User Review
- [ ] Review Documentation (this file and siblings).
- [ ] Verify if Shipping Rates should be Flat Rate or Calculated (e.g., via a carrier).
- [ ] Confirm if any specific font-weight for Exo 2 is preferred for headings.
- [ ] Provide any specific coupon logic/codes to be pre-integrated.
