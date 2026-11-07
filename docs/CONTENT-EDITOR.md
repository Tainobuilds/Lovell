# Content editor

The site has a built-in content editor (Keystatic) at **`/keystatic`**. Everything on the site that
changes — projects, services, homepage wording, contact details, showreel — can be edited there
without touching code. Edits are saved as files in this repo (`content/` and `public/media/`).

## What you can edit

| Section | What's in it |
| --- | --- |
| **Projects** | Add, edit, reorder or delete portfolio projects: title, category, client, year, summary, scope, credits, cover image, gallery, video loop, film link, "Feature on homepage", "Sample" |
| **Services** | The five service pages: one-liner, description, capabilities, hero image or video |
| **Homepage** | Every headline and paragraph on the homepage, the closing red banner (shown on most pages) and the footer sign-off |
| **Site settings** | Public email, where enquiries are sent, city, social links, showreel video and poster, founder name/link |

### Headline formatting

In any field marked `*word* = red · _word_ = italic`:

- `*story.*` → **red** text
- `_frame._` → *italic serif* text
- `*_built for_*` → red italic
- Press **Enter** for a line break

### Adding a real project

1. **Projects → +**
2. Fill in title, category, client (only if you're allowed to name them), year, summary.
3. Upload a **cover image** (landscape, at least 2400px wide) and gallery images.
4. **Untick "Sample"** — real projects then appear in Google and lose the "Sample" badge.
5. Tick **Feature on homepage** for your best 3–5 projects. Use **Sort order** (lower = first).
6. **Save.**

When the real projects are in, delete the sample ones (open each → bin icon).

## Two ways to use it

### A. On a computer, locally (works today)

```bash
npm install
npm run dev
```
Open http://localhost:3000/keystatic, edit, save. Changes are written to files; commit and push
them to publish.

### B. Online, on the live site (one-time setup, ~10 minutes, needs a computer)

Lets anyone you approve edit at `https://<your-site>/keystatic` from any device, including a phone.
Each save becomes a commit on GitHub, and Vercel redeploys the site automatically (~1 minute).

1. On a computer, in this project folder, create a file called `.env.local` containing:
   ```
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github
   ```
2. Run `npm run dev` and open http://localhost:3000/keystatic.
3. Keystatic shows **"Create GitHub App"**. Click it, sign in to GitHub as **Tainobuilds**, and
   confirm. This creates a private GitHub App for the editor and writes four values into
   `.env.local`:
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
4. When asked, **install the app on the `Tainobuilds/Lovell` repository** only.
5. In **Vercel → Project → Settings → Environment Variables**, add all five values from
   `.env.local` (including `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`), then redeploy.
6. In **GitHub → Settings → Developer settings → GitHub Apps → (your Keystatic app)**, add the live
   site's callback URL:
   `https://<your-site>/api/keystatic/github/oauth/callback`
   (Add one for the Vercel preview domain too if you'll edit there.)
7. Visit `https://<your-site>/keystatic` and sign in with GitHub.

To let someone else edit (e.g. a Lovell team member), add them as a collaborator on the GitHub
repository.

> `.env.local` contains secrets. It is git-ignored; never commit it or paste the values in chat.

Until step B is done, `/keystatic` returns "not found" on the live site, so nobody can reach it.

## Where things are stored

- `content/projects/*.yaml`, `content/services/*.yaml`, `content/homepage.yaml`, `content/settings.yaml`
- Uploaded images and videos: `public/media/projects/<project>/…`, `public/media/services/…`,
  `public/media/showreel/…`

Keep videos under ~8MB (short muted loops). Long films belong on Vimeo/YouTube via the "Film link" field.
