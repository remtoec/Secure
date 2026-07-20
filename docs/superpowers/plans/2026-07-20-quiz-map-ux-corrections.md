# Quiz and Map UX Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair legacy colour collisions, simplify questionnaire setup to general versus specific, stabilize question layout, and remove English mobile navigation overflow without changing source-locked questions.

**Architecture:** Add deterministic colour-slot repair helpers to `js/store.js`, keep the version-1 data shape, and simplify `js/app.js` state from eight relationship categories to two questionnaire modes. HTML/i18n/CSS changes provide validation, a stable question stage, and responsive long/short navigation labels; existing scoring and chart coordinates remain untouched.

**Tech Stack:** Static HTML/CSS, vanilla JavaScript, localStorage, inline SVG charting, Node assertions, Playwright smoke tests, GitHub Pages.

## Global Constraints

- Do not change any string in `questions`, `questionsGeneral`, or `collabItems`.
- Different people use different slots until the eight-colour palette is exhausted.
- Retests of one person keep one hue; earlier points are lighter than the latest.
- Existing version-1 exports and historical relationship types remain readable.
- New specific records use `type: "other"` and require a name or private alias.
- English tabs must not horizontally overflow at 320 px.
- Preserve the unrelated untracked `package.json` and `package-lock.json`.

---

### Task 1: Repair duplicate saved colour slots

**Files:**
- Modify: `js/store.js`
- Modify: `test/content.test.js`

**Interfaces:**
- Produces `normalizeSlot(slot: unknown): number | null`, `nextAvailableSlot(used: Set<number>, fallbackIndex: number): number`, and `repairPeopleSlots(people: Person[]): boolean`.
- `normalizeDb()` and `mergeDb()` consume the helpers.

- [ ] Add a failing VM-based assertion that normalizing people with slots `[1, 1, 1]` yields `[1, 0, 2]`, preserves two results under the first person, and reports a repair.
- [ ] Run `node test/content.test.js`; expect failure because the helpers are undefined.
- [ ] Implement slot normalization modulo `SLOT_VARS.length`, preserve the first unique valid slot, and assign later duplicates the first unused slot. When all eight are used, fall back to `index % SLOT_VARS.length`.
- [ ] Make `loadDb()` persist normalized data only when repair changed a slot, and make `mergeDb()` call `nextAvailableSlot()` for a new person.
- [ ] Run `node test/content.test.js`; expect all assertions to pass.
- [ ] Commit `js/store.js` and `test/content.test.js` with message `Repair duplicate map colour slots`.

---

### Task 2: Replace relationship categories with questionnaire modes

**Files:**
- Modify: `index.html`
- Modify: `js/app.js`
- Modify: `js/i18n.js`
- Modify: `test/smoke.js`

**Interfaces:**
- Setup renders two `.mode-choice` buttons with `data-mode="general"` and `data-mode="specific"`.
- `selectedMode` is `"general" | "specific"`; a new specific person is stored with `type: "other"`.
- `#nameError` contains translated validation and receives focus through `#personName`.

- [ ] Change smoke setup expectations to require exactly two mode choices, verify the specific mode exposes the name row, and verify a blank name prevents navigation to `#view-quiz`.
- [ ] Run `node test/smoke.js`; expect failure on missing `.mode-choice`.
- [ ] Replace `#relTypes` with `#quizModes`, add two mode buttons through `renderHome()`, hide `#nameRow` in general mode, and show it in specific mode.
- [ ] Add translated setup explanation, mode labels/descriptions, and blank-name validation. Do not alter questionnaire arrays.
- [ ] Update new-person creation and `renderQuestion()` so only general versus specific controls wording; omit redundant type text from current quiz/result headings while retaining historical record display.
- [ ] Run content and smoke tests; expect both to pass.
- [ ] Commit the setup revision with message `Simplify questionnaire relationship modes`.

---

### Task 3: Stabilize question layout and mobile English tabs

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/i18n.js`
- Modify: `test/smoke.js`

**Interfaces:**
- `#questionStage` wraps `#qtext`.
- The collaboration tab contains `.nav-collab-long` and `.nav-collab-short` spans.

- [ ] Add failing browser assertions that the question stage uses grid or flex centring, `#qtext` computes to `text-wrap: pretty`, and English navigation has `scrollWidth <= clientWidth` at 320 px.
- [ ] Run `node test/smoke.js`; expect failure on the question-stage selector or balanced wrapping.
- [ ] Wrap the question, add responsive stage minimum heights, set reading-edge alignment and pretty wrapping, and keep the scale below the stable stage.
- [ ] Add long/short collaboration labels, show the short `CAS` label only at 390 px and below, and compact tab gaps/padding enough to eliminate actual overflow.
- [ ] Run `node test/smoke.js`; expect layout and full-flow checks to pass.
- [ ] Commit with message `Stabilize questionnaire and mobile tabs`.

---

### Task 4: Build, document, verify, and release

**Files:**
- Modify: `README.md`
- Modify: `dist/single.html`
- Modify: `dist/artifact.html`
- Modify if coverage requires: `fonts/serif-subset.woff2`

**Interfaces:**
- Consumes all modular source changes and produces the committed standalone bundles.

- [ ] Update README maintenance notes with the two-mode setup, slot-repair rule, per-person hue semantics, question-stage layout, and mobile CAS label.
- [ ] Run the Han-coverage check against `js/i18n.js`; regenerate the static Noto Serif TC 600 subset only if missing characters are reported.
- [ ] Run `node build.js`.
- [ ] Run `node --check js/store.js`, `node --check js/app.js`, `node --check js/i18n.js`, `node test/content.test.js`, `node test/smoke.js`, and `git diff --check`.
- [ ] Inspect 320 px Chinese/English setup and questionnaire screenshots plus 430 px light/dark map screenshots.
- [ ] Commit release artifacts with message `Build quiz and map UX corrections`.
- [ ] Fetch and rebase on `origin/main`, rerun content and smoke tests, push `main`, and confirm the live site serves the two-mode setup and non-overflowing English nav.
