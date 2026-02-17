const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const routes = ['/', '/learn', '/lesson/vowels', '/game/memory', '/game/flip'];

  for (const route of routes) {
    console.log('Verifying ' + route);
    await page.goto('http://localhost:5173/#' + route);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/home/jules/verification/final_' + route.replace(/\//g, '_') + '.png' });
  }

  await browser.close();
})();
