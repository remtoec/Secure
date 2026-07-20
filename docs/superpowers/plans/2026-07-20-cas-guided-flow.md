# Guided CAS and Relationship Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn CAS into a one-question-at-a-time auto-advance questionnaire, strengthen the attachment relationship-name field, and let CAS reuse a named person already tested on the attachment map.

**Architecture:** Keep the static app and existing localStorage schema. Replace the all-items CAS renderer with explicit setup, question, and result stages driven by one in-memory `collabQuiz` object; render eligible attachment people from `db.people` without linking or mutating their records. Reuse the attachment quiz's progress, question-stage, delayed auto-advance, Likert, and accessibility patterns.

**Tech Stack:** Semantic HTML, existing vanilla JavaScript modules loaded as scripts, existing CSS tokens/components, Playwright smoke tests, Node syntax/content tests, static build script.

## Global Constraints

- Exact `questions`, `questionsGeneral`, and `collabItems` arrays in `js/i18n.js` must remain unchanged.
- Chinese copy must be natural Hong Kong Traditional Chinese and retain the author's conceptual direction.
- CAS storage remains `{ id, name, date, answers, total }`; no schema migration or person foreign key.
- Only non-general attachment people with at least one result are reusable in CAS.
- Selecting answers 1–14 advances after 260 ms; answer 15 calculates and saves automatically.
- No new dependency, icon library, image, or decorative CSS layer.
- The page must remain usable from `file://`, bilingual, accessible, dark-mode aware, and free of horizontal overflow at 320 px.
- Preserve the user's unrelated untracked `package.json` and `package-lock.json` files.

---

### Task 1: Lock the requested behavior with failing browser tests

**Files:**
- Modify: `test/smoke.js:42-57`
- Modify: `test/smoke.js:185-196`

**Interfaces:**
- Consumes: current attachment setup and existing `db.people` created by the smoke flow.
- Produces: regression assertions for `.identity-panel`, `#collabPeople`, `#collabOther`, `#collabStartBtn`, `#collabQuiz`, `#collabQnum`, `#collabScale`, and automatic result generation.

- [ ] **Step 1: Write the attachment-field affordance assertion**

After selecting specific mode, assert the visible input is inside an identity panel and has a bound label:

```js
const nameAffordance = await page.locator('#nameRow').evaluate(row => {
  const input = row.querySelector('#personName');
  const label = row.querySelector('label[for="personName"]');
  return row.classList.contains('identity-panel') && Boolean(label) &&
    input.getAttribute('aria-describedby') === 'nameHint nameError';
});
console.log('Relationship name affordance:', nameAffordance);
if (!nameAffordance) throw new Error('Specific-person name needs a labelled identity panel');
```

- [ ] **Step 2: Replace the all-at-once CAS smoke flow with guided-flow assertions**

Use the existing `阿明` record, assert the general record is absent, start without typing, verify one item, auto-advance, Back restoration, and automatic final scoring:

```js
await page.click('nav.tabs button[data-view="collab"]');
const choices = await page.locator('#collabPeople .chip').allTextContents();
if (!choices.some(x => x.includes('阿明')) || choices.some(x => x.includes('一般'))) {
  throw new Error('CAS must offer named attachment people and exclude the general pattern');
}
await page.click('#collabPeople .chip:has-text("阿明")');
await page.click('#collabStartBtn');
if (await page.locator('#collabItems .clitem').count() !== 1) {
  throw new Error('Guided CAS must render exactly one item');
}
await page.click('#collabScale button:nth-child(4)');
await page.waitForFunction(() => document.querySelector('#collabQnum').textContent.includes('2'));
await page.click('#collabPrevBtn');
if (await page.locator('#collabScale button:nth-child(4)').getAttribute('aria-pressed') !== 'true') {
  throw new Error('CAS Back must restore the prior answer');
}
await page.click('#collabScale button:nth-child(4)');
for (let question = 2; question <= 15; question++) {
  await page.waitForFunction(n => document.querySelector('#collabQnum').textContent.includes(String(n)), question);
  await page.click('#collabScale button:nth-child(4)');
}
await page.waitForSelector('#collabResultCard:not(.hide)');
```

- [ ] **Step 3: Add new-name validation coverage**

After starting a new checklist, select `#collabOther`, submit a blank name, assert `#collabNameError` is visible and focus remains on `#collabName`, then enter a name and assert question 1 opens.

- [ ] **Step 4: Run the browser test and verify RED**

Run: `node test/smoke.js`

Expected: FAIL at `Relationship name affordance` because `.identity-panel` and the guided CAS controls do not exist yet.

- [ ] **Step 5: Commit the failing regression test**

```powershell
git add test/smoke.js
git commit -m "Test guided CAS questionnaire flow"
```

---

### Task 2: Build the labelled identity panels and CAS setup stage

