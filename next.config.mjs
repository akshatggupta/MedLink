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
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
}

export default nextConfig
