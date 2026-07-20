# 依附地形圖 · Attachment Topography

A bilingual (繁體中文（香港）/ English) pre-sharing companion for 書識圈
Bookfort's reading of Dr. Amir Levine's *Secure* (2026). It is deliberately a
tool and trailer, not a compressed replacement for the book or the sharing.

- **Live site:** https://remtoec.github.io/Secure/
- **Single-file offline version:** https://remtoec.github.io/Secure/dist/single.html
- **Working branch:** `main` — always commit and push here (pushes auto-deploy)

> For education, self-reflection and book-club discussion only — not a clinical diagnosis.

---

## 1 · What it does

The app serves three connected purposes:

1. Sharing participants complete the attachment questionnaire and map before
   the session, then bring one observation into the discussion.
2. Other Bookfort members get a concise glimpse of the book's distinctive
   context-sensitive, environmentally responsive attachment frame and an
   invitation to contact Bookfort about membership, the sharing record, and
   notes.
3. Interested readers are pointed to Levine's official *Secure* page for the
   full argument, examples, and practices.

Users answer 9 questions (1–7 Likert) about their general pattern or **one
specific relationship**, get anxiety and avoidance scores, and see the result
on a four-quadrant attachment-topography map. Multiple people each get a colour
on one shared map; retakes draw a dated trajectory. The separate 15-item
**Collaborative Assessment Scale (CAS)** from Chapter 11 gives a 15–75 total,
shows Levine's published interpretation, and lists lower-scoring items for
discussion. Everything stays in browser localStorage, with JSON backup and PNG
map export.

### Product and editorial direction

The intended journey is **hook → useful tool → discussion handoff → two onward
routes**:

1. A short Chapter 5 situation creates recognition without summarising the
   book.
2. The questionnaire and map give participants something concrete to bring to
   the sharing.
3. The result names the measured position and asks one Bookfort discussion
   question. It does not teach the style-specific programs from later chapters.
4. The closing invitation points people either to Bookfort Zone for the session
   record/notes or to *Secure* for the complete argument and practices.

The glimpse of the book must remain distinctive. Levine presents attachment as
context-sensitive and environmentally responsive: childhood is one influence,
while the brain keeps learning from present relationships and everyday
interactions. The topography makes that visible by plotting one person
differently across a partner, parent, friend, or colleague. Avoid reverting to
the familiar pop-therapy frame of a fixed identity, a childhood verdict, or a
label that explains everything.

Content that enables the tool belongs here: exact questions, scoring, concise
quadrant interpretations, essential term definitions, and privacy/instructions.
The fuller neuroscience, case stories, style-specific practices, and coaching
methods belong mainly to the live sharing and the book. When considering a new
screen or paragraph, ask whether it prepares a better observation or merely
replaces something the organiser should unfold in person.

The visual and verbal design follow the same direction. The app is a quiet
**chart room**, not a diagnostic dashboard: coordinates, plotted paths, dates,
paper, ink, and neutral quadrant fields invite comparison over time without
turning one result into a badge of virtue. Copy stays warm, concrete, and
scientifically curious. It preserves the adaptive logic and cost of every
attachment position, distinguishes Bookfort prompts from Levine's claims, and
always leaves the participant with somewhere further to go.

### Method & attribution

The full 2026 book is the authority for Levine's claims, terminology, examples,
questionnaire presentation, and CAS wording. The whole-book chapter summary is
an orientation aid; the Chapter 5 agent-friendly extract is a working aid; both
must be checked against the book. The **anxiety × avoidance two-dimension
model** and quiz items come from the **ECR-RS** (Fraley, Heffernan, Vicary &
Brumbaugh, 2011). The book discusses the topography method; it did not invent
the underlying research scale. See `docs/editorial-source-and-content-design.md`.

### Scoring (do not change casually)

| Score | Formula |
|---|---|
| Avoidance | mean of Q1–6, **with Q1–4 reverse-scored** (8 − answer) |
| Anxiety | mean of Q7–9 |
| Quadrant | split at 4.0 on each axis: secure (low/low), anxious (high anx), avoidant (high avd), fearful (high/high) |

Implemented in `js/scoring.js` (`REVERSED`, `scoreAnswers`, `styleOf`).
The chart draws x = anxiety, y = avoidance, 1–7, dashed lines at 4 — matching
the book's plotting instructions and figures. (Ch. 5's score-sum tables label
the axes the other way round; that's an inconsistency in the book itself — the
plotting instructions and sample graph are the authority we follow.)

The Chapter 11 CAS uses these published interpretations: **0–25** (fraught with
problems), **26–50** (some parts work, with room to improve), and **51–75**
(working well to extremely well); Levine gives **60+** special emphasis as a
particularly effective collaboration. The app shows the applicable concise
interpretation plus items scored ≤3 as discussion material. `collabBand()` in
`js/scoring.js` selects the display copy; it does not change saved data.

---

## 2 · Project structure

```
index.html                    markup only — every string comes from data-i18n keys
css/style.css                 styles; theme tokens at the top (light + dark)
js/i18n.js                    ★ ALL UI copy, questions, style descriptions, both languages
js/scoring.js                 scoring formulas & quadrant logic
js/store.js                   localStorage load/save, normalisation, import merge, helpers
js/chart.js                   SVG quadrant chart + PNG export
js/app.js                     views, quiz flow, records, CAS, backup UI, toggles
build.js                      node build.js → dist/single.html + dist/artifact.html
dist/                         built bundles (committed so Pages serves single.html)
test/content.test.js          exact ECR-RS/CAS wording + CAS band source locks
test/smoke.js                 end-to-end headless browser test suite
```

