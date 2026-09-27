"use client";
import { useEffect, useRef } from "react";

/**
 * WebGL-reveal: жидкое шейдерное «перетекание» base → top вокруг курсора.
 * mode "mix"       — два изображения (dead → alive).
 * mode "raw-sharp" — одно изображение; base = размытая/обесцвеченная версия top.
 * Фолбэк: если WebGL недоступен — просто <img src={top}>.
 */
const VERT = `attribute vec2 aPos; varying vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D uBase, uTop;
uniform vec2 uMouse, uCover, uOffset;
uniform float uTime, uRadius, uAspect, uMode, uActive;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
vec4 blurDesat(sampler2D t, vec2 uv){
  float r=0.004; vec4 s=texture2D(t,uv);
  s+=texture2D(t,uv+vec2(r,0.0)); s+=texture2D(t,uv-vec2(r,0.0));
  s+=texture2D(t,uv+vec2(0.0,r)); s+=texture2D(t,uv-vec2(0.0,r));
  s+=texture2D(t,uv+vec2(r,r)); s+=texture2D(t,uv-vec2(r,r)); s/=7.0;
  float g=dot(s.rgb, vec3(0.299,0.587,0.114));
  return vec4(mix(vec3(g), s.rgb, 0.35)*0.6, 1.0);
}
void main(){
  vec2 uv = (vUv-0.5)*uCover+0.5+uOffset;
  vec2 d = vUv-uMouse; d.x*=uAspect;
  float dist = length(d);
  float n = fbm(vUv*6.0 + uTime*0.15);
  float edge = 0.16;
  float reveal = smoothstep(uRadius+edge, uRadius-edge, dist + (n-0.5)*0.24) * uActive;
  vec2 disp = vec2(fbm(vUv*9.0+uTime*0.25)-0.5, fbm(vUv*9.0-uTime*0.25)-0.5)*0.05*reveal;
  vec4 base = (uMode > 0.5) ? blurDesat(uTop, uv) : texture2D(uBase, uv);
  vec4 top = texture2D(uTop, uv+disp);
  gl_FragColor = mix(base, top, reveal);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function ShaderReveal({ base, top, mode = "mix", radius = 0.22, className = "", children }: { base: string; top: string; mode?: "mix" | "raw-sharp"; radius?: number; className?: string; children?: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current, box = wrap.current;
    if (!cv || !box) return;
    const gl = cv.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) { cv.style.display = "none"; return; } // фолбэк на <img>

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
    const uMouse = U("uMouse"), uTime = U("uTime"), uRadius = U("uRadius"), uAspect = U("uAspect"),
      uCover = U("uCover"), uOffset = U("uOffset"), uMode = U("uMode"), uActive = U("uActive");
    gl.uniform1f(uRadius, radius);
    gl.uniform1f(uMode, mode === "raw-sharp" ? 1 : 0);

    let imgAspect = 1;
    const mkTex = (unit: number, uni: string) => {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 14, 26, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(U(uni), unit);
      return tex;
    };
    const texBase = mkTex(0, "uBase"), texTop = mkTex(1, "uTop");
    const load = (src: string, unit: number, tex: WebGLTexture | null, primary: boolean) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (primary) imgAspect = img.naturalWidth / img.naturalHeight;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        resize();
      };
      img.src = src;
    };
    load(base, 0, texBase, false);
    load(top, 1, texTop, true);

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = box.clientWidth, h = box.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      const canvasAspect = w / h;
      gl.uniform1f(uAspect, canvasAspect);
      // cover: как object-fit:cover
      const s = imgAspect / canvasAspect;
      if (s > 1) gl.uniform2f(uCover, 1 / s, 1); else gl.uniform2f(uCover, 1, s);
      gl.uniform2f(uOffset, 0, 0);
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 };
    let active = reduce ? 1 : 0; // без движения — показываем «живую» версию по центру
    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      active = 1;
    };
    const onLeave = () => { if (!reduce) active = 0; };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    resize();

    let raf = 0, t = 0, curActive = active;
    const draw = () => {
      t += 0.016;
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      curActive += (active - curActive) * 0.08;
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uTime, reduce ? 0 : t);
      gl.uniform1f(uActive, curActive);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [base, top, mode, radius]);

  return (
    <div ref={wrap} className={`sr-reveal ${className}`}>
      <img className="sr-fallback" src={top} alt="" />
      <canvas ref={canvas} className="sr-canvas" />
      {children}
    </div>
  );
}
