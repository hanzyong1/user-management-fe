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
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "https://user-management-demo.azurewebsites.net"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
