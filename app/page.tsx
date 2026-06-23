import type { Metadata } from "next";
import { LandingClient } from "@/components/landing/LandingClient";

export const metadata: Metadata = {
  title: "Creatly — Создание сайтов с AI | Конструктор сайтов под ключ",
  description: "Расскажите о бизнесе — получите профессиональный сайт за 2 минуты. AI-генерация, inline-редактирование, заявки в Telegram. Бесплатный старт.",
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
    title: "Creatly — Создание сайтов с AI за 2 минуты",
    description: "Опишите бизнес голосом или текстом — AI создаст профессиональный сайт. Inline-редактирование, заявки в Telegram, публикация в один клик.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Creatly — AI-конструктор сайтов" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatly — Создание сайтов с AI за 2 минуты",
    description: "Опишите бизнес — получите сайт. AI-генерация, inline-редактирование, заявки в Telegram.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" as const },
  },
  verification: {},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Creatly",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  url: "https://creatly.ru",
  description: "AI-конструктор сайтов. Расскажите о бизнесе — получите профессиональный сайт за 2 минуты.",
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
