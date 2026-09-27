// Download video pins via yt-dlp; keep only real videos, stop at TARGET.
import { spawn } from "node:child_process";
import fs from "node:fs";
const OUT = "analitic/pins/animated/videos";
const TARGET = parseInt(process.argv[2] || "30", 10);
const CONC = 4;
const pool = JSON.parse(fs.readFileSync("analitic/pins/animated/pins.json")).pins;
const kept = [];
let idx = 0, active = 0, done = false;

function tryPin(pin) {
  return new Promise((res) => {
    const out = `${OUT}/anim-${pin.id}.%(ext)s`;
    const p = spawn("yt-dlp", ["--no-warnings", "--no-progress", "-q", "--socket-timeout", "20",
      "-f", "mp4/best", "-o", out, `https://ru.pinterest.com/pin/${pin.id}/`]);
    const timer = setTimeout(() => p.kill("SIGKILL"), 45000);
    p.on("close", (code) => {
      clearTimeout(timer);
      const f = `${OUT}/anim-${pin.id}.mp4`;
      let ok = false;
      try { ok = code === 0 && fs.statSync(f).size > 50000; } catch { ok = false; }
      res(ok ? { id: pin.id, file: f, alt: pin.alt, q: pin.q } : null);
    });
    p.on("error", () => { clearTimeout(timer); res(null); });
  });
}

async function worker() {
  while (!done && idx < pool.length) {
    const pin = pool[idx++];
    active++;
    const r = await tryPin(pin);
    active--;
    if (r) {
      kept.push(r);
      process.stderr.write(`✓ ${kept.length}/${TARGET}  pin ${r.id}\n`);
      if (kept.length >= TARGET) done = true;
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
fs.writeFileSync("analitic/pins/animated/videos.json", JSON.stringify({ count: kept.length, videos: kept }, null, 2));
console.log(`downloaded ${kept.length} videos (scanned ~${idx}/${pool.length} pins)`);
