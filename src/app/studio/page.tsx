import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Lovell Media is an independent production company: concept, production and delivery across OOH, live music, podcasts, events and branded content.",
  alternates: { canonical: "/studio" },
};

const principles = [
  {
    title: "Story first",
    body: "Every brief starts with the story. The format, the scale and the spectacle all follow from what needs to be said.",
  },
  {
    title: "Produced end to end",
    body: "Concept, planning, crew, shoot, build and post. We coordinate the moving parts so the work arrives whole.",
  },
  {
    title: "Built for every screen",
    body: "A billboard, a stage, a feed. We plan the frame for wherever it will be seen, and for everywhere it will travel next.",
  },
  {
    title: "Independent by design",
    body: "An independent company means a direct line to the people making the work, and the freedom to make it properly.",
  },
];

const process = [
  { step: "Listen", body: "We get under the brief: the audience, the moment, the ambition." },
  { step: "Develop", body: "Concept, treatment and a production plan that makes the idea real." },
  { step: "Produce", body: "Crew, locations, builds and the day itself, run with care." },
  { step: "Deliver", body: "Edit, finish and versioning for every placement and platform." },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title={
          <>
            We make <br />
            <span className="text-red">the frame</span> <span className="editorial">matter.</span>
          </>
        }
        intro="Lovell Media is an independent production company working across entertainment, culture, advertising and live experiences. We bring ideas to life through creative production and visual storytelling."
      />

      <Reveal className="container-x">
        <Frame label="Studio / team photography" className="aspect-[16/9] md:aspect-[21/9]" priority />
      </Reveal>

      <section className="container-x py-24 md:py-36" aria-labelledby="approach-h">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> Our approach
          </p>
          <h2 id="approach-h" className="display text-[clamp(2.75rem,7vw,6.5rem)]">
            How we work.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-line md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100} className="bg-ink p-8 md:p-12">
              <p className="eyebrow text-red">0{i + 1}</p>
              <h3 className="display mt-4 text-4xl md:text-5xl">{p.title}</h3>
              <p className="mt-4 max-w-md text-mute">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="process-h">
        <div className="container-x">
          <Reveal>
            <h2 id="process-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
              Idea <span className="text-red">→</span> frame.
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

      <section className="container-x py-24 md:py-36" aria-labelledby="cap-h">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
              <span className="h-px w-8 bg-red" /> Capabilities
            </p>
            <h2 id="cap-h" className="display text-[clamp(2.5rem,6vw,5rem)]">
              One house. <br />
              Five disciplines.
            </h2>
            <p className="mt-6 max-w-md text-mute">
              Founded by{" "}
              <a href={site.founder.url} target="_blank" rel="noopener noreferrer" className="link-u text-paper">
                {site.founder.name}
              </a>
              , Lovell Media is built as a company with room to grow. Its team, partners and
              crew come together around each production.
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
                    <span className="eyebrow text-red">{s.index}</span>
                    <span className="display text-4xl transition-colors group-hover:text-red md:text-5xl">{s.name}</span>
                  </span>
                  <span className="hidden text-right text-sm text-mute sm:block">{s.capabilities.slice(0, 2).join(" · ")}</span>
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
