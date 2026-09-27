import type { Metadata } from "next";
// Главная — сама фильм и витрина: рил на Reel v2 + scene-kit (актёр, атмосфера, плиты миров), порталы в витрины.
// v1 остаётся в components/landing как запасной вариант.
// Срок в копи и meta один и правдивый: «первый сайт — меньше чем за час» (медиа-конвейер генерации — десятки минут).
import { LandingClient } from "@/components/landing-3/LandingClient";

export const metadata: Metadata = {
  title: "Creatly — Создание сайтов с AI | Конструктор сайтов под ключ",
  description: "Опишите бизнес в паре фраз — AI поставит сайт как фильм: мир, свет, склейки, тексты. Первый сайт — меньше чем за час. Заявки в Telegram, бесплатный старт.",
  keywords: [
    "конструктор сайтов", "создание сайтов", "AI конструктор", "сайт под ключ",
    "создать сайт бесплатно", "лендинг пейдж", "генератор сайтов",
    "конструктор сайтов с искусственным интеллектом", "сайт для бизнеса",
    "альтернатива Tilda", "creatly", "no-code", "визуальный редактор",
  ],
  authors: [{ name: "Creatly" }],
  creator: "Creatly",
  publisher: "Creatly",
  metadataBase: new URL("https://creatly.ru"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://creatly.ru",
    siteName: "Creatly",
    title: "Creatly — сайты, которые листают как кино",
    description: "Опишите бизнес голосом или текстом — AI поставит сайт как фильм меньше чем за час. Правка прямо на странице, заявки в Telegram, публикация в один клик.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Creatly — AI-конструктор сайтов" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatly — сайты, которые листают как кино",
    description: "Опишите бизнес — AI поставит сайт как фильм меньше чем за час. Правка прямо на странице, заявки в Telegram.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" as const },
  },
  verification: { yandex: "aea8ffac3c591d3d" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Creatly",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  url: "https://creatly.ru",
  description: "AI-конструктор сайтов. Опишите бизнес — AI поставит сайт как фильм; первый сайт — меньше чем за час.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "RUB",
    description: "Бесплатный план",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
  },
};

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingClient />
    </>
  );
}
