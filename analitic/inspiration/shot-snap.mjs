import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const slug=process.argv[2]||"vision";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
const pg=await b.newPage({viewport:{width:1512,height:945}});
await pg.goto(`http://127.0.0.1:3011/story/${slug}`,{waitUntil:"networkidle",timeout:45000});
await pg.waitForTimeout(1000);
await pg.screenshot({path:`${OUT}/snap-${slug}-0.jpg`,quality:82,type:"jpeg"});
// один "жест" скролла вперёд
await pg.mouse.move(760,470);
await pg.mouse.wheel(0,140);
await pg.waitForTimeout(360);                    // середина анимации входа
await pg.screenshot({path:`${OUT}/snap-${slug}-1mid.jpg`,quality:82,type:"jpeg"});
await pg.waitForTimeout(900);                    // анимация завершилась
await pg.screenshot({path:`${OUT}/snap-${slug}-1done.jpg`,quality:82,type:"jpeg"});
// проверка блокировки: спамим wheel во время следующего перехода
await pg.mouse.wheel(0,140); await pg.waitForTimeout(120);
await pg.mouse.wheel(0,140); await pg.mouse.wheel(0,140);   // должны игнорироваться (лок)
await pg.waitForTimeout(1100);
await pg.screenshot({path:`${OUT}/snap-${slug}-2done.jpg`,quality:82,type:"jpeg"});
const active=await pg.evaluate(()=>[...document.querySelectorAll('.deck-scene')].findIndex(e=>e.classList.contains('is-active')));
console.log(`${slug}: активная сцена после 1 жеста + (спам во время лока) =`, active, "(ожидаем 2, не 4 — значит спам поглощён)");
await b.close();
