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
  const [justUpdatedKey, setJustUpdatedKey] = useState<string | null>(null);

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
    
    if (delta > 0) {
      setJustUpdatedKey(key);
      setTimeout(() => setJustUpdatedKey(null), 1200);
    }
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
            {/* Free Shipping Progress Bar */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-[#e1e3e5]">
              {subtotal >= 75 ? (
                <p className="text-center text-[#008060] font-semibold mb-2">🎉 You qualify for Free Shipping!</p>
              ) : (
                <p className="text-center text-gray-700 font-medium mb-2">
                  You're only <span className="font-bold text-gray-900">${(75 - subtotal).toFixed(2)}</span> away from Free Shipping!
                </p>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-[#008060] h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
                />
              </div>
            </div>

            {cart.map((item) => (
              <div key={item.key} className={`CartItem CartItem--panel ${justUpdatedKey === item.key ? 'superspec-just-added' : ''}`.trim()}>
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

            <div className="Cart__Summary Cart__Summary--panel flex flex-col">
              <p className="Heading mb-4">Subtotal: ${subtotal.toFixed(2)}</p>
              <Link href="/checkout" className="Button Button--primary w-full text-center">
                Proceed to checkout
              </Link>
              
              {/* Trust Badges */}
              <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Guaranteed Safe Checkout</p>
                <div className="flex space-x-3 items-center opacity-70">
                  <svg className="h-6 w-auto" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h32v20H0z" fill="#FFF"/>
                    <path d="M0 0h32v20H0z" fill="#FFF"/>
                    <path d="M12.986 10.366c.214-1.282.91-2.115 1.942-2.316.591-.115 1.144.024 1.554.394.462.417.653 1.05.539 1.776-.234 1.488-1.002 2.387-2.155 2.531-.6.074-1.127-.089-1.486-.46-.421-.433-.585-1.077-.394-1.925zm3.899-3.238c-1.393-.243-3.064-.093-4.545.412-.429.146-.685.556-.583.94l.013.048c.081.311.411.458.742.348 1.139-.38 2.378-.501 3.447-.315 2.148.376 3.013 2.015 2.518 5.17l-.801 5.111h2.89l.867-5.535c.704-4.492-1.386-5.874-4.548-6.179zm-5.69 5.385c-1.125 1.066-2.614 1.516-4.067 1.229-2.347-.464-3.52-2.39-2.92-6.216l.872-5.568h2.9l-.804 5.132c-.373 2.379.256 3.446 1.523 3.697.838.166 1.737-.091 2.457-.704.577-.492.935-1.18 1.057-2.01l.868-5.54H16.03l-1.018 6.495c-.171 1.092-.262 2.152-.284 3.125l-2.738-.54c.055-.66.195-1.428.397-2.274l-.454-.424zm9.351.487l.453-.396-1.018 6.495H16.94l1.378-8.795h2.723l-.128.818c1.371-1.071 3.023-1.442 4.543-1.141 2.35.464 3.52 2.39 2.921 6.215l-.872 5.568H24.61l.805-5.133c.372-2.379-.256-3.446-1.523-3.696-.838-.166-1.737.091-2.457.703-.578.492-.934 1.181-1.056 2.01l-.822 5.247-2.889-.57.869-5.541z" fill="#000" fillRule="nonzero"/>
                  </svg>
                  <svg className="h-6 w-auto" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h32v20H0z" fill="#FFF"/>
                    <path d="M0 0h32v20H0z" fill="#FFF"/>
                    <path d="M21.576 4.706c-1.396 0-2.302.722-2.32 1.758-.02.748.653 1.162 1.147 1.405.51.252.68.414.68.64 0 .34-.413.498-.795.498-.535 0-.82-.077-1.15-.228l-.161-.077-.183 1.155c.287.135.815.253 1.365.258 1.48 0 2.441-.732 2.463-1.865.011-.595-.36-.98-.1092-1.32-.472-.24-.764-.396-.764-.64 0-.21.237-.432.766-.432.428 0 .749.09 1.051.218l.128.06.177-1.111c-.267-.123-.746-.277-1.32-.277zm-9.356.027c-.36.002-.661.208-.813.535l-2.812 6.84h1.722s.282-.782.345-.963h2.102c.05.234.198.963.198.963h1.492l-2.072-7.375h-1.162zm.32 2.155c.071.24 1.096 4.673 1.096 4.673h-1.78l.684-4.673zM15.46 4.78h-1.353l-1.077 7.324h1.354L15.46 4.78zm-8.877 0l-1.066 5.006-.412-2.115c-.143-.49-.553-.872-1.055-.934L1.76 6.442l.024.113 2.923 5.549h1.42l2.128-7.324H6.583z" fill="#000" fillRule="nonzero"/>
                  </svg>
                  <span className="text-gray-500 font-bold ml-1">Stripe</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
