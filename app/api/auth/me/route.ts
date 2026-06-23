import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: {
      id: session.userId,
      telegramId: session.telegramId,
      username: session.username,
      firstName: session.firstName,
      photoUrl: session.photoUrl,
    },
  });
}
