import type { ServiceSlug } from "./services";

/**
 * Portfolio entries.
 *
 * EVERYTHING BELOW IS SAMPLE CONTENT. Titles describe the *kind* of project
 * each category would hold; none of them are real Lovell Media credits.
 * Replace each entry with an authentic project (or delete it) and set
 * `sample: false`. The "Sample" badge on the site disappears automatically.
 *
 * Media paths are relative to /public, e.g. "/media/projects/my-project/cover.jpg".
 * Any entry without media renders a branded placeholder frame instead.
 */
export type Project = {
  slug: string;
  title: string;
  category: ServiceSlug;
  client: string;
  year: string;
  /** One or two sentences. Keep it short; the visuals do the talking. */
  summary: string;
  /** What Lovell Media did on the project. */
  scope: string[];
  /** Credits, e.g. { role: "Director", name: "..." }. Leave empty until confirmed. */
  credits: { role: string; name: string }[];
  cover?: string;
  /** Optional MP4 shown on the detail page (autoplays muted, loops). */
  video?: string;
  /** Optional embed URL for a hosted film (YouTube/Vimeo player URL). */
  embed?: string;
  gallery: string[];
  featured: boolean;
  sample: boolean;
};

const TBC = "Client name";

export const projects: Project[] = [
  {
    slug: "city-scale-billboard-campaign",
    title: "City-Scale Billboard Campaign",
    category: "ooh",
    client: TBC,
    year: "—",
    summary:
      "A large-format campaign placeholder: hero billboard imagery, adapted across roadside, transit and digital screens.",
    scope: ["Creative direction", "Campaign photography", "Large-format adaptation", "Placement coordination"],
    credits: [],
    gallery: [],
    featured: true,
    sample: true,
  },
  {
    slug: "public-installation",
    title: "Public Installation",
    category: "ooh",
    client: TBC,
    year: "—",
    summary: "A placeholder for a public-space installation and the content captured around it.",
    scope: ["Concept", "Fabrication coordination", "Documentation"],
    credits: [],
    gallery: [],
    featured: false,
    sample: true,
  },
  {
    slug: "live-concert-film",
    title: "Live Concert Film",
    category: "concerts",
    client: TBC,
    year: "—",
    summary:
      "A placeholder for multi-camera performance capture, stage visuals and the story of the night.",
    scope: ["Live production", "Multi-camera capture", "Stage visuals", "Edit & grade"],
    credits: [],
    gallery: [],
    featured: true,
    sample: true,
  },
  {
    slug: "tour-behind-the-scenes",
    title: "Tour: Behind the Scenes",
    category: "concerts",
    client: TBC,
    year: "—",
    summary: "A placeholder for documentary-style tour content from soundcheck to encore.",
    scope: ["Documentary", "Social content", "Photography"],
    credits: [],
    gallery: [],
    featured: false,
    sample: true,
  },
  {
    slug: "video-podcast-series",
    title: "Video Podcast Series",
    category: "podcasts",
    client: TBC,
    year: "—",
    summary:
      "A placeholder for a multi-camera video podcast with a designed set and clips cut for social.",
    scope: ["Set design", "Multi-camera recording", "Audio post", "Social cutdowns"],
    credits: [],
    gallery: [],
    featured: true,
    sample: true,
  },
  {
    slug: "interview-series",
    title: "Interview Series",
    category: "podcasts",
    client: TBC,
    year: "—",
    summary: "A placeholder for long-form interviews and multimedia storytelling.",
    scope: ["Format development", "Recording", "Post-production"],
    credits: [],
    gallery: [],
    featured: false,
    sample: true,
  },
  {
    slug: "experiential-brand-activation",
    title: "Experiential Brand Activation",
    category: "events",
    client: TBC,
    year: "—",
    summary:
      "A placeholder for an end-to-end brand experience: concept, build, live day and recap film.",
    scope: ["Experience design", "Production management", "Recap film"],
    credits: [],
    gallery: [],
    featured: true,
    sample: true,
  },
  {
    slug: "cultural-gathering",
    title: "Cultural Gathering",
    category: "events",
    client: TBC,
    year: "—",
    summary: "A placeholder for a community or cultural event, produced and documented.",
    scope: ["Event production", "Photography", "Content"],
    credits: [],
    gallery: [],
    featured: false,
    sample: true,
  },
  {
    slug: "brand-campaign-film",
    title: "Brand Campaign Film",
    category: "branded-content",
    client: TBC,
    year: "—",
    summary:
      "A placeholder for a commercial campaign film with stills and social edits.",
    scope: ["Creative direction", "Commercial production", "Stills", "Social edits"],
    credits: [],
    gallery: [],
    featured: true,
    sample: true,
  },
  {
    slug: "original-branded-series",
    title: "Original Branded Series",
    category: "branded-content",
    client: TBC,
    year: "—",
    summary: "A placeholder for an original short-form series developed with a brand partner.",
    scope: ["Series development", "Production", "Post-production"],
    credits: [],
    gallery: [],
    featured: false,
    sample: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsFor(category: ServiceSlug) {
  return projects.filter((p) => p.category === category);
}

export const featuredProjects = projects.filter((p) => p.featured);
