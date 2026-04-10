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
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/products/import"
            className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
          >
            Import/Export
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Add product
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={filtered.length > 0 && selectedIds.length === filtered.length}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={Boolean(selected[p.id])}
                      onChange={(e) => setSelected((prev) => ({ ...prev, [p.id]: e.target.checked }))}
                      aria-label={`Select ${p.title}`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link className="hover:underline" href={`/admin/products/${p.id}`}>
                      {p.title}
                    </Link>
                    <div className="text-xs text-gray-500">/{p.handle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.published ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.updated_at ? new Date(p.updated_at).toLocaleString() : ''}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <BulkEditBar selectedCount={selectedIds.length} onApply={applyBulk} onClear={() => setSelected({})} />
    </div>
  );
}

