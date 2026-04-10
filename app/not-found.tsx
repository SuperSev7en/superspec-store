import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="Container" style={{ padding: '48px 0', textAlign: 'center' }}>
      <h1 className="Heading u-h1">Page not found</h1>
      <p className="Text--subdued" style={{ marginTop: 16 }}>
        The page you are looking for does not exist.
      </p>
      <p style={{ marginTop: 24 }}>
        <Link href="/" className="Button Button--primary">
          Back to home
        </Link>
      </p>
    </div>
  );
}
