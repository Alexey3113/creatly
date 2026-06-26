import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export interface SiteProfile {
  title: string;
  description: string;
  lang: string;
  headings: string[];
  paragraphs: string[];
  contacts: string[];
  // Бренд / визуальная ДНК
  ogImage: string;
  logo: string;
  brandColors: string[];
  fonts: string[];
  // Структура
  nav: string[];
  ctas: { text: string; href: string }[];
  images: { src: string; alt: string }[];
  socials: string[];
  jsonLd: string;
  // Диагностика
  looksLikeSPA: boolean;
}

const strip = (s: string) =>
  s.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();

function abs(base: URL, src: string): string {
  try {
    return new URL(src, base).toString();
  } catch {
    return src;
  }
}

function extractProfile(html: string, base: URL): SiteProfile {
  // --- meta / язык ---
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? strip(titleMatch[1]) : "";

  const metaContent = (name: string): string => {
    const re = new RegExp(
      `<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`,
      "i",
    );
    const re2 = new RegExp(
      `<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`,
      "i",
    );
    const m = html.match(re) || html.match(re2);
    return m ? m[1].trim() : "";
  };

  const description = metaContent("description") || metaContent("og:description");
  const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
  const lang = langMatch ? langMatch[1] : "";

  // --- бренд: og:image, лого, тема ---
  const ogImageRaw = metaContent("og:image");
  const ogImage = ogImageRaw ? abs(base, ogImageRaw) : "";

  let logo = "";
  const logoImg = html.match(/<img[^>]*(?:class|alt|id)=["'][^"']*log(?:o|otype)[^"']*["'][^>]*>/i);
  if (logoImg) {
    const src = logoImg[0].match(/src=["']([^"']+)["']/i);
    if (src) logo = abs(base, src[1]);
  }
  if (!logo) {
    const iconLink = html.match(/<link[^>]*rel=["'][^"']*(?:apple-touch-icon|icon)[^"']*["'][^>]*>/i);
    if (iconLink) {
      const href = iconLink[0].match(/href=["']([^"']+)["']/i);
      if (href) logo = abs(base, href[1]);
    }
  }

  // --- цвета бренда (частотный анализ hex в style/атрибутах) ---
  const styleBlocks = (html.match(/<style[\s\S]*?<\/style>/gi) || []).join(" ");
  const inlineStyles = (html.match(/style=["'][^"']*["']/gi) || []).join(" ");
  const themeColor = metaContent("theme-color");
  const colorPool = `${themeColor} ${styleBlocks} ${inlineStyles}`;
  const hexCounts = new Map<string, number>();
  for (const m of colorPool.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    let hex = m[0].toLowerCase();
    if (hex.length === 4) hex = "#" + hex.slice(1).split("").map((c) => c + c).join("");
    hexCounts.set(hex, (hexCounts.get(hex) || 0) + 1);
  }
  const isNeutral = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    return (max - min) < 18 || max > 245 || max < 12; // серые/около-белые/около-чёрные
  };
  const brandColors = [...hexCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([h]) => h)
    .filter((h) => !isNeutral(h))
    .slice(0, 6);

  // --- шрифты (Google Fonts + font-family) ---
  const fonts = new Set<string>();
  for (const m of html.matchAll(/fonts\.googleapis\.com\/css2?\?([^"']+)/gi)) {
    for (const fam of m[1].matchAll(/family=([^&:"']+)/gi)) {
      fonts.add(decodeURIComponent(fam[1].replace(/\+/g, " ")).trim());
    }
  }
  for (const m of colorPool.matchAll(/font-family\s*:\s*["']?([^;"'}<]+)/gi)) {
    const first = m[1].split(",")[0].replace(/["']/g, "").trim();
    if (first && !/^(inherit|initial|sans-serif|serif|monospace|system-ui|-apple-system)$/i.test(first)) {
      fonts.add(first);
    }
  }

  // --- навигация ---
  const nav: string[] = [];
  const navBlock = (html.match(/<nav[\s\S]*?<\/nav>/i) || html.match(/<header[\s\S]*?<\/header>/i) || [""])[0];
  for (const m of navBlock.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)) {
    const t = strip(m[1]);
    if (t.length > 1 && t.length < 40 && !nav.includes(t)) nav.push(t);
    if (nav.length >= 12) break;
  }

  // --- заголовки ---
  const headings: string[] = [];
  for (const m of html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)) {
    const t = strip(m[1]);
    if (t.length > 2 && t.length < 300 && !headings.includes(t)) headings.push(t);
    if (headings.length >= 30) break;
  }

  // --- очищенный контент для абзацев ---
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");

  const paragraphs: string[] = [];
  for (const m of cleaned.matchAll(/<(?:p|li|td|dd|blockquote)[^>]*>([\s\S]*?)<\/(?:p|li|td|dd|blockquote)>/gi)) {
    const t = strip(m[1]);
    if (t.length > 20 && t.length < 1000 && !paragraphs.includes(t)) paragraphs.push(t);
    if (paragraphs.length >= 40) break;
  }

  // --- CTA (кнопки и заметные ссылки) ---
  const ctas: { text: string; href: string }[] = [];
  const seenCta = new Set<string>();
  const pushCta = (text: string, href: string) => {
    const t = strip(text);
    if (t.length < 2 || t.length > 40) return;
    const key = t.toLowerCase();
    if (seenCta.has(key)) return;
    seenCta.add(key);
    ctas.push({ text: t, href: href ? abs(base, href) : "" });
  };
  for (const m of html.matchAll(/<a[^>]*class=["'][^"']*(?:btn|button|cta)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = m[0].match(/href=["']([^"']+)["']/i);
    pushCta(m[1], href ? href[1] : "");
    if (ctas.length >= 8) break;
  }
  for (const m of html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)) {
    pushCta(m[1], "");
    if (ctas.length >= 8) break;
  }

  // --- изображения ---
  const images: { src: string; alt: string }[] = [];
  const seenImg = new Set<string>();
  for (const m of html.matchAll(/<img[^>]*>/gi)) {
    const tag = m[0];
    const srcM = tag.match(/(?:data-src|src)=["']([^"']+)["']/i);
    if (!srcM) continue;
    let src = srcM[1];
    if (src.startsWith("data:")) continue;
    src = abs(base, src);
    if (seenImg.has(src)) continue;
    seenImg.add(src);
    const altM = tag.match(/alt=["']([^"']*)["']/i);
    images.push({ src, alt: altM ? altM[1].trim() : "" });
    if (images.length >= 12) break;
  }

  // --- соцсети ---
  const socials: string[] = [];
  const socialRe = /https?:\/\/(?:www\.)?(?:instagram\.com|facebook\.com|fb\.com|vk\.com|youtube\.com|youtu\.be|tiktok\.com|t\.me|wa\.me|api\.whatsapp\.com|twitter\.com|x\.com|linkedin\.com|ok\.ru|dzen\.ru|pinterest\.[a-z]+)\/[^\s"'<>]+/gi;
  for (const m of html.matchAll(socialRe)) {
    const u = m[0].replace(/["'>].*$/, "");
    if (!socials.includes(u)) socials.push(u);
    if (socials.length >= 10) break;
  }

  // --- контакты ---
  const contacts: string[] = [];
  const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
  const phones = html.match(/(?:\+7|8)[\s(-]*\d{3}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}/g);
  const tgs = html.match(/(?:https?:\/\/)?t\.me\/[a-zA-Z0-9_]+/g);
  if (emails) contacts.push(...[...new Set(emails)].slice(0, 3));
  if (phones) contacts.push(...[...new Set(phones)].slice(0, 3));
  if (tgs) contacts.push(...[...new Set(tgs)].slice(0, 3));

  // --- JSON-LD ---
  let jsonLd = "";
  const ld = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  if (ld) jsonLd = ld[1].trim().slice(0, 2000);

  // --- эвристика SPA (пустой JS-шелл) ---
  const totalText = headings.join(" ").length + paragraphs.join(" ").length;
  const scriptCount = (html.match(/<script/gi) || []).length;
  const looksLikeSPA =
    totalText < 200 && (scriptCount > 3 || /<div[^>]*id=["'](?:root|app|__next|__nuxt)["']/i.test(html));

  return {
    title, description, lang, headings, paragraphs, contacts,
    ogImage, logo, brandColors, fonts: [...fonts].slice(0, 6), nav, ctas, images, socials, jsonLd, looksLikeSPA,
  };
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
    // base — финальный URL после редиректов (для разрешения относительных ссылок)
    const finalUrl = new URL(res.url || parsedUrl.toString());
    const extracted = extractProfile(html.slice(0, 800_000), finalUrl);

    return NextResponse.json({ extracted });
  } catch (err) {
    const message = err instanceof Error && err.name === "AbortError"
      ? "Таймаут: сайт не ответил за 10 секунд"
      : `Не удалось загрузить сайт: ${err}`;
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
