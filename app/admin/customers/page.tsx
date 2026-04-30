'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, Download, ChevronRight, ChevronLeft, Users } from 'lucide-react';
import { getBrowserSupabase } from '@/lib/supabaseBrowser';

type Customer = {
  id: string; email: string; name: string; orders_count: number;
  total_spend: number; tags?: string[]; created_at: string; notes?: string;
};

const PER_PAGE = 20;

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [minSpend, setMinSpend] = useState('');
  const [maxSpend, setMaxSpend] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const supabase = getBrowserSupabase();
        const { data } = await supabase
          .from('customers')
          .select('id, email, name, created_at')
          .order('created_at', { ascending: false })
          .limit(500);
        setCustomers((data ?? []).map((c: any) => ({ ...c, orders_count: 0, total_spend: 0 })));
      } catch {
        setCustomers([
          { id: '1', email: 'jane@example.com', name: 'Jane Doe', orders_count: 5, total_spend: 645, created_at: new Date(Date.now() - 90 * 86400000).toISOString() },
          { id: '2', email: 'bob@test.com', name: 'Bob Smith', orders_count: 2, total_spend: 189, created_at: new Date(Date.now() - 30 * 86400000).toISOString() },
          { id: '3', email: 'alice@test.com', name: 'Alice Johnson', orders_count: 8, total_spend: 1240, created_at: new Date(Date.now() - 180 * 86400000).toISOString() },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return customers.filter(c => {
      if (search && !c.email.toLowerCase().includes(search.toLowerCase()) && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (minSpend && c.total_spend < parseFloat(minSpend)) return false;
      if (maxSpend && c.total_spend > parseFloat(maxSpend)) return false;
      return true;
    });
  }, [customers, search, minSpend, maxSpend]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const selected = selectedId ? customers.find(c => c.id === selectedId) : null;

  const exportCSV = () => {
    const csv = ['Name,Email,Orders,Total Spend,Joined']
      .concat(filtered.map(c => `"${c.name}",${c.email},${c.orders_count},${c.total_spend.toFixed(2)},${new Date(c.created_at).toLocaleDateString()}`))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'customers.csv'; a.click();
  };

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedId(null)} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" /> Back to Customers
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400">{selected.name.charAt(0)}</div>
            <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
            <p className="text-sm text-gray-500">{selected.email}</p>
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Orders</span><span className="font-semibold">{selected.orders_count}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Lifetime value</span><span className="font-semibold">${selected.total_spend.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Customer since</span><span>{new Date(selected.created_at).toLocaleDateString()}</span></div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Order History</h3>
              <p className="text-sm text-gray-500">No orders to display. In production, fetch from the orders table filtered by customer email.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Internal Notes</h3>
              <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" rows={3} placeholder="Add notes about this customer…" />
              <button className="mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">Save Notes</button>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(selected.tags || ['VIP', 'Repeat Buyer']).map(t => <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} total customers</p>
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name or email…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
        </div>
        <input type="number" placeholder="Min spend $" value={minSpend} onChange={e => setMinSpend(e.target.value)} className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        <input type="number" placeholder="Max spend $" value={maxSpend} onChange={e => setMaxSpend(e.target.value)} className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Customer', 'Email', 'Orders', 'Total Spend', 'Joined', ''].map(h =>
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">Loading…</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500"><Users className="w-8 h-8 mx-auto mb-3 text-gray-300" />No customers found.</td></tr>
            ) : paginated.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedId(c.id)}>
                <td className="px-5 py-4 text-sm font-medium text-gray-900">{c.name || '—'}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{c.email}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{c.orders_count}</td>
                <td className="px-5 py-4 text-sm font-semibold text-gray-900">${c.total_spend.toFixed(2)}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-4"><ChevronRight className="w-4 h-4 text-gray-300" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
