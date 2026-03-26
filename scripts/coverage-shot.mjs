import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.evaluate(() => window.scrollTo(0, 5400));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/coverage-section.png' });
  await browser.close();
})();
