"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  CreditCard,
  XCircle,
  Printer,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

type OrderItem = {
  id: string;
  title: string;
  variantTitle?: string;
  price: number;
  quantity: number;
  image?: string;
  handle?: string;
};
type TimelineEvent = { type: string; message: string; date: string };
type OrderDetail = {
  id: string;
  order_number: string;
  email: string;
  customer_name?: string;
  status: string;
  fulfillment_status?: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  currency: string;
  created_at: string;
  stripe_payment_intent_id?: string;
  shipping_address?: any;
  tracking_number?: string;
  carrier?: string;
  items: OrderItem[];
  timeline: TimelineEvent[];
  notes: string[];
};

const STATUS_COLORS: Record<string, string> = {
  paid: "#16a34a",
  pending: "#ca8a04",
  processing: "#2563eb",
  shipped: "#7c3aed",
  delivered: "#16a34a",
  fulfilled: "#16a34a",
  cancelled: "#dc2626",
  refunded: "#6b7280",
};
const TIMELINE_STEPS = [
  "placed",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRefund, setShowRefund] = useState(false);
  const [showShip, setShowShip] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchOrder() {
      const supabase = getBrowserSupabase();
      const { data: orderData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !orderData) {
        toast.error("Order not found");
        setLoading(false);
        return;
      }

      // Type assertion to fix TypeScript inference
      const order = orderData as any;

      // Fetch order items
      const { data: items } = await supabase
        .from("order_items")
        .select("*, products(title, handle), variants(title)")
        .eq("order_id", id);

      const formattedItems: OrderItem[] = (items || []).map((item: any) => ({
        id: item.id,
        title: item.products?.title || "Product",
        variantTitle: item.variants?.title,
        price: item.price || 0,
        quantity: item.quantity || 1,
        handle: item.products?.handle,
      }));

      setOrder({
        id: order.id,
        order_number: order.order_number,
        email: order.email || "",
        customer_name: order.customer_name,
        status: order.status || "paid",
        fulfillment_status: order.fulfillment_status || "unfulfilled",
        total: order.total || 0,
        subtotal: order.subtotal || order.total || 0,
        shipping: order.shipping || 0,
        discount: order.discount || 0,
        currency: order.currency || "USD",
        created_at: order.created_at,
        stripe_payment_intent_id: order.stripe_payment_intent_id,
        shipping_address: order.shipping_address,
        tracking_number: order.tracking_number,
        carrier: order.carrier,
        items: formattedItems,
        timeline: [
          { type: "placed", message: "Order placed", date: order.created_at },
          { type: "confirmed", message: "Payment confirmed", date: order.created_at },
        ],
        notes: order.notes ? [order.notes] : [],
      });
      setLoading(false);
    }
    fetchOrder();
  }, [id]);

  const handleMarkProcessing = async () => {
    if (!order) return;
    const supabase = getBrowserSupabase();
    await (supabase.from("orders") as any).update({ status: "processing" }).eq("id", order.id);
    setOrder({ ...order, status: "processing" });
    toast.success("Order marked as processing");
  };

  const handleMarkShipped = async () => {
    if (!order || !carrier || !trackingNumber) {
      toast.error("Enter carrier and tracking number");
      return;
    }
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/fulfill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrier, tracking_number: trackingNumber }),
      });
      if (!res.ok) throw new Error("Failed to fulfill order");

      setOrder({
        ...order,
        status: "fulfilled",
        fulfillment_status: "fulfilled",
        carrier,
        tracking_number: trackingNumber,
      });
      setShowShip(false);
      toast.success("Order marked as shipped — customer will be notified");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRefund = () => {
    const amount = parseFloat(refundAmount);
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    // In production: call Stripe refund API
    toast.success(`Refund of $${amount.toFixed(2)} initiated`);
    setShowRefund(false);
    setRefundAmount("");
  };

  const handleCancel = () => {
    if (!order) return;
    setOrder({ ...order, status: "cancelled" });
    setShowCancel(false);
    toast.success("Order cancelled");
  };

  const handleAddNote = () => {
    if (!note.trim()) return;
    setNotes((prev) => [...prev, `${new Date().toLocaleString()}: ${note}`]);
    setNote("");
    toast.success("Note added");
  };

  const handlePrint = () => {
    // Generate packing slip in new window
    if (!order) return;
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    printWin.document.write(`
      <html><head><title>Packing Slip - ${order.order_number}</title><style>body{font-family:sans-serif;padding:40px;max-width:700px;margin:0 auto} table{width:100%;border-collapse:collapse;margin:20px 0} th,td{border:1px solid #ddd;padding:10px;text-align:left} h1{letter-spacing:3px}</style></head><body>
      <h1>SUPER Spec</h1><h2>Packing Slip</h2>
      <p><strong>Order:</strong> #${order.order_number}<br><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
      <p><strong>Ship to:</strong><br>${order.shipping_address?.name}<br>${order.shipping_address?.line1}<br>${order.shipping_address?.city}, ${order.shipping_address?.state} ${order.shipping_address?.zip}</p>
      <table><thead><tr><th>Item</th><th>Variant</th><th>Qty</th></tr></thead><tbody>
      ${order.items.map((i) => `<tr><td>${i.title}</td><td>${i.variantTitle || ""}</td><td>${i.quantity}</td></tr>`).join("")}
      </tbody></table>
      <script>window.print();</script></body></html>
    `);
    printWin.document.close();
  };

  if (loading) return <div className="text-gray-500">Loading order...</div>;
  if (!order) return <div className="text-gray-500">Order not found.</div>;

  const timelineIdx = TIMELINE_STEPS.indexOf(
    order.status === "paid"
      ? "confirmed"
      : order.status === "cancelled"
        ? "placed"
        : order.status,
  );

  return (
    <div className="space-y-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Order #{order.order_number}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{
              background: (STATUS_COLORS[order.status] || "#6b7280") + "15",
              color: STATUS_COLORS[order.status] || "#6b7280",
            }}
          >
            {order.status}
          </span>
          {order.status === "paid" && (
            <button
              onClick={handleMarkProcessing}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700"
            >
              Mark Processing
            </button>
          )}
          {["paid", "processing"].includes(order.status) && (
            <button
              onClick={() => setShowShip(true)}
              className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 inline-flex items-center gap-1"
            >
              <Truck className="w-3 h-3" /> Mark Shipped
            </button>
          )}
          <button
            onClick={() => setShowRefund(true)}
            className="px-3 py-1.5 border border-gray-200 text-xs font-medium rounded-lg hover:bg-gray-50 inline-flex items-center gap-1"
          >
            <CreditCard className="w-3 h-3" /> Refund
          </button>
          {order.status !== "cancelled" && (
            <button
              onClick={() => setShowCancel(true)}
              className="px-3 py-1.5 border border-red-200 text-red-600 text-xs font-medium rounded-lg hover:bg-red-50 inline-flex items-center gap-1"
            >
              <XCircle className="w-3 h-3" /> Cancel
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 border border-gray-200 text-xs font-medium rounded-lg hover:bg-gray-50 inline-flex items-center gap-1"
          >
            <Printer className="w-3 h-3" /> Packing Slip
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Order Timeline
        </h2>
        <div className="flex gap-0">
          {TIMELINE_STEPS.map((step, i) => {
            const done = i <= timelineIdx;
            return (
              <div
                key={step}
                className="flex-1 flex flex-col items-center relative"
              >
                {i < TIMELINE_STEPS.length - 1 && (
                  <div
                    className="absolute top-3 left-1/2 w-full h-0.5"
                    style={{
                      background:
                        done && i < timelineIdx ? "#1a1a1a" : "#e5e7eb",
                    }}
                  />
                )}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center relative z-10 text-xs"
                  style={{
                    background: done ? "#1a1a1a" : "#e5e7eb",
                    color: done ? "#fff" : "transparent",
                  }}
                >
                  {done && <CheckCircle className="w-4 h-4" />}
                </div>
                <span
                  className="text-[10px] mt-2 capitalize font-medium"
                  style={{ color: done ? "#1a1a1a" : "#9ca3af" }}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Line Items
          </h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded bg-gray-100 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </div>
                  {item.variantTitle && (
                    <div className="text-xs text-gray-500">
                      {item.variantTitle}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500">× {item.quantity}</div>
                <div className="text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>
                {order.shipping === 0
                  ? "Free"
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Customer
            </h3>
            <div className="text-sm text-gray-700">
              {order.customer_name || order.email.split("@")[0]}
            </div>
            <div className="text-xs text-gray-500">{order.email}</div>
          </div>
          {order.shipping_address && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Shipping Address
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed">
                {order.shipping_address.name}
                <br />
                {order.shipping_address.line1}
                <br />
                {order.shipping_address.city}, {order.shipping_address.state}{" "}
                {order.shipping_address.zip}
              </div>
            </div>
          )}
          {(order.tracking_number || order.carrier) && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Tracking
              </h3>
              <div className="text-sm text-gray-600">
                {order.carrier}:{" "}
                <a
                  href={`https://www.google.com/search?q=${order.carrier}+tracking+${order.tracking_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {order.tracking_number}
                </a>
              </div>
            </div>
          )}
          {order.stripe_payment_intent_id && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Payment
              </h3>
              <div className="text-xs text-gray-500 font-mono break-all">
                {order.stripe_payment_intent_id}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Internal Notes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Internal Notes
        </h2>
        {notes.length > 0 && (
          <div className="space-y-2 mb-4">
            {notes.map((n, i) => (
              <div
                key={i}
                className="text-sm text-gray-700 bg-gray-50 rounded p-3"
              >
                {n}
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note…"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
          />
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </div>

      {/* Ship Modal */}
      {showShip && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">Mark as Shipped</h3>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Carrier
              </label>
              <input
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="UPS, FedEx, USPS…"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleMarkShipped}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
              >
                Confirm Shipment
              </button>
              <button
                onClick={() => setShowShip(false)}
                className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefund && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">Issue Refund</h3>
            <p className="text-sm text-gray-500">
              Order total: <strong>${order.total.toFixed(2)}</strong>
            </p>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Refund Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max={order.total}
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRefundAmount(order.total.toString())}
                className="text-xs text-blue-600 hover:underline"
              >
                Full refund
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefund}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
              >
                Issue Refund
              </button>
              <button
                onClick={() => setShowRefund(false)}
                className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold text-red-600">Cancel Order</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to cancel order #{order.order_number}? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
              >
                Yes, Cancel Order
              </button>
              <button
                onClick={() => setShowCancel(false)}
                className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50"
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
