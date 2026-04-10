'use client';

import { useMemo, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabaseBrowser';

type Img = {
  id: string;
  storage_path: string;
  alt: string | null;
  position: number;
  width: number | null;
  height: number | null;
};

function publicUrl(storagePath: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${storagePath.replace(/^\/+/, '')}`;
}

export function ProductMediaManager({ productId, initialImages }: { productId: string; initialImages: Img[] }) {
  const [images, setImages] = useState<Img[]>(() => [...initialImages].sort((a, b) => a.position - b.position));
  const [busy, setBusy] = useState(false);
  const urls = useMemo(() => images.map((im) => ({ ...im, url: publicUrl(im.storage_path) })), [images]);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const supabase = getBrowserSupabase();

      for (const file of Array.from(files)) {
        // Ask server for a safe path for this product
        const pRes = await fetch('/api/admin/storage/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, filename: file.name }),
        });
        const pJson = (await pRes.json()) as { path?: string; error?: string };
        if (!pRes.ok || !pJson.path) throw new Error(pJson.error ?? 'Could not create upload path');

        const { error: upErr } = await supabase.storage.from('product-media').upload(pJson.path.replace(/^product-media\//, ''), file, {
          upsert: false,
          cacheControl: '3600',
        });
        if (upErr) throw new Error(upErr.message);

        const storage_path = `product-media/${pJson.path.replace(/^product-media\//, '')}`;
        const nextPos = (images[images.length - 1]?.position ?? 0) + 1;
        const dbRes = await fetch(`/api/admin/products/${productId}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storage_path, position: nextPos, alt: null }),
        });
        const dbJson = (await dbRes.json()) as { image?: Img; error?: string };
        if (!dbRes.ok || !dbJson.image) throw new Error(dbJson.error ?? 'Could not save image');
        setImages((prev) => [...prev, dbJson.image!].sort((a, b) => a.position - b.position));
      }
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  async function move(id: string, dir: -1 | 1) {
    const idx = images.findIndex((x) => x.id === id);
    if (idx < 0) return;
    const swapWith = idx + dir;
    if (swapWith < 0 || swapWith >= images.length) return;
    const next = [...images];
    const a = next[idx]!;
    const b = next[swapWith]!;
    const tmp = a.position;
    a.position = b.position;
    b.position = tmp;
    next.sort((x, y) => x.position - y.position);
    setImages(next);

    await fetch(`/api/admin/products/${productId}/images`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: next.map((x, i) => ({ id: x.id, position: i + 1, alt: x.alt })) }),
    });
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Media</h2>
        <label className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ${busy ? 'bg-gray-200 text-gray-500' : 'bg-gray-900 text-white hover:bg-gray-800'} cursor-pointer`}>
          Upload
          <input type="file" multiple accept="image/*" className="hidden" disabled={busy} onChange={(e) => onFiles(e.target.files)} />
        </label>
      </div>

      {urls.length === 0 ? (
        <p className="text-sm text-gray-500">No images yet. Upload one to make product images appear on the storefront.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {urls.map((im) => (
            <div key={im.id} className="border rounded-md overflow-hidden">
              <div className="aspect-square bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.url} alt={im.alt ?? ''} className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-xs text-gray-500">#{im.position}</span>
                <div className="flex gap-2">
                  <button type="button" className="text-xs text-gray-700 hover:underline" onClick={() => move(im.id, -1)}>
                    Up
                  </button>
                  <button type="button" className="text-xs text-gray-700 hover:underline" onClick={() => move(im.id, 1)}>
                    Down
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

