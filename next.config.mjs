/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "103.129.115.165",
        port: "5002",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
