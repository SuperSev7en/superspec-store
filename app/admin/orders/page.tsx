"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

type Order = {
  id: string;
  order_number: string;
  email: string;
  customer_name?: string;
  total: number;
  currency: string;
  status: string;
  fulfillment_status?: string;
  items_count?: number;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  paid: "#16a34a",
  pending: "#ca8a04",
  processing: "#2563eb",
  shipped: "#7c3aed",
  delivered: "#16a34a",
  cancelled: "#dc2626",
  refunded: "#6b7280",
};
const FULFILLMENT_COLORS: Record<string, string> = {
  unfulfilled: "#ca8a04",
  fulfilled: "#16a34a",
  partial: "#2563eb",
};
const STATUSES = [
  "all",
  "paid",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];
const PER_PAGE = 20;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const supabase = getBrowserSupabase();
        const { data } = await supabase
          .from("orders")
          .select(
            "id, order_number, email, total, currency, status, fulfillment_status, created_at",
          )
          .order("created_at", { ascending: false })
          .limit(500);
        setOrders((data ?? []) as Order[]);
      } catch {
        // Fallback mock
        setOrders([
          {
            id: "1",
            order_number: "SP-000001",
            email: "jane@example.com",
            customer_name: "Jane Doe",
            total: 145,
            currency: "USD",
            status: "paid",
            fulfillment_status: "unfulfilled",
            items_count: 2,
            created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
          },
          {
            id: "2",
            order_number: "SP-000002",
            email: "bob@test.com",
            customer_name: "Bob Smith",
            total: 89.5,
            currency: "USD",
            status: "shipped",
            fulfillment_status: "fulfilled",
            items_count: 1,
            created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
          },
          {
            id: "3",
            order_number: "SP-000003",
            email: "alice@test.com",
            customer_name: "Alice Johnson",
            total: 220,
            currency: "USD",
            status: "processing",
            fulfillment_status: "unfulfilled",
            items_count: 3,
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !o.order_number.toLowerCase().includes(q) &&
          !o.email.toLowerCase().includes(q) &&
          !(o.customer_name || "").toLowerCase().includes(q)
        )
          return false;
      }
      if (dateFrom && new Date(o.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(o.created_at) > new Date(dateTo + "T23:59:59"))
        return false;
      return true;
    });
  }, [orders, statusFilter, search, dateFrom, dateTo]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  const toggleAll = () =>
    setSelected((prev) =>
      prev.size === paginated.length
        ? new Set()
        : new Set(paginated.map((o) => o.id)),
    );

  const exportCSV = () => {
    const rows =
      selected.size > 0 ? orders.filter((o) => selected.has(o.id)) : filtered;
    const csv = ["Order,Date,Customer,Email,Items,Total,Status,Fulfillment"]
      .concat(
        rows.map(
          (o) =>
            `${o.order_number},${new Date(o.created_at).toLocaleDateString()},${o.customer_name || ""},${o.email},${o.items_count ?? ""},${o.total},${o.status},${o.fulfillment_status || ""}`,
        ),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "orders.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order #, email, or name…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "all"
                ? "All statuses"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          placeholder="From"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => {
            setDateTo(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          placeholder="To"
        />
      </div>

      {selected.size > 0 && (
        <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm">
          <span className="font-medium">{selected.size} selected</span>
          <button
            onClick={exportCSV}
            className="text-blue-700 font-medium hover:underline"
          >
            Export selected as CSV
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-gray-500 ml-auto"
          >
            Clear
          </button>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={
                    paginated.length > 0 && selected.size === paginated.length
                  }
                  onChange={toggleAll}
                  className="w-4 h-4"
                />
              </th>
              {[
                "Order",
                "Date",
                "Customer",
                "Items",
                "Total",
                "Payment",
                "Fulfillment",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-sm text-gray-500"
                >
                  Loading orders…
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-sm text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              paginated.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(o.id)}
                      onChange={() => toggleSelect(o.id)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="hover:underline"
                    >
                      {o.order_number
                        ? `#${o.order_number}`
                        : `#${o.id.slice(0, 8)}`}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {o.customer_name || o.email.split("@")[0]}
                    </div>
                    <div className="text-xs text-gray-500">{o.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {o.items_count ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    ${Number(o.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                      style={{
                        background:
                          (STATUS_COLORS[o.status] || "#6b7280") + "15",
                        color: STATUS_COLORS[o.status] || "#6b7280",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                      style={{
                        background:
                          (FULFILLMENT_COLORS[
                            o.fulfillment_status || "unfulfilled"
                          ] || "#6b7280") + "15",
                        color:
                          FULFILLMENT_COLORS[
                            o.fulfillment_status || "unfulfilled"
                          ] || "#6b7280",
                      }}
                    >
                      {o.fulfillment_status || "unfulfilled"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="text-gray-400 hover:text-gray-900"
                    >
                      →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {(page - 1) * PER_PAGE + 1}–
            {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
