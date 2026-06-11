import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["*.loca.lt", "192.168.0.56"],
};

export default nextConfig;
