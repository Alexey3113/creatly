"use client";
/* HOOK-KIT — механика вторых актов хук-сцен /visual-hooks (rev-*, track-*, living-object … fold-horizon).
   • useHookClock — часы сцены поверх scene-kit (один rAF на страницу): прогресс пина → сглаженный --q
     и окна-биты (CSS-переменные на корне сцены), мышь, touch-флаг. Без React-state на кадр.
   • ScrubVideo / seek — скраб all-intra видео без очереди сиков (+ iOS-прайминг play→pause).
   • LensReveal — WebGL-линза: мягкий «живой» край + обод света, наезд камеры, «проталкивание» внешней
     сцены, сумеречный грейд; верхний слой — картинка или видео. Без WebGL — CSS-маска с растушёвкой. */
import { useEffect, useRef } from "react";
import { subscribe, clamp01, smooth, win, type Frame } from "@/components/scene-kit";

export type Beat = readonly [name: string, a: number, b: number, linear?: boolean];
export type Ptr = { x: number; y: number; on: boolean };
export type HookTick = {
  q: number;
  f: Frame;
  el: HTMLElement;
  touch: boolean;
  ptr: Ptr;
  set: (k: string, v: number | string) => void;
  text: (sel: string, s: string) => void;
};

/** Часы хук-сцены. beats — стабильная (модульная) таблица окон: [--var, a, b, linear?] → smoothstep 0..1. */
export function useHookClock(ref: React.RefObject<HTMLElement | null>, beats: readonly Beat[], onTick?: (h: HookTick) => void) {
  const tick = useRef(onTick);
  useEffect(() => {
    tick.current = onTick;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.closest<HTMLElement>(".vh-prototype") ?? el;
    const touch = matchMedia("(hover: none)").matches;
    el.classList.toggle("is-touch", touch);
    const ptr: Ptr = { x: 0.5, y: 0.5, on: false };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ptr.x = e.clientX / innerWidth;
      ptr.y = e.clientY / innerHeight;
      ptr.on = true;
    };
    root.addEventListener("pointermove", move, { passive: true });
    const vars = new Map<string, string>();
    const texts = new Map<string, string>();
    const set = (k: string, v: number | string) => {
      const s = typeof v === "number" ? v.toFixed(4) : v;
      if (vars.get(k) !== s) {
        vars.set(k, s);
        el.style.setProperty(k, s);
      }
    };
    const text = (sel: string, s: string) => {
      if (texts.get(sel) === s) return;
      const n = el.querySelector(sel);
      if (n) {
        n.textContent = s;
        texts.set(sel, s);
      }
    };
    let q = -1;
    const off = subscribe((f) => {
      const r = root.getBoundingClientRect();
      const target = clamp01(-r.top / Math.max(1, r.height - f.vh));
      // lerp ~100 мс: колесо мыши не даёт ступенек, скраб и акты идут плавно
      q = q < 0 || f.reduced ? target : q + (target - q) * Math.min(1, 0.15 * (f.dt / 16.7));
      if (Math.abs(target - q) < 3e-4) q = target;
      set("--q", q);
      for (const [k, a, b, lin] of beats) set(k, lin ? win(q, a, b) : smooth(win(q, a, b)));
      tick.current?.({ q, f, el, touch, ptr, set, text });
    });
    return () => {
      off();
      root.removeEventListener("pointermove", move);
    };
  }, [ref, beats]);
}

/** Скраб к времени t (сек): без очереди сиков и без лишних сиков на месте. */
export function seek(v: HTMLVideoElement | null, t: number) {
  if (!v || !(v.duration > 0) || v.seeking) return;
  const tt = Math.min(v.duration - 0.05, Math.max(0, t));
  if (Math.abs(v.currentTime - tt) > 0.02) v.currentTime = tt;
}

