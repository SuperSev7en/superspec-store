import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mission & Sustainability | SUPER Spec.",
  description:
    "SUPER Spec. commitment to sustainable operations and positive impact.",
};

export default function MissionAndSustainabilityPage() {
  return (
    <div className="Page">
      {/* 1. Headline Section */}
      <section
        className="MissionHeader"
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "var(--secondary-background, #f9f9f9)",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "60px",
        }}
      >
        <div className="Container">
          <h1
            className="Heading u-h1"
            style={{ color: "var(--button-background)", marginBottom: "20px" }}
          >
            Commitment to Impact
          </h1>
          <p
            className="Text--subdued"
            style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}
          >
            At SUPER Spec. we are committed to conducting all our operations
            sustainably, minimizing environmental impact while maximizing social
            good.
          </p>
        </div>
      </section>

      <div className="Container">
        {/* 2. Commitment Blocks */}
        <div
          className="MissionBlocks"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            marginBottom: "80px",
          }}
        >
          <div className="MissionBlock" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>♻️</div>
            <h3 className="Heading u-h4" style={{ marginBottom: "15px" }}>
              Sustainable Packaging
            </h3>
            <p
              className="Text--subdued"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              We actively reduce plastic usage in our daily activities, opting
              for 100% compostable materials in most of our packaging to ensure
              a circular lifecycle.
            </p>
          </div>

          <div className="MissionBlock" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🤝</div>
            <h3 className="Heading u-h4" style={{ marginBottom: "15px" }}>
              Community Support
            </h3>
            <p
              className="Text--subdued"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              We pledge to give back to our customers and support communities in
              need, fostering a global family that grows together through shared
              success.
            </p>
          </div>

          <div className="MissionBlock" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🌱</div>
            <h3 className="Heading u-h4" style={{ marginBottom: "15px" }}>
              Environmental Partners
            </h3>
            <p
              className="Text--subdued"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              Partnering with environmental organizations and promoting youth
              activism annually to drive positive change and shape a brighter
              future for the next generation.
            </p>
          </div>
        </div>

        {/* 3. Quote Block */}
        <div
          className="MissionQuote text-backdrop"
          style={{
            padding: "60px 40px",
            textAlign: "center",
            marginBottom: "80px",
            maxWidth: "900px",
            margin: "0 auto 80px",
          }}
        >
          <blockquote style={{ margin: 0 }}>
            <p
              className="Heading u-h2"
              style={{
                fontStyle: "italic",
                lineHeight: "1.4",
                color: "var(--text-color)",
              }}
            >
              "We understand that every action, big or small, affects our world.
              We are dedicated to making a positive impact on all scales."
            </p>
          </blockquote>
        </div>

        {/* 4. CTA */}
        <div
          className="MissionCTA"
          style={{ textAlign: "center", marginBottom: "100px" }}
        >
          <Link
            href="/products"
            className="Button Button--primary"
            style={{ padding: "16px 40px" }}
          >
            Learn More About Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}
