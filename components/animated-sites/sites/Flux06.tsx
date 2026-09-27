"use client";
/* ANIMATED · Nº06 — «FLUX» (класс webgl-hero, приём domain-warp simplex-градиент).
   Один WebGL2-контекст/страница (useShaderHero). Фуллскрин живой градиент: 2-ступенчатый
   domain-warp по fbm(Ashima simplex), палитра charcoal → cobalt → magenta, медленное течение
   (u_time) + смещение потока по курсору (u_pointer). Вторая сцена: тот же материал «втекает»
   в 3D-наклонённый мокап устройства (CSS-перспектива, canvas-текстура протянута сквозь рамку) —
   ощущение непрерывности материала. Тонкая серифная типографика поверх.
   Бренд FLUX — оригинальная дизайн-студия/интерфейс-tool. Фолбэк: reduced/no-webgl → CSS-градиент. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useShaderHero } from "../engine/useShaderHero";
import "./flux06.css";

/* ── FRAGMENT — domain-warp simplex fbm, charcoal→cobalt→magenta ─────────────────────────── */
const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec2  u_pointer;

/* Ashima 2D simplex noise */
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
  vec2 p = vec2((uv.x - 0.5) * ar, uv.y - 0.5) * 1.5; // низкая частота → широкие цветовые пулы
  float t = u_time * 0.12;

  // поток смещается по курсору
  p += u_pointer * vec2(0.35, 0.25);

  // 2-ступенчатый domain-warp (broad, cinematic — а не marble)
  vec2 q = vec2( fbm(p + vec2(0.0, 0.0) + t),
                 fbm(p + vec2(5.2, 1.3) - t*0.8) );
  vec2 r = vec2( fbm(p + 1.6*q + vec2(1.7, 9.2) + t*0.6),
                 fbm(p + 1.6*q + vec2(8.3, 2.8) - t*0.5) );
  float f = fbm(p + 2.4*r);
  f = f * 0.5 + 0.5;

  // палитра: charcoal → cobalt → magenta
  vec3 charcoal = vec3(0.035, 0.043, 0.078);
  vec3 cobalt   = vec3(0.16,  0.30,  0.98);
  vec3 magenta  = vec3(0.95,  0.18,  0.60);
  vec3 violet   = vec3(0.42,  0.12,  0.72);

  float m1 = smoothstep(0.15, 0.62, f);
  float m2 = smoothstep(0.55, 0.95, f);
  vec3 col = mix(charcoal, cobalt, m1);
  col = mix(col, magenta, m2);

  // фиолетовый шов на стыке warp-доменов + свечение из «глубины» потока
  float seam = length(r);
  col = mix(col, violet, clamp(seam*0.5, 0.0, 0.55) * (1.0 - m2));
  float glow = pow(clamp(dot(q, r) * 0.5 + 0.5, 0.0, 1.0), 2.2);
  col += magenta * glow * 0.32 + cobalt * glow * 0.14;

  // лёгкая виньетка + течение вниз по скроллу (материал «садится»)
  float vig = smoothstep(1.25, 0.25, length(vec2((uv.x-0.5)*ar, uv.y-0.5)));
  col *= 0.72 + 0.28*vig;
  col *= 0.9 + 0.1*u_scroll;

  // тонкий film-grain убирает бандинг
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453 + u_time);
  col += (g - 0.5) * 0.02;

  fragColor = vec4(max(col, 0.0), 1.0);
}`;

export function Flux06() {
  const canvas = useShaderHero(FRAG);
  return (
    <ScrollStage className="fx webgl-hero">
      {/* фуллскрин WebGL-фон (fixed) + CSS-градиент-фолбэк под ним */}
      <div className="fx-bg" aria-hidden>
        <canvas ref={canvas} className="fx-canvas" />
      </div>

      {/* 0 · COVER — материал течёт, типографика поверх */}
      <Scene className="fx-cover">
        <div className="fx-kick"><span>FLUX / DESIGN SYSTEM</span><span>Nº06 · WEBGL</span></div>
        <div className="fx-cover-in">
          <p className="fx-eyebrow">a design tool that flows</p>
          <h1 className="fx-hero">
            <span className="fx-line" style={{ ["--d" as string]: 0 }}><i>Material</i></span>
            <span className="fx-line fx-accent" style={{ ["--d" as string]: 1 }}><i>in motion.</i></span>
          </h1>
          <p className="fx-sub">Every surface is a fluid. Colour bends, light pools, nothing sits still — a design canvas that behaves like the light it renders.</p>
        </div>
        <div className="fx-cue" aria-hidden>move the cursor — bend the field ↓</div>
      </Scene>

      {/* 1 · CONTINUITY — тот же материал втекает в 3D-мокап устройства */}
      <Scene className="fx-device">
        <div className="fx-device-copy">
          <span className="fx-tag">continuity</span>
          <h2>The same material,<br /><em>inside the screen.</em></h2>
          <p>No seam between the world and the interface. The gradient that fills the room pours straight through the bezel.</p>
        </div>
        <div className="fx-stage" aria-hidden>
          <div className="fx-slab">
            <div className="fx-slab-face">
              <div className="fx-slab-glass" />
              <div className="fx-slab-ui">
                <span className="fx-dot" /><span className="fx-dot" /><span className="fx-dot" />
                <div className="fx-ui-row" style={{ width: "62%" }} />
                <div className="fx-ui-row" style={{ width: "84%" }} />
                <div className="fx-ui-row" style={{ width: "48%" }} />
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 2 · CTA */}
      <Scene className="fx-end">
        <div className="fx-end-block">
          <h2>
            <span className="fx-line" style={{ ["--d" as string]: 0 }}><i>Design with</i></span>
            <span className="fx-line fx-accent" style={{ ["--d" as string]: 1 }}><i>living matter.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="fx-btn">Open the studio ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
