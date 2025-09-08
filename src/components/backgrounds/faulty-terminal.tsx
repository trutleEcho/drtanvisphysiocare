// src/components/backgrounds/faulty-terminal.tsx
"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";

type Vec2 = [number, number];

export interface FaultyTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  scale?: number;
  gridMul?: Vec2;
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number | boolean;
  curvature?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number; // may be undefined initially, set in effect
  pageLoadAnimation?: boolean;
  brightness?: number;
}

const vertexShader = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/* your fragment shader here (unchanged) */
const fragmentShader = /* glsl */ `...`; // keep original shader string

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3)
    h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

export default function FaultyTerminal({
                                         scale = 1,
                                         gridMul = [2, 1],
                                         digitSize = 1.5,
                                         timeScale = 0.3,
                                         pause = false,
                                         scanlineIntensity = 0.3,
                                         glitchAmount = 1,
                                         flickerAmount = 1,
                                         noiseAmp = 1,
                                         chromaticAberration = 0,
                                         dither = 0,
                                         curvature = 0.2,
                                         tint = "#ffffff",
                                         mouseReact = true,
                                         mouseStrength = 0.2,
                                         // don't read window at module scope — let effect determine final dpr
                                         dpr,
                                         pageLoadAnimation = true,
                                         brightness = 1,
                                         className,
                                         style,
                                         ...rest
                                       }: FaultyTerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const frozenTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const loadAnimationStartRef = useRef<number>(0);
  const timeOffsetRef = useRef<number>(Math.random() * 100);

  // dpr state: use provided prop or compute in browser (inside effect)
  const [resolvedDpr, setResolvedDpr] = useState<number | undefined>(dpr);

  // pick up dpr in browser if not provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      const deviceDpr = Math.min(window.devicePixelRatio || 1, 2);
      setResolvedDpr((prev) => (prev === undefined ? deviceDpr : prev));
    }
  }, [dpr]);

  const tintVec = useMemo(() => hexToRgb(tint), [tint]);

  const ditherValue = useMemo(
      () => (typeof dither === "boolean" ? (dither ? 1 : 0) : dither),
      [dither]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const rect = ctn.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    // Ensure we only run on the client and that dpr is resolved
    if (typeof window === "undefined") return;
    if (resolvedDpr === undefined) return;

    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({ dpr: resolvedDpr });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
              gl.canvas.width,
              gl.canvas.height,
              gl.canvas.width / gl.canvas.height
          ),
        },
        uScale: { value: scale },

        uGridMul: { value: new Float32Array(gridMul) },
        uDigitSize: { value: digitSize },
        uScanlineIntensity: { value: scanlineIntensity },
        uGlitchAmount: { value: glitchAmount },
        uFlickerAmount: { value: flickerAmount },
        uNoiseAmp: { value: noiseAmp },
        uChromaticAberration: { value: chromaticAberration },
        uDither: { value: ditherValue },
        uCurvature: { value: curvature },
        uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },
        uMouse: {
          value: new Float32Array([
            smoothMouseRef.current.x,
            smoothMouseRef.current.y,
          ]),
        },
        uMouseStrength: { value: mouseStrength },
        uUseMouse: { value: mouseReact ? 1 : 0 },
        uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },
        uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },
        uBrightness: { value: brightness },
      },
    });

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!ctn || !renderer) return;
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      if (program && gl) {
        program.uniforms.iResolution.value = new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
        );
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(ctn);
    resize();

    const update = (t: number) => {
      rafRef.current = requestAnimationFrame(update);

      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {
        loadAnimationStartRef.current = t;
      }

      if (!pause) {
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;
        if (program) program.uniforms.iTime.value = elapsed;
        frozenTimeRef.current = elapsed;
      } else {
        if (program) program.uniforms.iTime.value = frozenTimeRef.current;
      }

      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {
        const animationDuration = 2000;
        const animationElapsed = t - loadAnimationStartRef.current;
        const progress = Math.min(animationElapsed / animationDuration, 1);
        if (program) program.uniforms.uPageLoadProgress.value = progress;
      }

      if (mouseReact && program) {
        const dampingFactor = 0.08;
        const smoothMouse = smoothMouseRef.current;
        const mouse = mouseRef.current;
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;

        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = smoothMouse.x;
        mouseUniform[1] = smoothMouse.y;
      }

      renderer.render({ scene: mesh });
    };

    rafRef.current = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    if (mouseReact) ctn.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      if (mouseReact) ctn.removeEventListener("mousemove", handleMouseMove);
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      loadAnimationStartRef.current = 0;
      timeOffsetRef.current = Math.random() * 100;
      rendererRef.current = null;
      programRef.current = null;
    };
    // NOTE: intentionally shallow deps for values that should re-init if changed
  }, [
    resolvedDpr,
    pause,
    timeScale,
    scale,
    gridMul,
    digitSize,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    chromaticAberration,
    ditherValue,
    curvature,
    tintVec,
    mouseReact,
    mouseStrength,
    pageLoadAnimation,
    brightness,
    handleMouseMove,
  ]);

  return (
      <div
          ref={containerRef}
          className={`w-full h-full relative overflow-hidden ${className ?? ""}`}
          style={style}
          {...rest}
      />
  );
}
