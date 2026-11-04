# Lovell Media: website

Standalone site for **Lovell Media**, an independent production company.
*Every frame has a story.* Red / black / white.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · fully static except the contact form action.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero showreel, services index, featured work, studio intro, CTA |
| `/work` | Portfolio gallery with category filter (`?category=ooh`) |
| `/work/[slug]` | Project detail: film/cover, meta, scope, gallery, next project |
| `/services` | Overview of the five disciplines |
| `/services/[slug]` | OOH, Concerts, Podcasts, Events, Branded Content |
| `/studio` | About, approach, process, capabilities |
| `/contact` | Enquiry form (pre-selects service via `?service=`) |

Also: `sitemap.xml`, `robots.txt`, generated Open Graph image, JSON-LD organization data, 404.

## Replacing content (no code changes needed)

All copy and media live in `src/content/`:

- **`site.ts`**: email, location, social links (empty links are hidden), showreel video.
- **`services.ts`**: the five categories. Add `media: { image, video, alt }` for real visuals.
- **`projects.ts`**: portfolio. **Every current entry is a sample** (`sample: true`, shown with a
  "Sample" badge and set to `noindex`). Replace with real projects and set `sample: false`.

Put media in `public/media/…` and reference it as `/media/…`. Anything without media renders a
branded placeholder frame styled for its category.

Media guidelines: stills as JPG/WebP at about 2400px on the long edge (Next optimises them);
loops as MP4/H.264, muted, under about 8MB; long films via `embed` (Vimeo/YouTube player URL).

## Contact form

The server action is `src/app/contact/actions.ts`. Configure delivery in `.env.local` (see `.env.example`):
Resend email and/or a webhook. With neither set, enquiries are logged in dev; in production the
form tells visitors to email directly, so nothing is silently dropped. Includes validation and a spam honeypot.

## Project outline

See `docs/ROADMAP.md` (what is left) and `docs/CONTENT-INTAKE.md` (what to collect from Lovell Media).

## Design system

See `DESIGN.md`.

## Deploy

Vercel: import the repo, add the env vars, deploy.
Point the domain and set `NEXT_PUBLIC_SITE_URL`.
