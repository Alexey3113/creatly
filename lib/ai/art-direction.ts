// Арт-дирекшн: именованные стиль-паки + этап планирования концепции (stage A).
// Цель — заставить модель СНАЧАЛА выбрать и закоммитить конкретное дизайнерское
// направление, а не регрессировать к медиане обучающих данных (= AI-слоп).

import { renderScrapedContext, type ScrapedSiteData } from "./prompts";

export interface StylePack {
  id: string;
  name: string;
  /** Когда уместен — типы бизнеса/настроения */
  bestFor: string;
  /** Эмоция и характер */
  mood: string;
  /** Подход к палитре (не конкретные хексы — направление) */
  palette: string;
  /** Типографическая пара */
  typography: string;
  /** Личность форм: радиусы, границы, тени */
  forms: string;
  /** Язык движения и переходов между секциями */
  motion: string;
  /** Обработка изображений */
  imagery: string;
  /** Чего избегать именно в этом направлении */
  avoid: string;
}

// 6 принципиально РАЗНЫХ направлений. Каждое — самостоятельная вселенная,
// чтобы два сайта из одного брифа не сходились к одному виду.
export const stylePacks: StylePack[] = [
  {
    id: "editorial",
    name: "Editorial",
    bestFor: "медиа, консалтинг, бренды с историей, премиум-услуги, агентства",
    mood: "интеллигентный, выверенный, как разворот качественного журнала",
    palette: "монохромная база (off-white #faf9f7 + почти-чёрный #1a1a1a) + ОДИН сдержанный акцент",
    typography: "крупный serif заголовок (Playfair Display / Fraunces / DM Serif Display) + чистый sans body (Source Sans 3 / Outfit)",
    forms: "минимум скруглений (0–6px), тонкие 1px разделители вместо теней, много воздуха",
    motion: "медленные fade + slide-up, текст появляется по строкам, переходы через color-flow между секциями",
    imagery: "крупные full-bleed фото, иногда ч/б или с лёгким зерном, единый тон",
    avoid: "градиенты, glow, яркие карточки, скруглённые блобы",
  },
  {
    id: "brutalist",
    name: "Neo-Brutalist",
    bestFor: "стартапы, креативные студии, IT, события, дерзкие бренды",
    mood: "сырой, уверенный, инженерный, без украшательства",
    palette: "высокий контраст: чистый чёрный/белый + 1 кислотный акцент (lime #b4f461, electric orange #ff4d00)",
    typography: "массивный grotesk/display заголовок (Space Grotesk / Unbounded / Bebas Neue), моноширинный для меты",
    forms: "0px радиус, жирные 2px solid границы, видимая сетка, hard shadows (смещённые блоки без блюра)",
    motion: "резкие мгновенные переходы, marquee-бегущая строка, hover со сдвигом блока, sticky-stacking секции",
    imagery: "контрастные фото, дуотон, заметная сетка/рамки вокруг изображений",
    avoid: "мягкие тени, плавные градиенты, скругления, glassmorphism",
  },
  {
    id: "warm-organic",
    name: "Warm Organic",
    bestFor: "еда, wellness, бьюти, локальный бизнес, hand-made, детские бренды",
    mood: "тёплый, человечный, тактильный, уютный",
    palette: "землистые тёплые тона (cream #f5f0e8, terracotta #c4613a, sage #2d4a3e, clay #8b5e3c)",
    typography: "вариативный serif с характером (Fraunces / Vollkorn) + гуманистический sans (Commissioner / Work Sans)",
    forms: "органические скругления (большие, неравномерные), мягкие натуральные тени, clip-path волны/арки",
    motion: "плавные мягкие reveal, параллакс-глубина, cross-boundary элементы заезжают между секциями",
    imagery: "тёплая натуральная фотография, естественный свет, фактуры (дерево, ткань, еда крупно)",
    avoid: "холодные синие, неон, резкая геометрия, корпоративная стерильность",
  },
  {
    id: "tech-minimal",
    name: "Tech Minimal",
    bestFor: "SaaS, b2b, финтех, инфраструктура, dev-tools, аналитика",
    mood: "точный, спокойный, надёжный, data-driven",
    palette: "нейтральная база (charcoal #1c1c1e / light gray #f2f2f7) + сдержанный функциональный акцент (не indigo!)",
    typography: "геометрический sans заголовок (Sora / General Sans) + читаемый body, моноширинный для цифр/метрик",
    forms: "сдержанные радиусы 8–12px, тонкие границы, минимальные тени, bento-grid",
    motion: "точные короткие transitions, sticky-stacking для процесса, scroll-progress, stagger reveal карточек",
    imagery: "продуктовые скриншоты в рамках, абстрактные структурные паттерны (НЕ 3D-блобы), схемы",
    avoid: "indigo/purple градиенты, glow-тени, стоковые «команда в офисе», случайный декор",
  },
  {
    id: "luxury-serif",
    name: "Luxury Serif",
    bestFor: "недвижимость, ювелирка, мода, премиум-услуги, рестораны высокой кухни, отели",
    mood: "дорогой, тихий, утончённый, с достоинством",
    palette: "глубокая тёмная база (obsidian #0d0f18 / deep navy #1a1f36) + золото/латунь акцент (#d4a853) ИЛИ кремовая база + графит",
    typography: "высококонтрастный serif (Cormorant Garamond / Playfair) тонкого начертания + минималистичный sans с широким трекингом",
    forms: "почти без скруглений, тонкие золотые/металлические линии-разделители, обилие пустоты",
    motion: "очень медленные, кинематографичные reveal, плавный параллакс, fade между full-screen секциями",
    imagery: "большие атмосферные фото, приглушённый тон, кинематографичный кроп, детали крупно",
    avoid: "яркие цвета, быстрые анимации, плотные сетки, мелкие карточки, любой «дешёвый» блеск",
  },
  {
    id: "bold-expressive",
    name: "Bold Expressive",
    bestFor: "ивенты, музыка, спорт, молодёжные бренды, диджитал-продукты, fashion-tech",
    mood: "энергичный, громкий, дофаминовый, запоминающийся",
    palette: "насыщенные высококонтрастные цвета (богатый коралл, electric, vivid) на тёмной или чистой базе — но НЕ фиолетовый дефолт",
    typography: "огромный display заголовок во весь экран (Unbounded / Clash Display / Bebas), кинетическая типографика",
    forms: "смелые формы, oversized нумерация, перекрытие элементов, разнообразные радиусы по контексту",
    motion: "кинетический текст, horizontal scroll секции, marquee, активные hover, scroll-driven сценарии",
    imagery: "яркие динамичные фото, дуотон с акцентным цветом, full-bleed, элементы выходят за края",
    avoid: "тусклые тона, симметричная скука, одинаковые карточки в ряд, robotic grid",
  },
];

