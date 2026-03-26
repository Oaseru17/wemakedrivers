import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/my-schedule', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-gate.png' });

  await page.fill('input[type="password"]', 'drive2026');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-dashboard.png' });

  // Debug: check if bookings exist in the DOM
  const bookingBlocks = await page.locator('[class*="bg-blue-500"], [class*="bg-emerald-500"], [class*="bg-purple-500"]').count();
  console.log(`Found ${bookingBlocks} booking blocks in DOM`);

  // Check grid cell count
  const gridCells = await page.locator('[class*="border-l"][class*="min-h"]').count();
  console.log(`Found ${gridCells} grid cells`);

  // Try clicking on Sarah Mitchell in upcoming
  const sarahCard = page.locator('text=Sarah Mitchell').first();
  if (await sarahCard.isVisible()) {
    console.log('Sarah Mitchell visible in upcoming');
    await sarahCard.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-booking-detail.png' });
  }

  await browser.close();
})();
