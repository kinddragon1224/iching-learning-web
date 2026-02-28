import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const corpusPath = path.join(root, "data", "hexagram_corpus.generated.json");

if (!fs.existsSync(corpusPath)) {
  console.error(`[corpus] Missing file: ${corpusPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
const hexagrams = Array.isArray(data.hexagrams) ? data.hexagrams : [];

const issues = [];

if (hexagrams.length !== 64) {
  issues.push(`hexagrams count is ${hexagrams.length} (expected 64)`);
}

for (const h of hexagrams) {
  if (!(Number.isInteger(h.id) && h.id >= 1 && h.id <= 64)) {
    issues.push(`invalid id: ${h.id}`);
    continue;
  }

  const lineNos = new Set();
  if (!Array.isArray(h.lines)) {
    issues.push(`#${h.id}: lines missing`);
  } else {
    for (const line of h.lines) {
      if (!(Number.isInteger(line.line_no) && line.line_no >= 1 && line.line_no <= 6)) {
        issues.push(`#${h.id}: invalid line_no=${line.line_no}`);
      } else {
        lineNos.add(line.line_no);
      }
      if (!line.original && !line.literal_ko && !line.interpretive_ko) {
        issues.push(`#${h.id} line ${line.line_no}: empty line payload`);
      }
    }

    if (h.lines.length > 0 && lineNos.size !== 6) {
      issues.push(`#${h.id}: lines provided but not full 1~6 set (found ${[...lineNos].sort().join(",")})`);
    }
  }

  const g = h.gua_text ?? {};
  if (!g.original && !g.literal_ko && !g.interpretive_ko) {
    issues.push(`#${h.id}: gua_text all empty`);
  }
}

if (issues.length > 0) {
  console.error("[corpus] validation failed:");
  for (const e of issues) console.error(` - ${e}`);
  process.exit(1);
}

console.log(`[corpus] validation passed (${hexagrams.length} hexagrams)`);
