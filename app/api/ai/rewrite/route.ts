import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import OpenAI from "openai";
import { apiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

// клиент — по запросу: без OPENAI_API_KEY сборка не падает на «Collecting page data», запрос получает «AI error»
let client: OpenAI | null = null;
const openai = () => (client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

const ACTIONS: Record<string, string> = {
  shorten: "Сократи текст в 2 раза. Оставь главную мысль, убери лишнее.",
  expand: "Расширь текст в 1.5-2 раза. Добавь конкретики, не воды.",
  b2b: "Перепиши в B2B-стиле. Фокус на ROI, эффективности, экспертности.",
  b2c: "Перепиши в B2C-стиле. Тепло, выгода для человека, эмоции.",
  formal: "Сделай текст более официальным и деловым.",
  casual: "Сделай текст живым и разговорным, без канцелярщины.",
  cta: "Перепиши как призыв к действию. Конкретный, убедительный, с глаголом.",
  en: "Переведи на английский язык. Сохрани смысл и тон.",
  fix: "Исправь грамматику и пунктуацию. Не меняй смысл.",
};

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clientId = getClientId(request);
  const rl = apiLimiter.check(clientId, LIMITS.AI_COPILOT.limit, LIMITS.AI_COPILOT.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await request.json();
  const { text, action } = body as { text: string; action: string };

  if (!text?.trim() || !action) return NextResponse.json({ error: "text and action required" }, { status: 400 });

  const instruction = ACTIONS[action];
  if (!instruction) return NextResponse.json({ error: "Unknown action" }, { status: 400 });

  try {
    const completion = await openai().chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "Ты редактор текста для сайтов. Отвечай ТОЛЬКО переписанным текстом, без объяснений и пометок." },
        { role: "user", content: `${instruction}\n\nТекст:\n${text}` },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });
    const result = completion.choices[0]?.message?.content?.trim() || "";
    return NextResponse.json({ text: result });
  } catch (err) {
    console.error("[ai/rewrite]", err);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
