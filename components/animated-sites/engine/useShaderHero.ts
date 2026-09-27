"use client";
/* useShaderHero — ОДИН WebGL2-контекст/страница как фон hero-сцены (раздел SPEC «webgl-hero»).
   Полноэкранный triangle + пользовательский fragment-шейдер. Хук сам слушает scroll/pointer
   (это интерактив — легально), пишет uniform'ы u_time · u_res · u_scroll · u_vel · u_pointer,
   тикает RAF, ПАУЗИТ при document.hidden, dpr≤2 desktop / ≤1.25 mobile.
   Reduced-motion ИЛИ нет WebGL2 → canvas.display='none' (под ним CSS-градиент-фолбэк из site.css).
   Cleanup: delete program/shaders/buffer + WEBGL_lose_context. JS пишет только числа. */
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 aPos; out vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

export function useShaderHero(frag: string) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = cv.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl || reduced) { cv.style.display = "none"; return; } // → CSS-градиент-фолбэк из site.css

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[shader]", gl.getShaderInfoLog(s)); // ловим ошибки компиляции
        gl.deleteShader(s); return null;
      }
      return s;
    };
    const vs = mkShader(gl.VERTEX_SHADER, VERT);
    const fs = mkShader(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) { cv.style.display = "none"; return; }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[program]", gl.getProgramInfoLog(prog)); cv.style.display = "none"; return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = U("u_time"), uRes = U("u_res"), uScroll = U("u_scroll"), uVel = U("u_vel"), uPointer = U("u_pointer");

    const fine = matchMedia("(pointer:fine)").matches;
    const dprMax = fine ? 2 : 1.25;

    const resize = () => {
      const dpr = Math.min(dprMax, window.devicePixelRatio || 1);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (cv.width === w && cv.height === h) return;
      cv.width = w; cv.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // свои слушатели скролла/курсора — источник интерактива
    let scroll = 0, vel = 0, lastY = window.scrollY;
    let tpx = 0, tpy = 0, px = 0, py = 0; // курсор: target → сглаженный
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onMove = (e: PointerEvent) => {
      tpx = (e.clientX / window.innerWidth) * 2 - 1;
      tpy = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0, t0 = performance.now();
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      // сглаженная скролл-скорость
      const rawVel = Math.max(-3, Math.min(3, (window.scrollY - lastY) * 0.06));
      lastY = window.scrollY;
      vel += (rawVel - vel) * 0.12;
      px += (tpx - px) * 0.06; py += (tpy - py) * 0.06;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uScroll, scroll);
      gl.uniform1f(uVel, vel);
      gl.uniform2f(uPointer, px, py);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf) { t0 = performance.now() - 0; raf = requestAnimationFrame(frame); } };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    // пауза RAF когда вкладка скрыта
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (fine) window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteProgram(prog);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [frag]);

  return ref;
}
