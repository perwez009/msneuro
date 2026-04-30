/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isProd ? "/msneuro" : "",
  assetPrefix: isProd ? "/msneuro/" : "",
};

module.exports = nextConfig;
