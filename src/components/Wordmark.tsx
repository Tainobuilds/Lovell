/**
 * Text wordmark. Swap the contents for the final logo SVG once the
 * approved artwork file is supplied — keep the same props.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <span aria-hidden className="block h-[0.7em] w-[0.7em] bg-red" />
      <span className="display text-[1.55em] tracking-[0.02em]">Lovell</span>
      <span className="eyebrow pt-[0.15em] text-[0.62em] tracking-[0.32em] text-mute">Media</span>
    </span>
  );
}
