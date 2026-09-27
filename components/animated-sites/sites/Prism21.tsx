"use client";
/* ANIMATED · Nº21 — «PRISM» (класс webgl-hero, приём шейдер-градиент ВТЕКАЕТ в экран устройства).
   Один WebGL2-контекст/страница (useShaderHero): фуллскрин живой domain-warp градиент, СВОЯ палитра —
   slate → azure → indigo → orchid (спектр призмы, отлична от Flux cobalt→magenta) + хроматический
   prism-шов. Вторая сцена: реальный кадр устройства (prism-hero.jpg) на тёмном сланце, а на область
   ЭКРАНА наложен тот же материал через background-attachment:fixed (locked к вьюпорту = один и тот же
   градиентный field) с blend-screen → «материал льётся сквозь рамку». Фолбэк: reduced/no-webgl → CSS-градиент.
   Бренд PRISM — дизайн-OS. Тонкая display-серифная типографика поверх. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useShaderHero } from "../engine/useShaderHero";
import "../engine/scrollstage.css";
import "./prism21.css";

const HERO = "/uploads/1/animated/prism-hero.jpg";

/* ── FRAGMENT — domain-warp simplex fbm, палитра slate→azure→indigo→orchid + prism-шов ────────── */
const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec2  u_pointer;

vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec2 mod289(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.55;
  mat2 m = mat2(1.62, 1.18, -1.18, 1.62);
  for(int i=0;i<5;i++){ v += a * snoise(p); p = m*p; a *= 0.5; }
  return v;
}

void main(){
  float ar = u_res.x / u_res.y;
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * ar, uv.y - 0.5) * 1.6;
  float t = u_time * 0.10;

  // поток смещается по курсору (интерактив призмы)
  p += u_pointer * vec2(0.30, 0.22);

  // 2-ступенчатый domain-warp
  vec2 q = vec2( fbm(p + vec2(0.0, 0.0) + t),
                 fbm(p + vec2(4.4, 1.1) - t*0.8) );
  vec2 r = vec2( fbm(p + 1.7*q + vec2(1.3, 8.7) + t*0.55),
                 fbm(p + 1.7*q + vec2(7.9, 2.4) - t*0.45) );
  float f = fbm(p + 2.5*r);
  f = f * 0.5 + 0.5;

  // СВОЯ палитра: slate → azure → indigo → orchid (спектр призмы)
  vec3 slate  = vec3(0.038, 0.045, 0.070);
  vec3 azure  = vec3(0.12,  0.62,  0.95);
  vec3 indigo = vec3(0.28,  0.20,  0.86);
  vec3 orchid = vec3(0.72,  0.24,  0.92);

  float m1 = smoothstep(0.12, 0.55, f);
  float m2 = smoothstep(0.48, 0.86, f);
  float m3 = smoothstep(0.70, 0.98, f);
  vec3 col = mix(slate, azure, m1);
  col = mix(col, indigo, m2);
  col = mix(col, orchid, m3);

  // хроматический prism-шов на стыке warp-доменов (спектральное расщепление)
  float seam = length(r);
  float band = smoothstep(0.62, 0.9, seam) * (1.0 - m3);
  col += vec3(0.10, 0.45, 0.55) * band;            // cyan-ободок призмы
  float glow = pow(clamp(dot(q, r) * 0.5 + 0.5, 0.0, 1.0), 2.4);
  col += orchid * glow * 0.30 + azure * glow * 0.16;

  // виньетка + едва заметное осветление по скроллу
  float vig = smoothstep(1.30, 0.28, length(vec2((uv.x-0.5)*ar, uv.y-0.5)));
  col *= 0.70 + 0.30*vig;
  col *= 0.92 + 0.10*u_scroll;

  // film-grain против бандинга
  float gr = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453 + u_time);
  col += (gr - 0.5) * 0.02;

  fragColor = vec4(max(col, 0.0), 1.0);
}`;

export function Prism21() {
  const canvas = useShaderHero(FRAG);
  return (
    <ScrollStage className="pr webgl-hero">
      {/* фуллскрин WebGL-фон (fixed) + CSS-градиент-фолбэк под ним */}
      <div className="pr-bg" aria-hidden>
        <canvas ref={canvas} className="pr-canvas" />
      </div>

      {/* 0 · COVER — материал течёт, типографика поверх */}
      <Scene className="pr-cover">
        <div className="pr-kick"><span>PRISM / DESIGN OS</span><span>Nº21 · WEBGL</span></div>
        <div className="pr-cover-in">
          <p className="pr-eyebrow">one surface · every colour of light</p>
          <h1 className="pr-hero">
            <span className="pr-line" style={{ ["--d" as string]: 0 }}><i>Light,</i></span>
            <span className="pr-line pr-accent" style={{ ["--d" as string]: 1 }}><i>refracted.</i></span>
          </h1>
          <p className="pr-sub">An operating system that treats colour as a living material — bent, split and pooled by a single continuous field of light.</p>
        </div>
        <div className="pr-cue" aria-hidden>move the cursor — bend the spectrum ↓</div>
      </Scene>

      {/* 1 · CONTINUITY — материал втекает в экран реального устройства (кадр + fixed-градиент по экрану) */}
      <Scene className="pr-device" pinned vh={220}>
        <div className="pr-device-in">
          <img src={HERO} alt="" className="pr-device-frame" />
          {/* экран устройства: тот же материал, locked к вьюпорту (background-attachment:fixed) → непрерывность */}
          <span className="pr-screen" aria-hidden />
          <div className="pr-device-copy">
            <span className="pr-tag">continuity</span>
            <h2>The same light,<br /><em>inside the glass.</em></h2>
            <p>No seam between the room and the interface. The spectrum that fills the space pours straight through the bezel.</p>
          </div>
        </div>
      </Scene>

      {/* 2 · CTA */}
      <Scene className="pr-end">
        <div className="pr-end-block">
          <h2>
            <span className="pr-line" style={{ ["--d" as string]: 0 }}><i>Build with</i></span>
            <span className="pr-line pr-accent" style={{ ["--d" as string]: 1 }}><i>living light.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="pr-btn">Enter Prism ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
