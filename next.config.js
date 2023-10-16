/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1", "172.16.44.82", "192.168.43.172"],
  },
};

module.exports = nextConfig;
