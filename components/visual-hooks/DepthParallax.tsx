"use client";
import { useEffect, useRef } from "react";

/**
 * Depth-параллакс: статичное фото + карта глубины → псевдо-3D камера от курсора.
 * Ближние объекты (белое в depth) смещаются сильнее, дальние (чёрное) почти нет.
 * Overscan прячет края; лёгкий idle-дрейф оживляет без мыши. Фолбэк — <img>.
 */
const VERT = `attribute vec2 aPos; varying vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D uTex, uDepth;
uniform vec2 uMouse, uCover;
uniform float uAmp, uTime;
// размытая глубина: сглаживает резкие края → параллакс плавно варпит, а не рвёт силуэты
float dsample(vec2 uv){
  float r=0.012;
  float d = texture2D(uDepth,uv).r*0.30;
  d += (texture2D(uDepth,uv+vec2(r,0.)).r + texture2D(uDepth,uv-vec2(r,0.)).r + texture2D(uDepth,uv+vec2(0.,r)).r + texture2D(uDepth,uv-vec2(0.,r)).r)*0.125;
  d += (texture2D(uDepth,uv+vec2(r,r)).r + texture2D(uDepth,uv-vec2(r,r)).r + texture2D(uDepth,uv+vec2(r,-r)).r + texture2D(uDepth,uv-vec2(r,-r)).r)*0.05;
  return d;
}
void main(){
  vec2 base = (vUv-0.5)*uCover+0.5;
  float d = dsample(base) - 0.15;                  // дальний план почти не двигается
  vec2 par = uMouse*uAmp*d;
  par += vec2(sin(uTime*0.30), cos(uTime*0.23))*uAmp*0.30*d;  // idle-дрейф
  gl_FragColor = texture2D(uTex, base - par);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s;
}

export function DepthParallax({ src, depth, amp = 0.05, className = "" }: { src: string; depth: string; amp?: number; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current, box = wrap.current;
    if (!cv || !box) return;
    const gl = cv.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) { cv.style.display = "none"; return; }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // WebGL текстуры перевёрнуты по Y — исправляем

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uMouse = U("uMouse"), uTime = U("uTime"), uAmp = U("uAmp"), uCover = U("uCover");
    gl.uniform1f(uAmp, amp);

    let imgAspect = 1;
    const mkTex = (unit: number, uni: string) => {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([17, 17, 17, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(U(uni), unit); return tex;
    };
    const texImg = mkTex(0, "uTex"), texDepth = mkTex(1, "uDepth");
    const load = (url: string, unit: number, tex: WebGLTexture | null, primary: boolean) => {
      const im = new Image(); im.crossOrigin = "anonymous";
      im.onload = () => {
        if (primary) imgAspect = im.naturalWidth / im.naturalHeight;
        gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im); resize();
      };
      im.src = url;
    };
    load(src, 0, texImg, true);
    load(depth, 1, texDepth, false);

    const Z = 1 / 1.18; // зум внутрь → запас по краям, чтобы параллакс не обнажал границы
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      const ca = w / h, s = imgAspect / ca;
      if (s > 1) gl.uniform2f(uCover, Z / s, Z); else gl.uniform2f(uCover, Z, Z * s);
    };

    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    resize();

    let raf = 0, t = 0;
    const draw = () => {
      t += 0.016;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      gl.uniform2f(uMouse, cur.x, -cur.y);
      gl.uniform1f(uTime, reduce ? 0 : t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src, depth, amp]);

  return (
    <div ref={wrap} className={`dp-img ${className}`}>
      <img className="dp-fallback" src={src} alt="" />
      <canvas ref={canvas} className="dp-canvas" />
    </div>
  );
}
