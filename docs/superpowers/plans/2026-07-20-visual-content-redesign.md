# Visual Content Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace dense explanatory prose with source-faithful native diagrams, clearer onward routes, and compact supporting UI while preserving every questionnaire item.

**Architecture:** Add semantic diagram and navigation structures directly to `index.html`, keep every visible label in the existing `I18N` dictionaries, and style the new units with responsive CSS/SVG that extends the chart-room system. Scoring, persistence, chart rendering, and questionnaire control flow remain unchanged; the committed standalone bundles are regenerated only after the modular source passes its tests.

**Tech Stack:** Static HTML5, CSS custom properties and responsive grid, inline SVG, vanilla JavaScript i18n, Node.js assertions, Playwright smoke tests, GitHub Pages from `main` `/`.

## Global Constraints

- The full 2026 book remains authoritative for Levine's claims and terminology.
- Do not alter the nine ECR-RS questions, the 15 CAS questions, scoring, or persistence.
- Use natural Hong Kong Traditional Chinese and equivalent English information structure.
- All visible labels remain in `js/i18n.js`; the visuals require no network request or runtime dependency.
- Atmospheric contours are decorative, low-contrast, and hidden from assistive technology.
- The page must work from `file://`, support dark mode and reduced motion, and avoid horizontal overflow at 320 px.
- Bookfort contact must point to `https://www.instagram.com/reel/DaHcPUuOLx7`.
- Preserve the unrelated untracked `package.json` and `package-lock.json` without staging them.

---

### Task 1: Lock the new content structure in tests

**Files:**
- Modify: `test/content.test.js`
- Modify: `test/smoke.js`

**Interfaces:**
- Consumes: existing `I18N.zh`, `I18N.en`, and Playwright landing-page selectors.
- Produces: source assertions for the environmental paths and smoke selectors `#attachmentFrame`, `.purpose-card`, `#privacyDetails`, and `.term-grid`.

- [ ] **Step 1: Add failing source assertions**

Append assertions that both languages contain short labels for the two repeated-interaction paths and the three route purposes, without touching the existing exact questionnaire arrays:

```js
for (const lang of [I18N.zh, I18N.en]) {
  assert.ok(lang["landing.pathAlarmTitle"]);
  assert.ok(lang["landing.pathSafetyTitle"]);
  assert.ok(lang["landing.samePerson"]);
  assert.ok(lang["landing.routePrepareTitle"]);
  assert.ok(lang["landing.routeClubTitle"]);
  assert.ok(lang["landing.routeBookTitle"]);
  assert.ok(lang["collab.termCARRP"]);
}
```

- [ ] **Step 2: Add failing browser assertions**

Before clicking `#landingStart`, assert the new visual and link structure:

```js
console.log("Framework infographic:", await page.locator("#attachmentFrame").count() === 1);
console.log("Three purpose routes:", await page.locator(".purpose-card").count() === 3);
console.log("Compact privacy:", await page.locator("#privacyDetails").count() === 1);
console.log("Bookfort contact link:", await page.locator('a[href="https://www.instagram.com/reel/DaHcPUuOLx7"]').count() === 1);
```

After navigating to Collaborative Assessment, assert four glossary terms:

```js
console.log("CAS glossary:", await page.locator(".term-grid .term-card").count() === 4);
```

- [ ] **Step 3: Run tests and verify the expected failures**

Run:

```sh
node test/content.test.js
node test/smoke.js
```

Expected: content test fails on missing `landing.pathAlarmTitle`; smoke test reports the new landing selectors as false or fails when it reaches the missing glossary.

- [ ] **Step 4: Commit the red tests**

```sh
git add test/content.test.js test/smoke.js
git commit -m "Test visual content structure"
```

---

### Task 2: Build the landing information architecture

**Files:**
- Modify: `index.html`
- Modify: `js/i18n.js`

**Interfaces:**
- Consumes: `data-i18n` and `data-i18n-html`, which `js/app.js` already hydrates.
- Produces: the semantic elements and translation keys required by Task 1.

- [ ] **Step 1: Restructure the hero**

Create a `.hero-grid` containing `.hero-copy` and a `.hero-route` figure. Keep the existing primary and returning-user actions. The figure uses an SVG route with `aria-hidden="true"`, while a translated `<figcaption>` supplies its meaning:

