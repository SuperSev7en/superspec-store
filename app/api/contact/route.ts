import { NextResponse } from 'next/server';

const MAX_LEN = 4000;

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

  const { name, email, message, orderNumber } = body as Record<string, unknown>;
  const nameStr = typeof name === 'string' ? name.trim() : '';
  const emailStr = typeof email === 'string' ? email.trim() : '';
  const messageStr = typeof message === 'string' ? message.trim() : '';
  const orderStr = typeof orderNumber === 'string' ? orderNumber.trim() : '';

  if (!nameStr || !emailStr || !messageStr) {
    return NextResponse.json({ ok: false, error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (messageStr.length > MAX_LEN) {
    return NextResponse.json({ ok: false, error: 'Message is too long.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameStr,
          email: emailStr,
          orderNumber: orderStr || undefined,
          message: messageStr,
        }),
      });
    } catch {
      return NextResponse.json({ ok: false, error: 'Could not deliver message. Try email instead.' }, { status: 502 });
    }
  } else {
    console.info('[contact]', { name: nameStr, email: emailStr, orderNumber: orderStr || undefined, messageLen: messageStr.length });
  }

  return NextResponse.json({ ok: true });
}
