"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type Discount = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder?: number;
  usageLimit?: number;
  usageCount: number;
  startsAt?: string;
  endsAt?: string;
  active: boolean;
};

const EMPTY_FORM: Partial<Discount> = {
  code: "",
  type: "percentage",
  value: 10,
  minOrder: 0,
  usageLimit: undefined,
  active: true,
};

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: "1",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      usageCount: 23,
      usageLimit: undefined,
      active: true,
    },
    {
      id: "2",
      code: "SAVE20",
      type: "fixed",
      value: 20,
      minOrder: 100,
      usageCount: 5,
      usageLimit: 50,
      active: true,
    },
    {
      id: "3",
      code: "LAUNCH15",
      type: "percentage",
      value: 15,
      usageCount: 100,
      usageLimit: 100,
      active: false,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Discount>>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    setForm((p) => ({
      ...p,
      code: Array.from(
        { length: 8 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join(""),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === editId ? ({ ...d, ...form } as Discount) : d,
        ),
      );
      toast.success("Discount updated");
    } else {
      setDiscounts((prev) => [
        ...prev,
        { ...form, id: Date.now().toString(), usageCount: 0 } as Discount,
      ]);
      toast.success("Discount created");
    }
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditId(null);
  };

  const handleEdit = (d: Discount) => {
    setForm(d);
    setEditId(d.id);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
    toast("Discount deleted");
  };
  const toggleActive = (id: string) =>
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    );

  const STATUS_COLORS: Record<string, string> = {
    true: "#16a34a",
    false: "#6b7280",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Discounts</h1>
        <button
          onClick={() => {
            setForm(EMPTY_FORM);
            setEditId(null);
            setShowForm(!showForm);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
        >
          <Plus className="w-4 h-4" /> Create Discount
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            {editId ? "Edit Discount" : "New Discount"}
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.code || ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                  style={{ fontFamily: "monospace", letterSpacing: 2 }}
                />
                <button
                  type="button"
                  onClick={generateCode}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({ ...p, type: e.target.value as any }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {form.type === "percentage"
                  ? "Percentage Off"
                  : "Amount Off ($)"}
              </label>
              <input
                type="number"
                min={1}
                max={form.type === "percentage" ? 100 : 9999}
                value={form.value || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, value: Number(e.target.value) }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Order ($)
              </label>
              <input
                type="number"
                min={0}
                value={form.minOrder || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, minOrder: Number(e.target.value) }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                min={1}
                value={form.usageLimit || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    usageLimit: Number(e.target.value) || undefined,
                  }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date (optional)
              </label>
              <input
                type="date"
                value={form.startsAt || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, startsAt: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (optional)
              </label>
              <input
                type="date"
                value={form.endsAt || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, endsAt: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
              >
                {editId ? "Save Changes" : "Create Discount"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm(EMPTY_FORM);
                  setEditId(null);
                }}
                className="px-5 py-2 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Code",
                "Type",
                "Value",
                "Usage",
                "Status",
                "Expires",
                "Actions",
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
            {discounts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No discount codes yet
                </td>
              </tr>
            ) : (
              discounts.map((d) => (
                <tr key={d.id} className={!d.active ? "opacity-50" : undefined}>
                  <td className="px-4 py-3 font-mono font-semibold text-sm text-gray-900">
                    {d.code}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                    {d.type}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {d.type === "percentage" ? `${d.value}%` : `$${d.value}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {d.usageCount}
                    {d.usageLimit ? ` / ${d.usageLimit}` : ""}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      style={{
                        padding: "2px 10px",
                        borderRadius: 20,
                        background: d.active ? "#dcfce7" : "#f3f4f6",
                        color: d.active ? "#16a34a" : "#6b7280",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {d.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {d.endsAt || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(d)}
                        title="Edit"
                        className="text-gray-400 hover:text-gray-900"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleActive(d.id)}
                        title={d.active ? "Deactivate" : "Activate"}
                        className="text-gray-400 hover:text-gray-900"
                      >
                        {d.active ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
                        title="Delete"
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