```html
<figure class="hero-route">
  <svg viewBox="0 0 360 250" aria-hidden="true">
    <g class="route-contours">
      <path d="M20 54c54-40 114-38 160-6s104 35 160-4"/>
      <path d="M12 86c64-35 122-28 166 2s104 31 170-2"/>
      <path d="M18 206c58 28 116 24 158-8s104-36 166-4"/>
    </g>
    <circle class="route-base-ring" cx="54" cy="176" r="20"/>
    <circle class="route-base" cx="54" cy="176" r="7"/>
    <path class="route-line" d="M62 171C108 116 177 86 247 104c64 16 65 72 11 92-59 22-139 5-194-15"/>
    <circle class="route-station" cx="248" cy="104" r="6"/>
  </svg>
  <figcaption data-i18n="landing.routeCaption"></figcaption>
</figure>
```

Add short `landing.axisAnxiety` and `landing.axisAvoidance` coordinate labels inside `.axis-pair` below the message example.

- [ ] **Step 2: Add the environmental-path infographic**

Replace the frame prose card with `<section id="attachmentFrame">` containing two `.frame-path` articles. Each article has a translated heading, a three-node line, and one qualifying sentence. Add a concluding `.same-person` statement after both paths. Keep all claims text-backed; mark only connecting SVG lines as decorative.

- [ ] **Step 3: Add the three purpose routes**

Replace the invitation paragraph with a `.purpose-grid` containing exactly three `.purpose-card` articles: prepare, Bookfort Zone, and read the book. Put the quiz action in the first card, the exact Instagram reel in the second, and the existing author-site URL in the third.

- [ ] **Step 4: Compact privacy with native disclosure**

Use an always-visible `landing.privacyLead`, then:

```html
<details id="privacyDetails">
  <summary data-i18n="landing.privacyMore"></summary>
  <p data-i18n-html="landing.privacyBody"></p>
</details>
```

Keep `landing.disclaimer` visible below the disclosure.

- [ ] **Step 5: Rewrite bilingual landing copy**

Shorten the existing hero and frame prose and add exact counterpart keys for all new labels in `I18N.zh` and `I18N.en`. Chinese should describe repeated interaction with verbs such as 「出現」「回應」「退後」「提高警覺」; English should use direct verbs and preserve the qualification that security can be learned gradually rather than guaranteed.

- [ ] **Step 6: Run source and browser tests**

Run:

```sh
node test/content.test.js
node test/smoke.js
```

Expected: content assertions pass; new semantic counts and exact Instagram link report `true`. Layout styling may still be plain.

- [ ] **Step 7: Commit the semantic landing revision**

```sh
git add index.html js/i18n.js
git commit -m "Restructure visual landing content"
```

---

### Task 3: Add visual hierarchy and restrained atmosphere

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: class and ID structure from Task 2 and existing theme tokens.
- Produces: responsive hero, frame paths, purpose cards, privacy strip, and reduced-motion behavior.

- [ ] **Step 1: Style the hero and route**

Use a two-column grid above 700 px and one column below it. Draw contours with SVG strokes at low opacity, reuse `--accent`, `--axis`, and `--grid`, and keep figcaption text visible. Do not use photographs, gradients, shadows, or a new palette.

- [ ] **Step 2: Style the explanatory paths**

Use `.frame-grid { display:grid }`, bordered nodes, and directional connecting lines. The alarm path uses neutral ink and the safety path uses accent ink; neither resembles an error/success ranking. Stack paths on mobile.

- [ ] **Step 3: Style purpose cards and privacy disclosure**

Give the three routes distinct numbers and consistent card geometry. Keep the prepare action visually primary. Style `summary` as a focusable disclosure row with a CSS-only chevron and at least 44 px practical tap height.

- [ ] **Step 4: Add responsive and print guards**

Add explicit `min-width:0` to grid children, safe wrapping for long English labels, a 320 px breakpoint for button widths, and print rules that expand `details` content and remove purely atmospheric strokes.

- [ ] **Step 5: Run the modular browser test**

Run `node test/smoke.js`.

Expected: all checks report `true`; `JS errors: none`.

- [ ] **Step 6: Commit the visual system**

```sh
git add css/style.css
git commit -m "Add explanatory chart-room visuals"
```

---

### Task 4: Reduce setup and CAS introduction density

**Files:**
- Modify: `index.html`
- Modify: `js/i18n.js`
- Modify: `css/style.css`
- Modify: `test/smoke.js`

**Interfaces:**
- Consumes: existing setup form and CAS assessment renderer.
- Produces: `.snapshot-markers` with three statements and `.term-grid` with four definitions.

