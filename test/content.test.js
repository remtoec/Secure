"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({
  localStorage: { getItem: () => null, setItem: () => {} },
});
const source = [
  fs.readFileSync(path.join(root, "js", "i18n.js"), "utf8"),
  fs.readFileSync(path.join(root, "js", "scoring.js"), "utf8"),
  fs.readFileSync(path.join(root, "js", "store.js"), "utf8"),
  ";globalThis.__content = { I18N, collabBand: typeof collabBand === 'function' ? collabBand : undefined, repairPeopleSlots: typeof repairPeopleSlots === 'function' ? repairPeopleSlots : undefined };",
].join("\n");
vm.runInContext(source, context);

const { I18N, collabBand, repairPeopleSlots } = context.__content;

const ecrSpecific = [
  "It helps to turn to this person in times of need.",
  "I usually discuss my problems and concerns with this person.",
  "I talk things over with this person.",
  "I find it easy to depend on this person.",
  "I don’t feel comfortable opening up to this person.",
  "I prefer not to show this person how I feel deep down.",
  "I often worry that this person does not really care for me.",
  "I’m afraid that this person may abandon me.",
  "I worry that this person won’t care about me as much as I care about them.",
];

const ecrGeneral = [
  "It helps to turn to people in times of need.",
  "I usually discuss my problems and concerns with others.",
  "I talk things over with people.",
  "I find it easy to depend on others.",
  "I don’t feel comfortable opening up to others.",
  "I prefer not to show others how I feel deep down.",
  "I often worry that other people do not really care for me.",
  "I’m afraid that other people may abandon me.",
  "I worry that others won’t care about me as much as I care about them.",
];

const casItems = [
  "This person has my well-being in mind.",
  "This person shows willingness to both give and receive.",
  "The effort I invest in this relationship is sustainable (not too draining).",
  "The relationship feels fair and balanced.",
  "I feel heard, seen, and valued in this relationship.",
  "I am making the other person feel heard, seen, and valued.",
  "This person refrains from Cyberballing or stillfacing behaviors in our interactions.",
  "This person is open to other points of view and is willing to find common ground.",
  "This person has my back.",
  "The SIMIs with this person are mostly positive.",
  "I feel emotionally stable in this relationship.",
  "This person does not intentionally do things to punish me or “teach me a lesson.”",
  "This person is CARRP with me.",
  "I am CARRP with this person.",
  "Overall, this person is worth collaborating with.",
];

assert.deepStrictEqual(Array.from(I18N.en.questions), ecrSpecific);
assert.deepStrictEqual(Array.from(I18N.en.questionsGeneral), ecrGeneral);
assert.deepStrictEqual(Array.from(I18N.en.collabItems), casItems);
assert.strictEqual(typeof collabBand, "function");
assert.strictEqual(collabBand(25), "low");
assert.strictEqual(collabBand(26), "mixed");
assert.strictEqual(collabBand(59), "high");
assert.strictEqual(collabBand(60), "strong");
assert.strictEqual(typeof repairPeopleSlots, "function");

const duplicateSlots = [
  { id: "a", name: "Alpha", slot: 1, results: [{ date: "2026-01-01", anxiety: 2, avoidance: 2 }] },
  { id: "b", name: "Beta", slot: 1, results: [{ date: "2026-01-02", anxiety: 3, avoidance: 3 }] },
  { id: "c", name: "Gamma", slot: 1, results: [{ date: "2026-01-03", anxiety: 4, avoidance: 4 }] },
];
assert.strictEqual(repairPeopleSlots(duplicateSlots), true);
assert.deepStrictEqual(Array.from(duplicateSlots, person => person.slot), [1, 0, 2]);
assert.strictEqual(duplicateSlots[0].results.length, 1);
assert.strictEqual(repairPeopleSlots(duplicateSlots), false);

for (const lang of [I18N.zh, I18N.en]) {
  assert.ok(lang["landing.pathAlarmTitle"]);
  assert.ok(lang["landing.pathSafetyTitle"]);
  assert.ok(lang["landing.samePerson"]);
  assert.ok(lang["landing.routePrepareTitle"]);
  assert.ok(lang["landing.routeClubTitle"]);
  assert.ok(lang["landing.routeBookTitle"]);
  assert.ok(lang["collab.termCARRP"]);
}

const english = JSON.stringify(I18N.en);
assert.ok(!english.includes("worth continuing to invest in"));
assert.ok(!english.includes("sets no pass mark"));

console.log("Content source locks: true");
console.log("Collaboration score bands: true");
console.log("Duplicate colour-slot repair: true");
