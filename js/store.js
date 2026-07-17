"use strict";
/* ═══════════ 資料儲存 · Storage ═══════════
   localStorage 讀寫、資料正規化、匯入合併。
   localStorage persistence, normalisation, import merging. */

const LS_KEY = "attachment-topography-v1";
const SLOT_VARS = ["--s1","--s2","--s3","--s4","--s5","--s6","--s7","--s8"];

/* 舊版資料以中文儲存關係類別，轉換成 key · migrate legacy Chinese type labels */
const LEGACY_TYPES = {
  "一般依附風格":"general","伴侶":"partner","母親":"mother","父親":"father",
  "家人":"family","朋友":"friend","同事":"colleague","其他":"other",
};

let db = loadDb();

function loadDb(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(raw){
      const d = JSON.parse(raw);
      if(d && Array.isArray(d.people)) return normalizeDb(d);
    }
  }catch(e){}
  return {version:1, people:[], collab:[]};
}
function saveDb(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(db)); }catch(e){} }

function normalizeDb(d){
  d.version = 1;
  d.people = (d.people||[]).map((p,i)=>({
    id: p.id || uid(),
    name: String(p.name||"?").slice(0,20),
    type: REL_KEYS.includes(p.type) ? p.type : (LEGACY_TYPES[p.type] || "other"),
    slot: Number.isInteger(p.slot) ? p.slot : i % SLOT_VARS.length,
    results: (p.results||[]).filter(r=>typeof r.anxiety==="number" && typeof r.avoidance==="number")
      .map(r=>({date:r.date||new Date().toISOString(), answers:r.answers||[],
        anxiety:r.anxiety, avoidance:r.avoidance, style:r.style||styleOf(r.anxiety,r.avoidance)})),
  }));
  d.collab = (d.collab||[]).filter(c=>typeof c.total==="number");
  return d;
}

/* 匯入：合併（以 id 或名稱對應，補回未見過的紀錄）· import-merge */
function mergeDb(incoming){
  incoming.people.forEach(np=>{
    const mine = db.people.find(p=>p.id===np.id || p.name===np.name);
    if(!mine){
      np.slot = db.people.length % SLOT_VARS.length;
      db.people.push(np);
    }else{
      (np.results||[]).forEach(r=>{
        if(!mine.results.some(m=>m.date===r.date)) mine.results.push(r);
      });
      mine.results.sort((a,b)=>a.date.localeCompare(b.date));
    }
  });
  (incoming.collab||[]).forEach(c=>{
    if(!db.collab.some(m=>m.id===c.id)) db.collab.push(c);
  });
  db = normalizeDb(db);
  saveDb();
}
function replaceDb(incoming){ db = normalizeDb(incoming); saveDb(); }
function wipeDb(){ db = {version:1, people:[], collab:[]}; saveDb(); }
function dbStats(d){
  d = d || db;
  return {p:d.people.length, r:d.people.reduce((a,p)=>a+(p.results?p.results.length:0),0), c:(d.collab||[]).length};
}

/* ── 通用小工具 · small helpers ── */
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function fmtDate(iso){ const d=new Date(iso); return d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate(); }
function stamp(){ const d=new Date(); return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0"); }
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
function downloadBlob(blob, filename){
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(a.href), 3000);
}
