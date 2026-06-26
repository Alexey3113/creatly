export interface FontOption {
  family: string;
  category: string;
}

// Курированный список: шрифты с характером — впереди, AI-дефолты (Inter/Roboto/
// Poppins/Montserrat) намеренно убраны или в самом конце, чтобы не толкать к слопу.
export const popularFonts: FontOption[] = [
  // Serif с характером — для заголовков
  { family: "Fraunces", category: "serif" },
  { family: "Playfair Display", category: "serif" },
  { family: "Cormorant Garamond", category: "serif" },
  { family: "DM Serif Display", category: "serif" },
  { family: "Lora", category: "serif" },
  { family: "Spectral", category: "serif" },
  { family: "Libre Baskerville", category: "serif" },
  { family: "Bitter", category: "serif" },
  { family: "Vollkorn", category: "serif" },
  { family: "Crimson Pro", category: "serif" },
  // Гуманистические / геометрические sans — для текста и заголовков
  { family: "Sora", category: "sans-serif" },
  { family: "Outfit", category: "sans-serif" },
  { family: "Commissioner", category: "sans-serif" },
  { family: "Source Sans 3", category: "sans-serif" },
  { family: "Work Sans", category: "sans-serif" },
  { family: "Karla", category: "sans-serif" },
  { family: "Space Grotesk", category: "sans-serif" },
  { family: "Manrope", category: "sans-serif" },
  { family: "Plus Jakarta Sans", category: "sans-serif" },
  { family: "DM Sans", category: "sans-serif" },
  // Display — для крупных экспрессивных заголовков
  { family: "Unbounded", category: "display" },
  { family: "Bebas Neue", category: "display" },
  { family: "Oswald", category: "sans-serif" },
  // Monospace — для метаданных, цифр, метрик
  { family: "JetBrains Mono", category: "monospace" },
  { family: "Space Mono", category: "monospace" },
  // Handwriting — для акцентов
  { family: "Caveat", category: "handwriting" },
];

export function googleFontsUrl(families: string[]): string {
  const params = families.map((f) => `family=${f.replace(/ /g, "+")}`).join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
