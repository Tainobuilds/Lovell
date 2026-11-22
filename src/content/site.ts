/**
 * Fixed, code-level site constants. Everything editable (email, socials,
 * showreel, wording, projects, services) is in the content editor at /keystatic
 * and read via src/lib/content.ts.
 */
export const site = {
  name: "Lovell Media",
  description:
    "Lovell Media is a global creative production and digital media agency bringing ideas to life through visual storytelling, branded content, social media and digital experiences.",
  // TODO: set NEXT_PUBLIC_SITE_URL to the production domain once confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lovellmedia.com",
} as const;

export const nav = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/global-production", label: "Global Production" },
  { href: "/contact", label: "Contact" },
] as const;
