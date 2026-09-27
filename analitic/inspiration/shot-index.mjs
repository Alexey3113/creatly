import { chromium } from "playwright";
const OUT="/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--ignore-gpu-blocklist"]});
for(const [w,h,dsf,tag] of [[1512,945,1,"d"],[390,844,2,"m"]]){
  const pg=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:dsf});
  await pg.goto("http://127.0.0.1:3011/story",{waitUntil:"networkidle",timeout:45000});
  await pg.waitForTimeout(900);
  await pg.screenshot({path:`${OUT}/st-index-${tag}.jpg`,quality:82,type:"jpeg"});
  await pg.close();
}
console.log("index shot d+m");
await b.close();
