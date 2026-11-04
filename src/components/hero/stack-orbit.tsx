"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { TechLabel } from "@/components/ui/tech-icon";
import { stack } from "@/data/profile";

const RX = 205; // horizontal radius of the orbit (px)
const RY = 78; // vertical radius
const TILT = (-18 * Math.PI) / 180; // orbit plane rotation
const SPEED = 0.28; // rad / s

/**
 * A pseudo-3D "tech ring": the stack orbits a glowing core. Items in the back are
 * smaller and dimmer, which sells the depth. Positions are written straight to the DOM
 * inside an animation frame – no React re-renders.
 */
export function StackOrbit() {
  const reduced = useReducedMotion();
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  useAnimationFrame((time) => {
    const t = reduced ? 0 : time / 1000;
    const n = stack.length;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const angle = t * SPEED + (i * Math.PI * 2) / n;
      const x0 = Math.cos(angle) * RX;
      const y0 = Math.sin(angle) * RY;
      // rotate the ellipse plane
      const x = x0 * Math.cos(TILT) - y0 * Math.sin(TILT);
      const y = x0 * Math.sin(TILT) + y0 * Math.cos(TILT);
      const depth = (Math.sin(angle) + 1) / 2; // 0 = far, 1 = near
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${0.7 + depth * 0.45})`;
      el.style.opacity = String(0.3 + depth * 0.7);
      el.style.zIndex = String(Math.round(depth * 10));
    });
  });

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 18);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto h-[300px] w-full max-w-[520px] overflow-hidden min-[420px]:h-[400px] md:h-[520px]"
      aria-label="Core technology stack"
      role="group"
    >
      {/* Fixed 520px design canvas, scaled down on small screens */}
      <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 scale-[0.58] [perspective:1000px] min-[420px]:scale-[0.78] md:scale-100">
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {/* Orbit rings */}
        {[1, 0.72, 1.28].map((scale, i) => (
          <div
            key={scale}
            aria-hidden
            className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.08]"
            style={{
              width: RX * 2 * scale,
              height: RY * 2 * scale,
              transform: `translate(-50%, -50%) rotate(-18deg)`,
              borderColor: i === 0 ? "rgba(129,140,248,0.28)" : undefined,
              borderStyle: i === 2 ? "dashed" : "solid",
            }}
          />
        ))}

        {/* Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
          <div className="relative grid size-28 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#c7d2fe,#6366f1_45%,#1e1b4b_100%)] shadow-[0_0_80px_10px_rgba(99,102,241,0.55),inset_-12px_-12px_30px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-sm font-semibold tracking-widest text-white/90">OK</span>
            <span className="absolute -inset-3 rounded-full border border-accent-cyan/30" />
            <span className="absolute -inset-7 rounded-full border border-accent-violet/20" />
          </div>
        </div>

        {/* Orbiting stack */}
        <ul className="absolute inset-0">
          {stack.map((tech, i) => (
            <li
              key={tech}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-white/15 bg-ink-900/80 px-3.5 py-2 font-mono text-xs text-zinc-100 shadow-[0_0_24px_-4px_rgba(99,102,241,0.6)] backdrop-blur"
            >
              <TechLabel name={tech} iconClassName="size-4" />
            </li>
          ))}
        </ul>
      </motion.div>
      </div>
    </div>
  );
}
