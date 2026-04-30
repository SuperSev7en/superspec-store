/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid Vercel/Next picking the wrong workspace root when multiple lockfiles exist on the machine.
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      // Collection → product canonical
      { source: '/collections/:collection/products/:product', destination: '/products/:product', permanent: true },
      // Old Shopify messy handles → clean slugs
      { source: '/products/copy-of-copy-of-copy-of-draft',   destination: '/products/super-angel-wings',       permanent: true },
      { source: '/products/copy-of-copy-of-draft',           destination: '/products/super-demon-wings',       permanent: true },
      { source: '/products/copy-of-draft',                   destination: '/products/super-heart-angel-wings', permanent: true },
      { source: '/products/copy-of-super-butterfly-tee',     destination: '/products/4-point-super-star',      permanent: true },
      { source: '/products/aura-the-endless-march-copy',     destination: '/products/aura-endless-march',      permanent: true },
      { source: '/products/aura-the-endless-march-copy-1',   destination: '/products/aura-eclipse-of-fate',    permanent: true },
      { source: '/products/aura-the-endless-march-copy-2',   destination: '/products/azure-spirit',            permanent: true },
      { source: '/products/auras-brilliant-night-copy',      destination: '/products/auras-brilliant-night',   permanent: true },
      { source: '/products/aura-farm-drawn-power-copy',      destination: '/products/eyes-that-measure',       permanent: true },
      // glow-rib-cage was listed as fallen-super-angel in old data
      { source: '/products/glow-rib-cage',                   destination: '/products/super-glow-rib-cage',     permanent: true },
    ];
  },
};

module.exports = nextConfig;

