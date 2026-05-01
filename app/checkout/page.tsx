"use client";

import { useEffect, useState, useCallback } from "react";
import { readCart, clearCart, CartLine } from "@/components/store/cart";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { TrustBadges } from "@/components/store/TrustBadges";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/* ─── Standard Payment Form (Step 4) ─── */
function CheckoutForm({
  clientSecret,
  onSuccess,
  onBack,
}: {
  clientSecret: string;
  onSuccess: (id: string) => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed. Please try again.");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    } else {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <PaymentElement />
      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 13, color: "var(--text-light-color)" }}>
          By placing your order you agree to our{" "}
          <a href="/policies/terms" className="Link Link--underline">
            Terms of Service
          </a>
        </p>
      </div>
      <div style={{ marginTop: 30, display: "flex", gap: 20 }}>
        <button
          type="button"
          className="Button Button--secondary"
          onClick={onBack}
          disabled={loading}
        >
          Back to Shipping
        </button>
        <button
          type="submit"
          className="Button Button--primary"
          style={{ flex: 1, padding: "16px 0", fontSize: 16 }}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}

/* ─── Express Checkout (Apple Pay / Google Pay) ─── */
function ExpressCheckoutWrapper({
  cart,
  total,
  onSuccess,
}: {
  cart: CartLine[];
  total: number;
  onSuccess: (paymentIntentId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [ready, setReady] = useState(false);

  const onConfirm = useCallback(async () => {
    if (!stripe || !elements) return;

    const { error } = await elements.submit();
    if (error) {
      toast.error(error.message || "Payment failed");
      return;
    }

    // Create payment intent server-side for express checkout
    try {
      const res = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          email: "", // Will be provided by Express Checkout
          shippingMethod: "standard",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        toast.error(confirmError.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    }
  }, [stripe, elements, cart, onSuccess]);

  return (
    <div style={{ minHeight: ready ? undefined : 0 }}>
      <ExpressCheckoutElement
        onConfirm={onConfirm}
        onReady={() => setReady(true)}
        options={{
          buttonType: { applePay: "buy", googlePay: "buy" },
          buttonHeight: 44,
          layout: { maxColumns: 2 },
          paymentMethodOrder: ['apple_pay', 'google_pay', 'link'],
        }}
      />
      {!ready && (
        <p
          className="Text--subdued"
          style={{ textAlign: "center", fontSize: 12, padding: "10px 0" }}
        >
          Express checkout loading...
        </p>
      )}
    </div>
  );
}

/* ─── Main Checkout Flow ─── */
export default function CheckoutFlow() {
  const [step, setStep] = useState(2);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [clientSecret, setClientSecret] = useState("");

  // Form State
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const c = readCart();
    if (c.length === 0) {
      window.location.href = "/cart";
    } else {
      setCart(c);
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );
  const isFreeStandard = subtotal >= 75;

  let shippingCost = 0;
  if (shippingMethod === "standard") {
    shippingCost = isFreeStandard ? 0 : 5.99;
  } else if (shippingMethod === "express") {
    shippingCost = 14.99;
  }

  const total = Math.max(0, subtotal - discountAmount) + shippingCost;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          email,
          address: {
            name: `${address.firstName} ${address.lastName}`,
            ...address,
          },
          discountCode,
          shippingMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to initialize payment");

      setClientSecret(data.clientSecret);
      setDiscountAmount(data.discountAmount || 0);
      setStep(4);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      const res = await fetch("/api/checkout/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          cart,
          email,
          address: {
            name: `${address.firstName} ${address.lastName}`,
            ...address,
          },
          shippingMethod,
          shippingCost,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm order");

      clearCart();
      window.location.href = `/checkout/success?orderNumber=${data.orderNumber}&email=${encodeURIComponent(email)}`;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div
      className="Container"
      style={{
        padding: "40px 20px",
        display: "flex",
        gap: 60,
        flexWrap: "wrap",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Left Column: Flow */}
      <div style={{ flex: "1 1 550px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <h1 className="Heading u-h2" style={{ margin: 0 }}>
            SUPER Spec.
          </h1>
        </div>

        {/* Step 1: Express Checkout */}
        <div style={{ marginBottom: 40 }}>
          <p
            style={{ textAlign: "center", fontSize: 13, marginBottom: 15 }}
            className="Text--subdued"
          >
            Express Checkout
          </p>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: Math.round((total || 1) * 100),
              currency: "usd",
            }}
          >
            <ExpressCheckoutWrapper
              cart={cart}
              total={total}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>

          <div
            style={{ display: "flex", alignItems: "center", margin: "30px 0" }}
          >
            <div
              style={{ flex: 1, height: 1, background: "var(--border-color)" }}
            />
            <span
              style={{ padding: "0 15px", fontSize: 13 }}
              className="Text--subdued"
            >
              OR CONTINUE BELOW
            </span>
            <div
              style={{ flex: 1, height: 1, background: "var(--border-color)" }}
            />
          </div>
        </div>

        {/* Step 2: Contact */}
        <div
          style={{
            marginBottom: 30,
            opacity: step === 2 ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h2 className="Heading u-h4">Contact</h2>
          </div>
          {step === 2 ? (
            <form onSubmit={handleContactSubmit}>
              <input
                type="email"
                className="Form__Input"
                placeholder="Email address for order updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="Button Button--primary"
                style={{
                  marginTop: 25,
                  width: "100%",
                  padding: "16px 0",
                  fontSize: 16,
                }}
              >
                Continue to Shipping
              </button>
            </form>
          ) : (
            <p
              className="Text--subdued"
              style={{
                border: "1px solid var(--border-color)",
                padding: 15,
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {email}{" "}
              <button
                onClick={() => setStep(2)}
                className="Link Link--underline"
                style={{ color: "var(--primary-color)" }}
              >
                Edit
              </button>
            </p>
          )}
        </div>

        {/* Step 3: Shipping */}
        <div
          style={{
            marginBottom: 30,
            opacity: step === 3 ? 1 : step > 3 ? 0.6 : 0.3,
            transition: "opacity 0.3s",
          }}
        >
          <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>
            Shipping Address
          </h2>
          {step === 3 && (
            <form
              onSubmit={handleShippingSubmit}
              className="Form Form--spacingTight"
            >
              <select
                className="Form__Input"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                style={{ marginBottom: 15 }}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>

              <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
                <input
                  type="text"
                  className="Form__Input"
                  placeholder="First name"
                  value={address.firstName}
                  onChange={(e) =>
                    setAddress({ ...address, firstName: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="Form__Input"
                  placeholder="Last name"
                  value={address.lastName}
                  onChange={(e) =>
                    setAddress({ ...address, lastName: e.target.value })
                  }
                  required
                />
              </div>

              <input
                type="text"
                className="Form__Input"
                placeholder="Address line 1"
                value={address.line1}
                onChange={(e) =>
                  setAddress({ ...address, line1: e.target.value })
                }
                required
                style={{ marginBottom: 15 }}
              />
              <input
                type="text"
                className="Form__Input"
                placeholder="Address line 2 (optional)"
                value={address.line2}
                onChange={(e) =>
                  setAddress({ ...address, line2: e.target.value })
                }
                style={{ marginBottom: 15 }}
              />

              <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
                <input
                  type="text"
                  className="Form__Input"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                  style={{ flex: 2 }}
                />
                <select
                  className="Form__Input"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                  style={{ flex: 1 }}
                >
                  <option value="">State</option>
                  {[
                    ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"],
                    ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"],
                    ["CT", "Connecticut"], ["DE", "Delaware"], ["FL", "Florida"],
                    ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"],
                    ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
                    ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
                    ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"],
                    ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"],
                    ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
                    ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"],
                    ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"],
                    ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
                    ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
                    ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"],
                    ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"],
                    ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"],
                    ["WI", "Wisconsin"], ["WY", "Wyoming"], ["DC", "Washington D.C."],
                  ].map(([abbr, name]) => (
                    <option key={abbr} value={abbr}>
                      {abbr} — {name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="Form__Input"
                  placeholder="ZIP code"
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                  required
                  style={{ flex: 1 }}
                />
              </div>

              <input
                type="tel"
                className="Form__Input"
                placeholder="Phone (for shipping updates)"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                required
                style={{ marginBottom: 30 }}
              />

              <h3 className="Heading u-h5" style={{ marginBottom: 15 }}>
                Shipping Method
              </h3>
              <div
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  overflow: "hidden",
                  marginBottom: 25,
                }}
              >
                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 15,
                    borderBottom: "1px solid var(--border-color)",
                    cursor: "pointer",
                    background:
                      shippingMethod === "standard"
                        ? "var(--secondary-elements-background)"
                        : "transparent",
                  }}
                >
                  <div style={{ display: "flex", gap: 15 }}>
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                    />
                    <span>Standard Shipping (5-7 business days)</span>
                  </div>
                  <span className="Price">
                    {isFreeStandard ? "Free" : "$5.99"}
                  </span>
                </label>
                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 15,
                    cursor: "pointer",
                    background:
                      shippingMethod === "express"
                        ? "var(--secondary-elements-background)"
                        : "transparent",
                  }}
                >
                  <div style={{ display: "flex", gap: 15 }}>
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                    />
                    <span>Express Shipping (2-3 business days)</span>
                  </div>
                  <span className="Price">$14.99</span>
                </label>
              </div>

              {subtotal >= 75 && shippingMethod === "standard" && (
                <p style={{ fontSize: 13, color: "var(--primary-color)", marginBottom: 20 }}>
                  You qualify for free standard shipping!
                </p>
              )}

              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <button
                  type="button"
                  className="Link Link--underline Text--subdued"
                  onClick={() => setStep(2)}
                >
                  Return to Contact
                </button>
                <button
                  type="submit"
                  className="Button Button--primary"
                  style={{ flex: 1, padding: "16px 0", fontSize: 16 }}
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}
          {step > 3 && (
            <div
              style={{
                border: "1px solid var(--border-color)",
                padding: 15,
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span className="Text--subdued">Ship to</span>
                <span>
                  {address.line1}, {address.city}, {address.state} {address.zip}
                </span>
                <button
                  onClick={() => setStep(3)}
                  className="Link Link--underline"
                  style={{ color: "var(--primary-color)" }}
                >
                  Edit
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: 10,
                }}
              >
                <span className="Text--subdued">Method</span>
                <span>
                  {shippingMethod === "standard"
                    ? `Standard Shipping${isFreeStandard ? " (Free)" : ""}`
                    : "Express Shipping"}
                </span>
                <button
                  onClick={() => setStep(3)}
                  className="Link Link--underline"
                  style={{ color: "var(--primary-color)" }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Payment */}
        <div
          style={{ opacity: step === 4 ? 1 : 0.3, transition: "opacity 0.3s" }}
        >
          <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>
            Payment
          </h2>
          <p
            className="Text--subdued"
            style={{ fontSize: 13, marginBottom: 20 }}
          >
            All transactions are secure and encrypted.
          </p>
          {step === 4 && clientSecret && (
            <div
              style={{
                background: "var(--secondary-elements-background)",
                padding: 25,
                borderRadius: 8,
              }}
            >
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: { theme: "night" } }}
              >
                <CheckoutForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setStep(3)}
                />
              </Elements>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div
        style={{
          flex: "1 1 400px",
          position: "sticky",
          top: 40,
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            background: "var(--secondary-elements-background)",
            padding: 30,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginBottom: 25,
            }}
          >
            {cart.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: "#111",
                        borderRadius: 8,
                        overflow: "hidden",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {item.image && (
                        <img
                          src={item.image.replace(
                            "shopify://shop_images/",
                            "/assets/",
                          )}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        background: "var(--link-color)",
                        color: "#000",
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <p
                      className="Heading u-h6"
                      style={{ margin: 0, fontSize: 14 }}
                    >
                      {item.title}
                    </p>
                    {item.variantTitle &&
                      item.variantTitle !== "Default Title" && (
                        <p
                          className="Text--subdued"
                          style={{ fontSize: 12, margin: "4px 0 0" }}
                        >
                          {item.variantTitle}
                        </p>
                      )}
                  </div>
                </div>
                <span className="Price" style={{ fontWeight: 500 }}>
                  ${((item.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "20px 0",
              borderTop: "1px solid var(--border-color)",
              borderBottom: "1px solid var(--border-color)",
              marginBottom: 25,
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="text"
                className="Form__Input"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                disabled={step === 4}
                style={{ background: "#111", color: "#fff" }}
              />
              <button
                className="Button Button--secondary"
                disabled={step === 4}
              >
                Apply
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="Text--subdued">Subtotal</span>
              <span style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--primary-color)",
                }}
              >
                <span>Discount</span>
                <span style={{ fontWeight: 500 }}>
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="Text--subdued">Shipping</span>
              <span style={{ fontWeight: 500 }}>
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 15,
                paddingTop: 15,
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <span className="Heading u-h4">Total</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="Text--subdued" style={{ fontSize: 12 }}>
                  USD
                </span>
                <span className="Heading u-h3">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
