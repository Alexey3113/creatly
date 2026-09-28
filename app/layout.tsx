import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Creatly — AI-конструктор сайтов", template: "%s | Creatly" },
  description: "Сайты, которые листают как кино: AI собирает сюжет, сцены и переходы — первый сайт меньше чем за час.",
  metadataBase: new URL("https://creatly.ru"),
  icons: {
    icon: [
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-96.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// WebKit (Safari и все браузеры iOS) считает CSS/SVG-фильтры на CPU: сайты упрощают там дорогие украшения через
// [data-engine="webkit"]. Метка ставится до первой отрисовки (та же проверка — components/scene-kit/engine.ts).
const ENGINE_JS = `(function(){var u=navigator.userAgent;if(/AppleWebKit/.test(u)&&(!/Chrome|Chromium|Edg|OPR/.test(u)||/CriOS|FxiOS|EdgiOS/.test(u)))document.documentElement.setAttribute("data-engine","webkit")})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ENGINE_JS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
