/**
 * Цикл самопроверки — «глаза» генерации.
 *
 * Секрет референс-уровня («Can you believe Claude did this») не в первом
 * промпте, а в итерациях: модель СМОТРИТ на результат и правит. Здесь тот же
 * цикл, автоматом: рендер страницы → headless-скриншоты (десктоп+мобилка,
 * несколько точек скролла) → vision-критика арт-директором → правки
 * операциями над документом → повторный взгляд. 2 раунда по умолчанию.
 *
 * Правки выражаются ТОЛЬКО ops-словарём документа — тем же, что у копайлота
 * и редактора: всё, что исправил цикл, пользователь потом может доредактировать
 * руками. Никакой магии вне модели документа.
 */

import type { ArtDirectionBrief } from "./art-direction";
import { extractJson } from "@/lib/site/catalog";
import { applyOps, type SiteOp } from "@/lib/site/ops";
import { renderPublishHtml } from "@/lib/site/render";
import type { SiteDocument } from "@/lib/site/types";
import { hasPlaywright, screenshotHtml, type PageShot } from "@/lib/media/screenshot";

export interface ReviewDeps {
  /** Vision-вызов с НЕСКОЛЬКИМИ изображениями. */
  callVisionMulti: (system: string, user: string, images: { data: string; mime: string; label: string }[]) => Promise<string>;
  progress?: (round: number, note: string) => void;
}

export interface ReviewReport {
  round: number;
  score: number;
  issues: string[];
  applied: number;
}

/** Компактный контур документа: модель ссылается на реальные id. */
export function docOutline(doc: SiteDocument): string {
  const page = doc.pages[0];
  const lines: string[] = [];
  page.blocks.forEach((b, i) => {
    const head = Object.entries(b.fields)
      .filter(([, v]) => typeof v === "string" && !v.startsWith("/") && !v.startsWith("http"))
      .slice(0, 2)
      .map(([k, v]) => `${k}="${String(v).slice(0, 40)}"`)
      .join(" ");
    lines.push(`${i}. blockId=${b.id} preset=${b.presetId}${b.variantId ? ` variant=${b.variantId}` : ""}${b.enter ? ` enter=${b.enter}` : ""}${b.surface ? ` surface=${b.surface}` : ""} ${head}`);
    for (const [collName, items] of Object.entries(b.collections || {})) {
      items.forEach((it, j) => {
        const first = Object.entries(it.fields).find(([, v]) => v && !String(v).startsWith("/") && !String(v).startsWith("http"));
        lines.push(`   item ${j}: itemId=${it.id} (${collName}) ${first ? `${first[0]}="${String(first[1]).slice(0, 36)}"` : ""}`);
      });
    }
  });
  return lines.join("\n");
}

/** Словарь операций, доступных ревью (подмножество ops документа). */
const REVIEW_OPS_REFERENCE = `- {"op":"update-fields","blockId":"...","fields":{"имя-поля":"новый текст"}} — поправить текст блока
- {"op":"update-item","blockId":"...","itemId":"...","fields":{...}} — поправить элемент коллекции (у story-chapters-01 поле "chp-comp" — композиция главы, см. словарь ниже)
- {"op":"set-variant","blockId":"...","variantId":"..."} — сменить вариант блока
- {"op":"set-block-enter","blockId":"...","enter":"none|fade|slide-left|slide-right|rise|fall|zoom-in|zoom-through|rotate"} — переход появления
- {"op":"set-block-surface","blockId":"...","surface":"solid|transparent|veil","sceneTint":"#hex или null"} — поверхность над сценой
- {"op":"set-style","blockId":"...","field":"имя-data-field или пропусти для корня","props":{"css-свойство":"значение"}} — точечный стиль
- {"op":"move-block","blockId":"...","toIndex":N} — переставить секцию
- {"op":"remove-block","blockId":"..."} — удалить лишнюю секцию
- {"op":"set-tokens","tokens":{"--color-accent":"#hex",...}} — поправить палитру
Словарь chp-comp (композиция главы): "word=<pos>,<size>; a=<pos>,<scale>,<rot>; b=...; c=..."
  pos: lb|lt|rb|rt|c|cb|ct (лево/право/центр × низ/верх), size: xl|xxl|mega, scale: 0.6-1.6, rot: -15..15
  пример: "word=c,mega; a=lb,1.3,-8; b=rt,0.8,6"`;

