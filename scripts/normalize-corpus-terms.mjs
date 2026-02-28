import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "hexagram_corpus.generated.json");
const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

const rules = [
  [/Qianlong/g, "잠룡"],
  [/Qian/g, "건"],
  [/Yuanheng, Li Zhen\.?/g, "원형이정."],
  [/길조/g, "길함"],
  [/사용하지 마십시오/g, "쓰지 말라"],
  [/잘못 없음/g, "허물 없음"],
  [/혜택/g, "이로움"],
  [/행운이 찾아올 것이다/g, "길함이 온다"],
  [/비난도 없고/g, "허물도 없고"],
  [/불이익은 없습니다/g, "해로움이 없다"],
  [/순결/g, "바름"],
];

function normalizeText(text) {
  if (!text || typeof text !== "string") return text;
  let out = text;
  for (const [pattern, repl] of rules) out = out.replace(pattern, repl);
  out = out.replace(/\s{2,}/g, " ").trim();
  return out;
}

for (const h of data.hexagrams ?? []) {
  if (h.gua_text) {
    h.gua_text.literal_ko = normalizeText(h.gua_text.literal_ko);
    h.gua_text.interpretive_ko = normalizeText(h.gua_text.interpretive_ko);
  }
  for (const l of h.lines ?? []) {
    l.literal_ko = normalizeText(l.literal_ko);
    l.interpretive_ko = normalizeText(l.interpretive_ko);
  }
}

data.meta = {
  ...(data.meta ?? {}),
  normalizedAt: new Date().toISOString(),
  normalization: "term-unification-v1",
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
console.log(`[corpus] normalized terms -> ${filePath}`);
