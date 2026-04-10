import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/store/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about SUPER Spec.',
};

const FAQ_ITEMS: { q: string; aHtml: string }[] = [
  {
    q: 'How do I contact customer service?',
    aHtml: '<p>Email <a href="mailto:service@superspec.store">service@superspec.store</a> or use the form on our <a href="/contact">Contact</a> page. Include your order number when applicable.</p>',
  },
  {
    q: 'What are your operating hours?',
    aHtml: '<p>10 am – 5 pm, Monday – Friday.</p>',
  },
  {
    q: 'Where can I learn about shipping and returns?',
    aHtml:
      '<p>Policies are shown at checkout and in order communications. For questions, reach out to customer service with your order number.</p>',
  },
  {
    q: 'Do you offer wholesale or business partnerships?',
    aHtml: '<p>Business inquiries: <a href="mailto:sales@superspec.store">sales@superspec.store</a>.</p>',
  },
];

export default function FaqPage() {
  return (
    <div className="Page">
      <div className="Container">
        <header className="PageHeader">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">FAQ</h1>
          </div>
        </header>
      </div>

      <section data-section-type="faq" data-section-id="static-faq">
        <div className="Container">
          <div className="PageContent PageContent--narrow">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>
    </div>
  );
}
