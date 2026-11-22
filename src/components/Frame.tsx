import Image from "next/image";
import type { ServiceSlug } from "@/content/types";

type FrameProps = {
  /** Image path under /public (or remote URL allowed in next.config). */
  src?: string;
  /** MP4 path; autoplays muted & looped. Takes precedence over src (used as poster). */
  video?: string;
  alt?: string;
  /** Drives the placeholder art when no media is supplied. */
  category?: ServiceSlug;
  /** Small caption on the placeholder, e.g. the project title. */
  label?: string;
  priority?: boolean;
  sizes?: string;
  /** "contain" shows the whole image (used in the lightbox). */
  fit?: "cover" | "contain";
  className?: string;
};

/**
 * The one media primitive for the whole site. Real photography/video drops in
 * via `src`/`video`; until then each category renders its own placeholder
 * composition so the layout reads like the finished site.
 */
export function Frame({
  src,
  video,
  alt = "",
  category,
  label,
  priority,
  sizes = "100vw",
  fit = "cover",
  className = "",
}: FrameProps) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-ink-3 ${className}`}>
      {video ? (
        <video
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          src={video}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt || undefined}
        />
      ) : src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={fitClass} />
      ) : (
        <Placeholder category={category} label={label} />
      )}
    </div>
  );
}

function Placeholder({ category, label }: { category?: ServiceSlug; label?: string }) {
  return (
    <div className="grain absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 animate-drift">{art(category)}</div>
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
      {label && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-faint">
          <span className="truncate">{label}</span>
          <span className="shrink-0">Placeholder</span>
        </div>
      )}
    </div>
  );
}

function art(category?: ServiceSlug) {
  switch (category) {
    case "ooh-experiential":
      // Billboard on a night skyline.
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#141414_55%,#0a0a0a_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[repeating-linear-gradient(90deg,#0d0d0d_0_6%,#111_6%_9%,#0b0b0b_9%_16%,#151515_16%_19%)] opacity-90" />
          <div className="absolute left-[18%] top-[20%] h-[40%] w-[64%] bg-red shadow-[0_0_120px_30px_rgba(215,25,32,0.35)]">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_45%,rgba(255,255,255,0.18)_50%,transparent_56%)]" />
            <div className="display absolute bottom-[10%] left-[6%] text-[clamp(1rem,4.5vw,3.5rem)] text-paper/90">
              Your story here
            </div>
          </div>
          <div className="absolute left-[49%] top-[60%] h-[22%] w-[2%] bg-[#1d1d1d]" />
        </>
      );
    case "media-production":
      // Stage light beams over a crowd silhouette.
      return (
        <>
          <div className="absolute inset-0 bg-[#060606]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_160deg_at_30%_-10%,transparent_0deg,rgba(215,25,32,0.55)_12deg,transparent_24deg)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_70%_-10%,transparent_0deg,rgba(255,255,255,0.28)_8deg,transparent_18deg)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_172deg_at_50%_-10%,transparent_0deg,rgba(215,25,32,0.35)_10deg,transparent_20deg)]" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[radial-gradient(circle_at_10%_100%,#000_22%,transparent_23%),radial-gradient(circle_at_28%_100%,#000_26%,transparent_27%),radial-gradient(circle_at_47%_100%,#000_20%,transparent_21%),radial-gradient(circle_at_66%_100%,#000_28%,transparent_29%),radial-gradient(circle_at_86%_100%,#000_23%,transparent_24%)] bg-[length:22%_100%] bg-repeat-x" />
        </>
      );
    case "podcasts":
      // Waveform across a dark studio.
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,#1f1f1f_0%,#080808_70%)]" />
          <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-x-[8%] top-[30%] h-[40%] w-[84%]">
            {Array.from({ length: 64 }).map((_, i) => {
              const h = 12 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 170;
              return (
                <rect
                  key={i}
                  x={i * 6.25}
                  y={100 - h / 2}
                  width="3"
                  height={h}
                  fill={i % 9 === 4 ? "#d71920" : "rgba(255,255,255,0.55)"}
                />
              );
            })}
          </svg>
          <div className="absolute right-[6%] top-[8%] flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.3em] text-paper/70">
            <span className="h-2 w-2 animate-blink rounded-full bg-red" /> ON AIR
          </div>
        </>
      );
    case "events":
      // Bokeh crowd lights.
      return (
        <>
          <div className="absolute inset-0 bg-[#070707]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(215,25,32,0.55)_0_4%,transparent_9%),radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.35)_0_3%,transparent_8%),radial-gradient(circle_at_40%_60%,rgba(215,25,32,0.4)_0_6%,transparent_12%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.22)_0_5%,transparent_11%),radial-gradient(circle_at_25%_80%,rgba(255,255,255,0.18)_0_4%,transparent_10%),radial-gradient(circle_at_58%_40%,rgba(255,255,255,0.12)_0_9%,transparent_16%),radial-gradient(circle_at_92%_20%,rgba(215,25,32,0.3)_0_3%,transparent_7%)] blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,#000_0%,transparent_100%)]" />
        </>
      );
    case "branded-content":
      // Camera viewfinder.
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#161616_0%,#0a0a0a_60%,#1a0303_100%)]" />
          <div className="absolute inset-[10%] border border-transparent">
            {(["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const).map((pos) => (
              <span key={pos} className={`absolute h-[14%] w-[10%] border-paper/60 ${pos}`} />
            ))}
            <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-paper/50" />
            <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-paper/50" />
            <span className="absolute right-[4%] top-[6%] flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.25em] text-paper/80">
              <span className="h-2 w-2 animate-blink rounded-full bg-red" /> REC
            </span>
          </div>
        </>
      );
    case "documentaries":
      // Interview set-up: a lit subject in a dark room, film-strip edges.
      return (
        <>
          <div className="absolute inset-0 bg-[#070707]" />
          <div className="absolute left-[58%] top-[18%] h-[70%] w-[30%] rounded-t-full bg-[radial-gradient(60%_50%_at_40%_30%,rgba(255,255,255,0.28),rgba(255,255,255,0.05)_60%,transparent_75%)]" />
          <div className="absolute -left-[10%] top-[10%] h-[80%] w-[60%] rounded-full bg-red/25 blur-[90px]" />
          <div className="absolute inset-y-0 left-0 w-[5%] bg-[repeating-linear-gradient(180deg,#000_0_10%,#1c1c1c_10%_16%)]" />
          <div className="absolute inset-y-0 right-0 w-[5%] bg-[repeating-linear-gradient(180deg,#000_0_10%,#1c1c1c_10%_16%)]" />
        </>
      );
    case "travel":
      // Horizon at dusk with a red sun.
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#1a0606_55%,#0a0a0a_56%,#050505_100%)]" />
          <div className="absolute left-1/2 top-[38%] h-[30%] w-[22%] -translate-x-1/2 rounded-full bg-red shadow-[0_0_120px_40px_rgba(215,25,32,0.35)]" />
          <div className="absolute inset-x-0 top-[55%] h-px bg-paper/30" />
          <div className="absolute inset-x-0 top-[56%] bottom-0 bg-[repeating-linear-gradient(180deg,transparent_0_6%,rgba(255,255,255,0.05)_6%_7%)]" />
        </>
      );
    case "global":
      // Faint world grid with market dots.
      return (
        <>
          <div className="absolute inset-0 bg-[#070707]" />
          <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6">
              {[30, 60, 90, 120, 150, 170].map((r) => (
                <ellipse key={r} cx="300" cy="100" rx={r} ry="95" />
              ))}
              {[20, 50, 80, 100, 120, 150, 180].map((y) => (
                <line key={y} x1="180" x2="400" y1={y} y2={y} />
              ))}
            </g>
            {[[250, 60], [285, 85], [330, 70], [300, 120], [355, 110], [270, 140], [320, 155]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#d71920" />
            ))}
          </svg>
          <div className="absolute -right-[10%] top-[10%] h-[80%] w-[50%] rounded-full bg-red/15 blur-[100px]" />
        </>
      );
    case "social-media-management":
      // A feed of tiles on a phone.
      return (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,#1c1c1c_0%,#070707_75%)]" />
          <div className="absolute left-1/2 top-[10%] h-[80%] w-[34%] -translate-x-1/2 rounded-[1.4rem] border border-paper/25 bg-[#0c0c0c] p-[3%]">
            <div className="grid h-full grid-cols-3 grid-rows-4 gap-[4%]">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className={`rounded-sm ${i % 5 === 1 ? "bg-red" : i % 3 === 0 ? "bg-paper/25" : "bg-paper/10"}`} />
              ))}
            </div>
          </div>
          <div className="absolute right-[18%] top-[22%] flex h-8 w-8 items-center justify-center rounded-full bg-red text-[0.6rem] font-bold text-paper">♥</div>
        </>
      );
    case "web-design-development":
      // A browser window with a layout wireframe.
      return (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#141414_0%,#080808_70%)]" />
          <div className="absolute inset-x-[12%] top-[14%] bottom-[14%] overflow-hidden rounded-md border border-paper/25 bg-[#0b0b0b]">
            <div className="flex h-[10%] items-center gap-[1.5%] border-b border-paper/15 px-[2%]">
              <span className="h-2 w-2 rounded-full bg-red" />
              <span className="h-2 w-2 rounded-full bg-paper/30" />
              <span className="h-2 w-2 rounded-full bg-paper/30" />
            </div>
            <div className="m-[4%] h-[38%] bg-red/80" />
            <div className="mx-[4%] grid h-[30%] grid-cols-3 gap-[3%]">
              <span className="bg-paper/15" />
              <span className="bg-paper/15" />
              <span className="bg-paper/15" />
            </div>
          </div>
        </>
      );
    default:
      // Generic cinematic frame: red light leak.
      return (
        <>
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="absolute -left-1/4 top-[-20%] h-[90%] w-[80%] rounded-full bg-red/45 blur-[90px]" />
          <div className="absolute bottom-[-30%] right-[-10%] h-[70%] w-[60%] rounded-full bg-paper/10 blur-[100px]" />
        </>
      );
  }
}
