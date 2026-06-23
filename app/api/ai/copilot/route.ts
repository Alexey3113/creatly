import { NextResponse } from "next/server";
import { parseGeneratedCode } from "@/lib/ai/prompts";
import { getSession } from "@/lib/auth/session";
import { aiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const clientId = getClientId(request, session.userId);
  const rl = aiLimiter.check(clientId, LIMITS.AI_COPILOT.limit, LIMITS.AI_COPILOT.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "OPENAI_API_KEY не настроен. Добавьте ключ в .env.local" }, { status: 200 });
  }

  const { message, context } = await request.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      messages: [
        {
          role: "system",
          content: `Ты — AI co-pilot для конструктора сайтов. Пользователь описывает что хочет изменить на сайте.

Текущий HTML/CSS сайта (краткое описание):
${(context || "").slice(0, 4000)}

Если пользователь просит изменение дизайна/контента — верни JSON:
{"message": "краткое описание что сделал", "css": "новые CSS правила", "html": "новый HTML если нужен"}

Если это вопрос — верни:
{"message": "ответ"}

Отвечай ТОЛЬКО валидным JSON. Язык = язык пользователя.`,
        },
        { role: "user", content: message },
      ],
      max_tokens: 2000,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Ошибка AI. Попробуйте ещё раз." });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ message: content });
  }
}
