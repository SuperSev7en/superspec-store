"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  MapPin,
  User,
  ArrowRight,
  Clock,
} from "lucide-react";

type UserData = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
};
type Order = {
  id: string;
  order_number: string;
  total: number;
  status: string;
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

const QUICK_NAV = [
  {
    href: "/account/orders",
    label: "Orders",
    icon: ShoppingBag,
    desc: "Track & manage orders",
  },
  {
    href: "/account/wishlist",
    label: "Wishlist",
    icon: Heart,
    desc: "Your saved items",
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    icon: MapPin,
    desc: "Shipping addresses",
  },
  {
    href: "/account/profile",
    label: "Profile",
    icon: User,
    desc: "Account settings",
  },
];

export default function AccountDashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user));
    // Mock recent orders — replace with real fetch when orders table is populated
    setOrders([
      {
        id: "1",
        order_number: "SP-000001",
        total: 145.0,
        status: "shipped",
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        id: "2",
        order_number: "SP-000002",
        total: 89.5,
        status: "delivered",
        created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
      },
    ]);
  }, []);

  const firstName = user?.firstName || user?.email?.split("@")[0] || "there";

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 className="Heading u-h2" style={{ marginBottom: 4 }}>
          Welcome back, {firstName} 👋
        </h1>
        {user?.createdAt && (
          <p
            className="Text--subdued"
            style={{
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Clock style={{ width: 14, height: 14 }} />
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Quick Nav */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {QUICK_NAV.map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                padding: 20,
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--text-color)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--border-color)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <Icon style={{ width: 22, height: 22, marginBottom: 10 }} />
              <div className="Heading u-h6" style={{ marginBottom: 4 }}>
                {label}
              </div>
              <div className="Text--subdued" style={{ fontSize: 13 }}>
                {desc}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2 className="Heading u-h4">Recent Orders</h2>
          <Link
            href="/account/orders"
            className="Link Link--underline Text--subdued"
            style={{
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View all <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              border: "1px dashed var(--border-color)",
              borderRadius: 8,
            }}
          >
            <ShoppingBag
              style={{
                width: 32,
                height: 32,
                margin: "0 auto 12px",
                color: "var(--text-light-color)",
              }}
            />
            <p className="Text--subdued">No orders yet</p>
            <Link
              href="/"
              className="Button Button--primary"
              style={{ marginTop: 16 }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  padding: "16px 20px",
                }}
              >
                <div>
                  <div className="Heading u-h6" style={{ marginBottom: 4 }}>
                    #{order.order_number}
                  </div>
                  <div className="Text--subdued" style={{ fontSize: 13 }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    ${order.total.toFixed(2)}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background: STATUS_COLORS[order.status] + "20",
                      color: STATUS_COLORS[order.status],
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {order.status}
                  </span>
                  <Link
                    href={`/account/orders/${order.order_number}`}
                    className="Link Link--underline"
                    style={{ fontSize: 13 }}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
