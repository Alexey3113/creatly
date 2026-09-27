/**
 * Headless-скриншоты страницы для цикла самопроверки.
 *
 * Принимает самодостаточный HTML (renderPublishHtml inline:true), поднимает
 * chromium через playwright и снимает страницу в нескольких точках скролла
 * (десктоп + мобилка) — так vision-ревью видит сайт так, как его увидит
 * человек, включая enter-анимации (после скролла ждём их завершения).
 */

import { writeFile, readFile, mkdtemp, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { hasFfmpeg, makeThumb } from "./ffmpeg";

export interface PageShot {
  label: string;
  /** jpeg, уменьшенный до ~800px по ширине (экономия vision-токенов). */
  base64: string;
}

let playwrightChecked: boolean | null = null;
export async function hasPlaywright(): Promise<boolean> {
  if (playwrightChecked !== null) return playwrightChecked;
  try {
    await import("playwright");
    playwrightChecked = true;
  } catch {
    playwrightChecked = false;
  }
  return playwrightChecked;
}

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const DESKTOP_STOPS = [0, 0.22, 0.44, 0.66, 0.88];
const MOBILE_STOPS = [0, 0.5];

export async function screenshotHtml(html: string, baseUrl: string): Promise<PageShot[]> {
  const { chromium } = await import("playwright");
  // <base> — чтобы относительные /uploads и /assets резолвились на app-сервер
  const withBase = html.replace(/<head>/i, `<head><base href="${baseUrl.replace(/\/$/, "")}/">`);
  const browser = await chromium.launch({ headless: true });
  const dir = await mkdtemp(join(tmpdir(), "creatly-shots-"));
  const ffmpeg = await hasFfmpeg();
  const shots: PageShot[] = [];
  try {
    const takeSet = async (viewport: { width: number; height: number }, stops: number[], tag: string) => {
      const page = await browser.newPage({ viewport });
      try {
        await page.setContent(withBase, { waitUntil: "networkidle", timeout: 45_000 }).catch(() => {});
        await page.waitForTimeout(1200); // шрифты, first paint, сцена
        const total = await page.evaluate("document.body.scrollHeight - window.innerHeight");
        for (const stop of stops) {
          await page.evaluate(`window.scrollTo(0, ${Math.round(Number(total) * stop)})`);
          await page.waitForTimeout(900); // enter-анимации и докрутка
          const raw = join(dir, `${tag}-${Math.round(stop * 100)}.jpg`);
          await page.screenshot({ path: raw, type: "jpeg", quality: 60 });
          let final = raw;
          if (ffmpeg && viewport.width > 900) {
            final = raw.replace(".jpg", "-sm.jpg");
            await makeThumb(raw, final, 800).catch(() => { final = raw; });
          }
          shots.push({
            label: `${tag === "d" ? "десктоп" : "мобилка"}, скролл ${Math.round(stop * 100)}%`,
            base64: (await readFile(final)).toString("base64"),
          });
        }
      } finally {
        await page.close().catch(() => {});
      }
    };
    await takeSet(DESKTOP, DESKTOP_STOPS, "d");
    await takeSet(MOBILE, MOBILE_STOPS, "m");
  } finally {
    await browser.close().catch(() => {});
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
  return shots;
}

/** Утилита для тестов: пишет html во временный файл (не используется в проде). */
export async function writeTempHtml(html: string): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "creatly-html-"));
  const path = join(dir, "index.html");
  await writeFile(path, html);
  return path;
}
