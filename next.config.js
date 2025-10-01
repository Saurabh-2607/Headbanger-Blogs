/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;