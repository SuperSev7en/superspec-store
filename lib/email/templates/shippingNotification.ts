export function shippingNotificationHtml({
  orderNumber,
  trackingNumber,
  carrier,
  trackingUrl,
}: {
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  trackingUrl: string;
}) {
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
      <h2 style="margin:0 0 10px;font-size:20px;color:#fff;">Your Order Has Shipped!</h2>
      <p style="margin:0;color:#999;font-size:14px;">Order ${orderNumber} is on its way.</p>
    </div>

    <div style="background:#111;border:1px solid #222;border-radius:8px;padding:30px;margin-bottom:30px;">
      <p style="margin:0 0 5px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Carrier</p>
      <p style="margin:0 0 20px;font-size:16px;">${carrier}</p>

      <p style="margin:0 0 5px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Tracking Number</p>
      <p style="margin:0 0 20px;font-size:16px;font-weight:bold;color:#c3922e;">${trackingNumber}</p>

      <a href="${trackingUrl}" style="display:inline-block;padding:14px 30px;background:#c3922e;color:#000;text-decoration:none;border-radius:4px;font-weight:bold;font-size:14px;letter-spacing:1px;">
        TRACK YOUR PACKAGE
      </a>
    </div>

    <div style="text-align:center;margin-top:30px;">
      <p style="color:#666;font-size:11px;">&copy; SUPER Spec. | superspec.studio</p>
    </div>
  </div>
</body>
</html>`;
}
