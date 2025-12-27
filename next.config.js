/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Only apply webpack watch options in local development (not in Vercel builds)
  webpack: (config, { dev, isServer }) => {
    // Only modify watch options in development on Windows (Vercel uses Linux)
    if (dev && !isServer && typeof process !== 'undefined' && process.platform === 'win32') {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }
    return config
  },
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig

