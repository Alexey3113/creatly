import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { aiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { catalogOverview, describeDocument, extractJson } from "@/lib/site/catalog";
import { applyOps, type SiteOp } from "@/lib/site/ops";
import { isSiteDocument, normalizeDocument } from "@/lib/site/create";
import type { SiteDocument } from "@/lib/site/types";

const OPENAI_BASE = "https://api.openai.com/v1";

const OPS_REFERENCE = `Доступные операции (поле "ops" ответа — массив таких объектов):
- {"op":"update-fields","blockId":"...","fields":{"имя-поля":"новый текст"}} — изменить тексты блока (только имена полей, которые есть у блока!)
- {"op":"update-item","blockId":"...","itemId":"...","fields":{...}} — изменить элемент коллекции
- {"op":"add-item","blockId":"...","collection":"имя-коллекции","fields":{...}} — добавить элемент коллекции
- {"op":"remove-item","blockId":"...","itemId":"..."} — удалить элемент коллекции
- {"op":"add-block","presetId":"...","index":N,"fields":{...},"collections":{"имя-коллекции":[{"fields":{...}}]}} — добавить блок из каталога (index — позиция на странице)
- {"op":"remove-block","blockId":"..."} — удалить блок
- {"op":"move-block","blockId":"...","toIndex":N} — переставить блок
- {"op":"set-variant","blockId":"...","variantId":"..."} — сменить цветовой вариант блока
- {"op":"replace-block","blockId":"...","presetId":"...","keepFields":true} — заменить блок другим пресетом
- {"op":"set-tokens","tokens":{"--color-accent":"#hex",...}} — изменить цвета дизайн-системы
- {"op":"set-scene","scene":{"type":"aurora|mesh|field|liquid|none","intensity":0.5,"grain":true}} — живой анимированный фон всего сайта
- {"op":"set-block-surface","blockId":"...","surface":"solid|transparent|veil","sceneTint":"#hex"} — поверхность блока над сценой и тон сцены на нём
- {"op":"set-block-enter","blockId":"...","enter":"fade|slide-left|slide-right|rise|fall|zoom-in|zoom-through|rotate|none"} — как секция появляется при скролле
- {"op":"set-cinema","enabled":true} — режим-фильм: секции перелистываются как полноэкранные слайды
- {"op":"set-fonts","heading":"Имя Google-шрифта","body":"..."} — сменить шрифты
- {"op":"set-seo","seo":{"title":"...","description":"..."}} — SEO страницы`;

const SYSTEM_PROMPT = `Ты — AI-ассистент конструктора сайтов Creatly. Сайт описан структурным документом; ты меняешь его операциями, не кодом.

Отвечай СТРОГО JSON:
{"message": "что сделал, одно-два предложения", "ops": [ ...операции... ]}
Если пользователь просто задал вопрос — {"message": "ответ"} без ops.

Правила:
- blockId / itemId бери ТОЧНО из описания страницы
- presetId для add-block/replace-block бери ТОЛЬКО из каталога
- в update-fields указывай только реально изменяемые поля
- тексты — конкретные, по теме сайта, без placeholder'ов
- поля-image НЕ заполняй своими URL — картинки пользователь загружает сам
- язык контента = язык сайта пользователя

${OPS_REFERENCE}`;

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clientId = getClientId(request, session.userId);
  const rl = aiLimiter.check(clientId, LIMITS.AI_COPILOT.limit, LIMITS.AI_COPILOT.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ message: "OPENAI_API_KEY не настроен." });

  const body = await request.json();
  const { message, document } = body as { message: string; document?: SiteDocument };

  if (!message?.trim()) return NextResponse.json({ error: "message required" }, { status: 400 });
  if (!isSiteDocument(document)) return NextResponse.json({ error: "document required" }, { status: 400 });
  normalizeDocument(document);

  const userPrompt = [
    `## Текущий сайт\n${describeDocument(document)}`,
    `## Каталог блоков (для add-block / replace-block)\n${catalogOverview()}`,
    `## Запрос пользователя\n${message}`,
  ].join("\n\n");

  const model = process.env.OPENAI_MODEL || "gpt-4o";
  const isResponsesAPI = model.startsWith("gpt-5");

  try {
    let rawContent = "";

    if (isResponsesAPI) {
      const res = await fetch(`${OPENAI_BASE}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          input: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: [{ type: "input_text", text: userPrompt }] },
          ],
          stream: false,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      rawContent = data.output_text ?? "";
      if (!rawContent) {
        for (const item of (data.output ?? [])) {
          for (const c of (item?.content ?? [])) {
            if (c?.type === "output_text") { rawContent = c.text; break; }
          }
          if (rawContent) break;
        }
      }
    } else {
      const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.5,
          max_tokens: 4000,
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      rawContent = data.choices?.[0]?.message?.content ?? "";
    }

    const parsed = extractJson<{ message?: string; ops?: SiteOp[] }>(rawContent);
    if (!parsed) return NextResponse.json({ message: rawContent || "Не удалось обработать ответ." });

    // Валидируем операции применением на сервере — клиенту уходит готовый документ
    if (Array.isArray(parsed.ops) && parsed.ops.length) {
      const result = applyOps(document, parsed.ops);
      return NextResponse.json({
        message: parsed.message || "Готово.",
        document: result.doc,
        applied: result.applied,
        errors: result.errors,
      });
    }

    return NextResponse.json({ message: parsed.message || "Готово." });
  } catch (err) {
    console.error("[ai/copilot]", err);
    return NextResponse.json({ message: "Ошибка AI. Попробуйте ещё раз." });
  }
}
