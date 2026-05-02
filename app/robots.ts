import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/my-schedule'] },
    sitemap: 'https://wemakedrivers.co.uk/sitemap.xml',
  }
}