- [ ] **Step 1: Add the failing setup/glossary assertions**

Assert that setup shows three `.snapshot-marker` elements and CAS shows four `.term-card` elements in both languages. Run `node test/smoke.js`; expected result is false for the missing structures.

- [ ] **Step 2: Replace setup prose with markers**

Keep the answer-integrity note visible, but replace `home.stylesBody` with three translated markers: this relationship, this moment, and movement remains possible. The markers are explanatory labels, not claims of improvement.

- [ ] **Step 3: Split CAS terms into a glossary**

Shorten `collab.body` to the assessment task. Add four text-only term cards using `collab.termCyberballing`, `collab.termStillfacing`, `collab.termSIMIs`, and `collab.termCARRP`. Preserve `collabItems` byte-for-byte.

- [ ] **Step 4: Style markers and glossary**

Use compact responsive grids, modest numbering/line accents, and existing theme tokens. Cards must remain readable at 320 px without horizontal scrolling.

- [ ] **Step 5: Verify content locks and smoke flow**

Run:

```sh
node test/content.test.js
node test/smoke.js
```

Expected: exact ECR-RS/CAS locks pass, marker/glossary counts are true, and no JavaScript errors occur.

- [ ] **Step 6: Commit the supporting-view revision**

```sh
git add index.html js/i18n.js css/style.css test/smoke.js
git commit -m "Clarify setup and collaboration glossary"
```

---

### Task 5: Build, visually verify, and release

**Files:**
- Modify: `dist/single.html`
- Modify: `dist/artifact.html`
- Modify if copy characters changed: `fonts/serif-subset.woff2`
- Modify: `README.md`

**Interfaces:**
- Consumes: all modular source changes.
- Produces: committed standalone bundles, current maintenance documentation, and the released Pages site.

- [ ] **Step 1: Update README maintenance guidance**

Document the new landing units, their i18n keys, the rule that meaningful visuals must explain source-backed content, and the requirement that atmosphere remain subordinate to UX.

- [ ] **Step 2: Check font coverage**

Run this read-only coverage check against every Han character in `js/i18n.js`:

```powershell
@'
from fontTools.ttLib import TTFont
from pathlib import Path
import re

text = Path("js/i18n.js").read_text(encoding="utf-8")
needed = {ord(c) for c in re.findall(r"[\u3400-\u9fff]", text)}
font = TTFont("fonts/serif-subset.woff2")
covered = set().union(*(table.cmap.keys() for table in font["cmap"].tables))
missing = sorted(chr(cp) for cp in needed - covered)
print(f"Han coverage: {len(needed) - len(missing)}/{len(needed)}")
print("Missing:", "".join(missing) or "none")
raise SystemExit(1 if missing else 0)
'@ | python -
```

Expected: missing is `none`. If a new label introduces an uncovered glyph,
rewrite only that label with an equivalent covered expression, preserving its
meaning, and rerun the coverage check; do not replace the established font.

- [ ] **Step 3: Rebuild standalone artifacts**

Run `node build.js`.

Expected: `dist/single.html` and `dist/artifact.html` are regenerated without errors.

- [ ] **Step 4: Run the complete automated verification**

```sh
node --check js/i18n.js
node --check js/app.js
node test/content.test.js
node test/smoke.js
git diff --check
```

Expected: syntax checks exit 0, source locks are true, all smoke checks are true, and there are no whitespace errors.

- [ ] **Step 5: Perform responsive visual QA**

Render local screenshots at 320×800, 430×932, and 1280×900 in light mode, plus 430×932 in dark mode. Verify no horizontal overflow, diagrams remain legible, disclosure focus is visible, purpose order is correct, atmosphere does not reduce text contrast, and the questionnaire flow still dominates the primary action.

- [ ] **Step 6: Commit the release artifacts**

```sh
git add README.md dist/single.html dist/artifact.html fonts/serif-subset.woff2
git commit -m "Build visual content redesign"
```

Stage the font only if its content changed.

- [ ] **Step 7: Push and verify remote state**

```sh
git fetch origin main
git rebase --autostash origin/main
node test/content.test.js
node test/smoke.js
git push origin main
git rev-parse --short HEAD
git rev-parse --short origin/main
```

Expected: both final revisions match. Confirm the public Pages URL serves the new Instagram destination and framework structure. The remote tag `backup/pre-visual-redesign-20260720` remains the rollback point.
