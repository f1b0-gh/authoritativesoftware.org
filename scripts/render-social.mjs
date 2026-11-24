import { chromium } from '@playwright/test';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(new URL('./social-card.html', import.meta.url).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL('../public/social.png', import.meta.url).pathname });
} finally { await browser.close(); }
