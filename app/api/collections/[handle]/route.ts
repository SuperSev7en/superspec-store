import { NextRequest, NextResponse } from 'next/server';
import { getProductsForCollectionHandleFromSupabase } from '@/lib/catalog/supabaseCatalog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    
    // Parse limit from query string, default to 8
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    
    if (!handle) {
      return NextResponse.json({ error: 'Collection handle is required' }, { status: 400 });
    }

    const { getProductsForCollectionHandle } = await import('@/lib/catalog/catalog');
    let products = await getProductsForCollectionHandleFromSupabase(handle, limit);
    
    if (!products || products.length === 0) {
      products = await getProductsForCollectionHandle(handle, limit);
    }
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error in /api/collections/[handle]:', error);
    return NextResponse.json({ error: 'Failed to fetch collection products' }, { status: 500 });
  }
}
