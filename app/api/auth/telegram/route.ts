import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { validateTelegramLogin } from "@/lib/auth/telegram";

export async function POST(request: Request) {
  const data = await request.json();

  if (!validateTelegramLogin(data)) {
    return NextResponse.json({ error: "Invalid Telegram auth" }, { status: 401 });
  }

  const user = await prisma.user.upsert({
    where: { telegramId: BigInt(data.id) },
    update: {
      username: data.username || undefined,
      firstName: data.first_name || undefined,
      lastName: data.last_name || undefined,
      photoUrl: data.photo_url || undefined,
    },
    create: {
      telegramId: BigInt(data.id),
      username: data.username || `user${data.id}`,
      firstName: data.first_name,
      lastName: data.last_name,
      photoUrl: data.photo_url,
    },
  });

  const session = await getSession();
  session.userId = user.id;
  session.telegramId = data.id;
  session.username = user.username || undefined;
  session.firstName = user.firstName || undefined;
  session.photoUrl = user.photoUrl || undefined;
  await session.save();

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      photoUrl: user.photoUrl,
    },
  });
}
