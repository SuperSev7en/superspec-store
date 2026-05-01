import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/account/', '/checkout/success'],
    },
    sitemap: 'https://superspec.studio/sitemap.xml',
  };
}
