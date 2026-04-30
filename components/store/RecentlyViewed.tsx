'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type ViewedProduct = {
  handle: string;
  title: string;
  price: string;
  image: string;
};

export function RecentlyViewed({ currentProduct }: { currentProduct: ViewedProduct }) {
  const [recent, setRecent] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('superspec:recently-viewed');
      let items: ViewedProduct[] = stored ? JSON.parse(stored) : [];
      
      // Remove current if exists, and prepend
      items = items.filter(p => p.handle !== currentProduct.handle);
      items.unshift(currentProduct);
      
      // Keep only last 6
      items = items.slice(0, 6);
      
      localStorage.setItem('superspec:recently-viewed', JSON.stringify(items));
      
      // We only want to show the OTHER recently viewed items
      setRecent(items.filter(p => p.handle !== currentProduct.handle));
    } catch {
      // ignore
    }
  }, [currentProduct]);

  if (recent.length === 0) return null;

  return (
    <section className="Section Section--spacingNormal">
      <header className="SectionHeader SectionHeader--center">
        <h3 className="SectionHeader__Heading Heading u-h3">Recently Viewed</h3>
      </header>
      <div className="ProductList ProductList--grid Grid" style={{ marginTop: 30 }}>
        {recent.map((product) => (
          <div key={product.handle} className="Grid__Cell 1/2--phone 1/3--tablet 1/6--lap-and-up">
            <div className="ProductItem">
              <div className="ProductItem__Wrapper">
                <a href={`/products/${product.handle}`} className="ProductItem__ImageWrapper">
                  <div style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#f5f5f5' }}>
                    <Image src={product.image} alt={product.title} fill style={{ objectFit: 'contain' }} />
                  </div>
                </a>
                <div className="ProductItem__Info ProductItem__Info--left">
                  <h2 className="ProductItem__Title Heading">
                    <a href={`/products/${product.handle}`}>{product.title}</a>
                  </h2>
                  <div className="ProductItem__PriceList Heading">
                    <span className="ProductItem__Price Price Text--subdued">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
