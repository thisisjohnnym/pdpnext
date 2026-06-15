import { describe, it, expect } from "vitest";
import { products, slugs, getProduct } from "@/data/products";

describe("product registry", () => {
  it("exposes at least two products and resolves them by slug", () => {
    expect(slugs.length).toBeGreaterThanOrEqual(2);
    for (const slug of slugs) {
      const bundle = getProduct(slug);
      expect(bundle).toBeDefined();
      expect(bundle?.slug).toBe(slug);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProduct("not-a-real-product")).toBeUndefined();
  });
});

describe.each(slugs)("product data integrity: %s", (slug) => {
  const bundle = products[slug];

  it("exposes the core product fields", () => {
    expect(bundle.product.title.length).toBeGreaterThan(0);
    expect(bundle.product.subtitle.length).toBeGreaterThan(0);
    expect(bundle.product.handle).toMatch(/^@/);
    expect(bundle.product.price).toMatch(/^\$\d+/);
  });

  it("has at least one hero clip with web-playable sources", () => {
    expect(bundle.tiktokVideos.length).toBeGreaterThan(0);
    const clip = bundle.tiktokVideos[0];
    expect(clip.sources.length).toBeGreaterThanOrEqual(1);
    for (const s of clip.sources) {
      expect(s.src).toMatch(/^\/video\//);
      expect(s.type).toMatch(/^video\//);
    }
    expect(clip.poster).toMatch(/^\/img\//);
  });

  it("points the 360 view at an mp4", () => {
    expect(bundle.threeSixty.src).toMatch(/\.mp4$/);
    expect(bundle.threeSixty.ctaLabel).toBeTruthy();
  });

  it("uses local asset paths for every image", () => {
    const images = [
      bundle.galleryThumb.src,
      bundle.shopTheLook.model.src,
      ...bundle.shopTheLook.items.map((i) => i.image),
      ...bundle.morePhotos.columnOne.map((p) => p.src),
      ...bundle.morePhotos.columnTwo.map((p) => p.src),
      ...bundle.relatedProducts.map((r) => r.image),
      ...bundle.bagUpsell.map((b) => b.image),
    ];
    for (const src of images) {
      expect(src).toMatch(/^\/img\//);
    }
  });

  it("gives every shop-the-look and related item a price", () => {
    for (const item of [...bundle.shopTheLook.items, ...bundle.relatedProducts]) {
      expect(item.price).toMatch(/^\$\d+/);
      expect(item.name.length).toBeGreaterThan(0);
    }
  });

  it("splits more photos into two balanced columns", () => {
    expect(bundle.morePhotos.columnOne.length).toBe(3);
    expect(bundle.morePhotos.columnTwo.length).toBe(3);
  });

  it("has enough related products to require horizontal scrolling", () => {
    expect(bundle.relatedProducts.length).toBeGreaterThanOrEqual(3);
  });

  it("provides SEO metadata", () => {
    expect(bundle.seo.title.length).toBeGreaterThan(0);
    expect(bundle.seo.description.length).toBeGreaterThan(0);
  });
});
