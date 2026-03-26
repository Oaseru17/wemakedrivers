import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  // Our site sections
  const ourPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ourPage.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });

  const ourShots = [
    { name: 'ours-header-hero', y: 0 },
    { name: 'ours-below-hero', y: 900 },
    { name: 'ours-mid-page', y: 1800 },
    { name: 'ours-lower-page', y: 2700 },
    { name: 'ours-bottom', y: 3600 },
  ];

  for (const shot of ourShots) {
    await ourPage.evaluate((y) => window.scrollTo(0, y), shot.y);
    await ourPage.waitForTimeout(500);
    await ourPage.screenshot({
      path: `/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/${shot.name}.png`,
    });
    console.log(`--- ${shot.name}`);
  }

  // Full page
  await ourPage.evaluate(() => window.scrollTo(0, 0));
  await ourPage.waitForTimeout(300);
  await ourPage.screenshot({
    path: '/Users/oaseru/Documents/vaule-streams/wemake-drivers/screenshots/ours-full.png',
    fullPage: true,
  });
  console.log('--- Full page captured');

  await browser.close();
})();
