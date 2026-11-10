import { ImageResponse } from "next/og";
import { bypass, profile, stack } from "@/data/profile";

export const alt = `${profile.name} — Full-Stack Engineer · Process Optimization`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = stack.slice(0, 6);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(circle at 8% 0%, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 42%), radial-gradient(circle at 92% 100%, rgba(34,211,238,0.34) 0%, rgba(34,211,238,0) 45%), radial-gradient(circle at 70% 18%, rgba(139,92,246,0.28) 0%, rgba(139,92,246,0) 30%)",
          color: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* hairline frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            borderRadius: 28,
            border: "1.5px solid rgba(255,255,255,0.12)",
            display: "flex",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 84px",
          }}
        >
          {/* top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #4f46e5, #1e1b4b)",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: -1,
                }}
              >
                OK
              </div>
              <div
                style={{
                  display: "flex",
                  marginLeft: 18,
                  fontSize: 24,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Portfolio
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1.5px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 22,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#34d399",
                  marginRight: 12,
                }}
              />
              Open to work
            </div>
          </div>

          {/* headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 46,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#a5b4fc",
              }}
            >
              Full-Stack Engineer · Process Optimization
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 28,
                lineHeight: 1.35,
                maxWidth: 900,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {`I cut a department from ${bypass.reduction.before} people to ${bypass.reduction.after} with Lean, Theory of Constraints and code.`}
            </div>
          </div>

          {/* bottom: stack + url */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              {chips.map((tech) => (
                <div
                  key={tech}
                  style={{
                    display: "flex",
                    marginRight: 12,
                    padding: "8px 18px",
                    borderRadius: 12,
                    border: "1.5px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.06)",
                    fontSize: 22,
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 1,
                color: "#22d3ee",
              }}
            >
              olehkyrych.xyz
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
