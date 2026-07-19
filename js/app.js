"use strict";
/* ═══════════ 主程式 · App (views, quiz flow, records, backup) ═══════════ */

/* ── 檢視切換 · view switching ── */
const VIEWS = ["landing","home","quiz","result","map","records","collab"];
let currentView = "landing";
function show(view){
  currentView = view;
  VIEWS.forEach(v=>document.getElementById("view-"+v).classList.toggle("hide", v!==view));
  document.querySelectorAll("nav.tabs button").forEach(b=>{
    const owns = b.dataset.view===view || (b.dataset.view==="home" && (view==="quiz"||view==="result"));
    b.setAttribute("aria-selected", owns?"true":"false");
  });
  if(view==="landing") renderLanding();
  if(view==="map") renderMap();
  if(view==="records"){ renderRecords(); renderDataStats(); }
  if(view==="home") renderHome();
  if(view==="collab") renderCollabHistory();
  window.scrollTo({top:0});
}
document.querySelectorAll("nav.tabs button").forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
document.getElementById("homeLink").addEventListener("click",e=>{ e.preventDefault(); show("landing"); });
document.getElementById("landingStart").addEventListener("click",()=>show("home"));
document.getElementById("landingMap").addEventListener("click",()=>show("map"));
function renderLanding(){
  const has = db.people.some(p=>p.results.length);
  document.getElementById("landingMap").classList.toggle("hide", !has);
}

/* ── 語言切換 · language toggle ── */
document.getElementById("langBtn").addEventListener("click",()=>{
  setLang(LANG==="zh" ? "en" : "zh");
  refreshLang();
});
function refreshLang(){
  applyI18n();
  renderHome();
  renderCollabItems();
  renderDataStats();
  if(currentView==="quiz" && quiz) renderQuestion();
  else if(currentView==="result" && lastResult) renderResult(lastResult);
  else show(currentView);
}

