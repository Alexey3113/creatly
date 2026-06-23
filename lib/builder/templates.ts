export interface TemplateInfo {
  id: string;
  title: string;
  category: string;
  description: string;
  color: string;
}

export const templates: TemplateInfo[] = [
  {
    id: "1",
    title: "Alexend Sites",
    category: "portfolio",
    description: "Портфолио интерактивных сайтов с анимациями",
    color: "#6366f1",
  },
  {
    id: "2",
    title: "Люмен",
    category: "corporate",
    description: "Развитие команд нового поколения — корпоративный лендинг",
    color: "#10b981",
  },
  {
    id: "3",
    title: "FORMA",
    category: "real-estate",
    description: "Недвижимость новой формы — премиальный сайт",
    color: "#f59e0b",
  },
  {
    id: "4",
    title: "AERIS",
    category: "real-estate",
    description: "Клубные резиденции — лендинг с атмосферой",
    color: "#8b5cf6",
  },
  {
    id: "5",
    title: "Место",
    category: "restaurant",
    description: "Ресторан найдётся сам — гастрономический сайт",
    color: "#ef4444",
  },
];

export const categories = [
  { id: "all", label: "Все" },
  { id: "corporate", label: "Бизнес" },
  { id: "real-estate", label: "Недвижимость" },
  { id: "portfolio", label: "Портфолио" },
  { id: "restaurant", label: "Рестораны" },
];
