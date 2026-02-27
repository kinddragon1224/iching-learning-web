import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const proPath = path.join(root, "data/pro_tracks.ts");
const hexPath = path.join(root, "data/hexagrams.ts");

const proSrc = fs.readFileSync(proPath, "utf8");
const hexSrc = fs.readFileSync(hexPath, "utf8");

const existingIds = new Set(
  Array.from(proSrc.matchAll(/\bid:\s*(\d+)\b/g)).map((m) => Number(m[1]))
);

const koNameById = new Map(
  Array.from(hexSrc.matchAll(/\n\s*(\d+):\s*\{\s*ko:\s*"([^"]+)"/g)).map((m) => [Number(m[1]), m[2]])
);

const missing = Array.from({ length: 64 }, (_, i) => i + 1).filter((id) => !existingIds.has(id));

if (!missing.length) {
  console.log("No missing ids in pro_tracks.ts");
  process.exit(0);
}

function makeTitle(id) {
  const ko = koNameById.get(id) ?? `제${id}괘`;
  return ko.includes("(") ? ko.replace(/(.*)\((.*)\)/, "$2($1)") : ko;
}

function block(id) {
  const title = makeTitle(id);
  return `  {\n    id: ${id},\n    title: "${title}",\n    freePreview: {\n      classicalAnchor: "해설 준비중",\n      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",\n      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",\n    },\n    proFrame: {\n      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",\n      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",\n      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",\n    },\n    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],\n  },`;
}

const insertionPoint = proSrc.indexOf("\n];\n\nconst byId");
if (insertionPoint === -1) {
  console.error("Could not find insertion point in pro_tracks.ts");
  process.exit(1);
}

const generated = "\n" + missing.map(block).join("\n") + "\n";
const next = proSrc.slice(0, insertionPoint) + generated + proSrc.slice(insertionPoint);

fs.writeFileSync(proPath, next, "utf8");
console.log(`Added ${missing.length} missing tracks: ${missing.join(", ")}`);
