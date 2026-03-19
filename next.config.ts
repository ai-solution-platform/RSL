import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/RSL",
  assetPrefix: "/RSL/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
