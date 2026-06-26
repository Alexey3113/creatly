export interface AnimationPreset {
  id: string;
  name: string;
  category: "entrance" | "hover" | "scroll" | "loop";
  css: string;
  trigger: string;
}

// Премиальный easing по умолчанию — expo-out, ощущается «дорого».
const EASE = "cubic-bezier(.16,1,.3,1)";

export const animationPresets: AnimationPreset[] = [
  // ===== Entrance (появление при скролле) =====
  { id: "fade-in", name: "Плавное появление", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:translateY(20px);transition:opacity .7s ${EASE},transform .7s ${EASE}`, },
  { id: "fade-in-up", name: "Снизу вверх", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:translateY(40px);transition:opacity .8s ${EASE},transform .8s ${EASE}`, },
  { id: "fade-in-left", name: "Слева", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:translateX(-40px);transition:opacity .8s ${EASE},transform .8s ${EASE}`, },
  { id: "fade-in-right", name: "Справа", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:translateX(40px);transition:opacity .8s ${EASE},transform .8s ${EASE}`, },
  { id: "scale-in", name: "Масштабирование", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:scale(.92);transition:opacity .6s ${EASE},transform .6s ${EASE}`, },
  { id: "blur-in", name: "Из размытия", category: "entrance", trigger: "scroll",
    css: `opacity:0;filter:blur(10px);transform:translateY(12px);transition:opacity .7s ${EASE},filter .7s ${EASE},transform .7s ${EASE}`, },
  { id: "clip-reveal", name: "Раскрытие снизу", category: "entrance", trigger: "scroll",
    css: `clip-path:inset(100% 0 0 0);transition:clip-path .9s ${EASE}`, },
  { id: "clip-reveal-left", name: "Раскрытие слева", category: "entrance", trigger: "scroll",
    css: `clip-path:inset(0 100% 0 0);transition:clip-path .9s ${EASE}`, },
  { id: "mask-up", name: "Маска вверх", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:translateY(100%);transition:opacity .8s ${EASE},transform .8s ${EASE}`, },
  { id: "rotate-in", name: "Поворот", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:rotate(-4deg) translateY(24px);transition:opacity .8s ${EASE},transform .8s ${EASE}`, },
  { id: "zoom-out-in", name: "Из увеличения", category: "entrance", trigger: "scroll",
    css: `opacity:0;transform:scale(1.08);transition:opacity .8s ${EASE},transform .8s ${EASE}`, },

  // ===== Hover =====
  { id: "hover-lift", name: "Подъём", category: "hover", trigger: "hover",
    css: `transition:transform .3s ${EASE},box-shadow .3s ${EASE};&:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.1)}`, },
  { id: "hover-scale", name: "Увеличение", category: "hover", trigger: "hover",
    css: `transition:transform .25s ${EASE};&:hover{transform:scale(1.04)}`, },
  { id: "hover-tilt", name: "Наклон", category: "hover", trigger: "hover",
    css: `transition:transform .3s ${EASE};&:hover{transform:rotate(-2deg) scale(1.02)}`, },
  { id: "hover-border", name: "Рамка", category: "hover", trigger: "hover",
    css: `transition:outline-color .25s ease,outline-offset .25s ${EASE};outline:2px solid transparent;outline-offset:2px;&:hover{outline-color:var(--color-accent,#c4613a);outline-offset:5px}`, },
  { id: "hover-underline", name: "Подчёркивание", category: "hover", trigger: "hover",
    css: `background-image:linear-gradient(currentColor,currentColor);background-size:0% 1.5px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .35s ${EASE};&:hover{background-size:100% 1.5px}`, },
  { id: "hover-fill", name: "Заливка", category: "hover", trigger: "hover",
    css: `transition:background-color .3s ${EASE},color .3s ${EASE};&:hover{background-color:var(--color-accent,#c4613a);color:#fff}`, },

  // ===== Loop (постоянные) =====
  { id: "pulse", name: "Пульсация", category: "loop", trigger: "always",
    css: "animation:sb-pulse 2.4s ease infinite", },
  { id: "float", name: "Парение", category: "loop", trigger: "always",
    css: "animation:sb-float 4s ease-in-out infinite", },
  { id: "breathe", name: "Дыхание", category: "loop", trigger: "always",
    css: "animation:sb-breathe 5s ease-in-out infinite", },
];

export const animationKeyframes = `
@keyframes sb-pulse { 0%,100%{opacity:1} 50%{opacity:.55} }
@keyframes sb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes sb-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
`;

export const animationCategories = [
  { id: "entrance", label: "Появление" },
  { id: "hover", label: "Hover" },
  { id: "loop", label: "Петля" },
];
