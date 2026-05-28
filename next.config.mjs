/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: ['cloud.appwrite.io'],
  },
};

export default nextConfig;