/**
 * Static atmosphere layers around the WebGL shader:
 *  • CSS aurora blobs (-z-30) – only visible if WebGL is unavailable
 *  • grid + film grain overlay (-z-10) – sits above the shader
 */
export function AuroraBackground() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 overflow-hidden bg-ink-950">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[900px] -translate-x-1/2 animate-aurora rounded-full bg-accent-indigo/25 blur-[140px]" />
        <div className="absolute -right-40 top-1/3 h-[480px] w-[480px] animate-aurora rounded-full bg-accent-violet/15 blur-[130px] [animation-delay:-6s]" />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="bg-noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
      </div>
    </>
  );
}
