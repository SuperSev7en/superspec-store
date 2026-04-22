import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

function statusBadgeClass(status: string) {
  if (status === 'fulfilled') return 'bg-blue-100 text-blue-800';
  if (status === 'paid' || status === 'unfulfilled') return 'bg-green-100 text-green-800';
  if (status === 'cancelled' || status === 'refunded') return 'bg-gray-100 text-gray-800';
  return 'bg-yellow-100 text-yellow-800';
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [ordersCountRes, totalsRes, recentOrdersRes, productsResult, customersResult] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total').limit(5000),
    supabase.from('orders').select('id, order_number, total, status, created_at').order('created_at', { ascending: false }).limit(10),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('customers').select('id', { count: 'exact', head: true }),
  ]);

  const ordersCount = ordersCountRes.count ?? 0;
  const totalsRows = totalsRes.data ?? [];
  const totalSales = totalsRows.reduce((sum, row) => sum + Number(row.total ?? 0), 0);
  const recentOrders = recentOrdersRes.data ?? [];
  const productsCount = productsResult.count ?? 0;
  const customersCount = customersResult.count ?? 0;

  const stats = [
    { name: 'Total sales (all orders)', value: `$${totalSales.toFixed(2)}`, icon: DollarSign, color: 'bg-blue-500' },
    { name: 'Orders', value: String(ordersCount), icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Products', value: String(productsCount), icon: Package, color: 'bg-amber-500' },
    { name: 'Customers', value: String(customersCount), icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Sales total sums up to 5,000 most recent order rows. Totals update when Stripe webhooks write to the database.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} rounded-md p-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No orders yet. After you connect Stripe webhooks, completed checkouts show up here.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <Link className="text-indigo-600 hover:underline" href={`/admin/orders/${order.id}`}>
                        {order.order_number ? `#${order.order_number}` : `#${order.id.slice(0, 8)}`}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClass(
                          String(order.status ?? ''),
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">${order.total}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
