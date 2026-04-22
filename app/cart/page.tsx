'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { readCart, writeCart, type CartLine } from '@/components/store/cart';

function lineKey(line: Pick<CartLine, 'handle' | 'variantId'>) {
  return `${line.handle}::${line.variantId ?? ''}`;
}

type CartItemView = {
  key: string;
  handle: string;
  title: string;
  price: number;
  image?: string | null;
  quantity: number;
  variantId?: string;
  variantTitle?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItemView[]>([]);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async () => {
    const lines = readCart();
    const rows = await Promise.all(
      lines.map(async (l) => {
        const res = await fetch(`/api/products/${encodeURIComponent(l.handle)}`);
        if (!res.ok) return null;
        const json = (await res.json()) as {
          product: {
            handle: string;
            title: string;
            images: string[];
            variants: { id: string; title: string; price: number }[];
          };
        };
        const product = json.product;
        const variant = l.variantId ? product.variants.find((v) => v.id === l.variantId) : product.variants[0];
        return {
          key: lineKey(l),
          handle: product.handle,
          title: product.title,
          price: variant?.price ?? 0,
          image: product.images?.[0] ?? null,
          quantity: l.quantity,
          variantId: l.variantId,
          variantTitle: variant?.title,
        } satisfies CartItemView;
      }),
    );
    setCart(rows.filter(Boolean) as CartItemView[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const persistLines = (views: CartItemView[]) => {
    writeCart(
      views.map((u) => ({
        handle: u.handle,
        variantId: u.variantId,
        quantity: u.quantity,
      })),
    );
  };

  const updateQuantity = (key: string, delta: number) => {
    const updated = cart.map((item) => {
      if (item.key !== key) return item;
      return { ...item, quantity: Math.max(1, item.quantity + delta) };
    });
    setCart(updated);
    persistLines(updated);
  };

  const removeItem = (key: string) => {
    const updated = cart.filter((item) => item.key !== key);
    setCart(updated);
    persistLines(updated);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="Cart Cart--opaqueShell min-h-screen flex items-center justify-center">
        <div className="Cart__LoadingPanel">
          <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="Cart Cart--opaqueShell">
      <div className="Container">
        <header className="PageHeader Cart__PageHeaderPanel">
          <h1 className="PageHeader__Title Heading u-h1">Cart</h1>
        </header>

        {cart.length === 0 ? (
          <div className="EmptyState Cart__EmptyPanel">
            <p className="EmptyState__Description Heading Text--subdued">Your cart is empty</p>
            <Link href="/products" className="Button Button--primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="Cart__Content">
            {cart.map((item) => (
              <div key={item.key} className="CartItem CartItem--panel">
                <Link href={`/products/${item.handle}`} className="CartItem__ImageWrapper" aria-label={`View ${item.title}`}>
                  {item.image ? <img className="CartItem__Image" src={item.image} alt="" /> : null}
                </Link>

                <div className="CartItem__Info">
                  <p className="CartItem__Title Heading">
                    <Link href={`/products/${item.handle}`} className="Link Link--primary">
                      {item.title}
                    </Link>
                  </p>
                  {item.variantTitle ? (
                    <p className="Text--subdued" style={{ marginTop: 4, fontSize: 14 }}>
                      {item.variantTitle}
                    </p>
                  ) : null}
                  <p className="CartItem__Price Heading Text--subdued">${item.price.toFixed(2)}</p>
                </div>

                <div className="CartItem__QuantitySelector">
                  <button
                    className="QuantitySelector__Button Link Link--secondary"
                    type="button"
                    onClick={() => updateQuantity(item.key, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input className="QuantitySelector__CurrentQuantity" value={item.quantity} readOnly aria-label="Quantity" />
                  <button className="QuantitySelector__Button Link Link--secondary" type="button" onClick={() => updateQuantity(item.key, 1)}>
                    +
                  </button>
                </div>

                <div className="CartItem__Total">
                  <span className="Heading">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="Link Link--secondary" type="button" onClick={() => removeItem(item.key)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="Cart__Summary Cart__Summary--panel">
              <p className="Heading">Subtotal: ${subtotal.toFixed(2)}</p>
              <Link href="/checkout" className="Button Button--primary">
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
