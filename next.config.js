import { readFileSync } from "fs";
import NextBundleAnalyzer from '@next/bundle-analyzer'

function getAppVersion() {
  const { version } = JSON.parse(readFileSync("./package.json"));
  return version;
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  publicRuntimeConfig: {
    appVersion: getAppVersion(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
