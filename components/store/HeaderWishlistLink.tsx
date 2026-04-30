"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/shopify/icons/Icon";
import {
  readWishlist,
  WISHLIST_UPDATED_EVENT,
} from "@/components/store/wishlist";

export function HeaderWishlistLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(readWishlist().length);

    const onUpdate = () => {
      setCount(readWishlist().length);
    };

    window.addEventListener(WISHLIST_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, onUpdate);
  }, []);

  return (
    <a
      href="/account/wishlist"
      className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable Header__Icon--wishlist"
      aria-label={`Open wishlist${count > 0 ? `, ${count} items` : ""}`}
      style={{ position: "relative" }}
    >
      <Icon icon="heart" />
      {count > 0 ? (
        <span className="Header__CartBadge" style={{ right: -6 }} aria-hidden>
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </a>
  );
}
