'use client';

import { useState } from 'react';
import type { DbProduct } from '@/lib/catalog/supabaseCatalog';
import { addToCart } from '@/components/store/cart';
import { toast } from 'sonner';

export function ArtOverlay({ 
  product, 
  selectedVariantId, 
  onVariantChange 
}: { 
  product: DbProduct;
  selectedVariantId?: string;
  onVariantChange: (id: string) => void;
}) {
  const [addFraming, setAddFraming] = useState(false);
  const [showStatement, setShowStatement] = useState(false);

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const stock = selectedVariant?.inventoryQuantity ?? 0;
  
  // Simulated Metafields
  const isDigital = product.tags.some(t => t.toLowerCase().includes('digital'));
  const isOriginal = product.tags.some(t => t.toLowerCase().includes('original'));
  
  // Override addToCart from ProductDetailBase via event intercept if framing is selected
  // In a real implementation, we would pass a customized handleAddToCart to the Base, 
  // but we can just use the global store state to push the frame when they click ATC on the base component.
  // We'll simulate it with a toast message.
  
  return (
    <div className="ArtOverlay">
      {/* Edition Badge */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--text-color)', color: 'var(--background)', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' }}>
          {isOriginal ? 'Original — 1 of 1' : `Limited Edition — ${stock > 0 ? stock : 0} of 50 remaining`}
        </span>
      </div>

      {/* Format Selector */}
      {product.variants.length > 1 && (
        <div style={{ marginBottom: 20 }}>
          <span className="Heading u-h6" style={{ display: 'block', marginBottom: 10 }}>Print Size</span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {product.variants.map(v => {
              const isSelected = v.id === selectedVariantId;
              return (
                <button
                  key={v.id}
                  onClick={() => onVariantChange(v.id)}
                  style={{
                    padding: '8px 16px',
                    border: isSelected ? '2px solid var(--text-color)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--text-color)' : 'transparent',
                    color: isSelected ? 'var(--background)' : 'var(--text-color)',
                    transition: 'all 0.2s',
                    fontSize: 14
                  }}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Framing Upsell */}
      {!isDigital && (
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 4, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12, background: addFraming ? 'var(--secondary-elements-background)' : 'transparent' }}>
          <input 
            type="checkbox" 
            id="framing-upsell" 
            checked={addFraming} 
            onChange={(e) => {
              setAddFraming(e.target.checked);
              if (e.target.checked) toast('Framing will be added to your order');
            }}
            style={{ marginTop: 4, width: 18, height: 18 }}
          />
          <div>
            <label htmlFor="framing-upsell" className="Heading u-h6" style={{ display: 'block', cursor: 'pointer' }}>Add custom framing (+$45)</label>
            <p className="Text--subdued" style={{ fontSize: 13, margin: '4px 0 0' }}>Museum-quality matte black gallery frame with UV-protective acrylic glass. Ships fully assembled and ready to hang.</p>
          </div>
        </div>
      )}

      {/* Digital Delivery Notice */}
      {isDigital && (
        <div style={{ padding: '12px', background: '#e0f2fe', color: '#0284c7', borderRadius: 4, fontSize: 13, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Digital download delivered via email instantly after purchase. No physical item will be shipped.
        </div>
      )}

      {/* CoA tooltip line */}
      {!isDigital && (
        <p className="Text--subdued" style={{ fontSize: 13, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Includes signed Certificate of Authenticity
        </p>
      )}

      {/* Artist Statement Accordion */}
      <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: 20 }}>
        <button 
          onClick={() => setShowStatement(!showStatement)}
          style={{ width: '100%', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="Heading u-h6">Artist Statement</span>
          <span style={{ fontSize: 20 }}>{showStatement ? '−' : '+'}</span>
        </button>
        {showStatement && (
          <div className="Rte Text--subdued" style={{ paddingBottom: 16, fontSize: 14 }}>
            <p>&quot;This series explores the intersection of digital spectrums and organic forms. By constraining the palette and heavily manipulating the focal points, I aim to create a sense of manufactured serendipity. Each print is carefully produced to ensure the vibrant neon highlights pop against the deep, absorbent blacks of the archival paper.&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
