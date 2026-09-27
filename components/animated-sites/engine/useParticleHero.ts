"use client";
/* useParticleHero — ОДИН WebGL2-контекст/страница как фон particle-сцены (класс particle/fluid, SPEC).
   GPU point-cloud из N частиц (gl.POINTS). Каждая частица несёт 4 позиции-таргета (aPos0..3) как
   атрибуты; вершинный шейдер mix'ит между ними по u_progress (из page-scroll) → морф формы A→B→C→text.
   Аддитивный/alpha blend, мягкие круглые точки (alpha в fragment), лёгкий twinkle/дыхание, parallax по
   курсору. Text-таргет — растеризация строки/знака в offscreen-canvas 2D → семпл непрозрачных пикселей.
   Хук сам слушает scroll/pointer (интерактив), тикает RAF, ПАУЗИТ при document.hidden, dpr≤2/≤1.25 mobile.
   Reduced-motion ИЛИ нет WebGL2 → canvas.display='none' (под ним CSS-фолбэк из site.css). Полный cleanup.
   JS пишет только числа + один раз заливает буферы. По образцу useShaderHero (1 контекст, тот же контракт). */
import { useEffect, useRef } from "react";

/* ── Публичные утилиты построения таргетов (design-space: y∈[-1,1], x до ±ar; в шейдере x/=aspect) ── */

export type Vec3 = [number, number, number];

/** Фибоначчи-сфера радиуса r. z = 3D-глубина (для size/parallax). */
export function sphereTarget(N: number, r = 0.72): Float32Array {
  const out = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    out[i * 3] = Math.cos(th) * rad * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(th) * rad * r * 0.6;
  }
  return out;
}

/** Тор: R — радиус кольца, r — толщина трубы. Лёгкий наклон для объёма. */
export function torusTarget(N: number, R = 0.52, r = 0.2): Float32Array {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const u = (i * 2.399963) % (Math.PI * 2);
    const v = (i * 0.61803399 * Math.PI * 2) % (Math.PI * 2);
    const cx = (R + r * Math.cos(v)) * Math.cos(u);
    const cy = (R + r * Math.cos(v)) * Math.sin(u);
    const cz = r * Math.sin(v);
    // наклон вокруг X на ~62°
    const a = 1.08;
    out[i * 3] = cx;
    out[i * 3 + 1] = cy * Math.cos(a) - cz * Math.sin(a);
    out[i * 3 + 2] = (cy * Math.sin(a) + cz * Math.cos(a)) * 0.7;
  }
  return out;
}

/** Спиральная галактика: 3 рукава, лог-спираль, разброс. */
export function galaxyTarget(N: number, arms = 3, spread = 0.9): Float32Array {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const arm = (i % arms) / arms;
    const rr = Math.pow(t, 0.6) * spread;
    const ang = arm * Math.PI * 2 + rr * 5.2 + (Math.random() - 0.5) * 0.5;
    const jit = (Math.random() - 0.5) * 0.12 * (0.3 + rr);
    out[i * 3] = Math.cos(ang) * rr + jit;
    out[i * 3 + 1] = Math.sin(ang) * rr * 0.62 + (Math.random() - 0.5) * 0.06;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
  }
  return out;
}

/** Разлётное звёздное поле на весь кадр (редкое, глубокое). */
export function starfieldTarget(N: number, w = 1.35, h = 1.05): Float32Array {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    out[i * 3] = (Math.random() - 0.5) * 2 * w;
    out[i * 3 + 1] = (Math.random() - 0.5) * 2 * h;
    out[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
  }
  return out;
}

/** Направленный поток: частицы «влетают» с одной стороны, размазаны вдоль оси. */
export function streamTarget(N: number, dir: Vec3 = [-2.2, 0.35, 0], jitter = 0.5): Float32Array {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const s = Math.random();
    out[i * 3] = dir[0] * (0.5 + s) + (Math.random() - 0.5) * jitter;
    out[i * 3 + 1] = dir[1] * (0.5 + s) + (Math.random() - 0.5) * jitter * 2.2;
    out[i * 3 + 2] = dir[2] + (Math.random() - 0.5) * 0.8;
  }
  return out;
}

/** Растеризация произвольной 2D-отрисовки (текст/знак) → N частиц по непрозрачным пикселям.
    paint(ctx,w,h) рисует БЕЛЫМ на прозрачном. designH — высота знака в design-space. */
