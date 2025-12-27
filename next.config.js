/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Windows performance
  swcMinify: true,
  // Reduce file watching overhead on Windows
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }
    return config
  },
  // Disable source maps in development for faster builds (optional)
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig

