# 依附地形圖 · Attachment Topography

A bilingual (繁體中文（香港）/ English) attachment-style quiz web app, built for the
書識圈 Bookfort book club's reading of Dr. Amir Levine's *Secure* (2026).

## Method

The quiz uses the **two-dimension model of adult attachment (anxiety × avoidance)**
developed in attachment research, with items from the freely available **ECR-RS**
scale (Fraley, Heffernan, Vicary & Brumbaugh, 2011). The "attachment topography"
exercise — scoring one specific relationship at a time and plotting it on a
quadrant map — is discussed in detail in *Secure*:

- Answer 9 questions (1–7 Likert) about **one specific relationship**
- **Avoidance** = mean of Q1–6 (Q1–4 reverse-scored)
- **Anxiety** = mean of Q7–9
- Plotted on a 1–7 quadrant chart split at 4:
  Secure (low/low) · Anxious · Avoidant · Fearful-avoidant

## Features

- **中 / EN toggle** — full Traditional Chinese (HK) and English versions
- **Multiple relationships** — partner, parents, friends, colleagues… one colour each, all on one map
- **Retake over time** — repeated records draw a trajectory so you can watch a relationship move
- **No login** — everything lives in the device's browser (localStorage)
- **Export / import** — JSON backup for device transfer or sharing (merge or replace)
- **Map image export** — save the topography chart as a PNG
- **Relationship checklist** — the 15-item "worth investing in?" check (CARRP / SIMIs)
- Light/dark theme, mobile-first, zero dependencies

## Project structure

```
index.html            markup (all text via data-i18n keys)
css/style.css         styles & theme tokens
js/i18n.js            all UI copy in both languages — edit wording here
js/scoring.js         scoring formulas & quadrant logic
js/store.js           localStorage, normalisation, import merging
js/chart.js           SVG topography chart + PNG export
js/app.js             views, quiz flow, records, backup UI
build.js              node build.js → dist/single.html (one self-contained file)
```

To change any wording or translation, edit `js/i18n.js` only.

## Run it

Static files, no installation:

1. Open `index.html` in a browser (or `dist/single.html` as a share-anywhere single file); or
2. Use the GitHub Pages deployment — pushed automatically by
   `.github/workflows/deploy-pages.yml`.

> For education, self-reflection and book-club discussion only — not a clinical diagnosis.
