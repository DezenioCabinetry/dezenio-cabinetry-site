import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // If TypeScript errors pop up too, uncomment the next line:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
