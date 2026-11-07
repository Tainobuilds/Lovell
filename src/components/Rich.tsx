import { Fragment, type ReactNode } from "react";

/**
 * Renders headline text from the content editor:
 *   *word*  → red
 *   _word_  → italic serif (editorial)
 *   newline → line break
 * Markers can combine: *_word_* is red italic serif.
 */
export function Rich({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {inline(line)}
        </Fragment>
      ))}
    </>
  );
}

function inline(s: string): ReactNode[] {
  const parts = s.split(/(\*[^*]+\*|_[^_]+_)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.length > 2 && p.startsWith("*") && p.endsWith("*"))
      return <span key={i} className="text-red">{inline(p.slice(1, -1))}</span>;
    if (p.length > 2 && p.startsWith("_") && p.endsWith("_"))
      return <span key={i} className="editorial">{p.slice(1, -1)}</span>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

/** Plain-text version (for metadata, alt text). */
export function plain(text: string) {
  return text.replace(/[*_]/g, "").replace(/\s*\n\s*/g, " ").trim();
}
