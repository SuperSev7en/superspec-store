import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderNumber?: string; email?: string }>;
}) {
  const { orderNumber, email } = await searchParams;

  return (
    <div className="Container" style={{ maxWidth: 800, padding: "80px 20px", textAlign: "center" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: "50%", 
          border: "2px solid var(--text-color)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          margin: "0 auto 30px"
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h1 className="Heading u-h1">Thank you for your order!</h1>
        <p className="Text--subdued" style={{ marginTop: 20, fontSize: 16 }}>
          Your order <strong>{orderNumber || "#XXXXXX"}</strong> has been placed successfully.
        </p>
        {email && (
          <p className="Text--subdued" style={{ marginTop: 10 }}>
            A confirmation email has been sent to <strong>{email}</strong>.
          </p>
        )}
      </div>

      <div style={{ 
        background: "var(--secondary-elements-background)", 
        padding: 40, 
        borderRadius: 12,
        marginBottom: 40
      }}>
        <h2 className="Heading u-h3" style={{ marginBottom: 20 }}>What&apos;s Next?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}>
          <div>
            <h3 className="Heading u-h6">Order Processing</h3>
            <p className="Text--subdued" style={{ fontSize: 14 }}>We&apos;re getting your items ready. You&apos;ll receive another email with a tracking number as soon as it ships.</p>
          </div>
          <div>
            <h3 className="Heading u-h6">Need Help?</h3>
            <p className="Text--subdued" style={{ fontSize: 14 }}>If you have any questions, feel free to contact us at <a href="mailto:service@superspec.studio" className="Link Link--underline">service@superspec.studio</a>.</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <Link href="/products" className="Button Button--primary" style={{ padding: "12px 40px" }}>
          Continue Shopping
        </Link>
        <Link href="/" className="Button Button--secondary" style={{ padding: "12px 40px" }}>
          Go to Home
        </Link>
      </div>

      {/* Guest logic: Optional account creation nudge */}
      {!orderNumber?.startsWith("USR-") && (
        <div style={{ marginTop: 60, borderTop: "1px solid var(--border-color)", paddingTop: 40 }}>
          <p className="Text--subdued" style={{ marginBottom: 20 }}>Want to track your orders and save your info for next time?</p>
          <Link href="/register" className="Link Link--underline Heading u-h6">Create an Account</Link>
        </div>
      )}
    </div>
  );
}
