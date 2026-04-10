'use client';

import { useState } from 'react';

export default function AdminProductsImportPage() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch('/api/admin/catalog/import', { method: 'POST', body: fd });
      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json?.error ?? 'Import failed');
      setMsg(`Imported ${json.imported} products.`);
    } catch (err: any) {
      setMsg(err?.message ?? 'Import failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900">Import products (CSV)</h1>
      <p className="text-sm text-gray-600">
        Upload a Shopify product export CSV. This will upsert products by <code>Handle</code> and replace variants per product (MVP).
        Images are handled separately via the Media uploader on each product.
      </p>

      <form onSubmit={onSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
        <input type="file" name="file" accept=".csv,text/csv" required />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {busy ? 'Importing…' : 'Import'}
        </button>
        {msg ? <div className="text-sm text-gray-700">{msg}</div> : null}
      </form>

      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Export</h2>
        <p className="text-sm text-gray-600">Download a Shopify-ish CSV from your current Supabase catalog.</p>
        <a className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200" href="/api/admin/catalog/export">
          Download CSV
        </a>
      </div>
    </div>
  );
}

