import type { Metadata } from "next";
import { ContactForm } from "@/components/store/ContactForm";

export const metadata: Metadata = {
  title: "Contact | SUPER Spec.",
  description:
    "Contact SUPER Spec. — customer service, sales, and general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="Page">
      {/* 1. Hero */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "60px",
        }}
      >
        <div className="Container">
          <h1 className="Heading u-h1">Get In Touch</h1>
          <p className="Text--subdued" style={{ marginTop: "10px" }}>
            We're here to help with any questions about our products or your
            order.
          </p>
        </div>
      </section>

      <div className="Container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "50px",
            marginBottom: "100px",
          }}
        >
          {/* 2. Contact Info Card */}
          <div
            style={{
              padding: "40px",
              background: "var(--secondary-elements-background)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
            }}
          >
            <h2 className="Heading u-h3" style={{ marginBottom: "30px" }}>
              Contact Information
            </h2>

            <div style={{ marginBottom: "25px" }}>
              <h4
                className="Heading u-h6"
                style={{ marginBottom: "5px", opacity: 0.6 }}
              >
                Customer Service
              </h4>
              <p>
                <a
                  href="mailto:service@superspec.studio"
                  className="Link Link--primary"
                >
                  service@superspec.studio
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h4
                className="Heading u-h6"
                style={{ marginBottom: "5px", opacity: 0.6 }}
              >
                Business Inquiries
              </h4>
              <p>
                <a
                  href="mailto:sales@superspec.studio"
                  className="Link Link--primary"
                >
                  sales@superspec.studio
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h4
                className="Heading u-h6"
                style={{ marginBottom: "5px", opacity: 0.6 }}
              >
                General Questions
              </h4>
              <p>
                <a
                  href="mailto:info@superspec.studio"
                  className="Link Link--primary"
                >
                  info@superspec.studio
                </a>
              </p>
            </div>

            <div
              style={{
                marginTop: "40px",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "20px",
              }}
            >
              <h4
                className="Heading u-h6"
                style={{ marginBottom: "5px", opacity: 0.6 }}
              >
                Operating Hours
              </h4>
              <p className="Text--subdued">10 am – 5 pm, Monday – Friday</p>
            </div>
          </div>

          {/* 3. Contact Form Card */}
          <div
            style={{
              padding: "40px",
              background: "var(--secondary-elements-background)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
            }}
          >
            <h2 className="Heading u-h3" style={{ marginBottom: "30px" }}>
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
