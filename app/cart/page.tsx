'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { readCart, writeCart } from '@/components/store/cart';

type CartItemView = {
  handle: string;
  title: string;
  price: number;
  image?: string | null;
  quantity: number;
  variantId?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItemView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lines = readCart();
    Promise.all(
      lines.map(async (l) => {
        const res = await fetch(`/api/products/${encodeURIComponent(l.handle)}`);
        if (!res.ok) return null;
        const json = (await res.json()) as { product: { handle: string; title: string; images: string[]; variants: { id: string; price: number }[] } };
        const product = json.product;
        const variant = l.variantId ? product.variants.find((v) => v.id === l.variantId) : product.variants[0];
        return {
          handle: product.handle,
          title: product.title,
          price: variant?.price ?? 0,
          image: product.images?.[0] ?? null,
          quantity: l.quantity,
          variantId: l.variantId,
        } satisfies CartItemView;
      }),
    ).then((items) => {
      setCart(items.filter(Boolean) as CartItemView[]);
      setLoading(false);
    });
  }, []);

  const updateQuantity = (handle: string, delta: number) => {
    const updated = cart.map((item) => {
      if (item.handle === handle) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCart(updated);
    writeCart(updated.map((u) => ({ handle: u.handle, variantId: u.variantId, quantity: u.quantity })));
  };

  const removeItem = (handle: string) => {
    const updated = cart.filter((item) => item.handle !== handle);
    setCart(updated);
    writeCart(updated.map((u) => ({ handle: u.handle, variantId: u.variantId, quantity: u.quantity })));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="Cart">
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">Cart</h1>
        </header>

        {cart.length === 0 ? (
          <div className="EmptyState">
            <p className="EmptyState__Description Heading Text--subdued">Your cart is empty</p>
            <Link href="/products" className="Button Button--primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="Cart__Content">
            {cart.map((item) => (
              <div key={item.handle} className="CartItem">
                <div className="CartItem__ImageWrapper">
                  {item.image ? <img className="CartItem__Image" src={item.image} alt={item.title} /> : null}
                </div>

                <div className="CartItem__Info">
                  <p className="CartItem__Title Heading">
                    <Link href={`/products/${item.handle}`}>{item.title}</Link>
                  </p>
                  <p className="CartItem__Price Heading Text--subdued">${item.price.toFixed(2)}</p>
                </div>

                <div className="CartItem__QuantitySelector">
                  <button className="QuantitySelector__Button Link Link--secondary" onClick={() => updateQuantity(item.handle, -1)} disabled={item.quantity <= 1}>
                    -
                  </button>
                  <input className="QuantitySelector__CurrentQuantity" value={item.quantity} readOnly />
                  <button className="QuantitySelector__Button Link Link--secondary" onClick={() => updateQuantity(item.handle, 1)}>
                    +
                  </button>
                </div>

                <div className="CartItem__Total">
                  <span className="Heading">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="Link Link--secondary" onClick={() => removeItem(item.handle)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="Cart__Summary">
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