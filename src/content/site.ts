/**
 * Site-wide settings. Every value marked TODO is a placeholder waiting on
 * confirmed details from Lovell Media — replace before launch.
 */
export const site = {
  name: "Lovell Media",
  tagline: "Every frame has a story.",
  description:
    "Lovell Media is an independent production company bringing ideas to life across out-of-home, concerts, podcasts, events and branded content.",
  // TODO: set to the production domain once confirmed (also used for SEO/sitemap).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lovellmedia.com",
  // Public contact address shown on the site. Using the founder's inbox until a
  // Lovell Media address (e.g. hello@lovellmedia.com) exists. TODO: switch over.
  email: "contact@latoyalovell.com",
  /** Where contact-form enquiries are delivered (override with CONTACT_TO_EMAIL). */
  enquiriesTo: "contact@latoyalovell.com",
  // TODO: confirm city / base for the studio.
  location: "",
  founder: {
    name: "Latoya Lovell",
    url: "https://latoyalovell.com",
  },
  /**
   * Hero showreel. Drop an optimised MP4 (H.264, ~1080p, < 8MB, no audio)
   * into /public/media and set `src`. `poster` is shown while it loads and
   * to users who prefer reduced motion. Leave src empty to use the animated
   * placeholder composition.
   */
  showreel: {
    src: "",
    poster: "",
  },
  /** TODO: replace with Lovell Media's real profile URLs. Empty hrefs are hidden. */
  socials: [
    { label: "Instagram", href: "" },
    { label: "TikTok", href: "" },
    { label: "YouTube", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Vimeo", href: "" },
  ],
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export function activeSocials() {
  return site.socials.filter((s) => s.href);
}
