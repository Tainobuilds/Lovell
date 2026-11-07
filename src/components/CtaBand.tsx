import Link from "next/link";
import { getHomepage } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Rich } from "./Rich";

/**
 * Closing statement used at the bottom of most pages. Default wording comes
 * from the content editor (Homepage → Closing banner); pages can override.
 */
export async function CtaBand({
  eyebrow,
  title,
  body,
  href = "/contact",
  label,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  href?: string;
  label?: string;
}) {
  const home = await getHomepage();
  return (
    <section className="relative overflow-hidden bg-red">
      <div aria-hidden className="pointer-events-none absolute -right-[10%] top-1/2 -translate-y-1/2 select-none display text-[40vw] leading-none text-red-deep/60">
        LM
      </div>
      <div className="container-x relative py-24 md:py-36">
        <Reveal>
          <p className="eyebrow mb-6 text-paper">{eyebrow ?? home.ctaLabel}</p>
          {/* Red text would vanish on the red band, so accents render white here. */}
          <h2 className="display text-[clamp(3.5rem,11vw,10rem)] text-ink [&_.editorial]:text-paper [&_.text-red]:text-paper">
            {title ?? <Rich text={home.ctaHeadline} />}
          </h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-paper">{body ?? home.ctaText}</p>
            <Link href={href} className="btn bg-ink text-paper hover:bg-paper hover:text-ink">
              {label ?? home.ctaButton} <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
