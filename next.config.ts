import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // Sanity Studio's bundle isn't RSC-condition-clean (e.g. swr's "react-server"
  // export lacks a default export it expects) — treat it as an external so
  // Next requires it normally instead of analyzing it as part of the RSC graph.
  serverExternalPackages: ["sanity", "@sanity/vision"],
};

export default nextConfig;
