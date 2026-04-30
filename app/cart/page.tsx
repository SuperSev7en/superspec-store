"use client";

import { useEffect, useState } from "react";
import {
  CART_UPDATED_EVENT,
  readCart,
  writeCart,
  CartLine,
} from "@/components/store/cart";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/shopify/icons/Icon";

export default function CartPage() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    setCart(readCart());
    setMounted(true);
    const onUpdate = () => setCart(readCart());
    window.addEventListener(CART_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, onUpdate);
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

  if (!mounted) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );

  return (
    <div
      className="Container"
      style={{
        padding: "60px 20px",
        minHeight: "60vh",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <header
        className="PageHeader"
        style={{ marginBottom: 40, textAlign: "center" }}
      >
        <h1 className="PageHeader__Title Heading u-h1">Your Cart</h1>
      </header>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            background: "var(--secondary-elements-background)",
            borderRadius: 12,
          }}
        >
          <Icon icon="cart" />
          <p className="Heading u-h4" style={{ marginTop: 20 }}>
            Your cart is empty
          </p>
          <Link
            href="/products"
            className="Button Button--primary"
            style={{ marginTop: 30 }}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 60 }}>
          <div style={{ flex: "1 1 60% min-width: 300px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              {cart.map((item) => (
                <div
                  key={`${item.handle}-${item.variantId}`}
                  style={{
                    display: "flex",
                    gap: 24,
                    paddingBottom: 30,
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <Link
                    href={`/products/${item.handle}`}
                    style={{
                      width: 140,
                      height: 160,
                      background: "#f5f5f5",
                      position: "relative",
                      borderRadius: 8,
                      overflow: "hidden",
                      display: "block",
                      flexShrink: 0,
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
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </Link>
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
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <Link
                          href={`/products/${item.handle}`}
                          className="Heading u-h5"
                          style={{
                            margin: 0,
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {item.title}
                        </Link>
                        {item.variantTitle &&
                          item.variantTitle !== "Default Title" && (
                            <p
                              className="Text--subdued"
                              style={{
                                fontSize: 14,
                                marginTop: 4,
                                marginBottom: 0,
                              }}
                            >
                              {item.variantTitle}
                            </p>
                          )}
                        <p
                          className="Price"
                          style={{ marginTop: 8, fontSize: 16 }}
                        >
                          ${(item.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--border-color)",
                          borderRadius: 6,
                          width: "fit-content",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.handle, item.variantId, -1)
                          }
                          style={{
                            padding: "8px 16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 18,
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{
                            padding: "0 12px",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.handle, item.variantId, 1)
                          }
                          style={{
                            padding: "8px 16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 18,
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.handle, item.variantId)}
                        className="Text--subdued Link Link--underline"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 35%", minWidth: 300 }}>
            <div
              style={{
                background: "var(--secondary-elements-background)",
                padding: 40,
                borderRadius: 12,
                position: "sticky",
                top: 40,
              }}
            >
              <h2 className="Heading u-h4" style={{ marginBottom: 30 }}>
                Order Summary
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginBottom: 30,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="Text--subdued">Subtotal</span>
                  <span className="Heading u-h6">${subtotal.toFixed(2)}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="Text--subdued">Shipping</span>
                  <span className="Text--subdued">Calculated at checkout</span>
                </div>
              </div>

              <div
                style={{
                  padding: "24px 0",
                  borderTop: "1px solid var(--border-color)",
                  borderBottom: "1px solid var(--border-color)",
                  marginBottom: 30,
                }}
              >
                <p
                  className="Text--subdued"
                  style={{ fontSize: 13, marginBottom: 12 }}
                >
                  Discount Code
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    className="Form__Input"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    style={{ background: "#fff" }}
                  />
                  <button
                    className="Button Button--secondary"
                    style={{ padding: "10px 20px" }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <span className="Heading u-h5">Estimated Total</span>
                <span className="Heading u-h4">${subtotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="Button Button--primary Button--full"
                style={{ padding: "16px 0", fontSize: 16 }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
