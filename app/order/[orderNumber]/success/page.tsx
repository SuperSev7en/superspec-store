'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { readCart, writeCart, CartLine } from '@/components/store/cart';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderSuccessPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    params.then(p => setOrderNumber(p.orderNumber));
    
    // Read cart to get items for display, then clear it
    const items = readCart();
    setCart(items);
    setMounted(true);
    
    if (items.length > 0) {
      const value = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
      trackEvent('purchase', {
        transaction_id: orderNumber,
        currency: 'USD',
        value,
        items: items.map(item => ({
          item_id: item.variantId || item.handle,
          item_name: item.title,
          price: item.price,
          quantity: item.quantity
        }))
      });
      
      // Clear cart
      writeCart([]);
    }
  }, [params, orderNumber]);

  if (!mounted) return null;

  // Delivery estimate
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="Container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', color: '#10b981', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h1 className="Heading u-h2">Thank you for your order!</h1>
        <p className="Text--subdued" style={{ fontSize: 16, marginTop: 10 }}>Order #{orderNumber || 'PENDING'}</p>
        <p className="Text--subdued" style={{ marginTop: 5 }}>Check your email for confirmation.</p>
      </div>

      <div style={{ background: 'var(--secondary-elements-background)', padding: 30, borderRadius: 8, marginBottom: 40 }}>
        <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>Order Summary</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
              <div style={{ width: 80, height: 80, background: '#fff', position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
                {item.image && <Image src={item.image.replace('shopify://shop_images/', '/assets/')} alt={item.title || ''} fill style={{ objectFit: 'contain' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <p className="Heading u-h6" style={{ margin: 0 }}>{item.title}</p>
                {item.variantTitle && <p className="Text--subdued" style={{ fontSize: 13, margin: '4px 0 0' }}>{item.variantTitle}</p>}
                <p className="Text--subdued" style={{ fontSize: 13, margin: '4px 0 0' }}>Qty: {item.quantity}</p>
              </div>
              <span className="Price">${((item.price || 0) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 50 }}>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 className="Heading u-h5" style={{ marginBottom: 15 }}>Shipping to</h3>
          <p className="Text--subdued" style={{ lineHeight: 1.6 }}>
            <strong>Estimated Delivery:</strong><br/>
            {deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 className="Heading u-h5" style={{ marginBottom: 15 }}>Share your purchase</h3>
          <p className="Text--subdued" style={{ marginBottom: 15 }}>Show off your new piece and tag us @superspec.store</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="Button Button--secondary Button--small">Twitter</button>
            <button className="Button Button--secondary Button--small">Instagram</button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/collections/all" className="Button Button--primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
