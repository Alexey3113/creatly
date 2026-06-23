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
  { id: "midnight", name: "Midnight", colors: { primary: "#6366f1", secondary: "#818cf8", accent: "#c084fc", bg: "#0f172a", text: "#e2e8f0" } },
  { id: "ocean", name: "Ocean", colors: { primary: "#0ea5e9", secondary: "#38bdf8", accent: "#06b6d4", bg: "#0c4a6e", text: "#e0f2fe" } },
  { id: "forest", name: "Forest", colors: { primary: "#10b981", secondary: "#34d399", accent: "#a3e635", bg: "#064e3b", text: "#d1fae5" } },
  { id: "sunset", name: "Sunset", colors: { primary: "#f97316", secondary: "#fb923c", accent: "#fbbf24", bg: "#431407", text: "#fed7aa" } },
  { id: "rose", name: "Rose", colors: { primary: "#f43f5e", secondary: "#fb7185", accent: "#e879f9", bg: "#4c0519", text: "#fecdd3" } },
  { id: "clean", name: "Clean", colors: { primary: "#2563eb", secondary: "#3b82f6", accent: "#6366f1", bg: "#ffffff", text: "#1e293b" } },
  { id: "warm", name: "Warm", colors: { primary: "#d97706", secondary: "#f59e0b", accent: "#ef4444", bg: "#fffbeb", text: "#451a03" } },
  { id: "mono", name: "Mono", colors: { primary: "#18181b", secondary: "#3f3f46", accent: "#a1a1aa", bg: "#fafafa", text: "#18181b" } },
  { id: "neon", name: "Neon", colors: { primary: "#22d3ee", secondary: "#a855f7", accent: "#f0abfc", bg: "#020617", text: "#f8fafc" } },
  { id: "earth", name: "Earth", colors: { primary: "#92400e", secondary: "#a16207", accent: "#65a30d", bg: "#fef3c7", text: "#422006" } },
];

export const fontPairs: FontPair[] = [
  { id: "inter", name: "Современный", heading: "Inter", body: "Inter", preview: "Aa" },
  { id: "space", name: "Технологичный", heading: "Space Grotesk", body: "DM Sans", preview: "Aa" },
  { id: "playfair", name: "Элегантный", heading: "Playfair Display", body: "Lora", preview: "Aa" },
  { id: "montserrat", name: "Чёткий", heading: "Montserrat", body: "Open Sans", preview: "Aa" },
  { id: "bebas", name: "Смелый", heading: "Bebas Neue", body: "Roboto", preview: "Aa" },
  { id: "poppins", name: "Дружелюбный", heading: "Poppins", body: "Nunito", preview: "Aa" },
  { id: "cormorant", name: "Премиум", heading: "Cormorant Garamond", body: "Raleway", preview: "Aa" },
  { id: "unbounded", name: "Экспрессивный", heading: "Unbounded", body: "Manrope", preview: "Aa" },
];
