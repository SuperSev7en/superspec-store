import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProductByHandle } from '@/lib/catalog/catalog';
import { getProductByHandleFromSupabase } from '@/lib/catalog/supabaseCatalog';

export const runtime = 'nodejs';

type CartLine = { handle: string; variantId?: string; quantity: number };

export async function POST(req: Request) {
  const body = (await req.json()) as { lines?: CartLine[] };
  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) return NextResponse.json({ error: 'Missing lines' }, { status: 400 });

  const origin = req.headers.get('origin') ?? 'http://localhost:3000';

  const lineItems = [];
  for (const line of lines) {
    if (!line?.handle || !line.quantity) continue;
    const product = (await getProductByHandleFromSupabase(line.handle)) ?? (await getProductByHandle(line.handle));
    if (!product) continue;

    const variant = line.variantId ? product.variants.find((v) => v.id === line.variantId) : product.variants[0];
    if (!variant) continue;

    const unitAmount = Math.round(variant.price * 100);
    lineItems.push({
      quantity: Math.max(1, Math.min(99, Number(line.quantity) || 1)),
      price_data: {
        currency: 'usd',
        unit_amount: unitAmount,
        product_data: {
          name: product.title,
          description: variant.option1 ? variant.option1 : undefined,
          images: product.images[0] ? [`${origin}${product.images[0]}`] : undefined,
          metadata: { handle: product.handle, variantId: variant.id },
        },
      },
    });
  }

  if (lineItems.length === 0) return NextResponse.json({ error: 'No valid lines' }, { status: 400 });

  const session = await (stripe.checkout.sessions as any).create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'JP', 'AU', 'NZ', 'DE', 'FR', 'IT', 'ES'] },
    automatic_tax: { enabled: false },
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({ url: session.url });
}

