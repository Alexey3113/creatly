"use client";
/* ANIMATED · Nº18 — «BLOOM» (класс webgl-hero, приём органические тендрилы обрамляют вьюпорт).
   Один WebGL2-контекст/страница (useShaderHero). Фрагментный шейдер: тонкие органические жгуты/вьюны
   (distance-field контуры domain-warp полей) ПРОРАСТАЮТ от краёв кадра внутрь, обрамляя вьюпорт;
   медленно колышутся (u_time-warp), тянутся глубже по мере скролла (u_scroll растит reach), тёплые
   золотые кончики на узлах/пересечениях. Сквозной ботанический мотив. Палитра: near-black + изумруд/золото.
   Бренд BLOOM — оригинальный люкс-парфюм/сад. Фолбэк: reduced/no-webgl → CSS near-black+изумруд из bloom18.css. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useShaderHero } from "../engine/useShaderHero";
import "./bloom18.css";

/* ── FRAGMENT — вьюны от краёв внутрь: distance-field контуры + domain-warp, изумруд/золото ── */
const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_time;
uniform float u_scroll;
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
  mat2 m = mat2(1.62, 1.2, -1.2, 1.62);
  for(int i=0;i<5;i++){ v += a * vnoise(p); p = m*p + 0.11; a *= 0.5; }
  return v;
}

/* тонкая линия-контур из скалярного поля: 1 на осевой линии жгута, быстро гаснет. */
float tendril(float field, float w){
  float d = abs(fract(field) - 0.5);
  return smoothstep(w, 0.0, d);
}

void main(){
  float ar = u_res.x / u_res.y;
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * ar, uv.y - 0.5) * 2.2;

  float t = u_time * 0.08;
  // курсор слегка отклоняет рост
  p += u_pointer * vec2(0.18, 0.14);

  // 2-ступенчатый domain-warp → органическое, вьющееся коробление жгутов (не сетка)
  vec2 q = vec2( fbm(p*0.9 + vec2(0.0, t)),
                 fbm(p*0.9 + vec2(5.2, -t*0.7)) );
  vec2 w = p + 1.4*q + 0.35*vec2(fbm(p*1.7 + t*0.6), fbm(p*1.7 - t*0.5));

  // вьюны, тянущиеся с боков (частота по x) и с верх/низа (частота по y)
  float fx = w.x*2.3 + fbm(w*1.3 + t*0.5)*2.2;
  float fy = w.y*2.3 + fbm(w*1.3 + 9.0 - t*0.4)*2.2;
  float side  = tendril(fx, 0.055);   // жгуты слева/справа
  float updn  = tendril(fy, 0.055);   // жгуты сверху/снизу
  // тонкие вторичные усики
  float fine  = tendril(fx*2.1 + fy*0.6, 0.03) * 0.5 + tendril(fy*2.1 - fx*0.6, 0.03) * 0.5;

  float vines = max(side, updn) + fine*0.6;

  // РАМКА: жгуты гуще у краёв, центр — воздух. Reach растёт по скроллу (прорастают внутрь).
  vec2 e = abs(uv - 0.5) * vec2(ar, 1.0);
  float edge = max(e.x/ar, e.y);                 // 0 в центре → ~0.5 у края
  float dist = 0.5 - edge;                       // 0 у края → 0.5 в центре
  float reach = 0.16 + u_scroll * 0.26;          // скролл растит проникновение
  float frame = 1.0 - smoothstep(0.0, reach, dist);
  frame = clamp(frame + fbm(w*0.8)*0.12, 0.0, 1.0); // рваная органическая кромка роста
  vines *= frame;

  // узлы/кончики — там где жгуты пересекаются и поле яркое → тёплое золото
  float node = side * updn;
  float tips = pow(clamp(node + vines*0.3, 0.0, 1.0), 2.0) * (0.4 + fbm(w*2.4)*0.9);

  // палитра: near-black + ботанический изумруд + золото
  vec3 ink     = vec3(0.012, 0.02, 0.016);
  vec3 emerald = vec3(0.04,  0.52, 0.34);
  vec3 deepgrn = vec3(0.02,  0.2,  0.15);
  vec3 gold    = vec3(0.92,  0.74, 0.32);

  vec3 col = ink;
  // мягкое изумрудное дыхание у краёв (атмосфера сада)
  col += deepgrn * frame * 0.5;
  // тело жгутов
  col = mix(col, emerald, clamp(vines, 0.0, 1.0));
  // золотые кончики/узлы
  col += gold * tips * frame * 0.9;
  // изумрудное свечение вокруг жгутов
  col += emerald * pow(vines, 1.5) * 0.35;

  // виньетка — центр глубже, чтобы рамка читалась
  float vig = smoothstep(0.2, 1.5, length(vec2((uv.x-0.5)*ar, uv.y-0.5)));
  col += deepgrn * vig * 0.12;

  // film-grain против бандинга
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453 + u_time);
  col += (g - 0.5) * 0.018;

  fragColor = vec4(max(col, 0.0), 1.0);
}`;

export function Bloom18() {
  const canvas = useShaderHero(FRAG);
  return (
    <ScrollStage className="bl webgl-hero">
      <div className="bl-bg" aria-hidden>
        <canvas ref={canvas} className="bl-canvas" />
      </div>

      {/* 0 · COVER — жгуты обрамляют слово, центр — воздух */}
      <Scene className="bl-cover">
        <div className="bl-kick"><span>BLOOM — PARFUM MAISON</span><span>Nº18 · WEBGL</span></div>
        <div className="bl-cover-in">
          <p className="bl-eyebrow">a garden, grown around you</p>
          <h1 className="bl-hero">
            <span className="bl-line" style={{ ["--d" as string]: 0 }}><i>The scent</i></span>
            <span className="bl-line bl-accent" style={{ ["--d" as string]: 1 }}><i>takes root.</i></span>
          </h1>
          <p className="bl-sub">A living frame of tendrils — emerald vines that grow from the edges inward, gold at every node. Scroll, and the garden reaches further in.</p>
        </div>
        <div className="bl-cue" aria-hidden>scroll — let it grow inward ↓</div>
      </Scene>

      {/* 1 · GROW — манифест, вьюны прорастают глубже по скроллу */}
      <Scene className="bl-flow" pinned vh={240}>
        <div className="bl-flow-copy">
          <p className="bl-manifest">
            {["It does not sit in a bottle.", "It climbs —", "along the edge of the room,", "toward the warmth of the skin."].map((tx, i) => (
              <span key={i} className="bl-line" style={{ ["--d" as string]: i }}><i>{tx}</i></span>
            ))}
          </p>
        </div>
      </Scene>

      {/* 2 · SIGNATURE — имя аромата в изумрудной рамке */}
      <Scene className="bl-mass">
        <div className="bl-mass-word" aria-hidden>VERT</div>
        <div className="bl-mass-cap">
          <span className="bl-line bl-accent" style={{ ["--d" as string]: 0 }}><i>Green, resin, and a thread of gold.</i></span>
        </div>
      </Scene>

      {/* 3 · CTA */}
      <Scene className="bl-end">
        <div className="bl-end-block">
          <h2>
            <span className="bl-line" style={{ ["--d" as string]: 0 }}><i>Wear the</i></span>
            <span className="bl-line bl-accent" style={{ ["--d" as string]: 1 }}><i>garden.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="bl-btn">Discover the maison ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
