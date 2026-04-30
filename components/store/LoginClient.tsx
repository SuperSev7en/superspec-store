'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { loginSuccess, loginFail } from '@/lib/toast';
import { readCart, writeCart } from '@/components/store/cart';

export function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const sp = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const guestCart = readCart();
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe, guestCart }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid email or password');
        loginFail();
        setLoading(false);
        return;
      }

      loginSuccess();
      // Merge server cart into localStorage
      if (data.mergedCart && Array.isArray(data.mergedCart) && data.mergedCart.length > 0) {
        writeCart(data.mergedCart);
      }
      const returnUrl = sp.get('returnUrl') || sp.get('next') || '/account/dashboard';
      router.replace(returnUrl);
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      loginFail();
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--background)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" className="Heading u-h2" style={{ textDecoration: 'none' }}>SUPER Spec</Link>
          <p className="Text--subdued" style={{ marginTop: 8 }}>Sign in to your account</p>
        </div>

        <div style={{ background: 'var(--secondary-elements-background)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 40 }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', color: '#dc2626', padding: '12px 16px', borderRadius: 6, marginBottom: 20, fontSize: 14 }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="Form__Input"
                  style={{ paddingLeft: 40 }}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label className="Heading u-h7">Password</label>
                <Link href="/forgot-password" className="Link Link--underline Text--subdued" style={{ fontSize: 13 }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="Form__Input"
                  style={{ paddingLeft: 40, paddingRight: 40 }}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light-color)' }}>
                  {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: 16, height: 16, cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" className="Text--subdued" style={{ fontSize: 14, cursor: 'pointer' }}>Remember me for 30 days</label>
            </div>

            <button type="submit" disabled={loading} className="Button Button--primary Button--full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? (
                <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              ) : (
                <><LogIn style={{ width: 18, height: 18 }} /> Sign In</>
              )}
            </button>
          </form>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }} className="Text--subdued">
            Don't have an account?{' '}
            <Link href="/register" className="Link Link--underline" style={{ fontWeight: 600 }}>Create one</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
