import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  // Screenshot our site
  const ourPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ourPage.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
  await ourPage.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/ours-home.png', fullPage: true });
  console.log('--- Our homepage captured');

  // Screenshot the original template
  const origPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  await origPage.goto('https://preview.themeforest.net/item/dreevex-driving-school-wordpress-theme/full_screen_preview/26132995', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await origPage.waitForTimeout(5000);

  // Get iframe and navigate to it
  const iframeSrc = await origPage.evaluate(() => {
    const iframe = document.querySelector('iframe');
    return iframe ? iframe.src : null;
  });

  if (iframeSrc) {
    console.log(`--- Found demo iframe: ${iframeSrc}`);
    const demoPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await demoPage.goto(iframeSrc, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await demoPage.waitForTimeout(5000);
    await demoPage.screenshot({ path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/original-home.png', fullPage: true });
    console.log('--- Original homepage captured');
  }

  await browser.close();
})();
