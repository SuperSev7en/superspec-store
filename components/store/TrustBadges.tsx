"use client";

import { ShieldCheck, RotateCcw, CreditCard } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "SSL Encrypted", sub: "Secure Checkout" },
  { icon: RotateCcw, label: "Free Returns", sub: "Within 30 days" },
  {
    icon: CreditCard,
    label: "Secure Payments",
    sub: "Visa, MC, Amex, Apple Pay",
  },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: compact ? 12 : 20,
        justifyContent: "center",
        alignItems: "center",
        padding: compact ? "12px 0" : "20px 0",
        borderTop: "1px solid var(--border-color)",
        marginTop: compact ? 16 : 24,
      }}
    >
      {BADGES.map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Icon
            style={{
              width: compact ? 16 : 20,
              height: compact ? 16 : 20,
              color: "var(--text-light-color)",
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: compact ? 11 : 13, fontWeight: 600 }}>
              {label}
            </div>
            {!compact && (
              <div className="Text--subdued" style={{ fontSize: 11 }}>
                {sub}
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Payment method icons */}
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          marginLeft: compact ? 0 : 8,
        }}
      >
        {["VISA", "MC", "AMEX", "🍎Pay"].map((name) => (
          <span
            key={name}
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 6px",
              border: "1px solid var(--border-color)",
              borderRadius: 3,
              color: "var(--text-light-color)",
              letterSpacing: 0.3,
              background: "var(--secondary-elements-background)",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReturnPolicyBadge() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}
    >
      <RotateCcw
        style={{ width: 15, height: 15, color: "var(--text-light-color)" }}
      />
      <span className="Text--subdued">Free returns within 30 days</span>
    </div>
  );
}
