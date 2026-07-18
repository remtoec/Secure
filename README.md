# 依附地形圖 · Attachment Topography

A bilingual (繁體中文（香港）/ English) attachment-style quiz web app, built for the
書識圈 Bookfort book club's reading of Dr. Amir Levine's *Secure* (2026).

- **Live site:** https://remtoec.github.io/Secure/
- **Single-file offline version:** https://remtoec.github.io/Secure/dist/single.html
- **Deploy branch:** `claude/attachment-quiz-traditional-chinese-s99i85` (pushes auto-deploy)

> For education, self-reflection and book-club discussion only — not a clinical diagnosis.

---

## 1 · What it does

Users answer 9 questions (1–7 Likert) about **one specific relationship**, get an
anxiety score and an avoidance score, and see the relationship plotted on a
four-quadrant "attachment topography" map. Multiple people each get a colour on
one shared map; retakes draw a dated trajectory. A separate 15-item checklist
("is this relationship worth investing in?") gives a 15–75 total. Everything is
stored in the browser's localStorage — no accounts, no server — with JSON
export/import for backup and a PNG export of the map.

### Method & attribution

The **anxiety × avoidance two-dimension model** comes from adult-attachment
research; the quiz items are the freely available **ECR-RS** scale (Fraley,
Heffernan, Vicary & Brumbaugh, 2011). The topography exercise (scoring one
relationship at a time and mapping it) is discussed in detail in *Secure*.
Keep this framing if you edit any credits: the book *discusses* the method,
it did not invent it.

### Scoring (do not change casually)

| Score | Formula |
|---|---|
| Avoidance | mean of Q1–6, **with Q1–4 reverse-scored** (8 − answer) |
| Anxiety | mean of Q7–9 |
| Quadrant | split at 4.0 on each axis: secure (low/low), anxious (high anx), avoidant (high avd), fearful (high/high) |

Implemented in `js/scoring.js` (`REVERSED`, `scoreAnswers`, `styleOf`).
The chart draws x = anxiety, y = avoidance, 1–7, dashed lines at 4 — matching
the book's figures. Checklist bands (60+/45+/<45) are our own rough guide, not
from the book; they live in `js/app.js` (`collabScoreBtn` handler).

---

## 2 · Project structure

```
index.html                    markup only — every string comes from data-i18n keys
css/style.css                 styles; theme tokens at the top (light + dark)
js/i18n.js                    ★ ALL UI copy, questions, style descriptions, both languages
js/scoring.js                 scoring formulas & quadrant logic
js/store.js                   localStorage load/save, normalisation, import merge, helpers
js/chart.js                   SVG quadrant chart + PNG export
js/app.js                     views, quiz flow, records, checklist, backup UI, toggles
build.js                      node build.js → dist/single.html + dist/artifact.html
dist/                         built bundles (committed so Pages serves single.html)
test/smoke.js                 headless browser test suite (~25 checks)
.github/workflows/deploy-pages.yml   auto-deploy to GitHub Pages
```

Plain `<script>` files loaded in order (i18n → scoring → store → chart → app);
no framework, no dependencies, works from `file://` as well as a web server.

---

## 3 · Common maintenance tasks

**Change any wording / fix a translation** — edit `js/i18n.js` only. Keys exist
once per language (`zh` and `en` blocks). Strings with `{name}`-style
placeholders are filled by `tp()`. Then rebuild (§4).

