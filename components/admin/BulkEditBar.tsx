'use client';

import { useState } from 'react';

export function BulkEditBar({
  selectedCount,
  onApply,
  onClear,
}: {
  selectedCount: number;
  onApply: (patch: { status?: 'draft' | 'active' | 'archived'; published?: boolean }) => Promise<void>;
  onClear: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function applyStatus(status: 'draft' | 'active' | 'archived') {
    setBusy(true);
    try {
      await onApply({ status });
    } finally {
      setBusy(false);
    }
  }

  async function applyPublished(published: boolean) {
    setBusy(true);
    try {
      await onApply({ published });
    } finally {
      setBusy(false);
    }
  }

  if (selectedCount <= 0) return null;

  return (
    <div className="sticky bottom-4 z-10">
      <div className="mx-auto max-w-5xl bg-gray-900 text-white rounded-lg shadow-lg px-4 py-3 flex items-center justify-between">
        <div className="text-sm">
          <strong>{selectedCount}</strong> selected
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={busy}
            className="px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-60"
            onClick={() => applyStatus('active')}
          >
            Set Active
          </button>
          <button
            type="button"
            disabled={busy}
            className="px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-60"
            onClick={() => applyStatus('draft')}
          >
            Set Draft
          </button>
          <button
            type="button"
            disabled={busy}
            className="px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-60"
            onClick={() => applyPublished(true)}
          >
            Publish
          </button>
          <button
            type="button"
            disabled={busy}
            className="px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-60"
            onClick={() => applyPublished(false)}
          >
            Unpublish
          </button>
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

