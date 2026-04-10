import { requireAdmin } from '@/lib/auth/requireAdmin';
import { FulfillmentForm } from '@/components/admin/FulfillmentForm';

export const revalidate = 0;

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin(`/admin/orders/${id}`);

  const { data: order } = await supabase
    .from('orders')
    .select('id, order_number, status, total, currency, created_at, stripe_session_id')
    .eq('id', id)
    .maybeSingle();

  const { data: items } = await supabase
    .from('order_items')
    .select('id, quantity, price, product_id, variant_id')
    .eq('order_id', id);

  const { data: fulfillments } = await supabase
    .from('fulfillments')
    .select('id, status, carrier, tracking_number, shipped_at, created_at')
    .eq('order_id', id)
    .order('created_at', { ascending: false });

  if (!order) return <div className="text-gray-700">Order not found.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {order.order_number ? `Order #${order.order_number}` : `Order #${order.id.slice(0, 8)}`}
        </h1>
        <div className="text-sm text-gray-500">
          Status: <span className="font-medium text-gray-800">{order.status}</span> · Total: {order.currency}{' '}
          {Number(order.total ?? 0).toFixed(2)}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Items</h2>
        {(items ?? []).length === 0 ? (
          <p className="text-sm text-gray-500">No items recorded.</p>
        ) : (
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {(items ?? []).map((it) => (
              <li key={it.id}>
                qty {it.quantity} · ${Number(it.price ?? 0).toFixed(2)} · product {String(it.product_id ?? '').slice(0, 8)}
              </li>
            ))}
          </ul>
        )}
        {order.stripe_session_id ? <div className="text-xs text-gray-500">Stripe session: {order.stripe_session_id}</div> : null}
      </div>

      <FulfillmentForm orderId={id} />

      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Fulfillments</h2>
        {(fulfillments ?? []).length === 0 ? (
          <p className="text-sm text-gray-500">No fulfillments yet.</p>
        ) : (
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {(fulfillments ?? []).map((f) => (
              <li key={f.id}>
                {f.status} · {f.carrier ?? '—'} · {f.tracking_number ?? '—'} ·{' '}
                {f.shipped_at ? new Date(f.shipped_at).toLocaleString() : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

