import type { Metadata } from 'next';
import { StaticPageLayout } from '@/components/store/StaticPageLayout';
import { ContactForm } from '@/components/store/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SUPER Spec. — customer service, sales, and general inquiries.',
};

export default function ContactPage() {
  return (
    <div className="Page">
      <StaticPageLayout title="Contact us">
        <p>
          <strong>Customer service:</strong>{' '}
          <a href="mailto:service@superspec.store">service@superspec.store</a> — for help or use the form below (please
          include your order number when applicable).
        </p>
        <p>
          <strong>Business inquiries:</strong> <a href="mailto:sales@superspec.store">sales@superspec.store</a>
        </p>
        <p>
          <strong>Other questions:</strong> <a href="mailto:info@superspec.store">info@superspec.store</a>
        </p>
        <p>
          <strong>Operating hours:</strong> 10 am – 5 pm, Monday – Friday
        </p>
        <p style={{ marginTop: 24 }} />
        <ContactForm />
      </StaticPageLayout>
    </div>
  );
}
