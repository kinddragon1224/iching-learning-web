import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "hexagram_corpus.generated.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const rules = [
  [/큰 강의 이로움을 누리세요/g, "큰 내를 건넘이 이롭다"],
  [/군사를 동원하지 말라/g, "무력 동원은 삼가라"],
  [/행운을 빌어요/g, "길하다"],
  [/번영하고 번영하게 만드십시오/g, "번성하게 한다"],
  [/무슨 죄입니까\?/g, "무슨 허물이 있으랴"],
  [/걱정하신다면/g, "근심을 거두면"],
  [/아무런 잘못이 없습니다/g, "허물이 없다"],
  [/허물 없음, 허물 없음/g, "허물 없음"],
  [/길함, 허물 없음/g, "길하며 허물 없음"],
  [/흉하다, 이익이 없습니다/g, "흉하며 이로움이 없다"],
  [/이익이 없습니다/g, "이로움이 없다"],
  [/어딘가에 가면/g, "어디로 나아가면"],
  [/만약 /g, ""],
];

function normalize(t) {
  if (!t || typeof t !== "string") return t;
  let out = t;
  for (const [p, r] of rules) out = out.replace(p, r);
  out = out.replace(/\s{2,}/g, " ").trim();
  return out;
}

for (const h of data.hexagrams ?? []) {
  if (h.gua_text) {
    h.gua_text.literal_ko = normalize(h.gua_text.literal_ko);
    h.gua_text.interpretive_ko = normalize(h.gua_text.interpretive_ko);
  }
  for (const l of h.lines ?? []) {
    l.literal_ko = normalize(l.literal_ko);
    l.interpretive_ko = normalize(l.interpretive_ko);
  }
}

data.meta = {
  ...(data.meta ?? {}),
  refinedAtPass4: new Date().toISOString(),
  refinement4: "tone-unification-declarative-v1",
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
console.log("[corpus] pass4 refined");
