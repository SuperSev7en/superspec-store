import { requireAdmin } from '@/lib/auth/requireAdmin';

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const { supabase } = await requireAdmin('/admin/customers');
  const { data: customers } = await supabase
    .from('customers')
    .select('id, email, name, created_at')
    .order('created_at', { ascending: false })
    .limit(500);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Shoppers created when they complete checkout. Use this list to recognize repeat buyers.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {(customers ?? []).length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-gray-500">
                  No customers yet. They appear here after the first successful Stripe checkout.
                </td>
              </tr>
            ) : (
              (customers ?? []).map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{c.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{c.name ?? '—'}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
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
