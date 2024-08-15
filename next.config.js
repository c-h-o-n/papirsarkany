import NextBundleAnalyzer from '@next/bundle-analyzer';
import createNextPluginPreval from 'next-plugin-preval/config.js';

const withNextPluginPreval = createNextPluginPreval();

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPlugins = (nextConfig) =>
  withNextPluginPreval(withBundleAnalyzer(nextConfig));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
};

export default withPlugins(nextConfig);
