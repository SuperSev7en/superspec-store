'use client';

import { useEffect, useState } from 'react';
import { AddToCartButton } from '@/components/store/AddToCartButton';

export function StickyATC({ 
  productHandle, 
  title, 
  price, 
  variantId, 
  image 
}: { 
  productHandle: string; 
  title: string; 
  price: string; 
  variantId?: string;
  image?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past roughly the main ATC button area (approx 600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="StickyATC"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border-color)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {image && (
          <div style={{ width: 40, height: 40, position: 'relative', borderRadius: 4, overflow: 'hidden' }} className="hidden-phone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="Heading u-h6" style={{ margin: 0, fontSize: 14 }}>{title}</span>
          <span className="Price Text--subdued" style={{ fontSize: 13 }}>{price}</span>
        </div>
      </div>

      <div style={{ width: 150 }}>
        <AddToCartButton handle={productHandle} variantId={variantId} />
      </div>
    </div>
  );
}
