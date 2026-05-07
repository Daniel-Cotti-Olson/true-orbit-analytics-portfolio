/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Ensuring compatibility across all hosting providers
  },
  reactStrictMode: true,
};

export default nextConfig;
