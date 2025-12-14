/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Explicitly load environment variables
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

export default nextConfig
