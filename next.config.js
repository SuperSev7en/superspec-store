/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid Vercel/Next picking the wrong workspace root when multiple lockfiles exist on the machine.
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;

