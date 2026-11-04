/** Slow typographic ticker of the five disciplines. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-hidden>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="display flex items-center whitespace-nowrap px-8 text-5xl text-paper/90 md:text-7xl">
                {t}
                <span className="ml-16 inline-block h-3 w-3 bg-red" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
