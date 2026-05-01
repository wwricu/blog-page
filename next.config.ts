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
    ],
  },
 async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/:path*',
        },
      ] : []
  },
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)
