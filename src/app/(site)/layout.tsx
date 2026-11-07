import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import { getSettings } from "@/lib/content";

/** Public website chrome: header, main, footer, organisation structured data. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: settings.email,
    description: site.description,
    founder: settings.founder.name
      ? { "@type": "Person", name: settings.founder.name, url: settings.founder.url }
      : undefined,
    sameAs: settings.socials.map((s) => s.href),
  };

  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </>
  );
}
