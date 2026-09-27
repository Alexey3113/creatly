import { PrismaClient } from "@prisma/client";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";

const prisma = new PrismaClient();
async function main() {
  let doc = createEmptyDocument("Storytelling Demo");
  const r = applyOps(doc, [
    { op: "add-block", presetId: "header-transparent-01" },
    { op: "add-block", presetId: "story-poster-01" },
    { op: "add-block", presetId: "hero-statement-01" },
    { op: "add-block", presetId: "features-glow-01" },
    { op: "add-block", presetId: "gallery-reveal-01" },
    { op: "add-block", presetId: "testimonials-cinematic-01" },
    { op: "add-block", presetId: "testimonials-marquee-01" },
    { op: "add-block", presetId: "story-video-02" },
    { op: "add-block", presetId: "story-curtain-01" },
    { op: "add-block", presetId: "story-zoom-01" },
    { op: "add-block", presetId: "story-video-text-01" },
    { op: "add-block", presetId: "features-tilt-01" },
    { op: "add-block", presetId: "case-studies-counters-01" },
    { op: "add-block", presetId: "story-highlight-01" },
    { op: "add-block", presetId: "story-stack-01" },
    { op: "add-block", presetId: "story-horizontal-01" },
    { op: "add-block", presetId: "comparison-slider-01" },
    { op: "add-block", presetId: "story-manifesto-01" },
    { op: "add-block", presetId: "footer-dark-01" },
  ]);
  if (r.errors.length) { console.log("errors:", r.errors); return; }
  doc = applyOps(r.doc, [{ op: "set-scene", scene: { type: "aurora", intensity: 0.55, grain: true } }]).doc;
  const user = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!user) { console.log("нет пользователей"); return; }
  const project = await prisma.project.upsert({
    where: { slug: "storytelling-demo" },
    update: { document: doc as never },
    create: { slug: "storytelling-demo", name: "Storytelling Demo", document: doc as never, userId: user.id },
  });
  console.log(`демо-проект готов: http://localhost:3000/editor?project=${project.id}`);
}
main().finally(() => prisma.$disconnect());
