"use strict";
/* ═══════════ 計分 · Scoring ═══════════
   兩維度模型（焦慮 × 迴避），計分公式見《Secure》pp.79–81：
   迴避 = 第 1–6 題平均（第 1–4 題反向計分）；焦慮 = 第 7–9 題平均。
   Two-dimension model (anxiety × avoidance), per the ECR-RS structure:
   avoidance = mean of Q1–6 (Q1–4 reverse-scored); anxiety = mean of Q7–9. */

/* 反向計分題（第 1–4 題）· reverse-scored items */
const REVERSED = [true, true, true, true, false, false, false, false, false];

function scoreAnswers(a){
  // a: 9 個 1–7 的作答 · nine 1–7 responses
  const adj = a.map((v,i)=> REVERSED[i] ? 8-v : v);
  const avoidance = adj.slice(0,6).reduce((x,y)=>x+y,0)/6;
  const anxiety   = adj.slice(6,9).reduce((x,y)=>x+y,0)/3;
  return {anxiety:+anxiety.toFixed(2), avoidance:+avoidance.toFixed(2)};
}

/* 象限判定（4 分為界）· quadrant, split at 4 */
function styleOf(anx, avd){
  if(anx<4 && avd<4)  return "secure";
  if(anx>=4 && avd<4) return "anxious";
  if(anx<4 && avd>=4) return "avoidant";
  return "fearful";
}
