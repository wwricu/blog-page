import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-input",
    "rc-picker",
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
