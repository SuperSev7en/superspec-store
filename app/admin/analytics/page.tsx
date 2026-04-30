'use client';

import { useState, useMemo } from 'react';
import { Download, BarChart3, ShoppingCart, Eye, CreditCard, Package } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data — replace with real DB queries
const SALES_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  revenue: Math.round(Math.random() * 3000 + 500),
  orders: Math.floor(Math.random() * 15 + 1),
}));

const TOP_PRODUCTS = [
  { name: 'SUPER Spec Logo Tee', units: 142, revenue: 12070 },
  { name: 'Spectrum Print 001', units: 89, revenue: 6675 },
  { name: 'Precision Bracket V2', units: 34, revenue: 9860 },
  { name: 'Artist Hoodie', units: 67, revenue: 5025 },
  { name: 'Machined Pen Stand', units: 45, revenue: 3150 },
];

const FUNNEL = [
  { stage: 'Sessions', count: 12450, icon: Eye },
  { stage: 'Product Views', count: 5680, icon: Package },
  { stage: 'Add to Cart', count: 1890, icon: ShoppingCart },
  { stage: 'Checkout Started', count: 920, icon: CreditCard },
  { stage: 'Purchase', count: 380, icon: BarChart3 },
];

const GEO_DATA = [
  { region: 'United States', orders: 285, revenue: 34200 },
  { region: 'Canada', orders: 42, revenue: 5040 },
  { region: 'United Kingdom', orders: 31, revenue: 3720 },
  { region: 'Australia', orders: 15, revenue: 1800 },
  { region: 'Germany', orders: 7, revenue: 840 },
];

const DEVICE_DATA = [
  { device: 'Mobile', sessions: 6225, pct: 50 },
  { device: 'Desktop', sessions: 4980, pct: 40 },
  { device: 'Tablet', sessions: 1245, pct: 10 },
];

type Tab = 'overview' | 'products' | 'geography' | 'devices';

export default function AdminAnalyticsPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [sortBy, setSortBy] = useState<'revenue' | 'units'>('revenue');

  const sortedProducts = useMemo(() =>
    [...TOP_PRODUCTS].sort((a, b) => b[sortBy] - a[sortBy]),
    [sortBy]
  );

  const totalRevenue = SALES_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = SALES_DATA.reduce((s, d) => s + d.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const exportView = (name: string, rows: string[]) => {
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${name}.csv`; a.click();
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'products', label: 'Products' },
    { key: 'geography', label: 'Geography' },
    { key: 'devices', label: 'Devices' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <button onClick={() => exportView('analytics', ['Metric,Value', `Revenue,$${totalRevenue}`, `Orders,${totalOrders}`, `AOV,$${avgOrderValue.toFixed(2)}`])}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex gap-0 border-b border-gray-200">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{t.label}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-5">
              <div className="text-xs font-semibold text-gray-500 uppercase">Revenue (30d)</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">${totalRevenue.toLocaleString()}</div>
            </div>
            <div className="bg-white shadow rounded-lg p-5">
              <div className="text-xs font-semibold text-gray-500 uppercase">Orders (30d)</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</div>
            </div>
            <div className="bg-white shadow rounded-lg p-5">
              <div className="text-xs font-semibold text-gray-500 uppercase">Avg Order Value</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">${avgOrderValue.toFixed(2)}</div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Sales Over Time</h2>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#1a1a1a" fill="#1a1a1a" fillOpacity={0.08} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
            <div className="space-y-3">
              {FUNNEL.map((step, i) => {
                const pct = i === 0 ? 100 : Math.round((step.count / FUNNEL[0].count) * 100);
                const dropOff = i > 0 ? Math.round(((FUNNEL[i - 1].count - step.count) / FUNNEL[i - 1].count) * 100) : 0;
                return (
                  <div key={step.stage} className="flex items-center gap-4">
                    <step.icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{step.stage}</span>
                        <span className="text-sm text-gray-600">{step.count.toLocaleString()} <span className="text-gray-400">({pct}%)</span></span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#1a1a1a' }} />
                      </div>
                    </div>
                    {i > 0 && <span className="text-xs text-red-500 font-medium w-14 text-right">-{dropOff}%</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {tab === 'products' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Top Products</h2>
            <div className="flex gap-2">
              <button onClick={() => setSortBy('revenue')} className={`px-3 py-1 text-xs rounded-full ${sortBy === 'revenue' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>By Revenue</button>
              <button onClick={() => setSortBy('units')} className={`px-3 py-1 text-xs rounded-full ${sortBy === 'units' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>By Units</button>
              <button onClick={() => exportView('top_products', ['Product,Units,Revenue', ...sortedProducts.map(p => `"${p.name}",${p.units},${p.revenue}`)])} className="text-xs text-gray-500 hover:text-gray-900 ml-2">Export</button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50"><tr>{['#', 'Product', 'Units Sold', 'Revenue'].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {sortedProducts.map((p, i) => (
                <tr key={p.name} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{p.units}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">${p.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'geography' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Orders by Region</h2>
            <button onClick={() => exportView('geography', ['Region,Orders,Revenue', ...GEO_DATA.map(g => `"${g.region}",${g.orders},${g.revenue}`)])} className="text-xs text-gray-500 hover:text-gray-900">Export</button>
          </div>
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50"><tr>{['Region', 'Orders', 'Revenue', '% of Total'].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {GEO_DATA.map(g => (
                <tr key={g.region} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{g.region}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{g.orders}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">${g.revenue.toLocaleString()}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{Math.round((g.orders / GEO_DATA.reduce((s, x) => s + x.orders, 0)) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'devices' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Device Breakdown</h2>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEVICE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="device" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Sessions by Device</h2>
            <div className="space-y-4 mt-4">
              {DEVICE_DATA.map(d => (
                <div key={d.device}>
                  <div className="flex justify-between text-sm mb-1"><span className="font-medium text-gray-900">{d.device}</span><span className="text-gray-500">{d.sessions.toLocaleString()} ({d.pct}%)</span></div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gray-900 rounded-full" style={{ width: `${d.pct}%` }} /></div>
                </div>
              ))}
            </div>
            <button onClick={() => exportView('devices', ['Device,Sessions,%', ...DEVICE_DATA.map(d => `${d.device},${d.sessions},${d.pct}`)])} className="mt-4 text-xs text-gray-500 hover:text-gray-900">Export CSV</button>
          </div>
        </div>
      )}
    </div>
  );
}
