import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
