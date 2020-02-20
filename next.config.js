require('dotenv').config();
require('webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  webpack(config) {
    return config;
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    PRODUCTION_CLIENT_ID: process.env.PRODUCTION_CLIENT_ID,
    PRODUCTION_CLIENT_SECRET: process.env.PRODUCTION_CLIENT_SECRET
  }
});
