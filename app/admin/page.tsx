import { createClient } from '@/lib/supabase';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package
} from 'lucide-react';
import { DashboardClient } from '@/components/admin/DashboardClient';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch data
  const [ordersCountRes, totalsRes, recentOrdersRes, productsResult, customersResult] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total, created_at').order('created_at', { ascending: true }).limit(5000),
    supabase.from('orders').select('id, order_number, total, status, created_at').order('created_at', { ascending: false }).limit(6),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('customers').select('id', { count: 'exact', head: true }),
  ]);

  const ordersCount = ordersCountRes.count ?? 0;
  const totalsRows = totalsRes.data ?? [];
  const totalSales = totalsRows.reduce((sum, row) => sum + Number(row.total ?? 0), 0);
  const recentOrders = recentOrdersRes.data ?? [];
  const productsCount = productsResult.count ?? 0;
  const customersCount = customersResult.count ?? 0;

  // Prepare chart data (group by date)
  const chartDataMap: Record<string, number> = {};
  totalsRows.forEach(row => {
    const date = new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    chartDataMap[date] = (chartDataMap[date] || 0) + Number(row.total);
  });
  const chartData = Object.entries(chartDataMap).map(([date, total]) => ({ date, total }));

  const stats = [
    { name: 'Total sales', value: `$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-600', trend: '+12.5%' },
    { name: 'Total orders', value: String(ordersCount), icon: ShoppingCart, color: 'text-blue-600', trend: '+3.2%' },
    { name: 'Total products', value: String(productsCount), icon: Package, color: 'text-amber-600', trend: null },
    { name: 'Total customers', value: String(customersCount), icon: Users, color: 'text-purple-600', trend: '+5.4%' },
  ];

  return (
    <DashboardClient 
      stats={stats} 
      chartData={chartData} 
      recentOrders={recentOrders} 
    />
  );
}
