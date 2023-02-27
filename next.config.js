/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
