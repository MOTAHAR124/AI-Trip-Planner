import { ImageResponse } from "next/og";
import { SITE_NAME } from "../lib/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(219,234,254,1) 70%, rgba(239,246,255,1) 100%)",
        }}
      >
        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            color: "rgba(17,24,39,1)",
            lineHeight: 1.05,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "rgba(55,65,81,1)",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          Personalized, end-to-end itineraries in seconds.
        </div>
        <div
          style={{
            marginTop: 44,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {["Attractions", "Activities", "Daily schedules"].map((label) => (
            <div
              key={label}
              style={{
                fontSize: 28,
                padding: "10px 18px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.7)",
                color: "rgba(17,24,39,1)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
