import { test, expect } from '@playwright/test'

test.describe('Service schema on /courses', () => {
  test('/courses raw HTML contains Service JSON-LD', async ({ request }) => {
    const response = await request.fetch('/courses')
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toContain('"Service"')
  })
})
