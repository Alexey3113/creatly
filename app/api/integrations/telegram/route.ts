import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { sendToTelegram } from "@/lib/integrations/telegram";

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { telegramBotToken: true, telegramChatId: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    botToken: user.telegramBotToken || "",
    chatId: user.telegramChatId || "",
    connected: !!(user.telegramBotToken && user.telegramChatId),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { botToken, chatId, test } = body as {
    botToken: string;
    chatId: string;
    test?: boolean;
  };

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "botToken and chatId are required" },
      { status: 400 },
    );
  }

  // If test mode, just send a test message without saving
  if (test) {
    const ok = await sendToTelegram(
      botToken,
      chatId,
      "Test message from Creatly. Integration works!",
    );
    return NextResponse.json({ ok });
  }

  // Save the settings
  await prisma.user.update({
    where: { id: session.userId },
    data: {
      telegramBotToken: botToken,
      telegramChatId: chatId,
    },
  });

  return NextResponse.json({ ok: true, connected: true });
}
