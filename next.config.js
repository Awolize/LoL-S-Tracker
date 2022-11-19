/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        domains: ['ddragon.leagueoflegends.com', 'lol.awot.dev', 'lol-dev.awot.dev'],
    },
    experimental: {
        images: {
            unoptimized: true,
        },
    },
}

module.exports = nextConfig
