import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { WorkGallery } from "@/components/WorkGallery";
import { WorkGalleryClient } from "@/components/WorkGalleryClient";
import { CtaBand } from "@/components/CtaBand";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Lovell Media productions across OOH, concerts, podcasts, events and branded content.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title={
          <>
            Selected <span className="text-red">frames.</span>
          </>
        }
        intro="A gallery of productions across every discipline we work in. Filter by category, then step inside any project."
      />
      <section className="container-x pb-24 md:pb-36">
        {/* Static HTML ships the full grid; the client reads ?category= after hydration. */}
        <Suspense fallback={<WorkGallery projects={projects} services={services} category={null} />}>
          <WorkGalleryClient projects={projects} services={services} />
        </Suspense>
      </section>
      <CtaBand />
    </>
  );
}
