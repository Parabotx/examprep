import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(resolve(root, "src/data/iasQuizBank.ts"), "utf8");

const seedArrays = [
  { name: "chapter1Seeds", chapter: "Chapter 1" },
  { name: "chapter1MoreSeeds", chapter: "Chapter 1" },
  { name: "chapter2Seeds", chapter: "Chapter 2" },
  { name: "chapter2MoreSeeds", chapter: "Chapter 2" },
];

const seedPattern = /^\s*\{\s*question:\s*"((?:\\.|[^"\\])*)",\s*scenario:\s*"((?:\\.|[^"\\])*)",\s*answer:\s*"((?:\\.|[^"\\])*)",\s*distractors:\s*\[((?:"(?:\\.|[^"\\])*"(?:\s*,\s*)?){3})\],\s*explanation:\s*"((?:\\.|[^"\\])*)",\s*topic:\s*"((?:\\.|[^"\\])*)"/gm;
const quotedStringPattern = /"((?:\\.|[^"\\])*)"/g;

function decodeQuoted(value) {
  return JSON.parse(`"${value}"`);
}

function fail(message) {
  console.error(`Question-bank validation failed: ${message}`);
  process.exitCode = 1;
}

const totals = { "Chapter 1": 0, "Chapter 2": 0 };
const problems = [];

for (const { name, chapter } of seedArrays) {
  const marker = `const ${name}: QuestionSeed[] = [`;
  const start = source.indexOf(marker);
  if (start === -1) {
    problems.push(`Missing question array: ${name}`);
    continue;
  }

  const end = source.indexOf("\\n];", start);
  if (end === -1) {
    problems.push(`Could not find the end of question array: ${name}`);
    continue;
  }

  const section = source.slice(start + marker.length, end);
  const seeds = [...section.matchAll(seedPattern)];
  const declaredQuestions = [...section.matchAll(/^\s*question:\s*"/gm)].length;

  if (seeds.length !== declaredQuestions) {
    problems.push(`${name}: found ${seeds.length} complete seeds but ${declaredQuestions} question entries`);
  }

  for (let index = 0; index < seeds.length; index += 1) {
    const [, questionRaw, scenarioRaw, answerRaw, distractorsRaw, explanationRaw, topicRaw] = seeds[index];
    const label = `${name} seed ${index + 1}`;
    const question = decodeQuoted(questionRaw);
    const scenario = decodeQuoted(scenarioRaw);
    const answer = decodeQuoted(answerRaw);
    const explanation = decodeQuoted(explanationRaw);
    const topic = decodeQuoted(topicRaw);
    const distractors = [...distractorsRaw.matchAll(quotedStringPattern)].map((match) => decodeQuoted(match[1]));
    const options = [answer, ...distractors];

    if (!question.trim()) problems.push(`${label}: question is empty`);
    if (!scenario.trim()) problems.push(`${label}: scenario question is empty`);
    if (!answer.trim()) problems.push(`${label}: correct answer is empty`);
    if (!topic.trim()) problems.push(`${label}: topic tag is empty`);
    if (explanation.trim().length < 25) problems.push(`${label}: explanation is too short to teach the tested concept`);
    if (distractors.length !== 3) problems.push(`${label}: expected exactly three distractors`);
    if (new Set(options).size !== 4) problems.push(`${label}: the four answer choices must be distinct`);
    totals[chapter] += 1;
  }
}

if (totals["Chapter 1"] < 79) problems.push(`Chapter 1 has only ${totals["Chapter 1"]} validated seeds (expected at least 79)`);
if (totals["Chapter 2"] < 105) problems.push(`Chapter 2 has only ${totals["Chapter 2"]} validated seeds (expected at least 105)`);

if (!source.includes("function buildOptionExplanations") ||
    !source.includes("optionExplanations: buildOptionExplanations(seed, directOptions") ||
    !source.includes("optionExplanations: buildOptionExplanations(seed, scenarioOptions")) {
  problems.push("Both recall and scenario questions must generate explanations for all answer options");
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log("Question-bank validation passed.");
console.log(`Chapter 1: ${totals["Chapter 1"]} seeds / ${totals["Chapter 1"] * 2} generated questions`);
console.log(`Chapter 2: ${totals["Chapter 2"]} seeds / ${totals["Chapter 2"] * 2} generated questions`);
console.log("Every seed has a question, scenario, correct answer, three distinct distractors, a topic tag and a substantive explanation.");
console.log("Both generated variants include per-option explanations.");
