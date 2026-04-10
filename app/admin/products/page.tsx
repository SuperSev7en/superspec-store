import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { AdminProductsIndexClient } from '@/components/admin/AdminProductsIndexClient';

export const revalidate = 0;

export default async function AdminProductsIndex() {
  const { supabase } = await requireAdmin('/admin/products');
  const { data: products } = await supabase
    .from('products')
    .select('id, title, handle, status, published, updated_at')
    .order('updated_at', { ascending: false })
    .limit(200);

  return (
    <AdminProductsIndexClient products={(products ?? []) as any} />
  );
}

