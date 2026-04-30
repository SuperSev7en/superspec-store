'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/components/store/cart';
import { toast } from 'sonner';

type OrderItem = { title: string; variantTitle?: string; price: number; quantity: number; image?: string; handle: string };
type OrderDetail = {
  order_number: string; status: string; created_at: string; total: number;
  items: OrderItem[]; shipping_address?: any; tracking_number?: string; carrier?: string;
};

const STATUS_COLORS: Record<string, string> = {
  paid: '#16a34a', pending: '#ca8a04', processing: '#2563eb',
  shipped: '#7c3aed', delivered: '#16a34a', cancelled: '#dc2626', refunded: '#6b7280',
};

const TIMELINE_STEPS = ['placed', 'confirmed', 'shipped', 'delivered'];

export default function OrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params);
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    // Mock — replace with real DB fetch by orderNumber
    setOrder({
      order_number: orderNumber,
      status: 'shipped',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      total: 145.00,
      tracking_number: '1Z999AA10123456784',
      carrier: 'UPS',
      shipping_address: { name: 'Jane Doe', line1: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
      items: [
        { title: 'SUPER Spec Logo Tee', variantTitle: 'Black / L', price: 85, quantity: 1, handle: 'logo-tee' },
        { title: 'Spectrum Print 001', variantTitle: '18×24"', price: 60, quantity: 1, handle: 'spectrum-print-001' },
      ],
    });
  }, [orderNumber]);

  const handleReorder = () => {
    order?.items.forEach(item => {
      addToCart({ handle: item.handle, quantity: item.quantity, title: item.title, price: item.price, variantTitle: item.variantTitle });
    });
    toast.success('Items added back to cart');
  };

  if (!order) return null;

  const timelineIdx = TIMELINE_STEPS.indexOf(order.status === 'paid' ? 'confirmed' : order.status);

  return (
    <div>
      <Link href="/account/orders" className="Link Link--underline Text--subdued" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, marginBottom: 24 }}>
        <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="Heading u-h2" style={{ marginBottom: 6 }}>Order #{order.order_number}</h1>
          <p className="Text--subdued" style={{ fontSize: 14 }}>Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ padding: '5px 14px', borderRadius: 20, background: (STATUS_COLORS[order.status] || '#6b7280') + '20', color: STATUS_COLORS[order.status] || '#6b7280', fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{order.status}</span>
          <button onClick={handleReorder} className="Button Button--secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            <ShoppingCart style={{ width: 16, height: 16 }} /> Reorder
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
          {TIMELINE_STEPS.map((step, i) => {
            const done = i <= timelineIdx;
            return (
              <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {i < TIMELINE_STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: 11, left: '50%', width: '100%', height: 2, background: done && i < timelineIdx ? 'var(--text-color)' : 'var(--border-color)' }} />
                )}
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: done ? 'var(--text-color)' : 'var(--border-color)', color: done ? 'var(--background)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, marginBottom: 8 }}>
                  {done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <span style={{ fontSize: 12, textTransform: 'capitalize', color: done ? 'var(--text-color)' : 'var(--text-light-color)', fontWeight: done ? 600 : 400 }}>{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Items */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="Heading u-h5" style={{ marginBottom: 16 }}>Items</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: 16, border: '1px solid var(--border-color)', borderRadius: 6 }}>
                <div style={{ width: 72, height: 72, background: 'var(--secondary-elements-background)', borderRadius: 4 }} />
                <div style={{ flex: 1 }}>
                  <Link href={`/products/${item.handle}`} className="Heading u-h6" style={{ marginBottom: 4, display: 'block' }}>{item.title}</Link>
                  {item.variantTitle && <div className="Text--subdued" style={{ fontSize: 13, marginBottom: 4 }}>{item.variantTitle}</div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="Text--subdued" style={{ fontSize: 13 }}>Qty: {item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div style={{ flex: '0 1 280px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {order.shipping_address && (
            <div>
              <h3 className="Heading u-h6" style={{ marginBottom: 10 }}>Shipping Address</h3>
              <div className="Text--subdued" style={{ fontSize: 14, lineHeight: 1.7 }}>
                {order.shipping_address.name}<br />
                {order.shipping_address.line1}<br />
                {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
              </div>
            </div>
          )}
          {order.tracking_number && (
            <div>
              <h3 className="Heading u-h6" style={{ marginBottom: 10 }}>Tracking</h3>
              <p className="Text--subdued" style={{ fontSize: 14 }}>{order.carrier}: {' '}
                <a href={`https://www.google.com/search?q=${order.carrier}+tracking+${order.tracking_number}`} target="_blank" rel="noopener noreferrer" className="Link Link--underline">{order.tracking_number}</a>
              </p>
            </div>
          )}
          <div>
            <h3 className="Heading u-h6" style={{ marginBottom: 10 }}>Order Total</h3>
            <div style={{ fontSize: 22, fontWeight: 700 }}>${order.total.toFixed(2)}</div>
          </div>
          <Link href="/contact" className="Link Link--underline Text--subdued" style={{ fontSize: 14 }}>Need help with this order?</Link>
        </div>
      </div>
    </div>
  );
}
