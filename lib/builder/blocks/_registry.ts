import type { BlockPreset } from "./_types";
import * as hero from "./hero";
import * as features from "./features";
import * as pricing from "./pricing";
import * as testimonials from "./testimonials";
import * as faq from "./faq";
import * as cta from "./cta";
import * as steps from "./steps";
import * as contact from "./contact";
import * as footer from "./footer";
import * as gallery from "./gallery";
import * as team from "./team";
import * as comparison from "./comparison";
import * as caseStudies from "./case-studies";
import * as productShowcase from "./product-showcase";
import * as blog from "./blog";
import * as portfolio from "./portfolio";
import * as story from "./story";
import * as header from "./header";

export const blockPresets: BlockPreset[] = [
  ...Object.values(header),
  ...Object.values(hero),
  ...Object.values(features),
  ...Object.values(pricing),
  ...Object.values(testimonials),
  ...Object.values(faq),
  ...Object.values(cta),
  ...Object.values(steps),
  ...Object.values(contact),
  ...Object.values(footer),
  ...Object.values(gallery),
  ...Object.values(team),
  ...Object.values(comparison),
  ...Object.values(caseStudies),
  ...Object.values(productShowcase),
  ...Object.values(blog),
  ...Object.values(portfolio),
  ...Object.values(story),
];

export const blockIndex = new Map<string, BlockPreset>(
  blockPresets.map((b) => [b.id, b]),
);

export const blockCategories = [
  { id: "all", label: "Все", icon: "⊕" },
  { id: "header", label: "Шапка", icon: "▔" },
  { id: "hero", label: "Hero", icon: "◆" },
  { id: "features", label: "Фичи", icon: "▦" },
  { id: "pricing", label: "Цены", icon: "⊞" },
  { id: "testimonials", label: "Отзывы", icon: "❝" },
  { id: "faq", label: "FAQ", icon: "?" },
  { id: "cta", label: "CTA", icon: "▶" },
  { id: "steps", label: "Процесс", icon: "①" },
  { id: "contact", label: "Контакты", icon: "✉" },
  { id: "footer", label: "Футер", icon: "▬" },
  { id: "gallery", label: "Галерея", icon: "▣" },
  { id: "team", label: "Команда", icon: "♟" },
  { id: "comparison", label: "Сравнение", icon: "⇄" },
  { id: "case-studies", label: "Кейсы", icon: "📊" },
  { id: "product-showcase", label: "Продукт", icon: "◈" },
  { id: "blog", label: "Блог", icon: "✎" },
  { id: "portfolio", label: "Портфолио", icon: "◧" },
  { id: "story", label: "✦ Сторителлинг", icon: "🎬" },
];

export const heroSubcategories = [
  { id: "all", label: "Все" },
  { id: "centered", label: "По центру" },
  { id: "split-left", label: "Текст слева" },
  { id: "split-right", label: "Текст справа" },
  { id: "full-image", label: "Фото-фон" },
  { id: "video-bg", label: "Видео" },
  { id: "bento", label: "Bento" },
  { id: "minimal", label: "Минимал" },
  { id: "cards", label: "Карточки" },
  { id: "stats", label: "Метрики" },
  { id: "gradient-bold", label: "Градиент" },
  { id: "webgl", label: "✦ WebGL" },
  { id: "cinematic", label: "◈ Кино" },
];
