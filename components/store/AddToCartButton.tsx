'use client';

import { useState, useRef } from 'react';
import { addToCart } from '@/components/store/cart';

export function AddToCartButton({
  handle,
  variantId,
  className = '',
  label,
}: {
  handle: string;
  variantId?: string;
  className?: string;
  label?: string;
}) {
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    // Trigger click animation
    if (buttonRef.current) {
      buttonRef.current.classList.add('clicked');
      setTimeout(() => buttonRef.current?.classList.remove('clicked'), 350);
    }

    addToCart({ handle, variantId, quantity: 1 });
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