export function rasterizeTarget(
  N: number,
  paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  opt: { aspect?: number; designH?: number; dy?: number; zJit?: number } = {}
): Float32Array {
  const out = new Float32Array(N * 3);
  const cw = 1024;
  const ch = Math.round(cw / (opt.aspect ?? 3.4));
  const cnv = document.createElement("canvas");
  cnv.width = cw;
  cnv.height = ch;
  const ctx = cnv.getContext("2d");
  const H = opt.designH ?? 0.55;
  if (!ctx) {
    for (let i = 0; i < N; i++) out[i * 3 + 2] = 0;
    return out;
  }
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "#fff";
  paint(ctx, cw, ch);
  const data = ctx.getImageData(0, 0, cw, ch).data;
  const pts: number[] = [];
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (data[(y * cw + x) * 4 + 3] > 90) {
        pts.push(x, y);
      }
    }
  }
  const nPts = pts.length / 2;
  const aspectPx = cw / ch;
  const zJit = opt.zJit ?? 0.14;
  for (let i = 0; i < N; i++) {
    let px = cw / 2, py = ch / 2;
    if (nPts > 0) {
      const k = (Math.random() * nPts) | 0;
      px = pts[k * 2];
      py = pts[k * 2 + 1];
    }
    const jx = Math.random() - 0.5;
    const jy = Math.random() - 0.5;
    out[i * 3] = ((px + jx) / cw - 0.5) * aspectPx * H;
    out[i * 3 + 1] = -(((py + jy) / ch) - 0.5) * H + (opt.dy ?? 0);
    out[i * 3 + 2] = (Math.random() - 0.5) * zJit;
  }
  return out;
}

/** Удобный text-таргет: рисует строку в bold-sans (шрифт неважен — семплим пиксели). */
export function textTarget(
  N: number,
  text: string,
  opt: { designH?: number; dy?: number; weight?: number; family?: string; aspect?: number } = {}
): Float32Array {
  const aspect = opt.aspect ?? 3.6;
  return rasterizeTarget(
    N,
    (ctx, w, h) => {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let size = Math.round(h * 0.82);
      const fam = opt.family ?? '"Arial Black", "Helvetica Neue", Arial, sans-serif';
      ctx.font = `${opt.weight ?? 900} ${size}px ${fam}`;
      // ужать по ширине, чтобы влезло
      const maxW = w * 0.92;
      let m = ctx.measureText(text);
      if (m.width > maxW) {
        size = Math.round((size * maxW) / m.width);
        ctx.font = `${opt.weight ?? 900} ${size}px ${fam}`;
      }
      ctx.fillText(text, w / 2, h / 2);
    },
    { aspect, designH: opt.designH ?? 0.5, dy: opt.dy }
  );
}

/* ── Конфиг сцены ──────────────────────────────────────────────────────────────────────────── */
export type ParticleConfig = {
  /** desktop-число частиц (mobile масштабируется отдельно). */
  count: number;
  mobileCount?: number;
  /** до 4 таргетов-строителей (index-консистентны по N). Меньше 4 — последний повторяется. */
  targets: ((N: number) => Float32Array)[];
  colorA: Vec3;
  colorB: Vec3;
  colorC: Vec3;
  clear: [number, number, number, number];
  blend: "add" | "alpha";
  alpha: number;
  pointSize: number;
  /** резкость точки: экспонента alpha-падения. ~1.7 — мягкий glow (тёмный фон), ~3+ — чёткая точка (светлый фон). */
  softness?: number;
  /** амплитуда органического дрейфа/дыхания. ~0.014 — живо, ~0.006 — знак держится чётко. */
  drift?: number;
  /** экстра-сжатие прогресса: морф завершается к progressEnd, дальше — hold (для «дыхания»). */
  progressEnd?: number;
};

const VERT = `#version 300 es
in vec3 aPos0; in vec3 aPos1; in vec3 aPos2; in vec3 aPos3;
in vec2 aSeed;
uniform float u_progress;
uniform float u_time;
uniform float u_aspect;
uniform vec2  u_pointer;
uniform float u_dpr;
uniform float u_pointSize;
uniform float u_drift;
out float vGlow;
out float vShade;
void main(){
  float p = clamp(u_progress, 0.0, 1.0) * 3.0;
  vec3 pos; float seg;
  if(p < 1.0){ float k = smoothstep(0.0,1.0,p);        pos = mix(aPos0,aPos1,k); seg = k; }
  else if(p < 2.0){ float k = smoothstep(0.0,1.0,p-1.0); pos = mix(aPos1,aPos2,k); seg = 1.0+k; }
  else { float k = smoothstep(0.0,1.0,p-2.0);            pos = mix(aPos2,aPos3,k); seg = 2.0+k; }

  // органический дрейф / дыхание — своя фаза на частицу
  float ph = aSeed.x * 6.28318;
  float d  = u_drift;
  pos.x += sin(u_time*0.55 + ph) * d * (0.4 + aSeed.y);
  pos.y += cos(u_time*0.47 + ph*1.3) * d * (0.4 + aSeed.x);

  // parallax по курсору, глубже точки — сильнее
  pos.xy += u_pointer * (0.035 + (pos.z*0.5+0.5) * 0.05);

  vec2 sp = pos.xy;
  sp.x /= u_aspect;
  gl_Position = vec4(sp, 0.0, 1.0);

  float tw = 0.6 + 0.4*sin(u_time*1.9 + ph*3.1);
  float size = u_pointSize * (0.45 + aSeed.y*1.25) * (0.85 + (pos.z*0.5+0.5)) * (0.72 + 0.28*tw);
  gl_PointSize = max(1.0, size * u_dpr);

  vGlow  = 0.5 + 0.5*tw;
  vShade = fract(aSeed.x + seg*0.12);
}`;

