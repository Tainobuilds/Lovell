import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { getService, services } from "@/content/services";
import { projectsFor } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.name} Production`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const i = services.indexOf(service);
  const next = services[(i + 1) % services.length];
  const work = projectsFor(service.slug);

  return (
    <>
      {/* Full-bleed hero, each category carries its own visual. */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <Frame
          category={service.slug}
          src={service.media?.image}
          video={service.media?.video}
          alt={service.media?.alt}
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
        <div className="container-x relative pb-14 pt-40 md:pb-20">
          <Reveal>
            <nav aria-label="Breadcrumb" className="eyebrow mb-6 text-mute">
              <Link href="/services" className="link-u hover:text-paper">Services</Link>
              <span className="mx-3 text-red">/</span>
              <span className="text-paper">{service.index}</span>
            </nav>
            <h1 className="display text-[clamp(4.5rem,16vw,16rem)]">{service.name}</h1>
            <p className="editorial mt-4 text-3xl md:text-5xl">{service.statement}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-14 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> The service
          </p>
          <p className="text-2xl leading-snug md:text-4xl md:leading-tight">{service.description}</p>
          <Link href={`/contact?service=${service.slug}`} className="btn btn-red mt-12">
            Enquire about {service.name} <span className="arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9">
          <h2 className="eyebrow mb-6 text-faint">Capabilities</h2>
          <ul>
            {service.capabilities.map((c, n) => (
              <li key={c} className="flex items-baseline gap-4 border-t border-line py-4 last:border-b">
                <span className="eyebrow text-red">{String(n + 1).padStart(2, "0")}</span>
                <span className="text-lg">{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {work.length > 0 && (
        <section className="border-t border-line py-24 md:py-32" aria-labelledby="svc-work-h">
          <div className="container-x">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 id="svc-work-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
                {service.name} <span className="text-red">work</span>
              </h2>
              <Link href={`/work?category=${service.slug}`} className="link-u eyebrow shrink-0 text-mute hover:text-paper">
                View all →
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {work.map((p, n) => (
                <Reveal key={p.slug} delay={n * 100}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Link href={`/services/${next.slug}`} className="group block border-t border-line">
        <div className="container-x flex items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="eyebrow text-faint">Next service · {next.index}</p>
            <p className="display mt-3 text-[clamp(3rem,9vw,8rem)] transition-colors group-hover:text-red">{next.name}</p>
          </div>
          <span aria-hidden className="display text-6xl transition-transform duration-500 group-hover:translate-x-3 md:text-8xl">→</span>
        </div>
      </Link>

      <CtaBand
        eyebrow={`${service.name} enquiries`}
        href={`/contact?service=${service.slug}`}
        label={`Start a ${service.name} project`}
      />
    </>
  );
}
