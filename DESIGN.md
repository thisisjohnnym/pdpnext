# DESIGN.md — Editorial PDP

Source of truth: Paper design `Editorial_PDP_Phone_v1` (node 33D-0), 430px wide.
Values below are sampled directly from the Paper file. Hex is what the design ships;
OKLCH is the working token space (tinted neutrals, never pure #000/#fff at extremes).

## Color

Strategy: **restrained**. A near-monochrome canvas of white and warm gray, black
ink for type, brass tones live only inside the product photography.

| Token | Hex (design) | OKLCH (token) | Use |
|---|---|---|---|
| `--surface` | `#FFFFFF` | `oklch(0.995 0.001 95)` | Base page, hero, shop-the-look card |
| `--surface-gray` | `#D8D8D8` | `oklch(0.882 0.0015 95)` | Product intro, more photos, more like this |
| `--surface-violet` | `#D9D7DA` | `oklch(0.879 0.004 300)` | Shop the look section |
| `--ink` | `#000000` | `oklch(0.17 0 0)` | Display type, primary text |
| `--ink-soft` | `#202020` | `oklch(0.27 0 0)` | Product list names and prices |
| `--ink-invert` | `#FFFFFF` | `oklch(0.995 0.001 95)` | Text over hero video |
| `--scrim` | `rgba(0,0,0,0.10)` | — | 10% overlay on hero + 360 media |

Note: display headings in the design use pure `#000000`. We keep `--ink` a hair off
pure black for everything else to avoid harshness, but the big titles may use
`#000` directly to match the magazine-cover punch.

## Typography

Family: **Helvetica Neue LT Pro** (licensed, self-hosted woff2). Two axes matter
here: the **Extended** width for editorial labels and the **Light Extended** width
for display.

Faces shipped (`public/fonts/`):

- `HelveticaNeueLTPro-LtEx` — Light Extended, weight 300 → display headings
- `HelveticaNeueLTPro-Ex` — Extended, weight 400 → micro labels / captions
- `HelveticaNeueLTPro-Lt` — Light, weight 300 → product list rows
- `HelveticaNeueLTPro-Roman` / `-Md` — body / medium (reserve)

Type scale (from Paper computed styles):

| Role | Face | Size | Tracking | Line height |
|---|---|---|---|---|
| Hero / `Tabby` / `— 26` | LtEx 300 | 90px | -6.3px | 100% |
| Section title (Shop / More) | LtEx 300 | 60px | -3px | 100% |
| Micro label / caption | Ex 400 | 10px | +0.2px | 125% |
| Product row name + price | Lt 300 | 12px | +0.2px | 100% |

Display type is set tight (negative tracking, 100% leading) so multi-line titles
stack like a cover. The spaced en dash ("look —", "— photos", "— 26") is a graphic
device, kept on its own baseline and often right-aligned.

## Layout and spacing

- Page width 430px (mobile). Outer gutter 8px (415px content frames).
- Section top padding is large and varied for rhythm: 60px (intro, shop),
  110px (more photos, more like this). Bottom padding 10–60px.
- Title blocks reserve ~120px. Avoid uniform padding; vary it on purpose.
- Asymmetry is intentional: titles hang left, the en-dash word drops and right-aligns.
- Cards are used only where they are the true affordance (product list rows). No
  nested cards, no wrapping everything in a container.

## Motion

Engine: GSAP + ScrollTrigger, scoped with `@gsap/react` `useGSAP`. All scroll
scenes are wrapped in `gsap.matchMedia` with a `(prefers-reduced-motion: reduce)`
branch that disables transforms and forces full opacity.

Rules:

- No instant animation. Every section/element enters with an **in-view fade**:
  opacity 0 → 1 plus a small Y translate (16–28px), eased `power3.out`, ~0.7s.
- Ease out only, exponential curves (`power3`/`power4`/`expo.out`). No bounce,
  no elastic, no back.
- Never animate layout properties. Transform and opacity only.
- Signature scenes:
  - **Hero pin**: hero video is pinned so it stays fixed while the next section
    scrolls up beneath it (magazine cover reveal).
  - **Scrub parallax**: the `Tabby` / `— 26` title scrubs slower than scroll; the
    gallery image below moves at a different speed for depth.
  - **More photos**: two columns, column 2 parallaxes ~10% slower than column 1.
  - **More like this**: section pinned at 100vh, vertical scroll hijacked into
    horizontal card movement, with a progress bar.

## Components

- `TopBar` — COACH wordmark (vector) + menu glyph.
- `Hero` — pinned TikTok video, right-rail social actions, scroll indicator.
- `ProductIntro` — TikTok callout, parallax display title, depth gallery image.
- `ThreeSixtyView` — looping 360 spin video, visual CTA.
- `ShopTheLook` — model shot + real product list rows + close CTA.
- `MorePhotos` — offset two-column photo grid with differential parallax.
- `MoreLikeThis` — horizontal scroll-hijack carousel + progress bar.
- `OverlayPlaceholder` — opened by hero social icons (content TBD).
