'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { RefreshCcw } from 'lucide-react';

export function RefundForm({ orderId, total }: { orderId: string; total: number }) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('requested_by_customer');
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRefund = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${orderId}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount ? parseFloat(amount) : undefined,
        reason,
      }),
    });
    const data = await res.json();
    setLoading(false);
    setShowConfirm(false);
    if (res.ok) {
      toast.success(`Refund of $${data.refund.amount.toFixed(2)} issued`);
    } else {
      toast.error(data.error || 'Refund failed');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <RefreshCcw className="w-5 h-5" /> Issue Refund
      </h2>

      {!showConfirm ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (leave blank for full refund of ${total.toFixed(2)})
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number" min={0.01} step={0.01} max={total}
                value={amount} onChange={e => setAmount(e.target.value)}
                className="w-full pl-7 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={total.toFixed(2)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <select value={reason} onChange={e => setReason(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
              <option value="requested_by_customer">Requested by customer</option>
              <option value="fraudulent">Fraudulent</option>
              <option value="duplicate">Duplicate</option>
            </select>
          </div>
          <button onClick={() => setShowConfirm(true)} className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
            Issue {amount ? `$${parseFloat(amount).toFixed(2)}` : 'Full'} Refund
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            This will refund <strong>${amount ? parseFloat(amount).toFixed(2) : total.toFixed(2)}</strong> to the customer's original payment method. This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={handleRefund} disabled={loading} className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50">
              {loading ? 'Processing…' : 'Confirm Refund'}
            </button>
            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
