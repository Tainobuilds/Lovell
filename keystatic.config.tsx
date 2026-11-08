import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Content editor (Keystatic) — open /keystatic.
 *
 * Storage:
 *  - Local (default): edits write straight to the files in this repo. Use with `npm run dev`.
 *  - GitHub: set NEXT_PUBLIC_KEYSTATIC_STORAGE=github. Edits on the live site are
 *    committed to the GitHub repo, which triggers a redeploy. First-time setup
 *    (creating the GitHub App) is described in docs/CONTENT-EDITOR.md.
 */
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({ kind: "github", repo: { owner: "Tainobuilds", name: "Lovell" } } as const)
    : ({ kind: "local" } as const);

const HEADLINE_HINT = "*word* = red · _word_ = italic · Enter = new line.";

const image = (label: string, dir: string, description?: string) =>
  fields.image({ label, description, directory: `public/media/${dir}`, publicPath: `/media/${dir}/` });

const video = (label: string, dir: string, description?: string) =>
  fields.file({ label, description, directory: `public/media/${dir}`, publicPath: `/media/${dir}/` });

export default config({
  storage,
  ui: {
    brand: { name: "Lovell Media" },
    navigation: {
      Content: ["projects", "services"],
      Pages: ["homepage", "director"],
      Settings: ["settings"],
    },
  },

  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { data: "yaml" },
      columns: ["category", "year", "featured", "sample"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.relationship({ label: "Category", collection: "services", validation: { isRequired: true } }),
        client: fields.text({ label: "Client", description: "Only name clients you have permission to show." }),
        year: fields.text({ label: "Year" }),
        summary: fields.text({ label: "Summary", description: "1–2 sentences. Let the visuals do the talking.", multiline: true }),
        scope: fields.array(fields.text({ label: "Item" }), {
          label: "Scope (what Lovell Media did)",
          itemLabel: (p) => p.value,
        }),
        credits: fields.array(
          fields.object({ role: fields.text({ label: "Role" }), name: fields.text({ label: "Name" }) }),
          { label: "Credits", itemLabel: (p) => `${p.fields.role.value}: ${p.fields.name.value}` },
        ),
        cover: image("Cover image", "projects", "Landscape, at least 2400px wide."),
        video: video("Video loop (MP4)", "projects", "Optional short muted loop. Under 8MB."),
        embed: fields.url({ label: "Film link (embed URL)", description: "Optional Vimeo/YouTube player URL for the full film." }),
        gallery: fields.array(image("Image", "projects"), { label: "Gallery", itemLabel: (p) => p.value?.filename ?? "Image" }),
        featured: fields.checkbox({ label: "Feature on homepage" }),
        directorGroup: fields.select({
          label: "Director page group",
          description: "Shows this project in a group on the Director page.",
          options: [
            { label: "Not on the Director page", value: "none" },
            { label: "Commercials", value: "commercials" },
            { label: "Music & Performance", value: "music" },
            { label: "Narrative storytelling", value: "narrative" },
          ],
          defaultValue: "none",
        }),
        sample: fields.checkbox({
          label: "Sample / placeholder",
          description: "Untick for real projects. Samples show a 'Sample' badge and are hidden from Google.",
          defaultValue: false,
        }),
        order: fields.integer({ label: "Sort order", description: "Lower numbers appear first.", defaultValue: 100 }),
      },
    }),

    services: collection({
      label: "Services",
      slugField: "name",
      path: "content/services/*",
      format: { data: "yaml" },
      columns: ["order", "statement"],
      schema: {
        name: fields.slug({
          name: { label: "Name" },
          slug: { label: "URL", description: "Changing this changes the page address and breaks existing links." },
        }),
        order: fields.integer({ label: "Number (01–05)", defaultValue: 1 }),
        short: fields.text({ label: "Short label", description: "Used in filters." }),
        statement: fields.text({ label: "One-liner" }),
        description: fields.text({ label: "Description", multiline: true }),
        capabilities: fields.array(fields.text({ label: "Capability" }), {
          label: "Capabilities",
          itemLabel: (p) => p.value,
        }),
        image: image("Hero image", "services", "Landscape, at least 2400px wide."),
        video: video("Hero video loop (MP4)", "services", "Optional. Muted loop, under 8MB."),
        alt: fields.text({ label: "Image description (for accessibility)" }),
      },
    }),
  },

  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "content/homepage",
      format: { data: "yaml" },
      schema: {
        heroLabel: fields.text({ label: "Hero: small label" }),
        heroHeadline: fields.text({ label: "Hero: headline", description: HEADLINE_HINT, multiline: true }),
        heroIntro: fields.text({ label: "Hero: intro", multiline: true }),
        heroButton: fields.text({ label: "Hero: main button" }),
        servicesLabel: fields.text({ label: "Services: small label" }),
        servicesHeadline: fields.text({ label: "Services: headline", description: HEADLINE_HINT, multiline: true }),
        servicesIntro: fields.text({ label: "Services: intro", multiline: true }),
        workLabel: fields.text({ label: "Work: small label" }),
        workHeadline: fields.text({ label: "Work: headline", description: HEADLINE_HINT, multiline: true }),
        studioLabel: fields.text({ label: "Director section: small label" }),
        studioHeadline: fields.text({ label: "Director section: headline", description: HEADLINE_HINT, multiline: true }),
        studioText: fields.text({ label: "Director section: text", multiline: true }),
        studioButton: fields.text({ label: "Director section: button", defaultValue: "Meet the director" }),
        ctaLabel: fields.text({ label: "Closing banner: small label", description: "Shown at the bottom of most pages." }),
        ctaHeadline: fields.text({ label: "Closing banner: headline", description: HEADLINE_HINT, multiline: true }),
        ctaText: fields.text({ label: "Closing banner: text", multiline: true }),
        ctaButton: fields.text({ label: "Closing banner: button" }),
        footerLine: fields.text({ label: "Footer sign-off", description: HEADLINE_HINT, multiline: true }),
      },
    }),

    director: singleton({
      label: "Director page",
      path: "content/director",
      format: { data: "yaml" },
      schema: {
        label: fields.text({ label: "Small label" }),
        headline: fields.text({ label: "Headline", description: HEADLINE_HINT, multiline: true }),
        intro: fields.text({ label: "Intro", multiline: true }),
        portrait: image("Portrait", "director", "Portrait of Latoya, at least 1600px tall."),
        reel: video("Director's reel (MP4)", "director", "60–90s, muted loop or full reel, under 8MB."),
        reelEmbed: fields.url({ label: "Director's reel (Vimeo/YouTube player URL)", description: "Use instead of the MP4 for a longer reel with sound." }),
        reelPoster: image("Reel poster image", "director"),
        commercialsText: fields.text({ label: "Commercials: description", multiline: true }),
        musicText: fields.text({ label: "Music & Performance: description", multiline: true }),
        narrativeText: fields.text({ label: "Narrative storytelling: description", multiline: true }),
        approachHeadline: fields.text({ label: "Approach: headline", description: HEADLINE_HINT, multiline: true }),
        approachText: fields.text({ label: "Approach: text", multiline: true }),
        bio: fields.text({ label: "Biography", description: "Leave empty until approved; the section stays hidden.", multiline: true }),
        button: fields.text({ label: "Button" }),
      },
    }),

    settings: singleton({
      label: "Site settings",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        email: fields.text({ label: "Public contact email" }),
        enquiriesTo: fields.text({
          label: "Send form enquiries to",
          description: "Separate several addresses with commas.",
        }),
        location: fields.text({ label: "City / base", description: "Leave empty to hide." }),
        socials: fields.array(
          fields.object({ label: fields.text({ label: "Platform" }), url: fields.url({ label: "Profile URL" }) }),
          { label: "Social links", itemLabel: (p) => p.fields.label.value || "Link" },
        ),
        showreel: video("Homepage showreel (MP4)", "showreel", "30–60s, 1080p, muted, under 8MB."),
        showreelPoster: image("Showreel poster image", "showreel", "Shown while the video loads."),
        founderName: fields.text({ label: "Founder name" }),
        founderUrl: fields.url({ label: "Founder website" }),
      },
    }),
  },
});
