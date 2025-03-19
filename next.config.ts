import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com'],
  },
  output: 'standalone',
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
