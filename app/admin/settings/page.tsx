"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Save,
  Globe,
  Truck,
  DollarSign,
  Mail,
  Users,
  AlertTriangle,
} from "lucide-react";

const TABS = ["Store Info", "Shipping", "Tax", "Staff", "Danger Zone"] as const;
type Tab = (typeof TABS)[number];

const EMAIL_TEMPLATES = [
  { key: "order_confirmation", label: "Order Confirmation" },
  { key: "shipping_notification", label: "Shipping Notification" },
  { key: "refund", label: "Refund" },
  { key: "password_reset", label: "Password Reset" },
  { key: "review_request", label: "Review Request" },
  { key: "welcome", label: "Welcome Series" },
];

const VARIABLES = [
  "{{order_number}}",
  "{{customer_name}}",
  "{{customer_email}}",
  "{{product_name}}",
  "{{total}}",
  "{{tracking_number}}",
  "{{reset_link}}",
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Store Info");
  const [storeInfo, setStoreInfo] = useState({
    name: "SUPER Spec",
    email: "hello@superspec.studio",
    address: "123 Fulton St, New York, NY 10038",
    currency: "USD",
    timezone: "America/New_York",
  });
  const [selectedTemplate, setSelectedTemplate] = useState(
    EMAIL_TEMPLATES[0].key,
  );
  const [templateSubject, setTemplateSubject] = useState(
    "Order Confirmation — #{{order_number}}",
  );
  const [templateBody, setTemplateBody] = useState(
    "<h1>Your order is confirmed!</h1><p>Hi {{customer_name}}, thank you for your order #{{order_number}}.</p>",
  );
  const [previewMode, setPreviewMode] = useState(false);
  const [staffEmail, setStaffEmail] = useState("");

  const renderPreview = (html: string) =>
    html.replace(
      /{{(\w+)}}/g,
      (_, k) => `<em style="color:#2563eb">[${k}]</em>`,
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      {/* Tab Nav */}
      <div className="flex gap-0 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Store Info" && (
        <div className="bg-white shadow rounded-lg p-6 space-y-4 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5" /> Store Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Store Name", key: "name" },
              { label: "Contact Email", key: "email" },
              { label: "Currency", key: "currency" },
              { label: "Timezone", key: "timezone" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={(storeInfo as any)[key]}
                  onChange={(e) =>
                    setStoreInfo((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Address
              </label>
              <input
                type="text"
                value={storeInfo.address}
                onChange={(e) =>
                  setStoreInfo((p) => ({ ...p, address: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          <button
            onClick={() => toast.success("Store info saved")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>

          {/* Email Templates */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4" /> Email Templates
            </h3>
            <div className="flex gap-4 mb-4 flex-wrap">
              {EMAIL_TEMPLATES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedTemplate(t.key)}
                  className={`px-3 py-1.5 text-xs rounded-full font-medium ${selectedTemplate === t.key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={templateSubject}
                  onChange={(e) => setTemplateSubject(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-600">
                    HTML Body
                  </label>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="text-xs text-gray-500 hover:text-gray-900"
                  >
                    {previewMode ? "Edit" : "Preview"}
                  </button>
                </div>
                {previewMode ? (
                  <div
                    className="border border-gray-200 rounded-lg p-4 text-sm bg-white min-h-[160px]"
                    dangerouslySetInnerHTML={{
                      __html: renderPreview(templateBody),
                    }}
                  />
                ) : (
                  <textarea
                    value={templateBody}
                    onChange={(e) => setTemplateBody(e.target.value)}
                    rows={8}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Available variables:
                </p>
                <div className="flex flex-wrap gap-2">
                  {VARIABLES.map((v) => (
                    <code
                      key={v}
                      onClick={() => setTemplateBody((p) => p + v)}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-200"
                    >
                      {v}
                    </code>
                  ))}
                </div>
              </div>
              <button
                onClick={() => toast.success("Template saved")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
              >
                <Save className="w-4 h-4" /> Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Shipping" && (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5" /> Shipping Zones
          </h2>
          <div className="space-y-4">
            {[
              { zone: "Domestic (US)", free: 75, flat: 5.99 },
              { zone: "International", free: 150, flat: 24.99 },
            ].map((z) => (
              <div
                key={z.zone}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="font-medium text-sm text-gray-900 mb-3">
                  {z.zone}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Free shipping threshold ($)
                    </label>
                    <input
                      type="number"
                      defaultValue={z.free}
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Flat rate ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={z.flat}
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.success("Shipping zones saved")}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
          >
            <Save className="w-4 h-4" /> Save Zones
          </button>
        </div>
      )}

      {activeTab === "Tax" && (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5" /> Tax Rules
          </h2>
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-gray-700">
              Enable automatic tax calculation
            </span>
          </label>
          <p className="text-sm text-gray-500">
            For Stripe-based tax, enable <strong>automatic_tax</strong> in the
            checkout session and configure your Stripe Tax settings in the
            Stripe Dashboard.
          </p>
        </div>
      )}

      {activeTab === "Staff" && (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" /> Staff Accounts
          </h2>
          <div className="flex gap-3 mb-6">
            <input
              type="email"
              placeholder="colleague@example.com"
              value={staffEmail}
              onChange={(e) => setStaffEmail(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              onClick={() => {
                if (staffEmail) {
                  toast.success(`Invite sent to ${staffEmail}`);
                  setStaffEmail("");
                }
              }}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
            >
              Invite
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  You (Owner)
                </div>
                <div className="text-xs text-gray-500">
                  hello@superspec.studio
                </div>
              </div>
              <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Danger Zone" && (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl border border-red-200 space-y-4">
          <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h2>
          <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">
                Clear Cache
              </div>
              <div className="text-xs text-gray-500">
                Forces a full cache invalidation on the CDN
              </div>
            </div>
            <button
              onClick={() => toast.success("Cache cleared")}
              className="px-3 py-1.5 border border-gray-200 text-sm rounded-lg hover:bg-gray-50"
            >
              Clear Cache
            </button>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">
                Export All Data
              </div>
              <div className="text-xs text-gray-500">
                Download a full JSON export of orders, products, and customers
              </div>
            </div>
            <button
              onClick={() => toast.success("Export started — check your email")}
              className="px-3 py-1.5 border border-gray-200 text-sm rounded-lg hover:bg-gray-50"
            >
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