export function stylePackById(id: string): StylePack | undefined {
  return stylePacks.find((p) => p.id === id);
}

/**
 * Stage A — промпт планирования концепции. Модель анализирует бриф,
 * ВЫБИРАЕТ одно из направлений (или гибрид) и превращает его в конкретный
 * арт-дирекшн-бриф в JSON. Это коммит к решению ДО написания кода.
 */
export function buildArtDirectionPrompt(brief: string, scrapedData?: ScrapedSiteData): string {
  const packsList = stylePacks
    .map(
      (p) =>
        `### ${p.name} (id: "${p.id}")\n- Подходит: ${p.bestFor}\n- Настроение: ${p.mood}\n- Палитра: ${p.palette}\n- Типографика: ${p.typography}\n- Формы: ${p.forms}\n- Движение: ${p.motion}\n- Изображения: ${p.imagery}\n- Избегать: ${p.avoid}`,
    )
    .join("\n\n");

  const scrapedContext = scrapedData ? `\n\n${renderScrapedContext(scrapedData, true)}` : "";

  return `Ты — арт-директор премиум веб-студии. Твоя задача — НЕ писать код, а принять дизайнерские решения для конкретного клиента, как делает живой арт-директор перед стартом проекта.

## Бриф клиента
${brief}${scrapedContext}

## Доступные дизайн-направления
${packsList}

## Твоя задача
1. Проанализируй бизнес, аудиторию и характер бренда из брифа
2. ВЫБЕРИ одно направление (или обоснованный гибрид двух), которое лучше всего раскроет ИМЕННО этот бизнес — не самое «безопасное», а самое уместное и выразительное
3. Преврати его в КОНКРЕТНЫЙ арт-дирекшн-бриф: точные хексы палитры, конкретные шрифты, порядок секций по логике воронки, приёмы переходов между секциями
4. Палитра — выводи ИЗ бизнеса клиента, НЕ из дефолтов. Запрещены: indigo #6366f1, фиолетовые градиенты, cyan-on-dark
5. Шрифты — обязательно контрастная пара. Запрещены как основные: Inter, Roboto, Poppins, Montserrat, Geist

## Формат ответа — СТРОГО валидный JSON, без текста вокруг:
\`\`\`json
{
  "stylePackId": "id выбранного направления",
  "concept": "1-2 предложения: главная дизайн-идея сайта именно для этого бизнеса",
  "mood": "3-5 слов о настроении",
  "palette": {
    "bg": "#hex основной фон (НЕ чистый #fff)",
    "bgAlt": "#hex альтернативный фон секций",
    "surface": "#hex карточки/поверхности",
    "text": "#hex основной текст (НЕ чистый #000)",
    "textMuted": "#hex приглушённый текст",
    "primary": "#hex основной брендовый",
    "accent": "#hex яркий акцент для CTA",
    "border": "#hex тонкие границы"
  },
  "typography": {
    "heading": "точное имя Google-шрифта для заголовков",
    "body": "точное имя Google-шрифта для текста",
    "rationale": "почему эта пара подходит бренду"
  },
  "sections": ["упорядоченный список секций по логике воронки, напр. header, hero, social-proof, value, services, process, results, testimonials, faq, cta-contact, footer"],
  "transitions": ["2-3 конкретных приёма перехода между секциями: overlap / diagonal / color-flow / sticky-stack / cross-boundary / scroll-snap / parallax"],
  "motionLanguage": "описание характера анимаций (темп, easing, чем уникален)",
  "imageryTreatment": "как обрабатывать фото: тон, кроп, фильтр",
  "signatureElement": "одна запоминающаяся деталь, которая сделает сайт неузнаваемо НЕ-шаблонным (напр. oversized нумерация, кинетический заголовок, золотые линии-разделители)",
  "copyTone": "тон текстов: язык, характер, примеры формулировок"
}
\`\`\`

Отвечай только JSON.`;
}