export function buildReviewPrompt(ad: ArtDirectionBrief, outline: string, shots: PageShot[]): string {
  return `Ты — беспощадный арт-директор премиум-студии. Ревью сгенерированного сайта по скриншотам.

## Утверждённая концепция
${ad.concept}
Настроение: ${ad.mood}. Signature: ${ad.signatureElement}

## Структура документа (реальные id для правок)
${outline}

## Скриншоты (по порядку)
${shots.map((s, i) => `${i + 1}. ${s.label}`).join("\n")}

## Что проверять (по убыванию важности)
1. Читаемость: текст не тонет в фоне, контраст достаточный, слова глав не сливаются с кадром
2. Целостность: пустые/сломанные секции, дыры, обрезанный контент, уехавшие элементы
3. Ритм и драматургия: секции не повторяют друг друга по виду, есть контраст светлого/тёмного, композиции глав РАЗНЫЕ (chp-comp)
4. Палитра: цвета из одного мира с кадрами, акцент работает
5. Мобилка: ничего не разваливается
Не придирайся к мелочам ради придирок: если сайт хорош — скажи это.

## Доступные правки (ops)
${REVIEW_OPS_REFERENCE}

Ответ — СТРОГО JSON:
{"score": 1-10, "issues": ["краткая формулировка проблемы", ...], "ops": [{...}, {...}]}
score >= 8.5 и пустой ops = сайт готов. Максимум 12 ops, только реальные blockId/itemId из структуры.`;
}

const ALLOWED_OPS = new Set([
  "update-fields", "update-item", "set-variant", "set-block-enter",
  "set-block-surface", "set-style", "move-block", "remove-block", "set-tokens",
]);

export interface ParsedReview {
  score: number;
  issues: string[];
  ops: SiteOp[];
}

export function parseReview(response: string): ParsedReview | null {
  const parsed = extractJson<{ score?: unknown; issues?: unknown; ops?: unknown }>(response);
  if (!parsed) return null;
  const score = typeof parsed.score === "number" ? Math.min(10, Math.max(0, parsed.score)) : 5;
  const issues = Array.isArray(parsed.issues) ? parsed.issues.filter((s): s is string => typeof s === "string").slice(0, 12) : [];
  const ops = (Array.isArray(parsed.ops) ? parsed.ops : [])
    .filter((o): o is SiteOp => !!o && typeof o === "object" && ALLOWED_OPS.has((o as { op?: string }).op || ""))
    .slice(0, 12);
  return { score, issues, ops };
}

export interface ReviewOptions {
  rounds?: number;
  baseUrl?: string;
  /** Порог «готово» — выше него правки не запрашиваются. */
  passScore?: number;
}

export async function runReviewLoop(
  doc: SiteDocument,
  ad: ArtDirectionBrief,
  deps: ReviewDeps,
  opts: ReviewOptions = {},
): Promise<{ doc: SiteDocument; reports: ReviewReport[] }> {
  const rounds = opts.rounds ?? 2;
  const baseUrl = opts.baseUrl || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const passScore = opts.passScore ?? 8.5;
  const reports: ReviewReport[] = [];
  if (!(await hasPlaywright())) return { doc, reports };

  let current = doc;
  for (let round = 1; round <= rounds; round++) {
    deps.progress?.(round, "смотрю на страницу");
    const { html } = renderPublishHtml(current, current.pages[0].id, { inline: true });
    let shots: PageShot[];
    try {
      shots = await screenshotHtml(html, baseUrl);
    } catch (err) {
      console.error("[review] скриншоты не удались:", err);
      break;
    }
    if (!shots.length) break;

    deps.progress?.(round, "критикую");
    const raw = await deps.callVisionMulti(
      "Ты — арт-директор на ревью. Отвечай только валидным JSON.",
      buildReviewPrompt(ad, docOutline(current), shots),
      shots.map((s) => ({ data: s.base64, mime: "image/jpeg", label: s.label })),
    );
    const review = parseReview(raw);
    if (!review) break;

    let applied = 0;
    if (review.ops.length) {
      const result = applyOps(current, review.ops);
      current = result.doc;
      applied = review.ops.length - result.errors.length;
      if (result.errors.length) console.warn(`[review] раунд ${round}: ${result.errors.length} ops отклонено:`, result.errors.slice(0, 3));
    }
    reports.push({ round, score: review.score, issues: review.issues, applied });
    console.log(`[review] раунд ${round}: score ${review.score}, правок ${applied}, проблемы: ${review.issues.slice(0, 4).join(" | ")}`);
    if (review.score >= passScore || !review.ops.length) break;
  }
  return { doc: current, reports };
}
