"use client";

import { useEffect, useState } from "react";
import {
  CART_UPDATED_EVENT,
  readCart,
  writeCart,
  CartLine,
} from "@/components/store/cart";
import { toast } from "sonner";
import { Icon } from "@/components/shopify/icons/Icon";
import Image from "next/image";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    type: string;
    value: number;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const GIFT_WRAP_FEE = 8;

  // Dummy related products for upsell
  const [upsells] = useState([
    {
      handle: "logo-tee",
      title: "SUPER Spec Logo Tee",
      price: 35,
      image: "shopify://shop_images/hero-1.jpg",
    },
    {
      handle: "print-001",
      title: "Spectrum Print 001",
      price: 75,
      image: "shopify://shop_images/hero-2.jpg",
    },
  ]);

  useEffect(() => {
    setCart(readCart());
    const onUpdate = () => {
      setCart(readCart());
      setIsOpen(true); // Open drawer on add
    };
    window.addEventListener(CART_UPDATED_EVENT, onUpdate);

    // Listen for custom drawer open event
    const onOpen = () => setIsOpen(true);
    window.addEventListener("superspec:open-cart", onOpen);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, onUpdate);
      window.removeEventListener("superspec:open-cart", onOpen);
    };
  }, []);

  const updateQuantity = (
    handle: string,
    variantId: string | undefined,
    delta: number,
  ) => {
    const newCart = [...cart];
    const idx = newCart.findIndex(
      (l) => l.handle === handle && l.variantId === variantId,
    );
    if (idx >= 0) {
      newCart[idx].quantity += delta;
      if (newCart[idx].quantity <= 0) {
        newCart.splice(idx, 1);
        toast("Item removed from cart");
      }
      writeCart(newCart);
    }
  };

  const removeItem = (handle: string, variantId: string | undefined) => {
    const newCart = cart.filter(
      (l) => !(l.handle === handle && l.variantId === variantId),
    );
    writeCart(newCart);
    toast("Item removed from cart");
  };

  const applyDiscount = async () => {
    if (!discountCode) return;
    try {
      const res = await fetch("/api/cart/discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode }),
      });
      const data = await res.json();

      if (res.ok && data.discount) {
        setAppliedDiscount(data.discount);
        setDiscountError("");
        setDiscountCode("");
        toast.success(`Discount ${data.discount.code} applied!`);
      } else {
        setDiscountError(data.error || "Invalid code");
        toast.error(data.error || "Invalid code");
      }
    } catch {
      toast.error("Error applying discount");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === "percentage")
      discountAmount = subtotal * (appliedDiscount.value / 100);
    else discountAmount = appliedDiscount.value;
  }
  const finalTotal =
    Math.max(0, subtotal - discountAmount) + (giftWrap ? GIFT_WRAP_FEE : 0);

  const freeShippingThreshold = 75;
  const awayFromFreeShipping = Math.max(0, freeShippingThreshold - finalTotal);
  const progressPercent = Math.min(
    100,
    (finalTotal / freeShippingThreshold) * 100,
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 9999,
          transition: "opacity 0.3s",
        }}
        onClick={() => setIsOpen(false)}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 400,
          background: "var(--background)",
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 15px rgba(0,0,0,0.1)",
          animation: "slideInRight 0.3s forwards",
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <h2 className="Heading u-h4" style={{ margin: 0 }}>
            Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: 24,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div
          style={{
            padding: "15px 20px",
            background: "var(--secondary-elements-background)",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <p
            className="Text--subdued"
            style={{ margin: "0 0 8px 0", fontSize: 13, textAlign: "center" }}
          >
            {awayFromFreeShipping > 0
              ? `You're $${awayFromFreeShipping.toFixed(2)} away from free shipping`
              : `🎉 You've unlocked free shipping!`}
          </p>
          <div
            style={{
              height: 4,
              background: "var(--border-color)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                background:
                  awayFromFreeShipping > 0 ? "var(--text-color)" : "#10b981",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Icon icon="cart" />
              <p className="Heading u-h6" style={{ marginTop: 20 }}>
                Your cart is empty
              </p>
              <button
                className="Button Button--primary"
                style={{ marginTop: 20 }}
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {cart.map((item) => (
                <div
                  key={`${item.handle}-${item.variantId}`}
                  style={{ display: "flex", gap: 15 }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "#f5f5f5",
                      position: "relative",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image.replace(
                          "shopify://shop_images/",
                          "/assets/",
                        )}
                        alt={item.title || "Product"}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a
                        href={`/products/${item.handle}`}
                        className="Heading u-h6"
                        style={{ margin: 0, fontSize: 14 }}
                      >
                        {item.title}
                      </a>
                      <button
                        onClick={() => removeItem(item.handle, item.variantId)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--text-light-color)",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    {item.variantTitle &&
                      item.variantTitle !== "Default Title" && (
                        <span
                          className="Text--subdued"
                          style={{ fontSize: 12, marginTop: 4 }}
                        >
                          {item.variantTitle}
                        </span>
                      )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginTop: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--border-color)",
                          borderRadius: 4,
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.handle, item.variantId, -1)
                          }
                          style={{
                            padding: "4px 10px",
                            background: "none",
                            border: "none",
                          }}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 10px", fontSize: 13 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.handle, item.variantId, 1)
                          }
                          style={{
                            padding: "4px 10px",
                            background: "none",
                            border: "none",
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span className="Price">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsells */}
          {cart.length > 0 && (
            <div
              style={{
                marginTop: 40,
                borderTop: "1px solid var(--border-color)",
                paddingTop: 20,
              }}
            >
              <h3 className="Heading u-h6" style={{ marginBottom: 15 }}>
                You Might Also Like
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: 15,
                  overflowX: "auto",
                  paddingBottom: 10,
                }}
              >
                {upsells
                  .filter((u) => !cart.some((c) => c.handle === u.handle))
                  .map((upsell) => (
                    <div key={upsell.handle} style={{ minWidth: 120, flex: 1 }}>
                      <div
                        style={{
                          background: "#f5f5f5",
                          aspectRatio: "1",
                          position: "relative",
                          marginBottom: 8,
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        {/* Placeholder for real upsell image */}
                      </div>
                      <p
                        className="Heading u-h7"
                        style={{ margin: "0 0 4px", fontSize: 12 }}
                      >
                        {upsell.title}
                      </p>
                      <p
                        className="Price Text--subdued"
                        style={{ margin: 0, fontSize: 12 }}
                      >
                        ${upsell.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid var(--border-color)",
              background: "var(--secondary-elements-background)",
            }}
          >
            {/* Discount Code */}
            <div style={{ marginBottom: 15 }}>
              {appliedDiscount ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#ecfdf5",
                    padding: "8px 12px",
                    borderRadius: 4,
                    border: "1px solid #10b981",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "#047857",
                      fontWeight: "bold",
                    }}
                  >
                    {appliedDiscount.code} applied
                  </span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span style={{ fontSize: 13, color: "#047857" }}>
                      -${discountAmount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => setAppliedDiscount(null)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#047857",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    className="Form__Input"
                    style={{ padding: "8px 12px", fontSize: 13 }}
                  />
                  <button
                    onClick={applyDiscount}
                    className="Button Button--secondary"
                    style={{ padding: "8px 16px", fontSize: 13 }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Gift Wrap */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              <span>
                🎁 Gift wrapping <span className="Text--subdued">(+$8.00)</span>
              </span>
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <span className="Heading u-h6">Subtotal</span>
              <span className="Heading u-h6">${finalTotal.toFixed(2)}</span>
            </div>
            <a
              href="/checkout"
              className="Button Button--primary Button--full"
              style={{ marginBottom: 10 }}
            >
              Checkout
            </a>
            <a
              href="/cart"
              className="Link Link--underline Text--subdued"
              style={{ display: "block", textAlign: "center", fontSize: 13 }}
            >
              View full cart
            </a>
          </div>
        )}
      </div>
    </>
  );
}
