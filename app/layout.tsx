import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Creatly — AI-конструктор сайтов", template: "%s | Creatly" },
  description: "Создавайте профессиональные сайты с помощью AI за 2 минуты. Конструктор нового поколения.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
