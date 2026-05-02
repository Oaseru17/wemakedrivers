import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/site'
import { AREAS } from '@/lib/areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wemakedrivers.co.uk'
  const routes = ['', '/about-us', '/courses', '/contact-us', '/blog', '/areas'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }))
  const posts = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
  }))
  const areas = AREAS.map((area) => ({
    url: `${base}/areas/${area.slug}`,
    lastModified: new Date(),
  }))
  return [...routes, ...posts, ...areas]
}
