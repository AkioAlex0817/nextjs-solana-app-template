/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLUSTER: process.env.NEXT_PUBLIC_CLUSTER || 'devnet',
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'staging',
  }
}

module.exports = nextConfig
