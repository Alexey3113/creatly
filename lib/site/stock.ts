/**
 * Курируемые стоковые фото по темам бизнеса.
 *
 * AI не имеет права выдумывать URL картинок (они мёртвые в 90% случаев).
 * Вместо этого арт-дирекшн выбирает тему (imageTheme), а генератор
 * детерминированно раскладывает живые проверенные фото по image-полям:
 * герои — в крупные поля, портреты — в команды/отзывы, карточки — в сетки.
 * Все URL проверены скриптом scripts/verify-stock.ts.
 */

export interface StockTheme {
  id: string;
  /** Для промпта арт-дирекшна. */
  hint: string;
  /** Крупные атмосферные (hero, fullwidth, сплиты). */
  hero: string[];
  /** Средние для карточек/сеток. */
  card: string[];
  /** Люди крупным планом (команда, отзывы). */
  portrait: string[];
}

const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const stockThemes: StockTheme[] = [
  {
    id: "medical",
    hint: "клиники, стоматология, медицина, здоровье",
    hero: [u("photo-1629909613654-28e377c37b09", 1600), u("photo-1588776814546-1ffcf47267a5", 1600), u("photo-1519494026892-80bbd2d6fd0d", 1600)],
    card: [u("photo-1606811841689-23dfddce3e95"), u("photo-1598256989800-fe5f95da9787"), u("photo-1584362917165-526a968579e8"), u("photo-1576091160399-112ba8d25d1d")],
    portrait: [u("photo-1559839734-2b71ea197ec2", 800), u("photo-1622253692010-333f2da6031d", 800), u("photo-1594824476967-48c8b964273f", 800), u("photo-1537368910025-700350fe46c7", 800)],
  },
  {
    id: "food",
    hint: "рестораны, кафе, пекарни, кондитерские, еда",
    hero: [u("photo-1517248135467-4c7edcad34c4", 1600), u("photo-1414235077428-338989a2e8c0", 1600), u("photo-1555396273-367ea4eb4db5", 1600)],
    card: [u("photo-1546069901-ba9599a7e63c"), u("photo-1565299624946-b28f40a0ae38"), u("photo-1540189549336-e6e99c3679fe"), u("photo-1567620905732-2d1ec7ab7445")],
    portrait: [u("photo-1577219491135-ce391730fb2c", 800), u("photo-1583394293214-28ded15ee548", 800), u("photo-1595475207225-428b62bda831", 800)],
  },
  {
    id: "beauty",
    hint: "бьюти, салоны, косметология, wellness, спа",
    hero: [u("photo-1560750588-73207b1ef5b8", 1600), u("photo-1540555700478-4be289fbecef", 1600), u("photo-1519415387722-a1c3bbef716c", 1600)],
    card: [u("photo-1522337660859-02fbefca4702"), u("photo-1596462502278-27bfdc403348"), u("photo-1570172619644-dfd03ed5d881"), u("photo-1487412947147-5cebf100ffc2")],
    portrait: [u("photo-1594744803329-e58b31de8bf5", 800), u("photo-1516975080664-ed2fc6a32937", 800), u("photo-1531746020798-e6953c6e8e04", 800)],
  },
  {
    id: "architecture",
    hint: "недвижимость, интерьеры, строительство, архитектура, отели",
    hero: [u("photo-1600585154340-be6161a56a0c", 1600), u("photo-1512917774080-9991f1c4c750", 1600), u("photo-1600607687939-ce8a6c25118c", 1600)],
    card: [u("photo-1600566753086-00f18fb6b3ea"), u("photo-1600210492486-724fe5c67fb0"), u("photo-1600607687920-4e2a09cf159d"), u("photo-1600566753190-17f0baa2a6c3")],
    portrait: [u("photo-1560250097-0b93528c311a", 800), u("photo-1573496359142-b8d87734a5a2", 800), u("photo-1580489944761-15a19d654956", 800)],
  },
  {
    id: "tech",
    hint: "IT, SaaS, финтех, диджитал-продукты, стартапы",
    hero: [u("photo-1551434678-e076c223a692", 1600), u("photo-1522071820081-009f0129c71c", 1600), u("photo-1460925895917-afdab827c52f", 1600)],
    card: [u("photo-1498050108023-c5249f4df085"), u("photo-1531482615713-2afd69097998"), u("photo-1504384308090-c894fdcc538d"), u("photo-1553877522-43269d4ea984")],
    portrait: [u("photo-1507003211169-0a1dd7228f2d", 800), u("photo-1494790108377-be9c29b29330", 800), u("photo-1472099645785-5658abf4ff4e", 800), u("photo-1438761681033-6461ffad8d80", 800)],
  },
  {
    id: "fitness",
    hint: "спорт, фитнес, йога, тренировки",
    hero: [u("photo-1534438327276-14e5300c3a48", 1600), u("photo-1571019613454-1cb2f99b2d8b", 1600), u("photo-1518611012118-696072aa579a", 1600)],
    card: [u("photo-1517836357463-d25dfeac3438"), u("photo-1571019614242-c5c5dee9f50b"), u("photo-1583454110551-21f2fa2afe61"), u("photo-1544367567-0f2fcb009e0b")],
    portrait: [u("photo-1567013127542-490d757e51fc", 800), u("photo-1571731956672-f2b94d7dd0cb", 800), u("photo-1548690312-e3b507d8c110", 800)],
  },
  {
    id: "fashion",
    hint: "мода, одежда, аксессуары, шоурумы",
    hero: [u("photo-1441986300917-64674bd600d8", 1600), u("photo-1490481651871-ab68de25d43d", 1600), u("photo-1483985988355-763728e1935b", 1600)],
    card: [u("photo-1445205170230-053b83016050"), u("photo-1434389677669-e08b4cac3105"), u("photo-1509631179647-0177331693ae"), u("photo-1524504388940-b1c1722653e1")],
    portrait: [u("photo-1529626455594-4ff0802cfb7e", 800), u("photo-1534528741775-53994a69daeb", 800), u("photo-1517841905240-472988babdf9", 800)],
  },
  {
    id: "education",
    hint: "образование, курсы, школы, консалтинг",
    hero: [u("photo-1523240795612-9a054b0db644", 1600), u("photo-1524178232363-1fb2b075b655", 1600), u("photo-1517245386807-bb43f82c33c4", 1600)],
    card: [u("photo-1513258496099-48168024aec0"), u("photo-1434030216411-0b793f4b4173"), u("photo-1456513080510-7bf3a84b82f8"), u("photo-1522202176988-66273c2fd55f")],
    portrait: [u("photo-1544717305-2782549b5136", 800), u("photo-1573497019940-1c28c88b4f3e", 800), u("photo-1560250097-0b93528c311a", 800)],
  },
  {
    id: "nature",
    hint: "туризм, экопродукты, фермерство, аутдор",
    hero: [u("photo-1470071459604-3b5ec3a7fe05", 1600), u("photo-1441974231531-c6227db76b6e", 1600), u("photo-1506905925346-21bda4d32df4", 1600)],
    card: [u("photo-1501785888041-af3ef285b470"), u("photo-1472214103451-9374bd1c798e"), u("photo-1465146344425-f00d5f5c8f07"), u("photo-1470252649378-9c29740c9fa8")],
    portrait: [u("photo-1552058544-f2b08422138a", 800), u("photo-1544005313-94ddf0286df2", 800), u("photo-1508214751196-bcfd4ca60f91", 800)],
  },
  {
    id: "abstract",
    hint: "универсальная: абстракции, текстуры, градиенты — когда ничего не подходит",
    hero: [u("photo-1557683316-973673baf926", 1600), u("photo-1550859492-d5da9d8e45f3", 1600), u("photo-1553356084-58ef4a67b2a7", 1600)],
    card: [u("photo-1541701494587-cb58502866ab"), u("photo-1558591710-4b4a1ae0f04d"), u("photo-1618005182384-a83a8bd57fbe"), u("photo-1620121692029-d088224ddc74")],
    portrait: [u("photo-1507003211169-0a1dd7228f2d", 800), u("photo-1494790108377-be9c29b29330", 800), u("photo-1438761681033-6461ffad8d80", 800)],
  },
];

export const stockThemeIds = stockThemes.map((t) => t.id);

export function stockThemeById(id?: string): StockTheme {
  return stockThemes.find((t) => t.id === id) || stockThemes[stockThemes.length - 1];
}

/** Список тем для промпта арт-дирекшна. */
export function stockThemesPrompt(): string {
  return stockThemes.map((t) => `- "${t.id}" — ${t.hint}`).join("\n");
}
