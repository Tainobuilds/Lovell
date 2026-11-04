import { ImageResponse } from "next/og";

export const alt = "Lovell Media: Every frame has a story.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>
          <div style={{ width: 26, height: 26, background: "#e10a0a" }} />
          LOVELL <span style={{ fontSize: 20, opacity: 0.6, letterSpacing: 8 }}>MEDIA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 900, lineHeight: 0.92, letterSpacing: -3 }}>
          <span>EVERY FRAME</span>
          <span style={{ display: "flex" }}>
            HAS A&nbsp;<span style={{ color: "#e10a0a" }}>STORY.</span>
          </span>
        </div>
      </div>
    ),
    size,
  );
}
