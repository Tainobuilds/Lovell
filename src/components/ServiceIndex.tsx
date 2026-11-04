"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/content/services";
import { Frame } from "./Frame";

/**
 * Homepage services overview: big typographic index on the left, a preview
 * frame on the right that swaps on hover/focus. On mobile each row carries
 * its own image.
 */
export function ServiceIndex({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <ul className="lg:col-span-7">
        {services.map((s, i) => (
          <li key={s.slug} className="border-t border-line last:border-b">
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[4rem_1fr_auto] md:py-8"
            >
              <span className={`eyebrow transition-colors ${active === i ? "text-red" : "text-faint"}`}>{s.index}</span>
              <span>
                <span
                  className={`display block text-[clamp(2.5rem,7vw,6rem)] transition-all duration-500 ease-[var(--ease-cine)] lg:group-hover:translate-x-3 ${
                    active === i ? "text-paper" : "text-paper lg:text-paper/35"
                  }`}
                >
                  {s.name}
                </span>
                <span className="mt-2 block text-sm text-mute md:text-base">{s.statement}</span>
              </span>
              <span
                aria-hidden
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                  active === i ? "border-red bg-red" : "border-line"
                }`}
              >
                →
              </span>
            </Link>
            {/* Mobile: inline image */}
            <Frame category={s.slug} src={s.media?.image} alt={s.media?.alt} className="mb-6 aspect-[16/9] lg:hidden" />
          </li>
        ))}
      </ul>

      <div className="relative hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-cine)] ${
                active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            >
              <Frame
                category={s.slug}
                src={s.media?.image}
                video={s.media?.video}
                alt={s.media?.alt}
                sizes="40vw"
                className="h-full w-full"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="eyebrow text-red">{s.index} / 05</p>
                <p className="mt-2 max-w-xs text-sm text-paper/80">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
