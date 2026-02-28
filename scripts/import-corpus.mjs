import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "reports", "corpus_input.json");
const templatePath = path.join(root, "reports", "corpus_input.template.json");
const outputPath = path.join(root, "data", "hexagram_corpus.generated.json");

if (!fs.existsSync(inputPath)) {
  console.error(`[corpus] Missing input: ${inputPath}`);
  console.error(`[corpus] Copy template first: ${templatePath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf8");
const parsed = JSON.parse(raw);

const hexagrams = Array.isArray(parsed.hexagrams) ? parsed.hexagrams : [];

const normalized = hexagrams
  .map((h) => ({
    id: Number(h.id),
    gua_text: {
      original: h?.gua_text?.original ?? undefined,
      literal_ko: h?.gua_text?.literal_ko ?? undefined,
      interpretive_ko: h?.gua_text?.interpretive_ko ?? undefined,
      notes: Array.isArray(h?.gua_text?.notes) ? h.gua_text.notes : [],
    },
    lines: Array.isArray(h.lines)
      ? h.lines
          .map((l) => ({
            line_no: Number(l.line_no),
            label_ko: l.label_ko ?? undefined,
            label_hanja: l.label_hanja ?? undefined,
            original: l.original ?? undefined,
            literal_ko: l.literal_ko ?? undefined,
            interpretive_ko: l.interpretive_ko ?? undefined,
            notes: Array.isArray(l.notes) ? l.notes : [],
            ambiguities: Array.isArray(l.ambiguities) ? l.ambiguities : [],
          }))
          .filter((l) => Number.isInteger(l.line_no) && l.line_no >= 1 && l.line_no <= 6)
      : [],
    core_terms: Array.isArray(h.core_terms) ? h.core_terms : [],
    risk_flags: Array.isArray(h.risk_flags) ? h.risk_flags : [],
  }))
  .filter((h) => Number.isInteger(h.id) && h.id >= 1 && h.id <= 64)
  .sort((a, b) => a.id - b.id);

const out = {
  meta: {
    version: parsed?.meta?.version ?? "v1",
    source: parsed?.meta?.source ?? "manual",
    updatedAt: new Date().toISOString(),
  },
  hexagrams: normalized,
};

fs.writeFileSync(outputPath, JSON.stringify(out, null, 2), "utf8");
console.log(`[corpus] Imported ${normalized.length} hexagrams -> ${outputPath}`);
