/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED · 30 ИЛЛЮСТРИРОВАННЫХ МИРОВ — кадровая история (storyboard) + asset-kit.
   Модель Canopy: сайт = рил из 4 сцен, каждая сцена = bg-плита + mid-субъект + fg-полоса,
   слои плывут (dolly+parallax), швы растворяются (feather+silhouette). Затем продающий лендинг.

   Правила арт-дирекшна (MODEL.md): 1 худож.тезис/мир · 1 физика света · палитра 2-3 доминанты
   + CTA-акцент (hex В КАЖДОМ промпте — driver подшивает `style`) · единый медиум (не мешать) ·
   повторяющийся мотив связывает главы · мир больше героя (кино, без зумов вплотную).

   Кадровая арка каждого мира (4 бита): ПРИБЫТИЕ → УГЛУБЛЕНИЕ → ПОВОРОТ/КУЛЬМИНАЦИЯ → РАЗРЕШЕНИЕ.
   Разнообразие: биом · жанр · палитра · время суток · медиум — намеренно разведены, чтобы 30 ≠ один мир ×30.
   ───────────────────────────────────────────────────────────────────────── */

export type Scene = {
  id: string;
  dark?: boolean;      // тёмная сцена (ночь/глубина) — светлая типографика
  bg: string;          // субъект фоновой плиты (edge-to-edge окружение)
  mid: string;         // фокальный субъект среднего плана (вырезка) — «якорь»/мотив
  fg: string;          // нижняя передняя полоса-рамка (вырезка, в тени)
};

export type World = {
  slug: string;
  name: string;
  thesis: string;      // один художественный тезис мира
  motif: string;       // повторяющийся мотив, связывающий 4 сцены
  palette: string[];   // доминанты + CTA-акцент (hex)
  style: string;       // медиум + свет + палитра-hex — подшивается в КАЖДЫЙ промпт
  scenes: [Scene, Scene, Scene, Scene];
};

// общий хвост качества/мягкой вырезки (без указания медиума — медиум задаёт каждый мир)
const Q = "soft brush edges, no hard outline, atmospheric perspective (distant elements paler and cooler, near elements warmer and contrastier), painterly texture, subtle film grain, cohesive committed palette, one consistent light direction, cinematic wide framing, no text, no logos, no watermark";

// хелпер сборки style-строки мира: медиум + свет + палитра
const S = (medium: string, light: string, palette: string[]) =>
  `${medium}, ${light}, cohesive palette (${palette.join(", ")}), ${Q}`;

