"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            Something went wrong!
          </h1>
          <p className="EmptyState__Description Text--subdued">
            An unexpected error has occurred.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => reset()}
              className="EmptyState__Action Button Button--primary"
            >
              Try again
            </button>
            <Link
              href="/"
              className="EmptyState__Action Button Button--secondary"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
