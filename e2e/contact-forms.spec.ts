import { test, expect } from 'playwright/test'

test.describe('Home hero form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders all required fields', async ({ page }) => {
    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /get started/i }) })
    await expect(form.locator('input[name="name"]')).toBeVisible()
    await expect(form.locator('input[name="email"]')).toBeVisible()
    await expect(form.locator('input[name="phone"]')).toBeVisible()
    await expect(form.locator('select[name="area"]')).toBeVisible()
    await expect(form.locator('input[name="postcode"]')).toBeVisible()
  })

  test('prevents submission when required fields are empty', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /get started/i })
    await submitBtn.click()

    const nameInput = page.locator('form input[name="name"]').first()
    const isInvalid = await nameInput.evaluate(
      (el) => !(el as HTMLInputElement).validity.valid,
    )
    expect(isInvalid).toBe(true)
  })

  test('submits successfully and shows confirmation', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /get started/i }) })
    await form.locator('input[name="name"]').fill('Jane Doe')
    await form.locator('input[name="email"]').fill('jane@example.com')
    await form.locator('input[name="phone"]').fill('07700900123')
    await form.locator('select[name="area"]').selectOption('North London')

    await form.getByRole('button', { name: /get started/i }).click()

    await expect(page.getByText("We'll be in touch shortly")).toBeVisible()
  })

  test('shows error message when API fails', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /get started/i }) })
    await form.locator('input[name="name"]').fill('Jane Doe')
    await form.locator('input[name="phone"]').fill('07700900123')
    await form.locator('select[name="area"]').selectOption('South London')

    await form.getByRole('button', { name: /get started/i }).click()

    await expect(page.getByText('Something went wrong')).toBeVisible()
  })

  test('sends correct payload to API', async ({ page }) => {
    let capturedBody: Record<string, string> | null = null

    await page.route('**/api/contact', async (route) => {
      capturedBody = JSON.parse(route.request().postData() || '{}')
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /get started/i }) })
    await form.locator('input[name="name"]').fill('Test User')
    await form.locator('input[name="email"]').fill('test@test.com')
    await form.locator('input[name="phone"]').fill('07700900000')
    await form.locator('select[name="area"]').selectOption('East London')
    await form.locator('input[name="postcode"]').fill('E1 6AN')

    await form.getByRole('button', { name: /get started/i }).click()
    await expect(page.getByText("We'll be in touch shortly")).toBeVisible()

    expect(capturedBody).toEqual({
      source: 'hero',
      name: 'Test User',
      email: 'test@test.com',
      phone: '07700900000',
      area: 'East London',
      postcode: 'E1 6AN',
    })
  })
})

test.describe('Contact page form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us')
  })

  test('renders all fields', async ({ page }) => {
    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /submit message/i }) })
    await expect(form.locator('input[name="name"]')).toBeVisible()
    await expect(form.locator('input[name="email"]')).toBeVisible()
    await expect(form.locator('input[name="phone"]')).toBeVisible()
    await expect(form.locator('input[name="subject"]')).toBeVisible()
    await expect(form.locator('textarea[name="message"]')).toBeVisible()
  })

  test('prevents submission when required fields are empty', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /submit message/i })
    await submitBtn.click()

    const nameInput = page.locator('form input[name="name"]').first()
    const isInvalid = await nameInput.evaluate(
      (el) => !(el as HTMLInputElement).validity.valid,
    )
    expect(isInvalid).toBe(true)
  })

  test('submits successfully and shows confirmation', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /submit message/i }) })
    await form.locator('input[name="name"]').fill('John Smith')
    await form.locator('input[name="email"]').fill('john@example.com')
    await form.locator('input[name="phone"]').fill('07700900456')
    await form.locator('input[name="subject"]').fill('Booking enquiry')
    await form.locator('textarea[name="message"]').fill('I would like to book automatic lessons in North London.')

    await form.getByRole('button', { name: /submit message/i }).click()

    await expect(page.getByText("Thanks for your message")).toBeVisible()
  })

  test('shows error message when API fails', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /submit message/i }) })
    await form.locator('input[name="name"]').fill('John Smith')
    await form.locator('input[name="phone"]').fill('07700900456')

    await form.getByRole('button', { name: /submit message/i }).click()

    await expect(page.getByText('Something went wrong')).toBeVisible()
  })

  test('sends correct payload to API', async ({ page }) => {
    let capturedBody: Record<string, string> | null = null

    await page.route('**/api/contact', async (route) => {
      capturedBody = JSON.parse(route.request().postData() || '{}')
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /submit message/i }) })
    await form.locator('input[name="name"]').fill('Alice')
    await form.locator('input[name="email"]').fill('alice@test.com')
    await form.locator('input[name="phone"]').fill('07700900789')
    await form.locator('input[name="subject"]').fill('Pricing')
    await form.locator('textarea[name="message"]').fill('How much are lessons?')

    await form.getByRole('button', { name: /submit message/i }).click()
    await expect(page.getByText("Thanks for your message")).toBeVisible()

    expect(capturedBody).toEqual({
      source: 'contact',
      name: 'Alice',
      email: 'alice@test.com',
      phone: '07700900789',
      subject: 'Pricing',
      message: 'How much are lessons?',
    })
  })
})
