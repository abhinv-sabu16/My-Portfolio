import { Client } from '@notionhq/client'

let notion

function getNotionClient() {
  if (!notion && process.env.NOTION_API_KEY) {
    notion = new Client({ auth: process.env.NOTION_API_KEY })
  }
  return notion
}

/**
 * Fetch projects from Notion database
 */
export async function getNotionProjects() {
  const client = getNotionClient()
  if (!client || !process.env.NOTION_PROJECTS_DB_ID) return null

  try {
    const response = await client.databases.query({
      database_id: process.env.NOTION_PROJECTS_DB_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Published' }
      },
      sorts: [{ property: 'Order', direction: 'ascending' }]
    })

    return response.results.map(page => ({
      id: page.id,
      title: page.properties?.Title?.title?.[0]?.plain_text || 'Untitled',
      description: page.properties?.Description?.rich_text?.[0]?.plain_text || '',
      tech: page.properties?.Tech?.multi_select?.map(t => t.name) || [],
      category: page.properties?.Category?.select?.name || 'Project',
      liveUrl: page.properties?.LiveUrl?.url || '#',
      githubUrl: page.properties?.GithubUrl?.url || '#',
      featured: page.properties?.Featured?.checkbox || false,
      accent: page.properties?.Accent?.rich_text?.[0]?.plain_text || '#C96A4A',
    }))
  } catch (error) {
    console.error('Notion projects fetch error:', error)
    return null
  }
}

/**
 * Fetch blog posts from Notion database
 */
export async function getNotionBlogPosts() {
  const client = getNotionClient()
  if (!client || !process.env.NOTION_BLOG_DB_ID) return null

  try {
    const response = await client.databases.query({
      database_id: process.env.NOTION_BLOG_DB_ID,
      filter: {
        property: 'Published',
        checkbox: { equals: true }
      },
      sorts: [{ property: 'Date', direction: 'descending' }]
    })

    return response.results.map(page => ({
      id: page.id,
      title: page.properties?.Title?.title?.[0]?.plain_text || 'Untitled',
      excerpt: page.properties?.Excerpt?.rich_text?.[0]?.plain_text || '',
      date: page.properties?.Date?.date?.start
        ? new Date(page.properties.Date.date.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '',
      readTime: page.properties?.ReadTime?.rich_text?.[0]?.plain_text || '5 min',
      tag: page.properties?.Tag?.select?.name || 'Article',
      slug: `/blog/${page.id}`,
    }))
  } catch (error) {
    console.error('Notion blog fetch error:', error)
    return null
  }
}

export default getNotionClient
