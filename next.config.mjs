/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'notion.so',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_PROJECTS_DB_ID: process.env.NOTION_PROJECTS_DB_ID,
  },
  serverExternalPackages: ['firebase-admin'],
};

export default nextConfig;