export const WORLDS: World[] = [
  // 01 ─ TIDEWELL — море: рассвет над обрывом → купель приливов → погружение → всплытие в свет
  {
    slug: "tidewell", name: "Tidewell",
    thesis: "переход от воздуха к воде: один непрерывный вертикальный нырок сквозь свет",
    motif: "столб света, пробивающий воду вниз через все сцены",
    palette: ["#0b3a44 deep teal", "#1f7d86 sea teal", "#e8b7a0 coral blush", "#f2ede0 pearl", "#ff7a59 coral CTA"],
    style: S("luminous painterly gouache seascape illustration", "cool low dawn light from the upper-left, sun just above the horizon", ["#0b3a44", "#1f7d86", "#e8b7a0", "#f2ede0"]),
    scenes: [
      { id: "cliff", bg: "a high sea cliff at dawn overlooking a calm turquoise ocean, layered receding headlands into pearl haze, soft god-rays, wide empty sky", mid: "a lone figure in a windswept coat standing at the cliff edge seen from behind, small human scale, gazing at the sea", fg: "a band of wet dark basalt rocks and tufted sea-grass" },
      { id: "pools", bg: "shallow tide pools over pale sand at the shoreline, gentle ripples, translucent teal water, distant surf line", mid: "a cluster of glassy tide-pool water with anemones and a single wading heron reflected", fg: "a foreground ledge of barnacled rock and kelp strands" },
      { id: "dive", dark: true, bg: "an underwater column of teal water pierced by shafts of dawn light descending, drifting plankton motes, dark deep below", mid: "a diver mid-descent in silhouette trailing bubbles, arms open, backlit by the light column", fg: "swaying dark kelp fronds rising from the bottom edge" },
      { id: "surface", bg: "a view from just under the surface looking up at the rippling silver ceiling and bright coral sunrise beyond", mid: "a school of small fish spiralling toward the light in loose formation", fg: "a foreground fringe of soft coral and sea fans in shadow" },
    ],
  },

  // 02 ─ EMBERROAD — пустыня: караван по дюнам в зной → оазис → песчаная буря → ночной лагерь под звёздами
  {
    slug: "emberroad", name: "Ember Road",
    thesis: "жар дня выцветает в холодную звёздную ночь — путь как смена температуры",
    motif: "одинокая нить каравана, идущая к горизонту",
    palette: ["#c9762f ochre", "#8a3a1f rust", "#e9c88a sand", "#20304f indigo night", "#ffb03a amber CTA"],
    style: S("textured oil-painting desert illustration, warm impasto", "harsh high sun turning to cold moonlight, light from upper-right", ["#c9762f", "#8a3a1f", "#e9c88a", "#20304f"]),
    scenes: [
      { id: "dunes", bg: "vast rolling sand dunes under a bleached hot noon sky, heat shimmer on the ridgelines, a thin distant caravan trail", mid: "a small caravan of two camels and a robed traveler crossing a dune crest, tiny against the scale", fg: "a foreground crest of rippled sand and a dry thorn bush" },
      { id: "oasis", bg: "a green oasis in the dune valley, date palms around a mirror-still pool, cool shade, distant amber cliffs", mid: "resting camels and a lone figure drawing water at the pool edge, reflected", fg: "a band of reeds and cracked clay at the water's edge" },
      { id: "storm", dark: true, bg: "an approaching wall of ochre sandstorm swallowing the dunes, sky turned bruised amber-grey, wind streaks", mid: "the caravan bent against the wind, cloaks whipping, half-lost in blowing sand", fg: "sheets of driven foreground sand and a leaning wind-scoured rock" },
      { id: "camp", dark: true, bg: "a calm desert night, immense field of stars and the milky way over quiet dunes, deep indigo sky", mid: "a small campfire with seated travelers and a tent, warm glow against the cold night", fg: "foreground dune shadow and scattered dark stones" },
    ],
  },

  // 03 ─ LANTERN — горная деревня Азии: туманные террасы → храмовые ворота → ночь фонарей → рассвет у святилища
  {
    slug: "lantern", name: "Lantern",
    thesis: "восхождение к свету: туман дня превращается в рукотворные огни ночи",
    motif: "красный (ворота→фонари→нить→знамя), горящий сквозь холодный туман",
    palette: ["#2f5d4a jade", "#b02a24 vermilion", "#d9b46a gold", "#cfd8cf mist", "#ff5a4a red CTA"],
    style: S("ink-wash and gouache East-Asian mountain illustration, soft misted washes", "cool diffused morning light shifting to warm lantern glow, backlight through mist", ["#2f5d4a", "#b02a24", "#d9b46a", "#cfd8cf"]),
    scenes: [
      { id: "terraces", bg: "misty stepped rice terraces climbing a mountainside at dawn, layers fading into white fog, a few distant rooftops", mid: "a robed pilgrim with a bamboo hat ascending a stone stair between terraces, small scale", fg: "a foreground band of wet terrace grass and a mossy stone marker" },
      { id: "gate", bg: "a weathered vermilion temple gate on a foggy ridge, stone lions, cedar forest receding into haze", mid: "the vermilion gate framed by two ancient pines, a monk sweeping the threshold", fg: "foreground stone steps and fallen red maple leaves in shadow" },
      { id: "festival", dark: true, bg: "a mountain village at night glowing with hundreds of hanging paper lanterns strung between wooden houses, warm haze", mid: "villagers releasing floating lanterns over a dark pond, reflections doubling the light", fg: "foreground dark rooftops and a lantern-strung eave" },
      { id: "shrine", bg: "a small summit shrine at first light above a sea of clouds, prayer bells, cool gold dawn, distant blue peaks", mid: "a stone shrine with a single red banner catching the wind, a bowing figure", fg: "foreground rocky ledge with wind-bent grass and a red cord" },
    ],
  },

  // 04 ─ HOLLOW — фолк-лес: сумеречная чаща → светящаяся роща → встреча с духом → рассветная поляна
  {
    slug: "hollow", name: "Hollow",
    thesis: "биолюминесцентная сказка: тьма не страшна, она светится изнутри",
    motif: "холодное сине-зелёное свечение (грибы→споры→дух→роса), ведущее вглубь",
    palette: ["#10241f deep moss", "#1f8a6a bio teal", "#7ad0c0 glow", "#6a4aa8 violet", "#8affd8 mint CTA"],
    style: S("digital painterly folklore forest illustration, luminous bioluminescence", "near-dark scene lit from within by cool bio-glow, faint violet ambient", ["#10241f", "#1f8a6a", "#7ad0c0", "#6a4aa8"]),
    scenes: [
      { id: "thicket", dark: true, bg: "a dense twilight forest thicket, tangled dark trunks, faint violet dusk between them, deep shadow", mid: "a small wanderer with a dim lantern stepping onto a mossy path, dwarfed by the trees", fg: "foreground ferns and gnarled roots in silhouette" },
      { id: "grove", dark: true, bg: "a glowing grove where mushrooms and moss emit cool teal light, drifting luminous spores in the air", mid: "a ring of giant glowing toadstools around a still dark pool that mirrors the light", fg: "foreground cluster of luminous fungi and curled ferns" },
      { id: "spirit", dark: true, bg: "a deep clearing where a translucent antlered forest spirit stands wreathed in glowing motes, trees leaning in", mid: "a tall luminous stag-spirit of soft light facing the wanderer, gentle and vast", fg: "foreground dark bracken and a fallen mossy log" },
      { id: "dawnwood", bg: "the same forest at first dawn, cool light breaking through the canopy, dew and low mist, the glow fading", mid: "the wanderer walking out toward a bright forest edge, a last few motes drifting", fg: "foreground dewy ferns and a mushroom cap catching dawn" },
    ],
  },

  // 05 ─ FROST — арктика: снежная равнина → ледяная пещера → полярная ночь с сиянием → замёрзшее море
  {
    slug: "frost", name: "Frost",
    thesis: "минимализм холода: белая тишина, прорезанная одной линией цвета — сиянием",
    motif: "одинокая цепочка следов, пересекающая каждую сцену",
    palette: ["#e7eef2 snow", "#9cc0d6 glacial blue", "#3a6a86 deep ice", "#5be0a0 aurora green", "#7affc8 aurora CTA"],
    style: S("soft minimal gouache arctic illustration, wide negative space", "flat cool polar light, faint low sun, then aurora glow from above", ["#e7eef2", "#9cc0d6", "#3a6a86", "#5be0a0"]),
    scenes: [
      { id: "plain", bg: "an immense empty snow plain under a pale low arctic sun, faint blue mountains on the far horizon, wind-carved drifts", mid: "a single fur-hooded figure hauling a small sled across the snow, tiny in the white expanse", fg: "foreground wind-sculpted snow ridge and sparse ice tufts" },
      { id: "cave", dark: true, bg: "the interior of a blue glacier ice cave, translucent walls glowing cyan, a bright opening at the far end", mid: "the figure standing inside the ice cave dwarfed by the glowing blue vault", fg: "foreground jagged ice shards and a frozen puddle" },
      { id: "aurora", dark: true, bg: "a polar night, ribbons of green aurora rippling over a dark snow field and distant peaks, stars", mid: "the figure standing still, head tilted up, silhouetted under the aurora", fg: "foreground snow crust and a lone ice-bound rock" },
      { id: "seaice", bg: "a frozen sea of pale blue ice floes at dawn, cracks glowing faint gold, endless flat horizon", mid: "the figure crossing a bridge of ice between two floes, careful and small", fg: "foreground broken ice plates and refrozen ridges" },
    ],
  },

  // 06 ─ MERIDIAN — город: крыши в золотой час → неоновый переулок ночью → дождь → рассветный силуэт
  {
    slug: "meridian", name: "Meridian",
    thesis: "нуар-город как живой организм: тепло заката тонет в неоне и дожде, потом очищается",
    motif: "одинокая красная неоновая вывеска, отражённая в каждой сцене",
    palette: ["#e08a4a warm brick", "#1a2740 night blue", "#ff3d68 neon rose", "#2fd4d4 neon cyan", "#ff3d68 neon CTA"],
    style: S("cinematic digital painting, neon-noir cityscape illustration", "warm golden-hour sun sinking into artificial neon light, wet reflective surfaces", ["#e08a4a", "#1a2740", "#ff3d68", "#2fd4d4"]),
    scenes: [
      { id: "rooftops", bg: "a sprawling city of rooftops at golden hour, water towers and antennae, warm haze, distant skyline glowing", mid: "a lone figure sitting on a rooftop ledge overlooking the city, back to us, small scale", fg: "foreground rooftop railing, vent pipes and a string of bulbs in shadow" },
      { id: "alley", dark: true, bg: "a narrow rain-slick neon alley at night, glowing signs in cyan and rose, steam from grates, deep perspective", mid: "the figure walking away down the alley under a red neon sign, reflected in the wet ground", fg: "foreground wet pavement, a puddle and dark trash-bins" },
      { id: "rain", dark: true, bg: "a downpour over a neon intersection, streaking rain, blurred headlights and reflected signs, umbrellas", mid: "the figure under a single umbrella at a crossing, neon halo through the rain", fg: "foreground rain-splashed curb and a glowing puddle" },
      { id: "dawncity", bg: "the city at first cool dawn, rain stopped, wet streets mirror a pale peach sky, quiet empty avenue", mid: "the figure walking toward a brightening street, neon signs going dim", fg: "foreground wet crosswalk lines and a lone streetlamp base" },
    ],
  },

  // 07 ─ BLOOMHOUSE — оранжерея: вход → зал орхидей → пруд кувшинок → стеклянный купол к небу
  {
    slug: "bloomhouse", name: "Bloomhouse",
    thesis: "викторианская оранжерея: рукотворная геометрия стекла и дикая органика растений",
    motif: "восходящая линия чугунных арок стекла, ведущая всё выше к свету",
    palette: ["#1f5а3a emerald", "#e8a9b8 blush", "#eef2ea glass white", "#c8963c brass", "#ff8fae rose CTA"],
    style: S("botanical watercolor and gouache greenhouse illustration, delicate washes", "soft diffused daylight through frosted glass, gentle from above", ["#1f5a3a", "#e8a9b8", "#eef2ea", "#c8963c"]),
    scenes: [
      { id: "entry", bg: "the entrance hall of a grand victorian glasshouse, iron arches and misted glass, ferns crowding a stone path", mid: "a visitor in a light coat pausing on the path under towering palms, small scale", fg: "foreground band of potted ferns and mossy terracotta pots" },
      { id: "orchids", bg: "a warm orchid hall, tiers of blush and white orchids climbing iron trellises, soft sunbeams, humid haze", mid: "a hanging cascade of orchids over a brass railing, a butterfly mid-air", fg: "foreground trellis edge dense with orchid blooms and leaves" },
      { id: "lilypond", bg: "an indoor lily pond under glass, giant lily pads on still green water, koi shadows, reflected arches", mid: "a stone footbridge over the lily pond, one figure leaning on its rail", fg: "foreground lily pads, reeds and a lotus at the water's edge" },
      { id: "dome", bg: "looking up inside the great glass dome, climbing vines framing a bright open sky, sunlight flooding down", mid: "the topmost iron ring of the dome wreathed in flowering vine against the sky", fg: "foreground upper vine tendrils and blossoms in shadow" },
    ],
  },

  // 08 ─ EMBERFALL — осенняя долина: кленовый гребень → переправа через реку → сад → закатный урожай
  {
    slug: "emberfall", name: "Emberfall",
    thesis: "осень как медленный пожар: тёплый низкий свет золотит каждый лист",
    motif: "падающие кленовые листья, кружащие через все сцены",
    palette: ["#c25a2a amber", "#8a2f22 rust", "#e0a94a gold", "#3a5a44 pine", "#ff8a3a amber CTA"],
    style: S("warm impressionist gouache autumn illustration, loose golden strokes", "low warm late-afternoon sun raking from the left, long amber shadows", ["#c25a2a", "#8a2f22", "#e0a94a", "#3a5a44"]),
    scenes: [
      { id: "ridge", bg: "a ridge of blazing autumn maples over a valley, layered red-gold forest fading to blue distance, warm haze", mid: "two travelers pausing on the ridge trail beneath a huge red maple, small scale", fg: "foreground band of fallen leaves, ferns and a lichen-covered rock" },
      { id: "river", bg: "a shallow amber river winding through the autumn valley, stepping stones, reflected gold trees, mist off the water", mid: "a figure crossing the river on stepping stones, staff in hand, reflected", fg: "foreground riverbank reeds, wet stones and drifting leaves" },
      { id: "orchard", bg: "a hillside apple orchard heavy with fruit in warm light, ladders and baskets, rows receding into gold haze", mid: "a laden apple tree with a wooden ladder and a basket of red apples", fg: "foreground grass, windfall apples and a woven basket" },
      { id: "harvest", bg: "a valley farmstead at sunset, stacked hay and a barn, sky burning orange, chimney smoke rising", mid: "figures gathered around a harvest cart, warm lamplight beginning to glow", fg: "foreground cut wheat sheaves and a pumpkin in shadow" },
    ],
  },

  // 09 ─ VOYAGE — небо: облачное море на рассвете → парящие острова → грозовой фронт → гавань-город
  {
    slug: "voyage", name: "Voyage",
    thesis: "стимпанк-одиссея в небе: латунь и парус против бескрайнего облачного океана",
    motif: "маленький дирижабль-корабль, пересекающий каждую сцену",
    palette: ["#efe3cf cloud cream", "#4a86b8 sky cerulean", "#c8963c brass", "#3a4a6a storm slate", "#ffb84a brass CTA"],
    style: S("storybook gouache sky-fantasy illustration, whimsical airy strokes", "clear high-altitude dawn light warming to storm gloom, sun from the right", ["#efe3cf", "#4a86b8", "#c8963c", "#3a4a6a"]),
    scenes: [
      { id: "cloudsea", bg: "an ocean of soft dawn clouds seen from above, peach and cream billows to the horizon, pale blue sky", mid: "a small brass-and-canvas airship sailing over the cloud sea, tiny against the vastness", fg: "foreground cloud billows and a frayed rope rigging edge in shadow" },
      { id: "isles", bg: "floating islands drifting in the sky, waterfalls spilling off their undersides into cloud, greenery on top", mid: "the airship approaching a floating isle with a tiny cottage and windmill", fg: "foreground rocky underside of a near floating isle and dangling vines" },
      { id: "storm", dark: true, bg: "a towering dark thunderhead wall with lightning, the airship pitched against churning grey cloud, rain streaks", mid: "the airship listing hard, sails strained, tiny lit windows, against the storm", fg: "foreground torn cloud and a whipping rigging line" },
      { id: "harbor", bg: "a sky-harbor city on a great floating rock at dusk, docked airships, warm windows, brass spires in gold light", mid: "the airship gliding into a lantern-lit sky dock, figures waving", fg: "foreground dock railing, mooring posts and hanging lanterns in shadow" },
    ],
  },

  // 10 ─ MARROW — пещеры: устье → кристальный зал → подземная река → соборный грот
  {
    slug: "marrow", name: "Marrow",
    thesis: "вглубь земли: тьма как объём, в котором каждый кристалл — источник света",
    motif: "фонарь исследователя, единственный тёплый свет среди холодного минерального сияния",
    palette: ["#141018 obsidian", "#6a3aa8 amethyst", "#2f9a9a teal water", "#d8b46a gold vein", "#8a6aff violet CTA"],
    style: S("dark luminous painterly cave illustration, glowing minerals", "near-black scene lit by a warm lantern and cold crystal glow", ["#141018", "#6a3aa8", "#2f9a9a", "#d8b46a"]),
    scenes: [
      { id: "mouth", dark: true, bg: "the mouth of a vast cavern, a shaft of daylight from above hitting a dark stone floor, stalactites in gloom", mid: "an explorer with a raised lantern stepping into the dark cavern, tiny under the arch", fg: "foreground jagged boulders and a dark pool at the cave floor" },
      { id: "crystal", dark: true, bg: "a chamber of giant amethyst crystals glowing violet, faceted walls scattering the lantern light, deep shadow", mid: "the explorer dwarfed among towering purple crystals, lantern reflected in the facets", fg: "foreground cluster of broken crystal shards and dark rock" },
      { id: "river", dark: true, bg: "an underground river of glowing teal water winding through a black stone gorge, mineral light on the ripples", mid: "the explorer on a narrow ledge above the luminous river, lantern held out", fg: "foreground wet dark rock ledge and dripping stalagmites" },
      { id: "cathedral", dark: true, bg: "an immense cathedral-like cavern, gold-veined columns rising into darkness, a single skylight far above", mid: "the explorer standing tiny at the center of the vast cavern floor, lantern a spark", fg: "foreground rubble, a fallen column and a glinting gold vein" },
    ],
  },

  // 11 ─ SEREIN — прованс: холмы лаванды → каменная деревня → погреб → закатная терраса
  {
    slug: "serein", name: "Serein",
    thesis: "средиземноморская нега: пыльный тёплый свет на камне, лаванде и вине",
    motif: "вьющаяся дорожка вдоль стены, ведущая от полей к столу",
    palette: ["#7a8a4a olive", "#9a7ab8 lavender", "#c86a44 terracotta", "#e8dcc0 limestone", "#ff9a5a terracotta CTA"],
    style: S("soft pastel gouache provençal illustration, sun-warmed washes", "warm hazy late-afternoon Mediterranean light, gentle from the left", ["#7a8a4a", "#9a7ab8", "#c86a44", "#e8dcc0"]),
    scenes: [
      { id: "fields", bg: "rolling rows of lavender leading to a hilltop stone farmhouse, cypress trees, warm dusty haze, soft blue hills", mid: "a figure with a basket walking the lavender rows toward the farmhouse, small scale", fg: "foreground lavender stalks, a stone wall and a resting bee-skep" },
      { id: "village", bg: "a narrow stone village lane, ochre walls, blue shutters, climbing bougainvillea, warm shadow and sun", mid: "an arched doorway with a spilling planter, a cat on the warm step", fg: "foreground cobblestones, a wine crate and a terracotta pot" },
      { id: "cellar", dark: true, bg: "a cool stone wine cellar, rows of oak barrels, a single warm lamp, dust motes in a beam of light", mid: "a vintner drawing wine from a barrel by lamplight, warm glow on the stone", fg: "foreground barrel head, glasses and a candle in shadow" },
      { id: "terrace", bg: "a hilltop terrace at sunset, a long table under a fig tree, valley of vineyards glowing gold below", mid: "a laid table with wine and figs under string lights, figures seated", fg: "foreground table edge with bread, grapes and a lit candle" },
    ],
  },

  // 12 ─ NOMAD — степь: травяной простор → табун лошадей → юрточный лагерь → сумеречный перевал
  {
    slug: "nomad", name: "Nomad",
    thesis: "пленэр степи: огромное небо и малый человек, свобода горизонта",
    motif: "линия табуна/каравана, растянутая по горизонту в каждой сцене",
    palette: ["#c9b46a gold grass", "#5a8ac0 steppe sky", "#e8ede0 felt white", "#8a5a3a saddle brown", "#ffcf4a sun CTA"],
    style: S("expansive plein-air gouache steppe illustration, broad open strokes", "big high daylight softening to warm dusk, light from the upper-left", ["#c9b46a", "#5a8ac0", "#e8ede0", "#8a5a3a"]),
    scenes: [
      { id: "grassland", bg: "an endless golden grassland under a huge cloud-streaked blue sky, wind waves in the grass, distant blue ridge", mid: "a lone rider on horseback crossing the grassland, tiny under the vast sky", fg: "foreground tall wind-bent grass and a weathered trail marker cairn" },
      { id: "herd", bg: "a wide plain with a thundering herd of horses raising dust, warm light, low hills beyond", mid: "a cluster of galloping horses led by a herder, dust trailing gold", fg: "foreground churned grass, a coiled rope and wildflowers" },
      { id: "camp", bg: "a nomad camp of white felt yurts in a green valley at soft evening, smoke rising, grazing sheep", mid: "a round white yurt with an open door glowing warm, figures by a cookfire", fg: "foreground grass, a saddle on a rack and a resting dog" },
      { id: "pass", bg: "a mountain pass at dusk, the trail winding up toward jagged peaks, deep blue shadow, last gold on the summits", mid: "the rider ascending the pass toward the peaks, small and resolute", fg: "foreground rocky trail edge, a prayer-flag string and scrub" },
    ],
  },

  // 13 ─ REEF — тропический остров: пляж → джунглевая тропа → лагуна с водопадом → вулканический гребень на закате
  {
    slug: "reef", name: "Reef",
    thesis: "тропический остров как слои жизни: от бирюзы к магме через зелень",
    motif: "изгиб тропы/ручья, ведущий от берега к вершине",
    palette: ["#1fb0b0 turquoise", "#1f6a3a jungle green", "#e8c86a sand gold", "#c8402a magma", "#ff5a3a magma CTA"],
    style: S("vivid saturated gouache tropical illustration, lush strokes", "bright equatorial sun softening to volcanic sunset, warm from the right", ["#1fb0b0", "#1f6a3a", "#e8c86a", "#c8402a"]),
    scenes: [
      { id: "beach", bg: "a crescent of white sand meeting glowing turquoise shallows, palms leaning, a reef line and distant green peak", mid: "a beached outrigger canoe and a wading figure looking toward the interior", fg: "foreground palm fronds, a coconut and beach grass in shadow" },
      { id: "jungle", bg: "a dense green jungle trail with hanging vines and giant leaves, dappled light, a stream threading through", mid: "a figure on the jungle path parting huge leaves, a bright parrot overhead", fg: "foreground monstera leaves, ferns and a mossy stone" },
      { id: "lagoon", bg: "a hidden lagoon with a tall waterfall into a jade pool, mist and rainbow, jungle walls, bright sky slot above", mid: "a figure standing at the pool edge under the falling water and rainbow mist", fg: "foreground wet black rocks, ferns and a fallen flower" },
      { id: "ridge", bg: "a volcanic ridge at sunset above the island, a distant glowing crater, sky burning orange over the sea", mid: "a figure on the black ridge silhouetted against the volcanic sunset", fg: "foreground black lava rock, hardy grass and a smoking fissure" },
    ],
  },

  // 14 ─ SOLSTICE — северная зима: снежный лес → замёрзшее озеро → тёплый очаг хижины → сияние
  {
    slug: "solstice", name: "Solstice",
    thesis: "тепло против холода: путь домой сквозь синюю зиму к оранжевому очагу",
    motif: "тёплый оконный свет хижины, притягивающий сквозь синеву",
    palette: ["#25402f pine", "#b8c8d8 twilight blue", "#e8792a ember", "#7a6a9a lavender dusk", "#ff8a2a ember CTA"],
    style: S("flat cut-paper folk-art nordic illustration, layered paper planes with soft torn edges", "permanent lavender-blue polar twilight against warm interior firelight, flat and graphic", ["#25402f", "#b8c8d8", "#e8792a", "#7a6a9a"]),
    scenes: [
      { id: "snowforest", bg: "a snow-laden pine forest in flat cut-paper style under permanent polar twilight, layered paper trees, soft falling snow, lavender-blue light", mid: "a bundled figure on snowshoes crossing the paper forest with a warm lantern, small scale", fg: "foreground cut-paper snow-heavy pine branch and a buried fence post" },
      { id: "lake", bg: "a frozen lake in cut-paper layers ringed by dark paper pines, pale twilight ice, lavender sky, distant paper peaks", mid: "the figure crossing the frozen lake toward a distant warm light, long flat shadow", fg: "foreground cut-paper snow crust, frozen reeds and a bootprint trail" },
      { id: "hearth", dark: true, bg: "the warm interior of a log cabin in cut-paper style, a crackling stone hearth, layered wooden beams, a frosted window to the twilight", mid: "the figure thawing by the fire in an armchair, warm orange glow, a kettle", fg: "foreground cut-paper hearthstones, a folded blanket and a mug in warm light" },
      { id: "whiteout", bg: "a whiteout snow squall easing around the warm cut-paper cabin, drifting white paper snow clearing to reveal the glowing windows, pines emerging", mid: "the small warm-lit paper cabin as the whiteout clears, smoke from the chimney", fg: "foreground cut-paper snowdrift, a woodpile and a lantern on a post" },
    ],
  },

  // 15 ─ KOI — японский сад: тропа-тории → пруд с карпами → кленовый мост → чайный дом ночью
  {
    slug: "koi", name: "Koi",
    thesis: "сад как замедленное время: тишина воды, камня и клёна, день перетекает в ночь",
    motif: "красный карп/красный клён/красный фонарь — красная нить сквозь зелень",
    palette: ["#3a5a3a moss green", "#b02a24 vermilion", "#d9b46a gold", "#2f3a4a slate night", "#ff5a4a red CTA"],
    style: S("japanese woodblock-inspired gouache garden illustration, flat layered planes", "soft overcast day turning to warm lantern night, gentle diffuse light", ["#3a5a3a", "#b02a24", "#d9b46a", "#2f3a4a"]),
    scenes: [
      { id: "torii", bg: "a mossy stone path leading through a row of vermilion torii gates in a green garden, soft grey sky, maples", mid: "a figure in a robe walking the torii path, small under the red gates", fg: "foreground mossy stones, a stone lantern and clipped shrubs" },
      { id: "pond", bg: "a still koi pond reflecting maples and sky, orange and white koi gliding, a wooden feeding deck", mid: "bright koi swirling beneath the surface around a floating maple leaf", fg: "foreground pond edge with irises, a stone and lily pads" },
      { id: "bridge", bg: "an arched red garden bridge over a stream beneath a huge red maple, stone lanterns, soft afternoon", mid: "the red arched bridge with a figure pausing at its crest under falling leaves", fg: "foreground maple branch heavy with red leaves and mossy rocks" },
      { id: "teahouse", dark: true, bg: "a wooden tea house at night glowing with warm paper-screen light, stone lanterns lit, garden in blue shadow", mid: "the lit tea house with a figure at the open shoji, warm glow on the path", fg: "foreground stepping stones, a lit stone lantern and bamboo" },
    ],
  },

  // 16 ─ ABYSS — затонувший храм В ГЛУБИНЕ (латерально, не спуск): двор → колоннада → идол → рассольный порог
  {
    slug: "abyss", name: "Abyss",
    thesis: "чужая цивилизация на дне: жизнь светится красным во тьме, руины освещены сбоку",
    motif: "красное биолюминесцентное свечение, ведущее вглубь храма (не сверху, а изнутри)",
    palette: ["#0a1822 black brine", "#c8302a red biolum", "#1f6a5a jade", "#d8b46a gold ruin", "#ff4a3a red CTA"],
    style: S("alien painterly deep-water ruins illustration, side-lit and eerie", "near-black deep water lit LATERALLY by red bioluminescence and one cold lantern, NO god-rays from above", ["#0a1822", "#c8302a", "#1f6a5a", "#d8b46a"]),
    scenes: [
      { id: "forecourt", dark: true, bg: "a sunken temple forecourt deep in black-blue water, rows of toppled columns receding sideways, red bioluminescent coral glowing along the stones", mid: "a lone diver moving laterally along the ruined colonnade, cold lantern in hand, small scale", fg: "foreground broken carved stones and red-glowing anemones in shadow" },
      { id: "colonnade", dark: true, bg: "a long flooded colonnade hall in near-black water, lit from the side by drifting red-glowing sea life, a great dark door at the far end", mid: "the diver gliding between the columns toward the distant door, red glow rimming them", fg: "foreground fallen capitals and glowing red tube-worms" },
      { id: "idol", dark: true, bg: "a vast stone idol face half-buried in the temple depths, side-lit, wreathed in a bloom of red bioluminescent jellyfish, gold veins in the stone", mid: "the huge side-lit idol face with the tiny diver hovering before its eye", fg: "foreground coral-crusted rubble and a cluster of red jellyfish" },
      { id: "brinepool", dark: true, bg: "an alien black-brine pool inside the temple whose mercury-like surface shimmers and reflects, red glow around it, a passage onward", mid: "the diver at the edge of the shimmering brine pool, red light doubled in it", fg: "foreground salt-crusted ledge, gold shards and red-glowing polyps" },
    ],
  },

  // 17 ─ HIGHLAND — шотландский верещатник: холмы вереска → озеро → каменные руины → гроза с радугой
  {
    slug: "highland", name: "Highland",
    thesis: "переменчивая погода как драма: свет и тень гонятся по вереску и камню",
    motif: "старая каменная стена/тропа, бегущая через холмы к руине",
    palette: ["#8a5a8a heather", "#4a5a5a slate", "#4a6a3a moss", "#c8a44a gorse gold", "#ffb84a gold CTA"],
    style: S("moody atmospheric oil-painting highland illustration, brooding strokes", "dramatic broken storm light, sun-shafts through heavy cloud from the left", ["#8a5a8a", "#4a5a5a", "#4a6a3a", "#c8a44a"]),
    scenes: [
      { id: "moor", bg: "rolling purple heather moorland under a huge dramatic sky, sun-shafts sweeping the hills, distant blue mountains", mid: "a lone walker on a stone path through the heather, small beneath the sky", fg: "foreground heather clumps, a lichened boulder and a dry-stone wall" },
      { id: "loch", bg: "a still dark loch mirroring brooding clouds and green-brown hills, a thin waterfall on the far slope", mid: "a small rowboat drawn up on the loch shore, one figure at the water's edge", fg: "foreground reeds, wet stones and a mooring post at the shore" },
      { id: "ruin", bg: "a crumbling stone castle ruin on a rise, mist curling around it, rooks circling, breaking light behind", mid: "the roofless ruin with an empty arched window, a figure at its base", fg: "foreground tumbled stones, bracken and a leaning gatepost" },
      { id: "storm", bg: "a passing storm clearing over the hills, a full rainbow arcing above wet green slopes, silver light", mid: "the walker cresting a hill under the rainbow, storm retreating behind", fg: "foreground rain-beaded gorse, a puddle and a stone marker" },
    ],
  },

  // 18 ─ BAZAAR — ночной рынок Шёлкового пути: городские ворота → пряный ряд → площадь фонарей → край пустыни
  {
    slug: "bazaar", name: "Bazaar",
    thesis: "чувственное изобилие: специи, ткани и фонари горят в синих сумерках",
    motif: "ковровая дорожка/гирлянда фонарей, ведущая вглубь рынка",
    palette: ["#d99a2a saffron", "#2f7a7a teal", "#8a2f5a plum", "#e0c890 sand", "#ffb02a saffron CTA"],
    style: S("rich saturated gouache silk-road market illustration, ornate warm strokes", "deep blue dusk lit by warm lanterns and braziers, glowing from within", ["#d99a2a", "#2f7a7a", "#8a2f5a", "#e0c890"]),
    scenes: [
      { id: "gate", bg: "an ornate desert city gate at dusk, tiled arch, camels and merchants entering, warm sky over sand walls", mid: "a hooded merchant leading a laden camel through the tiled gate, small scale", fg: "foreground dusty road, a spice sack and a leaning market sign-post" },
      { id: "spice", dark: true, bg: "a covered spice bazaar aisle at night, pyramids of colored spice, hanging lamps, warm haze and deep shadow", mid: "a spice stall glowing under a lamp, cones of saffron and paprika, a vendor", fg: "foreground open spice sacks, brass scales and scattered pods" },
      { id: "square", dark: true, bg: "a night market square strung with hundreds of glowing lanterns over stalls and rugs, crowd in warm silhouette", mid: "a carpet stall draped with patterned rugs beneath the lantern canopy", fg: "foreground rolled carpets, lanterns and a low tea table in shadow" },
      { id: "edge", dark: true, bg: "the desert edge beyond the city at night, the glowing market behind, dark dunes and a huge starry sky ahead", mid: "a small caravan setting out from the lit city into the dark dunes", fg: "foreground dune shadow, a tethered camel and a lantern on a pole" },
    ],
  },

  // 19 ─ WILDS — саванна: акации на рассвете → водопой → миграция → баобаб на закате
  {
    slug: "wilds", name: "Wilds",
    thesis: "золотая саванна как театр жизни: свет и стада под огромным небом",
    motif: "силуэты животных, растущие по масштабу от рассвета к закату",
    palette: ["#d9a94a savanna gold", "#3a5a3a acacia green", "#c85a2a sunset orange", "#7a5a3a earth", "#ff8a3a sun CTA"],
    style: S("warm golden painterly savanna illustration, dusty light strokes", "low warm African sun, dawn to dust-hazed sunset, raking from the horizon", ["#d9a94a", "#3a5a3a", "#c85a2a", "#7a5a3a"]),
    scenes: [
      { id: "acacia", bg: "a golden savanna at dawn, flat-topped acacia trees, tall grass, warm mist, distant blue escarpment", mid: "a giraffe browsing an acacia in the dawn light, calm and tall", fg: "foreground dry grass tufts, a termite mound and thorn scrub" },
      { id: "waterhole", bg: "a savanna waterhole at morning, reflected sky, animals gathered to drink, acacias around, warm haze", mid: "a herd of zebra and an elephant at the water's edge, reflected", fg: "foreground muddy bank, reeds and hoofprints in shadow" },
      { id: "migration", bg: "a vast plain with a great migration of wildebeest raising dust under a huge sky, distant storm and sun", mid: "a surging line of wildebeest crossing the plain, dust trailing gold", fg: "foreground trampled grass, a lone acacia sapling and a skull" },
      { id: "baobab", bg: "a lone giant baobab tree on the savanna at sunset, sky burning orange, silhouetted birds, long shadows", mid: "the huge baobab silhouetted with weaver nests, a few grazing gazelle", fg: "foreground dark grass, a fallen branch and glowing dust" },
    ],
  },

  // 20 ─ FJORD — норвежский фьорд: обрывы → лодка → водопад → деревня в сумерках
  {
    slug: "fjord", name: "Fjord",
    thesis: "вертикаль севера: чёрная вода между отвесных стен, тихий сдержанный свет",
    motif: "маленькая красная лодка/красный домик — единственный тёплый акцент",
    palette: ["#3a6a86 fjord blue", "#5a6a6a granite", "#3a5a44 moss green", "#b83a2a red boat", "#ff5a3a red CTA"],
    style: S("muted restrained gouache nordic fjord illustration, cool calm washes", "soft overcast northern light softening to blue dusk, flat and diffuse", ["#3a6a86", "#5a6a6a", "#3a5a44", "#b83a2a"]),
    scenes: [
      { id: "cliffs", bg: "sheer granite fjord cliffs plunging into still dark blue water, low cloud caught on the peaks, thin waterfalls", mid: "a tiny red rowboat crossing the vast fjord between the towering walls", fg: "foreground rocky shore, mossy boulders and a coil of net" },
      { id: "boat", bg: "the deck view of the fjord from a small boat, mirror water reflecting the cliffs, mist ahead, gulls", mid: "the red boat's prow and a figure at the oars, cliffs reflected around", fg: "foreground boat gunwale, an oar and a wooden bucket in shadow" },
      { id: "waterfall", bg: "a huge waterfall pouring down a mossy fjord wall into the fjord, spray and rainbow, dark green rock", mid: "the boat dwarfed beneath the thundering waterfall, mist rising", fg: "foreground wet black rocks, ferns and driftwood at the base" },
      { id: "village", bg: "a small fjord village of red and ochre houses on stilts over the water at dusk, warm windows, dark peaks", mid: "the red-house village with a dock, a figure lighting a lantern", fg: "foreground wooden dock planks, mooring posts and a moored boat" },
    ],
  },

  // 21 ─ PILGRIM — Гималаи: долина → мост с флажками → монастырь → рассвет на вершине
  {
    slug: "pilgrim", name: "Pilgrim",
    thesis: "восхождение как молитва: разреженный воздух, камень и золото на снегу",
    motif: "цепочка молитвенных флажков, тянущаяся всё выше",
    palette: ["#8a8a7a stone", "#8a2f2a maroon robe", "#d9b46a gold", "#cfe0e6 snow blue", "#ffb84a gold CTA"],
    style: S("earthy high-altitude gouache himalayan illustration, thin crisp air", "clear cold high-mountain dawn light, strong from the east, long blue shadows", ["#8a8a7a", "#8a2f2a", "#d9b46a", "#cfe0e6"]),
    scenes: [
      { id: "valley", bg: "a high stony himalayan valley at dawn, a river and terraced fields, immense snow peaks catching first gold", mid: "a maroon-robed pilgrim on the valley trail with a walking staff, tiny under the peaks", fg: "foreground rocky trail, a mani stone stack and hardy scrub" },
      { id: "bridge", bg: "a rope-and-plank bridge strung with prayer flags across a deep gorge, river far below, cliffs beyond", mid: "the pilgrim crossing the flag-draped bridge, flags snapping in the wind", fg: "foreground bridge anchor stones, prayer flags and a cliff edge" },
      { id: "monastery", bg: "a white-and-maroon cliffside monastery at altitude, golden roofs, prayer wheels, snow peaks behind, thin banners", mid: "the monastery gate with a monk turning a row of prayer wheels", fg: "foreground stone steps, a butter lamp and a fluttering flag" },
      { id: "summit", bg: "a snow summit ridge at sunrise above a sea of clouds, blazing gold on the peaks, deep blue sky", mid: "the pilgrim reaching the flag-crowned summit cairn, arms lifted, small", fg: "foreground wind-crusted snow, a cairn and prayer flags in shadow" },
    ],
  },

  // 22 ─ CINDERS — Исландия: чёрный пляж → гейзер → лавовое поле → ледник
  {
    slug: "cinders", name: "Cinders",
    thesis: "земля-кузница: чёрный камень, пар и огонь встречают синий лёд",
    motif: "нить пара/дыма, поднимающаяся в холодном воздухе",
    palette: ["#1a1a1f basalt", "#dfe4e6 steam white", "#e8622a ember", "#5aa0c0 glacier blue", "#ff5a2a ember CTA"],
    style: S("dramatic painterly volcanic-iceland illustration, elemental contrast", "flat cold overcast light pierced by glowing lava and hot geyser steam", ["#1a1a1f", "#dfe4e6", "#e8622a", "#5aa0c0"]),
    scenes: [
      { id: "blacksand", bg: "a black volcanic sand beach under a moody grey sky, white surf, basalt sea-stacks, a distant snow volcano", mid: "a lone figure walking the black sand toward the sea-stacks, tiny scale", fg: "foreground black sand ripples, basalt columns and pale driftwood" },
      { id: "geyser", bg: "a geothermal field of steaming vents and blue-green hot springs on black earth, plumes of steam, grey sky", mid: "a tall geyser erupting in a white column, a figure watching at a safe distance", fg: "foreground mineral-crusted pool edge, steam and dark rock" },
      { id: "lava", dark: true, bg: "a night lava field, glowing orange cracks across black rock, a distant erupting vent lighting the smoke", mid: "the figure silhouetted against a glowing lava flow, ember light on them", fg: "foreground cooled black lava, glowing fissures and cinders" },
      { id: "glacier", bg: "a blue glacier tongue meeting black volcanic ground at dawn, ice caves glowing, crevasses, cold clear light", mid: "the figure at the foot of the glacier before a glowing blue ice cave", fg: "foreground broken glacier ice, black gravel and a meltwater stream" },
    ],
  },

  // 23 ─ WILLOW — байу: кипарисы на рассвете → туманный канал → ночь светлячков → рассветная дельта
  {
    slug: "willow", name: "Willow",
    thesis: "медленная вода юга: мох, туман и светлячки в тёплой мгле",
    motif: "свисающий испанский мох, обрамляющий каждую сцену",
    palette: ["#3a5a3a moss green", "#c9a86a gold fog", "#2f6a6a teal water", "#5a4a6a dusk violet", "#ffcf5a firefly CTA"],
    style: S("soft misty gouache bayou illustration, humid hazy washes", "warm hazy dawn light through fog softening to firefly night, low and diffuse", ["#3a5a3a", "#c9a86a", "#2f6a6a", "#5a4a6a"]),
    scenes: [
      { id: "cypress", bg: "a cypress swamp at dawn, moss-draped trees rising from still gold-green water, warm mist, soft light", mid: "a small flat-bottom boat with a figure poling through the cypress, reflected", fg: "foreground cypress knees, lily pads and hanging moss in shadow" },
      { id: "channel", bg: "a narrow misty water channel between mossy trees, thick fog softening the distance, glassy dark water", mid: "the boat gliding into the fog under an arch of moss-hung branches", fg: "foreground reeds, a heron and a half-sunk log at the water's edge" },
      { id: "fireflies", dark: true, bg: "the swamp at night filled with drifting fireflies, moss trees in blue shadow, warm sparks doubled in the water", mid: "the poled boat gliding through a cloud of fireflies, lantern on the bow", fg: "foreground dark reeds, glowing fireflies and a cypress knee" },
      { id: "delta", bg: "the swamp opening into a wide delta at first dawn, mist lifting, pink sky, a distant stilt cabin, calm water", mid: "the boat drifting out onto the open delta toward the cabin, reflected sky", fg: "foreground marsh grass, a mooring stake and drifting mist" },
    ],
  },

  // 24 ─ ASTER — обсерватория: холм под звёздами → телескоп → млечный путь → метеорный рассвет
  {
    slug: "aster", name: "Aster",
    thesis: "малый наблюдатель под великим небом: ночь как глубина, а не тьма",
    motif: "купол обсерватории/линия взгляда вверх, повторённая в каждой сцене",
    palette: ["#1a1f3a indigo", "#c8d0e6 starlight silver", "#6a4aa8 nebula violet", "#d9b46a warm dome", "#8affd8 aurora CTA"],
    style: S("deep painterly night-sky illustration, luminous starfield", "near-dark night lit only by starlight and a warm dome lamp, cool ambient", ["#1a1f3a", "#c8d0e6", "#6a4aa8", "#d9b46a"]),
    scenes: [
      { id: "hilltop", dark: true, bg: "a dark grassy hilltop under a vast starry sky, a small domed observatory glowing warm, distant town lights", mid: "a figure climbing the hill path toward the lit observatory dome, tiny", fg: "foreground grass, a fence stile and a signpost in silhouette" },
      { id: "telescope", dark: true, bg: "the interior of the observatory dome open to the night, a great brass telescope aimed at the stars, warm lamp", mid: "the astronomer at the eyepiece of the brass telescope, dome slot to the sky", fg: "foreground desk with star charts, a lamp and brass instruments" },
      { id: "milkyway", dark: true, bg: "the full milky way blazing over dark mountains, thousands of stars, faint nebula color, deep silence", mid: "the tiny lit observatory on its hill beneath the immense galactic arch", fg: "foreground dark ridge, wind-bent grass and a lone pine silhouette" },
      { id: "meteor", dark: true, bg: "the night sky just before dawn with a meteor shower streaking down, horizon glowing faint violet-gold", mid: "the figure lying on the hilltop watching meteors, arms behind head", fg: "foreground grass, a blanket and a thermos in low silhouette" },
    ],
  },

  // 25 ─ TERRAZZO — греческий остров: деревня на обрыве → синие купола → лестница к морю → закатная гавань
  {
    slug: "terrazzo", name: "Terrazzo",
    thesis: "средиземноморский свет: слепящая белизна, синь и розовый цвет над морем",
    motif: "спускающаяся лестница/тропа от деревни к воде",
    palette: ["#f0ece2 whitewash", "#2f7ac0 aegean blue", "#e06a8a bougainvillea", "#d9b46a sun stone", "#ff6a8a pink CTA"],
    style: S("bright crisp gouache mediterranean illustration, sun-bleached flat planes", "brilliant clear Mediterranean midday sun, sharp warm light and cool shadow", ["#f0ece2", "#2f7ac0", "#e06a8a", "#d9b46a"]),
    scenes: [
      { id: "village", bg: "a whitewashed cliff village tumbling down toward a deep blue sea, blue-domed church, bright sun, sharp shadows", mid: "a figure on a white terrace overlooking the sea, small among the cubes", fg: "foreground white steps, a spilling bougainvillea and a blue door" },
      { id: "domes", bg: "a cluster of blue-domed white chapels against a cloudless sky over the Aegean, bells, dazzling light", mid: "a blue dome and bell arch framed by white walls, a cat on a step", fg: "foreground whitewashed wall, potted geraniums and a painted railing" },
      { id: "steps", bg: "a long white stair descending a cliff to a turquoise cove, fishing boats, dazzling reflections", mid: "a figure descending the white sea-steps toward the boats far below", fg: "foreground white steps, a fishing net and an urn of flowers" },
      { id: "harbor", bg: "a small island harbor at sunset, painted fishing boats, tavernas glowing, pink and gold sky over calm sea", mid: "a moored blue-and-white boat with a fisher coiling rope, warm reflections", fg: "foreground stone quay, mooring bollards and a coil of net" },
    ],
  },

  // 26 ─ COCOA — амазонка: полог → река → роща с ара → водопад
  {
    slug: "cocoa", name: "Cocoa",
    thesis: "плотный зелёный собор джунглей: свет пробивается редкими копьями",
    motif: "спираль реки/лианы, уводящая вглубь зелени",
    palette: ["#14401f deep green", "#c8402a macaw red", "#d9b44a gold light", "#1f6a5a jade river", "#ff5a3a macaw CTA"],
    style: S("lush dense painterly rainforest illustration, layered canopy strokes", "rare shafts of hot sunlight piercing a dim green canopy from high above", ["#14401f", "#c8402a", "#d9b44a", "#1f6a5a"]),
    scenes: [
      { id: "canopy", bg: "the high rainforest canopy at dawn, endless green treetops and mist, sun-shafts, a distant river bend", mid: "a figure on a rope canopy walkway among the treetops, a toucan nearby", fg: "foreground giant leaves, epiphytes and a hanging vine in shadow" },
      { id: "river", bg: "a jade jungle river winding through dense green walls, dappled light, mist, a dugout wake on the water", mid: "a dugout canoe with a figure paddling up the green river, reflected", fg: "foreground riverbank ferns, a caiman log and drooping leaves" },
      { id: "macaws", bg: "a bright break in the canopy where scarlet macaws gather at a clay lick, red against green, hot light", mid: "a flock of scarlet macaws flying up from the clay bank in a red burst", fg: "foreground jungle leaves, a bromeliad and a mossy branch" },
      { id: "emergence", bg: "bursting up through the emergent treetops at dusk ABOVE a distant thunderstorm, a green sea of canopy below with lightning far off, moody violet-green sky", mid: "a figure on the highest emergent tree limb above the cloud, macaws wheeling around", fg: "foreground emergent treetop leaves, epiphytes and a hornbill silhouette" },
    ],
  },

  // 27 ─ QUILL — современная академия (НЕ пергамент/латунь): аллея → библиотека → уголок → двор в сумерках
  {
    slug: "quill", name: "Quill",
    thesis: "холодный ясный интеллект: чернила, известняк и электрический ультрамарин лампы знаний",
    motif: "электрический ультрамариновый свет лампы, единственный тёплый-холодный акцент",
    palette: ["#14171a ink black", "#c8ccc0 cold limestone", "#3a7a6a oxidized copper", "#3a4ae8 ultramarine lamp", "#4a5aff ultramarine CTA"],
    style: S("cool painterly modern-academia illustration, ink-and-stone tones with electric lamp accents", "cold overcast daylight against electric ultramarine lamplight, crisp and cool", ["#14171a", "#c8ccc0", "#3a7a6a", "#3a4ae8"]),
    scenes: [
      { id: "avenue", bg: "a university avenue of pale limestone buildings with oxidized copper roofs under cold overcast light, bare trees, a few students", mid: "a student with books walking the cold stone avenue, small under the architecture", fg: "foreground wet flagstones, a black iron lamp post and a stone bench" },
      { id: "library", dark: true, bg: "a grand modern library interior in ink and stone, towering dark shelves, rows of electric ultramarine-glowing lamps, a spiral stair", mid: "a reader at a long table under an electric ultramarine lamp, stacks of books", fg: "foreground desk edge with an open book, a pen and a glowing lamp" },
      { id: "nook", dark: true, bg: "a cool reading nook by a tall rain-streaked window at dusk, a dark chair, book stacks, one ultramarine lamp glowing", mid: "a figure in the chair reading, cool ultramarine lamp glow, blue dusk outside", fg: "foreground side table with a cup, a stacked book and glasses" },
      { id: "courtyard", bg: "a cloistered limestone courtyard at blue dusk, copper-green trim, cool-lit windows, a single bare tree, wet stone", mid: "the courtyard with an ultramarine-lit archway and a figure crossing, long shadow", fg: "foreground cloister arch, wet flagstones and a copper urn in shadow" },
    ],
  },

  // 28 ─ HALCYON — современный весенний речной фестиваль (НЕ Япония): аллея-парк → река со стримерами → лужайка → закатная набережная
  {
    slug: "halcyon", name: "Halcyon",
    thesis: "современная весна в городе: цветение, бумажные стримеры и людный фестиваль под cyan-небом",
    motif: "плывущие лепестки и бумажные ленты-стримеры, кружащие сквозь все сцены",
    palette: ["#f0b8c8 blush pink", "#a8d84a chartreuse", "#4ac0e0 cyan sky", "#e86a9a rose", "#ff5a9a pink CTA"],
    style: S("delicate airy gouache contemporary spring-festival illustration, fresh modern strokes", "bright breezy spring daylight, clean cyan sky with cool acid-chartreuse shadows", ["#f0b8c8", "#a8d84a", "#4ac0e0", "#e86a9a"]),
    scenes: [
      { id: "avenue", bg: "a modern city park avenue of blossoming trees in full bloom, festival bunting and food carts, drifting petals, clean cyan sky", mid: "people strolling the blossom avenue under bunting and falling petals, small scale", fg: "foreground blossom branch, a striped food cart and a petal-strewn path" },
      { id: "river", bg: "a city river carrying drifts of pink petals and paper streamers beneath a modern footbridge, chartreuse spring banks", mid: "small paper festival boats and streamers swirling on the water under the bridge", fg: "foreground riverbank blossoms, a railing hung with paper streamers" },
      { id: "lawn", bg: "a sunny festival lawn under blossoming trees, picnic blankets, bunting and paper lanterns strung overhead, cyan sky", mid: "groups on picnic blankets and a food stall under the blossoms, lively", fg: "foreground blanket edge, a basket, paper cups and scattered petals" },
      { id: "riverside", bg: "a riverside promenade at spring sunset, warm pink-gold light, string lights coming on, a crowd, blossoming trees", mid: "the festival crowd along the lit riverside at dusk under falling petals", fg: "foreground promenade railing, string lights and a petal-strewn bench" },
    ],
  },

  // 29 ─ DUNES — Намиб: графичные дюны в зной → одинокое дерево → гребень тени → закат
  {
    slug: "dunes", name: "Dunes",
    thesis: "минимализм пустыни как графика: линия гребня режет свет и тень надвое",
    motif: "острая диагональ гребня дюны, делящая кадр на свет/тень",
    palette: ["#e8a15a apricot", "#a8482a rust dune", "#2f3a6a cobalt shadow", "#e0c890 pale pan", "#ffb04a sun CTA"],
    style: S("minimal graphic gouache desert illustration, bold clean planes", "stark high sun creating a hard split of sunlit apricot and cool cobalt shadow", ["#e8a15a", "#a8482a", "#2f3a6a", "#e0c890"]),
    scenes: [
      { id: "ridgeline", bg: "a vast minimalist desert of towering apricot dunes, one sharp sunlit ridge dividing light and cobalt shadow", mid: "a single tiny figure walking the knife-edge dune ridge against the sky", fg: "foreground rippled sunlit sand and a sharp shadow edge" },
      { id: "tree", bg: "a lone dead camelthorn tree on a pale clay pan ringed by red dunes, stark blue sky, hard shadow", mid: "the black skeletal tree standing alone on the cracked white pan", fg: "foreground cracked clay plates and a thin dune shadow" },
      { id: "crest", bg: "an intimate view of a single great dune crest, wind ripples catching light, a smoking veil of blown sand", mid: "wind lifting a veil of golden sand off the sharp dune crest", fg: "foreground rippled sand ridge and a buried bleached bone" },
      { id: "sunset", bg: "the desert at sunset, dunes glowing deep orange-red, long cobalt shadows, a huge simple sky", mid: "the tiny figure descending a glowing dune into deep blue shadow", fg: "foreground dark dune flank, glowing rim and rippled sand" },
    ],
  },

  // 30 ─ LUMEN — прибрежный маяк: штормовой мыс → бухта → луч маяка в ночи → рассвет после шторма
  {
    slug: "lumen", name: "Lumen",
    thesis: "маяк как надежда: единственный тёплый луч режет холодный шторм и тьму",
    motif: "вращающийся золотой луч маяка, ведущий сквозь бурю к рассвету",
    palette: ["#2f3a4a storm slate", "#d9b44a beam gold", "#e8eef0 foam white", "#1f4a5a deep sea", "#ffcf4a beam CTA"],
    style: S("dramatic painterly coastal-storm illustration, turbulent atmospheric strokes", "cold stormy dark pierced by a warm rotating lighthouse beam, dramatic contrast", ["#2f3a4a", "#d9b44a", "#e8eef0", "#1f4a5a"]),
    scenes: [
      { id: "cape", dark: true, bg: "a stormy rocky cape under bruised grey sky, huge waves crashing white on black rocks, a lighthouse on the point", mid: "a lone figure in oilskins on the cliff path toward the lighthouse, bent against wind", fg: "foreground wet black rocks, sea-spray and windblown grass" },
      { id: "cove", dark: true, bg: "a sheltered cove below the storm, a wrecked boat on the shingle, cliffs, rain easing, grey-green sea", mid: "the figure reaching a small stone boathouse in the cove, lantern lit", fg: "foreground shingle beach, driftwood and a beached hull in shadow" },
      { id: "beam", dark: true, bg: "the lighthouse at night in the storm, its warm golden beam sweeping across driving rain and black waves", mid: "the tall lighthouse with its glowing lamp room, beam cutting the dark", fg: "foreground rain-lashed rocks, foam and a mooring ring" },
      { id: "dawn", bg: "the coast at calm dawn after the storm, pink sky, glassy sea, the lighthouse pale, gulls, wet shining rocks", mid: "the figure on the rocks watching the sunrise, the quiet lighthouse behind", fg: "foreground tide-pool rocks, kelp and a stranded starfish" },
    ],
  },
];

export const A_ROOT = "public/uploads/1/animated"; // <slug>/ per world
