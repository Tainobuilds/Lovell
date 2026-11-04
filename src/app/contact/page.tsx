import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormWithParams } from "@/components/ContactFormWithParams";
import { Reveal } from "@/components/Reveal";
import { activeSocials, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Lovell Media. Tell us about your campaign, show, podcast, event or brand story.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const socials = activeSocials();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start a <span className="text-red">project.</span>
          </>
        }
        intro="Brands, agencies, artists and collaborators. Tell us what you're making and we'll come back to you with how we'd bring it to life."
      />
      <section className="container-x grid gap-16 pb-24 md:grid-cols-12 md:pb-36">
        <Reveal className="md:col-span-8">
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </Reveal>
        <Reveal delay={120} className="space-y-10 md:col-span-3 md:col-start-10">
          <div>
            <h2 className="eyebrow mb-3 text-faint">Email</h2>
            <a href={`mailto:${site.email}`} className="link-u text-lg">{site.email}</a>
          </div>
          {site.location && (
            <div>
              <h2 className="eyebrow mb-3 text-faint">Studio</h2>
              <p className="text-lg">{site.location}</p>
            </div>
          )}
          {socials.length > 0 && (
            <div>
              <h2 className="eyebrow mb-3 text-faint">Follow</h2>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-lg">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-t border-line pt-8 text-sm text-mute">
            Prefer to talk it through first? Email us directly and we&rsquo;ll set up a call.
          </div>
        </Reveal>
      </section>
    </>
  );
}
