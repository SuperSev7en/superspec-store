'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/shopify/icons/Icon';
import { addToWishlist, removeFromWishlist, readWishlist } from '@/components/store/wishlist';

export function WishlistButton({ productHandle }: { productHandle: string }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const items = readWishlist();
      setInWishlist(items.includes(productHandle));
    };
    checkWishlist();
    window.addEventListener('superspec:wishlist-updated', checkWishlist);
    return () => window.removeEventListener('superspec:wishlist-updated', checkWishlist);
  }, [productHandle]);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(productHandle);
      toast('Removed from wishlist');
    } else {
      addToWishlist(productHandle);
      toast.success('Added to wishlist');
    }
  };

  return (
    <button 
      type="button"
      onClick={toggleWishlist}
      className={`Button Button--icon ${inWishlist ? 'is-active' : ''}`}
      aria-label="Toggle wishlist"
      style={{ padding: '8px 12px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 4 }}
    >
      <Icon icon="heart" />
    </button>
  );
}
