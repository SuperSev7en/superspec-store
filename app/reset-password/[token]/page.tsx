"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { loginSuccess } from "@/lib/toast";

function PasswordStrength({ password }: { password: string }) {
  const score = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(
    (r) => r.test(password),
  ).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];
  return password.length > 0 ? (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= score ? colors[score] : "var(--border-color)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 12, color: colors[score] }}>
        {labels[score]}
      </span>
    </div>
  ) : null;
}

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params?.token as string;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Basic presence check — real validation happens server-side on submit
    setTokenValid(!!token && token.length === 64);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Invalid or expired link");
      setLoading(false);
      return;
    }

    loginSuccess();
    router.replace("/account/dashboard");
  };

  if (tokenValid === false) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h1 className="Heading u-h3" style={{ marginBottom: 16 }}>
            Invalid Reset Link
          </h1>
          <p className="Text--subdued" style={{ marginBottom: 24 }}>
            This reset link is invalid or has expired.
          </p>
          <Link href="/forgot-password" className="Button Button--primary">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "var(--background)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link
            href="/"
            className="Heading u-h2"
            style={{ textDecoration: "none" }}
          >
            SUPER Spec
          </Link>
          <p className="Text--subdued" style={{ marginTop: 8 }}>
            Set a new password
          </p>
        </div>

        <div
          style={{
            background: "var(--secondary-elements-background)",
            border: "1px solid var(--border-color)",
            borderRadius: 8,
            padding: 40,
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#dc2626",
                padding: "12px 16px",
                borderRadius: 6,
                marginBottom: 20,
                fontSize: 14,
              }}
            >
              {error}{" "}
              {error.includes("expired") && (
                <Link href="/forgot-password" className="Link Link--underline">
                  Request a new link
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label
                className="Heading u-h7"
                style={{ display: "block", marginBottom: 8 }}
              >
                New Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 18,
                    height: 18,
                    color: "var(--text-light-color)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="Form__Input"
                  style={{ paddingLeft: 40, paddingRight: 40 }}
                  required
                  minLength={8}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-light-color)",
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: 18, height: 18 }} />
                  ) : (
                    <Eye style={{ width: 18, height: 18 }} />
                  )}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label
                className="Heading u-h7"
                style={{ display: "block", marginBottom: 8 }}
              >
                Confirm New Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 18,
                    height: 18,
                    color: "var(--text-light-color)",
                  }}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="Form__Input"
                  style={{ paddingLeft: 40 }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="Button Button--primary Button--full"
            >
              {loading ? "Updating…" : "Set New Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
