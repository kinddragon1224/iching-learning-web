import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? "/iching-learning-web" : "",
  assetPrefix: isProd ? "/iching-learning-web/" : "",
};

export default nextConfig;
