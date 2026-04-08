'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readCart } from '@/components/store/cart';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If cart empty, avoid dead-end.
    if (readCart().length === 0) setError('Your cart is empty.');
  }, []);

  return (
    <div className="Container">
      <header className="PageHeader">
        <h1 className="PageHeader__Title Heading u-h1">Checkout</h1>
      </header>

      {error ? (
        <div className="Alert Alert--error">
          <p className="Heading">{error}</p>
          <p>
            <Link className="Link Link--primary" href="/products">
              Browse products
            </Link>
          </p>
        </div>
      ) : null}

      <div className="Section">
        <button
          className="Button Button--primary"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              const res = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ lines: readCart() }),
              });
              const json = (await res.json()) as { url?: string; error?: string };
              if (!res.ok) throw new Error(json.error ?? 'Checkout failed');
              if (!json.url) throw new Error('Missing Stripe session URL');
              window.location.href = json.url;
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Checkout failed');
              setLoading(false);
            }
          }}
        >
          {loading ? 'Redirecting…' : 'Pay with Stripe'}
        </button>

        <p className="Text--subdued" style={{ marginTop: 12 }}>
          <Link href="/cart" className="Link Link--secondary">
            Back to cart
          </Link>
        </p>
      </div>
    </div>
  );
}