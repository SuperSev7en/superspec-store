"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import {
  CART_UPDATED_EVENT,
  readCart,
  CartLine,
} from "@/components/store/cart";

const SESSION_KEY = "upsell_shown_handles";

// Hard-coded complementary product pairings by handle prefix
const PAIRINGS: Record<
  string,
  { title: string; handle: string; price: number }
> = {
  default: {
    title: "Spectrum Print 001",
    handle: "spectrum-print-001",
    price: 75,
  },
};

function getUpsell(lastHandle: string) {
  const key =
    Object.keys(PAIRINGS).find((k) => lastHandle.includes(k)) || "default";
  return PAIRINGS[key];
}

export function PostAddUpsellModal() {
  const [visible, setVisible] = useState(false);
  const [upsell, setUpsell] = useState<{
    title: string;
    handle: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    const onCartUpdate = () => {
      const cart = readCart();
      if (cart.length === 0) return;

      const lastItem = cart[cart.length - 1];
      const shown: string[] = JSON.parse(
        sessionStorage.getItem(SESSION_KEY) || "[]",
      );

      if (shown.includes(lastItem.handle)) return; // already shown for this item this session

      const suggestion = getUpsell(lastItem.handle);
      if (!suggestion || cart.some((l) => l.handle === suggestion.handle))
        return;

      const timer = setTimeout(() => {
        setUpsell(suggestion);
        setVisible(true);
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify([...shown, lastItem.handle]),
        );
      }, 3000);

      return () => clearTimeout(timer);
    };

    window.addEventListener(CART_UPDATED_EVENT, onCartUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, onCartUpdate);
  }, []);

  if (!visible || !upsell) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 320,
        background: "var(--background)",
        border: "1px solid var(--border-color)",
        borderRadius: 8,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        zIndex: 9998,
        padding: 20,
        animation: "slideIn 0.4s ease",
      }}
    >
      <style>{`@keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-light-color)",
        }}
      >
        <X style={{ width: 16, height: 16 }} />
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <ShoppingBag style={{ width: 18, height: 18 }} />
        <span className="Heading u-h6" style={{ fontSize: 13 }}>
          Complete the look
        </span>
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div
          style={{
            width: 72,
            height: 72,
            background: "var(--secondary-elements-background)",
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            className="Heading u-h6"
            style={{ fontSize: 13, marginBottom: 4 }}
          >
            {upsell.title}
          </div>
          <div
            style={{
              fontSize: 13,
              marginBottom: 10,
              color: "var(--text-light-color)",
            }}
          >
            ${upsell.price.toFixed(2)}
          </div>
          <Link
            href={`/products/${upsell.handle}`}
            className="Button Button--primary"
            style={{ fontSize: 12, padding: "6px 14px" }}
            onClick={() => setVisible(false)}
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
