"use client";
/* ANIMATED · Nº27 — «AURORA» (класс webgl-hero, приём fluid flowmap, реагирующий на скролл).
   Один WebGL2-контекст/страница (useShaderHero). Текучее поле: многослойный fbm, адвектируемый
   вдоль flow-направления (curl-подобный поворот домена). Скорость/направление течения — от u_scroll
   и u_vel; лёгкая реакция на курсор. Палитра deep-teal → gold. Заголовок-манифест поверх, строки
   проявляются масками (как эталоны Manifesto/Signal). Бренд AURORA — оригинальная compute-платформа.
   Фолбэк: reduced/no-webgl → CSS-градиент из aurora27.css. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useShaderHero } from "../engine/useShaderHero";
import "./aurora27.css";

/* ── FRAGMENT — advected fbm flowmap, deep-teal→gold, поток гнётся по scroll/vel ──────────── */
const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_time;
uniform float u_scroll;
uniform float u_vel;
uniform vec2  u_pointer;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.7, 1.2, -1.2, 1.7);
  for(int i=0;i<6;i++){ v += a * vnoise(p); p = m*p + 0.15; a *= 0.5; }
  return v;
}

// поворот домена = «flow»: угол зависит от поля и скролла (advection-lite)
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

void main(){
  float ar = u_res.x / u_res.y;
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * ar, uv.y - 0.5) * 3.0;

  float t = u_time * 0.11;
  // направление течения гнётся по скроллу, скорость подхватывает velocity
  float flowDir = 0.9 + u_scroll * 2.2;
  float speed   = t * (1.0 + abs(u_vel) * 0.9);
  p += u_pointer * vec2(0.3, 0.22);

  // flowmap: сэмплим fbm вдоль повёрнутого домена, адвектируем поле вдоль потока
  vec2 flow = rot(flowDir) * vec2(1.0, 0.35);
  vec2 q = p;
  float acc = 0.0, amp = 0.55, w = 0.0;
  for(int i=0;i<4;i++){
    float fi = float(i);
    // каждый слой сдвинут вдоль потока со своей фазой → streaky-адвекция
    vec2 s = q + flow * (speed * (0.6 + fi*0.35)) + vec2(fi*3.1, fi*1.7);
    float n = fbm(s * (1.0 + fi*0.4));
    acc += amp * n; w += amp; amp *= 0.62;
    // curl: следующий слой закручивается градиентом предыдущего
    q += flow * (n - 0.5) * 0.9;
  }
  float field = acc / w;

  // повторное искажение — «жгуты» течения
  float streak = fbm(p * 1.4 + flow * speed * 1.6 + field * 2.4);
  float f = clamp(field * 0.6 + streak * 0.55, 0.0, 1.0);

  // палитра: deep-teal → teal → gold
  vec3 abyss = vec3(0.012, 0.055, 0.062);
  vec3 teal  = vec3(0.043, 0.34,  0.33);
  vec3 aqua  = vec3(0.20,  0.62,  0.55);
  vec3 gold  = vec3(0.95,  0.72,  0.30);
  vec3 amber = vec3(1.0,   0.85,  0.52);

  vec3 col = mix(abyss, teal, smoothstep(0.05, 0.5, f));
  col = mix(col, aqua, smoothstep(0.42, 0.72, f));
  col = mix(col, gold, smoothstep(0.68, 0.92, f));

  // золотые прожилки на гребнях потока + свечение по velocity
  float veins = pow(smoothstep(0.72, 0.98, streak), 2.0);
  col += amber * veins * (0.5 + abs(u_vel) * 0.6);
  // тёплый выброс, растущий по мере скролла (день разгорается)
  col += gold * pow(f, 3.0) * (0.25 + u_scroll * 0.6);

  // виньетка
  float vig = smoothstep(1.6, 0.35, length(vec2((uv.x-0.5)*ar, uv.y-0.5)));
  col *= 0.68 + 0.32*vig;

  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453 + u_time);
  col += (g - 0.5) * 0.02;

  fragColor = vec4(max(col, 0.0), 1.0);
}`;

export function Aurora27() {
  const canvas = useShaderHero(FRAG);
  return (
    <ScrollStage className="au webgl-hero">
      <div className="au-bg" aria-hidden>
        <canvas ref={canvas} className="au-canvas" />
      </div>

      {/* 0 · COVER — манифест поверх течения */}
      <Scene className="au-cover">
        <div className="au-kick"><span>AURORA — COMPUTE FABRIC</span><span>Nº27 · WEBGL</span></div>
        <div className="au-cover-in">
          <p className="au-eyebrow">flow, not queue</p>
          <h1 className="au-hero">
            <span className="au-line" style={{ ["--d" as string]: 0 }}><i>Currents,</i></span>
            <span className="au-line" style={{ ["--d" as string]: 1 }}><i>not</i></span>
            <span className="au-line au-warm" style={{ ["--d" as string]: 2 }}><i>corridors.</i></span>
          </h1>
          <p className="au-sub">Workloads that move like water — finding the warm path through your fabric, reshaping the moment the flow shifts.</p>
        </div>
        <div className="au-cue" aria-hidden>scroll — bend the current ↓</div>
      </Scene>

      {/* 1 · FLOW — манифест, поток разгоняется по скроллу */}
      <Scene className="au-flow" pinned vh={260}>
        <div className="au-flow-copy">
          <p className="au-manifest">
            {["The grid does not schedule.", "It lets pressure decide —", "heat pools where it must,", "and the current answers."].map((tx, i) => (
              <span key={i} className="au-line" style={{ ["--d" as string]: i }}><i>{tx}</i></span>
            ))}
          </p>
        </div>
      </Scene>

      {/* 2 · MASS — гигантское слово проявляется маской */}
      <Scene className="au-mass">
        <div className="au-mass-word" aria-hidden>FLOW</div>
        <div className="au-mass-cap">
          <span className="au-line au-warm" style={{ ["--d" as string]: 0 }}><i>The fabric warms to gold at full tide.</i></span>
        </div>
      </Scene>

      {/* 3 · CTA */}
      <Scene className="au-end">
        <div className="au-end-block">
          <h2>
            <span className="au-line" style={{ ["--d" as string]: 0 }}><i>Let it</i></span>
            <span className="au-line au-warm" style={{ ["--d" as string]: 1 }}><i>flow.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="au-btn">Route your first job ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
