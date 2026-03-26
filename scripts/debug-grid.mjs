import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/my-schedule', { waitUntil: 'networkidle', timeout: 15000 });
  await page.fill('input[type="password"]', 'drive2026');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  // Scroll to where the booking blocks are
  await page.evaluate(() => window.scrollTo(0, 100));
  await page.waitForTimeout(500);

  // Full page screenshot to see everything
  await page.screenshot({
    path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/schedule-full.png',
    fullPage: true
  });

  await browser.close();
})();
