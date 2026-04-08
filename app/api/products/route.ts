import { NextResponse } from 'next/server';
import { loadCatalog } from '@/lib/catalog/catalog';

export const runtime = 'nodejs';

export async function GET() {
  const products = await loadCatalog();
  return NextResponse.json({ products });
}

