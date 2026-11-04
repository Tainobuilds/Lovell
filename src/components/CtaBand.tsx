import Link from "next/link";
import { Reveal } from "./Reveal";

/** Closing statement used at the bottom of every page. */
export function CtaBand({
  eyebrow = "Start a project",
  title = (
    <>
      Let&rsquo;s make <br className="hidden sm:block" />
      the next <span className="editorial text-paper">frame.</span>
    </>
  ),
  body = "Brands, artists, agencies and collaborators — tell us what you're making and we'll show you how we'd bring it to life.",
  href = "/contact",
  label = "Start a project",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-red">
      <div aria-hidden className="pointer-events-none absolute -right-[10%] top-1/2 -translate-y-1/2 select-none display text-[40vw] leading-none text-red-deep/60">
        LM
      </div>
      <div className="container-x relative py-24 md:py-36">
        <Reveal>
          <p className="eyebrow mb-6 text-paper/80">{eyebrow}</p>
          <h2 className="display text-[clamp(3.5rem,11vw,10rem)] text-ink">{title}</h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-paper/90">{body}</p>
            <Link href={href} className="btn bg-ink text-paper hover:bg-paper hover:text-ink">
              {label} <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
