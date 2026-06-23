import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { hashPassword, validateEmail, validatePassword } from "@/lib/auth/password";

const ALLOWED_EMAILS = (process.env.ALLOWED_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

export async function POST(request: Request) {
  const { email, password, firstName } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }

  if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(email.toLowerCase())) {
    return NextResponse.json({ error: "__ACCESS_RESTRICTED__" }, { status: 403 });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ error: passwordError }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Этот email уже зарегистрирован" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPassword(password),
      firstName: firstName || undefined,
    },
  });

  const session = await getSession();
  session.userId = user.id;
  session.username = user.email || undefined;
  session.firstName = user.firstName || undefined;
  await session.save();

  return NextResponse.json({
    user: { id: user.id, username: user.email, firstName: user.firstName },
  });
}
