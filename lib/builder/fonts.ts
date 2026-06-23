export interface FontOption {
  family: string;
  category: string;
}

export const popularFonts: FontOption[] = [
  { family: "Inter", category: "sans-serif" },
  { family: "Roboto", category: "sans-serif" },
  { family: "Open Sans", category: "sans-serif" },
  { family: "Montserrat", category: "sans-serif" },
  { family: "Poppins", category: "sans-serif" },
  { family: "Raleway", category: "sans-serif" },
  { family: "Nunito", category: "sans-serif" },
  { family: "Manrope", category: "sans-serif" },
  { family: "Space Grotesk", category: "sans-serif" },
  { family: "DM Sans", category: "sans-serif" },
  { family: "Plus Jakarta Sans", category: "sans-serif" },
  { family: "Playfair Display", category: "serif" },
  { family: "Merriweather", category: "serif" },
  { family: "Lora", category: "serif" },
  { family: "Cormorant Garamond", category: "serif" },
  { family: "Noto Serif", category: "serif" },
  { family: "JetBrains Mono", category: "monospace" },
  { family: "Fira Code", category: "monospace" },
  { family: "Source Code Pro", category: "monospace" },
  { family: "Unbounded", category: "display" },
  { family: "Bebas Neue", category: "display" },
  { family: "Oswald", category: "sans-serif" },
  { family: "Comfortaa", category: "display" },
  { family: "Pacifico", category: "handwriting" },
  { family: "Caveat", category: "handwriting" },
];

export function googleFontsUrl(families: string[]): string {
  const params = families.map((f) => `family=${f.replace(/ /g, "+")}`).join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
