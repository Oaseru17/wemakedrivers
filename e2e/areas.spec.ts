import { test, expect } from '@playwright/test'

test.describe('Per-area CTA buttons', () => {
  test('area page renders 3 CTA buttons with correct hrefs', async ({ page }) => {
    await page.goto('/areas/hendon')

    const contactBtn = page.getByRole('link', { name: 'Contact Us Now' })
    await expect(contactBtn).toBeVisible()
    await expect(contactBtn).toHaveAttribute('href', '/contact-us')

    const callBtn = page.getByRole('link', { name: /Call WeMake Drivers/ })
    await expect(callBtn).toBeVisible()
    await expect(callBtn).toHaveAttribute('href', 'tel:+447777666690')

    const whatsappBtn = page.getByRole('link', { name: /Message WeMake Drivers on WhatsApp/ })
    await expect(whatsappBtn).toBeVisible()
    const wa = await whatsappBtn.getAttribute('href')
    expect(wa).toContain('wa.me/447777666690')
    expect(wa).toContain('Hendon')
  })

  test('whatsapp pre-fill text is area-specific', async ({ page }) => {
    await page.goto('/areas/golders-green')
    const wa = await page.getByRole('link', { name: /WhatsApp/ }).getAttribute('href')
    expect(wa).toContain(encodeURIComponent('Golders Green'))
  })
})

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
