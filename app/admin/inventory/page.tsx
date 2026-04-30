"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

type InventoryRow = {
  id: string;
  handle: string;
  title: string;
  variantTitle: string;
  price: number;
  inventory: number;
  threshold: number;
};

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryRow[]>([
    {
      id: "1",
      handle: "logo-tee",
      title: "SUPER Spec Logo Tee",
      variantTitle: "Black / S",
      price: 85,
      inventory: 24,
      threshold: 5,
    },
    {
      id: "2",
      handle: "logo-tee",
      title: "SUPER Spec Logo Tee",
      variantTitle: "Black / M",
      price: 85,
      inventory: 3,
      threshold: 5,
    },
    {
      id: "3",
      handle: "logo-tee",
      title: "SUPER Spec Logo Tee",
      variantTitle: "Black / L",
      price: 85,
      inventory: 0,
      threshold: 5,
    },
    {
      id: "4",
      handle: "spectrum-print-001",
      title: "Spectrum Print 001",
      variantTitle: '18×24"',
      price: 75,
      inventory: 15,
      threshold: 3,
    },
    {
      id: "5",
      handle: "bracket-v2",
      title: "Precision Bracket V2",
      variantTitle: "Default",
      price: 290,
      inventory: 8,
      threshold: 2,
    },
  ]);
  const [search, setSearch] = useState("");

  const adjust = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.max(0, item.inventory + delta);
        toast.success(
          `${item.title} — ${item.variantTitle}: ${newQty} in stock`,
        );
        return { ...item, inventory: newQty };
      }),
    );
    // In production: call PATCH /api/admin/inventory/:id
  };

  const updateThreshold = (id: string, value: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, threshold: value } : item,
      ),
    );
  };

  const filtered = items.filter(
    (i) =>
      search === "" ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.variantTitle.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
        <span className="text-sm text-gray-500">
          {items.filter((i) => i.inventory <= i.threshold).length} variants low
          stock
        </span>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search variants…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Product",
                "Variant",
                "Price",
                "Stock",
                "Adjust",
                "Low Stock Alert",
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
            {filtered.map((item) => {
              const isLow = item.inventory <= item.threshold;
              return (
                <tr key={item.id} className={isLow ? "bg-red-50" : undefined}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.variantTitle}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-bold ${item.inventory === 0 ? "text-red-600" : isLow ? "text-amber-600" : "text-gray-900"}`}
                    >
                      {item.inventory}
                    </span>
                    {item.inventory === 0 && (
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                        Out
                      </span>
                    )}
                    {isLow && item.inventory > 0 && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                        Low
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjust(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => adjust(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={item.threshold}
                      onChange={(e) =>
                        updateThreshold(item.id, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-center"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
