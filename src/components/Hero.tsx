import Link from "next/link";
import { getHomepage, getSettings } from "@/lib/content";
import { Rich } from "./Rich";
import { Timecode } from "./Timecode";

export async function Hero() {
  const [home, settings] = await Promise.all([getHomepage(), getSettings()]);
  const { src, poster } = settings.showreel;
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* Background: showreel video when supplied, otherwise an animated composition. */}
      <div className="grain absolute inset-0" aria-hidden>
        {src ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            src={src}
            poster={poster || undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="absolute inset-0 animate-drift">
            <div className="absolute -left-[15%] top-[-25%] h-[90%] w-[70%] rounded-full bg-red/50 blur-[140px]" />
            <div className="absolute bottom-[-35%] right-[-15%] h-[80%] w-[60%] rounded-full bg-red/25 blur-[160px]" />
            <div className="absolute right-[12%] top-[18%] h-[45%] w-[30%] bg-[conic-gradient(from_200deg_at_50%_0%,transparent_0deg,rgba(255,255,255,0.10)_14deg,transparent_30deg)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
      </div>

      {/* Viewfinder chrome */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[clamp(1rem,4vw,3.5rem)] bottom-8 top-24 hidden md:block">
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((p) => (
          <span key={p} className={`absolute h-8 w-8 border-paper/40 ${p}`} />
        ))}
        <div className="eyebrow absolute right-4 top-4 flex items-center gap-2 text-[0.62rem] text-paper/70">
          <span className="h-2 w-2 animate-blink rounded-full bg-red" /> REC <Timecode />
        </div>
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pb-14 pt-32 md:pb-20">
        <p className="eyebrow mb-6 flex items-center gap-3 text-paper/80">
          <span className="h-px w-8 bg-red" /> {home.heroLabel}
        </p>
        <h1 className="display text-[clamp(3.5rem,11vw,12rem)]">
          <Rich text={home.heroHeadline} />
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg text-paper/80 md:text-xl">
            {home.heroIntro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/work" className="btn btn-red">
              {home.heroButton} <span className="arrow">→</span>
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
