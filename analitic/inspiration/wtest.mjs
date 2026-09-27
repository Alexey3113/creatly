import { chromium } from "playwright";
const b=await chromium.launch();
const pg=await b.newPage({viewport:{width:400,height:400}});
const file="file:///Users/leo/programming/creatly/analitic/motionsites/media/3d-collectible-hero.webp";
await pg.setContent('<img id=i src="'+file+'">');
for(const t of [800,1500,2500,4000]){
  await pg.waitForTimeout(t);
  const dim=await pg.evaluate(()=>{const i=document.getElementById('i');return {w:i.naturalWidth,h:i.naturalHeight,complete:i.complete}});
  console.log("after",t,"->",JSON.stringify(dim));
}
// try decode()
const dec=await pg.evaluate(async()=>{const i=document.getElementById('i');try{await i.decode();return 'decoded '+i.naturalWidth+'x'+i.naturalHeight}catch(e){return 'decode-err '+String(e).slice(0,50)}});
console.log("decode:",dec);
await b.close();
