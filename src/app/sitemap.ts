import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects, getServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), priority: 1 },
    { url: u("/work"), priority: 0.9 },
    { url: u("/services"), priority: 0.9 },
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), priority: 0.8 })),
    // Sample projects are noindex; only real ones go in the sitemap.
    ...projects.filter((p) => !p.sample).map((p) => ({ url: u(`/work/${p.slug}`), priority: 0.7 })),
    { url: u("/director"), priority: 0.8 },
    { url: u("/studio"), priority: 0.6 },
    { url: u("/contact"), priority: 0.6 },
    { url: u("/privacy"), priority: 0.2 },
  ];
}
