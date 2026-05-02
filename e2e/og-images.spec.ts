import { test, expect } from '@playwright/test'

test.describe('OG and Twitter image routes', () => {
  test('/opengraph-image returns 200 with content-type image/png', async ({ request }) => {
    const response = await request.fetch('/opengraph-image')
    expect(response.status()).toBe(200)
    const contentType = response.headers()['content-type']
    expect(contentType).toMatch(/image\/png/)
  })

  test('/twitter-image returns 200 with content-type image/png', async ({ request }) => {
    const response = await request.fetch('/twitter-image')
    expect(response.status()).toBe(200)
    const contentType = response.headers()['content-type']
    expect(contentType).toMatch(/image\/png/)
  })
})
