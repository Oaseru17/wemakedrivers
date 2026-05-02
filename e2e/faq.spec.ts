import { test, expect } from '@playwright/test'

test.describe('/faq page', () => {
  test('returns 200 and contains heading + FAQPage schema', async ({ request }) => {
    const response = await request.fetch('/faq')
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toContain('Frequently Asked Questions')
    expect(html).toContain('"FAQPage"')
  })

  test('renders at least 10 accordion items', async ({ page }) => {
    await page.goto('/faq')
    const items = page.locator('details')
    const count = await items.count()
    expect(count).toBeGreaterThanOrEqual(10)
  })

  test('footer contains a link to /faq', async ({ page }) => {
    await page.goto('/')
    const faqLink = page.locator('footer a[href="/faq"]')
    await expect(faqLink).toBeVisible()
  })
})
