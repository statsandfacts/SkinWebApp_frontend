const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["nextcare.s3.us-east-2.amazonaws.com"],
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