/* ── 主題切換 · theme toggle ── */
document.getElementById("themeBtn").addEventListener("click",()=>{
  const r=document.documentElement;
  const dark = r.dataset.theme==="dark" || (!r.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.theme = dark ? "light" : "dark";
  if(currentView==="map") renderMap();
  if(currentView==="result" && lastResult) renderResult(lastResult);
});

/* ── 測驗首頁 · quiz home ── */
let selType = "general", selExisting = null;
function renderHome(){
  const tr = document.getElementById("relTypes");
  tr.innerHTML = "";
  REL_KEYS.forEach(k=>{
    const b=document.createElement("button");
    b.type="button"; b.className="chip"; b.textContent=t("rel."+k);
    b.setAttribute("aria-pressed", k===selType && !selExisting ? "true":"false");
    b.addEventListener("click",()=>{ selType=k; selExisting=null;
      if(k==="general") document.getElementById("personName").value=t("rel.general.short");
      renderHome(); });
    tr.appendChild(b);
  });
  const ex = document.getElementById("existingPeople");
  const row = document.getElementById("existingRow");
  ex.innerHTML="";
  if(db.people.length){
    row.classList.remove("hide");
    db.people.forEach(p=>{
      const b=document.createElement("button");
      b.type="button"; b.className="chip";
      b.textContent = p.name+" · "+p.results.length+" "+t(p.results.length===1?"home.recordOne":"home.recordMany");
      b.setAttribute("aria-pressed", selExisting===p.id?"true":"false");
      b.addEventListener("click",()=>{ selExisting = selExisting===p.id?null:p.id; renderHome(); });
      ex.appendChild(b);
    });
  } else row.classList.add("hide");
}

/* ── 作答流程 · quiz flow ── */
let quiz = null, lastResult = null;
document.getElementById("startBtn").addEventListener("click",()=>{
  let person;
  if(selExisting){
    person = db.people.find(p=>p.id===selExisting);
  }else{
    const name = document.getElementById("personName").value.trim() ||
                 (selType==="general" ? t("rel.general.short") : t("rel."+selType));
    person = db.people.find(p=>p.name===name);
    if(!person){
      person = {id:uid(), name, type:selType, slot: db.people.length % SLOT_VARS.length, results:[]};
    }
  }
  quiz = {person, i:0, answers:Array(9).fill(0), isNew: !db.people.some(p=>p.id===person.id)};
  renderQuestion();
  show("quiz");
});
document.getElementById("quitBtn").addEventListener("click",()=>{ quiz=null; show("home"); });
document.getElementById("prevBtn").addEventListener("click",()=>{ if(quiz && quiz.i>0){ quiz.i--; renderQuestion(); } });

function renderQuestion(){
  // 一般依附風格用整體版題目與提示，避免「這個人」的矛盾
  const isGen = quiz.person.type==="general";
  document.getElementById("quizWho").textContent = isGen ? t("quiz.whoGeneral")
    : tp("quiz.who",{name:quiz.person.name, type:t("rel."+quiz.person.type)});
  document.getElementById("quizReminder").textContent = isGen ? t("quiz.generalReminder") : t("quiz.specificReminder");
  document.getElementById("qnum").textContent = tp("quiz.qnum",{n:quiz.i+1});
  const qt = document.getElementById("qtext");
  qt.textContent = (isGen ? t("questionsGeneral") : t("questions"))[quiz.i];
  qt.classList.remove("qanim"); void qt.offsetWidth; qt.classList.add("qanim");
  document.getElementById("pbar").style.width = ((quiz.i+1)/9*100)+"%";
  document.getElementById("prevBtn").disabled = quiz.i===0;
  const labels = t("scaleLabels");
  const lab = document.getElementById("scaleLabel");
  lab.textContent = quiz.answers[quiz.i] ? labels[quiz.answers[quiz.i]-1] : " ";
  const sc = document.getElementById("scale7");
  sc.innerHTML="";
  for(let v=1; v<=7; v++){
    const b=document.createElement("button");
    b.type="button";
    b.setAttribute("aria-label", v+" · "+labels[v-1]);
    b.setAttribute("aria-pressed", quiz.answers[quiz.i]===v?"true":"false");
    const d=document.createElement("span");
    d.className="dotv";
    b.appendChild(d);
    b.addEventListener("click",()=>{
      quiz.answers[quiz.i]=v;
      lab.textContent = labels[v-1];
      sc.querySelectorAll("button").forEach((bb,idx)=>{
        bb.setAttribute("aria-pressed", idx+1===v?"true":"false");
        bb.disabled = true; // 稍停讓選擇被看見，再前進
      });
      const at = quiz.i;
      setTimeout(()=>{
        if(!quiz || quiz.i!==at) return;
        if(quiz.i<8){ quiz.i++; renderQuestion(); }
        else finishQuiz();
      }, 260);
    });
    sc.appendChild(b);
  }
}

function finishQuiz(){
  const s = scoreAnswers(quiz.answers);
  const st = styleOf(s.anxiety, s.avoidance);
  const rec = {date:new Date().toISOString(), answers:quiz.answers.slice(), anxiety:s.anxiety, avoidance:s.avoidance, style:st};
  if(quiz.isNew) db.people.push(quiz.person);
  quiz.person.results.push(rec);
  saveDb();
  lastResult = {person:quiz.person, rec};
  quiz=null;
  renderResult(lastResult);
  show("result");
}

/* 風格標籤底色：固定深色，配白字在深淺兩種主題下都夠對比
   （圖上的每人顏色是另一套，與此無關） */
function styleColor(styleKey){
  return {secure:"#2e7d32", anxious:"#9a6400", avoidant:"#1c5cab", fearful:"#b5451d"}[styleKey];
}

function renderResult({person, rec}){
  const st = t("styles")[rec.style];
  const isGen = person.type==="general";
  document.getElementById("resultCard").innerHTML =
    '<p class="tiny">'+esc(person.name)+"（"+t("rel."+person.type)+"）· "+fmtDate(rec.date)+"</p>"+
    "<h2>"+t(isGen?"result.styleIsGeneral":"result.styleIs")+'<span class="badge" style="background:'+styleColor(rec.style)+'">'+st.name+"</span></h2>"+
    '<div class="tiles">'+
      '<div class="tile"><div class="v">'+rec.anxiety.toFixed(2)+'</div><div class="l">'+t("result.anxLabel")+"</div></div>"+
      '<div class="tile"><div class="v">'+rec.avoidance.toFixed(2)+'</div><div class="l">'+t("result.avdLabel")+"</div></div>"+
    "</div>"+
    '<p class="tiny">'+t(isGen?"result.snapshotNoteGeneral":"result.snapshotNote")+"</p>"+
    "<p>"+((isGen && st.descGeneral) ? st.descGeneral : st.desc)+"</p><h3>"+t("result.tipTitle")+"</h3><p class='muted'>"+st.tip+"</p>"+
    (person.results.length>1 ? '<p class="tiny">'+tp("result.nth",{name:esc(person.name), n:person.results.length})+"</p>" : "");
  const box=document.getElementById("resultChart");
  box.innerHTML="";
  box.appendChild(buildChart({highlight:person.id}));
}
document.getElementById("toMapBtn").addEventListener("click",()=>show("map"));
document.getElementById("againBtn").addEventListener("click",()=>{ selExisting=null; show("home"); });

/* ── 地形圖 · map view ── */
const hiddenPeople = new Set();
function renderMap(){
  const lg=document.getElementById("legend");
  lg.innerHTML="";
  db.people.filter(p=>p.results.length).forEach(p=>{
    const b=document.createElement("button");
    b.type="button";
    b.setAttribute("aria-pressed", hiddenPeople.has(p.id)?"false":"true");
    const d=document.createElement("span");
    d.className="dot"; d.style.background=slotColor(p.slot);
    b.appendChild(d);
    b.appendChild(document.createTextNode(p.name));
    b.addEventListener("click",()=>{
      hiddenPeople.has(p.id)?hiddenPeople.delete(p.id):hiddenPeople.add(p.id);
      renderMap();
    });
    lg.appendChild(b);
  });
  const box=document.getElementById("mapChart");
  box.innerHTML="";
  if(db.people.some(p=>p.results.length)){
    box.appendChild(buildChart({hidden:hiddenPeople, onPoint:showPointInfo}));
  }else{
    box.innerHTML='<p class="muted">'+t("map.empty")+"</p>";
  }
  document.getElementById("pointInfo").classList.add("hide");
}
function showPointInfo(p, r){
  const el=document.getElementById("pointInfo");
  const st=t("styles")[r.style];
  el.classList.remove("hide");
  el.innerHTML="<strong>"+esc(p.name)+"</strong>（"+t("rel."+p.type)+"）· "+fmtDate(r.date)+
    ' <span class="badge badge-sm" style="background:'+styleColor(r.style)+'">'+st.name+"</span> "+
    t("th.anx")+" "+r.anxiety.toFixed(2)+"、"+t("th.avd")+" "+r.avoidance.toFixed(2);
}
document.getElementById("mapImgBtn").addEventListener("click",()=>{
  const svg = document.querySelector("#mapChart svg");
  if(!svg){ alert(t("map.noData")); return; }
  exportChartPng(svg, ()=>alert(t("map.imgFail")));
});

/* ── 紀錄 · records ── */
function renderRecords(){
  const box=document.getElementById("recordsBody");
  if(!db.people.length){ box.innerHTML='<p class="muted">'+t("records.empty")+"</p>"; return; }
  let h="";
  db.people.forEach(p=>{
    h+='<h3><span class="dot" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+slotColor(p.slot)+'"></span> '+
       esc(p.name)+' <span class="tiny">（'+t("rel."+p.type)+'）</span> '+
       '<button class="del" data-delp="'+p.id+'">'+t("records.deletePerson")+"</button></h3>";
    if(p.results.length){
      h+="<table><thead><tr><th>"+t("th.date")+"</th><th>"+t("th.anx")+"</th><th>"+t("th.avd")+"</th><th>"+t("th.style")+"</th><th></th></tr></thead><tbody>";
      p.results.forEach((r,i)=>{
        h+="<tr><td>"+fmtDate(r.date)+"</td><td>"+r.anxiety.toFixed(2)+"</td><td>"+r.avoidance.toFixed(2)+
           "</td><td>"+t("styles")[r.style].name+'</td><td><button class="del" data-delp="'+p.id+'" data-delr="'+i+'">'+t("records.delete")+"</button></td></tr>";
      });
      h+="</tbody></table>";
    } else h+='<p class="tiny">'+t("records.none")+"</p>";
  });
  box.innerHTML=h;
  box.querySelectorAll("button.del").forEach(b=>b.addEventListener("click",()=>{
    const pid=b.dataset.delp, ri=b.dataset.delr;
    const p=db.people.find(q=>q.id===pid);
    if(!p) return;
    if(ri!=null){
      if(confirm(tp("records.confirmDelRec",{name:p.name, date:fmtDate(p.results[ri].date)}))){
        p.results.splice(+ri,1); saveDb(); renderRecords();
      }
    }else{
      if(confirm(tp("records.confirmDelPerson",{name:p.name, n:p.results.length}))){
        db.people=db.people.filter(q=>q.id!==pid); saveDb(); renderRecords();
      }
    }
  }));
}

/* ── 關係檢核表 · relationship checklist ── */
let collabAns = Array(15).fill(0);
function renderCollabItems(){
  const box=document.getElementById("collabItems");
  box.innerHTML="";
  const labels5 = t("scale5Labels");
  t("collabItems").forEach((txt,i)=>{
    const d=document.createElement("div");
    d.className="clitem";
    d.innerHTML="<p>"+(i+1)+". "+txt+"</p>";
    const row=document.createElement("div");
    row.className="likert5";
    for(let v=1; v<=5; v++){
      const b=document.createElement("button");
      b.type="button";
      b.setAttribute("aria-label", v+" · "+labels5[v-1]);
      b.setAttribute("aria-pressed", collabAns[i]===v?"true":"false");
      const dot=document.createElement("span");
      dot.className="dotv";
      b.appendChild(dot);
      b.addEventListener("click",()=>{
        collabAns[i]=v;
        row.querySelectorAll("button").forEach((bb,idx)=>bb.setAttribute("aria-pressed", idx+1===v?"true":"false"));
      });
      row.appendChild(b);
    }
    d.appendChild(row);
    const a=document.createElement("div");
    a.className="anchors";
    a.innerHTML="<span>"+t("collab.anchorLow")+"</span><span>"+t("collab.anchorHigh")+"</span>";
    d.appendChild(a);
    box.appendChild(d);
  });
}
document.getElementById("collabScoreBtn").addEventListener("click",()=>{
  if(collabAns.some(v=>!v)){ alert(t("collab.unanswered")); return; }
  const total=collabAns.reduce((a,b)=>a+b,0);
  const name=document.getElementById("collabName").value.trim()||t("collab.unnamed");
  db.collab.push({id:uid(), name, date:new Date().toISOString(), answers:collabAns.slice(), total});
  saveDb();
  // 不下判決：總分之外，列出分數較低的題目，留給讀書會討論
  const items=t("collabItems");
  const lows=collabAns.map((v,i)=>({v,i})).filter(q=>q.v<=3);
  let review;
  if(lows.length){
    review='<h3>'+t("collab.lowTitle")+'</h3><p class="muted">'+t("collab.lowIntro")+"</p><ul class='muted'>"+
      lows.map(q=>"<li>"+(q.i+1)+". "+items[q.i]+'（'+q.v+" / 5）</li>").join("")+"</ul>";
  }else{
    review='<p class="muted">'+t("collab.allHigh")+"</p>";
  }
  document.getElementById("collabResult").innerHTML=
    '<div class="tile" style="margin-top:14px"><div class="v">'+total+' <span class="tiny">/ 75</span></div>'+
    '<div class="l">'+tp("collab.resultLabel",{name:esc(name)})+"</div></div>"+
    review+
    '<p class="tiny">'+t("collab.bookOrder")+"</p>"+
    '<p class="tiny">'+t("collab.totalNote")+"</p>"+
    '<p><button class="ghost" id="collabClearBtn" type="button">'+t("collab.clear")+"</button></p>";
  document.getElementById("collabClearBtn").addEventListener("click",()=>{
    collabAns=Array(15).fill(0);
    document.getElementById("collabResult").innerHTML="";
    renderCollabItems();
  });
  renderCollabHistory();
});
function renderCollabHistory(){
  const box=document.getElementById("collabHistory");
  if(!db.collab.length){ box.innerHTML=""; return; }
  let h="<h3>"+t("collab.historyTitle")+"</h3><table><thead><tr><th>"+t("th.date")+"</th><th>"+t("th.person")+"</th><th>"+t("th.total")+"</th><th></th></tr></thead><tbody>";
  db.collab.forEach((c,i)=>{
    h+="<tr><td>"+fmtDate(c.date)+"</td><td>"+esc(c.name)+"</td><td>"+c.total+' / 75</td>'+
       '<td><button class="del" data-i="'+i+'">'+t("records.delete")+"</button></td></tr>";
  });
  h+="</tbody></table>";
  box.innerHTML=h;
  box.querySelectorAll("button.del").forEach(b=>b.addEventListener("click",()=>{
    if(confirm(t("collab.confirmDel"))){ db.collab.splice(+b.dataset.i,1); saveDb(); renderCollabHistory(); }
  }));
}

/* ── 匯出／匯入 · export / import ── */
document.getElementById("exportBtn").addEventListener("click",()=>{
  downloadBlob(new Blob([JSON.stringify(db,null,2)],{type:"application/json"}),
    "attachment-data-"+stamp()+".json");
});
let pendingImport=null;
document.getElementById("importBtn").addEventListener("click",()=>document.getElementById("importFile").click());
document.getElementById("importFile").addEventListener("change",e=>{
  const f=e.target.files[0];
  if(!f) return;
  const rd=new FileReader();
  rd.onload=()=>{
    try{
      const d=JSON.parse(rd.result);
      if(!d || !Array.isArray(d.people)) throw new Error("bad");
      d.collab=Array.isArray(d.collab)?d.collab:[];
      pendingImport=normalizeDb(d);
      const s=dbStats(pendingImport);
      document.getElementById("importSummary").textContent=tp("import.summary",s);
      document.getElementById("importDlg").showModal();
    }catch(err){ alert(t("import.bad")); }
    e.target.value="";
  };
  rd.readAsText(f);
});
document.getElementById("importCancel").addEventListener("click",()=>{ pendingImport=null; document.getElementById("importDlg").close(); });
document.getElementById("importReplace").addEventListener("click",()=>{
  if(pendingImport) replaceDb(pendingImport);
  finishImport();
});
document.getElementById("importMerge").addEventListener("click",()=>{
  if(pendingImport) mergeDb(pendingImport);
  finishImport();
});
function finishImport(){
  pendingImport=null;
  document.getElementById("importDlg").close();
  hiddenPeople.clear();
  renderDataStats(); renderHome();
  alert(t("import.done"));
}
function renderDataStats(){
  document.getElementById("dataStats").textContent=tp("records.stats", dbStats());
}
document.getElementById("wipeBtn").addEventListener("click",()=>{
  if(confirm(t("records.wipeConfirm1")) && confirm(t("records.wipeConfirm2"))){
    wipeDb(); hiddenPeople.clear();
    renderDataStats(); renderHome(); alert(t("records.wiped"));
  }
});

/* ── 啟動 · boot ── */
applyI18n();
renderLanding();
renderHome();
renderCollabItems();
renderDataStats();
