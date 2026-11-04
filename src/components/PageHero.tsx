import { Reveal } from "./Reveal";

/** Standard hero for inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-x pb-14 pt-36 md:pb-20 md:pt-48">
      <Reveal>
        <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
          <span className="h-px w-8 bg-red" /> {eyebrow}
        </p>
        <h1 className="display text-[clamp(3.5rem,12vw,11rem)]">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-lg text-mute md:text-xl">{intro}</p>}
      </Reveal>
      {children}
    </section>
  );
}
