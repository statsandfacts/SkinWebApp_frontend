/** @type {import('next').NextConfig} */
const nextConfig = {
   /** basePath: '/user',
    assetPrefix: '/user', */
    reactStrictMode: true,
    images: {
        domains: ['nextcare.s3.us-east-2.amazonaws.com'],
        unoptimized: true,
    },
};

module.exports = nextConfig;
