import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["usermanagement200326.blob.core.windows.net"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://user-management-demo.azurewebsites.net/api/:path*",
      },
    ];
  },
};

export default nextConfig;
