import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { validateTelegramMiniApp } from "@/lib/auth/telegram";

export async function POST(request: Request) {
  const { initData } = await request.json();

  const result = validateTelegramMiniApp(initData);
  if (!result.valid || !result.user) {
    return NextResponse.json({ error: "Invalid Mini App auth" }, { status: 401 });
  }

  const data = result.user;
  const user = await prisma.user.upsert({
    where: { telegramId: BigInt(data.id) },
    update: {
      username: data.username || undefined,
      firstName: data.first_name || undefined,
    },
    create: {
      telegramId: BigInt(data.id),
      username: data.username || `user${data.id}`,
      firstName: data.first_name,
      lastName: data.last_name,
    },
  });

  const session = await getSession();
  session.userId = user.id;
  session.telegramId = data.id;
  session.username = user.username || undefined;
  session.firstName = user.firstName || undefined;
  await session.save();

  return NextResponse.json({
    user: { id: user.id, username: user.username, firstName: user.firstName },
  });
}
