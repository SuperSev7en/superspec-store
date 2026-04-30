import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="Container">
      <header className="PageHeader">
        <h1 className="PageHeader__Title Heading u-h1">Checkout canceled</h1>
      </header>
      <div className="Section">
        <p className="Text--subdued">
          No charge was made. Your cart is unchanged.
        </p>
        <p style={{ marginTop: 16 }}>
          <Link href="/cart" className="Link Link--primary">
            Return to cart
          </Link>
          {" · "}
          <Link href="/products" className="Link Link--secondary">
            Browse products
          </Link>
        </p>
      </div>
    </div>
  );
}
