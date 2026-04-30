"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Package } from "lucide-react";

type Order = {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  items_count?: number;
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

const STATUSES = ["all", "processing", "shipped", "delivered", "cancelled"];
const PER_PAGE = 10;

export default function AccountOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Mock — replace with real supabase fetch
    setOrders([
      {
        id: "1",
        order_number: "SP-000001",
        total: 145.0,
        status: "shipped",
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
        items_count: 2,
      },
      {
        id: "2",
        order_number: "SP-000002",
        total: 89.5,
        status: "delivered",
        created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
        items_count: 1,
      },
      {
        id: "3",
        order_number: "SP-000003",
        total: 220.0,
        status: "processing",
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
        items_count: 3,
      },
    ]);
  }, []);

  const filtered = orders.filter(
    (o) =>
      (statusFilter === "all" || o.status === statusFilter) &&
      (search === "" ||
        o.order_number.toLowerCase().includes(search.toLowerCase())),
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div>
      <h1 className="Heading u-h2" style={{ marginBottom: 24 }}>
        Your Orders
      </h1>

      {/* Filters */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
      >
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <Search
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 16,
              height: 16,
              color: "var(--text-light-color)",
            }}
          />
          <input
            type="text"
            placeholder="Search by order #"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="Form__Input"
            style={{ paddingLeft: 36 }}
          />
        </div>
        <select
          className="Form__Input"
          style={{ flex: "0 0 auto" }}
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "all"
                ? "All statuses"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {paginated.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            border: "1px dashed var(--border-color)",
            borderRadius: 8,
          }}
        >
          <Package
            style={{
              width: 36,
              height: 36,
              margin: "0 auto 16px",
              color: "var(--text-light-color)",
            }}
          />
          <p className="Text--subdued">No orders found</p>
        </div>
      ) : (
        <>
          <div
            style={{
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid var(--border-color)",
                    background: "var(--secondary-elements-background)",
                  }}
                >
                  {["Order", "Date", "Items", "Total", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "var(--text-light-color)",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {paginated.map((order) => (
                  <tr
                    key={order.id}
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      #{order.order_number}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        color: "var(--text-light-color)",
                      }}
                    >
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        color: "var(--text-light-color)",
                      }}
                    >
                      {order.items_count ?? "—"}
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      ${order.total.toFixed(2)}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 20,
                          background:
                            (STATUS_COLORS[order.status] || "#6b7280") + "20",
                          color: STATUS_COLORS[order.status] || "#6b7280",
                          fontWeight: 600,
                          fontSize: 12,
                          textTransform: "capitalize",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <Link
                        href={`/account/orders/${order.order_number}`}
                        className="Link Link--underline"
                        style={{ fontSize: 13 }}
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 24,
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={
                    p === page
                      ? "Button Button--primary"
                      : "Button Button--secondary"
                  }
                  style={{ minWidth: 36, padding: "6px 12px", fontSize: 13 }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
