'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Only desktop, only once per session
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    if (sessionStorage.getItem('exit_popup_shown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem('exit_popup_shown', '1');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'exit_intent' }),
    }).catch(() => {});
    setSubmitted(true);
    toast.success('10% off code sent to your inbox!');
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn 0.3s ease'
    }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      <div style={{
        background: 'var(--background)', borderRadius: 8, maxWidth: 480, width: '100%',
        padding: 40, position: 'relative', animation: 'slideUp 0.35s ease',
        border: '1px solid var(--border-color)'
      }}>
        <button onClick={() => setVisible(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light-color)' }}>
          <X style={{ width: 20, height: 20 }} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
            <h2 className="Heading u-h3" style={{ marginBottom: 8 }}>You're in!</h2>
            <p className="Text--subdued">Check your email for your 10% off code. Use it on your first order.</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
              <h2 className="Heading u-h2" style={{ marginBottom: 8 }}>Wait — 10% off your first order</h2>
              <p className="Text--subdued" style={{ fontSize: 15 }}>
                Join the SUPER Spec list for early access to drops, exclusive pieces, and your welcome discount.
              </p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="Form__Input" placeholder="your@email.com" required
                style={{ fontSize: 15, padding: '14px 16px' }}
              />
              <button type="submit" className="Button Button--primary" style={{ fontSize: 15, padding: '14px' }}>
                Claim My 10% Off
              </button>
            </form>
            <p className="Text--subdued" style={{ fontSize: 12, textAlign: 'center', marginTop: 14 }}>No spam, ever. Unsubscribe any time.</p>
          </>
        )}
      </div>
    </div>
  );
}
