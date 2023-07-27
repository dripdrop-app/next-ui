/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [{
    source: "/:path*",
    destination: `${process.env.API_SERVER_URL}/:path*`
  }]
}

module.exports = nextConfig
