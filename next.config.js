// CRITICAL: Patch process.stdin BEFORE Next.js bootstraps its ESM loader
const { Readable } = require('stream');
try {
  const originalDescriptor = Object.getOwnPropertyDescriptor(process, 'stdin');
  if (originalDescriptor && typeof originalDescriptor.get === 'function') {
    let cachedStdin = null;
    Object.defineProperty(process, 'stdin', {
      get: function () {
        if (cachedStdin) return cachedStdin;
        try {
          cachedStdin = originalDescriptor.get.call(process);
          return cachedStdin;
        } catch (e) {
          const { Readable } = require('stream');
          cachedStdin = new Readable({ read() {} });
          cachedStdin.push(null);
          return cachedStdin;
        }
      },
      set: function (val) { cachedStdin = val; },
      configurable: true,
      enumerable: true,
    });
  } else if (!process.stdin || process.stdin.destroyed) {
    process.stdin = new Readable({ read() {} });
    process.stdin.push(null);
  }
} catch (e) {
  console.warn('[patch] Could not patch process.stdin:', e.message);
}

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['covers.openlibrary.org', 'books.google.com', 'm.media-amazon.com', 'retrocausal.ai', 'i0.wp.com'],
    unoptimized: true, // Required for static export
  },
  // Note: redirects() is not supported in static export mode.
  // The /about redirect is removed - Hostinger can handle this via their panel if needed.
};

module.exports = nextConfig;
