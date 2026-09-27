"use client";
/* STORY v2 · САЙТ 16 — «NOCTURNE / ТЬМА» (pin19: near-black/blood-red хоррор-журнал, red-eyes shadow).
   Архетипы (де-шаблонизировано): Occluded Idol → Tunnel Zoom → Type Guillotine → Spotlight(круг света,iris) → Reel(киноплёнка) → End Card(fade-to-black). ТЁМНЫЙ. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./nocturne19.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

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
        {/* 0 · OCCLUDED IDOL */}
        <div transition="zoom" className="scene-body nc-cover">
          <div className="nc-cover-bg" aria-hidden />
          <Layer z={3} depth={0.14} phase={[0, 1]} from={{ scale: 1.16 }} to={{ scale: 1.02 }} className="nc-cover-fig kb-media">
            <SceneMedia src={`${A}/nocturne-hero.jpg`} alt="Фигура тьмы с красными глазами" />
          </Layer>
          <div className="nc-cover-veil" aria-hidden />
          <div className="nc-cover-flash" aria-hidden />
          <Layer z={2} depth={0.05} phase={[0, 0.9]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nc-wordmark"><span aria-hidden>ТЬМА</span></Layer>
          <div className="nc-orn" aria-hidden>
            <span className="nc-orn-issue">DARK ISSUE</span>
            <span className="nc-orn-no">№ 22 · DECEMBER 2026</span>
            <span className="nc-orn-l">тьма — не просто<br />отсутствие света,<br />а состояние души.</span>
            <span className="nc-orn-r">лиминальность<br />как форма<br />существования</span>
            <span className="nc-orn-script">Стала домом</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nc-cover-hi">
            <span className="nc-eyebrow">midnight publications · дневник тьмы</span>
            <p>Она не приходит снаружи. Она рождается внутри — и в какой-то момент становится единственным домом. Не бойся заглянуть.</p>
          </Layer>
          <div className="nc-grain" aria-hidden />
          <div className="nc-scrollcue" aria-hidden>вниз ▾</div>
        </div>

        {/* 1 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body nc-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.22 }} to={{ scale: 1.03 }} className="nc-tunnel-fig kb-media">
            <SceneMedia src={`${A}/nocturne-portrait-b.jpg`} alt="Тень — растворяется в дыму" />
          </Layer>
          <div className="nc-tunnel-veil" aria-hidden />
          <div className="nc-tunnel-huge" aria-hidden>ТЬМА</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="nc-tunnel-cap">
            <span className="nc-folio">интервью с тьмой</span>
            <p>«Она не приходит снаружи. Она рождается внутри». Два уголька глаз в чёрном дыму — и ты уже дома.</p>
            <span className="nc-meta">не бойся остаться там навсегда</span>
          </Layer>
          <div className="nc-grain" aria-hidden />
        </div>

        {/* 2 · TYPE GUILLOTINE */}
        <div transition="wipe-y" className="scene-body nc-guillo">
          <div className="nc-guillo-bg" aria-hidden />
          <div className="nc-guillo-type">
            <KineticText text="СТАЛА" mode="slam" />
            <span className="nc-guillo-red"><KineticText text="ДОМОМ" mode="slam" start={0.1} /></span>
          </div>
          <div className="nc-guillo-row" aria-hidden><span>лиминальность</span><span>·</span><span>состояние души</span></div>
        </div>

        {/* 3 · SPOTLIGHT — круг света в темноте, подпись слева (слом клон-макро) */}
        <div transition="iris" className="scene-body nc-spot">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.16 }} to={{ scale: 1.04 }} className="nc-spot-fig kb-media">
            <SceneMedia src={`${A}/nocturne-still-1.jpg`} alt="Дым и алые угли — деталь" />
          </Layer>
          <div className="nc-spot-mask" aria-hidden />
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ x: "-30px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="nc-spot-cap">
            <span className="nc-folio">кадр · дым</span>
            <h3>Алый уголь</h3>
            <p>Чёрный дым и красные искры. Тьма не поглощает — она тлеет внутри, пока не станет твоим единственным светом.</p>
            <span className="nc-spot-mark" aria-hidden>◉ загляни в темноту</span>
          </Layer>
          <div className="nc-grain" aria-hidden />
        </div>

        {/* 4 · REEL — вертикальная киноплёнка, кадры-полосы + перфорация (не сетка) */}
        <div transition="drop" className="scene-body nc-reel">
          <div className="nc-reel-bg" aria-hidden />
          <div className="nc-reel-head" aria-hidden><b>Архив тьмы</b><span>midnight publications · reel 22</span></div>
          <div className="nc-reel-strip">
            <figure className="nc-frame nc-frame-1"><img src={`${A}/nocturne-extra-3.jpg`} alt="Кадр" loading="lazy" /><figcaption>001 · тень</figcaption></figure>
            <figure className="nc-frame nc-frame-2"><img src={`${A}/nocturne-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>002 · дым</figcaption></figure>
            <figure className="nc-frame nc-frame-3"><img src={`${A}/nocturne-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>003 · уголь</figcaption></figure>
            <figure className="nc-frame nc-frame-4"><img src={`${A}/nocturne-still-2.jpg`} alt="Рука" loading="lazy" /><figcaption>004 · рука</figcaption></figure>
          </div>
          <div className="nc-reel-code" aria-hidden>она рождается внутри · и становится единственным домом</div>
          <div className="nc-grain" aria-hidden />
        </div>

        {/* 5 · END CARD — «конец выпуска», растворяется в чёрную пустоту (не центр-слоган+кнопка) */}
        <div transition="zoom" className="scene-body nc-end">
          <div className="nc-end-bg" aria-hidden />
          <div className="nc-end-block">
            <span className="nc-end-label">— конец выпуска —</span>
            <h4>Тьма стала домом</h4>
            <a href="#" onClick={stop} className="nc-end-link">впустить →</a>
            <div className="nc-end-meta" aria-hidden>ТЬМА · nocturne · midnight publications · №22 · 18+</div>
          </div>
          <div className="nc-end-fade" aria-hidden />
          <div className="nc-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
