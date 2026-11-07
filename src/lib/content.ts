import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import type { Project, Service } from "@/content/types";

/**
 * All site content is read from the YAML files in /content (edited through
 * the Keystatic editor at /keystatic). Pages are statically generated, so this
 * runs at build time; each call is cached per request.
 */
const reader = createReader(process.cwd(), keystaticConfig);

const opt = (v: string | null | undefined) => v || undefined;

export const getServices = cache(async (): Promise<Service[]> => {
  const all = await reader.collections.services.all();
  return all
    .map(({ slug, entry }) => ({
      slug,
      index: String(entry.order).padStart(2, "0"),
      order: entry.order ?? 99,
      name: entry.name,
      short: entry.short || entry.name,
      statement: entry.statement,
      description: entry.description,
      capabilities: [...entry.capabilities],
      media:
        entry.image || entry.video
          ? { image: opt(entry.image), video: opt(entry.video), alt: entry.alt || entry.name }
          : undefined,
    }))
    .sort((a, b) => a.order - b.order)
    .map((s) => {
      const { order, ...service } = s;
      void order;
      return service;
    });
});

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug);
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const [all, services] = await Promise.all([reader.collections.projects.all(), getServices()]);
  const names = new Map(services.map((s) => [s.slug, s.name]));
  return all
    .map(({ slug, entry }) => ({
      order: entry.order ?? 100,
      project: {
        slug,
        title: entry.title,
        category: entry.category ?? "",
        categoryName: names.get(entry.category ?? "") ?? "",
        client: entry.client,
        year: entry.year,
        summary: entry.summary,
        scope: [...entry.scope],
        credits: entry.credits.map((c) => ({ role: c.role, name: c.name })),
        cover: opt(entry.cover),
        video: opt(entry.video),
        embed: opt(entry.embed),
        gallery: entry.gallery.filter((g): g is string => Boolean(g)),
        featured: entry.featured,
        sample: entry.sample,
      } satisfies Project,
    }))
    .sort((a, b) => a.order - b.order || a.project.title.localeCompare(b.project.title))
    .map((p) => p.project);
});

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getProjectsFor(category: string) {
  return (await getProjects()).filter((p) => p.category === category);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.featured);
}

export const getSettings = cache(async () => {
  const s = await reader.singletons.settings.readOrThrow();
  return {
    email: s.email,
    enquiriesTo: s.enquiriesTo || s.email,
    location: s.location,
    socials: s.socials.filter((x) => x.url).map((x) => ({ label: x.label, href: x.url as string })),
    showreel: { src: opt(s.showreel), poster: opt(s.showreelPoster) },
    founder: { name: s.founderName, url: opt(s.founderUrl) },
  };
});

export const getHomepage = cache(async () => reader.singletons.homepage.readOrThrow());
