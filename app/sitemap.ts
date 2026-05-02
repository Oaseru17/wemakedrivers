import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wemakedrivers.co.uk'
  const routes = ['', '/about-us', '/courses', '/contact-us', '/blog'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }))
  const posts = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
  }))
  return [...routes, ...posts]
}
