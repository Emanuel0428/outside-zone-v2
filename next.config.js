/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.shopify.com',
      'cdn.shopifycdn.net'
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
