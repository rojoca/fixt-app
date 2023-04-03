/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["tailwindui.com", "sportsgroundproduction.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
