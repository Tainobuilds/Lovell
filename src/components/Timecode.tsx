"use client";

import { useEffect, useState } from "react";

/** Running SMPTE-style timecode for the hero overlay (decorative). */
export function Timecode() {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const id = setInterval(() => setFrames(Math.floor(((performance.now() - start) / 1000) * 24)), 1000 / 24);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const f = frames % 24;
  const s = Math.floor(frames / 24) % 60;
  const m = Math.floor(frames / 1440) % 60;
  return (
    <span aria-hidden className="font-mono tabular-nums">
      00:{pad(m)}:{pad(s)}:{pad(f)}
    </span>
  );
}
