export interface AnimationPreset {
  id: string;
  name: string;
  category: "entrance" | "hover" | "scroll" | "loop";
  css: string;
  trigger: string;
}

export const animationPresets: AnimationPreset[] = [
  // Entrance
  { id: "fade-in", name: "Плавное появление", category: "entrance", trigger: "scroll",
    css: "opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease", },
  { id: "fade-in-up", name: "Снизу вверх", category: "entrance", trigger: "scroll",
    css: "opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease", },
  { id: "fade-in-left", name: "Слева", category: "entrance", trigger: "scroll",
    css: "opacity:0;transform:translateX(-40px);transition:opacity .7s ease,transform .7s ease", },
  { id: "fade-in-right", name: "Справа", category: "entrance", trigger: "scroll",
    css: "opacity:0;transform:translateX(40px);transition:opacity .7s ease,transform .7s ease", },
  { id: "scale-in", name: "Масштабирование", category: "entrance", trigger: "scroll",
    css: "opacity:0;transform:scale(.9);transition:opacity .5s ease,transform .5s ease", },
  { id: "blur-in", name: "Из размытия", category: "entrance", trigger: "scroll",
    css: "opacity:0;filter:blur(8px);transition:opacity .6s ease,filter .6s ease", },

  // Hover
  { id: "hover-lift", name: "Подъём", category: "hover", trigger: "hover",
    css: "transition:transform .25s ease,box-shadow .25s ease;&:hover{transform:translateY(-6px);box-shadow:0 12px 32px rgba(0,0,0,.12)}", },
  { id: "hover-scale", name: "Увеличение", category: "hover", trigger: "hover",
    css: "transition:transform .2s ease;&:hover{transform:scale(1.05)}", },
  { id: "hover-glow", name: "Свечение", category: "hover", trigger: "hover",
    css: "transition:box-shadow .3s ease;&:hover{box-shadow:0 0 24px rgba(99,102,241,.35)}", },
  { id: "hover-border", name: "Рамка", category: "hover", trigger: "hover",
    css: "transition:outline .2s ease;outline:2px solid transparent;outline-offset:4px;&:hover{outline-color:#6366f1}", },

  // Loop
  { id: "pulse", name: "Пульсация", category: "loop", trigger: "always",
    css: "animation:sb-pulse 2s ease infinite", },
  { id: "float", name: "Парение", category: "loop", trigger: "always",
    css: "animation:sb-float 3s ease-in-out infinite", },
];

export const animationKeyframes = `
@keyframes sb-pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
@keyframes sb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
`;

export const animationCategories = [
  { id: "entrance", label: "Появление" },
  { id: "hover", label: "Hover" },
  { id: "loop", label: "Петля" },
];
