/* ГАЛЕРЕЯ 30 миров — единая витрина иллюстрированных кино-скроллителлинг-лендингов.
   Данные из scripts/animated/worlds.ts; превью — s1-bg.webp каждого мира; ссылка → /animated/w-<slug>. */
import Link from "next/link";
import { WORLDS } from "@/scripts/animated/worlds";
import "./worlds.css";

const hex = (s: string) => (s.match(/#[0-9a-fA-F]{3,8}/)?.[0] ?? "#888");

export default function WorldsGallery() {
  return (
    <div className="wg">
      <header className="wg-head">
        <span className="wg-kick">Creatly · Animated</span>
        <h1>Thirty painted worlds.<br /><em>One scroll each.</em></h1>
        <p>Illustrated cinematic scrollytelling landing pages — every one its own world, palette, type and story. Built on a shared reel engine; nothing repeats.</p>
      </header>
      <div className="wg-grid">
        {WORLDS.map((w, i) => (
          <Link key={w.slug} href={`/animated/w-${w.slug}`} className="wg-card">
            <div className="wg-thumb" style={{ backgroundImage: `url(/uploads/1/animated/${w.slug}/s1-bg.webp)` }}>
              <span className="wg-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="wg-swatches">{w.palette.slice(0, 4).map((p, k) => <i key={k} style={{ background: hex(p) }} />)}</div>
            </div>
            <div className="wg-meta">
              <h2>{w.name}</h2>
              <p>{w.thesis}</p>
              <span className="wg-go">Enter {w.name} →</span>
            </div>
          </Link>
        ))}
      </div>
      <footer className="wg-foot">Creatly · 30 illustrated worlds · a shared reel, thirty stories</footer>
    </div>
  );
}
