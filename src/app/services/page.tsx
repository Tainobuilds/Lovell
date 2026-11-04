import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "OOH, concerts, podcasts, events and branded content. Five production disciplines from Lovell Media.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Five disciplines.
            <br />
            <span className="text-red">One eye.</span>
          </>
        }
        intro="From the street to the stage to the screen, we produce across the formats where culture and brands meet."
      />
      <section className="container-x space-y-24 pb-24 md:space-y-36 md:pb-36">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className={`group grid items-center gap-8 md:grid-cols-12 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative overflow-hidden md:col-span-7">
                <Frame
                  category={s.slug}
                  src={s.media?.image}
                  alt={s.media?.alt}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="aspect-[16/10] transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="md:col-span-5">
                <p className="eyebrow text-red">{s.index} / 05</p>
                <h2 className="display mt-4 text-[clamp(3rem,7vw,6rem)] transition-colors group-hover:text-red">{s.name}</h2>
                <p className="editorial mt-3 text-2xl text-paper/90">{s.statement}</p>
                <p className="mt-5 text-mute">{s.description}</p>
                <span className="btn btn-ghost mt-8">
                  Explore {s.name} <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
