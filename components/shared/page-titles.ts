/* СГЕНЕРИРОВАНО scripts/gen-page-titles.ts — не править руками. Заголовки и описания страниц витрин
   (шаблон корня добавляет «| Creatly»). Без "use client": читается в generateMetadata серверных роутов. */
import type { Metadata } from "next";

export type PageFamily = "hooks" | "animated" | "story" | "story2";

const TITLES: Record<PageFamily, Record<string, { title: string; description: string }>> = {
 "hooks": {
  "iron": {
   "title": "Iron — A small, serious strength gym",
   "description": "Strength gym. A small, serious strength gym."
  },
  "botanic": {
   "title": "Botanic — Small-batch botanical gin",
   "description": "Gin distillery. Small-batch botanical gin."
  },
  "nib": {
   "title": "Nib — Fountain pens, ink and paper",
   "description": "Fine writing. Fountain pens, ink and paper."
  },
  "swell": {
   "title": "Swell — Hand-shaped surfboards",
   "description": "Surfboards. Hand-shaped surfboards."
  },
  "wick": {
   "title": "Wick — Hand-poured candles",
   "description": "Candles. Hand-poured candles."
  },
  "cask": {
   "title": "Cask — Single-cask, cask-strength whisky",
   "description": "Whisky. Single-cask, cask-strength whisky."
  },
  "clay": {
   "title": "Clay — Wheel-thrown tableware",
   "description": "Ceramics. Wheel-thrown tableware."
  },
  "stride": {
   "title": "Stride — One carefully tuned running shoe",
   "description": "Running. One carefully tuned running shoe."
  },
  "plat": {
   "title": "Plat — A twelve-seat tasting kitchen",
   "description": "Tasting kitchen. A twelve-seat tasting kitchen."
  },
  "fetch": {
   "title": "Fetch — A considered box for one specific dog",
   "description": "Pet care. A considered box for one specific dog."
  },
  "stem": {
   "title": "Stem — Considered floristry, made to say something",
   "description": "Floristry. Considered floristry, made to say something."
  },
  "thread": {
   "title": "Thread — Made-to-measure tailoring",
   "description": "Tailoring. Made-to-measure tailoring."
  },
  "barb": {
   "title": "Barb — A one-chair barbershop",
   "description": "Barbershop. A one-chair barbershop."
  },
  "steep": {
   "title": "Steep — Whole-leaf tea from named gardens",
   "description": "Whole-leaf tea. Whole-leaf tea from named gardens."
  },
  "loaf": {
   "title": "Loaf — Wood-fired sourdough, baked daily",
   "description": "Bakery. Wood-fired sourdough, baked daily."
  },
  "velo": {
   "title": "Vélo — Made-to-measure steel bicycles",
   "description": "Bicycles. Made-to-measure steel bicycles."
  },
  "balm": {
   "title": "Balm — A single-room day spa",
   "description": "Day spa. A single-room day spa."
  },
  "fern": {
   "title": "Fern — The right plant for your light",
   "description": "Plants. The right plant for your light."
  },
  "cacao": {
   "title": "Cacao — Single-origin bean-to-bar chocolate",
   "description": "Chocolate. Single-origin bean-to-bar chocolate."
  },
  "hide": {
   "title": "Hide — Vegetable-tanned leather goods",
   "description": "Leather goods. Vegetable-tanned leather goods."
  },
  "spice": {
   "title": "Spice — Whole spices, freshly harvested",
   "description": "Spice merchant. Whole spices, freshly harvested."
  },
  "comb": {
   "title": "Comb — Raw honey, one hive at a time",
   "description": "Raw honey. Raw honey, one hive at a time."
  },
  "grove": {
   "title": "Grove — Single-grove, new-harvest olive oil",
   "description": "Olive oil. Single-grove, new-harvest olive oil."
  },
  "pour": {
   "title": "Pour — A short-list cocktail bar",
   "description": "Cocktail bar. A short-list cocktail bar."
  },
  "curd": {
   "title": "Curd — A small-maker cheesemonger",
   "description": "Cheesemonger. A small-maker cheesemonger."
  },
  "lens": {
   "title": "Lens — Film portraiture, printed by hand",
   "description": "Film portraits. Film portraiture, printed by hand."
  },
  "wax": {
   "title": "Wax — An independent record shop",
   "description": "Record shop. An independent record shop."
  },
  "spine": {
   "title": "Spine — An independent bookshop",
   "description": "Bookshop. An independent bookshop."
  },
  "ink": {
   "title": "Ink — A private, custom tattoo studio",
   "description": "Tattoo studio. A private, custom tattoo studio."
  },
  "mane": {
   "title": "Mane — A one-chair hair studio",
   "description": "Hair studio. A one-chair hair studio."
  },
  "selvedge": {
   "title": "Selvedge — Raw selvedge denim, built to age",
   "description": "Raw denim. Raw selvedge denim, built to age."
  },
  "deck": {
   "title": "Deck — A skater-run board shop",
   "description": "Skate shop. A skater-run board shop."
  },
  "lather": {
   "title": "Lather — Cold-pressed soap and simple skincare",
   "description": "Apothecary. Cold-pressed soap and simple skincare."
  },
  "malt": {
   "title": "Malt — A small-batch taproom brewery",
   "description": "Craft brewery. A small-batch taproom brewery."
  },
  "ledger": {
   "title": "Ledger — Money, made quiet",
   "description": "Banking. Money, made quiet."
  },
  "dew": {
   "title": "Dew — Everything your skin actually needs",
   "description": "Skincare. Everything your skin actually needs."
  },
  "roast": {
   "title": "Roast — Coffee has a peak. We ship you the peak",
   "description": "Coffee roastery. Coffee has a peak. We ship you the peak."
  },
  "lume": {
   "title": "Lume — Light, set to be kept",
   "description": "Fine jewellery. Light, set to be kept."
  },
  "forge": {
   "title": "Forge — Forged not made",
   "description": "Bespoke knives. Forged not made."
  },
  "clothing": {
   "title": "Alevtyna — Fashion lookbook",
   "description": "Alevtyna — Fashion lookbook."
  },
  "skydive": {
   "title": "Skyfall — Skyfall",
   "description": "Skydiving. Skyfall"
  },
  "vinyl": {
   "title": "After Hours — Vinyl club",
   "description": "After Hours — Vinyl club."
  },
  "porsche": {
   "title": "Porsche — Classic sports car",
   "description": "Porsche — Classic sports car."
  },
  "anime": {
   "title": "Bloom+ — Anime magazine",
   "description": "Bloom+ — Anime magazine."
  },
  "ecology": {
   "title": "Verda — Reforestation",
   "description": "Verda — Reforestation."
  },
  "dj": {
   "title": "Seraph — DJ show",
   "description": "Seraph — DJ show."
  },
  "redsuit": {
   "title": "Sanguine — Red tailoring",
   "description": "Sanguine — Red tailoring."
  },
  "notredame": {
   "title": "Notre‑Dame — Notre dame",
   "description": "Cathedral visits. Notre dame"
  },
  "jpclub": {
   "title": "Yoru 夜 — Nightclub",
   "description": "Yoru 夜 — Nightclub."
  },
  "skisnow": {
   "title": "Tōji — Ski & board rental",
   "description": "Tōji — Ski & board rental."
  },
  "jptattoo": {
   "title": "彫 Hori — Japanese tattoo",
   "description": "彫 Hori — Japanese tattoo."
  },
  "bmw": {
   "title": "M·WERK — Performance cars",
   "description": "M·WERK — Performance cars."
  },
  "dance": {
   "title": "Kinet — Dance studio",
   "description": "Kinet — Dance studio."
  },
  "folkmusic": {
   "title": "Зоря — Folk ensemble",
   "description": "Зоря — Folk ensemble."
  },
  "rockband": {
   "title": "Feral — Live band",
   "description": "Feral — Live band."
  },
  "photographer": {
   "title": "Northlight — On-location photography",
   "description": "Northlight — On-location photography."
  },
  "womensuit": {
   "title": "Séverine — Women’s tailoring",
   "description": "Séverine — Women’s tailoring."
  },
  "hoodie": {
   "title": "Blokk — Streetwear drops",
   "description": "Blokk — Streetwear drops."
  },
  "escort": {
   "title": "Éclat — Companionship concierge",
   "description": "Éclat — Companionship concierge."
  },
  "cardealer": {
   "title": "Concours — Classic-car dealer",
   "description": "Concours — Classic-car dealer."
  },
  "jprestaurant": {
   "title": "結 Yui — Omakase",
   "description": "結 Yui — Omakase."
  },
  "freestyle": {
   "title": "Session — Skate crew",
   "description": "Session — Skate crew."
  },
  "mono": {
   "title": "Mono — A house that disappears into its lake",
   "description": "Architecture. A house that disappears into its lake."
  },
  "phantom": {
   "title": "Phantom — Nothing for miles",
   "description": "Electric auto. Nothing for miles."
  },
  "horologe": {
   "title": "Horologe — A little galaxy on your wrist",
   "description": "Watchmaking. A little galaxy on your wrist."
  },
  "tide": {
   "title": "Tide — The cold does the work",
   "description": "Cold-water club. The cold does the work."
  },
  "canto": {
   "title": "Canto — Music, with the weight put back in",
   "description": "Hi-fi audio. Music, with the weight put back in."
  },
  "atlas": {
   "title": "Atlas — Made for where the map ends",
   "description": "Expedition gear. Made for where the map ends."
  },
  "noct": {
   "title": "Noct — Wine that tastes of somewhere",
   "description": "Natural wine. Wine that tastes of somewhere."
  },
  "sol": {
   "title": "Sol — Your roof already catches the sun",
   "description": "Solar energy. Your roof already catches the sun."
  },
  "vessel": {
   "title": "Vessel — Cloth that moves like it means it",
   "description": "Fashion. Cloth that moves like it means it."
  },
  "haven": {
   "title": "Haven — Where the pool forgets the sea",
   "description": "Shoreline retreat. Where the pool forgets the sea."
  },
  "form": {
   "title": "Form — One chair. Nothing spare",
   "description": "Furniture. One chair. Nothing spare."
  },
  "bloom": {
   "title": "Bloom — Interactive story",
   "description": "Silicon veins and blossoms wake as you scroll."
  },
  "held-world": {
   "title": "Held World — Interactive story",
   "description": "A tiny world wakes in an open hand as you scroll."
  },
  "monolith": {
   "title": "Monolith — Interactive story",
   "description": "Mist parts and the dusk ignites behind the stone."
  },
  "planet-vigil": {
   "title": "Planet Vigil — Interactive story",
   "description": "A world turns while she keeps her quiet watch."
  },
  "ascension": {
   "title": "Ascension — Interactive story",
   "description": "A figure surfaces from the light and returns."
  },
  "rev-neura": {
   "title": "Neura — Cursor reveal",
   "description": "A soft lens finds the machine under the skin; scroll opens it fully."
  },
  "rev-mythic": {
   "title": "Mythic — Cursor reveal",
   "description": "Scroll sets the sun; at nightfall the valley glows alive."
  },
  "rev-imperial": {
   "title": "Imperial — Cursor reveal",
   "description": "Trace the globe, then scroll along its routes into the brightest node."
  },
  "track-portfolio": {
   "title": "Studio X — Scroll gaze",
   "description": "A face follows your cursor, then your scroll — and hands you the work."
  },
  "track-sentry": {
   "title": "Sentry — Scroll gaze",
   "description": "A watcher turns to you, locks on, and shows what it sees."
  },
  "track-neon": {
   "title": "Neon Logic — Scroll gaze",
   "description": "A neon emblem turns with your scroll; one face opens into the product."
  },
  "living-object": {
   "title": "Living Object — Cinematic scrub",
   "description": "Scroll wakes a sealed object; the camera passes through its seam of light."
  },
  "cloud-step": {
   "title": "Cloud Step — Cutout parallax",
   "description": "A sneaker falls through the clouds with you and lands in the drop."
  },
  "strata": {
   "title": "Strata — Layered editorial",
   "description": "A scan cuts a ridge of stone into strata, one layer per feature."
  },
  "reverie": {
   "title": "Reverie — Portal object",
   "description": "A ring of light opens; the camera flies on to the next portal."
  },
  "vanguard": {
   "title": "Vanguard — Kinetic typography",
   "description": "Three commands, one per scroll beat, with the crew standing behind them."
  },
  "aether": {
   "title": "Aether — Atmospheric",
   "description": "Rise through lavender fog to a monolith house that breathes light."
  },
  "botanica": {
   "title": "Botanica — Material shadow",
   "description": "Scroll moves the sun: the shadow turns with it — and with your hand."
  },
  "neon-forge": {
   "title": "Neon Forge — Techno grid",
   "description": "Scroll forges a chrome shard: molten, quenched, finished."
  },
  "macro-optics": {
   "title": "Macro Optics — Product macro",
   "description": "Light sweeps the frame, then scroll steps into her amber lens."
  },
  "liquid-word": {
   "title": "Liquid Word — 3D typography",
   "description": "Chrome FLUX turns with your scroll, then melts into the work."
  },
  "orbit-data": {
   "title": "Orbit Data — Data theatre",
   "description": "Zoom from the planet to your street, one number per stop."
  },
  "atelier-hand": {
   "title": "Atelier — Editorial fashion",
   "description": "From the model’s hand into the glass, then on to the atelier."
  },
  "fold-horizon": {
   "title": "Fold Horizon — Parallax narrative",
   "description": "The frame freezes and the horizon folds into the next chapter."
  },
  "": {
   "title": "Visual Hooks Lab",
   "description": "Первые экраны, которые цепляют: интерактивные истории, reveal-линзы, живые объекты."
  },
  "sites": {
   "title": "50 бизнес-сайтов — Visual Hooks",
   "description": "Бизнес-сайты с продуктом-актёром и сквозной историей от первого экрана до заявки."
  },
  "animated": {
   "title": "Concept-сайты — Visual Hooks",
   "description": "23 концепт-сайта на параллакс-сценах: слои, перекрытия, актёр через весь сайт."
  },
  "backgrounds": {
   "title": "Живые фоны — Visual Hooks",
   "description": "Библиотека живых фонов для первых экранов."
  }
 },
 "animated": {
  "manifesto": {
   "title": "Manifesto — We don't decorate. We direct",
   "description": "Manifesto: line-mask reveal + day→night."
  },
  "kinetic": {
   "title": "Kinetic",
   "description": "Kinetic: marquee skew + split-word portal."
  },
  "ledger": {
   "title": "Grove Ledger — How much does your studio quietly bleed every year?",
   "description": "Grove Ledger: rAF count-up + working calc."
  },
  "cipher": {
   "title": "Cipher//Sec",
   "description": "Cipher//Sec: typewriter + single glitch."
  },
  "forge": {
   "title": "Anvil — Made to withstand",
   "description": "Anvil: z-sandwich fixed type + ghost-blur."
  },
  "signal": {
   "title": "Helios — Every night ends in daylight data",
   "description": "Helios: rising sun + live count-up."
  },
  "flux": {
   "title": "Flux — Material in motion",
   "description": "Flux: living gradient flows into device."
  },
  "aurora": {
   "title": "Aurora — Currents, not corridors",
   "description": "Aurora: scroll-reactive current."
  },
  "genesis": {
   "title": "Genesis — From a single seed of matter",
   "description": "Genesis: point-cloud sphere→torus→field→text."
  },
  "ovation": {
   "title": "Ovation — The room finds its shape",
   "description": "Ovation: stream coalesces into mark."
  },
  "archive": {
   "title": "Meridian Archive — The room where the light keeps reading",
   "description": "Meridian Archive: ken-burns + chaptered panels + count-up."
  },
  "current": {
   "title": "Canopy — The forest is already reporting",
   "description": "Canopy: parallax glass cards + live telemetry."
  },
  "vigil": {
   "title": "Vigil",
   "description": "Vigil: cursor spotlight reveals relic in dark."
  },
  "strata": {
   "title": "Strata",
   "description": "Strata: camera dive into sliced illustration."
  },
  "ascend": {
   "title": "Ascend — Where the map runs out of air",
   "description": "Ascend: 4-plane alpine dolly dive-in."
  },
  "relic": {
   "title": "Relic — One object. Two thousand years of gaze",
   "description": "Relic: backlit-ring + turntable + plaque swap."
  },
  "column": {
   "title": "Column — Chairs that keep the daylight",
   "description": "Column: flex-grow accordion columns."
  },
  "echo": {
   "title": "Echo",
   "description": "Echo: split-title reveals gallery rail."
  },
  "pulse": {
   "title": "Pulse — Compute that glows at the edge",
   "description": "Pulse: fibonacci sphere + fresnel bloom."
  },
  "drift": {
   "title": "Drift — Work that catches the light",
   "description": "Drift: iridescent flow bends to cursor."
  },
  "bloom": {
   "title": "Bloom — The scent takes root",
   "description": "Bloom: vines frame viewport, grow on scroll."
  },
  "member": {
   "title": "Ember — A quiet room for people who make things slowly",
   "description": "Ember: portrait grows out of a text line."
  },
  "prism": {
   "title": "Prism — Light, refracted",
   "description": "Prism: living gradient flows into device glass."
  },
  "splash": {
   "title": "Pulp",
   "description": "Pulp: can woven between wordmark layers."
  },
  "terra": {
   "title": "Terra — One world, two hemispheres of light",
   "description": "Terra: dolly-in + day→night + earth-data."
  },
  "orbit": {
   "title": "Orbit — A shape turned in the light",
   "description": "Orbit: scale-in + turntable sheen + plaques."
  },
  "atlas": {
   "title": "Atlas Grid — The grid, read like a chart",
   "description": "Atlas Grid: SVG map pins unfold into chapters."
  },
  "helix": {
   "title": "Helix — The code of life, lit one rung at a time",
   "description": "Helix: realtime WebGL helix + node flares."
  },
  "vertex": {
   "title": "Vertex — Objects that outlived their century",
   "description": "Vertex: rack-focus pan across archive shelf."
  },
  "monolith": {
   "title": "Stele — It has burned since before the first age",
   "description": "Stele: dolly-in + fog parallax + ember."
  },
  "": {
   "title": "Animated — кино-сайты",
   "description": "Кино-анимированные сайты: мир, актёр и склейки по скроллу."
  }
 },
 "story": {
  "vision": {
   "title": "Vision — Ева Зорина",
   "description": "Глянцевый editorial — розовое стекло на чёрном."
  },
  "shadows": {
   "title": "Shadows — Мара Тень",
   "description": "Грандж-оккульт-зин на алом."
  },
  "solitude": {
   "title": "Solitude — Лия Морн",
   "description": "Ренессанс-портрет в техно-оправе."
  },
  "": {
   "title": "Story Sites — журналы историй",
   "description": "Сторителлинг-сайты: один скролл перелистывает журнал историй."
  }
 },
 "story2": {
  "portfolio": {
   "title": "Portfolio — Marina Voss",
   "description": "Глянцевый art-director editorial — plum + dusty-pink."
  },
  "punk": {
   "title": "Big Fn Life — Madeline",
   "description": "Панк personal-brand — white/black + hot-pink, дерзость."
  },
  "scarlet": {
   "title": "緋 Scarlet — Tokyo Underground",
   "description": "Кибер-зин нуар — oxblood-red, кандзи, гранж."
  },
  "forlorn": {
   "title": "Forlorn — Roderika",
   "description": "Тёмное фэнтези + game-HUD — charcoal, bone, blood, сталь."
  },
  "lilith": {
   "title": "Lilith — Between light & shadow",
   "description": "Оккульт-романтика — forest-green-black, рога, крылья."
  },
  "rosaline": {
   "title": "Rosaline — A story of her own",
   "description": "Романтик-скрапбук — sepia-rose, розы, кружево."
  },
  "seraph": {
   "title": "Seraph — Angel warrior",
   "description": "Ангел-воин — rose-pink, нимб, крылья."
  },
  "salt": {
   "title": "Salt — I turned",
   "description": "Оккульт-постер — burnt-orange/grey, блайндфолд, терн-нимб."
  },
  "deity": {
   "title": "Deity 神 — Self-appointed",
   "description": "Мрамор+золото — статуя-божество, baroque-вейпорвейв."
  },
  "corrosive": {
   "title": "Corrosive — New order",
   "description": "Красный поп-арт скринпринт — рогатая монахиня, пропаганда."
  },
  "handover": {
   "title": "Handover — A new move",
   "description": "Золотой библейский эпик — пророк, огненная колесница."
  },
  "aesthetic": {
   "title": "Aesthetic — Devotion in ink",
   "description": "Готик тату-монахиня — black/blood-red, терн-корона."
  },
  "lover": {
   "title": "Art Is Lover — We are our own creation",
   "description": "Красная статуя-любовники — black/red monochrome."
  },
  "alexander": {
   "title": "Alexander — The Great",
   "description": "Историч-эпик — teal/cream/red, воин на коне."
  },
  "nocturne": {
   "title": "Тьма — Nocturne",
   "description": "Хоррор-журнал — near-black/blood-red, красные глаза."
  },
  "ostpuck": {
   "title": "Ostpuck — The heart is a string",
   "description": "Барокко — warm brown/amber, виолончель, масло."
  },
  "chivalry": {
   "title": "Chivalry — Honor & valor",
   "description": "Готик — crimson/black, шипастая корона, красный лес."
  },
  "chrome": {
   "title": "Chrome — Violetreve",
   "description": "Футуристик-кутюр — silver/chrome + lime, sci-fi."
  },
  "justice": {
   "title": "Justice — Illuminate by design",
   "description": "Вуаль+корона+факел — black/red+bone, script-вордмарк + HUD."
  },
  "ardour": {
   "title": "執意 Ardour — The sacred hunger",
   "description": "Halftone-зин — bone/grey + красный blackletter, монахиня+терн-нимб."
  },
  "": {
   "title": "Story v2 — кино-истории",
   "description": "Кинематографичные стори-сайты: зритель ведёт камеру, сцены перетекают друг в друга."
  }
 }
};

export function pageMeta(family: PageFamily, slug?: string): Metadata {
  const m = TITLES[family][slug ?? ""] ?? TITLES[family][""];
  return { title: m.title, description: m.description };
}
