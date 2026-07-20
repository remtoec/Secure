# Quiz and map UX corrections

Date: 2026-07-20

## Objective

Correct four points of friction without changing the ECR-RS or CAS source
wording: repair duplicated map colours in existing browser data, preserve one
hue across retests of the same person, remove relationship categories that do
not affect the questionnaire, stabilize question layout, and prevent the
English mobile tab bar from overflowing.

## Map colour identity

One saved person owns one colour slot. Every result belonging to that person
uses the same hue; older points use lower opacity and the latest point uses full
opacity. Different people receive different slots until the existing eight-
colour palette is exhausted.

Fresh records already follow this rule. The defect occurs when legacy or
imported data contains duplicate integer `slot` values: `normalizeDb()` trusts
the duplicates, so several people can remain green. Normalization must preserve
the first valid use of a slot, reassign later duplicates to the next unused
slot, and leave valid unique assignments unchanged. Import merge must use the
same next-slot helper. A repaired database is written back to localStorage so
the correction persists.

## Questionnaire mode selection

The ECR-RS has two meaningful modes in this app:

- general pattern, which uses `questionsGeneral`;
- one specific person, which uses `questions`.

Partner, mother, father, family, friend, colleague, and other currently change
only metadata. Replace those chips with two mode choices. General mode uses the
fixed localized general label and does not ask for another name. Specific mode
shows one name-or-private-alias field; it must contain non-whitespace text before
the quiz starts. New specific records retain `type: "other"` for export-format
compatibility. Existing records and their historical type values remain
readable and retestable.

The setup copy must explicitly explain that the source questionnaire repeats
the same person-specific statements for every named relationship; the value
comes from comparing positions, not from changing the questions.

## Question stage

Question wording remains byte-for-byte unchanged. Place `#qtext` inside a
deliberately sized question stage so the response scale does not jump between
items. The stage vertically centres its content, while the text itself remains
aligned to the reading edge. Replace `text-wrap: balance` with
`text-wrap: pretty` and use responsive minimum heights that accommodate the
English questions at 320 px without clipping.

## English mobile navigation

The tab bar needs 378 px in English but has only 300 px at a 320 px viewport.
Do not hide a still-overflowing scrollbar. Keep the full “Collaboration” label
above 390 px and show “CAS” at 390 px and below. Both labels occupy the same
button, and the button retains a translated accessible name identifying the
Collaborative Assessment Scale. The four tabs remain in one row with no
horizontal overflow.

## Compatibility and accessibility

- Existing localStorage and exported JSON remain version 1 compatible.
- ECR-RS and CAS arrays and scoring formulas do not change.
- Mode controls expose `aria-pressed`; validation places a translated message
  beside the name field and moves focus to the field.
- Old relationship types may still appear in historical records, but new
  specific results do not ask users to classify a person.
- The mobile short label changes visual text only; assistive technology receives
  the full tab name in both languages.

## Verification

- A unit-level store test loads three people with duplicate slot `1` values and
  receives three distinct slots, while two results for one person still share
  that person's slot.
- Importing a new person chooses an unused slot.
- Browser smoke tests see only general and specific setup modes, block a blank
  specific alias, complete both questionnaire variants, and retest an existing
  person.
- Chart assertions confirm different people use different fills and one
  person's earlier/latest points share a fill with different opacity.
- Computed layout checks confirm `text-wrap: pretty`, centred question-stage
  placement, and no English tab overflow at 320 px.
- `node build.js`, syntax checks, content locks, browser smoke tests, font
  coverage, and `git diff --check` pass before pushing `main`.
