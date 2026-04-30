import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="Container"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="EmptyState">
        <div className="Container">
          <h1 className="EmptyState__Title Heading u-h1">
            404 - Page Not Found
          </h1>
          <p className="EmptyState__Description Text--subdued">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="EmptyState__Action Button Button--primary"
            style={{ marginTop: "24px" }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
