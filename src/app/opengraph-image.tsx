import { ImageResponse } from "next/og";

export const alt = "Lovell Media: creative production, digital media, global storytelling.";
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
          <div style={{ width: 26, height: 26, background: "#d71920" }} />
          LOVELL <span style={{ fontSize: 20, opacity: 0.6, letterSpacing: 8 }}>MEDIA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>CREATIVE PRODUCTION.</span>
          <span>DIGITAL MEDIA.</span>
          <span style={{ color: "#d71920" }}>GLOBAL STORYTELLING.</span>
        </div>
      </div>
    ),
    size,
  );
}
