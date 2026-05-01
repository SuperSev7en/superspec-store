import { MetadataRoute } from 'next';
import { loadCatalog } from '@/lib/catalog/catalog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://superspec.studio';
  const products = await loadCatalog();
  
  const productEntries = products.map((p) => ({
    url: `${baseUrl}/products/${p.handle}`,
    lastModified: new Date(),
  }));

  const collectionEntries = [
    'super-spectrum',
    'super-speck',
    'super-specification',
  ].map((h) => ({
    url: `${baseUrl}/collections/${h}`,
    lastModified: new Date(),
  }));

  const staticEntries = [
    '',
    '/about',
    '/mission-and-sustainability',
    '/contact',
    '/products',
    '/cart',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
