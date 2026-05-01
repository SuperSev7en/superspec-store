import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const ALLOWED_SHIPPING: Record<string, { label: string; amount: number; freeThreshold?: number }> = {
  standard: { label: 'Standard Shipping', amount: 5.99, freeThreshold: 75 },
  express: { label: 'Express Shipping', amount: 14.99 },
  international: { label: 'International Shipping', amount: 19.99 },
};

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Payment system not configured' }, { status: 500 });
  }

  try {
    const { cart, email, address, discountCode, shippingMethod } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subtotal = cart.reduce(
      (sum: number, item: any) => sum + (item.price || 0) * item.quantity,
      0
    );

    // Validate discount code against known codes
    let discountAmount = 0;
    if (discountCode && discountCode.toUpperCase() === 'WELCOME10') {
      discountAmount = subtotal * 0.10;
    }

    // Validate shipping method
    const method = shippingMethod || 'standard';
    const shippingConfig = ALLOWED_SHIPPING[method];
    if (!shippingConfig) {
      return NextResponse.json({ error: 'Invalid shipping method' }, { status: 400 });
    }

    let shippingCost = shippingConfig.amount;
    if (shippingConfig.freeThreshold && subtotal >= shippingConfig.freeThreshold) {
      shippingCost = 0;
    }

    const totalAmount = Math.max(0, subtotal - discountAmount) + shippingCost;
    const amountInCents = Math.round(totalAmount * 100);

    if (amountInCents < 50) {
      return NextResponse.json({ error: 'Order total must be at least $0.50' }, { status: 400 });
    }

    // Store cart and order details in metadata for webhook processing
    const cartSummary = cart.map((item: any) => ({
      handle: item.handle,
      variantId: item.variantId,
      title: item.title,
      variantTitle: item.variantTitle,
      quantity: item.quantity,
      price: item.price,
    }));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: email,
      shipping: address ? {
        name: address.name || `${address.firstName} ${address.lastName}`,
        address: {
          line1: address.line1,
          line2: address.line2 || undefined,
          city: address.city,
          state: address.state,
          postal_code: address.zip,
          country: address.country,
        },
      } : undefined,
      metadata: {
        email,
        discountCode: discountCode || '',
        discountAmount: discountAmount.toString(),
        shippingMethod: method,
        shippingCost: shippingCost.toString(),
        subtotal: subtotal.toString(),
        cart: JSON.stringify(cartSummary).slice(0, 500), // Stripe metadata limit
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      discountAmount,
      shippingCost,
    });
  } catch (err: any) {
    console.error('[create-payment-intent]', err.message);
    return NextResponse.json({ error: 'Failed to initialize payment. Please try again.' }, { status: 500 });
  }
}
