import type { Page, Locator } from "@playwright/test";

/**
 * Wait for fonts so screenshots are deterministic. We avoid "networkidle"
 * because the autoplaying hero and 360 videos stream continuously and the
 * network never goes idle. We also avoid decoding off-screen lazy images here
 * (they never load until scrolled into view); use waitForImagesIn for that.
 */
export async function waitForReady(page: Page) {
  await page.waitForLoadState("load");
  await page.evaluate(() => {
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const timeout = new Promise((res) => setTimeout(res, 3000));
    return Promise.race([fontsReady, timeout]);
  });
  await page.waitForTimeout(400);
}

/** Wait for all <img> inside a locator to finish loading (after scroll). */
export async function waitForImagesIn(locator: Locator) {
  await locator.evaluate((el: Element) =>
    Promise.all(
      Array.from(el.querySelectorAll("img")).map((img) =>
        img.complete && img.naturalWidth > 0
          ? null
          : new Promise<void>((resolve) => {
              const done = () => resolve();
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
              setTimeout(done, 5000);
            }),
      ),
    ),
  );
}

/** Scroll the whole page to force every lazy image to load, then return to top. */
export async function loadAllLazyImages(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(
    () =>
      Promise.all(
        Array.from(document.images).map((img) =>
          img.complete && img.naturalWidth > 0
            ? null
            : new Promise<void>((resolve) => {
                const done = () => resolve();
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
                setTimeout(done, 5000);
              }),
        ),
      ),
  );
  await page.waitForTimeout(300);
}

/** Pause every video on a fixed frame so visual snapshots do not drift. */
export async function freezeMedia(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((v) => {
      try {
        v.pause();
      } catch {
        /* ignore */
      }
      v.currentTime = 0;
    });
  });
}
