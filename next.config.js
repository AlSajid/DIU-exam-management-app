/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverComponentsExternalPackages: ['mongoose', 'tailwindcss'],
    },
}

module.exports = nextConfig
