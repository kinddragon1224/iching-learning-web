import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "hexagram_corpus.generated.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const map = [
  [/\bYuanheng\b/g, "원형"],
  [/\bLizhen\b/g, "이정"],
  [/\bZhenji\b/g, "정길"],
  [/\bYoufu\b/g, "유부"],
  [/\bDachuan\b/g, "대천"],
  [/\bJianhou\b/g, "건후"],
  [/\bTun\b/g, "둔"],
  [/\bMeng\b/g, "몽"],
  [/\bQian\b/g, "건"],
  [/\bKun\b/g, "곤"],
  [/\bHeng\b/g, "형"],
  [/\bJi\b/g, "길"],
  [/\bXiong\b/g, "흉"],
  [/\bLi\b/g, "리"],
  [/\bZhen\b/g, "정"],
  [/\bFu\b/g, "부"],
  [/\bWang\b/g, "왕"],
  [/\bBao\b/g, "포"],
  [/\bZi\b/g, "자"],
  [/\bKe\b/g, "극"],
  [/\bJiao\b/g, "구"],
  [/\bJian\b/g, "건"],
  [/\bGu\b/g, "고"],
  [/\bYi\b/g, "이"],
  [/\bWei\b/g, "위"],
  [/\bBoC\b/g, "복"],

  [/비난은 없습니다/g, "허물 없음"],
  [/비난할 여지가 없습니다/g, "허물 없음"],
  [/잘못 없음/g, "허물 없음"],
  [/상서로운 일/g, "길함"],
  [/상서로운 인물/g, "길함"],
  [/행운이 찾아올 것이다/g, "길함이 온다"],
  [/치열합니다/g, "흉하다"],
  [/치열하면/g, "흉하면"],
  [/선생을 고용하지 말라/g, "군사를 동원하지 말라"],
  [/당신이/g, "만약"],
  [/친구를 사귀십시오/g, "벗을 얻는다"],
  [/친구를 잃게 됩니다/g, "벗을 잃는다"],
  [/남서부 지역/g, "서남"],
  [/북동쪽/g, "동북"],
  [/소녀를 얻기 위해 그것을 사용하지 마십시오/g, "여인을 취하려 들지 말라"],
  [/동물은 길함입니다/g, "암소를 기르면 길하다"],
  [/도적과 도적/g, "도적"],
  [/투를 안고/g, "진흙을 이고"],
  [/그 기스를 사용하고/g, "간소한 예로"],
  [/허물도 없고 만남의 허물도 없습니다/g, "허물은 없으나"],
  [/영원한 바름을 쓰지 말라/g, "지나친 고집은 피하라"],
];

function applyRules(text) {
  if (!text || typeof text !== "string") return text;
  let out = text;
  for (const [p, r] of map) out = out.replace(p, r);
  out = out.replace(/[ ]{2,}/g, " ").trim();
  return out;
}

for (const h of data.hexagrams ?? []) {
  if (h.gua_text) {
    h.gua_text.literal_ko = applyRules(h.gua_text.literal_ko);
    h.gua_text.interpretive_ko = applyRules(h.gua_text.interpretive_ko);
  }
  for (const l of h.lines ?? []) {
    l.literal_ko = applyRules(l.literal_ko);
    l.interpretive_ko = applyRules(l.interpretive_ko);
  }
}

data.meta = {
  ...(data.meta ?? {}),
  refinedAt: new Date().toISOString(),
  refinement: "pass2-transliteration-cleanup",
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
console.log("[corpus] pass2 refined");