const FRAG = `#version 300 es
precision highp float;
in float vGlow; in float vShade;
uniform vec3  u_colA; uniform vec3 u_colB; uniform vec3 u_colC;
uniform float u_alpha;
uniform float u_soft;
out vec4 fragColor;
void main(){
  vec2 dd = gl_PointCoord - 0.5;
  float r = length(dd);
  float a = smoothstep(0.5, 0.0, r);
  a = pow(a, u_soft);
  vec3 col = mix(u_colA, u_colB, smoothstep(0.0, 0.62, vShade));
  col = mix(col, u_colC, smoothstep(0.55, 1.0, vShade));
  col *= vGlow;
  fragColor = vec4(col, a * u_alpha);
}`;

export function useParticleHero(config: ParticleConfig) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cfgRef = useRef(config);
  cfgRef.current = config;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const cfg = cfgRef.current;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = cv.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance" });
    if (!gl || reduced) { cv.style.display = "none"; return; } // → CSS-фолбэк из site.css

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[particle-shader]", gl.getShaderInfoLog(s));
        gl.deleteShader(s); return null;
      }
      return s;
    };
    const vs = mkShader(gl.VERTEX_SHADER, VERT);
    const fs = mkShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { cv.style.display = "none"; return; }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[particle-program]", gl.getProgramInfoLog(prog)); cv.style.display = "none"; return;
    }
    gl.useProgram(prog);

    const fine = matchMedia("(pointer:fine)").matches;
    const N = fine ? cfg.count : (cfg.mobileCount ?? Math.min(12000, Math.round(cfg.count * 0.28)));

    // 4 таргета (index-консистентны). Недостающие — повтор последнего.
    const built = cfg.targets.slice(0, 4).map((fn) => fn(N));
    while (built.length < 4) built.push(built[built.length - 1]);

    // seed-атрибут (2 случайных на частицу)
    const seed = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) { seed[i * 2] = Math.random(); seed[i * 2 + 1] = Math.random(); }

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
      bind("aPos0", built[0], 3),
      bind("aPos1", built[1], 3),
      bind("aPos2", built[2], 3),
      bind("aPos3", built[3], 3),
      bind("aSeed", seed, 2),
    ];

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = U("u_time"), uProg = U("u_progress"), uAspect = U("u_aspect");
    const uPointer = U("u_pointer"), uDpr = U("u_dpr"), uPtSize = U("u_pointSize");
    const uColA = U("u_colA"), uColB = U("u_colB"), uColC = U("u_colC"), uAlpha = U("u_alpha");
    const uSoft = U("u_soft"), uDrift = U("u_drift");

    gl.uniform3fv(uColA, cfg.colorA);
    gl.uniform3fv(uColB, cfg.colorB);
    gl.uniform3fv(uColC, cfg.colorC);
    gl.uniform1f(uAlpha, cfg.alpha);
    gl.uniform1f(uPtSize, cfg.pointSize);
    gl.uniform1f(uSoft, cfg.softness ?? 1.7);
    gl.uniform1f(uDrift, cfg.drift ?? 0.014);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    if (cfg.blend === "add") gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    else gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

    // свой скролл/курсор
    let progTarget = 0, pr = 0, tpx = 0, tpy = 0, px = 0, py = 0;
    const pEnd = cfg.progressEnd ?? 1;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const s = Math.min(1, Math.max(0, window.scrollY / max));
      progTarget = Math.min(1, s / pEnd);
    };
    const onMove = (e: PointerEvent) => {
      tpx = (e.clientX / window.innerWidth) * 2 - 1;
      tpy = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    const [cr, cg, cb, ca] = cfg.clear;
    gl.clearColor(cr, cg, cb, ca);

    let raf = 0, t0 = performance.now();
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      pr += (progTarget - pr) * 0.09;
      px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uProg, pr);
      gl.uniform2f(uPointer, px, py);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, N);
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
