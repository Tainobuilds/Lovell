# Lovell Media website: project outline

Status key: [x] done · [~] in progress · [ ] to do · **(client)** needs material or a decision from Lovell Media

## Phase 1: Foundation ✅
- [x] Standalone Next.js site, own repo (`Tainobuilds/Lovell`)
- [x] Red / black / white design system (`DESIGN.md`)
- [x] All page templates built and responsive
- [x] Contact form with validation and spam protection
- [x] SEO basics: titles, descriptions, sitemap, robots, share image, structured data
- [x] Accessibility pass: automated WCAG 2 AA scan of every page, contrast fixed

## Phase 2: Brand alignment
- [ ] **(client)** Approved website mockup (the "creative north star")
- [ ] **(client)** Logo files (SVG preferred: full wordmark, icon/monogram, white and red versions)
- [ ] Match homepage and components to the mockup (spacing, type, logo, layout details)
- [ ] Replace the text wordmark (`src/components/Wordmark.tsx`) with the real logo
- [ ] Favicon and share image from the real logo
- [ ] **(client)** Sign-off on homepage

## Phase 3: Content
See `docs/CONTENT-INTAKE.md` for the exact list and file specs.
- [ ] **(client)** Showreel (homepage hero)
- [ ] **(client)** Hero image or loop for each of the 5 services
- [ ] **(client)** 2–4 real projects per category (10–20 total)
- [ ] **(client)** Review and approve all copy (headlines, service descriptions, studio page)
- [ ] **(client)** Contact email, city/base, social links, budget currency
- [ ] Load content into `src/content/`, remove sample projects
- [ ] Compress and optimise all media

## Phase 4: Functionality
- [x] Enquiries go to contact@latoyalovell.com (for now) via Resend
- [ ] Create Resend account and add `RESEND_API_KEY` in Vercel (see README → Contact form)
- [ ] Send a test enquiry end to end on the live site
- [ ] Later: verify lovellmedia.com in Resend and switch to a Lovell Media inbox
- [x] Analytics: Vercel Web Analytics wired in (cookie-free, no banner needed)
- [ ] Turn on Analytics in the Vercel dashboard (Project → Analytics → Enable)
- [x] Privacy policy page drafted at `/privacy`, linked from footer and form
- [ ] **(client)** Review privacy policy for Lovell's jurisdiction
- [x] Full-screen gallery viewer on project pages (keyboard, buttons, swipe)
- [x] Cinematic page transitions (View Transitions; header stays fixed)
- [ ] Optional: content editor (CMS) so Lovell can add projects without a developer

## Phase 5: Launch
- [ ] Deploy to Vercel (import `Tainobuilds/Lovell`, no extra settings)
- [ ] **(client)** Domain: confirm and point DNS (e.g. lovellmedia.com)
- [ ] Set `NEXT_PUBLIC_SITE_URL` and form env vars in Vercel
- [ ] Final QA: iPhone, Android, iPad, Safari/Chrome/Firefox, page speed, links, form
- [ ] Submit sitemap to Google Search Console
- [ ] **(client)** Final sign-off, then go live

## Pages (7 templates, ~20 URLs)
Home · Work · Project detail (one per project) · Services · 5 × Service page · Studio · Contact · Privacy · 404
