import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Creatly — AI-конструктор сайтов", template: "%s | Creatly" },
  description: "Создавайте профессиональные сайты с помощью AI за 2 минуты. Конструктор нового поколения.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
