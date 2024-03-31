/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'i\\.ibb\\.co' },
      { hostname: 'img\\.icons8\\.com' }
    ]
  }
};

export default nextConfig;
