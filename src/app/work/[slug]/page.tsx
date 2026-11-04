import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: project.cover ? { images: [project.cover] } : undefined,
    // Keep sample entries out of search results until they're replaced.
    robots: project.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const service = getService(project.category)!;
  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const gallery: (string | undefined)[] = project.gallery.length ? project.gallery : [undefined, undefined, undefined];

  return (
    <>
      <section className="container-x pt-32 md:pt-44">
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow mb-6 text-mute">
            <Link href="/work" className="link-u hover:text-paper">Work</Link>
            <span className="mx-3 text-red-bright">/</span>
            <Link href={`/work?category=${service.slug}`} className="link-u hover:text-paper">{service.name}</Link>
          </nav>
          <h1 className="display text-[clamp(3.25rem,10vw,9.5rem)]">{project.title}</h1>
          {project.sample && (
            <p className="eyebrow mt-6 inline-block border border-paper/30 px-3 py-2 text-mute">
              Sample project · replace with an authentic Lovell Media production
            </p>
          )}
        </Reveal>
      </section>

      <Reveal className="mt-12 md:mt-16">
        {project.embed ? (
          <div className="relative aspect-video w-full bg-ink-3">
            <iframe
              src={project.embed}
              title={project.title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <Frame
            src={project.cover}
            video={project.video}
            alt={project.title}
            category={project.category}
            label={project.title}
            priority
            className="aspect-[16/9] w-full md:aspect-[21/9]"
          />
        )}
      </Reveal>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-1">
            <Meta label="Client" value={project.client} />
            <Meta label="Year" value={project.year} />
            <Meta label="Category" value={<Link href={`/services/${service.slug}`} className="link-u">{service.name}</Link>} />
            {project.credits.map((c) => (
              <Meta key={c.role} label={c.role} value={c.name} />
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120} className="md:col-span-7 md:col-start-6">
          <p className="text-2xl leading-snug md:text-4xl md:leading-tight">{project.summary}</p>
          <h2 className="eyebrow mb-4 mt-12 text-faint">Scope</h2>
          <ul className="flex flex-wrap gap-2">
            {project.scope.map((s) => (
              <li key={s} className="border border-line px-3 py-2 text-sm text-mute">{s}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-label="Gallery" className="container-x pb-24 md:pb-32">
        <ProjectGallery
          category={project.category}
          items={gallery.map((src, n) => ({ src, alt: `${project.title}, still ${n + 1}` }))}
        />
      </section>

      <Link href={`/work/${next.slug}`} className="group block border-t border-line">
        <div className="container-x flex items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="eyebrow text-faint">Next project · {getService(next.category)?.name}</p>
            <p className="display mt-3 text-[clamp(2.5rem,7vw,6.5rem)] transition-colors group-hover:text-red">{next.title}</p>
          </div>
          <span aria-hidden className="display text-6xl transition-transform duration-500 group-hover:translate-x-3 md:text-8xl">→</span>
        </div>
      </Link>

      <CtaBand href={`/contact?service=${service.slug}`} />
    </>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="eyebrow text-faint">{label}</dt>
      <dd className="mt-2 text-lg">{value}</dd>
    </div>
  );
}
