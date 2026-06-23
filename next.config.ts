import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  serverExternalPackages: ["ssh2"],
};

export default nextConfig;
