"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ServiceSlug } from "@/content/services";
import { Frame } from "./Frame";
import { Reveal } from "./Reveal";

type Item = { src?: string; alt: string };

/**
 * Project stills grid. Clicking any frame opens a full-screen viewer with
 * arrow-key, button and swipe navigation. Uses the native <dialog> element
 * for focus trapping, Escape-to-close and focus return.
 */
export function ProjectGallery({ items, category }: { items: Item[]; category: ServiceSlug }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const current = items[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {items.map((item, n) => (
          <Reveal key={n} delay={(n % 2) * 100} className={n === 0 ? "md:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => show(n)}
              aria-label={`View ${item.alt} full screen`}
              className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
            >
              <Frame
                src={item.src}
                alt={item.alt}
                category={category}
                sizes={n === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                className={`${n === 0 ? "aspect-[16/9]" : "aspect-[4/5]"} transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-[1.03]`}
              />
              <span
                aria-hidden
                className="eyebrow absolute bottom-4 right-4 bg-ink/80 px-3 py-2 text-[0.6rem] opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                View ⤢
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label="Project gallery"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-paper backdrop:bg-ink/90 open:animate-[fade-up_0.5s_var(--ease-cine)_both]"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {open && current && (
          <div className="flex h-full flex-col">
            <div className="container-x flex h-16 shrink-0 items-center justify-between md:h-20">
              <p className="eyebrow text-mute" aria-live="polite">
                <span className="text-paper">{pad(index + 1)}</span> / {pad(count)}
              </p>
              <button
                type="button"
                onClick={close}
                className="eyebrow flex h-11 items-center gap-3 text-mute hover:text-paper"
                autoFocus
              >
                Close <span aria-hidden className="text-xl leading-none">×</span>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
              <Frame
                key={index}
                src={current.src}
                alt={current.alt}
                category={category}
                label={current.alt}
                fit="contain"
                sizes="100vw"
                className="aspect-video max-h-full w-full max-w-[min(100%,calc((100dvh-10rem)*16/9))] animate-[fade-up_0.45s_var(--ease-cine)_both] bg-transparent"
              />
              {count > 1 && (
                <>
                  <NavButton dir="prev" onClick={() => go(-1)} />
                  <NavButton dir="next" onClick={() => go(1)} />
                </>
              )}
            </div>

            <div className="container-x flex shrink-0 items-center justify-between gap-4 py-5 text-sm text-mute md:py-6">
              <p>{current.alt}</p>
              {count > 1 && <p className="eyebrow shrink-0 text-faint md:hidden">Swipe ← →</p>}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-line text-xl transition-colors hover:border-red hover:bg-red md:flex ${
        dir === "prev" ? "left-6" : "right-6"
      }`}
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}
