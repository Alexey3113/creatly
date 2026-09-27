import type { ArtDirectionBrief } from "@/lib/ai/art-direction";

// Нейтральный «студийный» дефолт: холодная галерейная база + кобальт.
// Шрифты обязаны иметь полную кириллицу (см. CYRILLIC_FONTS в art-direction).
export const TOKEN_DEFAULTS: Record<string, string> = {
  "--color-bg": "#f6f6f3",
  "--color-bg-alt": "#ebebe6",
  "--color-surface": "#ffffff",
  "--color-text": "#131316",
  "--color-text-muted": "#66666e",
  "--color-primary": "#15151a",
  "--color-accent": "#2f54eb",
  "--color-border": "#e2e2dc",
  "--color-text-on-primary": "#ffffff",
  "--color-text-on-accent": "#ffffff",
  "--font-heading": "'Manrope', sans-serif",
  "--font-body": "'Onest', sans-serif",
  "--container-width": "1400px",
  "--space-section": "clamp(60px, 8vw, 120px)",
  "--space-block": "clamp(24px, 4vw, 60px)",
  "--radius-sm": "8px",
  "--radius-md": "14px",
  "--radius-lg": "22px",
  "--radius-full": "9999px",
};

const SERIF_FONTS = new Set(["Playfair Display", "Prata", "Literata", "Lora", "Vollkorn", "Bitter", "Cormorant Garamond", "PT Serif", "Alegreya", "Spectral", "Noto Serif"]);
export const genericFamily = (font: string) => (SERIF_FONTS.has(font) ? "serif" : "sans-serif");

export function tokensFromArtDirection(ad: ArtDirectionBrief): Record<string, string> {
  return {
    "--color-bg": ad.palette.bg,
    "--color-bg-alt": ad.palette.bgAlt,
    "--color-surface": ad.palette.surface,
    "--color-text": ad.palette.text,
    "--color-text-muted": ad.palette.textMuted,
    "--color-primary": ad.palette.primary,
    "--color-accent": ad.palette.accent,
    "--color-border": ad.palette.border,
    "--color-text-on-primary": "#ffffff",
    "--color-text-on-accent": "#ffffff",
    "--font-heading": `'${ad.typography.heading}', ${genericFamily(ad.typography.heading)}`,
    "--font-body": `'${ad.typography.body}', ${genericFamily(ad.typography.body)}`,
    "--container-width": "1400px",
    "--space-section": "clamp(60px, 8vw, 120px)",
    "--space-block": "clamp(24px, 4vw, 60px)",
    "--radius-sm": "8px",
    "--radius-md": "14px",
    "--radius-lg": "22px",
    "--radius-full": "9999px",
  };
}

export function tokensToCss(tokens: Record<string, string>): string {
  const lines = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`);
  return `:root {\n${lines.join("\n")}\n}`;
}
