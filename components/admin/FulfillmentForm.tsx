"use client";

import { useState } from "react";

export function FulfillmentForm({ orderId }: { orderId: string }) {
  const [carrier, setCarrier] = useState("");
  const [tracking, setTracking] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/fulfill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrier, tracking_number: tracking }),
      });
      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json?.error ?? "Fulfillment failed");
      setMsg("Marked fulfilled.");
      window.location.reload();
    } catch (e: any) {
      setMsg(e?.message ?? "Fulfillment failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Fulfillment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carrier
          </label>
          <input
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="USPS / UPS / DHL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tracking number
          </label>
          <input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Tracking #"
          />
        </div>
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={submit}
        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
      >
        {busy ? "Saving…" : "Mark fulfilled"}
      </button>
      {msg ? <div className="text-sm text-gray-700">{msg}</div> : null}
    </div>
  );
}
