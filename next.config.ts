import type { NextConfig } from "next"
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
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
    return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_BASE_URL}/:path*`,
        },
      ]
  },
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)
