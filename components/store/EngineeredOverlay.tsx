'use client';

import { useState } from 'react';
import type { DbProduct } from '@/lib/catalog/supabaseCatalog';
import { toast } from 'sonner';

export function EngineeredOverlay({ 
  product, 
  selectedVariantId, 
  onVariantChange 
}: { 
  product: DbProduct;
  selectedVariantId?: string;
  onVariantChange: (id: string) => void;
}) {
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  // @ts-ignore
  const technicalSpecs = product.metafields?.technical_specs || {
    "Material": "6061 Aerospace Aluminum",
    "Weight": "142g",
    "Tolerance": "±0.005mm",
    "Finish": "Type III Hard Anodized",
    "Dimensions": "14cm x 4cm x 2cm"
  };

  // @ts-ignore
  const leadTime = product.metafields?.lead_time || "Ships in 5-7 business days";
  // @ts-ignore
  const compatibility = product.metafields?.compatibility_notes || "Compatible with all standard 1/4\"-20 mounting systems.";
  // @ts-ignore
  const specSheetUrl = product.metafields?.spec_sheet_url || '/assets/dummy-spec-sheet.pdf';
  
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your question has been sent. We will reply within 24 hours.');
    setShowQuestionForm(false);
  };
  
  return (
    <div className="EngineeredOverlay">
      
      {/* Materials Callout & Lead Time */}
      <div style={{ marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, padding: 16, background: 'var(--secondary-elements-background)', borderRadius: 4 }}>
          <h4 className="Heading u-h7" style={{ marginBottom: 8 }}>Material Highlight</h4>
          <p className="Text--subdued" style={{ fontSize: 13, margin: 0 }}>Machined from solid billets of 6061 Aluminum for maximum strength-to-weight ratio.</p>
        </div>
        <div style={{ flex: 1, minWidth: 200, padding: 16, border: '1px solid var(--border-color)', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="Heading u-h7 text-green-600" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: '#16a34a', borderRadius: '50%' }}></span>
            Production Status
          </span>
          <p className="Text--subdued" style={{ fontSize: 13, margin: 0 }}>{leadTime}</p>
        </div>
      </div>

      {/* Tech Specs Table */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <h3 className="Heading u-h5" style={{ margin: 0 }}>Technical Specifications</h3>
          <button 
            onClick={() => window.open(specSheetUrl, '_blank')}
            className="Link Link--underline Text--subdued" 
            style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Spec Sheet
          </button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <tbody>
            {Object.entries(technicalSpecs).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 0', color: 'var(--text-light-color)', width: '40%' }}>{key}</td>
                <td style={{ padding: '10px 0', fontWeight: 500 }}>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compatibility Notes */}
      <div style={{ marginBottom: 24, padding: 12, background: '#f8fafc', borderLeft: '4px solid #94a3b8', fontSize: 13, color: '#334155' }}>
        <strong>Compatibility Note:</strong> {compatibility}
      </div>

      {/* Ask a Question */}
      <div style={{ marginBottom: 20 }}>
        <button 
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="Button Button--secondary"
          style={{ width: '100%', padding: '10px', fontSize: 14 }}
        >
          Have a technical question? Ask an engineer
        </button>

        {showQuestionForm && (
          <form onSubmit={handleAskQuestion} className="Form" style={{ marginTop: 16, padding: 20, border: '1px solid var(--border-color)', borderRadius: 4 }}>
            <div style={{ marginBottom: 12 }}>
              <input type="text" className="Form__Input" placeholder="Name" required />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input type="email" className="Form__Input" placeholder="Email" required />
            </div>
            <div style={{ marginBottom: 12 }}>
              <textarea className="Form__Input" rows={4} placeholder="What do you need to know about this product?" required></textarea>
            </div>
            <button type="submit" className="Button Button--primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        )}
      </div>

    </div>
  );
}
