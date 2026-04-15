import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wordpress-1592566-6232100.cloudwaysapps.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "secure.gravatar.com",
            },
        ],
    },
};

export default nextConfig;