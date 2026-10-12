import { ImageResponse } from "next/og";
import { site } from "@/site.config";

/**
 * The card Facebook, iMessage, and search results show when someone shares the
 * site. Generated at build time rather than hand-made, so it can't drift out of
 * sync with the phone number or tagline in site.config.ts.
 *
 * Composed rather than cropped from a project photo: every photo we have is
 * portrait, and a 1.91:1 preview slice out of a portrait shot lands somewhere
 * arbitrary.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.descriptor}`;

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
          background: "#072e1c", // bark-900
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#e0a951",
              fontWeight: 700,
            }}
          >
            {site.descriptor}
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              color: "#ffffff",
              fontWeight: 700,
              marginTop: 28,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#ddd2b8",
              marginTop: 26,
            }}
          >
            {site.serviceAreaSummary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.18)",
            paddingTop: 30,
          }}
        >
          <div style={{ fontSize: 40, color: "#ffffff", fontWeight: 700 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#578d23" /* leaf-500 */, fontWeight: 700 }}>
            {site.phone}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
