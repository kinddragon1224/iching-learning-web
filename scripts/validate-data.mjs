import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readJson(rel) {
  const p = path.join(root, rel);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function readText(rel) {
  const p = path.join(root, rel);
  return fs.readFileSync(p, "utf8");
}

function range64() {
  return Array.from({ length: 64 }, (_, i) => i + 1);
}

function missingFromRange(ids) {
  const set = new Set(ids);
  return range64().filter((id) => !set.has(id));
}

function duplicateIds(ids) {
  const counts = new Map();
  for (const id of ids) counts.set(id, (counts.get(id) ?? 0) + 1);
  return Array.from(counts.entries())
    .filter(([, c]) => c > 1)
    .map(([id, c]) => ({ id, count: c }));
}

function idsFromTsByRegex(source) {
  return Array.from(source.matchAll(/\bid:\s*(\d+)\b/g)).map((m) => Number(m[1]));
}

function fmtList(arr) {
  if (!arr.length) return "-";
  return arr.join(", ");
}

const errors = [];

const axisMap = readJson("data/axis_map.json");
const axisIds = Object.keys(axisMap).map(Number);

const cardIndex = readJson("data/card_index.json");
const cardIds = cardIndex.map((x) => x.id).filter((x) => Number.isInteger(x));

const content = readJson("data/hexagram_content.json");
const contentIds = content.map((x) => x.id).filter((x) => Number.isInteger(x));

const proTracksSource = readText("data/pro_tracks.ts");
const proTrackIds = idsFromTsByRegex(proTracksSource);

const hexagramsSource = readText("data/hexagrams.ts");
const nameIds = Array.from(hexagramsSource.matchAll(/^(\s*)(\d+):\s*\{/gm)).map((m) => Number(m[2]));

const checks = [
  { name: "axis_map", ids: axisIds, expect: 64 },
  { name: "card_index", ids: cardIds, expect: 64 },
  { name: "hexagram_content", ids: contentIds, expect: 64 },
  { name: "pro_tracks", ids: proTrackIds, expect: 64 },
  { name: "hexagrams:NAMES", ids: nameIds, expect: 64 },
];

for (const c of checks) {
  const dup = duplicateIds(c.ids);
  const missing = missingFromRange(c.ids);
  if (dup.length) errors.push(`${c.name} duplicated ids: ${JSON.stringify(dup)}`);
  if (missing.length) errors.push(`${c.name} missing ids (${missing.length}): ${fmtList(missing)}`);
  if (c.ids.length !== c.expect) {
    errors.push(`${c.name} count mismatch: got ${c.ids.length}, expected ${c.expect}`);
  }
}

console.log("\n[Hexagram Data Validation]");
for (const c of checks) {
  const unique = new Set(c.ids).size;
  console.log(`- ${c.name}: total=${c.ids.length}, unique=${unique}`);
}

if (errors.length) {
  console.error("\n❌ Validation failed\n");
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log("\n✅ Validation passed");
