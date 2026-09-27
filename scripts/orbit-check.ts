import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPublishHtml } from "@/lib/site/render";
const d = applyOps(createEmptyDocument("o"), [{ op: "add-block", presetId: "features-orbit-01" }]).doc;
const pub = renderPublishHtml(d, d.pages[0].id, { inline: true });
console.log("data-orbit-item count:", (pub.html.match(/data-orbit-item/g)||[]).length);
console.log("collection items:", d.pages[0].blocks[0].collections?.["fo01-items"]?.length);
