'use client';

import { useState } from 'react';
import { Icon } from '@/components/shopify/icons/Icon';

type Item = { q: string; aHtml: string };

export function FaqAccordion({
  items,
  initialOpenIndex = 0,
}: {
  items: Item[];
  /** `null` = all collapsed */
  initialOpenIndex?: number | null;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(initialOpenIndex ?? null);

  return (
    <div className="Faq">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div
            key={i}
            className={`Faq__Item ${i === items.length - 1 ? 'Faq__Item--lastOfSection' : ''}`.trim()}
            aria-expanded={open}
          >
            <span className="Faq__Icon">
              <Icon icon="select-arrow" />
            </span>
            <div className="Faq__ItemWrapper">
              <button
                type="button"
                className="Faq__Question"
                onClick={() => setOpenIdx((prev) => (prev === i ? null : i))}
              >
                {item.q}
              </button>
              <div className="Faq__AnswerWrapper" aria-hidden={!open} hidden={!open}>
                <div className="Faq__Answer Rte" dangerouslySetInnerHTML={{ __html: item.aHtml }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

