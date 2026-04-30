'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    // Always show success — never confirm if email exists (security)
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--background)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" className="Heading u-h2" style={{ textDecoration: 'none' }}>SUPER Spec</Link>
          <p className="Text--subdued" style={{ marginTop: 8 }}>Reset your password</p>
        </div>

        <div style={{ background: 'var(--secondary-elements-background)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 40 }}>
          {submitted ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#10b981' }}>
                <Mail style={{ width: 24, height: 24 }} />
              </div>
              <h2 className="Heading u-h4" style={{ marginBottom: 12 }}>Check your email</h2>
              <p className="Text--subdued" style={{ marginBottom: 24, fontSize: 14 }}>
                If an account exists for <strong>{email}</strong>, we've sent a password reset link. The link expires in 1 hour.
              </p>
              <Link href="/login" className="Button Button--secondary Button--full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <p className="Text--subdued" style={{ marginBottom: 24, fontSize: 14 }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 24 }}>
                  <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="Form__Input" style={{ paddingLeft: 40 }} placeholder="you@example.com" required autoFocus />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="Button Button--primary Button--full" style={{ marginBottom: 16 }}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
                <Link href="/login" className="Link Link--underline Text--subdued" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, justifyContent: 'center' }}>
                  <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Sign In
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
