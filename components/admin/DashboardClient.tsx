'use client';

import React from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { SalesChart } from '@/components/admin/DashboardCharts';
import { TestPushButton } from '@/components/admin/TestPushButton';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Separator, 
  Chip,
  Button
} from '@heroui/react';

function statusBadgeColor(status: string) {
  const s = (status || '').toLowerCase();
  if (s === 'fulfilled' || s === 'paid') return 'success';
  if (s === 'unfulfilled' || s === 'pending') return 'warning';
  if (s === 'cancelled' || s === 'refunded') return 'default';
  return 'accent';
}

type DashboardProps = {
  stats: { name: string; value: string; icon: any; color: string; trend: string | null }[];
  chartData: { date: string; total: number }[];
  recentOrders: any[];
};

export function DashboardClient({ stats, chartData, recentOrders }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Good morning, SUPER Spec.</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-2">
          <TestPushButton />
          <Button size="sm" variant="outline" className="bg-white border border-[#e1e3e5] text-gray-700 font-medium">
            Export
          </Button>
          <Button size="sm" className="bg-black text-white font-medium">
            Create order
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="shadow-sm border-none bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.name}</p>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mt-1">{stat.value}</h3>
              {stat.trend && (
                <div className="flex items-center mt-2 text-xs font-medium text-green-600 bg-green-50 w-fit px-1.5 py-0.5 rounded">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              )}
            </div>
            <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-none bg-white">
          <CardHeader className="flex justify-between items-center px-6 pt-6 pb-0">
            <div>
              <h2 className="text-base font-bold text-[#1a1a1a]">Sales over time</h2>
              <p className="text-xs text-gray-500 mt-1">Revenue across your selected period</p>
            </div>
            <Button isIconOnly size="sm" variant="ghost" className="text-gray-400">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="px-6 py-8">
            <SalesChart data={chartData} />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none bg-white">
          <CardHeader className="px-6 pt-6 pb-0">
            <h2 className="text-base font-bold text-[#1a1a1a]">Things to do</h2>
          </CardHeader>
          <CardContent className="px-6 py-4 space-y-4">
            <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">2 orders to fulfill</p>
                  <p className="text-xs text-gray-500">Ready for shipping</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-600" />
            </div>

            <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <Package className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Low stock alert</p>
                  <p className="text-xs text-gray-500">3 products nearly sold out</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-600" />
            </div>

            <Separator className="my-2" />
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-bold text-gray-900 mb-1">Marketing Tip</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add reviews to your products to increase conversion rates by up to 15%.
              </p>
              <Button size="sm" variant="ghost" className="text-blue-600 font-bold p-0 mt-2 h-auto text-xs">
                Learn more
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-none bg-white overflow-hidden">
        <CardHeader className="flex justify-between items-center px-6 py-5">
          <h2 className="text-base font-bold text-[#1a1a1a]">Recent orders</h2>
          <Link href="/admin/orders">
            <Button size="sm" variant="ghost" className="text-blue-600 font-semibold">
              View all orders
            </Button>
          </Link>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Order</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Customer</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Total</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                        <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                          {order.order_number ? `#${order.order_number}` : `#${order.id.slice(0, 8)}`}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        Guest Customer
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                        ${Number(order.total).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Chip 
                          size="sm" 
                          variant="soft" 
                          color={statusBadgeColor(String(order.status ?? ''))}
                          className="capitalize font-bold px-2"
                        >
                          {order.status}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <Button isIconOnly size="sm" variant="ghost" className="text-gray-400">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
