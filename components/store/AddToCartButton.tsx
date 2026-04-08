'use client';

import { useState } from 'react';
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

  return (
    <button
      className={`Button Button--primary ${className}`.trim()}
      type="button"
      onClick={() => {
        addToCart({ handle, variantId, quantity: 1 });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
    >
      {added ? 'Added' : label ?? 'Add to cart'}
    </button>
  );
}

