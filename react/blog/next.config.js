/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // https://nextjs.org/docs/api-reference/next/image#domains
        domains: ["images.microcms-assets.io"],
    },
};

module.exports = nextConfig;
