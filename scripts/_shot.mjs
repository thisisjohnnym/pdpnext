import { chromium } from "@playwright/test";

const url = "http://localhost:3000/";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 430, height: 932 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto(url, { waitUntil: "networkidle" });

const top = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="shop-the-look"]');
  return el.getBoundingClientRect().top + window.scrollY;
});

const vh = await page.evaluate(() => window.innerHeight);

// Idle: section just entering from the bottom (before lock).
await page.evaluate((y) => window.scrollTo(0, y - 600), top);
await page.waitForTimeout(500);
await page.screenshot({ path: "scripts/_shot-idle.png" });

// Lock progress samples (pin distance = one viewport).
for (const p of [0.0, 0.3, 0.6, 0.9]) {
  await page.evaluate(([y, off]) => window.scrollTo(0, y + off), [top, vh * p]);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `scripts/_shot-lock-${Math.round(p * 100)}.png` });
}

await browser.close();
console.log("done");