**Files:**
- Modify: `index.html:135-140`
- Modify: `index.html:223-242`
- Modify: `js/i18n.js` (both `zh` and `en` CAS/home keys; do not touch item arrays)
- Modify: `css/style.css:240-265`
- Modify: `js/app.js:7-45`
- Modify: `js/app.js:291-369`

**Interfaces:**
- Consumes: `db.people`, `t()`, `tp()`, existing `.chip`, `.progress`, `.question-stage`, `.likert5`, and `.term-grid` components.
- Produces: `eligibleCollabPeople()`, `renderCollabSetup()`, CAS stage markup, and an accessible selected subject for Task 3.

- [ ] **Step 1: Replace the attachment name markup with a real labelled panel**

Use this semantic structure while retaining the same IDs needed by current code:

```html
<div id="nameRow" class="identity-panel hide">
  <div class="field-coordinate" data-i18n="home.personCoordinate"></div>
  <div class="field-label-row">
    <label for="personName" data-i18n="home.q2"></label>
    <span class="required-tag" data-i18n="form.required"></span>
  </div>
  <input type="text" id="personName" maxlength="20" data-i18n-ph="home.namePh"
    autocomplete="off" aria-required="true" aria-describedby="nameHint nameError">
  <p class="tiny field-hint" id="nameHint" data-i18n="home.nameHint"></p>
  <p class="field-error hide" id="nameError" role="alert" data-i18n="home.nameRequired"></p>
</div>
```

- [ ] **Step 2: Split CAS into setup, quiz, result, and history cards**

Create stable IDs: `collabSetup`, `collabPeople`, `collabOther`,
`collabNameRow`, `collabName`, `collabNameHint`, `collabNameError`,
`collabStartBtn`, `collabQuiz`, `collabWho`, `collabQnum`, `collabPbar`,
`collabItems`, `collabScale`, `collabScaleLabel`, `collabPrevBtn`,
`collabExitBtn`, `collabResultCard`, `collabResult`, `collabHistoryCard`, and
`collabHistory`. Keep the four glossary terms in setup and repeat them in a
collapsed `<details>` inside the quiz card.

- [ ] **Step 3: Add bilingual setup and navigation copy**

Add explicit keys for person reuse, another person, required name, question
count, selected subject, Back, Exit, exit confirmation, response placeholder,
and glossary disclosure. Keep all exact item arrays untouched.

- [ ] **Step 4: Add quiet chart-room identity-panel styles**

```css
.identity-panel{
  margin:12px 0 16px;padding:14px;border:1px solid var(--axis);border-radius:6px;
  background:var(--page);
  box-shadow:inset 2px 0 0 var(--accent)
}
.field-coordinate{font-size:.68rem;letter-spacing:.16em;color:var(--accent);font-weight:700}
.field-label-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:5px 0 8px}
.field-label-row label{font-weight:700;color:var(--ink-1)}
.required-tag{font-size:.72rem;color:var(--crit)}
.field-hint{margin:6px 0 0}
```

- [ ] **Step 5: Implement existing-person setup rendering**

```js
let collabSelection = {personId:null, other:false};
function eligibleCollabPeople(){
  return db.people.filter(person => person.type!=="general" && person.results.length);
}
function selectedCollabName(){
  if(collabSelection.personId){
    const person=db.people.find(p=>p.id===collabSelection.personId);
    return person ? person.name : "";
  }
  return collabSelection.other ? document.getElementById("collabName").value.trim() : "";
}
```

`renderCollabSetup()` renders eligible people as `.chip` buttons with
`aria-pressed`, renders the translated “Someone else” button, defaults to the
new-name route only when there are no eligible people, toggles the new-name
panel, and clears inline validation when the selection changes.

- [ ] **Step 6: Run the browser test and verify it progresses to the missing guided-flow behavior**

Run: `node test/smoke.js`

Expected: the name-affordance and CAS-choice assertions pass; the test still
FAILS because selecting Start does not yet render one guided item.

- [ ] **Step 7: Commit the setup stage**

```powershell
git add index.html js/i18n.js css/style.css js/app.js
git commit -m "Add reusable CAS relationship setup"
```

---

### Task 3: Implement one-item CAS auto-progression and results

**Files:**
- Modify: `js/app.js:291-369`
- Modify: `css/style.css:266-303`
- Test: `test/smoke.js`

**Interfaces:**
- Consumes: `selectedCollabName()`, CAS stage markup, `collabBand()`, `saveDb()`, `uid()`, exact `collabItems`, and translated `scale5Labels`.
- Produces: `startCollab()`, `renderCollabQuestion()`, `finishCollab()`, `renderCollabResult(record)`, and `resetCollab()`.

- [ ] **Step 1: Add explicit guided CAS state and stage switching**

```js
let collabQuiz=null, lastCollabResult=null;
function showCollabStage(stage){
  document.getElementById("collabSetup").classList.toggle("hide",stage!=="setup");
  document.getElementById("collabQuiz").classList.toggle("hide",stage!=="quiz");
  document.getElementById("collabResultCard").classList.toggle("hide",stage!=="result");
}
```

