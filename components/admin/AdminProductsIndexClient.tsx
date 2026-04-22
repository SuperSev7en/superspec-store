'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BulkEditBar } from '@/components/admin/BulkEditBar';

type Row = {
  id: string;
  title: string;
  handle: string;
  status: 'draft' | 'active' | 'archived';
  published: boolean;
  updated_at: string | null;
};

export function AdminProductsIndexClient({ products }: { products: Row[] }) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const selectedIds = useMemo(() => Object.entries(selected).filter(([, v]) => v).map(([k]) => k), [selected]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => `${p.title} ${p.handle}`.toLowerCase().includes(query));
  }, [products, q]);

  function toggleAll(on: boolean) {
    if (!on) {
      setSelected({});
      return;
    }
    const next: Record<string, boolean> = {};
    for (const p of filtered) next[p.id] = true;
    setSelected(next);
  }

  async function applyBulk(patch: { status?: 'draft' | 'active' | 'archived'; published?: boolean }) {
    const res = await fetch('/api/admin/products/bulk', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds, set: patch }),
    });
    const json = (await res.json().catch(() => ({}))) as any;
    if (!res.ok) throw new Error(json?.error ?? 'Bulk update failed');
    // refresh page for new data
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Products</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/products/import"
            className="inline-flex items-center rounded-lg bg-white border border-[#c9cccf] px-3 py-1.5 text-sm font-medium text-[#1a1a1a] shadow-sm hover:bg-[#f8f9fa] transition-colors"
          >
            Import/Export
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center rounded-lg bg-[#1a1a1a] px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#303030] transition-colors"
          >
            Add product
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-[#e1e3e5] rounded-xl overflow-hidden">
        <div className="p-3 border-b border-[#e1e3e5] bg-white">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products"
            className="w-full px-3 py-1.5 text-sm border border-[#c9cccf] rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#e1e3e5]">
            <thead className="bg-[#f4f6f8]">
              <tr>
                <th className="px-4 py-2.5 w-12 text-center">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    className="rounded border-[#c9cccf] text-[#1a1a1a] focus:ring-[#1a1a1a]"
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#616a75] uppercase tracking-wider">Title</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#616a75] uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#616a75] uppercase tracking-wider">Published</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#616a75] uppercase tracking-wider">Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#e1e3e5]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-[#616a75]">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f4f6f8] transition-colors group">
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-[#c9cccf] text-[#1a1a1a] focus:ring-[#1a1a1a]"
                        checked={Boolean(selected[p.id])}
                        onChange={(e) => setSelected((prev) => ({ ...prev, [p.id]: e.target.checked }))}
                        aria-label={`Select ${p.title}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                      <Link className="hover:underline group-hover:text-[#005bd3]" href={`/admin/products/${p.id}`}>
                        {p.title}
                      </Link>
                      <div className="text-xs text-[#616a75] mt-0.5 font-normal">/{p.handle}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4a5568]">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'active' ? 'bg-[#aee9d1] text-[#006e52]' : 'bg-[#e3e5e7] text-[#4a5568]'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#4a5568]">
                      {p.published ? (
                        <span className="inline-flex items-center text-[#006e52]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          Yes
                        </span>
                      ) : 'No'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#616a75]">
                      {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : ''}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BulkEditBar selectedCount={selectedIds.length} onApply={applyBulk} onClear={() => setSelected({})} />
    </div>
  );
}

