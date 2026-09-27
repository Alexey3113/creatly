"use client";
/* STORY v2 · ПИЛОТ 2 — «BIG FN LIFE» / Madeline (punk personal-brand, pin 2: white/black + hot-pink,
   спрей-маркер, дерзость). Движок StageDeck. Архетипы (своя последовательность, НЕ как portfolio):
   Split Manifesto → Type Guillotine(cut) → Split Persona(smash) → Poster Wall(wipe-x) → Contact-Sheet(drop) → Final(smash).
   Фото p02-*. Спрей/маркер-типографика = HTML. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./punk02.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Punk02() {
  return (
    <div className="pk-site">
      <header className="pk-head">
        <Link href="/story2" className="pk-brand">MADELINE<i>★</i></Link>
        <nav className="pk-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Podcast</a>
          <a href="#" onClick={stop}>Programs</a>
          <a href="#" onClick={stop} className="pk-cta">Work with me</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · SPLIT MANIFESTO — обложка */}
        <div transition="smash" className="scene-body pk-cover">
          <div className="pk-cover-bg" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0, 0.9]} from={{ x: "16vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pk-cover-fig">
            <SceneMedia src={`${A}/p02-hero-cut.png`} alt="Madeline — персональный бренд, портрет" />
          </Layer>
          <Layer z={4} depth={0.3} phase={[0, 0.8]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="pk-cover-hi">
            <span className="pk-eyebrow">For the women who are <i>done playing small.</i></span>
            <h1><KineticText text="MAKE MORE" mode="slam" /><KineticText text="MONEY. BUILD" mode="slam" start={0.08} /><em>your <span className="pk-mark">big fn life.</span></em></h1>
            <p>Помогаю женщинам строить онлайн-бизнес, иконичный личный бренд и зарабатывать на любимом деле. Без воды. Только результат.</p>
            <a href="#" onClick={stop} className="pk-btn">Start here →</a>
          </Layer>
          <div className="pk-orn" aria-hidden>
            <span className="pk-star">★</span>
            <span className="pk-note">Confident.<br />Unapologetic.<br />Focused. Rich AF.</span>
            <span className="pk-smiley">☻</span>
          </div>
          <div className="pk-scrollcue" aria-hidden>scroll ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE — манифест (cut) */}
        <div transition="cut" className="scene-body pk-manifesto">
          <div className="pk-mani-type">
            <KineticText text="THIS ISN'T" mode="slam" />
            <KineticText text="JUST A BUSINESS." mode="slam" start={0.08} />
            <span className="pk-mani-pink"><KineticText text="IT'S A WHOLE" mode="slam" start={0.16} /><KineticText text="NEW IDENTITY." mode="slam" start={0.24} /></span>
          </div>
          <div className="pk-mani-row" aria-hidden><span>★ Build your brand</span><span>★ Make more money</span><span>★ Live on your terms</span></div>
        </div>

        {/* 2 · SPLIT PERSONA — две версии (smash) */}
        <div transition="smash" className="scene-body pk-split">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ x: "-8vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pk-split-a">
            <SceneMedia src={`${A}/p02-hero.jpg`} alt="Madeline — уверенный образ" />
          </Layer>
          <Layer z={2} depth={0.12} phase={[0.06, 1]} from={{ x: "8vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pk-split-b">
            <SceneMedia src={`${A}/p02-portrait-b.jpg`} alt="Madeline — второй образ" />
          </Layer>
          <Layer z={6} depth={0.34} phase={[0.1, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="pk-split-type">
            <span>You + the right strategy =</span>
            <b>UNSTOPPABLE</b>
          </Layer>
        </div>

        {/* 3 · OFFER MENU — жирный список программ со стрелками (не сетка) */}
        <div transition="wipe-x" className="scene-body pk-offer">
          <div className="pk-offer-bg" aria-hidden />
          <div className="pk-offer-head" aria-hidden><b>Ways to work with me</b></div>
          <ol className="pk-offer-list">
            <li className="pk-o"><a href="#" onClick={stop}><span className="pk-o-n">01</span><b>Membership</b><span className="pk-o-tag">all-access</span><span className="pk-o-arr">→</span></a></li>
            <li className="pk-o"><a href="#" onClick={stop}><span className="pk-o-n">02</span><b>Mastermind</b><span className="pk-o-tag">12 weeks</span><span className="pk-o-arr">→</span></a></li>
            <li className="pk-o"><a href="#" onClick={stop}><span className="pk-o-n">03</span><b>Courses</b><span className="pk-o-tag">self-paced</span><span className="pk-o-arr">→</span></a></li>
            <li className="pk-o"><a href="#" onClick={stop}><span className="pk-o-n">04</span><b>1:1 Coaching</b><span className="pk-o-tag">VIP</span><span className="pk-o-arr">→</span></a></li>
          </ol>
        </div>

        {/* 4 · CONTACT-SHEET — подкаст (drop) */}
        <div transition="drop" className="scene-body pk-pod">
          <div className="pk-pod-bg" aria-hidden />
          <Layer z={2} depth={0.2} phase={[0, 0.9]} from={{ y: "-40vh", rotate: "-6deg", opacity: 0 }} to={{ y: "0vh", rotate: "-3deg", opacity: 1 }} className="pk-pod-fig">
            <SceneMedia src={`${A}/p02-still-2.jpg`} alt="Полароиды — подкаст THE BIG FN LIFE" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ x: "40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="pk-pod-cap">
            <span className="pk-eyebrow">New episodes every week</span>
            <h2>The Big <span className="pk-mark">FN Life</span> Podcast</h2>
            <p>Реальные разговоры про мышление, маркетинг и деньги — чтобы ты строила бизнес и жизнь мечты.</p>
            <a href="#" onClick={stop} className="pk-btn pk-btn-dark">Listen now →</a>
          </Layer>
        </div>

        {/* 5 · FINAL DETONATION (smash) */}
        <div transition="smash" className="scene-body pk-final">
          <div className="pk-final-bg" aria-hidden />
          <div className="pk-final-type">
            <KineticText text="READY TO BUILD" mode="slam" />
            <span className="pk-mark-big">your big fn life?</span>
          </div>
          <div className="pk-final-cta">
            <a href="#" onClick={stop} className="pk-btn">I'm in →</a>
            <div className="pk-links"><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>TikTok</a><a href="#" onClick={stop}>YouTube</a></div>
            <div className="pk-sign">Madeline · Go big or go home ★</div>
          </div>
          <span className="pk-star pk-star-final" aria-hidden>★</span>
        </div>
      </StageDeck>
    </div>
  );
}
