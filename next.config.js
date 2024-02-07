/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    workerThreads: false,
    cpus: 1,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["joshworley.io", "joshworley-io-strapi.sfo3.digitaloceanspaces.com"],
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
