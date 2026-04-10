'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      orderNumber: String(fd.get('orderNumber') ?? ''),
      message: String(fd.get('message') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please email us directly.');
        return;
      }
      setStatus('ok');
      setMessage('Thank you — your message was received.');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Network error. Please email us directly.');
    }
  }

  return (
    <div className="Rte">
      <form className="Form Form--spacingTight" onSubmit={onSubmit}>
        {status === 'ok' ? <p className="Alert Alert--success">{message}</p> : null}
        {status === 'error' ? <p className="Alert Alert--error">{message}</p> : null}

        <div className="Form__Group">
          <div className="Form__Item">
            <input type="text" className="Form__Input" name="name" aria-label="Name" placeholder="Name" required />
            <label className="Form__FloatingLabel">Name</label>
          </div>
          <div className="Form__Item">
            <input type="email" className="Form__Input" name="email" aria-label="Email" placeholder="Email" required />
            <label className="Form__FloatingLabel">Email</label>
          </div>
        </div>

        <div className="Form__Item">
          <input
            type="text"
            className="Form__Input"
            name="orderNumber"
            aria-label="Order number (optional)"
            placeholder="Order number (optional)"
          />
          <label className="Form__FloatingLabel">Order number (optional)</label>
        </div>

        <div className="Form__Item">
          <textarea name="message" cols={30} rows={10} className="Form__Textarea" aria-label="Message" placeholder="Message" required />
          <label className="Form__FloatingLabel">Message</label>
        </div>

        <button type="submit" className="Form__Submit Button Button--primary Button--full" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </form>
    </div>
  );
}
