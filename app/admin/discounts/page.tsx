import { requireAdmin } from '@/lib/auth/requireAdmin';

export default async function AdminDiscountsPage() {
  await requireAdmin('/admin/discounts');

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Discounts</h1>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
        <p className="font-medium">Not configured in the database yet</p>
        <p className="mt-2 text-amber-900">
          Coupon codes are not stored in this app today. You can create percentage or fixed discounts in the{' '}
          <a
            className="font-medium underline"
            href="https://dashboard.stripe.com/coupons"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe Dashboard
          </a>{' '}
          and apply them at checkout when you add promotion-code support to the cart.
        </p>
        <p className="mt-3 text-amber-900">
          If you want discount codes inside this admin (like Shopify), the next step is a small `discounts` table plus
          validation in the checkout session API.
        </p>
      </div>
    </div>
  );
}
