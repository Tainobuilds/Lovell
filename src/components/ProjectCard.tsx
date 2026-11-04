import Link from "next/link";
import type { Project } from "@/content/projects";
import { getService } from "@/content/services";
import { Frame } from "./Frame";

export function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority,
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const service = getService(project.category);
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className={`relative overflow-hidden ${aspect}`}>
        <Frame
          src={project.cover}
          alt={project.title}
          category={project.category}
          sizes={sizes}
          priority={priority}
          className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-red/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-red/25" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="eyebrow bg-ink/80 px-2.5 py-1.5 text-[0.6rem] backdrop-blur">{service?.name}</span>
          {project.sample && (
            <span className="eyebrow border border-paper/30 px-2.5 py-1.5 text-[0.6rem] text-mute">Sample</span>
          )}
        </div>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-red text-lg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          ↗
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl transition-colors group-hover:text-red md:text-3xl">{project.title}</h3>
        <span className="eyebrow shrink-0 text-faint">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-mute">{project.client}</p>
    </Link>
  );
}
