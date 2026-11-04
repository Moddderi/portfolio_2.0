"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
};

/** Counts from 0 to `value` when scrolled into view. */
export function AnimatedNumber({
  value,
  duration = 1.8,
  className,
  suffix = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
