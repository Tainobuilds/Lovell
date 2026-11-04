"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ink/90 backdrop-blur-md" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-red focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="Lovell Media home" className="text-base md:text-lg">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`link-u eyebrow pb-1 ${isActive(item.href) ? "text-paper" : "text-mute hover:text-paper"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="btn btn-red hidden !px-5 !py-3 lg:inline-flex">
          Start a project
        </Link>

        <button
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between py-10">
          <ul className="space-y-2">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`display flex items-baseline gap-4 text-6xl ${isActive(item.href) ? "text-red" : "text-paper"}`}
                >
                  <span className="eyebrow text-faint">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-red justify-center">
            Start a project <span className="arrow">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
