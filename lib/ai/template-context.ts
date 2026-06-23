import { readFile, readdir } from "fs/promises";
import { join } from "path";

export async function loadTemplateCode(templateId: string): Promise<{ html: string; css: string; js: string }> {
  const dir = templateId === "1"
    ? join(process.cwd(), "examples")
    : join(process.cwd(), "examples", templateId);

  const [html, css, js] = await Promise.all([
    readFile(join(dir, "index.html"), "utf-8").catch(() => ""),
    readFile(join(dir, "styles.css"), "utf-8").catch(() => ""),
    readFile(join(dir, "script.js"), "utf-8").catch(() => ""),
  ]);

  return { html, css, js };
}

export async function loadTemplateFrames(templateId: string, maxFrames = 4): Promise<string[]> {
  const dir = join(process.cwd(), "public", "template-videos", templateId);

  try {
    const files = await readdir(dir);
    const jpgs = files.filter((f) => f.endsWith(".jpg")).sort().slice(0, maxFrames);

    const frames: string[] = [];
    for (const file of jpgs) {
      const buffer = await readFile(join(dir, file));
      frames.push(`data:image/jpeg;base64,${buffer.toString("base64")}`);
    }
    return frames;
  } catch {
    return [];
  }
}
