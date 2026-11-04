"use client";

import { useEffect, useRef } from "react";

const VERTEX = /* glsl */ `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/**
 * Domain-warped fbm "liquid aurora". Scroll shifts the flow, the pointer adds a glow.
 * Everything is kept dark and low-contrast so that text stays readable.
 */
const FRAGMENT = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;   // pixels, origin bottom-left
uniform float uScroll;  // 0..1

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(17.0, 9.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  float s = min(uRes.x, uRes.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / s;
  vec2 m = (uMouse - 0.5 * uRes) / s;
  float t = uTime * 0.05;

  vec2 q = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.5 + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 1.5 + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p * 1.3 + 3.0 * r + uScroll * 2.5);

  vec3 base   = vec3(0.012, 0.012, 0.030);
  vec3 indigo = vec3(0.20, 0.18, 0.62);
  vec3 violet = vec3(0.50, 0.26, 0.86);
  vec3 cyan   = vec3(0.10, 0.70, 0.82);

  vec3 col = mix(base, indigo, smoothstep(0.25, 0.95, f));
  col = mix(col, violet, smoothstep(0.35, 1.05, length(q)) * 0.55);
  col = mix(col, cyan, smoothstep(0.55, 1.0, r.x) * 0.4);

  // Pointer glow
  float d = length(p - m);
  col += vec3(0.25, 0.30, 1.0) * 0.05 / (d * d * 5.0 + 0.12);

  // Darken + vignette so content always wins
  col *= 0.5;
  col *= 1.0 - 0.65 * smoothstep(0.35, 1.15, length(p));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Full-screen WebGL background. Renders at half resolution for performance. */
export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS fallback behind the canvas stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uScroll = gl.getUniformLocation(program, "uScroll");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const RENDER_SCALE = 0.5;

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * RENDER_SCALE));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * RENDER_SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Smoothed pointer / scroll targets
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let scroll = 0;
    let frame = 0;
    let running = true;
    const start = performance.now();

    const render = (now: number) => {
      if (!running) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = max > 0 ? window.scrollY / max : 0;
      scroll += (target - scroll) * 0.05;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 0 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x * canvas.width, mouse.y * canvas.height);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) frame = requestAnimationFrame(render);
      else cancelAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
    />
  );
}
