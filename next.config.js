/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['covers.openlibrary.org', 'books.google.com', 'm.media-amazon.com', 'retrocausal.ai', 'i0.wp.com'],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
