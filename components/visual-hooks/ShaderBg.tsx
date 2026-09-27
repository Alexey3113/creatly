"use client";
import { useEffect, useRef } from "react";

/**
 * Анимированный WebGL-фон, переиспользуемый. Режимы: aurora | mesh | plasma | flow.
 * Палитра из 3 цветов (hex). Анимируется только когда виден (IntersectionObserver).
 * Фолбэк: если нет WebGL — CSS-градиент из палитры.
 */
const MODES = { aurora: 0, silk: 1, nebula: 2, caustics: 3, ember: 4, grid: 5 } as const;
type Mode = keyof typeof MODES;

const VERT = `attribute vec2 aPos; varying vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uTime, uMode; uniform vec3 uC0,uC1,uC2;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(3.1,1.7); a*=0.5; } return v; }
vec3 pal(float t){ t=clamp(t,0.0,1.0); return t<0.5 ? mix(uC0,uC1,t*2.0) : mix(uC1,uC2,(t-0.5)*2.0); }
vec3 hsv(float h,float s,float v){ vec3 c=clamp(abs(mod(h*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0); return v*mix(vec3(1.0),c,s); }
float starfield(vec2 p){ vec2 g=floor(p*150.0); float h=hash(g); return smoothstep(0.992,1.0,h)*(0.4+0.6*sin(uTime*3.0+h*40.0)); }
void main(){
  vec2 uv=vUv; float ar=uRes.x/uRes.y; vec2 p=vec2(uv.x*ar,uv.y); float t=uTime; vec3 col;
  if(uMode<0.5){                       // AURORA — реальные световые шторы + звёзды
    float x=p.x*1.6; float warp=fbm(vec2(x*0.7, uv.y*1.2 - t*0.1))*1.5;
    float band=0.0;
    for(int i=0;i<3;i++){ float fi=float(i); float pos=fract(x*0.4 + warp*0.5 + t*(0.03+fi*0.012) + fi*0.33);
      band += smoothstep(0.5,0.0, abs(pos-0.5)); }
    float up=smoothstep(0.02,0.7, uv.y);
    float a=clamp(band*up*(0.35+0.65*fbm(vec2(x, t*0.1))),0.0,1.4);
    col = uC0 + pal(a)*a*1.35;
    col += starfield(p)*mix(uC2,vec3(1.0),0.7)*(1.0-up)*1.1;
  } else if(uMode<1.5){                 // SILK — иридесцентный жидкий шёлк
    vec2 q=vec2(fbm(p*1.4+t*0.05), fbm(p*1.4+vec2(4.7)-t*0.04));
    float f=fbm(p*1.4+q*2.3);
    vec3 irid=hsv(fract(f*0.6 + t*0.03 + 0.55),0.5,1.0);
    col=mix(uC0, mix(uC1,uC2,f), 0.55)*(0.45+0.7*f);
    col=mix(col, irid, 0.32*smoothstep(0.25,0.9,f));
  } else if(uMode<2.5){                 // NEBULA — газовые облака + светящиеся ядра + звёзды
    vec2 q=vec2(fbm(p*1.05+t*0.02), fbm(p*1.05+vec2(5.2)-t*0.03));
    float d=fbm(p*1.05+q*1.9);
    col=pal(d)*(0.55+d*0.85) + uC2*pow(d,3.0)*2.2;
    col+=starfield(p)*1.0;
  } else if(uMode<3.5){                 // CAUSTICS — подводный свет
    vec2 pp=p*3.2; float c=0.0;
    for(int i=0;i<3;i++){ float fi=float(i); vec2 o=vec2(fi*1.3, -t*(0.18+fi*0.09));
      c += abs(sin(pp.x+fbm(pp+o)*4.0)*sin(pp.y+fbm(pp.yx+o)*4.0)); }
    c=pow(c*0.42,2.3);
    col=mix(uC0,uC1,0.5)+pal(clamp(c,0.0,1.0))*c*1.4;
  } else if(uMode<4.5){                 // EMBER — восходящий тёплый поток углей
    vec2 fl=vec2(fbm(p*1.6+t*0.04), fbm(p*1.6+vec2(4.0)) - t*0.2);
    float d=fbm(p*2.3+fl*2.5);
    col=pal(d)*(0.45+0.95*d);
    col+=uC2*pow(d,4.0)*2.4*smoothstep(0.15,1.0,1.0-uv.y);
  } else {                             // GRID — ретровейв-перспектива
    vec2 g=vec2(p.x, 1.0/(uv.y*3.0+0.04)); g.y+=t*0.55;
    vec2 gl=abs(fract(g*vec2(8.0,1.0))-0.5);
    float line=smoothstep(0.055,0.0, min(gl.x, gl.y*2.0));
    float hor=smoothstep(0.34,0.5, uv.y);
    col=mix(uC0, uC1, uv.y);
    col+=pal(0.85)*line*hor*1.3;
    col+=uC2*smoothstep(0.56,0.44,uv.y)*0.55;
  }
  col+=(hash(gl_FragCoord.xy+t)-0.5)*0.018;
  gl_FragColor=vec4(max(col,0.0),1.0);
}`;

function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s;
}

export function ShaderBg({ mode = "aurora", palette = ["#0b0713", "#3a1d6e", "#c078ff"], speed = 1, className = "" }: { mode?: Mode; palette?: [string, string, string] | string[]; speed?: number; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current, box = wrap.current;
    if (!cv || !box) return;
    const gl = cv.getContext("webgl", { antialias: false });
    if (!gl) { cv.style.display = "none"; box.style.background = `linear-gradient(135deg, ${palette[0]}, ${palette[1]}, ${palette[2]})`; return; }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform1f(U("uMode"), MODES[mode]);
    gl.uniform3fv(U("uC0"), hex(palette[0])); gl.uniform3fv(U("uC1"), hex(palette[1])); gl.uniform3fv(U("uC2"), hex(palette[2]));
    const uRes = U("uRes"), uTime = U("uTime");

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1); // фон — 1.5 dpr хватает
      const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uRes, cv.width, cv.height);
    };
    window.addEventListener("resize", resize); resize();

    let raf = 0, t = 0, visible = true;
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible && !raf) loop(); }, { threshold: 0 });
    io.observe(box);
    const loop = () => {
      if (!visible) { raf = 0; return; }
      t += 0.016 * speed * (reduce ? 0 : 1);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    // хотя бы один кадр даже при reduce
    gl.uniform1f(uTime, 0); gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduce) loop();

    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [mode, palette.join(), speed]);

  return <div ref={wrap} className={`sbg ${className}`}><canvas ref={canvas} className="sbg-canvas" /></div>;
}
