"use client";
/* useHelix — ОДИН WebGL2-контекст/страница: realtime двойная спираль ДНК из светящихся точек.
   По образцу useShaderHero (1 контекст, тот же контракт uniform'ов, RAF-пауза при hidden, cleanup,
   dpr≤2/≤1.25). JS один раз заливает атрибуты (aPhase·aFrac·aKind·aSeed), дальше пишет только числа.
   Вершинный шейдер сам считает 3D-позицию точки на спирали, вращает её по u_time (спираль крутится
   по глубине), едет вдоль оси по u_scroll (пролёт вдоль strand), базовые пары (ноды) загораются,
   проходя фокальную плоскость — лёгкий rack-focus. Fragment: мягкая круглая точка, аддитивный blend.
   Палитра navy + amber(strand A)/blue(strand B) + bokeh. Reduced-motion ИЛИ нет WebGL2 → canvas.display
   ='none' (под ним CSS-фолбэк из helix16.css). Всё визуальное — в шейдере, JS раздаёт только uniforms. */
import { useEffect, useRef } from "react";

/* ── Геометрия спирали (индекс-консистентные атрибуты, заливаются один раз) ─────────────────── */
function buildHelix(fine: boolean) {
  const STRAND = fine ? 1100 : 360;   // точек на каждую нить
  const PAIRS = fine ? 74 : 30;       // базовых пар (rungs)
  const RUNGPT = fine ? 11 : 6;       // точек на перекладину
  const BOKEH = fine ? 300 : 90;      // фоновые боке
  const phase: number[] = [], frac: number[] = [], kind: number[] = [], seed: number[] = [];
  const push = (ph: number, fr: number, kd: number) => {
    phase.push(ph); frac.push(fr); kind.push(kd);
    seed.push(Math.random(), Math.random());
  };
  // две нити
  for (let i = 0; i < STRAND; i++) {
    const ph = i / (STRAND - 1);
    push(ph, 0, 0); // strand A
    push(ph, 1, 1); // strand B
  }
  // перекладины (базовые пары) + узловые маркеры на концах
  for (let p = 0; p < PAIRS; p++) {
    const ph = p / (PAIRS - 1);
    for (let r = 0; r < RUNGPT; r++) push(ph, r / (RUNGPT - 1), 2);
    push(ph, 0, 3); push(ph, 1, 3); // яркие ноды на концах пары
  }
  // фоновые боке (позиция из seed в шейдере)
  for (let b = 0; b < BOKEH; b++) push(0, 0, 4);
  return {
    N: kind.length,
    aPhase: new Float32Array(phase),
    aFrac: new Float32Array(frac),
    aKind: new Float32Array(kind),
    aSeed: new Float32Array(seed),
  };
}

const VERT = `#version 300 es
in float aPhase; in float aFrac; in float aKind; in vec2 aSeed;
uniform float u_time; uniform float u_scroll; uniform float u_vel;
uniform vec2  u_pointer; uniform float u_aspect; uniform float u_dpr;
out float vKind; out float vGlow; out float vDepth; out float vNode;

const float PI = 3.14159265;
const float TURNS = 7.0;    // витков на всю нить
const float RAD   = 0.62;   // радиус спирали
const float AXIS  = 7.4;    // длина по оси (много экранов)
const float TRAVEL= 6.2;    // насколько пролетаем по оси за весь скролл

void main(){
  float k = aKind;

  if(k > 3.5){
    // ── БОКЕ: рассеяны в фоне, лёгкий дрейф, большая мягкая точка ──
    float sx = (aSeed.x - 0.5) * 3.4;
    float sy = mod(aSeed.y * 6.0 - u_scroll * 2.4 + u_time*0.02, 3.2) - 1.6;
    float sz = -1.1 - aSeed.x * 1.4;
    vec2 sp = vec2(sx, sy);
    sp += u_pointer * 0.12;
    sp.x /= u_aspect;
    gl_Position = vec4(sp * 0.5, 0.0, 1.0);
    gl_PointSize = (26.0 + aSeed.y * 46.0) * u_dpr;
    vKind = k; vDepth = 0.0; vNode = 0.0;
    vGlow = 0.16 + 0.10 * sin(u_time*0.6 + aSeed.x*6.28);
    return;
  }

  // ── СПИРАЛЬ: два 3D-луча нити, rung = mix между ними ──
  float spin = u_time * 0.5;
  float ang0 = aPhase * TURNS * 2.0 * PI + spin;
  float ang1 = ang0 + PI;
  float y = (aPhase - 0.5) * AXIS;
  vec3 p0 = vec3(cos(ang0)*RAD, y, sin(ang0)*RAD);
  vec3 p1 = vec3(cos(ang1)*RAD, y, sin(ang1)*RAD);
  vec3 pos = mix(p0, p1, aFrac);

  // пролёт вдоль оси по скроллу
  pos.y -= (u_scroll - 0.5) * TRAVEL;

  // лёгкий наклон всей спирали вокруг X — объёмнее
  float ct = cos(0.20), st = sin(0.20);
  pos = vec3(pos.x, pos.y*ct - pos.z*st, pos.y*st + pos.z*ct);

  // parallax по курсору
  pos.xy += u_pointer * (0.05 + (pos.z*0.5+0.5)*0.06);

  // перспектива (камера на +Z)
  float w = 1.9 / (1.9 + (0.9 - pos.z));
  vec2 sp = pos.xy * w;
  sp.x /= u_aspect;
  sp.y *= 0.42;                 // уместить длинную ось
  gl_Position = vec4(sp, 0.0, 1.0);

  // rack-focus: фокус у передней дуги (z→+RAD), плоскость чуть плывёт по скроллу
  float focusZ = 0.30 + sin(u_scroll*3.14)*0.28;
  float foc = 1.0 - clamp(abs(pos.z - focusZ) / 0.9, 0.0, 1.0);
  vDepth = pos.z*0.5 + 0.5;

  // нода загорается, проходя центр кадра (y≈0)
  float node = 1.0 - clamp(abs(pos.y) / 0.5, 0.0, 1.0);
  node *= smoothstep(0.0, 1.0, node);
  vNode = (k > 2.5) ? node : 0.0;

  float base = (k < 1.5) ? 2.6 : (k < 2.5 ? 1.7 : 4.4);   // strand / rung / node
  float size = base * (0.5 + foc*0.9) * (0.7 + vDepth*0.7);
  size *= (k > 2.5) ? (0.7 + vNode*2.2) : 1.0;            // ноды разбухают в фокусе кадра
  gl_PointSize = max(1.0, size * u_dpr * (0.9 + 0.1*u_dpr));

  float tw = 0.6 + 0.4*sin(u_time*2.0 + aSeed.x*6.28);
  vGlow = (0.28 + foc*0.85) * tw + vNode*0.8;
  vKind = k;
}`;

