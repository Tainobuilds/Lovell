import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { CtaBand } from "@/components/CtaBand";
import { getAbout, getServices } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const a = await getAbout();
  return { title: "About Us", description: a.intro, alternates: { canonical: "/about" } };
}

const process = [
  { step: "Listen", body: "We get under the brief: the audience, the markets, the ambition." },
  { step: "Develop", body: "Concept, treatment and a production plan that makes the idea real." },
  { step: "Produce", body: "Crews, locations and the day itself, run with care in every market." },
  { step: "Deliver", body: "Edit, finish and versioning for every placement and platform." },
];

export default async function AboutPage() {
  const [a, services] = await Promise.all([getAbout(), getServices()]);
  return (
    <>
      <PageHero eyebrow="About us" title={<Rich text={a.headline} />} intro={a.intro} />

      <Reveal className="container-x">
        <Frame src={a.image} alt="The Lovell Media team at work" label="Team / studio photography" className="aspect-[16/9] md:aspect-[21/9]" priority />
      </Reveal>

      {/* Story + international development */}
      <section className="container-x grid gap-14 py-24 md:grid-cols-12 md:py-32" aria-label="Our story">
        <Reveal className="md:col-span-6">
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> Our story
          </p>
          <p className="text-2xl leading-snug md:text-3xl md:leading-snug">{a.story}</p>
        </Reveal>
        <Reveal delay={120} className="md:col-span-5 md:col-start-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> International
          </p>
          <p className="text-lg text-mute">{a.international}</p>
          <Link href="/global-production" className="btn btn-ghost mt-8">
            Global production <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>

      {/* Creative philosophy */}
      <section className="border-t border-line py-24 md:py-32" aria-labelledby="philosophy-h">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
              <span className="h-px w-8 bg-red" /> Creative philosophy
            </p>
            <h2 id="philosophy-h" className="display text-[clamp(2.75rem,7vw,6.5rem)]">
              How we work.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2">
            {a.principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 100} className="bg-ink p-8 md:p-12">
                <p className="eyebrow text-red-bright">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-4xl md:text-5xl">{p.title}</h3>
                <p className="mt-4 max-w-md text-mute">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="process-h">
        <div className="container-x">
          <Reveal>
            <h2 id="process-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
              Idea <span className="text-red">→</span> delivery.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 100} className="border-t border-paper/40 pt-6">
                <span className="eyebrow text-faint">Step 0{i + 1}</span>
                <h3 className="display mt-3 text-4xl">{p.step}</h3>
                <p className="mt-3 text-mute">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership: hidden until people are added in the editor */}
      {a.leadership.length > 0 && (
        <section className="container-x py-24 md:py-32" aria-labelledby="leadership-h">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
              <span className="h-px w-8 bg-red" /> Leadership
            </p>
            <h2 id="leadership-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
              The team.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {a.leadership.map((l, i) => (
              <Reveal key={l.name || i} delay={(i % 3) * 100}>
                <Frame src={l.photo} alt={l.name} label={l.name} className="aspect-[4/5]" sizes="(min-width: 1024px) 33vw, 50vw" />
                <h3 className="display mt-5 text-3xl">{l.name}</h3>
                <p className="eyebrow mt-2 text-red-bright">{l.role}</p>
                {l.bio && <p className="mt-3 text-mute">{l.bio}</p>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Services index */}
      <section className="container-x py-24 md:py-32" aria-labelledby="cap-h">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
              <span className="h-px w-8 bg-red" /> Services
            </p>
            <h2 id="cap-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
              One agency. <br />
              Every discipline.
            </h2>
            <p className="mt-6 max-w-md text-mute">
              Take a single service or the whole project. Our team, partners and crews come together
              around each one.
            </p>
          </Reveal>
          <div className="md:col-span-7">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-t border-line py-6 last:border-b"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="eyebrow text-red-bright">{s.index}</span>
                    <span className="display text-3xl transition-colors group-hover:text-red md:text-4xl">{s.name}</span>
                  </span>
                  <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
