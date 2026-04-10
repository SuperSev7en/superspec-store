import { requireAdmin } from '@/lib/auth/requireAdmin';

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const { supabase } = await requireAdmin('/admin/analytics');

  // Simple DB-based KPIs (Vercel Analytics is collected automatically via <Analytics/>).
  const [ordersRes, productsRes] = await Promise.all([
    supabase.from('orders').select('total, created_at').order('created_at', { ascending: false }).limit(200),
    supabase.from('products').select('id', { count: 'exact' }),
  ]);

  const orders = ordersRes.data ?? [];
  const totalRevenue = orders.reduce((sum, o: any) => sum + Number(o.total ?? 0), 0);
  const recentCount = orders.length;
  const productsCount = productsRes.count ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="text-sm text-gray-500">Revenue (recent {recentCount})</div>
          <div className="text-2xl font-semibold text-gray-900">${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="text-sm text-gray-500">Orders (recent)</div>
          <div className="text-2xl font-semibold text-gray-900">{recentCount}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-2xl font-semibold text-gray-900">{productsCount}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Vercel Analytics</h2>
        <p className="text-sm text-gray-600">
          Pageviews are collected automatically. Use the Vercel dashboard to view charts (Audience, Top pages, Referrers).
        </p>
      </div>
    </div>
  );
}

