import Link from "next/link";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { ProjectCard } from "./ProjectCard";

const layouts = ["md:col-span-7 aspect-[4/3]", "md:col-span-5 aspect-[4/5]", "md:col-span-5 aspect-[4/5]", "md:col-span-7 aspect-[4/3]"];

/**
 * Portfolio grid with category filtering. Filters are plain links to
 * ?category=, so they are shareable and work without JavaScript.
 * Hook-free so it can render both as the static fallback and on the client.
 */
export function WorkGallery({
  projects,
  services,
  category,
}: {
  projects: Project[];
  services: Service[];
  category: string | null;
}) {
  const active = services.some((s) => s.slug === category) ? category : null;
  const shown = active ? projects.filter((p) => p.category === active) : projects;

  const filters = [{ slug: null, name: "All", count: projects.length }, ...services.map((s) => ({
    slug: s.slug as string | null,
    name: s.name,
    count: projects.filter((p) => p.category === s.slug).length,
  }))];

  return (
    <>
      <nav aria-label="Filter by category" className="-mx-4 mb-14 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {filters.map((f) => {
          const on = active === f.slug;
          return (
            <Link
              key={f.name}
              href={f.slug ? `/work?category=${f.slug}` : "/work"}
              replace
              scroll={false}
              aria-current={on ? "true" : undefined}
              className={`eyebrow shrink-0 border px-4 py-3 transition-colors ${
                on ? "border-red bg-red text-paper" : "border-line text-mute hover:border-paper hover:text-paper"
              }`}
            >
              {f.name} <sup className="ml-1 text-[0.6rem]">{f.count}</sup>
            </Link>
          );
        })}
      </nav>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} project{shown.length === 1 ? "" : "s"}
      </p>

      {/* key forces a re-mount so cards animate in on every filter change */}
      <div key={active ?? "all"} className="grid gap-x-8 gap-y-16 md:grid-cols-12">
        {shown.map((p, i) => {
          const [span, aspect] = splitLayout(layouts[i % layouts.length]);
          return (
            <div
              key={p.slug}
              className={`${span} animate-[fade-up_0.9s_var(--ease-cine)_both]`}
              style={{ animationDelay: `${(i % 4) * 80}ms` }}
            >
              <ProjectCard project={p} aspect={aspect} sizes="(min-width: 768px) 58vw, 100vw" priority={i < 2} />
            </div>
          );
        })}
      </div>

      {shown.length === 0 && <p className="py-20 text-center text-mute">New work in this category is coming soon.</p>}
    </>
  );
}

function splitLayout(l: string) {
  const [span, aspect] = l.split(" ");
  return [span, aspect] as const;
}