**Change quiz questions** — `questions` (person-specific) **and**
`questionsGeneral` (used when 一般依附風格 is selected — worded about "people
close to me" instead of 「這個人」) in `js/i18n.js`; keep both languages and
both variants in the same order. If you change which items are
reverse-scored, update `REVERSED` in `js/scoring.js`. Keep 9 items with the
6-avoidance + 3-anxiety structure or the formulas stop being ECR-RS.
The general mode also uses `quiz.whoGeneral`, `quiz.generalReminder`,
`result.styleIsGeneral`, `result.snapshotNoteGeneral` and each style's
`descGeneral`.

**Change checklist items or bands** — `collabItems` in `js/i18n.js`; band
thresholds and colours in the `collabScoreBtn` handler in `js/app.js`.

**Add a relationship type** — add the key to `REL_KEYS` in `js/i18n.js` and a
`rel.<key>` label in both languages. Types are stored as keys, so old data is
unaffected (legacy Chinese labels from v1 data are migrated in `js/store.js`,
`LEGACY_TYPES`).

**Add a third language** — add a top-level block to `I18N` in `js/i18n.js`
(copy the `en` block as a template), then extend the `langBtn` click handler in
`js/app.js` to cycle languages instead of toggling two.

**Change colours / theme** — CSS custom properties at the top of
`css/style.css` (`--s1…--s8` are the per-person series colours; defined for
light, OS-dark and the in-app toggle). The chart reads them at render time.

**Design language (「紅線 · The Red Thread」)** — porcelain paper, plum ink,
one crimson accent; Song-serif (`--serif`) for titles/questions/style names,
sans (`--sans`) for UI. Signature elements: the self-drawing thread on the
landing hero (inline SVG + `th-draw` keyframes), the quiz progress thread
with a knot (`.progress`), the graduated dot scale (`.dotv` — dot size grows
with intensity; the tapped answer's verbal label shows in `#scaleLabel`),
and a faint warm wash on the map's secure quadrant (in `js/chart.js`). All
motion sits behind `prefers-reduced-motion`. Keep the accent to one hue —
the series colours in the chart are a separate, CVD-validated palette.
Copy rule: keep wording plain and factual — no poetic taglines.

**Rename the club branding** — search `書識圈` / `Bookfort` in `js/i18n.js`
(`app.club`, `landing.eyebrow`, `chart.imgCredit`).

---

## 4 · Build & deploy

```sh
node build.js        # rebuilds dist/single.html (self-contained) + dist/artifact.html
git add -A && git commit -m "..." && git push
```

Pushing to `claude/attachment-quiz-traditional-chinese-s99i85` triggers
`.github/workflows/deploy-pages.yml`, which uploads the whole repo to GitHub
Pages (~1 minute). Remember to run `build.js` before committing if you changed
any source file, or `dist/single.html` will lag behind the modular app.

To deploy from a different branch later (e.g. after merging to `main`), change
the branch name under `on.push.branches` in the workflow file. Pages source
must stay set to "GitHub Actions" (repo Settings → Pages).

---

## 5 · Data model (localStorage + export format)

- Key `attachment-topography-v1`:

```json
{
  "version": 1,
  "people": [
    { "id": "…", "name": "阿明", "type": "partner", "slot": 0,
      "results": [ { "date": "ISO-8601", "answers": [1–7 ×9],
                     "anxiety": 3.67, "avoidance": 2.5, "style": "secure" } ] }
  ],
  "collab": [ { "id": "…", "name": "阿明", "date": "ISO-8601",
                "answers": [1–5 ×15], "total": 60 } ]
}
```

- Key `attachment-lang`: `"zh"` or `"en"`.
- The **export file is exactly this object**, pretty-printed. Import offers
  merge (match person by id, then by name; dedupe results by date) or replace.
  `normalizeDb()` in `js/store.js` sanitises anything imported, so extend it if
  you ever change the schema — and bump `version` + add a migration there.

---

## 6 · Testing

```sh
npm install playwright          # once; then: npx playwright install chromium
node test/smoke.js              # or CHROMIUM_PATH=/path/to/chromium node test/smoke.js
```

Drives the real app headlessly through: landing → quizzes in both languages
(verifying exact expected scores, e.g. answers `[6,6,6,6,3,3,6,6,6]` →
anxiety 6.00 / avoidance 2.33 / anxious), retake trajectories, map rendering,
PNG + JSON export, wipe → import-merge round trip, checklist total, language
persistence, dark mode. Every line should print `true` / `none`; screenshots
land in `test/`. Run it before pushing anything non-trivial.

---

## 7 · Known quirks & gotchas

- **Download filenames are ASCII** (`attachment-map-YYYYMMDD.png`,
  `attachment-data-YYYYMMDD.json`) on purpose — some Chromium builds silently
  replace non-ASCII `download` attributes with "download".
- **The chart must keep presentational attributes** (fill/stroke set as SVG
  attributes, plus the `font-family` attribute on the `<svg>` root): the PNG
  export serialises the SVG into an `<img>`, where external CSS doesn't apply.
- **Series colours cap at 8**; a 9th person reuses slot 1's colour. Every point
  carries a direct name label, so identity never depends on colour alone.
- **localStorage is per-origin**: records made on the Pages site, on a local
  file, or in the Claude artifact preview are three separate stores. Moving
  between them is what export/import is for.
- The `dist/` bundles are **generated files** — never edit them by hand.

## 8 · Licence & content notes

Quiz items are the ECR-RS, distributed free for research/education use — keep
the Fraley et al. (2011) citation. The checklist is a paraphrase for personal
book-club use of an exercise discussed in *Secure*; don't market or
commercialise this app's content. Code may be reused freely by the club.
