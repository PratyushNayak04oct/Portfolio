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
        ],
      },
};

export default nextConfig;
