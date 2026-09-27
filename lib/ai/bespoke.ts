/**
 * Bespoke-слой: Claude пишет УНИКАЛЬНЫЙ код витринной секции (hero) под
 * конкретный бренд — так сделан референс «Can you believe Claude did this».
 *
 * Свобода в песочнице: только классы .cb-*, только наши дизайн-токены
 * (var(--color-*), var(--font-*)), тексты размечены data-field (редактируются
 * пользователем как обычные поля), без скриптов и внешних ресурсов.
 * Невалидный код отклоняется — сайт остаётся с пресетным hero (graceful).
 */

import type { ArtDirectionBrief } from "./art-direction";
import { extractJson } from "@/lib/site/catalog";
import { blockIndex } from "@/lib/builder/blocks/_registry";
import { applyOps } from "@/lib/site/ops";
import type { SiteDocument } from "@/lib/site/types";

export function buildBespokeHeroPrompt(
  ad: ArtDirectionBrief,
  brief: string,
  heroFields: Record<string, string>,
  heroImage: string | null,
): string {
  const texts = Object.entries(heroFields)
    .filter(([, v]) => v && !v.startsWith("/") && !v.startsWith("http"))
    .map(([k, v]) => `- ${k}: "${v}"`)
    .join("\n");

  return `Ты — арт-директор и креативный фронтендер уровня Awwwards. Напиши УНИКАЛЬНУЮ hero-секцию под этот бренд — не шаблон, а авторскую композицию.

## Бриф
${brief.slice(0, 900)}

## Концепция
${ad.concept}
Настроение: ${ad.mood}. Signature-элемент: ${ad.signatureElement}
Язык движения: ${ad.motionLanguage}

## Контент hero (используй ЭТИ тексты)
${texts || "- заголовок и подзаголовок придумай по брифу"}
${heroImage ? `\n## Медиа\nГлавный кадр: ${heroImage} — используй как фон или композиционный элемент (<img> или background-image).` : ""}

## Жёсткие правила песочницы
1. Корень — ровно один <section class="cb-hero"> (все классы ТОЛЬКО с префиксом cb-)
2. Цвета — ТОЛЬКО через var(--color-bg|bg-alt|surface|text|text-muted|primary|accent|border), шрифты — var(--font-heading|--font-body). Никаких своих хексов, кроме rgba(0,0,0,x)/rgba(255,255,255,x) для скримов
3. Каждый видимый текст — в элементе с data-field="cb-..." (уникальные имена: cb-title, cb-sub, cb-cta…), чтобы пользователь мог редактировать. Кнопка — <a data-field="cb-cta" href="#contact">
4. БЕЗ <script>, iframe, внешних url в css (@import запрещён). Анимации — чистый CSS (@keyframes cb-*)
5. Адаптив обязателен: @media (max-width:819px) — всё читаемо на мобильном
6. ВАЖНО: поверх секции лежит fixed-прозрачный хедер сайта (логотип слева, меню и CTA справа, высота ~72px). Верхние 110px секции держи СВОБОДНЫМИ от текста и мелких элементов (padding-top), иначе будет каша. На мобильном — тем более
7. Высота секции ~100svh, композиция СМЕЛАЯ: асимметрия, перекрытия, гигантская типографика (clamp), слои. Никаких «текст слева — картинка справа» из шаблонов
8. Объём: html ≤ 60 строк, css ≤ 120 строк

Ответ — СТРОГО JSON: {"html": "<section class=\\"cb-hero\\">…</section>", "css": ".cb-hero{…}"}`;
}

export function parseBespoke(response: string): { html: string; css: string } | null {
  const parsed = extractJson<{ html?: unknown; css?: unknown }>(response);
  if (!parsed || typeof parsed.html !== "string" || typeof parsed.css !== "string") return null;
  if (!parsed.html.trim() || !parsed.css.trim()) return null;
  return { html: parsed.html, css: parsed.css };
}

/**
 * Генерирует bespoke-hero и подменяет им пресетный hero-блок документа.
 * Вся валидация — внутри ops (санитайзер html + css-гейт): невалидный код
 * не проходит, документ остаётся с пресетным hero.
 */
export async function applyBespokeHero(
  doc: SiteDocument,
  ad: ArtDirectionBrief,
  brief: string,
  callText: (system: string, user: string) => Promise<string>,
): Promise<{ doc: SiteDocument; applied: boolean }> {
  const page = doc.pages[0];
  const heroIdx = page.blocks.findIndex((b) => blockIndex.get(b.presetId)?.category === "hero");
  if (heroIdx === -1) return { doc, applied: false };
  const hero = page.blocks[heroIdx];
  const heroImage = Object.entries(hero.fields).find(([k, v]) =>
    /image|media|photo|bg/.test(k) && typeof v === "string" && (v.startsWith("/uploads/") || v.startsWith("/assets/")))?.[1] || null;

  try {
    const raw = await callText(
      "Ты — креативный фронтендер премиум-студии. Отвечай только валидным JSON.",
      buildBespokeHeroPrompt(ad, brief, hero.fields, heroImage),
    );
    const bespoke = parseBespoke(raw);
    if (!bespoke) return { doc, applied: false };

    const result = applyOps(doc, [
      { op: "add-custom-block", index: heroIdx, html: bespoke.html, css: bespoke.css },
      { op: "remove-block", blockId: hero.id },
    ]);
    if (result.errors.length) {
      console.warn("[bespoke] hero отклонён:", result.errors.join("; "));
      return { doc, applied: false };
    }
    return { doc: result.doc, applied: true };
  } catch (err) {
    console.error("[bespoke] генерация hero не удалась:", err);
    return { doc, applied: false };
  }
}
