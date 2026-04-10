/** FAQ copy from Shopify theme `sections/page-faq-template.liquid` default blocks. */
export const FAQ_SECTIONS: { heading: string; items: { q: string; aHtml: string }[] }[] = [
  {
    heading: 'Shipping',
    items: [
      {
        q: 'Do you ship overseas?',
        aHtml:
          '<p>Yes, we ship all over the world. Shipping costs will apply, and will be added at checkout. We run discounts and promotions all year, so stay tuned for exclusive deals.</p>',
      },
      {
        q: 'How long will it take to get my order?',
        aHtml:
          '<p>It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email.</p>',
      },
      {
        q: 'What shipping carriers do you use?',
        aHtml:
          '<p>We use all major carriers, and local courier partners. You’ll be asked to select a delivery method during checkout.</p>',
      },
    ],
  },
  {
    heading: 'Product',
    items: [
      {
        q: 'Can I return my product?',
        aHtml:
          '<p>We always aim for make sure our customers love our products, but if you do need to return an order, we’re happy to help. Just email us directly and we’ll take you through the process.</p>',
      },
      {
        q: 'Can I get my product personalized?',
        aHtml:
          '<p>It depends on the creator and the product. All options are outlined on the product page, so look out for customization options there.</p>',
      },
    ],
  },
  {
    heading: 'Other',
    items: [
      {
        q: 'Any question?',
        aHtml: '<p>You can contact us through our <a href="/contact">contact page</a>! We will be happy to assist you.</p>',
      },
    ],
  },
];
