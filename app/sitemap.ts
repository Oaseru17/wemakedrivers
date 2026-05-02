import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/site'
import { AREAS } from '@/lib/areas'
import { lastModified } from '@/lib/git'

function mostRecent(...dates: Date[]): Date {
  return new Date(Math.max(...dates.map((d) => d.getTime())))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wemakedrivers.co.uk'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: lastModified('app/page.tsx') },
    { url: `${base}/about-us`, lastModified: lastModified('app/about-us/page.tsx') },
    { url: `${base}/courses`, lastModified: lastModified('app/courses/page.tsx') },
    { url: `${base}/contact-us`, lastModified: lastModified('app/contact-us/page.tsx') },
    { url: `${base}/blog`, lastModified: lastModified('app/blog/page.tsx') },
    { url: `${base}/areas`, lastModified: lastModified('app/areas/page.tsx') },
    {
      url: `${base}/faq`,
      lastModified: mostRecent(lastModified('app/faq/page.tsx'), lastModified('lib/faqs.ts')),
    },
  ]

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: mostRecent(
      lastModified('app/blog/[slug]/page.tsx'),
      lastModified('lib/site.ts'),
    ),
  }))

  const areas: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${base}/areas/${area.slug}`,
    lastModified: mostRecent(
      lastModified('app/areas/[slug]/page.tsx'),
      lastModified('lib/areas.ts'),
    ),
  }))

  return [...staticRoutes, ...posts, ...areas]
}
