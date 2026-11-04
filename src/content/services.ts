export type ServiceSlug = "ooh" | "concerts" | "podcasts" | "events" | "branded-content";

export type Service = {
  slug: ServiceSlug;
  index: string;
  name: string;
  /** Short label used in filters and tags. */
  short: string;
  /** One-line positioning statement. */
  statement: string;
  description: string;
  capabilities: string[];
  /** Optional hero image/video for the service page (path under /public). */
  media?: { image?: string; video?: string; alt?: string };
};

export const services: Service[] = [
  {
    slug: "ooh",
    index: "01",
    name: "OOH",
    short: "OOH",
    statement: "Stories built for the street.",
    description:
      "Out-of-home campaigns designed to stop people mid-stride, from large-format billboards and transit takeovers to public installations and brand placements that live in the city.",
    capabilities: [
      "Billboard & large-format campaigns",
      "Transit & street-level placements",
      "Public installations",
      "Digital out-of-home content",
      "Campaign photography & motion",
      "Production & site coordination",
    ],
  },
  {
    slug: "concerts",
    index: "02",
    name: "Concerts",
    short: "Concerts",
    statement: "The energy of the room, captured.",
    description:
      "Concert and live music production, from stage visuals and performance capture to the moments behind the curtain that make a show feel like an event.",
    capabilities: [
      "Live music production",
      "Stage visuals & screen content",
      "Multi-camera performance capture",
      "Behind-the-scenes documentary",
      "Tour & festival content",
      "Artist & crew coordination",
    ],
  },
  {
    slug: "podcasts",
    index: "03",
    name: "Podcasts",
    short: "Podcasts",
    statement: "Conversations worth watching.",
    description:
      "Podcast production that looks as good as it sounds, with designed recording environments, multi-camera video podcasts, interviews and multimedia storytelling built for every platform.",
    capabilities: [
      "Audio & video podcast production",
      "Set & recording environment design",
      "Interview series",
      "Short-form clips & social cutdowns",
      "Show development & format",
      "Post-production & distribution prep",
    ],
  },
  {
    slug: "events",
    index: "04",
    name: "Events",
    short: "Events",
    statement: "Experiences people carry home.",
    description:
      "Event production for brands, companies and culture: experiential activations, launches, corporate events and gatherings produced end-to-end and documented with intent.",
    capabilities: [
      "Experiential activations",
      "Brand launches & experiences",
      "Corporate events",
      "Cultural gatherings",
      "Event content & recap films",
      "Production management",
    ],
  },
  {
    slug: "branded-content",
    index: "05",
    name: "Branded Content",
    short: "Branded",
    statement: "Brand stories with a point of view.",
    description:
      "Creative campaigns, brand collaborations and commercial production: promotional films and original content developed with brands to say something, not just sell something.",
    capabilities: [
      "Commercial production",
      "Campaign concept & creative direction",
      "Brand collaborations",
      "Promotional & social films",
      "Original branded series",
      "Photography & stills",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
