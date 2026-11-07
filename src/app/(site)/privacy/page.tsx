import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lovell Media collects, uses and protects personal information.",
  alternates: { canonical: "/privacy" },
};

/**
 * DRAFT: written from a standard template for a small company website with a
 * contact form and cookie-free analytics. It is not legal advice. Have it
 * reviewed for the jurisdiction Lovell Media operates in before launch, and
 * update LAST_UPDATED whenever the content changes.
 */
const LAST_UPDATED = "4 November 2026";

export default async function PrivacyPage() {
  const settings = await getSettings();
  const mail = (
    <a href={`mailto:${settings.email}`} className="link-u text-paper">
      {settings.email}
    </a>
  );

  return (
    <article className="container-x pb-24 pt-36 md:pb-36 md:pt-48">
      <header className="max-w-4xl">
        <p className="eyebrow mb-6 flex items-center gap-3 text-mute">
          <span className="h-px w-8 bg-red" /> Legal
        </p>
        <h1 className="display text-[clamp(3.25rem,10vw,8rem)]">Privacy policy</h1>
        <p className="mt-6 text-mute">Last updated {LAST_UPDATED}</p>
      </header>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <nav aria-label="On this page" className="hidden md:col-span-3 md:block">
          <ol className="sticky top-28 space-y-3 text-sm text-mute">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="link-u hover:text-paper">
                  <span className="mr-2 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-2xl space-y-14 text-lg leading-relaxed text-paper/85 md:col-span-8 md:col-start-5 [&_li]:pl-1 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <section id="who">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">Who we are</h2>
            <p>
              This website is operated by {site.name}, an independent production company
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We are responsible for the personal information
              collected through this site. Questions about this policy can be sent to {mail}.
            </p>
          </section>

          <section id="collect">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">What we collect</h2>
            <p>
              <strong className="text-paper">When you send an enquiry</strong> through our contact
              form we collect the details you choose to give us: your name, email address, company or
              brand, the service you&rsquo;re interested in, budget range, timeline and your message.
            </p>
            <p>
              <strong className="text-paper">When you browse the site</strong> we collect anonymous,
              aggregated usage statistics (such as pages viewed, referring site, country and device
              type) to understand how the site is used. This does not use cookies and does not
              identify you personally.
            </p>
            <p>We do not knowingly collect information from children.</p>
          </section>

          <section id="use">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">How we use it</h2>
            <ul>
              <li>To reply to your enquiry and discuss a potential project with you.</li>
              <li>To keep a record of our correspondence with you.</li>
              <li>To understand and improve how the website performs.</li>
            </ul>
            <p>
              We do not sell your personal information, and we don&rsquo;t add you to marketing lists
              without asking first.
            </p>
          </section>

          <section id="share">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">Who we share it with</h2>
            <p>We use a small number of trusted service providers to run this website:</p>
            <ul>
              <li>
                <strong className="text-paper">Vercel</strong>: website hosting and anonymous analytics.
              </li>
              <li>
                <strong className="text-paper">Resend</strong>: delivering contact-form enquiries to our inbox.
              </li>
            </ul>
            <p>
              These providers process data on our behalf and only as needed to provide their service.
              Some may store data outside your country; where they do, they use appropriate
              safeguards. We may also disclose information if required by law.
            </p>
          </section>

          <section id="cookies">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">Cookies</h2>
            <p>
              This site does not use advertising or tracking cookies. If a page contains an embedded
              video from a third party (for example Vimeo or YouTube), that provider may set its own
              cookies when you play the video, under its own privacy policy.
            </p>
          </section>

          <section id="keep">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">How long we keep it</h2>
            <p>
              We keep enquiry details for as long as needed to respond and manage any resulting
              project, and then for a reasonable period for our records, after which they are deleted.
            </p>
          </section>

          <section id="rights">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">Your rights</h2>
            <p>
              You can ask us to access, correct or delete the personal information we hold about you,
              or object to how we use it. Email {mail} and we&rsquo;ll respond as soon as we can.
              Depending on where you live, you may also have the right to complain to your local
              data-protection authority.
            </p>
          </section>

          <section id="changes">
            <h2 className="display mb-5 text-4xl text-paper md:text-5xl">Changes</h2>
            <p>
              We may update this policy from time to time. The date at the top shows when it last
              changed. You can always <Link href="/contact" className="link-u text-paper">contact us</Link>{" "}
              with any questions.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}

const sections = [
  { id: "who", title: "Who we are" },
  { id: "collect", title: "What we collect" },
  { id: "use", title: "How we use it" },
  { id: "share", title: "Who we share it with" },
  { id: "cookies", title: "Cookies" },
  { id: "keep", title: "How long we keep it" },
  { id: "rights", title: "Your rights" },
  { id: "changes", title: "Changes" },
];
