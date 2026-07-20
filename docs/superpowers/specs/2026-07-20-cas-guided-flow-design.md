# Guided CAS and Relationship Identity Design

## Purpose

Make the Collaborative Assessment Scale (CAS) as easy to complete as the
attachment questionnaire, make the attachment questionnaire's person-name
field unmistakable, and let participants reuse a named relationship already
plotted on their attachment map.

The change must preserve the app's role as a pre-sharing tool and trailer. It
must not add therapeutic interpretation, alter Levine's CAS items, paraphrase
the ECR-RS items, or turn either questionnaire into a diagnosis.

## Interaction model

### Attachment questionnaire identity field

The `specific` mode continues to require one name. The plain input is replaced
by a visually bounded identity panel containing:

- a real `<label>` bound to the text input;
- a short required marker;
- helper copy explaining that this name keeps the person's points together on
  the map; and
- the existing inline validation message.

The general-pattern mode and existing-person retest flow remain unchanged. The
panel is hidden when it is not needed.

### CAS setup

The CAS begins in a setup state, before any item is shown. Its introduction and
four-term glossary remain available in this state. The participant must choose
one assessment subject by either:

1. selecting a chip for an existing named person from `db.people`; or
2. selecting “Someone else” and entering a new name in a clearly labelled
   field.

Only people whose attachment record is not `type: "general"` and who have at
least one result appear as reusable choices. The app does not show the general
pattern as if it were a person. If there are no eligible people, the new-name
field is shown immediately. A blank new name blocks Start and focuses the
field. Selecting an existing person uses the saved display name; it does not
modify that person's attachment record.

CAS records keep the existing storage shape (`name`, `date`, `answers`,
`total`). Reusing a person copies the current display name into the CAS record;
no schema migration or hard link is introduced.

### Guided CAS questionnaire

Starting CAS hides the setup card and shows one item at a time. The state is:

```js
{ name: string, i: number, answers: number[15] }
```

The guided view includes:

- the selected person's name;
- `Question n of 15` and a progress line;
- one exact CAS item;
- five graduated response dots with accessible numeric and verbal labels;
- a visible verbal label for the selected response;
- Back and Exit controls; and
- a compact glossary disclosure so book-specific terms remain available.

Selecting a response disables the five buttons briefly so the choice remains
visible. After 260 ms, questions 1–14 advance automatically. Selecting an
answer for question 15 immediately calculates, saves, and displays the existing
CAS result interpretation. Back preserves previous answers. Exit discards the
in-progress answers after confirmation when at least one answer exists, then
returns to setup. No partial CAS is saved.

The result's “Start a new checklist” action clears the in-progress state and
returns to CAS setup. Past CAS records and deletion continue to work.

## Copy and visual direction

All new strings live in both language blocks in `js/i18n.js`. Chinese remains
natural Hong Kong Traditional Chinese. Copy distinguishes app instructions
from claims attributed to Levine. Exact `collabItems`, `questions`, and
`questionsGeneral` arrays remain byte-for-byte unchanged.

The identity panels use the established chart-room language: a quiet hairline
border, a small coordinate-style label, the existing paper and accent colours,
and no new icon dependency or decorative illustration. The CAS question stage
reuses the attachment questionnaire's stable reading edge and responsive
vertical space. It must fit at 320 px without horizontal overflow.

## Accessibility and error handling

- Every name input has a bound `<label>` and `aria-describedby` helper/error
  text.
- Person chips expose selection through `aria-pressed`.
- Scale buttons expose both value and translated verbal meaning through
  `aria-label`, plus `aria-pressed` for the current answer.
- Progress uses the existing visual component and textual question count.
- Blank-name validation is inline rather than an alert.
- Exit confirmation is only shown after an answer has been recorded.
- The result cannot be produced until all 15 answers exist; automatic
  progression is the only normal route to scoring.

## Testing

Update the real-browser smoke test before implementation so it fails for the
missing behavior, then verify:

- the attachment specific-name field has a bound label and visible identity
  panel;
- CAS offers a previously tested named person but excludes the general record;
- CAS can select that person without typing the name;
- CAS presents exactly one item at a time;
- selecting a response advances to the next item;
- Back restores the prior selected response;
- question 15 automatically produces and persists the 60-point result for
  fifteen answers of 4;
- “Someone else” requires a nonblank name and supports a new CAS subject;
- English copy and the 320 px layout remain valid; and
- the exact-item source locks, import/export behavior, and existing attachment
  flows still pass.

Rebuild `dist/single.html`, `dist/artifact.html`, and the Chinese serif subset
if new copy adds uncovered Han characters. Update README maintenance and test
documentation to describe the guided CAS flow and reusable names.
