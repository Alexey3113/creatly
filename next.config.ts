import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Видео-аплоад в story-блоки: дефолтный лимит тела через middleware/proxy — 10MB
  experimental: {
    proxyClientMaxBodySize: "80mb",
  },
  allowedDevOrigins: ["127.0.0.1"],
  // playwright — headless-скриншоты цикла самопроверки, не бандлится
  serverExternalPackages: ["ssh2", "playwright"],
};

export default nextConfig;
