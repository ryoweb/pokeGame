/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  //画像を読み込めるドメインの追加
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
