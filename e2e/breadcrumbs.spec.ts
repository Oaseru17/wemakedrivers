import { test, expect } from '@playwright/test'

const PAGES_WITH_BREADCRUMBS = [
  '/about-us',
  '/courses',
  '/contact-us',
  '/blog',
  '/areas',
  '/areas/hendon',
  '/faq',
]

test.describe('BreadcrumbList JSON-LD on nested pages', () => {
  for (const path of PAGES_WITH_BREADCRUMBS) {
    test(`${path} raw HTML contains BreadcrumbList and ListItem`, async ({ request }) => {
      const response = await request.fetch(path)
      expect(response.status()).toBe(200)
      const html = await response.text()
      expect(html).toContain('"BreadcrumbList"')
      expect(html).toContain('"ListItem"')
    })
  }
})
