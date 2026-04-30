'use client';

import { useState, useRef } from 'react';
import { addToCart } from '@/components/store/cart';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

export function AddToCartButton({
  handle,
  variantId,
  className = '',
  label,
  title,
  price,
  image,
  variantTitle,
}: {
  handle: string;
  variantId?: string;
  className?: string;
  label?: string;
  title?: string;
  price?: number;
  image?: string;
  variantTitle?: string;
}) {
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.add('clicked');
      setTimeout(() => buttonRef.current?.classList.remove('clicked'), 350);
    }

    addToCart({ handle, variantId, quantity: 1, title, price, image, variantTitle });
    
    // Analytics
    if (title && price !== undefined) {
      trackEvent('add_to_cart', {
        currency: 'USD',
        value: price,
        items: [{
          item_id: variantId || handle,
          item_name: title,
          price: price,
          quantity: 1
        }]
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      ref={buttonRef}
      className={`Button Button--primary AddToCartButton--storefront ${className}`.trim()}
      type="button"
      onClick={handleClick}
    >
      {added ? 'Added ✓' : label ?? 'Add to cart'}
    </button>
  );
}
