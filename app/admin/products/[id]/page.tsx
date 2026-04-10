import { requireAdmin } from '@/lib/auth/requireAdmin';
import { ProductMediaManager } from '@/components/admin/ProductMediaManager';
import { PresenceBadge } from '@/components/admin/PresenceBadge';

export const revalidate = 0;

export default async function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin(`/admin/products/${id}`);

  const { data: product } = await supabase
    .from('products')
    .select('id, title, handle, status, published, vendor, product_type, tags, description_html, seo_title, seo_description')
    .eq('id', id)
    .maybeSingle();

  const { data: images } = await supabase
    .from('product_images')
    .select('id, storage_path, alt, position, width, height')
    .eq('product_id', id)
    .order('position', { ascending: true });

  if (!product) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>
          <div className="text-sm text-gray-500">/{product.handle}</div>
        </div>
        <PresenceBadge roomKey={`product:${id}`} displayName={user.email ?? user.id.slice(0, 8)} />
      </div>

      <ProductMediaManager productId={id} initialImages={(images ?? []) as any} />

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900">Next steps</h2>
        <ul className="list-disc pl-5 text-sm text-gray-600 mt-2 space-y-1">
          <li>Upload images above (this will fix blank product images on the storefront for Supabase products).</li>
          <li>CSV import/export and bulk editor are next items on the roadmap.</li>
        </ul>
      </div>
    </div>
  );
}

