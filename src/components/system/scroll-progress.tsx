"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the top that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan"
    />
  );
}
