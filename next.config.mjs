/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turboMode: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["pg", "node-rs/argon2"],
};

export default nextConfig;
