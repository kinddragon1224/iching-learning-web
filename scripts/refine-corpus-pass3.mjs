import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "hexagram_corpus.generated.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

function clean(text) {
  if (!text || typeof text !== "string") return text;
  let t = text;
  // remove latin chunks and leftover artifacts
  t = t.replace(/[A-Za-z][A-Za-z0-9\-_.()]*/g, "");
  t = t.replace(/\s*,\s*/g, ", ");
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/,\s*,+/g, ", ");
  t = t.replace(/\(\s*\)/g, "");
  t = t.replace(/\s+([,.!?])/g, "$1");
  t = t.replace(/^[,\s]+|[,\s]+$/g, "");

  // small readability fixes
  t = t.replace(/허물 없음, 허물 없음/g, "허물 없음");
  t = t.replace(/길함, 길함/g, "길함");
  t = t.replace(/흉하다, 흉하다/g, "흉하다");
  t = t.replace(/비난/g, "허물");

  return t.trim();
}

for (const h of data.hexagrams ?? []) {
  if (h.gua_text) {
    h.gua_text.literal_ko = clean(h.gua_text.literal_ko);
    h.gua_text.interpretive_ko = clean(h.gua_text.interpretive_ko);
  }
  for (const l of h.lines ?? []) {
    l.literal_ko = clean(l.literal_ko);
    l.interpretive_ko = clean(l.interpretive_ko);
  }
}

data.meta = {
  ...(data.meta ?? {}),
  refinedAtPass3: new Date().toISOString(),
  refinement3: "remove-latin-artifacts",
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
console.log("[corpus] pass3 refined");
