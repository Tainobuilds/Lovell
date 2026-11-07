import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
    <SiteHeader />
    <main id="main">
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow text-red-bright">404 · Scene missing</p>
      <h1 className="display mt-6 text-[clamp(4rem,14vw,12rem)]">Cut.</h1>
      <p className="mt-6 max-w-md text-lg text-mute">This frame didn&rsquo;t make the final edit.</p>
      <Link href="/" className="btn btn-red mt-10 self-start">
        Back to home <span className="arrow">→</span>
      </Link>
    </section>
    </main>
    <SiteFooter />
    </>
  );
}
