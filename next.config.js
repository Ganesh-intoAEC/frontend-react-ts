/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles", "scss")],
  },
  experimental: {
    optimizePackageImports: ['@mui/material','@mui/icons-material'],
  },
};

module.exports = nextConfig;
