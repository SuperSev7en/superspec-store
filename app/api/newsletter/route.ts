import { NextResponse } from 'next/server';

const MAX_EMAIL = 320;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  const raw = (body as Record<string, unknown>).email;
  const email = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
  if (!email || email.length > MAX_EMAIL) {
    return NextResponse.json({ ok: false, error: 'Email is required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }

  const payload = { source: 'newsletter', email };

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      return NextResponse.json({ ok: false, error: 'Could not subscribe right now. Try again later.' }, { status: 502 });
    }
  } else {
    console.info('[newsletter]', payload);
  }

  return NextResponse.json({ ok: true });
}