Start validates the selected/new name and creates
`{name, i:0, answers:Array(15).fill(0)}` without saving.

- [ ] **Step 2: Render one exact item and five accessible scale buttons**

`renderCollabQuestion()` sets the subject, translated count, progress width,
exact item at `collabQuiz.i`, restored verbal selection label, Back disabled at
index 0, and five response buttons. The item container must contain one
`.clitem`, not all fifteen.

- [ ] **Step 3: Add delayed automatic progression**

Each response button stores the value, updates `aria-pressed`, shows the verbal
label, disables all five buttons, and uses this guard:

```js
const at=collabQuiz.i;
setTimeout(()=>{
  if(!collabQuiz || collabQuiz.i!==at) return;
  if(collabQuiz.i<14){ collabQuiz.i++; renderCollabQuestion(); }
  else finishCollab();
},260);
```

- [ ] **Step 4: Preserve Back and implement guarded Exit**

Back decrements `i` and renders the previous answer. Exit confirms only when
`answers.some(Boolean)`, then discards the in-progress state and returns to
setup without writing a CAS record.

- [ ] **Step 5: Extract existing result generation into automatic finish**

`finishCollab()` verifies all answers are nonzero, calculates total, pushes the
unchanged CAS record shape, saves, assigns `lastCollabResult`, clears
`collabQuiz`, and calls `renderCollabResult(record)`. Preserve the current band,
low-item review, discussion, note, history, and deletion behavior. “Start a new
checklist” calls `resetCollab()` and returns to setup.

- [ ] **Step 6: Make language refresh and navigation preserve the active CAS stage**

When language changes or the Collaboration tab is revisited, render the active
question if `collabQuiz`, rerender the result if `lastCollabResult`, otherwise
render setup. Wipe/import changes must refresh eligible people.

- [ ] **Step 7: Run targeted syntax and browser tests and verify GREEN**

Run:

```powershell
node --check js/app.js
node --check js/i18n.js
node test/content.test.js
node test/smoke.js
```

Expected: all source locks print `true`; guided CAS, name reuse, automatic
60-point result, English, mobile overflow, and JavaScript error assertions pass.

- [ ] **Step 8: Commit the guided flow**

```powershell
git add js/app.js css/style.css test/smoke.js
git commit -m "Guide CAS through one question at a time"
```

---

### Task 4: Document, rebuild, and verify the release artifacts

**Files:**
- Modify: `README.md`
- Modify: `fonts/serif-subset.woff2` only if coverage reports missing glyphs
- Regenerate: `dist/single.html`
- Regenerate: `dist/artifact.html`

**Interfaces:**
- Consumes: final source HTML/CSS/JS and the existing build/font-subset scripts.
- Produces: maintainable documentation and source-matched offline artifacts.

- [ ] **Step 1: Update README**

Document the guided CAS stages, existing-name chips, new-name validation,
automatic last-answer scoring, unchanged storage shape, and browser coverage.

- [ ] **Step 2: Check Chinese serif coverage**

Run the existing fontTools coverage check against `js/i18n.js`. If it reports
missing Han codepoints, rebuild `fonts/serif-subset.woff2` from
`C:\Windows\Fonts\NotoSerifTC-VF.ttf` at weight 600, then rerun until coverage
is complete.

- [ ] **Step 3: Rebuild offline files**

Run: `node build.js`

Expected: both `dist/single.html` and `dist/artifact.html` are generated without
error.

- [ ] **Step 4: Run the complete release gate**

```powershell
node --check js/store.js
node --check js/app.js
node --check js/i18n.js
node test/content.test.js
node test/smoke.js
node build.js
git diff --check
```

Expected: exit 0, all smoke lines `true`/`none`, no missing glyphs, and no
whitespace errors.

- [ ] **Step 5: Commit release artifacts**

```powershell
git add README.md dist/artifact.html dist/single.html fonts/serif-subset.woff2
git diff --cached --check
git commit -m "Build guided CAS release artifacts"
```

---

### Task 5: Push and verify GitHub Pages

**Files:**
- No source changes.

**Interfaces:**
- Consumes: verified local `main`.
- Produces: pushed GitHub `main` and a live branch-based Pages build of the same commit.

- [ ] **Step 1: Re-fetch and verify branch state**

Run `git fetch origin main`, confirm `main`, confirm the intended HEAD, and
ensure only the two pre-existing untracked package files remain.

- [ ] **Step 2: Push main**

Run: `git push origin main`

- [ ] **Step 3: Confirm Pages built the exact commit**

Use `gh api repos/remtoec/Secure/pages/builds/latest` until status is `built`
and its commit equals local HEAD.

- [ ] **Step 4: Verify live markers**

Fetch `https://remtoec.github.io/Secure/` with a release query and assert the
HTML contains `collabSetup`, `collabQuiz`, `collabPeople`, and the labelled
`personName` field. Fetch `js/app.js` and assert it contains
`renderCollabQuestion` and the 260 ms automatic progression.
