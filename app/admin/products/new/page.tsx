import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export const revalidate = 0;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export default async function AdminNewProductPage() {
  const { supabase, user } = await requireAdmin("/admin/products/new");

  async function create(formData: FormData) {
    "use server";
    const title = String(formData.get("title") ?? "").trim();
    const handleRaw = String(formData.get("handle") ?? "").trim();
    const handle = handleRaw ? slugify(handleRaw) : slugify(title);
    if (!title || !handle) return;

    const { data, error } = await supabase
      .from("products")
      .insert({ title, handle, status: "draft", published: false })
      .select("id")
      .single();
    if (error || !data) return;

    await supabase.from("audit_log").insert({
      actor_user_id: user.id,
      entity_type: "product",
      entity_id: data.id,
      action: "create",
      before: null,
      after: { title, handle },
    } as any);

    redirect(`/admin/products/${data.id}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Add product</h1>

      <form
        action={create}
        className="bg-white shadow rounded-lg p-6 space-y-4 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            name="title"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Product title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Handle
          </label>
          <input
            name="handle"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="product-handle (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">
            If empty, generated from the title.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Create
        </button>
      </form>
    </div>
  );
}
