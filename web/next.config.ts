import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wbtmslowqxjuemxrtbsq.supabase.co",
        pathname: "/storage/v1/object/**", // すべてのオブジェクトを許可
      },
    ],
  },
};

export default nextConfig;