Plain `<script>` files loaded in order (i18n → scoring → store → chart → app);
no framework, no dependencies, works from `file://` as well as a web server.

---

## 3 · Common maintenance tasks

**Change any wording / fix a translation** — edit `js/i18n.js` only. Keys exist
once per language (`zh` and `en` blocks). Strings with `{name}`-style
placeholders are filled by `tp()`. Then rebuild (§4).

**Change the landing visuals** — semantic structure lives in `index.html`, all
meaningful labels and descriptions stay in `js/i18n.js`, and the responsive
chart-room treatment lives in `css/style.css`. The hero route and contour lines
are atmosphere; the two-path attachment frame, three purpose routes, privacy
disclosure, snapshot markers, and CAS glossary carry information. Keep that
division explicit: atmosphere may improve orientation and hierarchy, but must
never introduce a claim or compete with the questionnaire. Native HTML/CSS/SVG
is preferred so diagrams remain bilingual, accessible, dark-mode aware, and
usable from `file://`.

**Change quiz questions** — `questions` (person-specific) **and**
`questionsGeneral` (used when 一般依附風格 is selected — the ECR-RS general
questionnaire's own wording, about "people" / "others" instead of 「這個人」;
both variants are printed in ch. 5 of *Secure*) in `js/i18n.js`; keep both languages and
both variants in the same order. If you change which items are
reverse-scored, update `REVERSED` in `js/scoring.js`. Keep 9 items with the
6-avoidance + 3-anxiety structure or the formulas stop being ECR-RS.
The general mode also uses `quiz.whoGeneral`, `quiz.generalReminder`,
`result.styleIsGeneral`, `result.snapshotNoteGeneral` and each style's
`descGeneral`.

**Change CAS items** — `collabItems` in `js/i18n.js`. The English items reproduce
Chapter 11's Collaborative Assessment Scale and are locked by
`test/content.test.js`; do not paraphrase them casually. The result view uses
the book's score ranges and lists items scored ≤3 for discussion.

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

**Design language (「海圖房 · Chart Room」)** — the product is a topography,
so the chrome is cartographic: the whole page sits on faint graph paper
(`--paper-line`), cards are chart "plates" with hairline ink borders and small
registration ticks at opposite corners (`.card::before/::after`), nav tabs are
index tabs with an inked top rule, the quiz progress bar is a plotted course
(dashed route, diamond station marker), score tiles are coordinate readouts
(label above value, inked left rule), and the style badge is an ink stamp
(accent outline), not a solid pill. Depth is borders-only — no shadows
anywhere; corners squared (6–8 px). Paper, moss ink, one deep sea-teal
accent; serif (`--serif`) for titles/questions/style names, sans (`--sans`)
for UI. A compact subset of Noto Serif TC (weight 600, OFL licence
— see `fonts/LICENSE.txt`) is self-hosted so Android renders the serif voice
too; it covers every character currently in `js/i18n.js`, with per-glyph
fallback to system fonts if new characters are added (re-subset if wording
changes a lot). The hero line draws a path that leaves a base dot and returns
to it — Levine's secure-base image. The landing infographic uses paired
line-and-node paths to show how repeated unreliable or reliable interactions
can update the brain's expectations; neither path is coloured as failure or
success. Its three numbered route cards mirror the product's three purposes,
while privacy is a compact trust strip rather than another essay. Other
signature elements: the quiz
progress line with a knot (`.progress`) and the graduated dot scale (`.dotv`;
the tapped answer's verbal label shows in `#scaleLabel`). The map has no
quadrant tinting on purpose — the labels state the facts, the chart doesn't
rank. All motion sits behind `prefers-reduced-motion`; series colours are a
separate, CVD-validated palette. Result badges use their own fixed dark
palette for contrast, unrelated to the per-person chart colours.

**Copy rules** — read both `docs/translation-principles.md` and
`docs/editorial-source-and-content-design.md` before editing. Use concrete verbs
and situations, natural Hong Kong Traditional Chinese, and a clear situation →
mechanism → consequence progression. Every attachment position keeps its
adaptive logic and cost. Keep source layers explicit: Levine's book, the ECR-RS
research wording, and Bookfort's own navigation/invitation/discussion prompts.
Do not import a claim from an interview into the book's voice without labelling
the different source.

**Rename the club branding** — search `書識圈` / `Bookfort` in `js/i18n.js`
(`app.club`, `landing.eyebrow`, `chart.imgCredit`).

---

## 4 · Build & deploy

```sh
node build.js                 # rebuild committed standalone bundles
node test/content.test.js     # verify source wording and score bands
node test/smoke.js            # exercise the complete browser flow
git add <intended-files>
git commit -m "..."
git push origin main
```

**Always work on `main`.** This project is released from a locally authenticated
checkout: build and test locally, commit only the intended files, then push
`main`. GitHub Pages publishes directly from the branch, so repo Settings →
Pages should use **Deploy from a branch**, branch `main`, folder `/ (root)`.
There is no project-specific deployment workflow to run or maintain.

Remember to run `build.js` before committing if you changed any source file, or
`dist/single.html` will lag behind the modular app. The old working branch
`claude/attachment-quiz-traditional-chinese-s99i85` is historical — don't
commit there. Set `main` as the repo's default branch in Settings → Branches if
it isn't already.

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

Quiz items are the ECR-RS — keep the Fraley et al. (2011) citation. The English
CAS items reproduce the Chapter 11 exercise and the Chinese items are a faithful
Bookfort translation for personal, non-commercial book-club use. Do not market
or commercialise the book-derived content. Code may be reused by the club.
