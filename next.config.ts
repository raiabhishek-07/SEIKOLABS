import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.12",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1",
    "*.loca.lt"
  ]
};

export default nextConfig;
