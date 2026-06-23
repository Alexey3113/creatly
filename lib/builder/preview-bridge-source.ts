export const previewBridgeSource = `function(initialEdits) {
  var editableSelector = "h1,h2,h3,h4,h5,h6,p,a,button,span,strong,em,small,li,img,article,div[data-field],cite,summary";
  var textTags = new Set(["H1","H2","H3","H4","H5","H6","P","A","BUTTON","SPAN","STRONG","EM","SMALL","LI","CITE","DIV","SUMMARY"]);
  var inlineTags = new Set(["BR","SPAN","STRONG","EM","B","I","A","SMALL","SUB","SUP","MARK","CODE","ABBR","TIME","U","S"]);
  var styleState = {};
  var originalContent = {};
  var inlineEditingEl = null;
  var dragState = null;

  // ── Text helpers ──
  function shortText(el) {
    if (el.tagName === "IMG") return (el.getAttribute("alt") || el.getAttribute("src") || "").trim().slice(0, 90);
    var raw = el.children.length ? getDirectText(el) : el.textContent;
    return (raw || "").trim().replace(/\\s+/g, " ").slice(0, 90);
  }
  function fieldName(el) {
    if (el.dataset.field) return el.dataset.field;
    if (el.tagName === "IMG") return "image";
    if (el.matches("h1,h2,h3")) return "title";
    if (el.matches("p,small,li")) return "text";
    if (el.matches("a,button")) return "action";
    return "";
  }
  function fieldLabel(el) {
    return el.dataset.label || el.dataset.field || el.getAttribute("aria-label") || fieldName(el) || el.tagName.toLowerCase();
  }
  function canEditText(el) {
    if (!textTags.has(el.tagName)) return false;
    return Array.from(el.children).every(function(c) { return inlineTags.has(c.tagName); });
  }
  function getDirectText(el) {
    var parts = [];
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3) parts.push(n.textContent);
      else if (n.nodeType === 1 && n.tagName === "BR") parts.push("\\n");
    }
    return parts.join("").trim();
  }
  function setDirectText(el, text) {
    var hasInline = Array.from(el.children).some(function(c) { return c.tagName !== "BR" && inlineTags.has(c.tagName); });
    if (!hasInline) {
      var lines = text.split("\\n");
      el.textContent = "";
      for (var i = 0; i < lines.length; i++) {
        if (i > 0) el.appendChild(document.createElement("br"));
        el.appendChild(document.createTextNode(lines[i]));
      }
      return;
    }
    var anchor = null, seenText = false;
    for (var j = 0; j < el.childNodes.length; j++) {
      var n = el.childNodes[j];
      var isDirect = n.nodeType === 3 || (n.nodeType === 1 && n.tagName === "BR");
      if (isDirect) seenText = true;
      else if (seenText) { anchor = n; break; }
    }
    var toRemove = [];
    for (var k = 0; k < el.childNodes.length; k++) {
      var n2 = el.childNodes[k];
      if (n2.nodeType === 3 || (n2.nodeType === 1 && n2.tagName === "BR")) toRemove.push(n2);
    }
    for (var r = 0; r < toRemove.length; r++) toRemove[r].remove();
    var lines2 = text.split("\\n");
    for (var m = 0; m < lines2.length; m++) {
      if (m > 0) { var br = document.createElement("br"); if (anchor) el.insertBefore(br, anchor); else el.appendChild(br); }
      var tn = document.createTextNode(lines2[m]);
      if (anchor) el.insertBefore(tn, anchor); else el.appendChild(tn);
    }
  }
  function pathFor(el) {
    var parts = [];
    var node = el;
    while (node && node.nodeType === 1 && node !== document.body) {
      var parent = node.parentElement;
      if (!parent) break;
      var same = Array.from(parent.children).filter(function(c) { return c.tagName === node.tagName; });
      parts.unshift(node.tagName.toLowerCase() + ":nth-of-type(" + (same.indexOf(node) + 1) + ")");
      node = parent;
    }
    return parts.join(">");
  }
  function getStyles(el) {
    var cs = getComputedStyle(el);
    return {
      color: el.style.color || cs.color,
      backgroundColor: el.style.backgroundColor || cs.backgroundColor,
      fontSize: el.style.fontSize || cs.fontSize,
      fontWeight: el.style.fontWeight || cs.fontWeight,
      fontStyle: el.style.fontStyle || cs.fontStyle,
      fontFamily: el.style.fontFamily || cs.fontFamily,
      textAlign: el.style.textAlign || cs.textAlign,
      textDecoration: el.style.textDecoration || cs.textDecoration,
      lineHeight: el.style.lineHeight || cs.lineHeight,
      padding: el.style.padding || cs.padding,
      paddingTop: cs.paddingTop, paddingRight: cs.paddingRight,
      paddingBottom: cs.paddingBottom, paddingLeft: cs.paddingLeft,
      marginTop: cs.marginTop, marginRight: cs.marginRight,
      marginBottom: cs.marginBottom, marginLeft: cs.marginLeft,
      borderRadius: el.style.borderRadius || cs.borderRadius,
      display: el.style.display || cs.display,
      backgroundImage: el.style.backgroundImage || cs.backgroundImage
    };
  }

  // ── Collect ──
  function collect() {
    var all = [];
    var maxBlock = 0, maxEl = 0;
    document.querySelectorAll("[data-builder-id]").forEach(function(n) {
      var id = n.dataset.builderId;
      var bm = id.match(/^block-(\\d+)/); if (bm) { var bn = parseInt(bm[1])||0; if (bn > maxBlock) maxBlock = bn; }
      var em = id.match(/-el-(\\d+)/); if (em) { var en = parseInt(em[1])||0; if (en > maxEl) maxEl = en; }
    });
    var nextBlock = maxBlock, nextEl = maxEl;
    document.querySelectorAll("[data-block]").forEach(function(block) {
      if (!block.dataset.builderId) { nextBlock++; block.dataset.builderId = "block-" + nextBlock; }
      var label = block.dataset.block || block.dataset.builderId;
      all.push({
        id: block.dataset.builderId, blockId: block.dataset.builderId, type: "block",
        tag: block.tagName.toLowerCase(), label: label,
        field: "", semanticId: label,
        text: shortText(block), path: pathFor(block), src: "", alt: "",
        styles: getStyles(block), canEditText: false, canEditImage: false
      });
      block.querySelectorAll(editableSelector).forEach(function(el) {
        if (el.closest("[data-builder-ignore]")) return;
        if (!el.dataset.builderId) { nextEl++; el.dataset.builderId = block.dataset.builderId + "-el-" + nextEl; }
        all.push({
          id: el.dataset.builderId, blockId: block.dataset.builderId,
          type: el.tagName === "IMG" ? "image" : "element",
          tag: el.tagName.toLowerCase(), label: fieldLabel(el), field: fieldName(el),
          semanticId: (block.dataset.block || block.dataset.builderId) + "." + (fieldName(el) || el.tagName.toLowerCase()),
          text: shortText(el), path: pathFor(el),
          src: el.getAttribute("src") || "", alt: el.getAttribute("alt") || "",
          styles: getStyles(el), canEditText: canEditText(el), canEditImage: el.tagName === "IMG"
        });
      });
    });
    return all;
  }

  // ── Overlay ──
  var overlay = document.createElement("div");
  overlay.dataset.builderOverlay = "true";
  overlay.innerHTML = '<div data-ov="margin"></div><div data-ov="border"></div><div data-ov="padding"></div><div data-ov="content"></div><div data-ov="label"></div>';
  document.body.appendChild(overlay);

  function showOverlay(el) {
    if (!el || inlineEditingEl) { overlay.style.display = "none"; toolbar.style.display = "none"; showCollectionAddButtons(null); return; }
    var r = el.getBoundingClientRect();
    var cs = getComputedStyle(el);
    var mt = parseFloat(cs.marginTop)||0, mr = parseFloat(cs.marginRight)||0;
    var mb = parseFloat(cs.marginBottom)||0, ml = parseFloat(cs.marginLeft)||0;
    var pt = parseFloat(cs.paddingTop)||0, pr = parseFloat(cs.paddingRight)||0;
    var pb = parseFloat(cs.paddingBottom)||0, pl = parseFloat(cs.paddingLeft)||0;
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;display:block;";
    overlay.querySelector('[data-ov="margin"]').style.cssText = "position:absolute;top:"+(r.top-mt)+"px;left:"+(r.left-ml)+"px;width:"+(r.width+ml+mr)+"px;height:"+(r.height+mt+mb)+"px;background:rgba(255,155,0,.08);";
    overlay.querySelector('[data-ov="border"]').style.cssText = "position:absolute;top:"+r.top+"px;left:"+r.left+"px;width:"+r.width+"px;height:"+r.height+"px;border:2px solid #2563eb;border-radius:2px;";
    overlay.querySelector('[data-ov="padding"]').style.cssText = "position:absolute;top:"+r.top+"px;left:"+r.left+"px;width:"+r.width+"px;height:"+r.height+"px;border-top:"+pt+"px solid rgba(76,175,80,.15);border-right:"+pr+"px solid rgba(76,175,80,.15);border-bottom:"+pb+"px solid rgba(76,175,80,.15);border-left:"+pl+"px solid rgba(76,175,80,.15);box-sizing:border-box;";
    overlay.querySelector('[data-ov="content"]').style.cssText = "position:absolute;top:"+(r.top+pt)+"px;left:"+(r.left+pl)+"px;width:"+(r.width-pl-pr)+"px;height:"+(r.height-pt-pb)+"px;background:rgba(37,99,235,.04);";
    var lbl = overlay.querySelector('[data-ov="label"]');
    lbl.textContent = (el.dataset.builderLabel||el.dataset.block||el.dataset.field||el.tagName.toLowerCase()) + "  " + Math.round(r.width) + " \\u00d7 " + Math.round(r.height);
    lbl.style.cssText = "position:absolute;top:"+Math.max(0,r.top-24)+"px;left:"+r.left+"px;background:#2563eb;color:#fff;font:700 11px/1 system-ui,sans-serif;padding:4px 8px;border-radius:4px;white-space:nowrap;";
    showToolbar(el, r);
    var colBlock = el.closest("[data-collection]");
    showCollectionAddButtons(colBlock);
  }

  // ── Collection add-buttons ──
  var colBtnsLayer = document.createElement("div");
  colBtnsLayer.dataset.builderColBtns = "true";
  colBtnsLayer.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99997;display:none;";
  document.body.appendChild(colBtnsLayer);

  function showCollectionAddButtons(collectionEl) {
    colBtnsLayer.innerHTML = "";
    colBtnsLayer.style.display = "none";
    if (!collectionEl) return;
    var grid = collectionEl.querySelector("[data-collection-grid]");
    if (!grid) return;
    var items = Array.from(grid.querySelectorAll(":scope > [data-collection-item]"));
    if (items.length === 0) return;
    colBtnsLayer.style.display = "block";
    var template = items[0];
    // "+" at the end
    var last = items[items.length - 1];
    var lr = last.getBoundingClientRect();
    var addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.dataset.colAddAfter = "last";
    addBtn.style.cssText = "position:absolute;pointer-events:auto;width:36px;height:36px;border-radius:50%;border:2px dashed #6366f1;background:rgba(99,102,241,.1);color:#6366f1;font-size:20px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;";
    var gridCs = getComputedStyle(grid);
    var isRow = gridCs.flexDirection !== "column" && gridCs.gridTemplateColumns && gridCs.gridTemplateColumns !== "none";
    if (isRow) {
      addBtn.style.top = (lr.top + lr.height/2 - 18) + "px";
      addBtn.style.left = (lr.right + 8) + "px";
    } else {
      addBtn.style.top = (lr.bottom + 8) + "px";
      addBtn.style.left = (lr.left + lr.width/2 - 18) + "px";
    }
    addBtn.addEventListener("mouseenter", function(){ addBtn.style.background = "rgba(99,102,241,.2)"; });
    addBtn.addEventListener("mouseleave", function(){ addBtn.style.background = "rgba(99,102,241,.1)"; });
    addBtn.addEventListener("click", function(ev) {
      ev.stopPropagation();
      var newCard = template.cloneNode(true);
      newCard.querySelectorAll("[data-builder-id]").forEach(function(n){delete n.dataset.builderId;});
      delete newCard.dataset.builderId;
      grid.appendChild(newCard);
      refreshAfterDom();
      setTimeout(function(){ if (newCard.dataset.builderId) select(newCard.dataset.builderId); }, 50);
    });
    colBtnsLayer.appendChild(addBtn);
  }

  // ── Floating toolbar ──
  var toolbar = document.createElement("div");
  toolbar.dataset.builderToolbar = "true";
  toolbar.style.cssText = "position:fixed;display:none;z-index:99999;background:rgba(15,18,35,.92);backdrop-filter:blur(20px) saturate(1.3);border-radius:12px;padding:5px;box-shadow:0 16px 48px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.06) inset;pointer-events:auto;";

  var hiddenColor = document.createElement("input");
  hiddenColor.type = "color";
  hiddenColor.style.cssText = "position:absolute;opacity:0;width:0;height:0;pointer-events:none;";
  toolbar.appendChild(hiddenColor);

  var hiddenFile = document.createElement("input");
  hiddenFile.type = "file";
  hiddenFile.accept = "image/*";
  hiddenFile.style.display = "none";
  toolbar.appendChild(hiddenFile);

  var tbStyle = document.createElement("style");
  tbStyle.textContent = '[data-builder-toolbar]{font:13px/1 system-ui,sans-serif;display:flex;flex-direction:column;gap:2px}.tb-row{display:flex;align-items:center;gap:2px}.tb-sep{width:1px;height:22px;background:#313244;margin:0 3px}[data-builder-toolbar] button{height:30px;min-width:30px;padding:0 7px;border:0;border-radius:6px;background:transparent;color:#cdd6f4;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:4px;transition:background .12s;white-space:nowrap}[data-builder-toolbar] button:hover{background:#313244;color:#fff}[data-builder-toolbar] button.is-active{background:#45475a;color:#cba6f7}[data-builder-toolbar] button.tb-danger{color:#f38ba8}[data-builder-toolbar] button.tb-danger:hover{background:#45475a}.tb-color-dot{width:14px;height:14px;border-radius:3px;border:1px solid rgba(255,255,255,.15);display:inline-block;flex-shrink:0}.tb-size{color:#a6adc8;font-size:12px;min-width:26px;text-align:center;font-weight:600}.tb-lbl{color:#6c7086;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;padding:0 2px}.tb-num{width:38px;height:26px;background:#313244;border:1px solid #45475a;color:#cdd6f4;border-radius:4px;font:600 11px ui-monospace,monospace;text-align:center;outline:none;padding:0;-moz-appearance:textfield}.tb-num::-webkit-inner-spin-button,.tb-num::-webkit-outer-spin-button{-webkit-appearance:none}.tb-num:focus{border-color:#6366f1;background:#3b3b52}.tb-spacing-group{display:flex;align-items:center;gap:2px}.tb-spacing-toggle{gap:0!important;padding:0 2px!important;min-width:auto!important}.tb-spacing-toggle span{padding:2px 5px;border-radius:4px;font:700 10px ui-monospace,monospace;color:#6c7086;transition:all .12s}.tb-spacing-toggle span.is-active{background:#45475a;color:#cba6f7}.tb-hint{padding:2px 8px;font-size:11px;color:#6c7086;text-align:center;border-top:1px solid rgba(255,255,255,.06)}@keyframes tb-in{from{opacity:0;transform:translateY(6px) scale(.97)}to{opacity:1;transform:none}}[data-builder-toolbar]{animation:tb-in .18s cubic-bezier(.16,1,.3,1)}';
  document.head.appendChild(tbStyle);
  document.body.appendChild(toolbar);

  var selectedEl = null;
  var colorTarget = "";

  function rgbToHex(rgb) {
    if (!rgb || rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)") return "#ffffff";
    if (rgb.startsWith("#")) return rgb;
    var m = rgb.match(/\\d+/g);
    if (!m || m.length < 3) return "#ffffff";
    return "#" + m.slice(0, 3).map(function(p) { return Number(p).toString(16).padStart(2, "0"); }).join("");
  }

  var skipToolbarRebuild = false;

  function sendStyleEdit(prop, value) {
    if (!selectedEl) return;
    var id = selectedEl.dataset.builderId;
    if (!styleState[id]) styleState[id] = { all: {}, desktop: {}, tablet: {}, mobile: {} };
    if (value) { styleState[id].all[prop] = value; }
    else { delete styleState[id].all[prop]; }
    renderStyles();
    window.parent.postMessage({
      source: "site-builder-preview", type: "style-edit",
      id: id, prop: prop, value: value
    }, "*");
    if (!skipToolbarRebuild) showOverlay(selectedEl);
    window.parent.postMessage({ source: "site-builder-preview", type: "changed", items: collect() }, "*");
  }

  function convertToWebp(file, callback) {
    var img = new Image();
    img.onload = function() {
      var maxW = 1920, maxH = 1080;
      var w = img.naturalWidth, h = img.naturalHeight;
      if (w > maxW || h > maxH) {
        var ratio = Math.min(maxW / w, maxH / h);
        w = Math.round(w * ratio); h = Math.round(h * ratio);
      }
      var canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      canvas.toBlob(function(blob) {
        var reader = new FileReader();
        reader.onload = function() { callback(reader.result); };
        reader.readAsDataURL(blob);
      }, "image/webp", 0.85);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  }

  function showUrlPopup(imgEl) {
    var old = document.querySelector("[data-builder-url-popup]");
    if (old) old.remove();
    var popup = document.createElement("div");
    popup.dataset.builderUrlPopup = "true";
    var r = imgEl.getBoundingClientRect();
    popup.style.cssText = "position:fixed;z-index:100001;background:#1e1e2e;border-radius:8px;padding:8px;box-shadow:0 8px 32px rgba(0,0,0,.4);display:flex;gap:6px;top:"+(r.bottom+8)+"px;left:"+Math.max(4,r.left)+"px;min-width:320px;";
    var curSrc = (imgEl.getAttribute("src") || "").slice(0, 200);
    popup.innerHTML = '<input type="url" placeholder="https://..." value="' + curSrc.replace(/"/g,"&quot;") + '" style="flex:1;background:#313244;border:1px solid #45475a;color:#cdd6f4;padding:7px 10px;border-radius:6px;font-size:13px;outline:none;min-width:0;"><button style="background:#6366f1;color:#fff;border:0;border-radius:6px;padding:7px 14px;cursor:pointer;font-size:13px;font-weight:500;">OK</button>';
    document.body.appendChild(popup);
    var inp = popup.querySelector("input");
    inp.focus(); inp.select();
    function apply() {
      if (inp.value) {
        imgEl.setAttribute("src", inp.value);
        window.parent.postMessage({ source: "site-builder-preview", type: "inline-edit", id: imgEl.dataset.builderId, src: inp.value, items: collect() }, "*");
      }
      popup.remove();
    }
    popup.querySelector("button").addEventListener("click", apply);
    inp.addEventListener("keydown", function(ev) { if (ev.key === "Enter") apply(); if (ev.key === "Escape") popup.remove(); });
    setTimeout(function() { document.addEventListener("click", function h(ev) { if (!popup.contains(ev.target)) { popup.remove(); document.removeEventListener("click", h); } }); }, 10);
  }

  function buildToolbarHtml(el) {
    var cs = getComputedStyle(el);
    var isText = canEditText(el);
    var isImg = el.tagName === "IMG";
    var isBlock = el.hasAttribute("data-block");
    var isCollectionItem = !!el.closest("[data-collection-item]");
    var collectionItem = el.closest("[data-collection-item]");

    // ── Row 1: Type-specific controls ──
    var r1 = '<div class="tb-row">';

    if (isText) {
      var isBold = parseInt(cs.fontWeight) >= 600;
      var isItalic = cs.fontStyle === "italic";
      var align = cs.textAlign || "left";
      var fontSize = parseInt(cs.fontSize) || 16;
      r1 += '<button data-act="bold" class="'+(isBold?'is-active':'')+'" title="\\u0416\\u0438\\u0440\\u043d\\u044b\\u0439"><b>B</b></button>';
      r1 += '<button data-act="italic" class="'+(isItalic?'is-active':'')+'" title="\\u041a\\u0443\\u0440\\u0441\\u0438\\u0432"><i>I</i></button>';
      r1 += '<span class="tb-sep"></span>';
      r1 += '<button data-act="align-left" class="'+(/^(left|start)$/.test(align)?'is-active':'')+'" title="\\u041b\\u0435\\u0432\\u043e">\\u2261</button>';
      r1 += '<button data-act="align-center" class="'+(align==="center"?'is-active':'')+'" title="\\u0426\\u0435\\u043d\\u0442\\u0440">\\u2550</button>';
      r1 += '<button data-act="align-right" class="'+(/^(right|end)$/.test(align)?'is-active':'')+'" title="\\u041f\\u0440\\u0430\\u0432\\u043e">\\u2261</button>';
      r1 += '<span class="tb-sep"></span>';
      r1 += '<button data-act="font-down" title="\\u041c\\u0435\\u043d\\u044c\\u0448\\u0435">A\\u2212</button>';
      r1 += '<span class="tb-size">'+fontSize+'</span>';
      r1 += '<button data-act="font-up" title="\\u0411\\u043e\\u043b\\u044c\\u0448\\u0435">A+</button>';
      r1 += '<span class="tb-sep"></span>';
      r1 += '<button data-act="text-color" title="\\u0426\\u0432\\u0435\\u0442 \\u0442\\u0435\\u043a\\u0441\\u0442\\u0430"><span class="tb-color-dot" style="background:'+rgbToHex(cs.color)+'"></span>A</button>';
      r1 += '<button data-act="bg-color" title="\\u0424\\u043e\\u043d"><span class="tb-color-dot" style="background:'+rgbToHex(cs.backgroundColor)+'"></span></button>';
    }

    if (isImg) {
      r1 += '<button data-act="img-url" title="\\u0421\\u0441\\u044b\\u043b\\u043a\\u0430"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 8l2-2M5 9.5a2.5 2.5 0 010-3.54l1-1a2.5 2.5 0 013.54 3.54l-.5.5M9 4.5a2.5 2.5 0 010 3.54l-1 1a2.5 2.5 0 01-3.54-3.54l.5-.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> URL</button>';
      r1 += '<button data-act="img-upload" title="\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044c"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 9V3M4.5 5.5L7 3l2.5 2.5M3 8.5V10a1.5 1.5 0 001.5 1.5h5A1.5 1.5 0 0011 10V8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg> \\u0424\\u0430\\u0439\\u043b</button>';
    }

    if (isCollectionItem) {
      r1 += '<span class="tb-sep"></span>';
      r1 += '<button data-act="col-add" title="\\u0414\\u043e\\u0431\\u0430\\u0432\\u0438\\u0442\\u044c \\u043a\\u0430\\u0440\\u0442\\u043e\\u0447\\u043a\\u0443">+ \\u041a\\u0430\\u0440\\u0442\\u043e\\u0447\\u043a\\u0430</button>';
      r1 += '<button data-act="col-remove" class="tb-danger" title="\\u0423\\u0434\\u0430\\u043b\\u0438\\u0442\\u044c \\u043a\\u0430\\u0440\\u0442\\u043e\\u0447\\u043a\\u0443">\\u2715</button>';
      r1 += '<button data-act="col-move-left" title="\\u0412\\u043b\\u0435\\u0432\\u043e">\\u2190</button>';
      r1 += '<button data-act="col-move-right" title="\\u0412\\u043f\\u0440\\u0430\\u0432\\u043e">\\u2192</button>';
    }

    if (isBlock) {
      r1 += '<button data-act="block-bg" title="\\u0426\\u0432\\u0435\\u0442 \\u0444\\u043e\\u043d\\u0430"><span class="tb-color-dot" style="background:'+rgbToHex(cs.backgroundColor)+'"></span> \\u0424\\u043e\\u043d</button>';
      r1 += '<button data-act="block-bg-reset" title="\\u0421\\u0431\\u0440\\u043e\\u0441\\u0438\\u0442\\u044c \\u0444\\u043e\\u043d">\\u2715 \\u0424\\u043e\\u043d</button>';
      r1 += '<span class="tb-sep"></span>';
      r1 += '<button data-act="move-up" title="\\u0412\\u0432\\u0435\\u0440\\u0445">\\u2191</button>';
      r1 += '<button data-act="move-down" title="\\u0412\\u043d\\u0438\\u0437">\\u2193</button>';
    }

    r1 += '</div>';

    // ── Row 2: Spacing toggle (pad/margin) + Radius + Actions ──
    var spMode = el._tbSpacingMode || "padding";
    var st = parseInt(cs[spMode+"Top"])||0, sr = parseInt(cs[spMode+"Right"])||0;
    var sb = parseInt(cs[spMode+"Bottom"])||0, sl = parseInt(cs[spMode+"Left"])||0;
    var br = parseInt(cs.borderRadius)||0;
    var isPad = spMode === "padding";

    var r2 = '<div class="tb-row">';
    r2 += '<button data-act="toggle-spacing" class="tb-spacing-toggle" title="\\u041f\\u0435\\u0440\\u0435\\u043a\\u043b\\u044e\\u0447\\u0438\\u0442\\u044c padding/margin">';
    r2 += '<span class="'+(isPad?'is-active':'')+'">P</span><span class="'+(isPad?'':'is-active')+'">M</span></button>';
    r2 += '<div class="tb-spacing-group">';
    r2 += '<input class="tb-num" data-sp="'+spMode+'Top" type="number" min="'+(isPad?'0':'-200')+'" max="400" value="'+st+'" title="Top">';
    r2 += '<input class="tb-num" data-sp="'+spMode+'Right" type="number" min="'+(isPad?'0':'-200')+'" max="400" value="'+sr+'" title="Right">';
    r2 += '<input class="tb-num" data-sp="'+spMode+'Bottom" type="number" min="'+(isPad?'0':'-200')+'" max="400" value="'+sb+'" title="Bottom">';
    r2 += '<input class="tb-num" data-sp="'+spMode+'Left" type="number" min="'+(isPad?'0':'-200')+'" max="400" value="'+sl+'" title="Left">';
    r2 += '</div>';
    r2 += '<span class="tb-sep"></span>';
    r2 += '<span class="tb-lbl">R</span>';
    r2 += '<input class="tb-num" data-sp="borderRadius" type="number" min="0" max="200" value="'+br+'" title="Border radius">';
    r2 += '<span class="tb-sep"></span>';
    r2 += '<button data-act="duplicate" title="\\u0414\\u0443\\u0431\\u043b\\u0438\\u0440\\u043e\\u0432\\u0430\\u0442\\u044c"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 2H3.5A1.5 1.5 0 002 3.5V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>';
    r2 += '<button data-act="reset" title="\\u0421\\u0431\\u0440\\u043e\\u0441\\u0438\\u0442\\u044c \\u0441\\u0442\\u0438\\u043b\\u0438"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 5.5h5a3 3 0 110 6H5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M5 3L2.5 5.5 5 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
    r2 += '<button data-act="delete" class="tb-danger" title="\\u0423\\u0434\\u0430\\u043b\\u0438\\u0442\\u044c"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 4h9M5 4V3a1 1 0 011-1h2a1 1 0 011 1v1M4 4v7.5a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>';
    r2 += '</div>';

    // ── Row 3: Hint ──
    var r3 = '';
    if (isText) {
      r3 = '<div class="tb-hint">\\u0414\\u0432\\u043e\\u0439\\u043d\\u043e\\u0439 \\u043a\\u043b\\u0438\\u043a \\u2014 \\u0440\\u0435\\u0434\\u0430\\u043a\\u0442\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0442\\u0435\\u043a\\u0441\\u0442\\u0430</div>';
    } else if (isImg) {
      r3 = '<div class="tb-hint">\\u0414\\u0432\\u043e\\u0439\\u043d\\u043e\\u0439 \\u043a\\u043b\\u0438\\u043a \\u2014 \\u0432\\u0441\\u0442\\u0430\\u0432\\u0438\\u0442\\u044c URL</div>';
    }
    return r1 + r2 + r3;
  }

  function showToolbar(el, r) {
    if (!el) { toolbar.style.display = "none"; return; }
    toolbar.innerHTML = buildToolbarHtml(el);
    toolbar.appendChild(hiddenColor);
    toolbar.appendChild(hiddenFile);
    toolbar.style.display = "block";
    var tw = toolbar.offsetWidth;
    var tleft = Math.min(r.right - tw, Math.max(4, r.left));
    var ttop = r.top - toolbar.offsetHeight - 8;
    if (ttop < 4) ttop = r.bottom + 8;
    if (tleft + tw > window.innerWidth - 4) tleft = window.innerWidth - tw - 4;
    toolbar.style.top = ttop + "px";
    toolbar.style.left = tleft + "px";
  }

  hiddenColor.addEventListener("input", function() {
    if (selectedEl && colorTarget) sendStyleEdit(colorTarget, hiddenColor.value);
  });

  hiddenFile.addEventListener("change", function() {
    if (!selectedEl || selectedEl.tagName !== "IMG" || !hiddenFile.files[0]) return;
    convertToWebp(hiddenFile.files[0], function(dataUrl) {
      selectedEl.setAttribute("src", dataUrl);
      window.parent.postMessage({
        source: "site-builder-preview", type: "inline-edit",
        id: selectedEl.dataset.builderId, src: dataUrl, items: collect()
      }, "*");
    });
    hiddenFile.value = "";
  });

  toolbar.addEventListener("click", function(e) {
    var btn = e.target.closest("[data-act]");
    if (!btn || !selectedEl) return;
    var act = btn.dataset.act;
    var cs = getComputedStyle(selectedEl);

    if (act === "bold") sendStyleEdit("fontWeight", parseInt(cs.fontWeight) >= 600 ? "400" : "700");
    if (act === "italic") sendStyleEdit("fontStyle", cs.fontStyle === "italic" ? "normal" : "italic");
    if (act === "align-left") sendStyleEdit("textAlign", "left");
    if (act === "align-center") sendStyleEdit("textAlign", "center");
    if (act === "align-right") sendStyleEdit("textAlign", "right");

    if (act === "font-down" || act === "font-up") {
      var sz = parseInt(cs.fontSize) || 16;
      var step = sz > 24 ? 4 : 2;
      var nz = act === "font-up" ? sz + step : Math.max(8, sz - step);
      sendStyleEdit("fontSize", nz + "px");
    }

    if (act === "text-color") { colorTarget = "color"; hiddenColor.value = rgbToHex(cs.color); hiddenColor.click(); }
    if (act === "bg-color" || act === "block-bg") { colorTarget = "backgroundColor"; hiddenColor.value = rgbToHex(cs.backgroundColor); hiddenColor.click(); }

    if (act === "toggle-spacing") {
      selectedEl._tbSpacingMode = (selectedEl._tbSpacingMode || "padding") === "padding" ? "margin" : "padding";
      showOverlay(selectedEl);
      return;
    }

    if (act === "block-bg-reset") { sendStyleEdit("backgroundColor", ""); sendStyleEdit("backgroundImage", ""); }

    if (act === "img-url") showUrlPopup(selectedEl);
    if (act === "img-upload") hiddenFile.click();

    if (act === "reset") {
      var rid = selectedEl.dataset.builderId;
      selectedEl.style.cssText = "";
      delete styleState[rid];
      renderStyles();
      window.parent.postMessage({ source: "site-builder-preview", type: "reset-element", id: rid }, "*");
      showOverlay(selectedEl);
    }

    // ── Collection item actions ──
    if (act === "col-add") {
      var ci = selectedEl.closest("[data-collection-item]");
      if (ci) {
        var grid = ci.closest("[data-collection-grid]");
        var items = grid ? Array.from(grid.querySelectorAll(":scope > [data-collection-item]")) : [];
        var template = items[0] || ci;
        var newCard = template.cloneNode(true);
        newCard.querySelectorAll("[data-builder-id]").forEach(function(n){delete n.dataset.builderId;});
        delete newCard.dataset.builderId;
        ci.after(newCard);
        refreshAfterDom();
        setTimeout(function(){ select(newCard.dataset.builderId); }, 50);
      }
    }
    if (act === "col-remove") {
      var ci2 = selectedEl.closest("[data-collection-item]");
      if (ci2) {
        var grid2 = ci2.closest("[data-collection-grid]");
        var count = grid2 ? grid2.querySelectorAll(":scope > [data-collection-item]").length : 1;
        if (count <= 1) return;
        ci2.remove(); selectedEl = null;
        overlay.style.display = "none"; toolbar.style.display = "none";
        refreshAfterDom();
        window.parent.postMessage({ source: "site-builder-preview", type: "selected", id: null, items: collect() }, "*");
      }
    }
    if (act === "col-move-left") {
      var ci3 = selectedEl.closest("[data-collection-item]");
      if (ci3 && ci3.previousElementSibling && ci3.previousElementSibling.hasAttribute("data-collection-item")) {
        ci3.parentElement.insertBefore(ci3, ci3.previousElementSibling);
        refreshAfterDom();
      }
    }
    if (act === "col-move-right") {
      var ci4 = selectedEl.closest("[data-collection-item]");
      if (ci4 && ci4.nextElementSibling && ci4.nextElementSibling.hasAttribute("data-collection-item")) {
        ci4.parentElement.insertBefore(ci4.nextElementSibling, ci4);
        refreshAfterDom();
      }
    }

    if (act === "move-up") { var b = selectedEl.closest("[data-block]"); if (b && b.previousElementSibling) { b.parentElement.insertBefore(b, b.previousElementSibling); refreshAfterDom(); } }
    if (act === "move-down") { var b2 = selectedEl.closest("[data-block]"); if (b2 && b2.nextElementSibling) { b2.parentElement.insertBefore(b2.nextElementSibling, b2); refreshAfterDom(); } }
    if (act === "duplicate") {
      var target = selectedEl.hasAttribute("data-block") ? selectedEl : selectedEl.closest("[data-block]");
      if (target) { var clone = target.cloneNode(true); clone.querySelectorAll("[data-builder-id]").forEach(function(n){delete n.dataset.builderId;}); delete clone.dataset.builderId; target.after(clone); refreshAfterDom(); }
    }
    if (act === "delete") {
      var toDelete = selectedEl.hasAttribute("data-block") ? selectedEl : selectedEl;
      toDelete.remove(); selectedEl = null;
      overlay.style.display = "none"; toolbar.style.display = "none";
      var bodyHtml = getCleanBodyHtml();
      window.parent.postMessage({ source: "site-builder-preview", type: "dom-changed", html: bodyHtml, items: collect(), action: "delete" }, "*");
      window.parent.postMessage({ source: "site-builder-preview", type: "selected", id: null, items: collect() }, "*");
    }
  });

  toolbar.addEventListener("input", function(e) {
    var inp = e.target.closest("[data-sp]");
    if (!inp || !selectedEl) return;
    var prop = inp.dataset.sp;
    var val = parseInt(inp.value) || 0;
    skipToolbarRebuild = true;
    sendStyleEdit(prop, val + "px");
    skipToolbarRebuild = false;
  });

  toolbar.addEventListener("wheel", function(e) {
    var inp = e.target.closest("[data-sp]");
    if (!inp) return;
    e.preventDefault();
    var step = e.shiftKey ? 10 : 1;
    var cur = parseInt(inp.value) || 0;
    var delta = e.deltaY < 0 ? step : -step;
    var min = parseInt(inp.min); if (isNaN(min)) min = -9999;
    var next = Math.max(min, cur + delta);
    inp.value = next;
    inp.dispatchEvent(new Event("input", { bubbles: true }));
  }, { passive: false });

  toolbar.addEventListener("keydown", function(e) {
    var inp = e.target.closest("[data-sp]");
    if (!inp) return;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      var step = e.shiftKey ? 10 : 1;
      var cur = parseInt(inp.value) || 0;
      var next = e.key === "ArrowUp" ? cur + step : Math.max(0, cur - step);
      inp.value = next;
      inp.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  function getCleanBodyHtml() {
    var clone = document.body.cloneNode(true);
    clone.querySelectorAll("[data-builder-overlay],[data-builder-toolbar],[data-builder-col-btns],[data-builder-url-popup],[data-builder-generated-styles],[data-builder-ignore]").forEach(function(n){ n.remove(); });
    clone.querySelectorAll("script").forEach(function(n){ n.remove(); });
    clone.querySelectorAll("style").forEach(function(n){ n.remove(); });
    clone.querySelectorAll("[data-builder-id]").forEach(function(n){ n.removeAttribute("data-builder-id"); });
    clone.querySelectorAll("[data-builder-selected]").forEach(function(n){ n.removeAttribute("data-builder-selected"); });
    clone.querySelectorAll("[data-builder-inline-edit]").forEach(function(n){ n.removeAttribute("data-builder-inline-edit"); n.removeAttribute("contenteditable"); });
    return clone.innerHTML.trim();
  }

  function refreshAfterDom() {
    if (selectedEl) showOverlay(selectedEl);
    var bodyHtml = getCleanBodyHtml();
    window.parent.postMessage({ source: "site-builder-preview", type: "dom-changed", html: bodyHtml, items: collect() }, "*");
  }

  // ── Drag & drop blocks ──
  var dropIndicator = document.createElement("div");
  dropIndicator.dataset.builderIgnore = "true";
  dropIndicator.style.cssText = "position:absolute;left:0;right:0;height:4px;background:#2563eb;border-radius:2px;z-index:99999;display:none;pointer-events:none;";
  document.body.appendChild(dropIndicator);

  function initBlockDrag(block, startY) {
    dragState = { block: block, startY: startY, placeholder: null };
    block.style.opacity = "0.5";
    document.body.style.cursor = "grabbing";
  }
  function updateBlockDrag(y) {
    if (!dragState) return;
    var blocks = Array.from(document.querySelectorAll("[data-block]"));
    var closest = null, minDist = Infinity, insertBefore = true;
    blocks.forEach(function(b) {
      if (b === dragState.block) return;
      var r = b.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      var dist = Math.abs(y - mid);
      if (dist < minDist) { minDist = dist; closest = b; insertBefore = y < mid; }
    });
    if (closest) {
      var r = closest.getBoundingClientRect();
      dropIndicator.style.display = "block";
      dropIndicator.style.top = (insertBefore ? r.top - 2 : r.bottom - 2) + window.scrollY + "px";
      dropIndicator.style.left = r.left + "px";
      dropIndicator.style.width = r.width + "px";
      dragState.target = closest;
      dragState.insertBefore = insertBefore;
    }
  }
  function endBlockDrag() {
    if (!dragState) return;
    dropIndicator.style.display = "none";
    dragState.block.style.opacity = "";
    document.body.style.cursor = "";
    if (dragState.target) {
      if (dragState.insertBefore) {
        dragState.target.parentElement.insertBefore(dragState.block, dragState.target);
      } else {
        dragState.target.after(dragState.block);
      }
      refreshAfterDom();
    }
    dragState = null;
  }

  // ── Image drop ──
  document.addEventListener("dragover", function(e) {
    if (dragState) { updateBlockDrag(e.clientY); e.preventDefault(); return; }
    var img = e.target.closest("img[data-builder-id]");
    if (img && e.dataTransfer.types.indexOf("Files") !== -1) {
      e.preventDefault();
      img.style.outline = "3px solid #2563eb";
    }
  });
  document.addEventListener("dragleave", function(e) {
    var img = e.target.closest("img[data-builder-id]");
    if (img) img.style.outline = "";
  });
  document.addEventListener("drop", function(e) {
    if (dragState) { endBlockDrag(); e.preventDefault(); return; }
    var img = e.target.closest("img[data-builder-id]");
    if (!img) return;
    e.preventDefault();
    img.style.outline = "";
    var file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    convertToWebp(file, function(dataUrl) {
      img.setAttribute("src", dataUrl);
      window.parent.postMessage({
        source: "site-builder-preview", type: "inline-edit",
        id: img.dataset.builderId, src: dataUrl, items: collect()
      }, "*");
    });
  });

  // ── Inline editing ──
  function startInlineEdit(el) {
    if (!canEditText(el) || inlineEditingEl) return;
    inlineEditingEl = el;
    el.dataset.builderInlineEdit = "true";
    el.contentEditable = "true";
    el.focus();
    overlay.style.display = "none";
    toolbar.style.display = "none";
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  function commitInlineEdit() {
    if (!inlineEditingEl) return;
    var el = inlineEditingEl;
    el.contentEditable = "false";
    delete el.dataset.builderInlineEdit;
    inlineEditingEl = null;
    var newText = el.children.length ? getDirectText(el) : el.textContent.trim();
    window.parent.postMessage({
      source: "site-builder-preview", type: "inline-edit",
      id: el.dataset.builderId, text: newText, items: collect()
    }, "*");
    showOverlay(el);
  }

  // ── Selection ──
  function select(id) {
    if (inlineEditingEl) commitInlineEdit();
    document.querySelectorAll("[data-builder-selected]").forEach(function(n) { n.removeAttribute("data-builder-selected"); });
    var el = document.querySelector('[data-builder-id="' + CSS.escape(id) + '"]');
    if (!el) { selectedEl = null; overlay.style.display = "none"; toolbar.style.display = "none"; showCollectionAddButtons(null); return; }
    selectedEl = el;
    el.dataset.builderSelected = "true";
    showOverlay(el);
    window.parent.postMessage({ source: "site-builder-preview", type: "selected", id: id, items: collect() }, "*");
  }

  // ── Edit application ──
  function normalizeEdit(edit) {
    return {
      id: edit.id,
      content: { label: (edit.content && edit.content.label) || edit.label, text: (edit.content && edit.content.text) || edit.text, src: (edit.content && edit.content.src) || edit.src },
      design: {
        all: Object.assign({}, (edit.design && edit.design.all) || edit.styles || {}),
        desktop: Object.assign({}, (edit.design && edit.design.desktop) || {}),
        tablet: Object.assign({}, (edit.design && edit.design.tablet) || {}),
        mobile: Object.assign({}, (edit.design && edit.design.mobile) || {})
      }
    };
  }
  function mergeDesign(cur, next) {
    cur = cur || {}; next = next || {};
    return {
      all: Object.assign({}, cur.all||{}, next.all||{}),
      desktop: Object.assign({}, cur.desktop||{}, next.desktop||{}),
      tablet: Object.assign({}, cur.tablet||{}, next.tablet||{}),
      mobile: Object.assign({}, cur.mobile||{}, next.mobile||{})
    };
  }
  function kebab(s) { return s.replace(/[A-Z]/g, function(c) { return "-" + c.toLowerCase(); }); }
  function styleBody(styles) {
    return Object.keys(styles||{}).filter(function(k){return styles[k];}).map(function(k){return kebab(k)+":"+styles[k]+" !important;";}).join("");
  }
  function renderStyles() {
    var style = document.querySelector("[data-builder-generated-styles]");
    if (!style) { style = document.createElement("style"); style.dataset.builderGeneratedStyles = "true"; document.head.appendChild(style); }
    var rules = [];
    Object.keys(styleState).forEach(function(id) {
      var d = styleState[id], sel = '[data-builder-id="' + CSS.escape(id) + '"]';
      var ab = styleBody(d.all); if (ab) rules.push(sel+"{"+ab+"}");
      var db = styleBody(d.desktop); if (db) rules.push("@media(min-width:1024px){"+sel+"{"+db+"}}");
      var tb = styleBody(d.tablet); if (tb) rules.push("@media(min-width:768px)and(max-width:1023px){"+sel+"{"+tb+"}}");
      var mb = styleBody(d.mobile); if (mb) rules.push("@media(max-width:767px){"+sel+"{"+mb+"}}");
    });
    style.textContent = rules.join("\\n");
  }
  function applyEdit(edit) {
    var el = document.querySelector('[data-builder-id="' + CSS.escape(edit.id) + '"]');
    if (!el || el === inlineEditingEl) return;
    var n = normalizeEdit(edit);
    if (typeof n.content.label === "string") el.dataset.builderLabel = n.content.label;
    if (typeof n.content.text === "string" && canEditText(el)) setDirectText(el, n.content.text);
    if (typeof n.content.src === "string" && el.tagName === "IMG") el.setAttribute("src", n.content.src);
    styleState[n.id] = mergeDesign(styleState[n.id], n.design);
    renderStyles();
  }

  // ── Context menu ──
  var copiedStyles = null;
  var ctxMenu = document.createElement("div");
  ctxMenu.dataset.builderCtx = "true";
  ctxMenu.style.cssText = "position:fixed;display:none;z-index:100000;background:#1e1e2e;border-radius:10px;padding:4px;min-width:180px;box-shadow:0 12px 40px rgba(0,0,0,.35);";
  var ctxStyle = document.createElement("style");
  ctxStyle.textContent = '[data-builder-ctx] button{display:flex;align-items:center;justify-content:space-between;width:100%;padding:8px 12px;border:0;border-radius:6px;background:transparent;color:#cdd6f4;font-size:13px;cursor:pointer;text-align:left;gap:12px}[data-builder-ctx] button:hover{background:#313244;color:#fff}[data-builder-ctx] button kbd{font:600 11px ui-monospace,monospace;color:#6c7086}[data-builder-ctx] .ctx-sep{height:1px;background:#313244;margin:4px 0}';
  document.head.appendChild(ctxStyle);
  document.body.appendChild(ctxMenu);

  function showCtxMenu(x, y, el) {
    var isBlock = el.hasAttribute("data-block");
    ctxMenu.innerHTML = '<button data-ctx="copy-styles">Копировать стили<kbd>Alt+C</kbd></button>'
      + '<button data-ctx="paste-styles"' + (copiedStyles ? '' : ' disabled style="opacity:.4"') + '>Вставить стили<kbd>Alt+V</kbd></button>'
      + '<div class="ctx-sep"></div>'
      + '<button data-ctx="duplicate">Дублировать</button>'
      + (isBlock ? '<button data-ctx="move-up">Переместить вверх</button><button data-ctx="move-down">Переместить вниз</button>' : '')
      + '<div class="ctx-sep"></div>'
      + '<button data-ctx="wrap">Обернуть в div</button>'
      + '<button data-ctx="delete" style="color:#f38ba8">Удалить</button>';
    ctxMenu.style.display = "block";
    var mw = ctxMenu.offsetWidth, mh = ctxMenu.offsetHeight;
    ctxMenu.style.left = Math.min(x, window.innerWidth - mw - 8) + "px";
    ctxMenu.style.top = Math.min(y, window.innerHeight - mh - 8) + "px";
  }

  ctxMenu.addEventListener("click", function(e) {
    var btn = e.target.closest("[data-ctx]");
    if (!btn || !selectedEl) { ctxMenu.style.display = "none"; return; }
    var act = btn.dataset.ctx;
    if (act === "copy-styles") { copiedStyles = getStyles(selectedEl); }
    if (act === "paste-styles" && copiedStyles) {
      window.parent.postMessage({ source: "site-builder-preview", type: "paste-styles", id: selectedEl.dataset.builderId, styles: copiedStyles }, "*");
    }
    if (act === "duplicate") {
      var target = selectedEl.hasAttribute("data-block") ? selectedEl : selectedEl.closest("[data-block]");
      if (target) { var clone = target.cloneNode(true); clone.querySelectorAll("[data-builder-id]").forEach(function(n){delete n.dataset.builderId;}); delete clone.dataset.builderId; target.after(clone); refreshAfterDom(); }
    }
    if (act === "move-up") { var b = selectedEl.closest("[data-block]"); if (b && b.previousElementSibling) { b.parentElement.insertBefore(b, b.previousElementSibling); refreshAfterDom(); } }
    if (act === "move-down") { var b2 = selectedEl.closest("[data-block]"); if (b2 && b2.nextElementSibling) { b2.parentElement.insertBefore(b2.nextElementSibling, b2); refreshAfterDom(); } }
    if (act === "wrap") { var wrapper = document.createElement("div"); selectedEl.parentElement.insertBefore(wrapper, selectedEl); wrapper.appendChild(selectedEl); refreshAfterDom(); }
    if (act === "delete") { selectedEl.remove(); selectedEl = null; overlay.style.display = "none"; toolbar.style.display = "none"; refreshAfterDom(); window.parent.postMessage({ source: "site-builder-preview", type: "selected", id: null, items: collect() }, "*"); }
    ctxMenu.style.display = "none";
  });

  document.addEventListener("contextmenu", function(e) {
    var t = e.target.closest("[data-builder-id]");
    if (!t) { ctxMenu.style.display = "none"; return; }
    e.preventDefault();
    select(t.dataset.builderId);
    showCtxMenu(e.clientX, e.clientY, t);
  });
  document.addEventListener("click", function() { ctxMenu.style.display = "none"; });

  // ── Prevent native image drag ──
  document.addEventListener("dragstart", function(e) {
    if (e.target.tagName === "IMG" && e.target.closest("[data-builder-id]")) e.preventDefault();
  }, true);

  // ── Events ──
  var mouseDownY = 0, mouseDownEl = null, mouseDownTime = 0;
  document.addEventListener("mousedown", function(e) {
    if (e.target.tagName === "IMG") e.preventDefault();
    if (e.target.closest("[data-builder-toolbar]") || e.target.closest("[data-builder-col-btns]")) return;
    var collectionItem = e.target.closest("[data-collection-item]");
    if (collectionItem) return;
    var block = e.target.closest("[data-block]");
    if (block && !inlineEditingEl) {
      mouseDownY = e.clientY;
      mouseDownEl = block;
      mouseDownTime = Date.now();
    }
  });
  document.addEventListener("mousemove", function(e) {
    if (mouseDownEl && !dragState && Math.abs(e.clientY - mouseDownY) > 8 && Date.now() - mouseDownTime > 150) {
      initBlockDrag(mouseDownEl, mouseDownY);
    }
    if (dragState) { updateBlockDrag(e.clientY); e.preventDefault(); }
  });
  document.addEventListener("mouseup", function(e) {
    mouseDownEl = null;
    if (dragState) endBlockDrag();
  });

  document.addEventListener("click", function(e) {
    if (dragState) return;
    if (inlineEditingEl && !inlineEditingEl.contains(e.target)) commitInlineEdit();
    var t = e.target.closest("[data-builder-id]");
    if (!t || t === inlineEditingEl) return;
    e.preventDefault(); e.stopPropagation();
    select(t.dataset.builderId);
  }, true);

  document.addEventListener("dblclick", function(e) {
    var t = e.target.closest("[data-builder-id]");
    if (!t) return;
    e.preventDefault(); e.stopPropagation();
    if (t.tagName === "IMG") { selectedEl = t; hiddenFile.click(); return; }
    startInlineEdit(t);
  }, true);

  document.addEventListener("keydown", function(e) {
    if (inlineEditingEl) {
      if (e.key === "Escape") { commitInlineEdit(); e.preventDefault(); }
      if (e.key === "Enter" && !e.shiftKey) { commitInlineEdit(); e.preventDefault(); }
      return;
    }
    if (e.key === "Escape") {
      selectedEl = null;
      document.querySelectorAll("[data-builder-selected]").forEach(function(n) { n.removeAttribute("data-builder-selected"); });
      overlay.style.display = "none";
      toolbar.style.display = "none";
      window.parent.postMessage({ source: "site-builder-preview", type: "selected", id: null, items: collect() }, "*");
    }
  });

  window.addEventListener("scroll", function() {
    if (selectedEl) showOverlay(selectedEl);
  });
  window.addEventListener("resize", function() {
    if (selectedEl) showOverlay(selectedEl);
  });

  // ── Animations ──
  var animState = {};
  var animStyle = null;
  var scrollObserver = null;

  function ensureAnimStyle() {
    if (!animStyle) { animStyle = document.createElement("style"); animStyle.dataset.builderAnimations = "true"; document.head.appendChild(animStyle); }
    return animStyle;
  }
  function setupScrollObserver() {
    if (scrollObserver) return;
    scrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.dataset.builderVisible = "true";
        }
      });
    }, { threshold: 0.15 });
  }
  function applyAnimationPreset(id, css, trigger, keyframes) {
    var el = document.querySelector('[data-builder-id="' + CSS.escape(id) + '"]');
    if (!el) return;
    animState[id] = { css: css, trigger: trigger };
    if (keyframes) {
      var kfStyle = document.querySelector("[data-builder-keyframes]");
      if (!kfStyle) { kfStyle = document.createElement("style"); kfStyle.dataset.builderKeyframes = "true"; document.head.appendChild(kfStyle); }
      kfStyle.textContent = keyframes;
    }
    if (trigger === "scroll") {
      setupScrollObserver();
      scrollObserver.observe(el);
      el.removeAttribute("data-builder-visible");
    }
    renderAnimStyles();
  }
  function removeAnimPreset(id) {
    var el = document.querySelector('[data-builder-id="' + CSS.escape(id) + '"]');
    if (el) { el.removeAttribute("data-builder-visible"); if (scrollObserver) scrollObserver.unobserve(el); }
    delete animState[id];
    renderAnimStyles();
  }
  function renderAnimStyles() {
    var s = ensureAnimStyle();
    var rules = [];
    Object.keys(animState).forEach(function(id) {
      var a = animState[id];
      var sel = '[data-builder-id="' + CSS.escape(id) + '"]';
      var parts = a.css.split("&:hover");
      rules.push(sel + "{" + parts[0] + "}");
      if (parts[1]) rules.push(sel + ":hover" + parts[1]);
      if (a.trigger === "scroll") {
        rules.push(sel + '[data-builder-visible="true"]{opacity:1!important;transform:none!important;filter:none!important}');
      }
    });
    s.textContent = rules.join("\\n");
  }

  window.addEventListener("message", function(e) {
    var m = e.data || {};
    if (m.source !== "site-builder-parent") return;
    if (m.type === "select") select(m.id);
    if (m.type === "edit") { applyEdit(m.edit); window.parent.postMessage({ source: "site-builder-preview", type: "changed", items: collect() }, "*"); }
    if (m.type === "restore-edits") {
      styleState = {};
      Object.keys(originalContent).forEach(function(id) {
        var el = document.querySelector('[data-builder-id="' + CSS.escape(id) + '"]');
        if (!el) return;
        el.style.cssText = "";
        var orig = originalContent[id];
        if (orig.text !== null && canEditText(el)) setDirectText(el, orig.text);
        if (orig.src !== null && el.tagName === "IMG") el.setAttribute("src", orig.src);
      });
      renderStyles();
      (m.edits || []).forEach(applyEdit);
      window.parent.postMessage({ source: "site-builder-preview", type: "changed", items: collect() }, "*");
    }
    if (m.type === "apply-animation") applyAnimationPreset(m.id, m.css, m.trigger, m.keyframes);
    if (m.type === "remove-animation") removeAnimPreset(m.id);
  });

  function captureOriginals() {
    document.querySelectorAll("[data-block]").forEach(function(block) {
      block.querySelectorAll(editableSelector).forEach(function(el) {
        if (el.closest("[data-builder-ignore]") || !el.dataset.builderId) return;
        if (!originalContent[el.dataset.builderId]) {
          originalContent[el.dataset.builderId] = {
            text: canEditText(el) ? (el.children.length ? getDirectText(el) : (el.textContent||"").trim()) : null,
            src: el.tagName === "IMG" ? el.getAttribute("src") : null
          };
        }
      });
    });
  }

  collect();
  captureOriginals();
  initialEdits.forEach(applyEdit);

  // ── "+" buttons between blocks ──
  var blockAddBtns = document.createElement("div");
  blockAddBtns.dataset.builderIgnore = "true";
  blockAddBtns.style.cssText = "position:absolute;top:0;left:0;width:100%;pointer-events:none;z-index:99996;";
  document.body.appendChild(blockAddBtns);

  function renderBlockAddButtons() {
    blockAddBtns.innerHTML = "";
    var blocks = Array.from(document.querySelectorAll("[data-block]"));
    blocks.forEach(function(block, i) {
      var r = block.getBoundingClientRect();
      var btn = document.createElement("button");
      btn.dataset.builderIgnore = "true";
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      btn.style.cssText = "position:absolute;pointer-events:auto;left:50%;transform:translateX(-50%);width:28px;height:28px;border-radius:50%;border:1.5px solid #cbd5e1;background:#f8fafc;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.08);";
      btn.style.top = (r.bottom + window.scrollY - 14) + "px";
      btn.addEventListener("mouseenter", function(){ btn.style.borderColor = "#6366f1"; btn.style.color = "#6366f1"; btn.style.background = "#eef2ff"; btn.style.transform = "translateX(-50%) scale(1.15)"; btn.style.boxShadow = "0 2px 8px rgba(99,102,241,.25)"; });
      btn.addEventListener("mouseleave", function(){ btn.style.borderColor = "#cbd5e1"; btn.style.color = "#94a3b8"; btn.style.background = "#f8fafc"; btn.style.transform = "translateX(-50%) scale(1)"; btn.style.boxShadow = "0 1px 3px rgba(0,0,0,.08)"; });
      btn.addEventListener("click", function(ev) {
        ev.stopPropagation();
        window.parent.postMessage({ source: "site-builder-preview", type: "insert-block-after", blockIndex: i }, "*");
      });
      blockAddBtns.appendChild(btn);
    });
  }
  var blockAddDebounce = null;
  function scheduleBlockAddButtons() { clearTimeout(blockAddDebounce); blockAddDebounce = setTimeout(renderBlockAddButtons, 150); }
  setTimeout(renderBlockAddButtons, 300);
  window.addEventListener("scroll", scheduleBlockAddButtons);
  window.addEventListener("resize", scheduleBlockAddButtons);

  window.parent.postMessage({ source: "site-builder-preview", type: "ready", items: collect() }, "*");
}`;