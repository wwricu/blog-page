import type { NextConfig } from "next"
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  expireTime: 30 * 24 * 60 * 60,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wwr.icu',
        port: '',
        pathname: '**',
      },
    ],
  },
 async rewrites() {
    if (!process.env.NEXT_BASE_URL) {
      return []
    }
    return [
        {
          source: '/api/open/:path*',
          destination: `${process.env.NEXT_BASE_URL}/open/:path*`,
        },
      ]
  },
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)
