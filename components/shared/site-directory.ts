/* СГЕНЕРИРОВАНО scripts/gen-site-directory.ts — не править руками. Все витрины по семьям для главного меню.
   Имя/обещание — из <title> страницы, превью — первый экран (public/menu). */

export type SiteItem = { id: string; href: string; name: string; note: string; thumb: string };
export type SiteGroup = { label: string; items: SiteItem[] };
export type SiteFamily = { key: string; label: string; href: string; blurb: string; groups: SiteGroup[] };

export const SITE_FAMILIES: SiteFamily[] = [
 {
  "key": "worlds",
  "label": "Миры",
  "href": "/animated/worlds",
  "blurb": "Иллюстрированные сайты-фильмы: актёр ведёт через сцены, свет и погода текут по всей странице.",
  "groups": [
   {
    "label": "Миры",
    "items": [
     {
      "id": "tidewell",
      "href": "/animated/w-tidewell",
      "name": "Tidewell",
      "note": "Go down to the quiet.",
      "thumb": "/menu/reel-tidewell.webp"
     },
     {
      "id": "abyss",
      "href": "/animated/w-abyss",
      "name": "Rubrica",
      "note": "It glows because something remembers.",
      "thumb": "/menu/reel-abyss.webp"
     },
     {
      "id": "aster",
      "href": "/animated/w-aster",
      "name": "Apogee",
      "note": "Come this close to the stars.",
      "thumb": "/menu/reel-aster.webp"
     },
     {
      "id": "bazaar",
      "href": "/animated/w-bazaar",
      "name": "Lantern road",
      "note": "Follow the lanterns in.",
      "thumb": "/menu/reel-bazaar.webp"
     },
     {
      "id": "bloomhouse",
      "href": "/animated/w-bloomhouse",
      "name": "Bloomhouse",
      "note": "Step into the light.",
      "thumb": "/menu/reel-bloomhouse.webp"
     },
     {
      "id": "cinders",
      "href": "/animated/w-cinders",
      "name": "Hraun",
      "note": "Walk the line between fire and ice.",
      "thumb": "/menu/reel-cinders.webp"
     },
     {
      "id": "cocoa",
      "href": "/animated/w-cocoa",
      "name": "Arara",
      "note": "Climb into the green cathedral.",
      "thumb": "/menu/reel-cocoa.webp"
     },
     {
      "id": "dunes",
      "href": "/animated/w-dunes",
      "name": "Sossus",
      "note": "Stand where the light splits in two.",
      "thumb": "/menu/reel-dunes.webp"
     },
     {
      "id": "emberfall",
      "href": "/animated/w-emberfall",
      "name": "Emberfall",
      "note": "Where the valley learns to burn.",
      "thumb": "/menu/reel-emberfall.webp"
     },
     {
      "id": "emberroad",
      "href": "/animated/w-emberroad",
      "name": "Amberline",
      "note": "Walk until the heat breaks.",
      "thumb": "/menu/reel-emberroad.webp"
     },
     {
      "id": "fjord",
      "href": "/animated/w-fjord",
      "name": "Fjordro",
      "note": "Go quiet between the walls.",
      "thumb": "/menu/reel-fjord.webp"
     },
     {
      "id": "frost",
      "href": "/animated/w-frost",
      "name": "Farline",
      "note": "Empty is the whole point.",
      "thumb": "/menu/reel-frost.webp"
     },
     {
      "id": "halcyon",
      "href": "/animated/w-halcyon",
      "name": "Petalfare",
      "note": "Follow the petals down.",
      "thumb": "/menu/reel-halcyon.webp"
     },
     {
      "id": "highland",
      "href": "/animated/w-highland",
      "name": "Drystane",
      "note": "Walk until the sky changes its mind.",
      "thumb": "/menu/reel-highland.webp"
     },
     {
      "id": "hollow",
      "href": "/animated/w-hollow",
      "name": "Hollow",
      "note": "Walk into the glow.",
      "thumb": "/menu/reel-hollow.webp"
     },
     {
      "id": "koi",
      "href": "/animated/w-koi",
      "name": "Koian",
      "note": "Four gates, one long exhale.",
      "thumb": "/menu/reel-koi.webp"
     },
     {
      "id": "lantern",
      "href": "/animated/w-lantern",
      "name": "Redthread",
      "note": "A red thread through the mist.",
      "thumb": "/menu/reel-lantern.webp"
     },
     {
      "id": "lumen",
      "href": "/animated/w-lumen",
      "name": "Farlight",
      "note": "Hold the last light.",
      "thumb": "/menu/reel-lumen.webp"
     },
     {
      "id": "marrow",
      "href": "/animated/w-marrow",
      "name": "Marrow",
      "note": "Bring the only warm light.",
      "thumb": "/menu/reel-marrow.webp"
     },
     {
      "id": "meridian",
      "href": "/animated/w-meridian",
      "name": "Meridian",
      "note": "Meet the city before neon wins.",
      "thumb": "/menu/reel-meridian.webp"
     },
     {
      "id": "nomad",
      "href": "/animated/w-nomad",
      "name": "Windmane",
      "note": "Forty horses. One horizon.",
      "thumb": "/menu/reel-nomad.webp"
     },
     {
      "id": "pilgrim",
      "href": "/animated/w-pilgrim",
      "name": "Lungta",
      "note": "The climb is the prayer.",
      "thumb": "/menu/reel-pilgrim.webp"
     },
     {
      "id": "quill",
      "href": "/animated/w-quill",
      "name": "Quill",
      "note": "Think in full sentences again.",
      "thumb": "/menu/reel-quill.webp"
     },
     {
      "id": "reef",
      "href": "/animated/w-reef",
      "name": "Craterline",
      "note": "Walk the whole island, once.",
      "thumb": "/menu/reel-reef.webp"
     },
     {
      "id": "serein",
      "href": "/animated/w-serein",
      "name": "Sentier",
      "note": "Follow the wall to the table.",
      "thumb": "/menu/reel-serein.webp"
     },
     {
      "id": "solstice",
      "href": "/animated/w-solstice",
      "name": "Glød",
      "note": "Come home to the fire.",
      "thumb": "/menu/reel-solstice.webp"
     },
     {
      "id": "terrazzo",
      "href": "/animated/w-terrazzo",
      "name": "Meltemi",
      "note": "Whitewash above. Turquoise below.",
      "thumb": "/menu/reel-terrazzo.webp"
     },
     {
      "id": "voyage",
      "href": "/animated/w-voyage",
      "name": "Cloudwright",
      "note": "Cross an ocean with no shore.",
      "thumb": "/menu/reel-voyage.webp"
     },
     {
      "id": "wilds",
      "href": "/animated/w-wilds",
      "name": "Veldlight",
      "note": "Chase the light, not the checklist.",
      "thumb": "/menu/reel-wilds.webp"
     },
     {
      "id": "willow",
      "href": "/animated/w-willow",
      "name": "Moss & Lantern",
      "note": "Slow down to bayou time.",
      "thumb": "/menu/reel-willow.webp"
     },
     {
      "id": "canopy",
      "href": "/animated/m-canopy",
      "name": "Canopy",
      "note": "Walk into the quiet.",
      "thumb": "/menu/reel-canopy.webp"
     }
    ]
   }
  ]
 },
 {
  "key": "stories",
  "label": "Кино-истории",
  "href": "/story2",
  "blurb": "Сторис-сайты для личного бренда, портфолио и артиста — зритель сам ведёт камеру из сцены в сцену.",
  "groups": [
   {
    "label": "Кино-истории",
    "items": [
     {
      "id": "portfolio",
      "href": "/story2/portfolio",
      "name": "Portfolio",
      "note": "Marina Voss",
      "thumb": "/menu/story2-portfolio.webp"
     },
     {
      "id": "punk",
      "href": "/story2/punk",
      "name": "Big Fn Life",
      "note": "Madeline",
      "thumb": "/menu/story2-punk.webp"
     },
     {
      "id": "scarlet",
      "href": "/story2/scarlet",
      "name": "緋 Scarlet",
      "note": "Tokyo Underground",
      "thumb": "/menu/story2-scarlet.webp"
     },
     {
      "id": "forlorn",
      "href": "/story2/forlorn",
      "name": "Forlorn",
      "note": "Roderika",
      "thumb": "/menu/story2-forlorn.webp"
     },
     {
      "id": "lilith",
      "href": "/story2/lilith",
      "name": "Lilith",
      "note": "Between light & shadow",
      "thumb": "/menu/story2-lilith.webp"
     },
     {
      "id": "rosaline",
      "href": "/story2/rosaline",
      "name": "Rosaline",
      "note": "A story of her own",
      "thumb": "/menu/story2-rosaline.webp"
     },
     {
      "id": "seraph",
      "href": "/story2/seraph",
      "name": "Seraph",
      "note": "Angel warrior",
      "thumb": "/menu/story2-seraph.webp"
     },
     {
      "id": "salt",
      "href": "/story2/salt",
      "name": "Salt",
      "note": "I turned",
      "thumb": "/menu/story2-salt.webp"
     },
     {
      "id": "deity",
      "href": "/story2/deity",
      "name": "Deity 神",
      "note": "Self-appointed",
      "thumb": "/menu/story2-deity.webp"
     },
     {
      "id": "corrosive",
      "href": "/story2/corrosive",
      "name": "Corrosive",
      "note": "New order",
      "thumb": "/menu/story2-corrosive.webp"
     },
     {
      "id": "handover",
      "href": "/story2/handover",
      "name": "Handover",
      "note": "A new move",
      "thumb": "/menu/story2-handover.webp"
     },
     {
      "id": "aesthetic",
      "href": "/story2/aesthetic",
      "name": "Aesthetic",
      "note": "Devotion in ink",
      "thumb": "/menu/story2-aesthetic.webp"
     },
     {
      "id": "lover",
      "href": "/story2/lover",
      "name": "Art Is Lover",
      "note": "We are our own creation",
      "thumb": "/menu/story2-lover.webp"
     },
     {
      "id": "alexander",
      "href": "/story2/alexander",
      "name": "Alexander",
      "note": "The Great",
      "thumb": "/menu/story2-alexander.webp"
     },
     {
      "id": "nocturne",
      "href": "/story2/nocturne",
      "name": "Тьма",
      "note": "Nocturne",
      "thumb": "/menu/story2-nocturne.webp"
     },
     {
      "id": "ostpuck",
      "href": "/story2/ostpuck",
      "name": "Ostpuck",
      "note": "The heart is a string",
      "thumb": "/menu/story2-ostpuck.webp"
     },
     {
      "id": "chivalry",
      "href": "/story2/chivalry",
      "name": "Chivalry",
      "note": "Honor & valor",
      "thumb": "/menu/story2-chivalry.webp"
     },
     {
      "id": "chrome",
      "href": "/story2/chrome",
      "name": "Chrome",
      "note": "Violetreve",
      "thumb": "/menu/story2-chrome.webp"
     },
     {
      "id": "justice",
      "href": "/story2/justice",
      "name": "Justice",
      "note": "Illuminate by design",
      "thumb": "/menu/story2-justice.webp"
     },
     {
      "id": "ardour",
      "href": "/story2/ardour",
      "name": "執意 Ardour",
      "note": "The sacred hunger",
      "thumb": "/menu/story2-ardour.webp"
     }
    ]
   }
  ]
 },
 {
  "key": "business",
  "label": "Бизнес-сайты",
  "href": "/visual-hooks/sites",
  "blurb": "Сайты малого бизнеса: продукт — главный герой от первого экрана до заявки.",
  "groups": [
   {
    "label": "Бизнес-сайты",
    "items": [
     {
      "id": "forge",
      "href": "/visual-hooks/forge",
      "name": "Forge",
      "note": "Forged not made",
      "thumb": "/menu/biz-forge.webp"
     },
     {
      "id": "vessel",
      "href": "/visual-hooks/vessel",
      "name": "Vessel",
      "note": "Cloth that moves like it means it",
      "thumb": "/menu/biz-vessel.webp"
     },
     {
      "id": "phantom",
      "href": "/visual-hooks/phantom",
      "name": "Phantom",
      "note": "Nothing for miles",
      "thumb": "/menu/biz-phantom.webp"
     },
     {
      "id": "horologe",
      "href": "/visual-hooks/horologe",
      "name": "Horologe",
      "note": "A little galaxy on your wrist",
      "thumb": "/menu/biz-horologe.webp"
     },
     {
      "id": "lume",
      "href": "/visual-hooks/lume",
      "name": "Lume",
      "note": "Light, set to be kept",
      "thumb": "/menu/biz-lume.webp"
     },
     {
      "id": "mono",
      "href": "/visual-hooks/mono",
      "name": "Mono",
      "note": "A house that disappears into its lake",
      "thumb": "/menu/biz-mono.webp"
     },
     {
      "id": "haven",
      "href": "/visual-hooks/haven",
      "name": "Haven",
      "note": "Where the pool forgets the sea",
      "thumb": "/menu/biz-haven.webp"
     },
     {
      "id": "tide",
      "href": "/visual-hooks/tide",
      "name": "Tide",
      "note": "The cold does the work",
      "thumb": "/menu/biz-tide.webp"
     },
     {
      "id": "canto",
      "href": "/visual-hooks/canto",
      "name": "Canto",
      "note": "Music, with the weight put back in",
      "thumb": "/menu/biz-canto.webp"
     },
     {
      "id": "atlas",
      "href": "/visual-hooks/atlas",
      "name": "Atlas",
      "note": "Made for where the map ends",
      "thumb": "/menu/biz-atlas.webp"
     },
     {
      "id": "noct",
      "href": "/visual-hooks/noct",
      "name": "Noct",
      "note": "Wine that tastes of somewhere",
      "thumb": "/menu/biz-noct.webp"
     },
     {
      "id": "roast",
      "href": "/visual-hooks/roast",
      "name": "Roast",
      "note": "Coffee has a peak. We ship you the peak",
      "thumb": "/menu/biz-roast.webp"
     },
     {
      "id": "steep",
      "href": "/visual-hooks/steep",
      "name": "Steep",
      "note": "Whole-leaf tea from named gardens",
      "thumb": "/menu/biz-steep.webp"
     },
     {
      "id": "loaf",
      "href": "/visual-hooks/loaf",
      "name": "Loaf",
      "note": "Wood-fired sourdough, baked daily",
      "thumb": "/menu/biz-loaf.webp"
     },
     {
      "id": "plat",
      "href": "/visual-hooks/plat",
      "name": "Plat",
      "note": "A twelve-seat tasting kitchen",
      "thumb": "/menu/biz-plat.webp"
     },
     {
      "id": "sol",
      "href": "/visual-hooks/sol",
      "name": "Sol",
      "note": "Your roof already catches the sun",
      "thumb": "/menu/biz-sol.webp"
     },
     {
      "id": "dew",
      "href": "/visual-hooks/dew",
      "name": "Dew",
      "note": "Everything your skin actually needs",
      "thumb": "/menu/biz-dew.webp"
     },
     {
      "id": "balm",
      "href": "/visual-hooks/balm",
      "name": "Balm",
      "note": "A single-room day spa",
      "thumb": "/menu/biz-balm.webp"
     },
     {
      "id": "stem",
      "href": "/visual-hooks/stem",
      "name": "Stem",
      "note": "Considered floristry, made to say something",
      "thumb": "/menu/biz-stem.webp"
     },
     {
      "id": "clay",
      "href": "/visual-hooks/clay",
      "name": "Clay",
      "note": "Wheel-thrown tableware",
      "thumb": "/menu/biz-clay.webp"
     },
     {
      "id": "form",
      "href": "/visual-hooks/form",
      "name": "Form",
      "note": "One chair. Nothing spare",
      "thumb": "/menu/biz-form.webp"
     },
     {
      "id": "velo",
      "href": "/visual-hooks/velo",
      "name": "Vélo",
      "note": "Made-to-measure steel bicycles",
      "thumb": "/menu/biz-velo.webp"
     },
     {
      "id": "thread",
      "href": "/visual-hooks/thread",
      "name": "Thread",
      "note": "Made-to-measure tailoring",
      "thumb": "/menu/biz-thread.webp"
     },
     {
      "id": "barb",
      "href": "/visual-hooks/barb",
      "name": "Barb",
      "note": "A one-chair barbershop",
      "thumb": "/menu/biz-barb.webp"
     },
     {
      "id": "ledger",
      "href": "/visual-hooks/ledger",
      "name": "Ledger",
      "note": "Money, made quiet",
      "thumb": "/menu/biz-ledger.webp"
     },
     {
      "id": "iron",
      "href": "/visual-hooks/iron",
      "name": "Iron",
      "note": "A small, serious strength gym",
      "thumb": "/menu/biz-iron.webp"
     },
     {
      "id": "swell",
      "href": "/visual-hooks/swell",
      "name": "Swell",
      "note": "Hand-shaped surfboards",
      "thumb": "/menu/biz-swell.webp"
     },
     {
      "id": "nib",
      "href": "/visual-hooks/nib",
      "name": "Nib",
      "note": "Fountain pens, ink and paper",
      "thumb": "/menu/biz-nib.webp"
     },
     {
      "id": "wick",
      "href": "/visual-hooks/wick",
      "name": "Wick",
      "note": "Hand-poured candles",
      "thumb": "/menu/biz-wick.webp"
     },
     {
      "id": "fern",
      "href": "/visual-hooks/fern",
      "name": "Fern",
      "note": "The right plant for your light",
      "thumb": "/menu/biz-fern.webp"
     },
     {
      "id": "fetch",
      "href": "/visual-hooks/fetch",
      "name": "Fetch",
      "note": "A considered box for one specific dog",
      "thumb": "/menu/biz-fetch.webp"
     },
     {
      "id": "cacao",
      "href": "/visual-hooks/cacao",
      "name": "Cacao",
      "note": "Single-origin bean-to-bar chocolate",
      "thumb": "/menu/biz-cacao.webp"
     },
     {
      "id": "hide",
      "href": "/visual-hooks/hide",
      "name": "Hide",
      "note": "Vegetable-tanned leather goods",
      "thumb": "/menu/biz-hide.webp"
     },
     {
      "id": "comb",
      "href": "/visual-hooks/comb",
      "name": "Comb",
      "note": "Raw honey, one hive at a time",
      "thumb": "/menu/biz-comb.webp"
     },
     {
      "id": "spice",
      "href": "/visual-hooks/spice",
      "name": "Spice",
      "note": "Whole spices, freshly harvested",
      "thumb": "/menu/biz-spice.webp"
     },
     {
      "id": "lens",
      "href": "/visual-hooks/lens",
      "name": "Lens",
      "note": "Film portraiture, printed by hand",
      "thumb": "/menu/biz-lens.webp"
     },
     {
      "id": "wax",
      "href": "/visual-hooks/wax",
      "name": "Wax",
      "note": "An independent record shop",
      "thumb": "/menu/biz-wax.webp"
     },
     {
      "id": "spine",
      "href": "/visual-hooks/spine",
      "name": "Spine",
      "note": "An independent bookshop",
      "thumb": "/menu/biz-spine.webp"
     },
     {
      "id": "cask",
      "href": "/visual-hooks/cask",
      "name": "Cask",
      "note": "Single-cask, cask-strength whisky",
      "thumb": "/menu/biz-cask.webp"
     },
     {
      "id": "pour",
      "href": "/visual-hooks/pour",
      "name": "Pour",
      "note": "A short-list cocktail bar",
      "thumb": "/menu/biz-pour.webp"
     },
     {
      "id": "grove",
      "href": "/visual-hooks/grove",
      "name": "Grove",
      "note": "Single-grove, new-harvest olive oil",
      "thumb": "/menu/biz-grove.webp"
     },
     {
      "id": "curd",
      "href": "/visual-hooks/curd",
      "name": "Curd",
      "note": "A small-maker cheesemonger",
      "thumb": "/menu/biz-curd.webp"
     },
     {
      "id": "stride",
      "href": "/visual-hooks/stride",
      "name": "Stride",
      "note": "One carefully tuned running shoe",
      "thumb": "/menu/biz-stride.webp"
     },
     {
      "id": "botanic",
      "href": "/visual-hooks/botanic",
      "name": "Botanic",
      "note": "Small-batch botanical gin",
      "thumb": "/menu/biz-botanic.webp"
     },
     {
      "id": "ink",
      "href": "/visual-hooks/ink",
      "name": "Ink",
      "note": "A private, custom tattoo studio",
      "thumb": "/menu/biz-ink.webp"
     },
     {
      "id": "selvedge",
      "href": "/visual-hooks/selvedge",
      "name": "Selvedge",
      "note": "Raw selvedge denim, built to age",
      "thumb": "/menu/biz-selvedge.webp"
     },
     {
      "id": "mane",
      "href": "/visual-hooks/mane",
      "name": "Mane",
      "note": "A one-chair hair studio",
      "thumb": "/menu/biz-mane.webp"
     },
     {
      "id": "deck",
      "href": "/visual-hooks/deck",
      "name": "Deck",
      "note": "A skater-run board shop",
      "thumb": "/menu/biz-deck.webp"
     },
     {
      "id": "lather",
      "href": "/visual-hooks/lather",
      "name": "Lather",
      "note": "Cold-pressed soap and simple skincare",
      "thumb": "/menu/biz-lather.webp"
     },
     {
      "id": "malt",
      "href": "/visual-hooks/malt",
      "name": "Malt",
      "note": "A small-batch taproom brewery",
      "thumb": "/menu/biz-malt.webp"
     }
    ]
   }
  ]
 },
 {
  "key": "concepts",
  "label": "Концепты",
  "href": "/visual-hooks/animated",
  "blurb": "Концепт-сайты на параллакс-сценах: слои, перекрытия, сквозной актёр.",
  "groups": [
   {
    "label": "Концепты",
    "items": [
     {
      "id": "clothing",
      "href": "/visual-hooks/clothing",
      "name": "Alevtyna",
      "note": "Fashion lookbook",
      "thumb": "/menu/concept-clothing.webp"
     },
     {
      "id": "skydive",
      "href": "/visual-hooks/skydive",
      "name": "Skyfall",
      "note": "Skyfall",
      "thumb": "/menu/concept-skydive.webp"
     },
     {
      "id": "vinyl",
      "href": "/visual-hooks/vinyl",
      "name": "After Hours",
      "note": "Vinyl club",
      "thumb": "/menu/concept-vinyl.webp"
     },
     {
      "id": "porsche",
      "href": "/visual-hooks/porsche",
      "name": "Porsche",
      "note": "Classic sports car",
      "thumb": "/menu/concept-porsche.webp"
     },
     {
      "id": "anime",
      "href": "/visual-hooks/anime",
      "name": "Bloom+",
      "note": "Anime magazine",
      "thumb": "/menu/concept-anime.webp"
     },
     {
      "id": "ecology",
      "href": "/visual-hooks/ecology",
      "name": "Verda",
      "note": "Reforestation",
      "thumb": "/menu/concept-ecology.webp"
     },
     {
      "id": "dj",
      "href": "/visual-hooks/dj",
      "name": "Seraph",
      "note": "DJ show",
      "thumb": "/menu/concept-dj.webp"
     },
     {
      "id": "redsuit",
      "href": "/visual-hooks/redsuit",
      "name": "Sanguine",
      "note": "Red tailoring",
      "thumb": "/menu/concept-redsuit.webp"
     },
     {
      "id": "notredame",
      "href": "/visual-hooks/notredame",
      "name": "Notre‑Dame",
      "note": "Notre dame",
      "thumb": "/menu/concept-notredame.webp"
     },
     {
      "id": "jpclub",
      "href": "/visual-hooks/jpclub",
      "name": "Yoru 夜",
      "note": "Nightclub",
      "thumb": "/menu/concept-jpclub.webp"
     },
     {
      "id": "skisnow",
      "href": "/visual-hooks/skisnow",
      "name": "Tōji",
      "note": "Ski & board rental",
      "thumb": "/menu/concept-skisnow.webp"
     },
     {
      "id": "jptattoo",
      "href": "/visual-hooks/jptattoo",
      "name": "彫 Hori",
      "note": "Japanese tattoo",
      "thumb": "/menu/concept-jptattoo.webp"
     },
     {
      "id": "bmw",
      "href": "/visual-hooks/bmw",
      "name": "M·WERK",
      "note": "Performance cars",
      "thumb": "/menu/concept-bmw.webp"
     },
     {
      "id": "dance",
      "href": "/visual-hooks/dance",
      "name": "Kinet",
      "note": "Dance studio",
      "thumb": "/menu/concept-dance.webp"
     },
     {
      "id": "folkmusic",
      "href": "/visual-hooks/folkmusic",
      "name": "Зоря",
      "note": "Folk ensemble",
      "thumb": "/menu/concept-folkmusic.webp"
     },
     {
      "id": "rockband",
      "href": "/visual-hooks/rockband",
      "name": "Feral",
      "note": "Live band",
      "thumb": "/menu/concept-rockband.webp"
     },
     {
      "id": "photographer",
      "href": "/visual-hooks/photographer",
      "name": "Northlight",
      "note": "On-location photography",
      "thumb": "/menu/concept-photographer.webp"
     },
     {
      "id": "womensuit",
      "href": "/visual-hooks/womensuit",
      "name": "Séverine",
      "note": "Women’s tailoring",
      "thumb": "/menu/concept-womensuit.webp"
     },
     {
      "id": "hoodie",
      "href": "/visual-hooks/hoodie",
      "name": "Blokk",
      "note": "Streetwear drops",
      "thumb": "/menu/concept-hoodie.webp"
     },
     {
      "id": "escort",
      "href": "/visual-hooks/escort",
      "name": "Éclat",
      "note": "Companionship concierge",
      "thumb": "/menu/concept-escort.webp"
     },
     {
      "id": "cardealer",
      "href": "/visual-hooks/cardealer",
      "name": "Concours",
      "note": "Classic-car dealer",
      "thumb": "/menu/concept-cardealer.webp"
     },
     {
      "id": "jprestaurant",
      "href": "/visual-hooks/jprestaurant",
      "name": "結 Yui",
      "note": "Omakase",
      "thumb": "/menu/concept-jprestaurant.webp"
     },
     {
      "id": "freestyle",
      "href": "/visual-hooks/freestyle",
      "name": "Session",
      "note": "Skate crew",
      "thumb": "/menu/concept-freestyle.webp"
     }
    ]
   }
  ]
 },
 {
  "key": "hooks",
  "label": "Первые экраны",
  "href": "/visual-hooks",
  "blurb": "Первые экраны, которые цепляют: интерактивные истории, линзы, живые объекты — и второй акт по скроллу.",
  "groups": [
   {
    "label": "Первые экраны",
    "items": [
     {
      "id": "bloom",
      "href": "/visual-hooks/bloom",
      "name": "Bloom",
      "note": "Interactive story",
      "thumb": "/menu/hooks-bloom.webp"
     },
     {
      "id": "held-world",
      "href": "/visual-hooks/held-world",
      "name": "Held World",
      "note": "Interactive story",
      "thumb": "/menu/hooks-held-world.webp"
     },
     {
      "id": "monolith",
      "href": "/visual-hooks/monolith",
      "name": "Monolith",
      "note": "Interactive story",
      "thumb": "/menu/hooks-monolith.webp"
     },
     {
      "id": "planet-vigil",
      "href": "/visual-hooks/planet-vigil",
      "name": "Planet Vigil",
      "note": "Interactive story",
      "thumb": "/menu/hooks-planet-vigil.webp"
     },
     {
      "id": "ascension",
      "href": "/visual-hooks/ascension",
      "name": "Ascension",
      "note": "Interactive story",
      "thumb": "/menu/hooks-ascension.webp"
     },
     {
      "id": "rev-neura",
      "href": "/visual-hooks/rev-neura",
      "name": "Neura",
      "note": "Cursor reveal",
      "thumb": "/menu/hooks-rev-neura.webp"
     },
     {
      "id": "rev-mythic",
      "href": "/visual-hooks/rev-mythic",
      "name": "Mythic",
      "note": "Cursor reveal",
      "thumb": "/menu/hooks-rev-mythic.webp"
     },
     {
      "id": "rev-imperial",
      "href": "/visual-hooks/rev-imperial",
      "name": "Imperial",
      "note": "Cursor reveal",
      "thumb": "/menu/hooks-rev-imperial.webp"
     },
     {
      "id": "track-portfolio",
      "href": "/visual-hooks/track-portfolio",
      "name": "Studio X",
      "note": "Scroll gaze",
      "thumb": "/menu/hooks-track-portfolio.webp"
     },
     {
      "id": "track-sentry",
      "href": "/visual-hooks/track-sentry",
      "name": "Sentry",
      "note": "Scroll gaze",
      "thumb": "/menu/hooks-track-sentry.webp"
     },
     {
      "id": "track-neon",
      "href": "/visual-hooks/track-neon",
      "name": "Neon Logic",
      "note": "Scroll gaze",
      "thumb": "/menu/hooks-track-neon.webp"
     },
     {
      "id": "living-object",
      "href": "/visual-hooks/living-object",
      "name": "Living Object",
      "note": "Cinematic scrub",
      "thumb": "/menu/hooks-living-object.webp"
     },
     {
      "id": "cloud-step",
      "href": "/visual-hooks/cloud-step",
      "name": "Cloud Step",
      "note": "Cutout parallax",
      "thumb": "/menu/hooks-cloud-step.webp"
     },
     {
      "id": "strata",
      "href": "/visual-hooks/strata",
      "name": "Strata",
      "note": "Layered editorial",
      "thumb": "/menu/hooks-strata.webp"
     },
     {
      "id": "reverie",
      "href": "/visual-hooks/reverie",
      "name": "Reverie",
      "note": "Portal object",
      "thumb": "/menu/hooks-reverie.webp"
     },
     {
      "id": "vanguard",
      "href": "/visual-hooks/vanguard",
      "name": "Vanguard",
      "note": "Kinetic typography",
      "thumb": "/menu/hooks-vanguard.webp"
     },
     {
      "id": "aether",
      "href": "/visual-hooks/aether",
      "name": "Aether",
      "note": "Atmospheric",
      "thumb": "/menu/hooks-aether.webp"
     },
     {
      "id": "botanica",
      "href": "/visual-hooks/botanica",
      "name": "Botanica",
      "note": "Material shadow",
      "thumb": "/menu/hooks-botanica.webp"
     },
     {
      "id": "neon-forge",
      "href": "/visual-hooks/neon-forge",
      "name": "Neon Forge",
      "note": "Techno grid",
      "thumb": "/menu/hooks-neon-forge.webp"
     },
     {
      "id": "macro-optics",
      "href": "/visual-hooks/macro-optics",
      "name": "Macro Optics",
      "note": "Product macro",
      "thumb": "/menu/hooks-macro-optics.webp"
     },
     {
      "id": "liquid-word",
      "href": "/visual-hooks/liquid-word",
      "name": "Liquid Word",
      "note": "3D typography",
      "thumb": "/menu/hooks-liquid-word.webp"
     },
     {
      "id": "orbit-data",
      "href": "/visual-hooks/orbit-data",
      "name": "Orbit Data",
      "note": "Data theatre",
      "thumb": "/menu/hooks-orbit-data.webp"
     },
     {
      "id": "atelier-hand",
      "href": "/visual-hooks/atelier-hand",
      "name": "Atelier",
      "note": "Editorial fashion",
      "thumb": "/menu/hooks-atelier-hand.webp"
     },
     {
      "id": "fold-horizon",
      "href": "/visual-hooks/fold-horizon",
      "name": "Fold Horizon",
      "note": "Parallax narrative",
      "thumb": "/menu/hooks-fold-horizon.webp"
     }
    ]
   }
  ]
 },
 {
  "key": "lab",
  "label": "Лаборатория",
  "href": "/animated",
  "blurb": "Анимированные сайты на движке ScrollStage, журналы-истории и архив приёмов.",
  "groups": [
   {
    "label": "Анимированные сайты",
    "items": [
     {
      "id": "kinetic",
      "href": "/animated/kinetic",
      "name": "Kinetic",
      "note": "",
      "thumb": "/menu/legacy-kinetic.webp"
     },
     {
      "id": "forge",
      "href": "/animated/forge",
      "name": "Anvil",
      "note": "Made to withstand",
      "thumb": "/menu/legacy-forge.webp"
     },
     {
      "id": "signal",
      "href": "/animated/signal",
      "name": "Helios",
      "note": "Every night ends in daylight data",
      "thumb": "/menu/legacy-signal.webp"
     },
     {
      "id": "genesis",
      "href": "/animated/genesis",
      "name": "Genesis",
      "note": "From a single seed of matter",
      "thumb": "/menu/legacy-genesis.webp"
     },
     {
      "id": "archive",
      "href": "/animated/archive",
      "name": "Meridian Archive",
      "note": "The room where the light keeps reading",
      "thumb": "/menu/legacy-archive.webp"
     },
     {
      "id": "current",
      "href": "/animated/current",
      "name": "Canopy",
      "note": "The forest is already reporting",
      "thumb": "/menu/legacy-current.webp"
     },
     {
      "id": "vigil",
      "href": "/animated/vigil",
      "name": "Vigil",
      "note": "",
      "thumb": "/menu/legacy-vigil.webp"
     },
     {
      "id": "strata",
      "href": "/animated/strata",
      "name": "Strata",
      "note": "",
      "thumb": "/menu/legacy-strata.webp"
     },
     {
      "id": "ascend",
      "href": "/animated/ascend",
      "name": "Ascend",
      "note": "Where the map runs out of air",
      "thumb": "/menu/legacy-ascend.webp"
     },
     {
      "id": "relic",
      "href": "/animated/relic",
      "name": "Relic",
      "note": "One object. Two thousand years of gaze",
      "thumb": "/menu/legacy-relic.webp"
     },
     {
      "id": "echo",
      "href": "/animated/echo",
      "name": "Echo",
      "note": "",
      "thumb": "/menu/legacy-echo.webp"
     },
     {
      "id": "member",
      "href": "/animated/member",
      "name": "Ember",
      "note": "A quiet room for people who make things slowly",
      "thumb": "/menu/legacy-member.webp"
     },
     {
      "id": "splash",
      "href": "/animated/splash",
      "name": "Pulp",
      "note": "",
      "thumb": "/menu/legacy-splash.webp"
     },
     {
      "id": "terra",
      "href": "/animated/terra",
      "name": "Terra",
      "note": "One world, two hemispheres of light",
      "thumb": "/menu/legacy-terra.webp"
     },
     {
      "id": "orbit",
      "href": "/animated/orbit",
      "name": "Orbit",
      "note": "A shape turned in the light",
      "thumb": "/menu/legacy-orbit.webp"
     },
     {
      "id": "atlas",
      "href": "/animated/atlas",
      "name": "Atlas Grid",
      "note": "The grid, read like a chart",
      "thumb": "/menu/legacy-atlas.webp"
     },
     {
      "id": "vertex",
      "href": "/animated/vertex",
      "name": "Vertex",
      "note": "Objects that outlived their century",
      "thumb": "/menu/legacy-vertex.webp"
     },
     {
      "id": "monolith",
      "href": "/animated/monolith",
      "name": "Stele",
      "note": "It has burned since before the first age",
      "thumb": "/menu/legacy-monolith.webp"
     }
    ]
   },
   {
    "label": "Журналы-истории",
    "items": [
     {
      "id": "vision",
      "href": "/story/vision",
      "name": "Vision",
      "note": "Ева Зорина",
      "thumb": "/menu/story-vision.webp"
     },
     {
      "id": "shadows",
      "href": "/story/shadows",
      "name": "Shadows",
      "note": "Мара Тень",
      "thumb": "/menu/story-shadows.webp"
     },
     {
      "id": "solitude",
      "href": "/story/solitude",
      "name": "Solitude",
      "note": "Лия Морн",
      "thumb": "/menu/story-solitude.webp"
     }
    ]
   },
   {
    "label": "Архив приёмов",
    "items": [
     {
      "id": "manifesto",
      "href": "/animated/manifesto",
      "name": "Manifesto",
      "note": "We don't decorate. We direct",
      "thumb": "/menu/legacy-manifesto.webp"
     },
     {
      "id": "ledger",
      "href": "/animated/ledger",
      "name": "Grove Ledger",
      "note": "How much does your studio quietly bleed every year?",
      "thumb": "/menu/legacy-ledger.webp"
     },
     {
      "id": "cipher",
      "href": "/animated/cipher",
      "name": "Cipher//Sec",
      "note": "",
      "thumb": "/menu/legacy-cipher.webp"
     },
     {
      "id": "flux",
      "href": "/animated/flux",
      "name": "Flux",
      "note": "Material in motion",
      "thumb": "/menu/legacy-flux.webp"
     },
     {
      "id": "aurora",
      "href": "/animated/aurora",
      "name": "Aurora",
      "note": "Currents, not corridors",
      "thumb": "/menu/legacy-aurora.webp"
     },
     {
      "id": "ovation",
      "href": "/animated/ovation",
      "name": "Ovation",
      "note": "The room finds its shape",
      "thumb": "/menu/legacy-ovation.webp"
     },
     {
      "id": "column",
      "href": "/animated/column",
      "name": "Column",
      "note": "Chairs that keep the daylight",
      "thumb": "/menu/legacy-column.webp"
     },
     {
      "id": "pulse",
      "href": "/animated/pulse",
      "name": "Pulse",
      "note": "Compute that glows at the edge",
      "thumb": "/menu/legacy-pulse.webp"
     },
     {
      "id": "drift",
      "href": "/animated/drift",
      "name": "Drift",
      "note": "Work that catches the light",
      "thumb": "/menu/legacy-drift.webp"
     },
     {
      "id": "bloom",
      "href": "/animated/bloom",
      "name": "Bloom",
      "note": "The scent takes root",
      "thumb": "/menu/legacy-bloom.webp"
     },
     {
      "id": "prism",
      "href": "/animated/prism",
      "name": "Prism",
      "note": "Light, refracted",
      "thumb": "/menu/legacy-prism.webp"
     },
     {
      "id": "helix",
      "href": "/animated/helix",
      "name": "Helix",
      "note": "The code of life, lit one rung at a time",
      "thumb": "/menu/legacy-helix.webp"
     }
    ]
   }
  ]
 }
];

export const familyCount = (f: SiteFamily) => f.groups.reduce((n, g) => n + g.items.length, 0);
