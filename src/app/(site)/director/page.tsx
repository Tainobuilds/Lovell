import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { Rich, plain } from "@/components/Rich";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { getDirector, getProjects } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDirector();
  return {
    title: "Director",
    description: d.intro || `${plain(d.headline)} Founder and director of Lovell Media.`,
    alternates: { canonical: "/director" },
  };
}

const GROUPS = [
  { key: "commercials", name: "Commercials", text: "commercialsText" },
  { key: "music", name: "Music & Performance", text: "musicText" },
  { key: "narrative", name: "Narrative storytelling", text: "narrativeText" },
] as const;

export default async function DirectorPage() {
  const [d, projects] = await Promise.all([getDirector(), getProjects()]);

  return (
    <>
      {/* Founder profile */}
      <section className="container-x grid items-end gap-12 pb-16 pt-32 md:grid-cols-12 md:pb-24 md:pt-44">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-red" /> {d.label}
          </p>
          <h1 className="display text-[clamp(3.5rem,11vw,10rem)]">
            <Rich text={d.headline} />
          </h1>
          <p className="mt-8 max-w-xl text-lg text-mute md:text-xl">{d.intro}</p>
          <Link href="/contact?service=directing" className="btn btn-red mt-10">
            {d.button} <span className="arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={120} className="md:col-span-5">
          <Frame
            src={d.portrait}
            alt="Portrait of Latoya Lovell"
            label="Portrait of Latoya Lovell"
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5]"
          />
        </Reveal>
      </section>

      {/* Director's reel */}
      <section aria-label="Director's reel" className="container-x">
      <Reveal>
        {d.reelEmbed ? (
          <div className="relative aspect-video w-full bg-ink-3">
            <iframe
              src={d.reelEmbed}
              title="Latoya Lovell, director's reel"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <Frame
            video={d.reel}
            src={d.reelPoster}
            alt="Latoya Lovell, director's reel"
            category="branded-content"
            label="Director's reel"
            className="aspect-video w-full"
          />
        )}
      </Reveal>
      </section>

      {/* Approach */}
      <section className="container-x py-24 md:py-32">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <h2 className="display text-[clamp(2.5rem,6vw,5.5rem)] md:col-span-7">
            <Rich text={d.approachHeadline} />
          </h2>
          <p className="text-lg text-mute md:col-span-4 md:col-start-9 md:self-end md:text-xl">{d.approachText}</p>
        </Reveal>
      </section>

      {/* Portfolio groups */}
      {GROUPS.map((g, i) => {
        const work = projects.filter((p) => p.directorGroup === g.key);
        return (
          <section key={g.key} className="border-t border-line py-20 md:py-28" aria-labelledby={`group-${g.key}`}>
            <div className="container-x">
              <Reveal className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
                <h2 id={`group-${g.key}`} className="display text-[clamp(2.5rem,6vw,5rem)] md:col-span-7">
                  <span className="mr-4 text-red">{String(i + 1).padStart(2, "0")}</span>
                  {g.name}
                </h2>
                <p className="text-mute md:col-span-4 md:col-start-9 md:text-lg">{d[g.text]}</p>
              </Reveal>
              {work.length ? (
                <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                  {work.map((p, n) => (
                    <Reveal key={p.slug} delay={n * 100}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <p className="text-mute">New work coming soon.</p>
              )}
            </div>
          </section>
        );
      })}

      {/* Biography: hidden until written and approved */}
      {d.bio && (
        <section className="border-t border-line py-24 md:py-32" aria-labelledby="bio-h">
          <Reveal className="container-x grid gap-8 md:grid-cols-12">
            <h2 id="bio-h" className="eyebrow flex items-center gap-3 text-mute md:col-span-3">
              <span className="h-px w-8 bg-red" /> Biography
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-paper/85 md:col-span-8 md:col-start-5">
              {d.bio.split(/\n\s*\n/).map((para, n) => (
                <p key={n}>{para}</p>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <CtaBand eyebrow="Work with Latoya" href="/contact?service=directing" label={d.button} />
    </>
  );
}
