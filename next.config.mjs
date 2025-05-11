/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export' // Required for static Firebase deployment
};

export default nextConfig;
