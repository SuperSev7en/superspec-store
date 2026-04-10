import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

/**
 * Returns a Storage path for client-side upload to Supabase Storage bucket `product-media`.
 * Client uploads directly using supabase-js; DB rows are written via admin API to `product_images`.
 */
export async function POST(req: Request) {
  await requireAdmin('/admin');
  const body = (await req.json().catch(() => null)) as null | { productId?: string; filename?: string };
  if (!body?.productId || !body?.filename) {
    return NextResponse.json({ error: 'Missing productId/filename' }, { status: 400 });
  }

  const safe = String(body.filename).replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 120);
  const path = `product-media/${body.productId}/${Date.now()}-${safe}`;
  return NextResponse.json({ path });
}

