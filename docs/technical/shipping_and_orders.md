# Shipping and Order Management Strategy

## 1. Shipping Calculation
*   **Approach:** Stripe Shipping Rates.
*   **Configuration:**
    *   **Standard Shipping:** $5.99 (or Free over $100).
    *   **Express Shipping:** $14.99.
    *   **International:** $19.99.
*   **Implementation:** These rates will be fetched/applied during the Stripe Checkout session or PaymentElement initialization.

## 2. Order Fulfillment (Shopify-Style)
*   **Step 1:** Order placed → Status: `unfulfilled`.
*   **Step 2:** Admin (you) views order in `/admin/orders`.
*   **Step 3:** Admin clicks "Fulfill" → Enters Tracking Number + Carrier (UPS/USPS/FedEx).
*   **Step 4:** System updates Supabase `orders` table and triggers a Resend email to the customer.

## 3. Automated Emails
*   **Order Confirmation:** Sent immediately. Includes item summary, total, and "Thank you".
*   **Shipping Update:** Sent when fulfilled. Includes clickable tracking link.

## 4. Necessary Accounts
*   **Resend:** For sending emails.
*   **Stripe:** For payments and shipping rate management.
*   **Carrier Account (Optional):** If you want to print labels directly, you may need ShipStation or Pirate Ship, but for now, we can handle manual entry of tracking numbers like a standard POS.
