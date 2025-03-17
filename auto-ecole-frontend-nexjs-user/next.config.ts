import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:8000' },
        ],
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', 'chrome-aws-lambda']
  },
}
