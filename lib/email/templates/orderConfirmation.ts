export function orderConfirmationHtml({
  orderNumber,
  email,
  total,
  items,
  address,
  shippingMethod,
}: {
  orderNumber: string;
  email: string;
  total: number;
  items: { title: string; quantity: number; price: number; variantTitle?: string }[];
  address: { name: string; line1: string; city: string; state: string; zip: string };
  shippingMethod: string;
}) {
  const itemRows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #222;">${item.title}${item.variantTitle ? ` — ${item.variantTitle}` : ''}</td>
          <td style="padding:8px 0;border-bottom:1px solid #222;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #222;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#000;color:#fff;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:40px;">
      <h1 style="font-size:28px;letter-spacing:4px;margin:0;color:#c3922e;">SUPER Spec.</h1>
    </div>

    <div style="background:#111;border:1px solid #222;border-radius:8px;padding:30px;margin-bottom:30px;">
      <h2 style="margin:0 0 10px;font-size:20px;color:#fff;">Order Confirmed</h2>
      <p style="margin:0;color:#999;font-size:14px;">Thank you for your purchase!</p>
    </div>

    <div style="background:#111;border:1px solid #222;border-radius:8px;padding:30px;margin-bottom:30px;">
      <p style="margin:0 0 5px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Order Number</p>
      <p style="margin:0 0 20px;font-size:18px;font-weight:bold;color:#c3922e;">${orderNumber}</p>

      <table style="width:100%;border-collapse:collapse;color:#fff;font-size:14px;">
        <thead>
          <tr style="border-bottom:1px solid #333;">
            <th style="text-align:left;padding:8px 0;color:#999;">Item</th>
            <th style="text-align:center;padding:8px 0;color:#999;">Qty</th>
            <th style="text-align:right;padding:8px 0;color:#999;">Price</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div style="margin-top:20px;padding-top:15px;border-top:1px solid #333;text-align:right;">
        <span style="font-size:18px;font-weight:bold;color:#c3922e;">Total: $${total.toFixed(2)}</span>
      </div>
    </div>

    <div style="background:#111;border:1px solid #222;border-radius:8px;padding:30px;margin-bottom:30px;">
      <h3 style="margin:0 0 15px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#999;">Shipping To</h3>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        ${address.name}<br>
        ${address.line1}<br>
        ${address.city}, ${address.state} ${address.zip}
      </p>
      <p style="margin:15px 0 0;font-size:13px;color:#999;">
        Method: ${shippingMethod === 'express' ? 'Express (2-3 business days)' : 'Standard (5-7 business days)'}
      </p>
    </div>

    <div style="text-align:center;margin-top:30px;">
      <p style="color:#999;font-size:12px;">You'll receive a shipping confirmation email with tracking info once your order ships.</p>
      <p style="color:#666;font-size:11px;margin-top:20px;">&copy; SUPER Spec. | superspec.studio</p>
    </div>
  </div>
</body>
</html>`;
}
