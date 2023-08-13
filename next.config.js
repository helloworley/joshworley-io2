/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    workerThreads: false,
    cpus: 1,
  },
  images: {
    domains: [],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
          },
        },
      ],
      type: "javascript/auto",
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
    });

    return config;
  },

  staticPageGenerationTimeout: 1000,

  // security concerns
  poweredByHeader: false,
};

module.exports = nextConfig;
