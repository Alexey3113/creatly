"use client";
import Link from "next/link";
import { ShaderBg } from "./ShaderBg";

type Bg = { name: string; mode: "aurora" | "silk" | "nebula" | "caustics" | "ember" | "grid"; palette: [string, string, string]; speed?: number };

const BGS: Bg[] = [
  { name: "Aurora Boreal", mode: "aurora", palette: ["#02080c", "#0e6b4a", "#7dffcf"] },
  { name: "Aurora Violet", mode: "aurora", palette: ["#05030f", "#3a1d6e", "#c8a6ff"] },
  { name: "Silk Iris", mode: "silk", palette: ["#0a0710", "#5a2d6e", "#ff9ec4"], speed: 0.8 },
  { name: "Nebula Ember", mode: "nebula", palette: ["#04030a", "#5a1d3a", "#ff9d5c"] },
  { name: "Nebula Deep", mode: "nebula", palette: ["#02060c", "#134a6e", "#7fd8ff"] },
  { name: "Caustics", mode: "caustics", palette: ["#02101a", "#0a5c7a", "#8ff0ff"], speed: 0.9 },
  { name: "Ember Rise", mode: "ember", palette: ["#0d0402", "#6e2410", "#ff9a3a"] },
  { name: "Retro Grid", mode: "grid", palette: ["#0a0518", "#2a1060", "#ff3ea0"], speed: 0.8 },
];

export function BackgroundsShowcase() {
  return (
    <div className="vh-bglab">
      <header className="bgl-head">
        <Link href="/visual-hooks" className="bgl-brand"><span>CR</span><b>Visual Hooks · Backgrounds</b></Link>
        <span className="bgl-count">{BGS.length} living backgrounds</span>
      </header>
      <div className="bgl-intro">
        <h1>Backgrounds that <em>breathe.</em></h1>
        <p>Real-time WebGL fields. Drop one behind any hero. Each renders only while on screen and collapses to a static gradient under reduced motion.</p>
      </div>
      <div className="bgl-grid">
        {BGS.map((b) => (
          <article key={b.name} className="bgl-card">
            <ShaderBg mode={b.mode} palette={b.palette} speed={b.speed ?? 1} className="bgl-bg" />
            <div className="bgl-meta"><b>{b.name}</b><span>{b.mode}</span></div>
          </article>
        ))}
      </div>
      <footer className="bgl-foot"><span>A Visual Hooks concept</span><Link href="/visual-hooks">Back to the lab</Link></footer>
    </div>
  );
}
