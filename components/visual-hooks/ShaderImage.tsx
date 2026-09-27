"use client";
import { useEffect, useRef } from "react";

/**
 * WebGL-картинка с hover-displacement: рипл-волна от курсора + хром. аберрация + лёгкий зум.
 * Рендер только во время наведения/затухания (render-on-demand). Фолбэк — <img>.
 */
const VERT = `attribute vec2 aPos; varying vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uMouse, uCover;
uniform float uTime, uHover, uAspect;
void main(){
  vec2 uv = (vUv-0.5)*uCover+0.5;
  uv = (uv-0.5)*(1.0 - 0.06*uHover)+0.5;         // лёгкий зум на hover
  vec2 d = vUv-uMouse; d.x*=uAspect;
  float dist = length(d);
  float fall = exp(-dist*4.2)*uHover;
  vec2 dir = normalize(d+1e-4);
  vec2 off = dir*(sin(dist*26.0 - uTime*4.0)*0.011*fall);
  float ca = 0.005*fall;                          // хром. аберрация у курсора
  float r = texture2D(uTex, uv+off+dir*ca).r;
  float g = texture2D(uTex, uv+off).g;
  float b = texture2D(uTex, uv+off-dir*ca).b;
  gl_FragColor = vec4(r,g,b,1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function ShaderImage({ src, className = "" }: { src: string; className?: string }) {
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
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // текстуры WebGL перевёрнуты по Y

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uMouse = U("uMouse"), uTime = U("uTime"), uHover = U("uHover"), uAspect = U("uAspect"), uCover = U("uCover");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([17, 17, 17, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(U("uTex"), 0);

    let imgAspect = 1, ready = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgAspect = img.naturalWidth / img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      ready = true;
      resize();
      drawOnce();
    };
    img.src = src;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      const ca = w / h;
      gl.uniform1f(uAspect, ca);
      const s = imgAspect / ca;
      if (s > 1) gl.uniform2f(uCover, 1 / s, 1); else gl.uniform2f(uCover, 1, s);
    };

    const target = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 };
    let hover = 0, hoverTarget = 0, t = 0, raf = 0, running = false;
    const render = () => {
      cur.x += (target.x - cur.x) * 0.14;
      cur.y += (target.y - cur.y) * 0.14;
      hover += (hoverTarget - hover) * 0.08;
      t += 0.016;
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uHover, hover);
      gl.uniform1f(uTime, reduce ? 0 : t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const drawOnce = () => { if (ready) render(); };
    const loop = () => {
      render();
      if (hover < 0.004 && hoverTarget === 0) { running = false; render(); return; } // осели — стоп
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!running && ready) { running = true; raf = requestAnimationFrame(loop); } };

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      hoverTarget = 1; kick();
    };
    const onLeave = () => { hoverTarget = 0; kick(); };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerenter", onMove);
    box.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerenter", onMove);
      box.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  return (
    <div ref={wrap} className={`si-img ${className}`}>
      <img className="si-fallback" loading="lazy" src={src} alt="" />
      <canvas ref={canvas} className="si-canvas" />
    </div>
  );
}
