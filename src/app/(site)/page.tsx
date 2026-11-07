import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ServiceIndex } from "@/components/ServiceIndex";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Frame } from "@/components/Frame";
import { Rich } from "@/components/Rich";
import { getFeaturedProjects, getHomepage, getServices } from "@/lib/content";

export default async function Home() {
  const [services, featured, home] = await Promise.all([getServices(), getFeaturedProjects(), getHomepage()]);
  const [lead, ...rest] = featured;
  return (
    <>
      <Hero />

      <Marquee items={services.map((s) => s.name)} />

      {/* C. Services overview */}
      <section className="container-x py-24 md:py-36" aria-labelledby="services-h">
        <SectionHeading
          eyebrow={home.servicesLabel}
          title={<span id="services-h"><Rich text={home.servicesHeadline} /></span>}
          aside={home.servicesIntro}
          className="mb-14 md:mb-20"
        />
        <ServiceIndex services={services} />
      </section>

      {/* D. Featured work */}
      <section className="border-t border-line py-24 md:py-36" aria-labelledby="work-h">
        <div className="container-x">
          <SectionHeading
            eyebrow={home.workLabel}
            title={<span id="work-h"><Rich text={home.workHeadline} /></span>}
            aside={
              <Link href="/work" className="btn btn-ghost">
                All work <span className="arrow">→</span>
              </Link>
            }
            className="mb-14 md:mb-20"
          />
          {lead && (
            <Reveal>
              <ProjectCard project={lead} aspect="aspect-[16/9] md:aspect-[21/9]" sizes="100vw" priority />
            </Reveal>
          )}
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120} className={i % 2 === 1 ? "md:mt-24" : ""}>
                <ProjectCard project={p} aspect={i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* E. Studio */}
      <section className="border-t border-line bg-ink-2 py-24 md:py-36" aria-labelledby="studio-h">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
              <span className="h-px w-8 bg-red" /> {home.studioLabel}
            </p>
            <h2 id="studio-h" className="display text-[clamp(2.75rem,7vw,6.5rem)]">
              <Rich text={home.studioHeadline} />
            </h2>
            <p className="mt-8 max-w-xl text-lg text-mute">
              {home.studioText}
            </p>
            <Link href="/studio" className="btn btn-ghost mt-10">
              About the studio <span className="arrow">→</span>
            </Link>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <Frame category="concerts" className="aspect-[3/4]" />
              <Frame category="podcasts" className="mt-12 aspect-[3/4]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* F. CTA */}
      <CtaBand />
    </>
  );
}
