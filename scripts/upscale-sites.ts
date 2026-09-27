/** Посегментный upscale hero AURA (orbit) + ТРОПА (film) → 4K → HQ, обновление проектов. */
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { higsAvailable, higsDownload, higsUpscaleVideo } from "@/lib/ai/higs";
import { concatScrub, extractPoster } from "@/lib/media/ffmpeg";
import type { SiteDocument } from "@/lib/site/types";
const prisma = new PrismaClient();
const DIR = join(process.cwd(), "public", "uploads", "1", "gen");
const WEB = "/uploads/1/gen";
const t0 = Date.now(); const log = (m: string) => console.log(`[${((Date.now()-t0)/60000).toFixed(1)}м] ${m}`);

async function upscaleSite(prefix: string, nSeg: number, outName: string): Promise<string | null> {
  const up: string[] = [];
  for (let i = 0; i < nSeg; i++) {
    log(`${prefix} сегмент ${i}: 4K…`);
    let ok = false;
    for (let a = 0; a < 2 && !ok; a++) {
      try {
        const url = await higsUpscaleVideo(join(DIR, `${prefix}-seg-${i}.mp4`), { resolution: a === 0 ? "4K" : "2K", fps: 30, jobId: `${prefix}-up-${i}-${a}-${Date.now().toString(36)}` });
        const local = join(DIR, `${prefix}-seg-${i}-up.mp4`);
        await higsDownload(url, local);
        up.push(local); ok = true; log(`  ${prefix} ${i} ✓`);
      } catch (e) { log(`  ${prefix} ${i} #${a+1}: ${String(e).slice(0,90)}`); }
    }
    if (!ok) { log(`  ${prefix} ${i} провал — стоп`); return null; }
  }
  const hq = join(DIR, outName);
  await concatScrub(up, hq);
  await extractPoster(hq, join(DIR, outName.replace(".mp4", "-poster.jpg")));
  log(`${prefix} HQ склеен ✓`);
  return `${WEB}/${outName}`;
}

async function swapHero(id: number, oldName: string, hq: string) {
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return;
  const doc = p.document as never as SiteDocument;
  let n = 0;
  for (const b of doc.pages[0].blocks) if (b.fields?.["sp01-video"]?.includes(oldName)) { b.fields["sp01-video"] = hq; n++; }
  await prisma.project.update({ where: { id }, data: { document: doc as never } });
  log(`проект ${id}: hero → HQ (${n})`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("offline");
  const auraHq = await upscaleSite("aura", 3, "aura-orbit-hq.mp4");
  if (auraHq) await swapHero(50, "aura-orbit.mp4", auraHq);
  const tropaHq = await upscaleSite("tropa", 5, "tropa-film-hq.mp4");
  if (tropaHq) await swapHero(49, "tropa-film.mp4", tropaHq);
  log("ГОТОВО");
}
main().catch(e => { console.error("UPSCALE-SITES FAILED:", String(e).slice(0,200)); process.exit(1); }).finally(() => prisma.$disconnect());
