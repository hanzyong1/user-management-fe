import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["usermanagement200326.blob.core.windows.net"],
  },
};

export default nextConfig;
