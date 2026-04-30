import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { cart, email, address, discountCode } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const subtotal = cart.reduce((sum: number, item: any) => sum + (item.price || 0) * item.quantity, 0);
    
    // In a real app, validate discount code against DB
    let discountAmount = 0;
    if (discountCode && discountCode.toUpperCase() === 'WELCOME10') {
      discountAmount = subtotal * 0.10;
    }

    const shipping = subtotal > 75 ? 0 : 5.99;
    const totalAmount = Math.max(0, subtotal - discountAmount) + shipping;
    const amountInCents = Math.round(totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: email,
      shipping: {
        name: address.name,
        address: {
          line1: address.line1,
          line2: address.line2 || undefined,
          city: address.city,
          state: address.state,
          postal_code: address.zip,
          country: address.country,
        },
      },
      metadata: {
        discountCode,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      discountAmount
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
