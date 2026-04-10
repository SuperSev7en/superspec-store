import { NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/catalog/catalog';
import { getProductByHandleFromSupabase } from '@/lib/catalog/supabaseCatalog';

export const runtime = 'nodejs';

export async function GET(_: Request, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = (await getProductByHandleFromSupabase(handle)) ?? (await getProductByHandle(handle));
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product });
}

