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
        protocol: "https",
        hostname: "eloquent-dinosaurs-72f5fe2544.strapiapp.com", // production
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
