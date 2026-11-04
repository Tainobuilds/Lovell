import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  aside,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <p className="eyebrow mb-5 flex items-center gap-3 text-mute">
          <span className="h-px w-8 bg-red" /> {eyebrow}
        </p>
        <h2 className="display text-[clamp(2.75rem,8vw,7rem)]">{title}</h2>
      </div>
      {aside && <div className="max-w-sm text-mute md:pb-3">{aside}</div>}
    </Reveal>
  );
}
