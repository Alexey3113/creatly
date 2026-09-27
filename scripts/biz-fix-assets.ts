/* БИЗНЕС-САЙТЫ — ПОЧИНКА АССЕТОВ (аудит 2026-09-28, docs/audit/sites/biz-a.md).
   1) Чужие бренды на кадрах → тот же кадр без надписей (nano-banana-pro, оригинал как референс):
      horo-dial (PATEK PHILIPPE), horo-caseback (AI-гравировка), canto-hero (этикетка «…NOTE» как Blue Note),
      canto-deck (CLEARAUDIO), ledger (карта «ASTRA FINTECH»).
   2) 404: ledger-app.jpg, ledger-edge.jpg — новые кадры.
   3) Hero-видео canto и ledger показывали те же бренды → перегенерация kling от очищенных постеров
      (дедуп через /api/history: ложный «не принято» ≠ повторный сабмит).
   Старые файлы → .bak-brand-*. Скип-если-готово (.fixed-*). */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsGenerateVideoAsync, higsDownload } from "@/lib/ai/higs";

const S = path.resolve("public/uploads/1/hooks/sites");
const G = path.join(S, "g");
const BASE = process.env.HIGS_BOT_URL || "http://127.0.0.1:3210";
const F = "visual-hooks-fix";
const NEG = "absolutely no text, no letters, no numbers, no brand names, no logos, no watermark, no engraving text";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const marker = (dir: string, name: string) => path.join(dir, `.fixed-${name}`);

function backup(dir: string, file: string) {
  const src = path.join(dir, file);
  const bak = path.join(dir, `.bak-brand-${file}`);
  if (fs.existsSync(src) && !fs.existsSync(bak)) fs.copyFileSync(src, bak);
}

async function img(dir: string, file: string, prompt: string, ref?: string, textOnly?: string) {
  const name = file.replace(/\.\w+$/, "");
  if (fs.existsSync(marker(dir, name))) { console.log(`SKIP ${file}`); return; }
  backup(dir, file);
  let url: string;
  try {
    url = await higsGenerateImageAsync({ jobId: `${name}-fix-${Date.now()}`, prompt: `${prompt}. ${NEG}`, folder: F, refFrames: ref ? [path.join(dir, `.bak-brand-${file}`)] : [], aspectRatio: "16:9", quality: "2k" });
  } catch (e) {
    // загрузка фото-референса у бота бывает недоступна («Инпут загрузки не найден … лимит») → тот же кадр по описанию
    if (!ref || !textOnly || !/Инпут загрузки|лимит/i.test((e as Error).message)) throw e;
    console.log(`… ${file}: референс недоступен, генерирую по описанию`);
    url = await higsGenerateImageAsync({ jobId: `${name}-fixt-${Date.now()}`, prompt: `${textOnly}. ${NEG}`, folder: F, aspectRatio: "16:9", quality: "2k" });
  }
  await higsDownload(url, path.join(dir, file));
  fs.writeFileSync(marker(dir, name), new Date().toISOString());
  console.log(`OK ${file}`);
}

async function hist(prompt: string, since: number): Promise<string | null> {
  try {
    const r = await fetch(`${BASE}/api/history`, { signal: AbortSignal.timeout(20000) });
    const j = (await r.json()) as { items?: Array<{ model?: string; folder?: string; prompt?: string; timestamp?: number; images?: string[] }> };
    for (const x of j.items || []) {
      if (x.model === "kling-3.0" && x.folder === F && (x.prompt || "").slice(0, 42) === prompt.slice(0, 42) && (x.timestamp || 0) >= since && x.images?.[0]) {
        const p = x.images[0];
        return p.startsWith("http") ? p : `${BASE}/${p.replace(/^\/+/, "")}`;
      }
    }
  } catch {}
  return null;
}

