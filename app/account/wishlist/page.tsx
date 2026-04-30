'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readWishlist, removeFromWishlist, WISHLIST_UPDATED_EVENT } from '@/components/store/wishlist';
import { addToCart } from '@/components/store/cart';
import { wishlistToggle } from '@/lib/toast';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

type WishlistProduct = { handle: string; title: string; price: number; image?: string };

export default function AccountWishlist() {
  const [handles, setHandles] = useState<string[]>([]);

  useEffect(() => {
    const load = () => setHandles(readWishlist());
    load();
    window.addEventListener(WISHLIST_UPDATED_EVENT, load);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, load);
  }, []);

  const handleRemove = (handle: string) => {
    removeFromWishlist(handle);
    wishlistToggle(false);
  };

  const handleAddToCart = (handle: string, title: string) => {
    addToCart({ handle, quantity: 1, title });
    toast.success(`${title} added to cart`);
  };

  return (
    <div>
      <h1 className="Heading u-h2" style={{ marginBottom: 24 }}>Wishlist</h1>

      {handles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed var(--border-color)', borderRadius: 8 }}>
          <Heart style={{ width: 36, height: 36, margin: '0 auto 16px', color: 'var(--text-light-color)' }} />
          <p className="Heading u-h5" style={{ marginBottom: 8 }}>No saved items yet</p>
          <p className="Text--subdued" style={{ marginBottom: 24, fontSize: 14 }}>Hit the heart icon on any product to save it here</p>
          <Link href="/" className="Button Button--primary">Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
          {handles.map(handle => (
            <div key={handle} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '1', background: 'var(--secondary-elements-background)', position: 'relative' }}>
                <Link href={`/products/${handle}`} style={{ display: 'block', width: '100%', height: '100%' }} />
                <button
                  onClick={() => handleRemove(handle)}
                  style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'white', border: '1px solid var(--border-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Remove from wishlist"
                >
                  <Heart style={{ width: 16, height: 16, fill: 'currentColor', color: '#ef4444' }} />
                </button>
              </div>
              <div style={{ padding: 16 }}>
                <Link href={`/products/${handle}`} className="Heading u-h6" style={{ display: 'block', marginBottom: 12 }}>
                  {handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
                <button
                  onClick={() => handleAddToCart(handle, handle.replace(/-/g, ' '))}
                  className="Button Button--secondary Button--full"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13 }}
                >
                  <ShoppingCart style={{ width: 15, height: 15 }} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
