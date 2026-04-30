export type AnalyticsEvent = 
  | 'page_view'
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase';

export const trackEvent = (eventName: AnalyticsEvent, data?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // GA4 tracking
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, data);
    }
    
    // Meta Pixel tracking mapping
    if (typeof (window as any).fbq === 'function') {
      let pixelEvent = 'TrackCustom';
      let pixelData = data;
      
      switch (eventName) {
        case 'page_view':
          pixelEvent = 'PageView';
          pixelData = undefined;
          break;
        case 'view_item':
          pixelEvent = 'ViewContent';
          break;
        case 'add_to_cart':
          pixelEvent = 'AddToCart';
          break;
        case 'begin_checkout':
          pixelEvent = 'InitiateCheckout';
          break;
        case 'purchase':
          pixelEvent = 'Purchase';
          break;
      }
      
      if (pixelEvent === 'PageView') {
        (window as any).fbq('track', pixelEvent);
      } else if (pixelEvent !== 'TrackCustom') {
        (window as any).fbq('track', pixelEvent, pixelData);
      } else {
        (window as any).fbq('trackCustom', eventName, pixelData);
      }
    }
  }
};
