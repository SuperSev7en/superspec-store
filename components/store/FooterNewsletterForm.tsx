'use client';

import { useState } from 'react';

export function FooterNewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      id="footer-newsletter"
      className="Footer__Newsletter Form"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const email = String(fd.get('email') ?? '').trim();
        setStatus('loading');
        setMessage(null);
        try {
          const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
          if (!res.ok || !json.ok) {
            setStatus('error');
            setMessage(json.error ?? 'Something went wrong.');
            return;
          }
          setStatus('ok');
          setMessage('Thanks — you are subscribed.');
          e.currentTarget.reset();
        } catch {
          setStatus('error');
          setMessage('Network error. Try again.');
        }
      }}
    >
      <input type="email" name="email" className="Form__Input" aria-label="Email" placeholder="Email" required />
      <button type="submit" className="Form__Submit Button Button--primary" disabled={status === 'loading'}>
        {status === 'loading' ? '…' : 'Subscribe'}
      </button>
      {message ? (
        <p className="Text--subdued" style={{ marginTop: 8 }} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
