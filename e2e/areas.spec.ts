import { test, expect } from '@playwright/test'

test.describe('Per-area landing pages', () => {
  test('/areas index page returns 200 and lists all 19 areas as links', async ({ request, page }) => {
    const response = await request.fetch('/areas')
    expect(response.status()).toBe(200)

    await page.goto('/areas')
    const links = page.locator('a[href^="/areas/"]')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(19)
  })

  test('/areas/hendon returns 200 with correct title and description', async ({ request }) => {
    const response = await request.fetch('/areas/hendon')
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toMatch(/<title[^>]*>.*Driving Lessons in Hendon.*<\/title>/si)
    expect(html).toMatch(/NW4|Mill Hill/i)
  })

  test('/areas/golders-green raw HTML title contains "Driving Lessons in Golders Green"', async ({ request }) => {
    const response = await request.fetch('/areas/golders-green')
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toMatch(/<title[^>]*>.*Driving Lessons in Golders Green.*<\/title>/si)
  })

  test('/areas/hendon JSON-LD contains DrivingSchool and Hendon', async ({ request }) => {
    const response = await request.fetch('/areas/hendon')
    const html = await response.text()
    expect(html).toContain('"DrivingSchool"')
    expect(html).toContain('Hendon')
  })

  test('/areas/non-existent-slug returns 404', async ({ request }) => {
    const response = await request.fetch('/areas/non-existent-slug')
    expect(response.status()).toBe(404)
  })

  test('home page "Areas We Cover" tiles each have href="/areas/..." attribute', async ({ page }) => {
    await page.goto('/')
    const eyebrow = page.getByText('Areas We Cover', { exact: true })
    const section = eyebrow.locator('xpath=ancestor::section[1]')
    const links = section.locator('a[href^="/areas/"]')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(19)
  })
})
