import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us | SUPER Spec.",
  description:
    "About SUPER Spec. — love, diversity, and individuality through light and color.",
};

export default function AboutPage() {
  return (
    <div className="Page">
      {/* 1. Hero */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <div className="Container">
          <h1
            className="Heading u-h1"
            style={{ fontSize: "3.5rem", letterSpacing: "0.1em" }}
          >
            We Are SUPER Spec.
          </h1>
        </div>
      </section>

      <div className="Container">
        {/* 2. Mission */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto 80px",
            textAlign: "center",
            fontSize: "1.2rem",
            lineHeight: "1.8",
          }}
        >
          <p className="Text--subdued">
            At SUPER Spec. we are dedicated to celebrating love, diversity, and
            individuality through the transformative power of light and color.
            Our mission is to unite a global family of SUPER humans by fostering
            knowledge, understanding, and appreciation for all aspects of life.
          </p>
        </div>

        {/* 3. Division Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "80px",
          }}
        >
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              background: "var(--secondary-elements-background)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>👕</div>
            <h3 className="Heading u-h4" style={{ marginBottom: "15px" }}>
              SUPER Speck
            </h3>
            <p className="Text--subdued" style={{ fontSize: "0.95rem" }}>
              Defining uniqueness through clothing and accessories. A vibrant
              palette inspired by the full spectrum of self-expression.
            </p>
          </div>

          <div
            style={{
              padding: "40px",
              textAlign: "center",
              background: "var(--secondary-elements-background)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🎨</div>
            <h3 className="Heading u-h4" style={{ marginBottom: "15px" }}>
              SUPER Spectrum
            </h3>
            <p className="Text--subdued" style={{ fontSize: "0.95rem" }}>
              Expanding perceptions through the arts. Unveiling the mystical and
              exploring the unknown beyond the visible spectrum.
            </p>
          </div>

          <div
            style={{
              padding: "40px",
              textAlign: "center",
              position: "relative",
              background: "var(--secondary-elements-background)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "var(--link-color)",
                color: "#000",
                padding: "4px 8px",
                fontSize: "10px",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              COMING SOON
            </span>
            <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>⚙️</div>
            <h3 className="Heading u-h4" style={{ marginBottom: "15px" }}>
              SUPER Specification
            </h3>
            <p className="Text--subdued" style={{ fontSize: "0.95rem" }}>
              Precision engineering for everyday life. High-quality products
              designed with thoughtful and innovative solutions.
            </p>
          </div>
        </div>

        {/* 4. Values */}
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "60px",
            paddingBottom: "60px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            <div style={{ flex: "1 1 200px" }}>
              <h4 className="Heading u-h6" style={{ marginBottom: "10px" }}>
                Quality Without Compromise
              </h4>
              <p className="Text--subdued" style={{ fontSize: "0.85rem" }}>
                Durable, high-quality items at fair prices.
              </p>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <h4 className="Heading u-h6" style={{ marginBottom: "10px" }}>
                Diversity & Individuality
              </h4>
              <p className="Text--subdued" style={{ fontSize: "0.85rem" }}>
                Promoting a collective force of unique voices.
              </p>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <h4 className="Heading u-h6" style={{ marginBottom: "10px" }}>
                Positive Impact
              </h4>
              <p className="Text--subdued" style={{ fontSize: "0.85rem" }}>
                Ensuring our influence on the universe is a positive one.
              </p>
            </div>
          </div>
        </div>

        {/* 5. CTA */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <Link
            href="/products"
            className="Button Button--primary"
            style={{ padding: "16px 40px" }}
          >
            Explore the Spectrum
          </Link>
        </div>
      </div>
    </div>
  );
}
