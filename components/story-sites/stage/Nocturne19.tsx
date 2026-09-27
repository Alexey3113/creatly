"use client";
/* STORY v2 · САЙТ 16 — «NOCTURNE / ТЬМА» (pin19: near-black/blood-red хоррор-журнал, red-eyes shadow).
   Сквозная архитектура (аудит 2026-09): ОДИН актёр — два красных глаза, единственный свет, который не гаснет:
   лицо на обложке → наезд → глаза во тьме над фразой → сквозь дым → кадр архива → «дом» (финал).
   Закон камеры — вглубь (push); fade там, где непрерывность несёт общий объект.
   Фраза собирается объектами: «ТЬМА» из S2 перелетает первой строкой к «СТАЛА ДОМОМ» (S3).
   Световая дуга: каждая сцена на ступень светлее, финал — тёплый «дом», герой возвращается (кольцовка). */
import Link from "next/link";
import { Layer } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./nocturne19.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

/** Глаза-актёр: одинаковый ключ во всех сценах → StageDeck перелетает ими из сцены в сцену. */
function Eyes({ c }: { c: string }) {
  return <span className={`nc-eyes ${c}`} data-share="eyes" aria-hidden><i /><i /></span>;
}

export function Nocturne19() {
  return (
    <div className="nc-site">
      <header className="nc-head">
        <Link href="/story2" className="nc-brand">ТЬМА<i>· nocturne</i></Link>
        <nav className="nc-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Выпуск</a>
          <a href="#" onClick={stop}>Интервью</a>
          <a href="#" onClick={stop} className="nc-cta">18+</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · ОБЛОЖКА — лицо в дыму, горят только глаза; вордмарк читается над головой */}
        <div transition="push" className="scene-body nc-cover">
          <div className="nc-cover-bg" aria-hidden />
          <Layer z={1} depth={0.14} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1 }} className="nc-cq">
            <div className="nc-plate nc-plate-hero nc-kb"><img className="nc-img" src={`${A}/nocturne-hero.jpg`} alt="Фигура тьмы с красными глазами" draggable={false} /></div>
          </Layer>
          <div className="nc-cover-veil" aria-hidden />
          <div className="nc-cover-flash" aria-hidden />
          <Layer z={7} depth={0.14} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1 }} className="nc-cq">
            <div className="nc-plate nc-plate-hero nc-kb"><Eyes c="nc-eyes-hero" /></div>
          </Layer>
          <Layer z={6} depth={0.05} phase={[0, 0.9]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nc-wordmark"><span aria-hidden>ТЬМА</span></Layer>
          <div className="nc-orn" aria-hidden>
            <span className="nc-orn-issue">DARK ISSUE</span>
            <span className="nc-orn-no">№ 22 · DECEMBER 2026</span>
            <span className="nc-orn-l">тьма — не просто<br />отсутствие света,<br />а состояние души.</span>
            <span className="nc-orn-r">лиминальность<br />как форма<br />существования</span>
          </div>
          <Layer z={8} depth={0.3} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nc-cover-hi">
            <span className="nc-eyebrow">midnight publications · дневник тьмы</span>
            <p>Она не приходит снаружи. Она рождается внутри — и в какой-то момент становится единственным домом. Не бойся заглянуть.</p>
          </Layer>
          <div className="nc-grain" aria-hidden />
          <div className="nc-scrollcue" aria-hidden>вниз ▾</div>
        </div>

        {/* 1 · НАЕЗД — то же лицо ближе; первое слово фразы уже в кадре */}
        <div transition="push" className="scene-body nc-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="nc-cq">
            <div className="nc-plate nc-plate-pb nc-kb"><img className="nc-img" src={`${A}/nocturne-portrait-b.jpg`} alt="Тень — лицо в чёрном дыму" draggable={false} /></div>
          </Layer>
          <div className="nc-tunnel-veil" aria-hidden />
          <Layer z={7} depth={0.12} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="nc-cq">
            <div className="nc-plate nc-plate-pb nc-kb"><Eyes c="nc-eyes-pb" /></div>
          </Layer>
          <div className="nc-word nc-word-s2" data-share="tma" aria-hidden><span>ТЬМА</span></div>
          <Layer z={8} depth={0.24} phase={[0.1, 0.65]} from={{ opacity: 0, x: "-24px" }} to={{ opacity: 1, x: "0px" }} className="nc-tunnel-cap">
            <span className="nc-folio">интервью с тьмой</span>
            <p>«Она не приходит снаружи. Она рождается внутри». Два уголька глаз в чёрном дыму — и ты уже дома.</p>
            <span className="nc-meta">не бойся остаться там навсегда</span>
          </Layer>
          <div className="nc-grain" aria-hidden />
        </div>

        {/* 2 · ФРАЗА — «ТЬМА» прилетает первой строкой, «СТАЛА ДОМОМ» бьёт под неё; глаза смотрят из темноты */}
        <div transition="fade" className="scene-body nc-guillo">
          <div className="nc-guillo-bg" aria-hidden />
          <Eyes c="nc-eyes-dark" />
          <div className="nc-guillo-type">
            <div className="nc-word nc-word-s3" data-share="tma"><span>ТЬМА</span></div>
            <KineticText text="СТАЛА" mode="slam" start={0.62} />
            <span className="nc-guillo-red"><KineticText text="ДОМОМ" mode="slam" start={0.72} /></span>
          </div>
          <div className="nc-guillo-row" aria-hidden><span>лиминальность</span><span>·</span><span>состояние души</span></div>
        </div>

        {/* 3 · СКВОЗЬ ДЫМ — глаза уходят в фигуру среди углей; круг света вокруг неё */}
        <div transition="push" className="scene-body nc-spot">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1 }} className="nc-cq">
            <div className="nc-plate nc-plate-s1 nc-kb"><img className="nc-img" src={`${A}/nocturne-still-1.jpg`} alt="Фигура в дыму и алых углях" draggable={false} /></div>
          </Layer>
          <div className="nc-spot-mask" aria-hidden />
          <Layer z={7} depth={0.1} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1 }} className="nc-cq">
            <div className="nc-plate nc-plate-s1 nc-kb"><Eyes c="nc-eyes-s1" /></div>
          </Layer>
          <Layer z={8} depth={0.2} phase={[0.08, 0.7]} from={{ x: "-30px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="nc-spot-cap">
            <span className="nc-folio">кадр · дым</span>
            <h3>Алый уголь</h3>
            <p>Чёрный дым и красные искры. Тьма не поглощает — она тлеет внутри, пока не станет твоим единственным светом.</p>
            <span className="nc-spot-mark" aria-hidden>◉ загляни в темноту</span>
          </Layer>
          <div className="nc-grain" aria-hidden />
        </div>

        {/* 4 · АРХИВ — киноплёнка; один кадр подсвечен тёплым: в него мы и войдём */}
        <div transition="push" className="scene-body nc-reel">
          <div className="nc-reel-bg" aria-hidden />
          <div className="nc-reel-head" aria-hidden><b>Архив тьмы</b><span>midnight publications · reel 22</span></div>
          <div className="nc-reel-strip">
            <figure className="nc-frame nc-frame-1"><img src={`${A}/nocturne-extra-3.jpg`} alt="Кадр — фигура в дыму" loading="lazy" /><figcaption>001 · тень</figcaption></figure>
            <figure className="nc-frame nc-frame-2"><img src={`${A}/nocturne-extra-1.jpg`} alt="Панорама — дым" loading="lazy" /><figcaption>002 · дым</figcaption></figure>
            <figure className="nc-frame nc-frame-3 nc-frame-sel">
              <img className="nc-home-img" src={`${A}/nocturne-extra-2.jpg`} alt="Глаза — крупный план" loading="lazy" data-share="home" />
              <Eyes c="nc-eyes-x2" />
              <figcaption>003 · глаза</figcaption>
            </figure>
            <figure className="nc-frame nc-frame-4"><img src={`${A}/nocturne-extra-4.jpg`} alt="Выпуск на столе" loading="lazy" /><figcaption>004 · выпуск</figcaption></figure>
          </div>
          <div className="nc-reel-code" aria-hidden>она рождается внутри · и становится единственным домом</div>
          <div className="nc-grain" aria-hidden />
        </div>

        {/* 5 · ДОМ — кадр из архива раскрывается в тёплое окно, глаза горят уже тёплым; фраза собрана */}
        <div transition="fade" className="scene-body nc-end">
          <div className="nc-end-bg" aria-hidden />
          <div className="nc-end-win">
            <img className="nc-home-img" src={`${A}/nocturne-extra-2.jpg`} alt="Она — дома, в тёплом свете" loading="lazy" data-share="home" />
            <Eyes c="nc-eyes-x2" />
          </div>
          <div className="nc-end-block">
            <span className="nc-end-label">— конец выпуска —</span>
            <h4>Тьма<br />стала<br /><em>домом</em></h4>
            <a href="#" onClick={stop} className="nc-end-link"><i aria-hidden />впустить →</a>
            <div className="nc-end-meta" aria-hidden>ТЬМА · nocturne · midnight publications · №22 · 18+</div>
          </div>
          <div className="nc-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
