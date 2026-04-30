import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
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

  try {
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'SUPER Spec. Contact <system@superspec.studio>',
        to: ['service@superspec.studio'],
        replyTo: emailStr,
        subject: `New Contact Form Submission: ${nameStr}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${nameStr}</p>
            <p><strong>Email:</strong> ${emailStr}</p>
            <p><strong>Order Number:</strong> ${orderStr || 'N/A'}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${messageStr}</p>
          </div>
        `,
      });
    } else {
      console.info('[contact - simulated]', { name: nameStr, email: emailStr, orderNumber: orderStr || undefined, messageLen: messageStr.length });
    }
  } catch (error) {
    console.error('[contact error]', error);
    return NextResponse.json({ ok: false, error: 'Could not deliver message. Please email us directly.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
