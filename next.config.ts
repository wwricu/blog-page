import type { NextConfig } from "next"
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  expireTime: 30 * 24 * 60 * 60,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.**.amazonaws.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.wwr.icu',
        port: '',
        pathname: '**',
      },
    ],
  },
 async rewrites() {
    // Without NEXT_BASE_URL the client-side '/api' fallback would proxy to itself; skip the rewrite
    if (!process.env.NEXT_BASE_URL) {
      return []
    }
    return [
        {
          // Only the open group is reachable through this proxy; a visitor cannot turn blog-page
          // into a bridge to /admin/*, and neither can this app by building the wrong URL.
          source: '/api/open/:path*',
          destination: `${process.env.NEXT_BASE_URL}/open/:path*`,
        },
      ]
  },
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)
