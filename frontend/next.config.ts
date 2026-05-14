import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com", // covers the media CDN subdomain
      },
    ],
  },
};

export default nextConfig;
