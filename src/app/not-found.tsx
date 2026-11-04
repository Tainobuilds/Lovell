import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow text-red">404 · Scene missing</p>
      <h1 className="display mt-6 text-[clamp(4rem,14vw,12rem)]">Cut.</h1>
      <p className="mt-6 max-w-md text-lg text-mute">This frame didn&rsquo;t make the final edit.</p>
      <Link href="/" className="btn btn-red mt-10 self-start">
        Back to home <span className="arrow">→</span>
      </Link>
    </section>
  );
}
