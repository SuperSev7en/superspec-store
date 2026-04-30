'use client';

import { toast } from 'sonner';
import { Icon } from '@/components/shopify/icons/Icon';

export function SocialShare({ url, title }: { url?: string; title: string }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : (url || '');

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`, '_blank');
  };

  return (
    <div className="SocialShare" style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 20 }}>
      <span className="Heading u-h7 Text--subdued">Share:</span>
      <button onClick={copyLink} aria-label="Copy link" className="Text--subdued hover:text-black">
        <Icon icon="link" />
      </button>
      <button onClick={shareTwitter} aria-label="Share on Twitter" className="Text--subdued hover:text-black">
        <Icon icon="twitter" />
      </button>
      <button onClick={shareWhatsApp} aria-label="Share on WhatsApp" className="Text--subdued hover:text-black">
        <Icon icon="whatsapp" />
      </button>
    </div>
  );
}
