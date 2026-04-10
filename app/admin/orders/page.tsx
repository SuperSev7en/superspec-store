import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const { supabase } = await requireAdmin('/admin/orders');
  const { data: orders } = await supabase
    .from('orders')
    .select('id, order_number, status, total, currency, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(orders ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              (orders ?? []).map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link className="hover:underline" href={`/admin/orders/${o.id}`}>
                      {o.order_number ? `#${o.order_number}` : `#${o.id.slice(0, 8)}`}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{o.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {o.currency} {Number(o.total ?? 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {o.created_at ? new Date(o.created_at).toLocaleString() : ''}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