const FRAG = `#version 300 es
precision highp float;
in float vKind; in float vGlow; in float vDepth; in float vNode;
uniform float u_time;
out vec4 fragColor;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  float soft = (vKind > 3.5) ? 5.0 : 1.9;      // боке — очень мягкие
  float a = pow(smoothstep(0.5, 0.0, r), soft);

  vec3 amber = vec3(1.0, 0.66, 0.26);
  vec3 blue  = vec3(0.34, 0.55, 1.0);
  vec3 pale  = vec3(0.78, 0.86, 1.0);
  vec3 col;
  if(vKind < 1.5)      col = amber;                    // strand A
  else if(vKind < 2.5) col = blue;                     // strand B
  else if(vKind < 3.5) col = mix(pale, amber, 0.35);   // rung
  else                 col = mix(blue, amber, step(0.5, fract(vDepth*7.0))); // боке — синь/янтарь

  // ноды на пике фокуса выбеливаются
  col = mix(col, vec3(1.0), clamp(vNode*0.7, 0.0, 1.0));
  col *= (0.5 + vGlow);

  float alpha = (vKind > 3.5) ? a * 0.16 : a * (0.55 + vNode*0.45);
  fragColor = vec4(col, alpha);
}`;

export function useHelix() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = cv.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance" });
    if (!gl || reduced) { cv.style.display = "none"; return; } // → CSS-фолбэк из helix16.css

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[helix-shader]", gl.getShaderInfoLog(s)); gl.deleteShader(s); return null;
      }
      return s;
    };
    const vs = mkShader(gl.VERTEX_SHADER, VERT);
    const fs = mkShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { cv.style.display = "none"; return; }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[helix-program]", gl.getProgramInfoLog(prog)); cv.style.display = "none"; return;
    }
    gl.useProgram(prog);

    const fine = matchMedia("(pointer:fine)").matches;
    const geo = buildHelix(fine);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const bind = (name: string, arr: Float32Array, size: number) => {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name);
      if (loc >= 0) { gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0); }
      return b;
    };
    const buffers = [
      bind("aPhase", geo.aPhase, 1),
      bind("aFrac", geo.aFrac, 1),
      bind("aKind", geo.aKind, 1),
      bind("aSeed", geo.aSeed, 2),
    ];

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = U("u_time"), uScroll = U("u_scroll"), uVel = U("u_vel");
    const uPointer = U("u_pointer"), uAspect = U("u_aspect"), uDpr = U("u_dpr");

    const dprMax = fine ? 2 : 1.25;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(dprMax, window.devicePixelRatio || 1);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (cv.width === w && cv.height === h) return;
      cv.width = w; cv.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uAspect, w / h);
      gl.uniform1f(uDpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let scroll = 0, sm = 0, vel = 0, lastY = window.scrollY;
    let tpx = 0, tpy = 0, px = 0, py = 0;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onMove = (e: PointerEvent) => {
      tpx = (e.clientX / window.innerWidth) * 2 - 1;
      tpy = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // аддитивный
    gl.clearColor(0.023, 0.043, 0.086, 1.0);

    let raf = 0, t0 = performance.now();
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      sm += (scroll - sm) * 0.08;
      const rawVel = Math.max(-3, Math.min(3, (window.scrollY - lastY) * 0.06));
      lastY = window.scrollY; vel += (rawVel - vel) * 0.12;
      px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uScroll, sm);
      gl.uniform1f(uVel, vel);
      gl.uniform2f(uPointer, px, py);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, geo.N);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf) { t0 = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (fine) window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteVertexArray(vao);
      gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteProgram(prog);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return ref;
}
