import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/practice",
        destination: "/speak",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
