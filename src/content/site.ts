/**
 * Fixed, code-level site constants. Everything editable (email, socials,
 * showreel, wording, projects, services) is in the content editor at /keystatic
 * and read via src/lib/content.ts.
 */
export const site = {
  name: "Lovell Media",
  description:
    "Lovell Media is an independent production company bringing ideas to life across out-of-home, concerts, podcasts, events and branded content.",
  // TODO: set NEXT_PUBLIC_SITE_URL to the production domain once confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lovellmedia.com",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;
