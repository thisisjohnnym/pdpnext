# Editorial PDP (Coach Tabby)

A mobile-first, editorial product detail page for the Coach Tabby Shoulder Bag 26,
built from a polished [Paper design](https://app.paper.design/file/01KSQPB0ZB3MAWKYB6EG7TD1V0/4-0/33D-0)
(`Editorial_PDP_Phone_v1`). The page reads like a magazine: a pinned TikTok hero,
scrub parallax, depth layers, a 360 spin, a shop-the-look list, an offset photo
grid, and a horizontal scroll-hijack carousel.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, and GSAP.

## Stack

- Next.js 16 + React 19, App Router, Turbopack
- Tailwind CSS 4 (CSS `@theme` tokens)
- GSAP + ScrollTrigger (via `@gsap/react` `useGSAP`)
- Self-hosted Helvetica Neue LT Pro (woff2)
- Testing: Vitest + Testing Library, Playwright (mobile visual regression + behavior)
- Code intelligence: `fallow`; React diagnostics: `react-doctor`

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint (next config) |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright (builds + serves on :3100, runs e2e) |
| `pnpm test:e2e:update` | Regenerate Playwright visual baselines |
| `pnpm analyze` | `fallow health` |
| `pnpm deadcode` | `fallow dead-code` |
| `pnpm verify` | typecheck + lint + unit + e2e + fallow health |

`pnpm verify` is the single command to run before shipping a change.

## Testing loop

The loop is designed to catch regressions without manual back-and-forth:

1. `pnpm typecheck` and `pnpm lint` for static correctness.
2. `pnpm test` (Vitest) for data integrity and component behavior (overlay toggle,
   product rows render from data, hero social actions).
3. `pnpm test:e2e` (Playwright, 430px mobile project):
   - Visual regression: full page plus each section, captured under
     `prefers-reduced-motion: reduce` and with videos frozen so snapshots are
     deterministic. Baselines live in `tests/e2e/__screenshots__/`.
   - Behavior: hero stays pinned on scroll, the overlay opens/closes, and the
     "more like this" section converts vertical scroll into horizontal progress.
4. `pnpm analyze` / `pnpm deadcode` (fallow) to keep the module graph clean.
5. `npx react-doctor@latest --verbose` for a11y/hooks/perf diagnostics.

When you intentionally change a section's look, refresh baselines with
`pnpm test:e2e:update` and review the diff before committing.

## Project layout

```
app/                 layout, page, fonts, global tokens
components/
  sections/          Hero, ProductIntro, ThreeSixtyView, ShopTheLook, MorePhotos, MoreLikeThis
  Reveal.tsx         in-view fade (opacity 0 to 1 + translate), reduced-motion aware
  OverlayPlaceholder.tsx
  icons.tsx          inline SVG icons (Coach wordmark, TikTok, social, etc.)
data/product.ts      all copy, media paths, and lists (data-driven)
lib/gsap.ts          GSAP + ScrollTrigger registration
public/fonts         Helvetica Neue LT Pro woff2
public/img           webp imagery + hero poster
public/video         hero.mp4/.webm + spin360.mp4
tests/unit           Vitest
tests/e2e            Playwright specs + committed snapshots
PRODUCT.md DESIGN.md impeccable design documentation
```

## Motion principles

- No instant animations. Everything enters with an in-view fade.
- Ease-out only (`power3`/`power4`), transform and opacity only.
- All scroll scenes are wrapped in `gsap.matchMedia` and disabled under
  `prefers-reduced-motion: reduce`.

## Notes and scope

- Mobile first. Desktop and tablet breakpoints are intentionally out of scope.
- The hero social icons open `OverlayPlaceholder`; the real overlay content is not
  designed yet.
- Deployment to Vercel is out of scope for this build.
- `react-doctor` still reports a few warnings by design: pnpm install hardening was
  omitted because it breaks `npx` tooling here, the Coach wordmark keeps full SVG
  precision for fidelity, and the placeholder modal will move to a native
  `<dialog>` when the overlay is actually designed.
```
