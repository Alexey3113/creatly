import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

function extractText(html: string): {
  title: string;
  description: string;
  headings: string[];
  paragraphs: string[];
  contacts: string[];
} {
  const strip = (s: string) => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? strip(titleMatch[1]) : "";

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : "";

  const headings: string[] = [];
  const headingRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  let m;
  while ((m = headingRe.exec(html)) !== null && headings.length < 30) {
    const text = strip(m[1]);
    if (text.length > 2 && text.length < 300) headings.push(text);
  }

  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");

  const paragraphs: string[] = [];
  const pRe = /<(?:p|li|td|dd|blockquote)[^>]*>([\s\S]*?)<\/(?:p|li|td|dd|blockquote)>/gi;
  while ((m = pRe.exec(cleaned)) !== null && paragraphs.length < 40) {
    const text = strip(m[1]);
    if (text.length > 20 && text.length < 1000) paragraphs.push(text);
  }

  const contacts: string[] = [];
  const emailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRe = /(?:\+7|8)[\s(-]*\d{3}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}/g;
  const tgRe = /(?:https?:\/\/)?t\.me\/[a-zA-Z0-9_]+/g;

  const emailMatches = html.match(emailRe);
  const phoneMatches = html.match(phoneRe);
  const tgMatches = html.match(tgRe);

  if (emailMatches) contacts.push(...[...new Set(emailMatches)].slice(0, 3));
  if (phoneMatches) contacts.push(...[...new Set(phoneMatches)].slice(0, 3));
  if (tgMatches) contacts.push(...[...new Set(tgMatches)].slice(0, 3));

  return { title, description, headings, paragraphs, contacts };
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { url } = await request.json();
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Укажите URL" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
  } catch {
    return NextResponse.json({ error: "Некорректный URL" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return NextResponse.json({ error: "Только HTTP/HTTPS" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Creatly/1.0; +https://creatly.ru)",
        Accept: "text/html",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: `Сайт вернул ошибку: ${res.status}` }, { status: 422 });
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return NextResponse.json({ error: "URL не является HTML-страницей" }, { status: 422 });
    }

    const html = await res.text();
    const extracted = extractText(html.slice(0, 500_000));

    return NextResponse.json({ extracted });
  } catch (err) {
    const message = err instanceof Error && err.name === "AbortError"
      ? "Таймаут: сайт не ответил за 10 секунд"
      : `Не удалось загрузить сайт: ${err}`;
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
