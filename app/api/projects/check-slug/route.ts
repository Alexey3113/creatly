import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

const RESERVED_SLUGS = new Set([
  "www", "app", "api", "admin", "dashboard", "editor", "auth", "login",
  "register", "mail", "email", "ftp", "ssh", "cdn", "static", "assets",
  "blog", "help", "support", "docs", "status", "billing", "account",
  "settings", "creatly", "test", "demo", "staging", "dev", "prod",
]);

export async function GET(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ available: false, reason: "Не указан адрес" });
  }

  if (RESERVED_SLUGS.has(slug)) {
    return NextResponse.json({ available: false, reason: "Этот адрес зарезервирован" });
  }

  if (slug.length < 2) {
    return NextResponse.json({ available: false, reason: "Минимум 2 символа" });
  }

  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) && slug.length > 1) {
    return NextResponse.json({ available: false, reason: "Только латинские буквы, цифры и дефис" });
  }

  const existing = await prisma.project.findFirst({
    where: { slug },
    select: { userId: true },
  });

  if (existing && existing.userId !== session.userId) {
    return NextResponse.json({ available: false, reason: "Этот адрес уже занят" });
  }

  return NextResponse.json({ available: true, domain: `${slug}.creatly.ru` });
}
