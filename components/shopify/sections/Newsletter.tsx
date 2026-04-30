'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export function Newsletter({
  id,
  settings,
}: {
  id: string;
  settings: Record<string, unknown>;
}) {
  const title = typeof settings.title === 'string' ? settings.title : 'Subscribe';
  const content = typeof settings.content === 'string' ? settings.content : '';
  const buttonText = typeof settings.button_text === 'string' ? settings.button_text : 'Subscribe';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail('');
      toast.success('Successfully subscribed to the newsletter!');
    }, 800);
  };

  return (
    <section id={`section-${id}`} data-section-id={id} data-section-type="newsletter">
      <div className="Newsletter" style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--secondary-elements-background)' }}>
        <div className="Container Container--narrow">
          <header className="SectionHeader SectionHeader--center">
            {title ? <h2 className="SectionHeader__Heading Heading u-h1">{title}</h2> : null}
            {content ? (
              <div 
                className="SectionHeader__SubHeading Rte" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : null}
          </header>

          <form onSubmit={handleSubmit} className="Newsletter__Form Form Form--spacingTight" style={{ marginTop: 24, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input 
              type="email" 
              name="email" 
              className="Form__Input" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ maxWidth: 350, flex: 1 }}
            />
            <button type="submit" className="Button Button--primary" disabled={loading}>
              {loading ? '...' : buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
