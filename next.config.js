/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        domains: ['ddragon.leagueoflegends.com'],
    },
}

module.exports = nextConfig
