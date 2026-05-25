/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
}

export default nextConfig