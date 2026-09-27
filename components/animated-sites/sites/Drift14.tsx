"use client";
/* ANIMATED · Nº14 — «DRIFT» (класс webgl-hero, приём iridescent silk-ленты, реагирующие на курсор).
   Один WebGL2-контекст/страница (useShaderHero). Фрагментный шейдер: текучие шёлковые ленты —
   2-ступенчатый domain-warp гнёт полосы в складки, наложенные слои дают глубину ткани. Iridescent
   hue (переливчатость) сдвигается по u_pointer (курсор ведёт свет по шёлку) + медленное течение u_time.
   Палитра: navy → cobalt → violet с алой хром-кромкой на гребнях складок. Бренд DRIFT — оригинальная
   премиум дизайн-студия. Фолбэк: reduced/no-webgl → CSS navy→violet градиент из drift14.css. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useShaderHero } from "../engine/useShaderHero";
import "./drift14.css";

/* ── FRAGMENT — domain-warp silk-ленты, navy→cobalt→violet, алая хром-кромка, свет по курсору ── */
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
  mat2 m = mat2(1.66, 1.18, -1.18, 1.66);
  for(int i=0;i<5;i++){ v += a * vnoise(p); p = m*p + 0.13; a *= 0.5; }
  return v;
}

/* одна лента шёлка: складчатая полоса вдоль bent-оси. Возвращает (sheen, crest, phase). */
vec3 silk(vec2 p, float freq, float t, float bend){
  // 2-ступенчатый domain-warp гнёт складки
  vec2 q = vec2( fbm(p*1.1 + vec2(0.0, t)),
                 fbm(p*1.1 + vec2(4.7, -t*0.8)) );
  vec2 r = vec2( fbm(p + bend*q + vec2(1.7, 9.2) + t*0.5),
                 fbm(p + bend*q + vec2(8.3, 2.8) - t*0.4) );
  // складки — вдоль наклонной оси; более направленный drape (ленты), мягче хаотичный warp
  float axis = (p.y*0.8 + p.x*0.55) * freq + r.x*2.0 + q.y*0.9;
  float s = sin(axis * 3.14159265);
  float sheen = 0.5 + 0.5*s;                 // тело складки
  float crest = pow(sheen, 10.0);            // тонкий гребень (хром-кромка)
  float phase = fract(axis*0.32 + r.y*0.4);  // фаза переливчатости
  return vec3(sheen, crest, phase);
}

void main(){
  float ar = u_res.x / u_res.y;
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * ar, uv.y - 0.5) * 2.3;

  float t = u_time * 0.09;
  // курсор ведёт свет и слегка тянет ткань
  vec2 ptr = u_pointer;
  p += ptr * vec2(0.55, 0.4);

  // два слоя шёлка разной частоты/направления → глубина ткани
  vec3 A = silk(p,                    2.6, t,        1.7);
  vec3 B = silk(p*1.35 + vec2(3.1,1.6), 3.9, t*0.8, 2.3);

  float sheen = A.x*0.62 + B.x*0.42;
  float crest = max(A.y, B.y*0.8);
  // фаза переливчатости смещается курсором (свет бежит по шёлку) и медленно течёт временем
  float irid = fract(A.z + B.z*0.5 + ptr.x*0.5 - ptr.y*0.3 + t*0.4);

  // палитра: navy → cobalt → violet
  vec3 navy   = vec3(0.015, 0.028, 0.11);
  vec3 cobalt = vec3(0.13,  0.26,  0.92);
  vec3 violet = vec3(0.44,  0.16,  0.88);
  vec3 scarlet= vec3(1.0,   0.14,  0.26);

  // тело шёлка: navy → cobalt по яркости складки
  vec3 col = mix(navy, cobalt, smoothstep(0.1, 0.9, sheen));
  // переливчатый сдвиг cobalt↔violet по фазе (thin-film-lite)
  float iv = 0.5 + 0.5*sin(irid*6.28318);
  col = mix(col, violet, smoothstep(0.25, 0.85, iv) * (0.35 + 0.45*sheen));
  // алая хром-кромка на самых гребнях складок
  col += scarlet * crest * (0.55 + 0.45*abs(u_vel));
  // холодный воздух в провалах складок
  col = mix(navy*1.1, col, smoothstep(0.0, 0.35, sheen));

  // мягкое свечение из глубины ткани
  float glow = pow(sheen, 2.2);
  col += cobalt * glow * 0.12 + violet * glow * 0.06;

  // виньетка + лёгкое разгорание по скроллу
  float vig = smoothstep(1.7, 0.35, length(vec2((uv.x-0.5)*ar, uv.y-0.5)));
  col *= 0.7 + 0.3*vig;
  col *= 0.92 + 0.08*u_scroll;

  // film-grain против бандинга
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453 + u_time);
  col += (g - 0.5) * 0.02;

  fragColor = vec4(max(col, 0.0), 1.0);
}`;

export function Drift14() {
  const canvas = useShaderHero(FRAG);
  return (
    <ScrollStage className="dr webgl-hero">
      <div className="dr-bg" aria-hidden>
        <canvas ref={canvas} className="dr-canvas" />
      </div>

      {/* 0 · COVER — шёлк течёт, свет идёт за курсором */}
      <Scene className="dr-cover">
        <div className="dr-kick"><span>DRIFT — DESIGN STUDIO</span><span>Nº14 · WEBGL</span></div>
        <div className="dr-cover-in">
          <p className="dr-eyebrow">a studio the colour of silk</p>
          <h1 className="dr-hero">
            <span className="dr-line" style={{ ["--d" as string]: 0 }}><i>Work that</i></span>
            <span className="dr-line dr-accent" style={{ ["--d" as string]: 1 }}><i>catches the light.</i></span>
          </h1>
          <p className="dr-sub">We fold brand, motion and interface into one continuous surface — iridescent, exact, alive to the smallest gesture. Move the cursor; the light follows.</p>
        </div>
        <div className="dr-cue" aria-hidden>move the cursor — run the light ↓</div>
      </Scene>

      {/* 1 · CRAFT — манифест, ленты разгоняются по скроллу */}
      <Scene className="dr-flow" pinned vh={240}>
        <div className="dr-flow-copy">
          <p className="dr-manifest">
            {["Nothing here is flat.", "Every plane is woven —", "cobalt bending to violet,", "a scarlet edge where it folds."].map((tx, i) => (
              <span key={i} className="dr-line" style={{ ["--d" as string]: i }}><i>{tx}</i></span>
            ))}
          </p>
        </div>
      </Scene>

      {/* 2 · SIGNATURE — гигантское слово поверх шёлка */}
      <Scene className="dr-mass">
        <div className="dr-mass-word" aria-hidden>SILK</div>
        <div className="dr-mass-cap">
          <span className="dr-line dr-accent" style={{ ["--d" as string]: 0 }}><i>Premium is a material, not a badge.</i></span>
        </div>
      </Scene>

      {/* 3 · CTA */}
      <Scene className="dr-end">
        <div className="dr-end-block">
          <h2>
            <span className="dr-line" style={{ ["--d" as string]: 0 }}><i>Let's weave</i></span>
            <span className="dr-line dr-accent" style={{ ["--d" as string]: 1 }}><i>your surface.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="dr-btn">Start a project ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
