"use client";

import { useState, useRef } from "react";
import { addToCart } from "@/components/store/cart";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

export function AddToCartButton({
  handle,
  variantId,
  className = "",
  label,
  title,
  price,
  image,
  variantTitle,
  onClick,
}: {
  handle: string;
  variantId?: string;
  className?: string;
  label?: string;
  title?: string;
  price?: number;
  image?: string;
  variantTitle?: string;
  onClick?: (e: React.MouseEvent) => boolean | void;
}) {
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      const result = onClick(e);
      if (result === false) return;
    }

    if (buttonRef.current) {
      buttonRef.current.classList.add("clicked");
      setTimeout(() => buttonRef.current?.classList.remove("clicked"), 350);
    }

    addToCart({
      handle,
      variantId,
      quantity: 1,
      title,
      price,
      image,
      variantTitle,
    });

    if (title && price !== undefined) {
      trackEvent("add_to_cart", {
        currency: "USD",
        value: price,
        items: [
          {
            item_id: variantId || handle,
            item_name: title,
            price,
            quantity: 1,
          },
        ],
      });
    }

    toast.success(added ? `✓ ${title || 'Item'} is in cart` : `Added ${title || 'item'} to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <>
      <style>{`
        .SuperSpec-ATC {
          width: 100%;
          padding: 16px 24px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 2px solid var(--text-color);
          background: var(--text-color);
          color: var(--background);
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .SuperSpec-ATC:hover {
          background: transparent;
          color: var(--text-color);
        }
        .SuperSpec-ATC:active { transform: scale(0.98); }
        .SuperSpec-ATC.clicked { transform: scale(0.96); }
        .SuperSpec-ATC--added {
          background: #16a34a !important;
          border-color: #16a34a !important;
          color: #fff !important;
        }
      `}</style>
      <button
        ref={buttonRef}
        className={`SuperSpec-ATC ${added ? "SuperSpec-ATC--added" : ""} ${className}`.trim()}
        type="button"
        onClick={handleClick}
      >
        {added ? (
          <>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            Added to Cart
          </>
        ) : (
          (label ?? "Add to Cart")
        )}
      </button>
    </>
  );
}
