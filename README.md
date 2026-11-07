# Lovell Media: website

Standalone site for **Lovell Media**, an independent production company.
*Every frame has a story.* Red / black / white.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Keystatic content editor · fully static except the contact form action.

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
| `/privacy` | Privacy policy (draft; review before launch) |

Also: `sitemap.xml`, `robots.txt`, generated Open Graph image, JSON-LD organization data, 404.

## Editing content

Use the built-in **content editor at `/keystatic`**: projects, services, homepage wording,
contact details, social links and showreel. No code needed. See **`docs/CONTENT-EDITOR.md`**
(includes the one-time setup for editing on the live site).

Content is stored as YAML in `content/` and media in `public/media/`. All current projects are
**samples** (`sample: true`: "Sample" badge, hidden from Google); replace them with real work.

## Contact form

The server action is `src/app/contact/actions.ts`. Configure delivery in `.env.local` (see `.env.example`):
Resend email and/or a webhook. With neither set, enquiries are logged in dev; in production the
form tells visitors to email directly, so nothing is silently dropped. Includes validation and a spam honeypot.

## Project outline

See `docs/ROADMAP.md` (what is left) and `docs/CONTENT-INTAKE.md` (what to collect from Lovell Media).

### Turning on email delivery (Resend, free tier)
1. Sign up at https://resend.com **using contact@latoyalovell.com** (the test sender only delivers to the account's own email).
2. In Resend go to **API Keys**, create a key and copy it.
3. In Vercel go to **Project → Settings → Environment Variables**, add `RESEND_API_KEY` = the key, then redeploy.
4. Submit the contact form on the live site and check the inbox (and spam folder).

Enquiries arrive with the visitor's address as *reply-to*, so pressing Reply answers them directly.
To send from a Lovell Media address later, verify the domain in Resend and set `CONTACT_FROM_EMAIL`.

## Analytics

Vercel Web Analytics (`@vercel/analytics`) is in the root layout. It's cookie-free, so no consent
banner is needed. Turn it on in Vercel under **Project → Analytics → Enable**. Locally the script
404s, which is expected.

## Design system

See `DESIGN.md`.

## Deploy

Vercel: import the repo, add the env vars, deploy.
Point the domain and set `NEXT_PUBLIC_SITE_URL`.
