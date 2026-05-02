import { test, expect } from '@playwright/test'

const NORTH_LONDON_AREAS = [
  'Barnet',
  'Camden',
  'Colindale',
  'Cricklewood',
  'Crouch End',
  'Edgware',
  'Edmonton',
  'Finchley',
  'Golders Green',
  'Hampstead',
  'Hendon',
  'Highgate',
  'Mill Hill',
  'Muswell Hill',
  'Southgate',
  'Tottenham',
  'Walthamstow',
  'Whetstone',
  'Wood Green',
]

const REMOVED_BROAD_OPTIONS = [
  'North London',
  'South London',
  'East London',
  'West London',
  'Central London',
  'Croydon',
  'Bromley',
  'Greenwich',
]

test.describe('North London coverage scope', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('signup form area dropdown lists exactly the 18 North London areas', async ({ page }) => {
    const select = page.locator('form select[name="area"]')
    const optionValues = await select.locator('option').evaluateAll((nodes) =>
      nodes
        .map((n) => (n as HTMLOptionElement).value)
        .filter((v) => v !== ''),
    )
    expect(optionValues).toEqual(NORTH_LONDON_AREAS)
  })

  test('signup dropdown does not contain any removed London-zone options', async ({ page }) => {
    const select = page.locator('form select[name="area"]')
    const optionValues = await select.locator('option').evaluateAll((nodes) =>
      nodes.map((n) => (n as HTMLOptionElement).value),
    )
    for (const removed of REMOVED_BROAD_OPTIONS) {
      expect(optionValues).not.toContain(removed)
    }
  })

  test('"Areas We Cover" grid renders all 18 alphabetised areas as links', async ({ page }) => {
    const eyebrow = page.getByText('Areas We Cover', { exact: true })
    await expect(eyebrow).toBeVisible()
    const section = eyebrow.locator('xpath=ancestor::section[1]')
    const tiles = section.locator('div.grid.grid-cols-2 > a')
    await expect(tiles).toHaveCount(NORTH_LONDON_AREAS.length)
    for (const area of NORTH_LONDON_AREAS) {
      const tile = tiles.filter({ hasText: area })
      await expect(tile).toBeVisible()
      const href = await tile.getAttribute('href')
      expect(href).toMatch(/^\/areas\//)
    }
  })

  test('map badge shows "North London" not generic "London"', async ({ page }) => {
    const badge = page.locator('p.text-white.font-bold').filter({ hasText: 'North London' })
    await expect(badge).toBeVisible()
    await expect(page.getByText('All Areas Covered', { exact: true })).toBeVisible()
  })

  test('SEO title on home page targets North London', async ({ page }) => {
    await expect(page).toHaveTitle(/North London/i)
  })

  test('hero form submits with a North London area and posts the area unchanged', async ({ page }) => {
    let capturedArea: string | null = null
    await page.route('**/api/contact', async (route) => {
      const body = JSON.parse(route.request().postData() || '{}')
      capturedArea = body.area ?? null
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /get started/i }) })
    await form.locator('input[name="name"]').fill('Test Learner')
    await form.locator('input[name="email"]').fill('test@example.com')
    await form.locator('input[name="phone"]').fill('07700900000')
    await form.locator('select[name="area"]').selectOption('Muswell Hill')
    await form.getByRole('button', { name: /get started/i }).click()
    await expect(page.getByText("We'll be in touch shortly")).toBeVisible()

    expect(capturedArea).toBe('Muswell Hill')
  })
})

test.describe('North London coverage — other pages', () => {
  test('contact page heading reads "North London Coverage Area"', async ({ page }) => {
    await page.goto('/contact-us')
    await expect(page.getByRole('heading', { name: 'North London Coverage Area' })).toBeVisible()
  })

  test('contact page meta description targets North London', async ({ page }) => {
    await page.goto('/contact-us')
    const desc = await page.locator('meta[name="description"]').getAttribute('content')
    expect(desc).toMatch(/North London/)
    expect(desc).not.toMatch(/North,\s*South,\s*East,\s*West/)
  })

  test('about page meta description targets North London', async ({ page }) => {
    await page.goto('/about-us')
    const desc = await page.locator('meta[name="description"]').getAttribute('content')
    expect(desc).toMatch(/North London/)
    expect(desc).not.toMatch(/all London zones/)
  })

  test('SEO keywords meta includes North London terms', async ({ page }) => {
    await page.goto('/')
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content')
    expect(keywords).toMatch(/driving lessons North London/)
    expect(keywords).toMatch(/Hendon/)
  })
})
