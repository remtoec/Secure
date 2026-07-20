# Visual content and information-density design

Date: 2026-07-20

## Purpose

Reduce the app's reading burden while preserving its three roles: prepare
participants before the sharing, give other Bookfort members a useful glimpse
that invites further contact, and point interested readers towards *Secure*.
The revision must make Amir Levine's relationship- and environment-sensitive
attachment frame easier to grasp without turning the app into a summary of the
book or a generic therapeutic landing page.

## Design decision

Use native HTML, CSS, and SVG for both explanatory graphics and restrained
atmosphere. The diagrams need exact bilingual labels, dark-mode support,
responsive layout, accessible fallback text, and visual continuity with the
existing chart-room system. A generated raster illustration would add weight
and mood without explaining the framework as precisely, so it is outside this
revision.

Atmosphere remains subordinate to comprehension. Faint chart contours and the
secure-base route may establish place and hierarchy; they must not introduce
new claims, obscure text, or create a generic wellness aesthetic.

## Landing-page information hierarchy

### 1. Hero: orient and begin

The hero keeps the book-club eyebrow and the claim that attachment position can
vary across relationships. On wide screens it becomes a two-column composition;
on narrow screens the visual follows the heading and precedes the short body.

The existing path that leaves a base and returns becomes a larger, labelled
secure-base route. Faint contour lines provide the only atmospheric layer. The
body is shortened and split into two tasks:

- present Levine's message example as the immediate human situation;
- define anxiety and avoidance as the two coordinates the questionnaire records.

The primary action remains “開始測驗 / Start the quiz”. A returning user's map
action remains available without competing with it.

### 2. Framework: show how attachment can move

Replace the long prose card with a two-path explanatory diagram. Both paths are
explicitly about repeated present interactions, not moral categories or fixed
personalities:

- exclusion, emotional blankness, or unpredictable response can keep alarm and
  withdrawal active;
- repeated presence, response, and reliability can help the brain learn greater
  security.

The paths converge on a concise conclusion: childhood is one influence, while
the brain continues adapting; the same person can therefore occupy different
positions with different people. The diagram must not imply that any single
interaction determines an attachment style or that security follows
automatically.

Each path uses short labels, a simple line-and-node sequence, and one sentence
of supporting prose. On mobile the paths stack; on larger screens they sit side
by side. The full conceptual statement remains available as adjacent text so
the visual never carries meaning alone.

### 3. Three onward routes

Replace the invitation paragraphs with three numbered route cards aligned to
the product purposes:

1. Before the sharing: complete the questionnaire and compare several
   relationships on the map.
2. Bookfort Zone: use the Bookfort invitation to ask about membership and the
   sharing record or notes. Its destination is
   `https://www.instagram.com/reel/DaHcPUuOLx7`.
3. Read the book: use the author-site link for Levine's full argument, stories,
   and practices.

Each route contains one short explanation and, where relevant, its action. The
cards are navigation, not equivalent commercial offers: the quiz is primary;
Bookfort and book links are onward paths after the glimpse.

### 4. Privacy: reassure without another essay

Convert the privacy card into a compact trust strip. Its always-visible line
states that no account is required and data stays in this browser. A native
`details` disclosure contains export, import, device-change, and voluntary
sharing information. The clinical disclaimer stays visible outside the
disclosure.

## Other views

### Quiz setup

Replace the secondary snapshot prose card with three short visual markers:
“this relationship”, “at this time”, and “position can move”. Preserve the
instruction to answer from usual reactions rather than an idealized mature
self. The ECR-RS questions and their response scale remain unchanged.

### Results and map

Retain the existing generated chart as the main explanatory visual. Improve
hierarchy through spacing and compact labels only; do not add style mascots,
ranked quadrant colours, or advice not present in the source. Result copy keeps
the Bookfort discussion handoff.

### Collaborative Assessment Scale

Keep all 15 source-locked questions unchanged. Move the four terms currently
embedded in the introduction into a compact bilingual glossary grid:
Cyberballing, stillfacing, SIMIs, and CARRP. The introduction then explains
only the assessment task. The glossary remains visible before the relevant
questions and uses text, not icons, where an icon could distort a term.

## Copy and source boundaries

All changed Chinese follows `docs/translation-principles.md`. The whole book is
the authority for Levine's framework; the ECR-RS and CAS wording remain locked
to their established sources. Visual labels may compress an explanation, but
they may not create a causal claim stronger than the book, present Bookfort
interpretation as Levine's words, or frame an attachment position as a fixed
identity.

English and Traditional Chinese receive the same information structure. They
need not mirror syntax, but neither language may omit a claim, qualification,
or action available in the other.

## Components and implementation boundaries

- `index.html` owns the semantic structure for the hero visual, framework
  diagram, route cards, privacy disclosure, setup markers, and CAS glossary.
- `js/i18n.js` owns every visible bilingual label and the revised prose.
- `css/style.css` owns the responsive grid, chart-room linework, dark mode,
  reduced-motion behavior, and print-safe presentation.
- Existing scoring, persistence, chart generation, and questionnaire control
  flow remain unchanged.
- `build.js` regenerates both committed standalone bundles after source edits.

The visuals use no external image host, font, runtime dependency, or network
request. The page must continue to work from `file://`.

## Accessibility and responsive behavior

- Meaningful diagrams have translated headings or descriptions available to
  assistive technology; purely atmospheric contours are hidden from it.
- Text and line contrast meet the current light- and dark-theme standards.
- Reading order remains logical without CSS grid.
- Mobile layouts avoid horizontal scrolling at 320 px width.
- Motion is limited to the existing route drawing and disabled under
  `prefers-reduced-motion`.
- Links preserve visible focus states and minimum practical tap targets.
- The privacy disclosure uses native keyboard-accessible `details` and
  `summary` elements.

## Verification

The implementation is complete when:

- the Bookfort link points only to the requested Instagram reel;
- the Chinese and English landing pages contain the same three-route structure;
- the framework diagram states both environmental paths and the relationship-
  specific conclusion without losing the book's qualifications;
- all ECR-RS and CAS source-lock tests still pass;
- the browser smoke test completes in both languages with no JavaScript errors;
- new smoke assertions cover the infographic, route cards, privacy disclosure,
  glossary, and Instagram destination;
- the page is visually checked at mobile and desktop widths in light and dark
  themes, including a 320 px overflow check;
- `node build.js`, `node test/content.test.js`, `node test/smoke.js`, and
  `git diff --check` pass before release.

## Release

Commit only intended project files, push `main`, and let GitHub Pages publish
from `main` `/ (root)` according to the local release workflow documented in
the README.
