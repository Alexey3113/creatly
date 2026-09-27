import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import OpenAI from "openai";
import { apiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clientId = getClientId(request);
  const rl = apiLimiter.check(clientId, LIMITS.AI_COPILOT.limit, LIMITS.AI_COPILOT.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await request.json();
  const { content, currentTitle, currentDescription } = body as {
    content?: string;
    currentTitle?: string;
    currentDescription?: string;
  };

  if (!content && !currentTitle) {
    return NextResponse.json({ error: "content or currentTitle required" }, { status: 400 });
  }

  const contextBlock = [
    currentTitle && `Текущий title: ${currentTitle}`,
    currentDescription && `Текущий description: ${currentDescription}`,
    content && `Содержимое страницы:\n${content.slice(0, 2000)}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Ты SEO-специалист. На основе контента страницы сгенерируй оптимальные meta title и meta description. " +
            "Title: 50-60 символов, привлекательный, с ключевым словом. " +
            "Description: 120-160 символов, убедительный, с призывом к действию. " +
            'Ответ строго в JSON: { "title": "...", "description": "..." }',
        },
        { role: "user", content: contextBlock },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw) as { title?: string; description?: string };
    return NextResponse.json({
      title: parsed.title || "",
      description: parsed.description || "",
    });
  } catch (err) {
    console.error("[ai/seo]", err);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
