"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Variant = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  inventory: number;
  weight?: number;
};

type ProductForm = {
  title: string;
  handle: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string;
  published: boolean;
  status: "active" | "draft";
  seoTitle: string;
  seoDescription: string;
};

const EMPTY_VARIANT: Variant = {
  id: "",
  title: "Default",
  price: 0,
  inventory: 0,
};
const PRODUCT_TYPES = [
  "Clothing",
  "Art Print",
  "Engineered",
  "Accessory",
  "Other",
];

export default function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    handle: "",
    descriptionHtml: "",
    vendor: "SUPER Spec",
    productType: "",
    tags: "",
    published: false,
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  });
  const [variants, setVariants] = useState<Variant[]>([
    { ...EMPTY_VARIANT, id: "default" },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Mock — in production, fetch from supabase
    setForm({
      title: "SUPER Spec Logo Tee",
      handle: "logo-tee",
      descriptionHtml:
        "<p>Premium cotton tee with the SUPER Spec logo. Made to last.</p>",
      vendor: "SUPER Spec",
      productType: "Clothing",
      tags: "clothing, tee, logo",
      published: true,
      status: "active",
      seoTitle: "SUPER Spec Logo Tee",
      seoDescription: "Premium logo tee",
    });
    setVariants([
      {
        id: "v1",
        title: "Black / S",
        price: 85,
        compareAtPrice: undefined,
        sku: "SS-LT-BK-S",
        inventory: 24,
      },
      {
        id: "v2",
        title: "Black / M",
        price: 85,
        compareAtPrice: undefined,
        sku: "SS-LT-BK-M",
        inventory: 3,
      },
      {
        id: "v3",
        title: "Black / L",
        price: 85,
        compareAtPrice: undefined,
        sku: "SS-LT-BK-L",
        inventory: 0,
      },
    ]);
    setLoading(false);
  }, [id]);

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    setSaving(true);
    // In production: PATCH /api/admin/products/:id
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Product saved");
    setSaving(false);
  };

  const addVariant = () =>
    setVariants((prev) => [
      ...prev,
      { ...EMPTY_VARIANT, id: Date.now().toString(), title: "" },
    ]);
  const removeVariant = (vid: string) =>
    setVariants((prev) => prev.filter((v) => v.id !== vid));
  const updateVariant = (vid: string, key: keyof Variant, value: any) =>
    setVariants((prev) =>
      prev.map((v) => (v.id === vid ? { ...v, [key]: value } : v)),
    );

  if (loading) return <div className="text-sm text-gray-500">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" /> Products
        </Link>
        <div className="flex gap-3">
          <a
            href={`/products/${form.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 inline-flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Handle
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">/products/</span>
                <input
                  type="text"
                  value={form.handle}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, handle: slugify(e.target.value) }))
                  }
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (HTML)
              </label>
              <textarea
                value={form.descriptionHtml}
                onChange={(e) =>
                  setForm((p) => ({ ...p, descriptionHtml: e.target.value }))
                }
                rows={8}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                Swap for TipTap rich-text editor in production.
              </p>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Media</h3>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setImages((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="absolute top-2 right-2 bg-white/90 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Add image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      setImages((prev) => [...prev, URL.createObjectURL(file)]);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Variants</h3>
              <button
                onClick={addVariant}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-3 h-3" /> Add Variant
              </button>
            </div>
            <div className="space-y-3">
              {variants.map((v) => (
                <div
                  key={v.id}
                  className="grid grid-cols-12 gap-3 items-end border border-gray-100 rounded-lg p-3"
                >
                  <div className="col-span-1 flex items-center">
                    <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">
                      Title
                    </label>
                    <input
                      type="text"
                      value={v.title}
                      onChange={(e) =>
                        updateVariant(v.id, "title", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={v.price}
                      onChange={(e) =>
                        updateVariant(
                          v.id,
                          "price",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">
                      Compare at
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={v.compareAtPrice ?? ""}
                      onChange={(e) =>
                        updateVariant(
                          v.id,
                          "compareAtPrice",
                          parseFloat(e.target.value) || undefined,
                        )
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"
                      placeholder="—"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={v.sku ?? ""}
                      onChange={(e) =>
                        updateVariant(v.id, "sku", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm font-mono"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={v.inventory}
                      onChange={(e) =>
                        updateVariant(
                          v.id,
                          "inventory",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-center"
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    {variants.length > 1 && (
                      <button
                        onClick={() => removeVariant(v.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">SEO</h3>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, seoTitle: e.target.value }))
                }
                maxLength={60}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.seoTitle.length}/60
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Meta Description
              </label>
              <textarea
                value={form.seoDescription}
                onChange={(e) =>
                  setForm((p) => ({ ...p, seoDescription: e.target.value }))
                }
                maxLength={160}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.seoDescription.length}/160
              </p>
            </div>
            {/* Preview */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="text-xs text-gray-500 mb-1">Google Preview</div>
              <div className="text-blue-700 text-sm font-medium truncate">
                {form.seoTitle || form.title}
              </div>
              <div className="text-green-700 text-xs truncate">
                superspec.studio/products/{form.handle}
              </div>
              <div className="text-gray-600 text-xs mt-1 line-clamp-2">
                {form.seoDescription ||
                  form.descriptionHtml.replace(/<[^>]+>/g, "").slice(0, 160)}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Status</h3>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value as any }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm((p) => ({ ...p, published: e.target.checked }))
                }
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">
                Published to storefront
              </span>
            </label>
          </div>

          {/* Organization */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Organization
            </h3>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Product Type
              </label>
              <select
                value={form.productType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, productType: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select type…</option>
                {PRODUCT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Vendor
              </label>
              <input
                type="text"
                value={form.vendor}
                onChange={(e) =>
                  setForm((p) => ({ ...p, vendor: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                Tags
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tags: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white shadow rounded-lg p-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Inventory Summary
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Total variants</span>
                <span className="font-semibold">{variants.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total stock</span>
                <span className="font-semibold">
                  {variants.reduce((s, v) => s + v.inventory, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Out of stock</span>
                <span
                  className={`font-semibold ${variants.some((v) => v.inventory === 0) ? "text-red-600" : ""}`}
                >
                  {variants.filter((v) => v.inventory === 0).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
