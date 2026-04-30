"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  newsletter?: boolean;
};

export default function AccountProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [newsletter, setNewsletter] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setUser(d.user);
          setForm({
            firstName: d.user.firstName || "",
            lastName: d.user.lastName || "",
            email: d.user.email,
          });
          setNewsletter(d.user.newsletter || false);
        }
      });
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production, call PATCH /api/auth/me
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Profile updated successfully");
    setLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    // In production, call POST /api/auth/change-password
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Password changed successfully");
    setPwForm({ current: "", newPw: "", confirm: "" });
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }
    // In production, call DELETE /api/auth/me
    toast.success("Account deleted. Goodbye.");
    setShowDeleteModal(false);
  };

  if (!user) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        maxWidth: 600,
      }}
    >
      <h1 className="Heading u-h2">Profile Settings</h1>

      {/* Profile Info */}
      <section
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>
          Personal Information
        </h2>
        <form
          onSubmit={handleProfileSave}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div>
            <label
              className="Heading u-h7"
              style={{ display: "block", marginBottom: 6 }}
            >
              First Name
            </label>
            <input
              type="text"
              className="Form__Input"
              value={form.firstName}
              onChange={(e) =>
                setForm((p) => ({ ...p, firstName: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label
              className="Heading u-h7"
              style={{ display: "block", marginBottom: 6 }}
            >
              Last Name
            </label>
            <input
              type="text"
              className="Form__Input"
              value={form.lastName}
              onChange={(e) =>
                setForm((p) => ({ ...p, lastName: e.target.value }))
              }
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label
              className="Heading u-h7"
              style={{ display: "block", marginBottom: 6 }}
            >
              Email
            </label>
            <input
              type="email"
              className="Form__Input"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              required
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              <span className="Text--subdued">Subscribe to newsletter</span>
            </label>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              className="Button Button--primary"
              disabled={loading}
            >
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Change Password */}
      <section
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>
          Change Password
        </h2>
        <form
          onSubmit={handlePasswordChange}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div>
            <label
              className="Heading u-h7"
              style={{ display: "block", marginBottom: 6 }}
            >
              Current Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showCurrentPw ? "text" : "password"}
                className="Form__Input"
                value={pwForm.current}
                onChange={(e) =>
                  setPwForm((p) => ({ ...p, current: e.target.value }))
                }
                required
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
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
                {showCurrentPw ? (
                  <EyeOff style={{ width: 16, height: 16 }} />
                ) : (
                  <Eye style={{ width: 16, height: 16 }} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              className="Heading u-h7"
              style={{ display: "block", marginBottom: 6 }}
            >
              New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showNewPw ? "text" : "password"}
                className="Form__Input"
                value={pwForm.newPw}
                onChange={(e) =>
                  setPwForm((p) => ({ ...p, newPw: e.target.value }))
                }
                required
                minLength={8}
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
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
                {showNewPw ? (
                  <EyeOff style={{ width: 16, height: 16 }} />
                ) : (
                  <Eye style={{ width: 16, height: 16 }} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              className="Heading u-h7"
              style={{ display: "block", marginBottom: 6 }}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              className="Form__Input"
              value={pwForm.confirm}
              onChange={(e) =>
                setPwForm((p) => ({ ...p, confirm: e.target.value }))
              }
              required
            />
          </div>
          <button
            type="submit"
            className="Button Button--primary"
            style={{ alignSelf: "flex-start" }}
            disabled={loading}
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </section>

      {/* Danger Zone */}
      <section
        style={{ border: "1px solid #fca5a5", borderRadius: 8, padding: 28 }}
      >
        <h2
          className="Heading u-h4"
          style={{ marginBottom: 8, color: "#dc2626" }}
        >
          Danger Zone
        </h2>
        <p className="Text--subdued" style={{ marginBottom: 16, fontSize: 14 }}>
          Permanently delete your account and all associated data.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="Button"
          style={{
            background: "#dc2626",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <AlertTriangle style={{ width: 16, height: 16 }} /> Delete Account
        </button>
      </section>

      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "var(--background)",
              borderRadius: 8,
              padding: 32,
              maxWidth: 420,
              width: "100%",
            }}
          >
            <h3 className="Heading u-h4" style={{ marginBottom: 12 }}>
              Delete Account?
            </h3>
            <p
              className="Text--subdued"
              style={{ fontSize: 14, marginBottom: 20 }}
            >
              This action cannot be undone. All your orders, addresses and data
              will be permanently removed.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label
                className="Heading u-h7"
                style={{ display: "block", marginBottom: 8 }}
              >
                Enter your password to confirm
              </label>
              <input
                type="password"
                className="Form__Input"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleDeleteAccount}
                className="Button"
                style={{ background: "#dc2626", color: "#fff", flex: 1 }}
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="Button Button--secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
