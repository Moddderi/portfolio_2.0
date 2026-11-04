import { ImageResponse } from "next/og";

/**
 * Brand mark "OK_" – shared by the favicon and the Apple touch icon.
 * Rendered at build time with next/og (no binary assets to maintain).
 */
export function renderBrandIcon(size: number, rounded = true) {
  const radius = rounded ? Math.round(size * 0.24) : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 28% 22%, #4f46e5 0%, #1e1b4b 42%, #050507 80%)",
          borderRadius: radius,
          position: "relative",
        }}
      >
        {/* inner hairline border */}
        <div
          style={{
            position: "absolute",
            inset: Math.round(size * 0.035),
            borderRadius: Math.max(0, radius - Math.round(size * 0.035)),
            border: `${Math.max(1, Math.round(size * 0.012))}px solid rgba(255,255,255,0.14)`,
            display: "flex",
          }}
        />

        {/* cyan glow */}
        <div
          style={{
            position: "absolute",
            right: -size * 0.12,
            bottom: -size * 0.12,
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: "50%",
            background: "rgba(34,211,238,0.35)",
            filter: `blur(${Math.round(size * 0.12)}px)`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            color: "#ffffff",
            fontSize: size * 0.5,
            fontWeight: 800,
            letterSpacing: -size * 0.03,
            lineHeight: 1,
          }}
        >
          OK
          <div
            style={{
              width: size * 0.17,
              height: size * 0.065,
              marginLeft: size * 0.03,
              marginBottom: size * 0.05,
              borderRadius: size * 0.02,
              background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
