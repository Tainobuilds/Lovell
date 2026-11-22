import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { getGlobal, getProjects } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const g = await getGlobal();
  return { title: "Global Production", description: g.intro, alternates: { canonical: "/global-production" } };
}

const steps = [
  { step: "Brief", body: "One conversation about every market, format and deadline." },
  { step: "Crew", body: "Local photographers and videographers sourced and briefed." },
  { step: "Coordinate", body: "Shoots scheduled and run from one central team." },
  { step: "Deliver", body: "Consistent files, formats and turnaround from every location." },
];

export default async function GlobalProductionPage() {
  const [g, projects] = await Promise.all([getGlobal(), getProjects()]);
  // Projects that list more than one market, or are filed as multilocation work.
  const multi = projects.filter((p) => /multi|cities|countries|markets/i.test(`${p.title} ${p.location}`)).slice(0, 2);

  return (
    <>
      <section className="relative flex min-h-[80svh] items-end overflow-hidden">
        <Frame src={g.image} category="global" alt="" priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="container-x relative pb-14 pt-40 md:pb-20">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-paper/80">
              <span className="h-px w-8 bg-red" /> {g.label}
            </p>
            <h1 className="display text-[clamp(3.5rem,12vw,11rem)]">
              <Rich text={g.headline} />
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-paper/85 md:text-xl">{g.intro}</p>
            <Link href="/contact?service=global" className="btn btn-red mt-10">
              Plan an international project <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="container-x py-24 md:py-32" aria-labelledby="global-cap-h">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> Capabilities
          </p>
          <h2 id="global-cap-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
            What we coordinate.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {g.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 80} className="bg-ink p-8">
              <p className="eyebrow text-red-bright">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-4 text-3xl">{c.title}</h3>
              <p className="mt-3 text-mute">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* One point of contact */}
      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="how-h">
        <div className="container-x">
          <Reveal>
            <h2 id="how-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
              One point of <span className="text-red">contact.</span>
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 100} className="border-t border-paper/40 pt-6">
                <span className="eyebrow text-faint">Step 0{i + 1}</span>
                <h3 className="display mt-3 text-4xl">{s.step}</h3>
                <p className="mt-3 text-mute">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Crew network */}
      <section className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-32" aria-labelledby="network-h">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> In development
          </p>
          <h2 id="network-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
            <Rich text={g.networkHeadline} />
          </h2>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="text-lg text-mute">{g.networkText}</p>
        </Reveal>
      </section>

      {multi.length > 0 && (
        <section className="border-t border-line py-24 md:py-32" aria-labelledby="global-work-h">
          <div className="container-x">
            <h2 id="global-work-h" className="display mb-12 text-[clamp(2.5rem,6vw,5rem)]">
              Across <span className="text-red">markets</span>
            </h2>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {multi.map((p, n) => (
                <Reveal key={p.slug} delay={n * 100}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="International projects"
        title={
          <>
            One brief. <br className="hidden sm:block" />
            <span className="editorial">Every market.</span>
          </>
        }
        href="/contact?service=global"
      />
    </>
  );
}