async function vid(file: string, start: string, prompt: string) {
  const name = file.replace(/\.\w+$/, "");
  if (fs.existsSync(marker(S, name))) { console.log(`SKIP ${file}`); return; }
  backup(S, file);
  const since = Date.now() - 20000;
  const dst = path.join(S, file);
  try {
    const u = await higsGenerateVideoAsync({ prompt, jobId: `${name}-fix-${Date.now().toString(36)}`, folder: F, startFrame: start, duration: 10, quality: "1080p" });
    await higsDownload(u, dst);
  } catch {
    const dl = Date.now() + 18 * 60000;
    let got = false;
    while (Date.now() < dl) { const r = await hist(prompt, since); if (r) { await higsDownload(r, dst); got = true; break; } await sleep(12000); }
    if (!got) throw new Error(`video ${file}: нет результата`);
  }
  fs.writeFileSync(marker(S, name), new Date().toISOString());
  console.log(`OK ${file}`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const imgs: Array<() => Promise<void>> = [
    () => img(G, "horo-dial.jpg", "The exact same macro photograph of the watch: same aventurine galaxy dial, same gold hands and applied indices, same lighting and framing — but the dial carries no brand name, no wordmark and no printed text of any kind", path.join(G, "horo-dial.jpg"), "Macro photograph of a luxury mechanical wristwatch: a deep blue aventurine dial full of tiny glittering gold stars like a night galaxy, slim gold dauphine hands and applied gold indices, polished gold case, dark studio background, crisp macro detail, premium product photography"),
    () => img(G, "horo-caseback.jpg", "The exact same macro photograph of the open watch caseback: same gold rotor, jewels and blued screws, same lighting and framing — but the bezel rim is plain polished metal with no engraved words or numbers", path.join(G, "horo-caseback.jpg"), "Macro photograph of an open mechanical watch caseback seen through sapphire glass: gold winding rotor, ruby jewels, blued screws, perlage finishing, polished gold rim, brown leather strap, warm studio light, premium product photography"),
    () => img(S, "canto-hero.jpg", "The exact same photograph of the turntable playing a black vinyl record: same brass tonearm, same warm lamp light and valve amplifier behind — but the record centre label is plain matte deep blue paper with no printing at all", path.join(S, "canto-hero.jpg"), "Cinematic close photograph of a black vinyl record spinning on a brass-and-walnut turntable, the brass tonearm resting in the groove, the record centre label plain matte deep blue, warm lamp light, glowing vacuum-tube amplifier softly out of focus behind, bookshelves in the dark, analog hi-fi mood"),
    () => img(G, "canto-deck.jpg", "The exact same photograph of the brass and walnut turntable in the warm listening room — but the plinth is plain wood and brass with no brand plate and no lettering anywhere", path.join(G, "canto-deck.jpg"), "Photograph of a brass and walnut turntable with a heavy gold platter and a long brass tonearm on a wooden cabinet in a warm listening room with green armchairs, a brass desk lamp and a valve amplifier, bookshelves behind, warm evening light"),
    () => img(S, "ledger.jpg", "The exact same image of the matte black metal card floating in deep space among flowing ribbons of light — but the card surface is completely plain brushed black metal with only the chip, no name, no logo, no letters", path.join(S, "ledger.jpg"), "A plain matte black brushed-metal payment card with only a chip floats at a slight angle in deep space, ribbons of blue, violet and gold light flowing around it, stars and a faint nebula behind, cinematic product render"),
    () => img(G, "ledger-app.jpg", "Quiet editorial photograph: a hand holding a smartphone above a linen tablecloth in soft morning window light, the screen shows a calm minimal dark banking interface with one large glowing figure and a thin line chart, matte, restrained, lots of negative space, shallow depth of field"),
    () => img(G, "ledger-edge.jpg", "Macro photograph of the edge of a matte black brushed-metal payment card resting on dark slate, a single thin line of light grazing the metal edge, shallow depth of field, near-black background, quiet luxury"),
  ];
  const res: PromiseSettledResult<void>[] = [];
  const running: Promise<void>[] = [];
  for (const [i, job] of imgs.entries()) {
    running.push(job().catch((e) => { console.error(`IMG FAIL #${i}:`, (e as Error).message); }));
    if (i < imgs.length - 1) await sleep(3000);
  }
  res.push(...(await Promise.allSettled(running)));

  // видео — только от очищенных постеров
  const vids = await Promise.allSettled([
    fs.existsSync(marker(S, "canto-hero")) ? vid("canto-hero.mp4", path.join(S, "canto-hero.jpg"), "The black vinyl record spins slowly on the brass turntable, the tonearm resting in the groove, warm lamp light flickering softly on the glowing valves behind. Seamless, no cuts, cinematic.") : Promise.reject(new Error("нет чистого canto-hero.jpg")),
    sleep(4000).then(() => fs.existsSync(marker(S, "ledger")) ? vid("ledger-hero.mp4", path.join(S, "ledger.jpg"), "The plain black metal card floats and turns very slowly in deep space while ribbons of blue and violet light flow around it. Seamless, no cuts, cinematic.") : Promise.reject(new Error("нет чистого ledger.jpg"))),
  ]);
  vids.forEach((r, i) => { if (r.status === "rejected") console.error(`VID FAIL #${i}:`, (r.reason as Error).message); });
  console.log("biz-fix-assets: готово");
}

main().catch((e) => { console.error(e); process.exit(1); });