/** Видео под скраб: без автоплея; iOS не рисует кадр после seek, пока ролик ни разу не играл → прайминг. */
export function ScrubVideo({ vref, src, poster, className = "" }: { vref: React.RefObject<HTMLVideoElement | null>; src: string; poster?: string; className?: string }) {
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    const prime = () => {
      v.play()
        .then(() => v.pause())
        .catch(() => {});
    };
    if (v.readyState >= 1) prime();
    else v.addEventListener("loadedmetadata", prime, { once: true });
    return () => v.removeEventListener("loadedmetadata", prime);
  }, [vref]);
  return <video ref={vref} className={className} src={src} poster={poster} muted playsInline preload="auto" />;
}

/** Точка кадра (доли картинки) → доли экрана при object-fit:cover (+ object-position px/py). */
export function coverPt(ix: number, iy: number, vw: number, vh: number, ia = 16 / 9, px = 0.5, py = 0.5) {
  const ca = vw / vh;
  if (ia > ca) {
    const w = ia / ca;
    return { x: ix * w - (w - 1) * px, y: iy };
  }
  const h = ca / ia;
  return { x: ix, y: iy * h - (h - 1) * py };
}

/** Стоп-кадр видео в canvas с раскладкой object-fit:cover (+ object-position) — «застывание» перед переходом. */
export function drawCover(c: HTMLCanvasElement, v: HTMLVideoElement, w: number, h: number, px = 0.5, py = 0.5) {
  const ctx = c.getContext("2d");
  if (!ctx || v.readyState < 2 || !v.videoWidth) return false;
  const dpr = Math.min(1.5, window.devicePixelRatio || 1);
  c.width = Math.round(w * dpr);
  c.height = Math.round(h * dpr);
  const va = v.videoWidth / v.videoHeight;
  const ca = w / h;
  let sw = v.videoWidth, sh = v.videoHeight, sx = 0, sy = 0;
  if (va > ca) {
    sw = sh * ca;
    sx = (v.videoWidth - sw) * px;
  } else {
    sh = sw / ca;
    sy = (v.videoHeight - sh) * py;
  }
  ctx.drawImage(v, sx, sy, sw, sh, 0, 0, c.width, c.height);
  return true;
}

/** Кусочная траектория по точкам (u 0..1 → плавно от точки к точке). */
export function path(pts: readonly (readonly [number, number])[], u: number): [number, number] {
  const n = pts.length - 1;
  const s = clamp01(u) * n;
  const i = Math.min(n - 1, Math.floor(s));
  const k = smooth(s - i);
  return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
}

/* ------------------------------------------------------------------ LensReveal (WebGL) */

export type LensDrive = {
  /** центр линзы, доли экрана (y вниз) */
  x: number;
  y: number;
  /** радиус, доли высоты экрана */
  r: number;
  /** ширина мягкого края */
  soft: number;
  /** сила обода света */
  rim: number;
  /** 0..1 — весь кадр становится верхним слоем */
  fill: number;
  /** наезд камеры на кадр целиком (обе плиты) вокруг zx,zy */
  zoom: number;
  zx: number;
  zy: number;
  /** «проталкивание» внешней сцены (base) от центра линзы */
  push: number;
  /** сумеречный грейд нижней плиты */
  dusk: number;
  /** цвет обода (0..1) — если задан, перекрывает prop rim */
  rc?: readonly [number, number, number];
};
export const lensDrive = (p: Partial<LensDrive> = {}): LensDrive => ({ x: 0.5, y: 0.5, r: 0.2, soft: 0.05, rim: 0.7, fill: 0, zoom: 1, zx: 0.5, zy: 0.5, push: 1, dusk: 0, ...p });

