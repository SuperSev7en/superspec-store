'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { loginSuccess } from '@/lib/toast';

function PasswordStrength({ password }: { password: string }) {
  const score = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]
    .filter(r => r.test(password)).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
  return password.length > 0 ? (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= score ? colors[score] : 'var(--border-color)', transition: 'background 0.3s' }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: colors[score] }}>{labels[score]}</span>
    </div>
  ) : null;
}

export function RegisterClient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const sp = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!acceptTerms) {
      setError('Please accept the Terms of Service to continue');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, newsletter }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      loginSuccess();
      const returnUrl = sp.get('returnUrl') || sp.get('next') || '/account/dashboard';
      router.replace(returnUrl);
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--background)' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" className="Heading u-h2" style={{ textDecoration: 'none' }}>SUPER Spec</Link>
          <p className="Text--subdued" style={{ marginTop: 8 }}>Create your account</p>
        </div>

        <div style={{ background: 'var(--secondary-elements-background)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 40 }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', color: '#dc2626', padding: '12px 16px', borderRadius: 6, marginBottom: 20, fontSize: 14 }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>First Name</label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="Form__Input" style={{ paddingLeft: 40 }} placeholder="Jane" required autoComplete="given-name" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="Form__Input" placeholder="Doe" required autoComplete="family-name" />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="Form__Input" style={{ paddingLeft: 40 }} placeholder="you@example.com" required autoComplete="email" />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="Form__Input" style={{ paddingLeft: 40, paddingRight: 40 }} placeholder="••••••••" required minLength={8} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light-color)' }}>
                  {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="Heading u-h7" style={{ display: 'block', marginBottom: 8 }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--text-light-color)' }} />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="Form__Input" style={{ paddingLeft: 40 }} placeholder="••••••••" required autoComplete="new-password" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} style={{ marginTop: 2, width: 16, height: 16 }} />
                <span className="Text--subdued">Subscribe to our newsletter — exclusive drops, early access & 10% off your first order</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} required style={{ marginTop: 2, width: 16, height: 16 }} />
                <span className="Text--subdued">I agree to the <Link href="/policies/terms" className="Link Link--underline" target="_blank">Terms of Service</Link> and <Link href="/policies/privacy" className="Link Link--underline" target="_blank">Privacy Policy</Link></span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="Button Button--primary Button--full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? (
                <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              ) : (
                <><UserPlus style={{ width: 18, height: 18 }} /> Create Account</>
              )}
            </button>
          </form>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }} className="Text--subdued">
            Already have an account?{' '}
            <Link href="/login" className="Link Link--underline" style={{ fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
