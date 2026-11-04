import Link from "next/link";
import { activeSocials, nav, site } from "@/content/site";
import { services } from "@/content/services";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const socials = activeSocials();
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Lovell Media home" className="text-xl">
            <Wordmark />
          </Link>
          <p className="display mt-8 text-4xl md:text-5xl">
            Every frame <br />
            has a <span className="text-red">story.</span>
          </p>
          <a href={`mailto:${site.email}`} className="link-u mt-8 inline-block text-lg text-mute hover:text-paper">
            {site.email}
          </a>
        </div>

        <FooterCol title="Services" className="md:col-span-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="link-u text-mute hover:text-paper">
                {s.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company" className="md:col-span-2">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="link-u text-mute hover:text-paper">
                {n.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Follow" className="md:col-span-2">
          {socials.length ? (
            socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-mute hover:text-paper">
                  {s.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))
          ) : (
            <li className="text-faint">Channels coming soon</li>
          )}
        </FooterCol>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-faint md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
          <Link href="/privacy" className="link-u ml-4 hover:text-paper">Privacy</Link>
        </p>
        <p>Independent production company{site.location ? ` · ${site.location}` : ""}</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 text-faint">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}
