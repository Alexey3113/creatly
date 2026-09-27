/* ANIMATED — перегенерация всех 19 фото-ассетов: committed арт-дирекшн, привязка к субъекту референса.
   Оригинальная генерация (тип субъекта + грейд из рефа, не копия кадра), без nudity/text.
   Пишет в <name>-hero-v2.jpg — свап после визуальной сверки. */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";
const OUT = "public/uploads/1/animated"; const FOLDER = "animated";

const A: { name: string; prompt: string }[] = [
  // === ВЕРНЫЕ СУБЪЕКТУ (регенерируем грейд) ===
  { name: "archive", prompt: "Cinema still, warm archive reading room interior. Long golden light beams rake through tall windows, drifting dust, floor-to-ceiling oak shelves of leather books, a single reading lamp glow. Kodak Portra warm grade, 35mm, shallow depth of field, deep amber and walnut with cream highlights, no people, quiet heritage atmosphere, editorial composition with negative space. No text, no interface, no watermark." },
  { name: "ascend", prompt: "Cinematic alpine landscape at first light. Layered jagged snow peaks receding into cool blue atmospheric haze, warm peach dawn glow catching only the highest ridges, deep shadowed valleys below. Anamorphic wide vista, film grain, teal-and-peach cinema grade, dramatic depth layers for a 2.5D dive-in, no foreground clutter. No text, no interface, no watermark." },
  { name: "column-1", prompt: "Editorial furniture still. A single sculptural bouclé lounge chair in soft directional window light against a warm plaster wall, sage and bone palette, matte muted grade, 50mm, shallow depth of field, generous negative space, calm interior. No text, no interface, no watermark." },
  { name: "column-2", prompt: "Editorial furniture still. A single woven-seat oak dining chair in warm afternoon light casting a long soft shadow on a plaster wall, sage and bone palette, matte muted grade, 50mm, shallow depth of field, negative space. No text, no interface, no watermark." },
  { name: "column-3", prompt: "Editorial furniture still. A single curved cream fabric armchair with a draped throw in gentle daylight, warm neutral studio, sage accents, matte muted grade, 50mm, shallow depth of field, negative space. No text, no interface, no watermark." },
  { name: "current", prompt: "Cinematic nature still, misty forest gorge at dawn. Moss-green wet boulders and a thin waterfall, thick volumetric fog rolling between the rocks, cool moody natural backlight, layered atmospheric depth, desaturated moss-green and cool cream grade, film grain. No text, no interface, no watermark." },
  { name: "echo-1", prompt: "Gallery still life. A single pale ceramic sculptural object on a bone-white plinth in a warm sunlit gallery, soft directional light, long gentle shadow, timber and bone palette, editorial minimalism, generous negative space, 85mm shallow depth of field. No text, no interface, no watermark." },
  { name: "echo-2", prompt: "Gallery still life. A folded cream paper art object casting a soft sculptural shadow on a warm timber surface in gallery light, bone and umber palette, editorial minimalism, shallow depth of field, negative space. No text, no interface, no watermark." },
  { name: "echo-3", prompt: "Gallery still life. A small dark bronze figurine on a bone pedestal in a sunlit gallery interior, warm timber tones, soft directional light, editorial minimalism, shallow depth of field, negative space. No text, no interface, no watermark." },
  { name: "member", prompt: "Editorial cinematic portrait of one person in a warm charcoal-grey studio, a single ember-orange rim light carving the profile, three-quarter turn, calm confident gaze, fully clothed in a dark coat, fine 35mm film grain, warm-grey and ember grade, deep shadow with negative space. No text, no interface, no watermark." },
  { name: "prism", prompt: "Cinematic tech product still. A sleek frameless smartphone floating tilted in three-quarter perspective over a dark charcoal surface, a living cobalt-to-magenta neon gradient glowing on its screen and reflecting on the glass, soft studio product light, deep charcoal grade with neon accent, negative space. No text, no interface, no watermark." },
  { name: "relic", prompt: "Museum film still. A single weathered marble bust of a classical figure, three-quarter turn, isolated in a pure black void, one hard ring-shaped key light rimming the marble edge, a cold electric-blue ambient wash from directly behind the head, deep matte black shadow, faint volumetric haze, 85mm, desaturated with a single electric-blue accent, anamorphic grade, heavy grain, subject off-center with black negative space. No text, no interface, no watermark." },
  { name: "split", prompt: "High-key product still. A glossy unbranded aluminium beverage can standing centered on a bold candy-colored seamless background, fresh citrus slices and a juice splash frozen mid-air around it, bright flat studio light, saturated candy grade (hot pink and orange), hyperreal, playful, clean composition. No text, no interface, no watermark." },
  { name: "strata", prompt: "Flat vector cinematic illustration, twilight canyon vista. Indigo-to-amber dusk gradient sky, layered silhouetted canyon ridges receding into soft haze at clearly separated depths, gentle ambient glow, poster concept-art, clean depth planes for parallax, minimal. No text, no interface, no watermark." },
  { name: "terra", prompt: "Photorealistic planet Earth seen from space, the day-night terminator crossing the disc with glowing amber city lights on the night side, thin cyan atmospheric rim glow, deep starfield behind, cinematic NASA-style render, space-navy and amber grade, centered with black negative space. No text, no interface, no watermark." },
  { name: "vertex", prompt: "Cinema still, collectible design objects arranged on a warm oak library table in amber lamplight, blurred bookshelves behind, museum-catalog staging, burgundy and amber grade, 50mm, cinematic shallow depth of field, one object catching the key light. No text, no interface, no watermark." },
  // === ПЕРЕПРИВЯЗКА к реальному субъекту рефа ===
  { name: "monolith", prompt: "Painterly cinematic fantasy key-art. A lone cloaked hero silhouette stands on a dark cliff before a colossal glowing arcane monument-structure wreathed in magenta-and-indigo dusk mist, drifting ember particles, volumetric fog in separated depth layers, dramatic backlight, concept-art brushwork, awe and mystery. No text, no interface, no watermark." },
  { name: "orbit", prompt: "Museum-specimen product still. A single sculptural matte clay artifact of an abstract organic form, centered on a seamless high-key white studio sweep, soft even wraparound light, faint contact shadow, monochrome bone-and-grey grade, ultra-clean editorial object photography, generous white negative space. No text, no interface, no watermark." },
  { name: "vigil", prompt: "Moody fine-dining cinema still. A single elegantly plated dish on dark slate in a candle-lit restaurant, a narrow warm spotlight raking across the plate, deep surrounding shadow, wisps of steam, espresso-and-amber grade, intimate chiaroscuro food photography, centered with dark negative space. No text, no interface, no watermark." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен (127.0.0.1:3210)");
  const stamp = Date.now().toString(36);
  const jobs = A.map((a, i) => (async () => {
    await new Promise((r) => setTimeout(r, i * 2500)); // стаггер сабмита
    const dest = path.join(OUT, `${a.name}-hero-v2.jpg`);
    try {
      const url = await higsGenerateImageAsync({ jobId: `refbind-${a.name}-${stamp}`, prompt: a.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
      await higsDownload(url, dest); console.log(`OK ${a.name}`);
    } catch (e) { console.error(`FAIL ${a.name}:`, (e as Error).message); }
  })());
  await Promise.all(jobs); console.log("anim-refbind: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
