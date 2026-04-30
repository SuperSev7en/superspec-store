'use client';

import { useEffect, useState } from 'react';
import { readCart, CartLine } from '@/components/store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { TrustBadges } from '@/components/store/TrustBadges';

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({ clientSecret, onSuccess, onBack }: { clientSecret: string; onSuccess: (id: string) => void; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Avoid automatic redirect so we can hit our API
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    } else {
      toast.error('Unexpected state');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <PaymentElement />
      <div style={{ marginTop: 20, display: 'flex', gap: 15, alignItems: 'center' }}>
        <input type="checkbox" id="tos" required />
        <label htmlFor="tos" style={{ fontSize: 13 }}>I agree to the <a href="/policies/terms" className="Link Link--underline">Terms of Service</a></label>
      </div>
      <div style={{ marginTop: 30, display: 'flex', gap: 20 }}>
        <button type="button" className="Button Button--secondary" onClick={onBack} disabled={loading}>Back</button>
        <button type="submit" className="Button Button--primary" style={{ flex: 1 }} disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [clientSecret, setClientSecret] = useState('');
  
  // Form State
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({ name: '', line1: '', line2: '', city: '', state: '', zip: '', country: 'US' });
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const c = readCart();
    if (c.length === 0) {
      window.location.href = '/cart';
    } else {
      setCart(c);
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 5.99;
  const total = Math.max(0, subtotal - discountAmount) + shipping;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, email, address, discountCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initialize payment');
      
      setClientSecret(data.clientSecret);
      setDiscountAmount(data.discountAmount || 0);
      setStep(3);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      const res = await fetch('/api/checkout/confirm-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId, cart, email, address, total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to confirm order');
      
      window.location.href = `/checkout/success?orderNumber=${data.orderNumber}`;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="Container" style={{ padding: '40px 20px', display: 'flex', gap: 60, flexWrap: 'wrap' }}>
      {/* Left Column: Flow */}
      <div style={{ flex: '1 1 500px' }}>
        <h1 className="Heading u-h2" style={{ marginBottom: 40 }}>Checkout</h1>

        {/* Step 1: Contact */}
        <div style={{ marginBottom: 30, opacity: step === 1 ? 1 : 0.5 }}>
          <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>1. Contact</h2>
          {step === 1 ? (
            <form onSubmit={handleContactSubmit}>
              <input type="email" className="Form__Input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <div style={{ marginTop: 15 }}>
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter" style={{ marginLeft: 10, fontSize: 13 }}>Subscribe to newsletter</label>
              </div>
              <p style={{ marginTop: 15, fontSize: 13 }}>Already have an account? <a href="/account/login" className="Link Link--underline">Log in</a></p>
              <button type="submit" className="Button Button--primary" style={{ marginTop: 20 }}>Continue to Shipping</button>
            </form>
          ) : (
            <p className="Text--subdued">{email} <button onClick={() => setStep(1)} className="Link Link--underline" style={{ marginLeft: 10 }}>Edit</button></p>
          )}
        </div>

        {/* Step 2: Shipping */}
        <div style={{ marginBottom: 30, opacity: step === 2 ? 1 : (step > 2 ? 0.5 : 0.3) }}>
          <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>2. Shipping Address</h2>
          {step === 2 && (
            <form onSubmit={handleShippingSubmit} className="Form Form--spacingTight">
              <input type="text" className="Form__Input" placeholder="Full Name" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} required style={{ marginBottom: 15 }} />
              <input type="text" className="Form__Input" placeholder="Address Line 1" value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})} required style={{ marginBottom: 15 }} />
              <input type="text" className="Form__Input" placeholder="Address Line 2 (Optional)" value={address.line2} onChange={e => setAddress({...address, line2: e.target.value})} style={{ marginBottom: 15 }} />
              <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
                <input type="text" className="Form__Input" placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} required />
                <input type="text" className="Form__Input" placeholder="State/Province" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} required />
              </div>
              <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
                <input type="text" className="Form__Input" placeholder="ZIP/Postal Code" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} required />
                <select className="Form__Input" value={address.country} onChange={e => setAddress({...address, country: e.target.value})}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                <button type="button" className="Button Button--secondary" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="Button Button--primary" style={{ flex: 1 }}>Continue to Payment</button>
              </div>
            </form>
          )}
          {step > 2 && (
            <p className="Text--subdued">{address.line1}, {address.city}, {address.state} {address.zip} <button onClick={() => setStep(2)} className="Link Link--underline" style={{ marginLeft: 10 }}>Edit</button></p>
          )}
        </div>

        {/* Step 3: Payment */}
        <div style={{ opacity: step === 3 ? 1 : 0.3 }}>
          <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>3. Payment</h2>
          {step === 3 && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <CheckoutForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} onBack={() => setStep(2)} />
            </Elements>
          )}
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div style={{ flex: '1 1 400px', position: 'sticky', top: 40, alignSelf: 'flex-start' }}>
        <div style={{ background: 'var(--secondary-elements-background)', padding: 30, borderRadius: 8 }}>
          <h2 className="Heading u-h5" style={{ marginBottom: 20 }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 20 }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 60, height: 60, background: '#fff', borderRadius: 4, overflow: 'hidden' }}>
                      {item.image && <img src={item.image.replace('shopify://shop_images/', '/assets/')} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                    </div>
                    <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--text-color)', color: '#fff', width: 20, height: 20, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{item.quantity}</span>
                  </div>
                  <div>
                    <p className="Heading u-h6" style={{ margin: 0 }}>{item.title}</p>
                    {item.variantTitle && <p className="Text--subdued" style={{ fontSize: 12, margin: 0 }}>{item.variantTitle}</p>}
                  </div>
                </div>
                <span className="Price">${((item.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <input type="text" className="Form__Input" placeholder="Discount code" value={discountCode} onChange={e => setDiscountCode(e.target.value)} disabled={step === 3} />
              <button className="Button Button--secondary" disabled={step === 3}>Apply</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="Text--subdued">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="Text--subdued">Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border-color)', fontWeight: 'bold' }}>
              <span className="Heading u-h5">Total</span>
              <span className="Heading u-h5">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

          {/* Trust Badges */}
          <TrustBadges />
      </div>
    </div>
  );
}