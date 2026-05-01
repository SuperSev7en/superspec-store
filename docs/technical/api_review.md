# Technical Review: APIs and Integrations

## 1. Stripe (Payment and Checkout)
*   **Domain ID:** `pmd_1TSD6nAzeNVyZRkgQE5pfrpi` (Payment Method Domain).
*   **Usage:** Used for Apple Pay / Google Pay verification on the `superspec.studio` domain.
*   **Official Documentation Reference:** [Stripe Payment Element](https://stripe.com/docs/payments/payment-element), [Apple Pay Domain Verification](https://stripe.com/docs/apple-pay?platform=web).
*   **Review Status:** 
    *   Checkout is currently "guest-only" as requested.
    *   Needs verification that shipping costs are calculated before the final PaymentIntent is created.

## 2. Supabase (Database and Auth)
*   **Usage:** Stores product catalog, orders, and site settings.
*   **Auth:** Current setup includes auth, but user requested **No Account Sign-in**.
*   **Plan:** Remove login/register links from the header and checkout. Use email-based order lookup instead of a profile dashboard.

## 3. Resend / Transactional Email
*   **Usage:** Sending order confirmations and tracking updates.
*   **Official Documentation Reference:** [Resend Node.js SDK](https://resend.com/docs/api-reference/introduction).
*   **Requirements:**
    *   Automated email on order placement.
    *   Tracking number generation/integration (Shopify-style).

## 4. Shipping and Logistics
*   **Requirement:** Shipping must be calculated in prices or added at checkout.
*   **Official Documentation Reference:** [Stripe Shipping Rates](https://stripe.com/docs/api/shipping_rates).
*   **Plan:**
    *   Set up static shipping rates in Stripe (Standard, Express).
    *   Pass `shipping_options` to the Stripe Checkout or Payment Element.
    *   Calculate shipping based on weight/price if needed, or use flat rates (Shopify standard).
