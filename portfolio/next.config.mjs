/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators:false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'portfolio.blob.vercel-storage.com',
            pathname: '/**'
          },
        ],
      },
};

export default nextConfig;