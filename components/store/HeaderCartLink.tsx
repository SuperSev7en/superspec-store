'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/shopify/icons/Icon';
import { CART_UPDATED_EVENT, cartTotalQuantity, readCart } from '@/components/store/cart';

export function HeaderCartLink({ cartType }: { cartType?: string }) {
  const [count, setCount] = useState(0);
  const [pop, setPop] = useState(false);
  const prev = useRef(0);

  useEffect(() => {
    const initial = cartTotalQuantity(readCart());
    prev.current = initial;
    setCount(initial);
  }, []);

  useEffect(() => {
    const onUpdate = () => {
      const next = cartTotalQuantity(readCart());
      setCount(next);
      if (next > prev.current) {
        setPop(true);
        window.setTimeout(() => setPop(false), 650);
      }
      prev.current = next;
    };
    window.addEventListener(CART_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, onUpdate);
  }, []);

  const drawer = cartType === 'drawer';

  return (
    <a
      href="/cart"
      className={`Header__Icon Icon-Wrapper Icon-Wrapper--clickable Header__Icon--cartLink ${drawer ? 'js-drawer-open-cart' : ''}`.trim()}
      {...(drawer ? { 'aria-controls': 'sidebar-cart' } : {})}
      data-action={drawer ? 'open-drawer' : undefined}
      aria-expanded="false"
      aria-label={`Open cart${count > 0 ? `, ${count} items` : ''}`}
    >
      <Icon icon="cart" />
      {count > 0 ? (
        <span className={`Header__CartBadge ${pop ? 'Header__CartBadge--pop' : ''}`.trim()} aria-hidden>
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </a>
  );
}
