import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });

  // Go to ThemeForest preview, get iframe
  await page.goto('https://preview.themeforest.net/item/dreevex-driving-school-wordpress-theme/full_screen_preview/26132995', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const iframeSrc = await page.evaluate(() => document.querySelector('iframe')?.src);

  const demo = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await demo.goto(iframeSrc, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await demo.waitForTimeout(5000);

  // Viewport-sized sections
  const shots = [
    { name: 'header-hero', y: 0 },
    { name: 'below-hero', y: 900 },
    { name: 'mid-page', y: 1800 },
    { name: 'lower-page', y: 2700 },
    { name: 'bottom', y: 3600 },
  ];

  for (const shot of shots) {
    await demo.evaluate((y) => window.scrollTo(0, y), shot.y);
    await demo.waitForTimeout(1000);
    await demo.screenshot({
      path: `/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/orig-${shot.name}.png`,
    });
    console.log(`--- Captured ${shot.name}`);
  }

  await browser.close();
})();
