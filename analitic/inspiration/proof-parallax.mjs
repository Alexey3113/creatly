import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2]||"nocturne";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1512,height:945}});
const pg=await ctx.newPage();
await pg.goto(`http://127.0.0.1:3011/story2/${slug}`,{waitUntil:"networkidle"});
await pg.waitForTimeout(900);

// media-query state (эти два должны быть true на десктопе → фича активна)
const mq=await pg.evaluate(()=>({fine:matchMedia("(pointer:fine)").matches,hover:matchMedia("(hover:hover)").matches}));
console.log("media:",JSON.stringify(mq));

// CSS-конвейер: ставим --px/--py=1 на .stage, читаем computed translate у слоя активной сцены
const css=await pg.evaluate(()=>{
  const stage=document.querySelector(".stage");
  stage.style.setProperty("--px","1"); stage.style.setProperty("--py","1");
  const lay=document.querySelector(".stage-scene.is-active .ps-layer");
  const cs=getComputedStyle(lay);
  return {depth:cs.getPropertyValue("--depth").trim(), translate:cs.translate, transform:cs.transform.slice(0,40)};
});
console.log("layer@px1:",JSON.stringify(css));

// реальный JS-канал: двигаем мышь в два угла, ждём сглаживание, снимаем
await pg.evaluate(()=>{const s=document.querySelector(".stage"); s.style.removeProperty("--px"); s.style.removeProperty("--py");});
await pg.mouse.move(120,120); await pg.waitForTimeout(700);
const pxA=await pg.evaluate(()=>getComputedStyle(document.querySelector(".stage")).getPropertyValue("--px").trim());
await pg.screenshot({path:`${OUT}/parallax-${slug}-TL.jpg`,quality:82,type:"jpeg"});
await pg.mouse.move(1400,860); await pg.waitForTimeout(700);
const pxB=await pg.evaluate(()=>getComputedStyle(document.querySelector(".stage")).getPropertyValue("--px").trim());
await pg.screenshot({path:`${OUT}/parallax-${slug}-BR.jpg`,quality:82,type:"jpeg"});
console.log("JS --px  TL:",pxA," BR:",pxB);
await b.close();
