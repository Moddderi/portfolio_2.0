"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SpotlightCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  /** Max tilt in degrees. Set to 0 to disable the 3D tilt. */
  tilt?: number;
  /** CSS colour of the glow that follows the cursor. */
  glow?: string;
  contentClassName?: string;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Glass card with a cursor-following spotlight, a glowing border
 * and an optional subtle 3D tilt. The building block of the Bento Grid.
 */
export function SpotlightCard({
  children,
  className,
  contentClassName,
  tilt = 3,
  glow = "rgba(139, 92, 246, 0.22)",
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor position inside the card (px).
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  // Normalised cursor position (-0.5 … 0.5) – drives the tilt.
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-tilt, tilt]), SPRING);
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [tilt, -tilt]), SPRING);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${glow}, transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(167, 139, 250, 0.9), rgba(34, 211, 238, 0.35) 45%, transparent 75%)`;

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    nx.set((e.clientX - rect.left) / rect.width - 0.5);
    ny.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    x.set(-400);
    y.set(-400);
    nx.set(0);
    ny.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl",
        "border border-white/[0.07] bg-ink-850/70 backdrop-blur-xl",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_24px_60px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
      {...rest}
    >
      {/* Soft spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {/* Glowing 1px border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: borderGlow,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className={cn("relative h-full p-6 sm:p-7", contentClassName)}>
        {children}
      </div>
    </motion.div>
  );
}
