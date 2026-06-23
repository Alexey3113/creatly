import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const user = await prisma.user.upsert({
    where: { telegramId: BigInt(999999999) },
    update: {},
    create: {
      telegramId: BigInt(999999999),
      username: "dev_user",
      firstName: "Dev",
    },
  });

  const session = await getSession();
  session.userId = user.id;
  session.telegramId = 999999999;
  session.username = user.username || undefined;
  session.firstName = user.firstName || undefined;
  await session.save();

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
    },
  });
}
