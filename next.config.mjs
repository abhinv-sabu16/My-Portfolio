/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.notion.so', 'notion.so', 's3.us-west-2.amazonaws.com', 'images.unsplash.com'],
  },
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_PROJECTS_DB_ID: process.env.NOTION_PROJECTS_DB_ID,
  },
};

export default nextConfig;