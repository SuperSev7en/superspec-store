import Link from 'next/link';
import { stripe } from '@/lib/stripe';

type Search = { session_id?: string };

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { session_id } = await searchParams;

  let headline = 'Thank you for your order';
  let detail: string | null = 'Your payment was received. You will get a confirmation email from Stripe shortly.';

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status === 'paid') {
        const email =
          session.customer_details?.email?.trim() || session.customer_email?.trim() || null;
        if (email) {
          detail = `We sent payment details to ${email}. Your order appears in the store admin shortly after checkout completes.`;
        }
      } else if (session.payment_status === 'unpaid') {
        headline = 'Payment still processing';
        detail = 'If you used a delayed payment method, your order will finalize when the payment clears.';
      }
    } catch {
      detail = 'If you completed checkout, your order is on its way. Keep the Stripe receipt email for your records.';
    }
  }

  return (
    <div className="Container">
      <header className="PageHeader">
        <h1 className="PageHeader__Title Heading u-h1">{headline}</h1>
      </header>
      <div className="Section">
        {detail ? <p className="Text--subdued">{detail}</p> : null}
        <p style={{ marginTop: 16 }}>
          <Link href="/products" className="Link Link--primary">
            Continue shopping
          </Link>
          {' · '}
          <Link href="/" className="Link Link--secondary">
            Home
          </Link>
          {' · '}
          <Link href="/contact" className="Link Link--secondary">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