export interface ArtDirectionBrief {
  stylePackId: string;
  concept: string;
  mood: string;
  palette: {
    bg: string;
    bgAlt: string;
    surface: string;
    text: string;
    textMuted: string;
    primary: string;
    accent: string;
    border: string;
  };
  typography: { heading: string; body: string; rationale: string };
  sections: string[];
  transitions: string[];
  motionLanguage: string;
  imageryTreatment: string;
  signatureElement: string;
  copyTone: string;
}

export function parseArtDirection(response: string): ArtDirectionBrief | null {
  // Достаём JSON из ```json блока или из первого {...}
  const fenced = response.match(/```json\s*\n([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : response;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1));
    if (!parsed.palette || !parsed.typography) return null;
    return parsed as ArtDirectionBrief;
  } catch {
    return null;
  }
}

/** Превращает арт-дирекшн-бриф в текстовый блок для подмешивания в stage B (генерация кода). */
export function renderArtDirectionForCodegen(ad: ArtDirectionBrief): string {
  const pack = stylePackById(ad.stylePackId);
  return `## АРТ-ДИРЕКШН (УТВЕРЖДЁННАЯ КОНЦЕПЦИЯ — СЛЕДУЙ ТОЧНО)

Направление: ${pack?.name ?? ad.stylePackId}
Концепция: ${ad.concept}
Настроение: ${ad.mood}

### Палитра (используй ЭТИ хексы в :root, не выдумывай свои)
- --color-bg: ${ad.palette.bg}
- --color-bg-alt: ${ad.palette.bgAlt}
- --color-surface: ${ad.palette.surface}
- --color-text: ${ad.palette.text}
- --color-text-muted: ${ad.palette.textMuted}
- --color-primary: ${ad.palette.primary}
- --color-accent: ${ad.palette.accent}
- --color-border: ${ad.palette.border}

### Типографика (подключи ИМЕННО эти шрифты через Google Fonts)
- Заголовки: ${ad.typography.heading}
- Текст: ${ad.typography.body}
- Обоснование: ${ad.typography.rationale}

### Порядок секций (следуй этому порядку)
${ad.sections.map((s, i) => `${i + 1}. ${s}`).join("\n")}

### Переходы между секциями (ОБЯЗАТЕЛЬНО реализуй эти приёмы)
${ad.transitions.map((t) => `- ${t}`).join("\n")}

### Язык движения
${ad.motionLanguage}

### Обработка изображений
${ad.imageryTreatment}

### Signature-элемент (ОБЯЗАТЕЛЬНО реализуй — это то, что делает сайт НЕ-шаблонным)
${ad.signatureElement}

### Тон текстов
${ad.copyTone}`;
}
