import { stockThemes } from "@/lib/site/stock";

async function check(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) });
    return res.ok;
  } catch { return false; }
}

async function main() {
const dead: string[] = [];
for (const theme of stockThemes) {
  for (const pool of [theme.hero, theme.card, theme.portrait]) {
    for (const url of pool) {
      const ok = await check(url);
      if (!ok) dead.push(`${theme.id}: ${url}`);
      process.stdout.write(ok ? "." : "X");
    }
  }
}
console.log(`\nМёртвых: ${dead.length}`);
dead.forEach((d) => console.log("DEAD", d));
}
main();
