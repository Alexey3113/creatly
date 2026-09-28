// node _grid.mjs out.jpg a.jpg b.jpg ... → сетка 3 в ряд, 480px
import sharp from "sharp";
const [out, ...files] = process.argv.slice(2);
const W = 480, H = 300, cols = Math.min(3, files.length);
const tiles = await Promise.all(files.map((f) => sharp(f, { failOn: "none" }).resize(W, H, { fit: "cover" }).jpeg().toBuffer()));
const rows = Math.ceil(files.length / cols);
await sharp({ create: { width: cols * (W + 6), height: rows * (H + 6), channels: 3, background: "#222" } })
  .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * (W + 6), top: Math.floor(i / cols) * (H + 6) }))).jpeg({ quality: 78 }).toFile(out);
