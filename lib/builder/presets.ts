export interface ColorPalette {
  id: string;
  name: string;
  colors: { primary: string; secondary: string; accent: string; bg: string; text: string };
}

export interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
  preview: string;
}

export const siteTypes = [
  { id: "landing", label: "Лендинг", desc: "Одностраничный сайт с призывом к действию", icon: "◆" },
  { id: "portfolio", label: "Портфолио", desc: "Покажите свои работы и навыки", icon: "◧" },
  { id: "business", label: "Бизнес", desc: "Корпоративный сайт компании", icon: "▦" },
  { id: "restaurant", label: "Ресторан", desc: "Меню, атмосфера, бронирование", icon: "◉" },
  { id: "saas", label: "SaaS продукт", desc: "Фичи, тарифы, регистрация", icon: "⬡" },
  { id: "event", label: "Мероприятие", desc: "Конференция, концерт, вечеринка", icon: "★" },
];

export const colorPalettes: ColorPalette[] = [
  { id: "obsidian", name: "Obsidian", colors: { primary: "#1a1f36", secondary: "#2d3452", accent: "#d4a853", bg: "#0d0f18", text: "#e8e6e1" } },
  { id: "terracotta", name: "Terracotta", colors: { primary: "#c4613a", secondary: "#a84e2e", accent: "#2c1810", bg: "#f5f0e8", text: "#2c1810" } },
  { id: "sage", name: "Sage", colors: { primary: "#2d4a3e", secondary: "#3d6454", accent: "#e8a598", bg: "#e8ede5", text: "#1a2e24" } },
  { id: "charcoal", name: "Charcoal", colors: { primary: "#1c1c1e", secondary: "#2c2c2e", accent: "#b4f461", bg: "#f2f2f7", text: "#1c1c1e" } },
  { id: "ink", name: "Ink", colors: { primary: "#0a0a0a", secondary: "#1a1a1a", accent: "#ff4d00", bg: "#faf9f7", text: "#1a1a1a" } },
  { id: "dusk", name: "Dusk", colors: { primary: "#334155", secondary: "#475569", accent: "#e11d48", bg: "#fff8f0", text: "#1e293b" } },
  { id: "studio", name: "Studio", colors: { primary: "#000000", secondary: "#171717", accent: "#ffffff", bg: "#000000", text: "#ffffff" } },
  { id: "clay", name: "Clay", colors: { primary: "#8b5e3c", secondary: "#6b4226", accent: "#c9a87c", bg: "#f7f3ee", text: "#2d1f14" } },
  { id: "arctic", name: "Arctic", colors: { primary: "#0f2e4a", secondary: "#1a4268", accent: "#3ecf8e", bg: "#f8f9fb", text: "#0f2e4a" } },
  { id: "warmth", name: "Warmth", colors: { primary: "#b45309", secondary: "#d97706", accent: "#1e3a5f", bg: "#fffbf5", text: "#3d1f00" } },
];

export const fontPairs: FontPair[] = [
  { id: "editorial", name: "Редакционный", heading: "Playfair Display", body: "Source Sans 3", preview: "Aa" },
  { id: "refined", name: "Утончённый", heading: "Cormorant Garamond", body: "Outfit", preview: "Aa" },
  { id: "warm", name: "Тёплый", heading: "Fraunces", body: "Commissioner", preview: "Aa" },
  { id: "contrast", name: "Контрастный", heading: "DM Serif Display", body: "DM Sans", preview: "Aa" },
  { id: "bold", name: "Дерзкий", heading: "Bebas Neue", body: "Barlow", preview: "Aa" },
  { id: "classic", name: "Классический", heading: "Lora", body: "Karla", preview: "Aa" },
  { id: "tech", name: "Технологичный", heading: "Sora", body: "Libre Baskerville", preview: "Aa" },
  { id: "expressive", name: "Экспрессивный", heading: "Unbounded", body: "Manrope", preview: "Aa" },
];
