/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Allow server components to import client components (needed for PageTransition)
    serverComponentsExternalPackages: ["framer-motion"],
    // Easier error handling for client components
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig; 