"use strict";
/* ═══════════ 地形圖 · Topography chart (SVG) ═══════════
   四象限散點圖：橫軸焦慮、縱軸迴避，各 1–7 分，4 分為界。
   Quadrant scatter: x = anxiety, y = avoidance, 1–7, split at 4. */

const CHART_W = 560, CHART_H = 520;

function cssVar(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
function slotColor(slot){ return cssVar(SLOT_VARS[slot % SLOT_VARS.length]) || "#2a78d6"; }

function buildChart(opt){
  opt = opt||{};
  const W=CHART_W, H=CHART_H, m={t:26, r:20, b:64, l:46};
  const iw=W-m.l-m.r, ih=H-m.t-m.b;
  const x=v=>m.l+(v-1)/6*iw, y=v=>m.t+ih-(v-1)/6*ih;
  const ink3=cssVar("--ink-3"), grid=cssVar("--grid"), axis=cssVar("--axis"),
        ink2=cssVar("--ink-2"), surface=cssVar("--surface-1");
  const NS="http://www.w3.org/2000/svg";
  const svg=document.createElementNS(NS,"svg");
  svg.setAttribute("viewBox","0 0 "+W+" "+H);
  svg.setAttribute("width",W); svg.setAttribute("height",H);
  svg.setAttribute("font-family","system-ui, -apple-system, 'PingFang HK', 'Microsoft JhengHei', sans-serif");
  svg.setAttribute("role","img");
  svg.setAttribute("aria-label", t("chart.aria"));
  function el(tag, attrs, text){
    const e=document.createElementNS(NS,tag);
    for(const k in attrs) e.setAttribute(k, attrs[k]);
    if(text!=null) e.textContent=text;
    svg.appendChild(e); return e;
  }
  // 格線 · gridlines
  for(let v=1; v<=7; v++){
    el("line",{x1:x(v),y1:m.t,x2:x(v),y2:m.t+ih,stroke:grid,"stroke-width":1});
    el("line",{x1:m.l,y1:y(v),x2:m.l+iw,y2:y(v),stroke:grid,"stroke-width":1});
    el("text",{x:x(v),y:m.t+ih+18,"text-anchor":"middle","font-size":12.5,fill:ink3}, v);
    el("text",{x:m.l-10,y:y(v)+4,"text-anchor":"end","font-size":12.5,fill:ink3}, v);
  }
  // 象限分界（4 分虛線）· quadrant split
  el("line",{x1:x(4),y1:m.t,x2:x(4),y2:m.t+ih,stroke:ink2,"stroke-width":1.5,"stroke-dasharray":"4 4"});
  el("line",{x1:m.l,y1:y(4),x2:m.l+iw,y2:y(4),stroke:ink2,"stroke-width":1.5,"stroke-dasharray":"4 4"});
  // 座標軸 · axes
  el("line",{x1:m.l,y1:m.t+ih,x2:m.l+iw,y2:m.t+ih,stroke:axis,"stroke-width":1.5});
  el("line",{x1:m.l,y1:m.t,x2:m.l,y2:m.t+ih,stroke:axis,"stroke-width":1.5});
  // 象限浮水印 · quadrant watermarks (serif, like chapter titles)
  const wm={"font-size":17,fill:ink3,opacity:.55,"text-anchor":"middle","font-weight":600,
    "font-family":"'Songti TC','Noto Serif TC','Songti SC',Georgia,serif"};
  el("text",Object.assign({x:x(2.5),y:y(2.4)},wm), t("chart.secure"));
  el("text",Object.assign({x:x(5.5),y:y(2.4)},wm), t("chart.anxious"));
  el("text",Object.assign({x:x(2.5),y:y(5.8)},wm), t("chart.avoidant"));
  el("text",Object.assign({x:x(5.5),y:y(5.8)},wm), t("chart.fearful"));
  // 軸標題 · axis titles
  el("text",{x:m.l+iw/2,y:H-26,"text-anchor":"middle","font-size":14,fill:ink2}, t("chart.xAxis"));
  const yl=el("text",{x:14,y:m.t+ih/2,"text-anchor":"middle","font-size":14,fill:ink2}, t("chart.yAxis"));
  yl.setAttribute("transform","rotate(-90 14 "+(m.t+ih/2)+")");
  el("text",{x:m.l+4,y:H-26,"font-size":12.5,fill:ink3}, t("chart.mostSecure"));

  // 資料點 · data points
  db.people.forEach(p=>{
    if(opt.hidden && opt.hidden.has(p.id)) return;
    if(!p.results.length) return;
    const c=slotColor(p.slot);
    const pts=p.results.map(r=>({cx:x(r.anxiety), cy:y(r.avoidance), r}));
    // 軌跡 · trajectory
    if(pts.length>1){
      const dstr="M"+pts.map(q=>q.cx.toFixed(1)+" "+q.cy.toFixed(1)).join(" L");
      el("path",{d:dstr,fill:"none",stroke:c,"stroke-width":2,opacity:.45});
    }
    pts.forEach((q,i)=>{
      const latest=i===pts.length-1;
      const dot=el("circle",{cx:q.cx,cy:q.cy,r:latest?7:4.5,fill:c,opacity:latest?1:.45,
        stroke:surface,"stroke-width":2,cursor:"pointer"});
      if(opt.onPoint) dot.addEventListener("click",()=>opt.onPoint(p,q.r));
      const tt=document.createElementNS(NS,"title");
      tt.textContent=p.name+" · "+fmtDate(q.r.date)+" · "+t("chart.tipAnx")+" "+q.r.anxiety.toFixed(2)+" / "+t("chart.tipAvd")+" "+q.r.avoidance.toFixed(2);
      dot.appendChild(tt);
      if(latest){
        const lx=Math.min(q.cx+10, m.l+iw-4);
        el("text",{x:lx,y:q.cy-10,"font-size":14,fill:cssVar("--ink-1"),"font-weight":600,
          "text-anchor": q.cx>m.l+iw-70?"end":"start",
          stroke:surface,"stroke-width":3,"paint-order":"stroke"}, p.name);
      }
    });
    // 高亮最新一筆 · highlight ring
    if(opt.highlight===p.id && pts.length){
      const q=pts[pts.length-1];
      el("circle",{cx:q.cx,cy:q.cy,r:12,fill:"none",stroke:c,"stroke-width":1.5,"stroke-dasharray":"2 3"});
    }
  });
  const fig=document.createElement("figure");
  fig.className="viz";
  fig.appendChild(svg);
  return fig;
}

/* 將 SVG 轉成 PNG 下載 · rasterise the map to a PNG download */
function exportChartPng(svg, onFail){
  const xml = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(new Blob([xml], {type:"image/svg+xml;charset=utf-8"}));
  const img = new Image();
  img.onload = ()=>{
    const scale=2, headH=44, W=CHART_W, H=CHART_H;
    const c=document.createElement("canvas");
    c.width=W*scale; c.height=(H+headH)*scale;
    const ctx=c.getContext("2d");
    ctx.scale(scale,scale);
    ctx.fillStyle=cssVar("--surface-1")||"#fcfcfb";
    ctx.fillRect(0,0,W,H+headH);
    ctx.fillStyle=cssVar("--ink-1")||"#0b0b0b";
    ctx.font="600 16px system-ui, -apple-system, 'PingFang HK', sans-serif";
    ctx.fillText(t("chart.imgTitle"), 20, 27);
    const titleW=ctx.measureText(t("chart.imgTitle")).width;
    ctx.fillStyle=cssVar("--ink-3")||"#898781";
    ctx.font="11px system-ui, -apple-system, 'PingFang HK', sans-serif";
    ctx.fillText(fmtDate(new Date().toISOString())+" · "+t("chart.imgCredit"), 20+titleW+14, 27);
    ctx.drawImage(img, 0, headH, W, H);
    URL.revokeObjectURL(url);
    c.toBlob(b=>downloadBlob(b, "attachment-map-"+stamp()+".png"), "image/png");
  };
  img.onerror = ()=>{ URL.revokeObjectURL(url); onFail && onFail(); };
  img.src = url;
}
