/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io", "firebasestorage.googleapis.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
