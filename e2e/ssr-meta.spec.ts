import { test, expect } from '@playwright/test'

test.describe('SSR meta tags — pre-rendered HTML before JS', () => {
  test('home page raw HTML contains title with North London, meta description, and DrivingSchool JSON-LD', async ({ request }) => {
    const response = await request.fetch('/')
    const html = await response.text()

    expect(html).toContain('North London')
    expect(html).toMatch(/<title[^>]*>.*North London.*<\/title>/si)
    expect(html).toMatch(/<meta[^>]+name="description"[^>]+content="[^"]*North London[^"]*"/si)
    expect(html).toContain('"DrivingSchool"')
  })

  test('inner pages raw HTML contain server-rendered title tags', async ({ request }) => {
    const pages = ['/about-us', '/contact-us', '/courses', '/blog']

    for (const path of pages) {
      const response = await request.fetch(path)
      const html = await response.text()
      expect(html).toMatch(/<title[^>]*>[^<]+<\/title>/si)
    }
  })
})
