'use client';

import { useEffect, useState } from 'react';
import { CART_UPDATED_EVENT, readCart, writeCart, CartLine } from '@/components/store/cart';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/shopify/icons/Icon';

export default function CartPage() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setMounted(true);
    const onUpdate = () => setCart(readCart());
    window.addEventListener(CART_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, onUpdate);
  }, []);

  const updateQuantity = (handle: string, variantId: string | undefined, delta: number) => {
    const newCart = [...cart];
    const idx = newCart.findIndex(l => l.handle === handle && l.variantId === variantId);
    if (idx >= 0) {
      newCart[idx].quantity += delta;
      if (newCart[idx].quantity <= 0) {
        newCart.splice(idx, 1);
        toast('Item removed from cart');
      }
      writeCart(newCart);
    }
  };

  const removeItem = (handle: string, variantId: string | undefined) => {
    const newCart = cart.filter(l => !(l.handle === handle && l.variantId === variantId));
    writeCart(newCart);
    toast('Item removed from cart');
  };

  if (!mounted) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="Container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <header className="PageHeader">
        <h1 className="PageHeader__Title Heading u-h1">Your Cart</h1>
      </header>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Icon icon="cart" />
          <p className="Heading u-h4" style={{ marginTop: 20 }}>Your cart is empty</p>
          <Link href="/" className="Button Button--primary" style={{ marginTop: 30 }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginTop: 40 }}>
          <div style={{ flex: '1 1 600px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              {cart.map((item) => (
                <div key={`${item.handle}-${item.variantId}`} style={{ display: 'flex', gap: 20, paddingBottom: 30, borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: 120, height: 120, background: '#f5f5f5', position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
                    {item.image ? (
                      <Image src={item.image.replace('shopify://shop_images/', '/assets/')} alt={item.title || 'Product'} fill style={{ objectFit: 'contain' }} />
                    ) : null}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link href={`/products/${item.handle}`} className="Heading u-h5" style={{ margin: 0 }}>{item.title}</Link>
                      <button onClick={() => removeItem(item.handle, item.variantId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light-color)' }}>✕</button>
                    </div>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <span className="Text--subdued" style={{ fontSize: 14, marginTop: 4 }}>{item.variantTitle}</span>
                    )}
                    <span className="Price" style={{ marginTop: 8 }}>${(item.price || 0).toFixed(2)}</span>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', border: '1px solid var(--border-color)', borderRadius: 4, width: 'fit-content' }}>
                      <button onClick={() => updateQuantity(item.handle, item.variantId, -1)} style={{ padding: '8px 12px', background: 'none', border: 'none' }}>-</button>
                      <span style={{ padding: '0 12px', fontSize: 14 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.handle, item.variantId, 1)} style={{ padding: '8px 12px', background: 'none', border: 'none' }}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 300px', maxWidth: 400 }}>
            <div style={{ background: 'var(--secondary-elements-background)', padding: 30, borderRadius: 8 }}>
              <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                <span className="Text--subdued">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="Text--subdued" style={{ fontSize: 13, marginBottom: 20 }}>Shipping and taxes calculated at checkout.</p>
              <Link href="/checkout" className="Button Button--primary Button--full">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
