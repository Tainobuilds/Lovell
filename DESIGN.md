# Lovell Media design system

**Palette is RED / BLACK / WHITE only.** No orange, gold or other hues. Tokens are in `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0a0a0a` | Primary background |
| `ink-2` / `ink-3` | `#121212` / `#1c1c1c` | Raised sections, media wells |
| `paper` | `#ffffff` | Type, contrast |
| `red` | `#e10a0a` | Accent, CTAs, key words |
| `red-deep` | `#a60707` | Hover/pressed on red |
| `mute` / `faint` / `line` | white at 62% / 38% / 12% | Secondary text, labels, rules |

Red is an accent. Use it for one word in a headline, CTAs, index numbers and markers. The closing
CTA band is the one full-red surface. White text on red passes AA; small red text on black is for labels only.

## Type
- **Display** (`.display`): Anton, uppercase, line-height 0.88. Headlines and big indexes.
- **Editorial** (`.editorial`): Instrument Serif italic. One accent phrase per headline at most.
- **Body**: Inter. **Labels** (`.eyebrow`): Inter 600, 0.22em tracking, uppercase.

## Components
`Frame` (every image/video, with per-category placeholder), `ProjectCard`, `SectionHeading`,
`PageHero`, `CtaBand`, `ServiceIndex`, `WorkGallery`, `Reveal` (scroll fade), `Marquee`, `Wordmark`.
Buttons: `.btn .btn-red` (primary) and `.btn .btn-ghost` (secondary).

## Motion
`--ease-cine` for everything. Reveal on scroll, slow drift on placeholders, image zoom on hover.
All motion is disabled under `prefers-reduced-motion`.

## Category character
Each service keeps the shared system but has its own placeholder motif: OOH has a billboard,
Concerts stage beams, Podcasts a waveform, Events bokeh, Branded Content a viewfinder.
Real hero media per service replaces these.

## Wordmark
`Wordmark.tsx` is a typographic stand-in (red square, LOVELL, MEDIA). Swap in the approved logo SVG there.
