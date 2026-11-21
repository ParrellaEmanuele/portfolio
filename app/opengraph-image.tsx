import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Generated once at build time and served as a static PNG.
export const dynamic = "force-static";
export const alt = `${site.name}: self-hosted systems and web products`;
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
          padding: "72px 80px",
          background: "#fbfbfa",
          color: "#16181d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#545a66", letterSpacing: 2 }}>
          MANAGEMENT ENGINEERING · POLITECNICO DI TORINO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 38, color: "#2a2e36", maxWidth: 960, lineHeight: 1.3 }}>
            Building self-hosted systems and web products.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#1f4fd1" }} />
          <div style={{ color: "#1f4fd1" }}>emanueleparrella.dev</div>
        </div>
      </div>
    ),
    size,
  );
}