const LENS_VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;
const LENS_FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D uBase, uTop;
uniform vec2 uCoverB, uCoverT, uOffB, uOffT;
uniform float uAspect, uTime;
uniform vec3 uLens;
uniform vec4 uCam;
uniform vec4 uFx;
uniform vec3 uRimC;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.03; a*=0.5; } return v; }
vec2 cover(vec2 p, vec2 c, vec2 o){ return (p-0.5)*c+0.5+o; }
void main(){
  vec2 p = (vUv - uCam.xy) / uCam.z + uCam.xy;
  vec2 d = (vUv - uLens.xy) * vec2(uAspect, 1.0);
  float n = fbm(vUv*vec2(uAspect,1.0)*3.2 + uTime*0.11) - 0.5;
  float dist = length(d) + n * uFx.x * 1.8;
  float reveal = max(smoothstep(uLens.z + uFx.x, uLens.z - uFx.x, dist), uFx.z);
  float band = clamp(1.0 - abs(reveal*2.0 - 1.0), 0.0, 1.0);
  vec2 wob = (vec2(fbm(vUv*7.0 + uTime*0.2), fbm(vUv*7.0 - uTime*0.2)) - 0.5) * 0.035 * band;
  vec2 pb = (p - uLens.xy) / uCam.w + uLens.xy;
  vec3 base = texture2D(uBase, cover(pb, uCoverB, uOffB)).rgb;
  base = mix(base, base*vec3(1.05,0.62,0.46)*0.62, uFx.w);
  vec3 top = texture2D(uTop, cover(p + wob, uCoverT, uOffT)).rgb;
  vec3 col = mix(base, top, reveal);
  float ring = exp(-pow((dist - uLens.z) / max(uFx.x*0.5, 0.002), 2.0));
  col += uRimC * ring * uFx.y * (1.0 - uFx.z);
  gl_FragColor = vec4(col, 1.0);
}`;

const hexRgb = (h: string): [number, number, number] => {
  const m = h.replace("#", "");
  const n = parseInt(m.length === 3 ? m.replace(/./g, (c) => c + c) : m, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/** Линза «под кожу»: base — внешний мир, top — то, что под ним (картинка или видео). Управляется drive (мутабельный ref).
 *  posX — как object-position по X (0..1): что держать в кадре на узком (портретном) экране. */
export function LensReveal({ base, top, video = false, drive, rim = "#ffffff", posX = 0.5, className = "" }: { base: string; top: string; video?: boolean; drive: React.RefObject<LensDrive>; rim?: string; posX?: number; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const bImg = useRef<HTMLImageElement>(null);
  const tImg = useRef<HTMLImageElement>(null);
  const tVid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const canvas = cv.current;
    const bi = bImg.current;
    const topEl: HTMLImageElement | HTMLVideoElement | null = video ? tVid.current : tImg.current;
    if (!box || !canvas || !bi || !topEl) return;
    if (topEl instanceof HTMLVideoElement) {
      topEl.muted = true;
      topEl.play().catch(() => {});
    }
    // фолбэк без WebGL: CSS-маска с растушёвкой по тем же параметрам
    const cssTick = (f: Frame) => {
      const d = drive.current;
      box.style.setProperty("--lx", `${(d.x * 100).toFixed(2)}%`);
      box.style.setProperty("--ly", `${(d.y * 100).toFixed(2)}%`);
      box.style.setProperty("--lr", `${(Math.max(d.r, d.fill * 2) * f.vh).toFixed(1)}px`);
    };
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) return subscribe(cssTick);
    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, LENS_VERT));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, LENS_FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return subscribe(cssTick);
    gl.useProgram(prog);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uCoverB = U("uCoverB"), uCoverT = U("uCoverT"), uOffB = U("uOffB"), uOffT = U("uOffT"), uAspect = U("uAspect"), uTime = U("uTime");
    const uLens = U("uLens"), uCam = U("uCam"), uFx = U("uFx"), uRimC = U("uRimC");
    const mkTex = (unit: number, name: string) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([12, 10, 16, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(U(name), unit);
      return t;
    };
    const texB = mkTex(0, "uBase");
    const texT = mkTex(1, "uTop");
    let aB = 16 / 9, aT = 16 / 9, vw = 1, vh = 1;
    const cover = (ia: number) => (ia > vw / vh ? [vw / vh / ia, 1] : [1, ia / (vw / vh)]);
    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      vw = box.clientWidth || 1;
      vh = box.clientHeight || 1;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, vw / vh);
      const cb = cover(aB), ct = cover(aT);
      gl.uniform2fv(uCoverB, cb);
      gl.uniform2fv(uCoverT, ct);
      gl.uniform2f(uOffB, (1 - cb[0]) * (posX - 0.5), 0);
      gl.uniform2f(uOffT, (1 - ct[0]) * (posX - 0.5), 0);
    };
    const upload = (unit: number, tex: WebGLTexture | null, src: TexImageSource) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    };
    const onBase = () => {
      aB = bi.naturalWidth / bi.naturalHeight;
      upload(0, texB, bi);
      resize();
    };
    if (bi.complete && bi.naturalWidth) onBase();
    else bi.addEventListener("load", onBase, { once: true });
    let vidFresh = true;
    let rvfc = 0;
    if (topEl instanceof HTMLVideoElement) {
      const v = topEl;
      type RVFC = (cb: () => void) => number;
      const req = (v as HTMLVideoElement & { requestVideoFrameCallback?: RVFC }).requestVideoFrameCallback;
      if (req) {
        const onF = () => {
          vidFresh = true;
          rvfc = req.call(v, onF);
        };
        rvfc = req.call(v, onF);
      }
    } else {
      const ti = topEl;
      const onTop = () => {
        aT = ti.naturalWidth / ti.naturalHeight;
        upload(1, texT, ti);
        resize();
      };
      if (ti.complete && ti.naturalWidth) onTop();
      else ti.addEventListener("load", onTop, { once: true });
    }
    const rimC = hexRgb(rim);
    window.addEventListener("resize", resize);
    resize();
    box.classList.add("is-gl");
    let t0 = 0;
    const off = subscribe((f) => {
      if (topEl instanceof HTMLVideoElement && topEl.readyState >= 2 && vidFresh) {
        if (topEl.videoWidth && Math.abs(aT - topEl.videoWidth / topEl.videoHeight) > 1e-3) {
          aT = topEl.videoWidth / topEl.videoHeight;
          resize();
        }
        upload(1, texT, topEl);
        vidFresh = !("requestVideoFrameCallback" in topEl);
      }
      if (!f.reduced) t0 += f.dt / 1000;
      const d = drive.current;
      gl.uniform1f(uTime, t0);
      gl.uniform3f(uLens, d.x, 1 - d.y, d.r);
      gl.uniform4f(uCam, d.zx, 1 - d.zy, Math.max(0.01, d.zoom), Math.max(0.01, d.push));
      gl.uniform4f(uFx, Math.max(0.004, d.soft), d.rim, d.fill, d.dusk);
      gl.uniform3fv(uRimC, d.rc ?? rimC);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    return () => {
      off();
      window.removeEventListener("resize", resize);
      if (rvfc && topEl instanceof HTMLVideoElement) {
        const cancel = (topEl as HTMLVideoElement & { cancelVideoFrameCallback?: (h: number) => void }).cancelVideoFrameCallback;
        cancel?.call(topEl, rvfc);
      }
      box.classList.remove("is-gl");
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [base, top, video, rim, posX, drive]);

  return (
    <div ref={wrap} className={`hk-lens ${className}`} style={{ ["--lpos" as string]: `${posX * 100}% 50%` } as React.CSSProperties}>
      <img ref={bImg} className="hk-lens-base" src={base} alt="" />
      {video ? <video ref={tVid} className="hk-lens-top" src={top} muted loop playsInline preload="auto" /> : <img ref={tImg} className="hk-lens-top" src={top} alt="" />}
      <canvas ref={cv} className="hk-lens-cv" />
    </div>
  );
}
