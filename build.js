#!/usr/bin/env node
"use strict";
/* 把模組化的檔案打包成單一 HTML（方便離線分享／artifact 預覽）
   Bundle the modular files into one self-contained HTML file.
   用法 · usage:  node build.js  →  dist/single.html, dist/artifact.html */

const fs = require("fs");
const path = require("path");

const root = __dirname;
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");

// inline the stylesheet, with the subset font embedded as a data URI
let css = fs.readFileSync(path.join(root, "css/style.css"), "utf8");
const fontB64 = fs.readFileSync(path.join(root, "fonts/serif-subset.woff2")).toString("base64");
css = css.replace('url("../fonts/serif-subset.woff2")',
  'url("data:font/woff2;base64,' + fontB64 + '")');
html = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + css + "</style>");

// inline the scripts, preserving order
html = html.replace(/<script src="(js\/[a-z0-9]+\.js)"><\/script>/g, (_, src) =>
  "<script>\n" + fs.readFileSync(path.join(root, src), "utf8") + "</script>");

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/single.html"), html);

// artifact variant: body content only (the artifact host supplies the document shell)
const inner = html.slice(html.indexOf("<style>"), html.indexOf("</body>"));
fs.writeFileSync(path.join(root, "dist/artifact.html"), inner);

console.log("built dist/single.html (" + html.length + " bytes) and dist/artifact.html");
