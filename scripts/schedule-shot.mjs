import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Go to schedule page
  await page.goto('http://localhost:5173/my-schedule', { waitUntil: 'networkidle', timeout: 15000 });

  // Screenshot the code gate
  await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-gate.png' });

  // Enter code
  await page.fill('input[type="password"]', 'drive2026');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);

  // Screenshot the dashboard
  await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-dashboard.png' });

  // Click first booking to show detail
  const bookingSlot = page.locator('text=Sarah Mitchell').first();
  if (await bookingSlot.isVisible()) {
    await bookingSlot.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-booking-detail.png' });
  }

  await browser.close();
})();
