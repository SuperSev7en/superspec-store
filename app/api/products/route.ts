import { NextResponse } from 'next/server';
import { loadCatalog } from '@/lib/catalog/catalog';
import { loadCatalogFromSupabase } from '@/lib/catalog/supabaseCatalog';

export const runtime = 'nodejs';

export async function GET() {
  const supabaseProducts = await loadCatalogFromSupabase();
  const products = supabaseProducts.length > 0 ? supabaseProducts : await loadCatalog();
  return NextResponse.json({ products });
}

