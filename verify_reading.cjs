const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/#/reading');
  await page.waitForTimeout(5000); // Wait for content
  await page.screenshot({ path: '/home/jules/verification/reading.png', fullPage: true });
  await browser.close();
})();
