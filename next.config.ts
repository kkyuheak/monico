import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.upbit.com",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "rjdwcwscaakgoykvpmvi.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ddi-cdn.deepsearch.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/coin/:path*",
        destination: "https://api.upbit.com/v1/:path*",
      },
      // {
      //   source: "/api/news/:path*",
      //   destination: "https://api-v2.deepsearch.com/v1/:path*",
      // },
    ];
  },
};

export default nextConfig;
