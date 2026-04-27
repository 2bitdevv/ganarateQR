import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** 1200×630 — matches Facebook / LINE recommended aspect; avoids broken /logo.jpg and square-only crops. */
export async function renderBrandOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eef2ff 0%, #fff7ed 45%, #ffe4dc 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 64px",
            borderRadius: 32,
            border: "3px dashed rgba(15,23,42,0.2)",
            background: "rgba(255,255,255,0.75)",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: -1,
            }}
          >
            QR Code Generator
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              fontWeight: 600,
              color: "#475569",
            }}
          >
            Free web QR — URL, WiFi, vCard, WhatsApp
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              fontWeight: 700,
              color: "#FF5D39",
            }}
          >
            ganarate-qr.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
