import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/ours-hero-fixed.png' });
  await browser.close();
})();
