import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/store/FaqAccordion';
import { FAQ_SECTIONS } from '@/lib/faqContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about SUPER Spec.',
};

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
            {FAQ_SECTIONS.map((section, i) => (
              <div key={section.heading} style={{ marginTop: i > 0 ? 48 : 0 }}>
                <h2 className="Faq__Section Heading u-h1" style={{ marginBottom: 24 }}>
                  {section.heading}
                </h2>
                <FaqAccordion items={section.items} initialOpenIndex={i === 0 ? 0 : null} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
