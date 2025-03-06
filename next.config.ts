import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: { resolve: { fallback: any; }; }) => {
    // Required for modules that may use Node-specific features
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "net": false,
      "dns": false,
      "child_process": false,
    };
    return config;
  },
};

export default nextConfig;
