"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * "Decrypt" text effect: whenever `target` changes, characters flicker through random
 * glyphs and resolve left-to-right (with jitter) into the new string.
 */
export function useScramble(target: string, duration = 900) {
  const [text, setText] = useState(target);
  const previous = useRef(target);

  useEffect(() => {
    const from = previous.current;
    previous.current = target;
    if (from === target) return;

    const length = Math.max(from.length, target.length);
    const settleAt = Array.from(
      { length },
      (_, i) => (i / length) * 0.6 + Math.random() * 0.35,
    );
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = (now - start) / duration;
      let out = "";
      for (let i = 0; i < length; i++) {
        if (t >= settleAt[i]) out += target[i] ?? "";
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setText(out);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setText(target);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return text;
}
