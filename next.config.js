const fs = require('fs');

function getAppVersion() {
  const { version } = JSON.parse(fs.readFileSync('./package.json'));
  return version;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  publicRuntimeConfig: {
    appVersion: getAppVersion(),
  },
};

module.exports = nextConfig;
