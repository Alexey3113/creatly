"use client";
/* Ветка STORY — сторителлинг-сайты тату-мастера: один скролл перелистывает журнал работ.
   Тестовая идея в трёх стилистиках (по пинам analitic/pins/tatoo):
   — vision   : pink/чёрный глянцевый editorial
   — shadows  : красный грандж-оккульт-зин
   — solitude : ренессанс-портрет + техно-декор
   Между разворотами — «закладки» (трэш-объекты) как контакт-CTA. */
import Link from "next/link";
import { VisionSite } from "./VisionSite";
import { ShadowsSite } from "./ShadowsSite";
import { SolitudeSite } from "./SolitudeSite";
import "./story.css";

type Entry = { slug: string; title: string; master: string; note: string; accent: string; bg: string };

const SITES: Entry[] = [
  { slug: "vision", title: "VISION", master: "Ева Зорина", note: "Глянцевый editorial — розовое стекло на чёрном.", accent: "#e0609a", bg: "#0c0a0d" },
  { slug: "shadows", title: "SHADOWS", master: "Мара Тень", note: "Грандж-оккульт-зин на алом.", accent: "#c8302f", bg: "#2a0806" },
  { slug: "solitude", title: "SOLITUDE", master: "Лия Морн", note: "Ренессанс-портрет в техно-оправе.", accent: "#c8a24a", bg: "#141210" },
];

export function StoryLab({ initialSlug }: { initialSlug?: string }) {
  if (initialSlug === "vision") return <VisionSite />;
  if (initialSlug === "shadows") return <ShadowsSite />;
  if (initialSlug === "solitude") return <SolitudeSite />;

  return (
    <main className="st-index">
      <header className="st-index-head">
        <span className="st-kicker">Creatly · story</span>
        <h1>Сторителлинг-журналы</h1>
        <p>Один скролл перелистывает истории. Идея тату-мастера в трёх стилистиках.</p>
      </header>
      <div className="st-index-grid">
        {SITES.map((s) => (
          <Link key={s.slug} href={`/story/${s.slug}`} className="st-card" style={{ ["--c" as string]: s.accent, ["--b" as string]: s.bg }}>
            <img src={`/uploads/1/story/tatoo/${s.slug}-hero-a.jpg`} alt={`Мастер ${s.master}`} loading="lazy" />
            <div className="st-card-body">
              <b>{s.title}</b>
              <span>{s.master}</span>
              <em>{s.note}</em>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
