import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "data/hexagram_content.json");
const hexPath = path.join(root, "data/hexagrams.ts");

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const hexSrc = fs.readFileSync(hexPath, "utf8");

const existingIds = new Set(content.map((x) => x.id));
const missing = Array.from({ length: 64 }, (_, i) => i + 1).filter((id) => !existingIds.has(id));

if (!missing.length) {
  console.log("No missing ids in hexagram_content.json");
  process.exit(0);
}

const rows = Array.from(hexSrc.matchAll(/\n\s*(\d+):\s*\{\s*ko:\s*"([^"]+)"/g));
const koById = new Map(rows.map((m) => [Number(m[1]), m[2]]));

function splitKoName(ko) {
  const m = ko.match(/^(.*)\((.*)\)$/);
  if (!m) return { shortName: ko, fullName: ko };
  return { shortName: m[1], fullName: m[2] };
}

function makeItem(id) {
  const ko = koById.get(id) ?? `제${id}괘`;
  const { shortName, fullName } = splitKoName(ko);

  return {
    id,
    name_short: shortName,
    name_full: fullName,
    trigram_pair: "미정",
    image: `/cards/${String(id).padStart(3, "0")}.png`,
    keywords: ["해석중", "정렬", "점검"],
    summary: "세부 해설 작성 전 임시 요약이다. 지금은 확장보다 기준 정렬과 리스크 점검이 우선이다.",
    axes: {
      money: "지출 확대보다 기준선 점검이 우선이다.",
      work: "핵심 실행 1개를 고정하고 범위를 줄여라.",
      relation: "단정보다 확인 질문으로 오해를 줄여라.",
      time: "일정 과밀을 줄이고 집중 블록을 먼저 확보해라."
    },
    questions: {
      money: "지금 당장 멈출 지출 1개를 정했는가?",
      work: "오늘 반드시 끝낼 핵심 과제 1개가 선명한가?",
      relation: "상대 의도를 추측하지 않고 확인했는가?",
      time: "이번 주 집중 블록을 실제 캘린더에 넣었는가?"
    },
    lines: [0, 0, 0, 0, 0, 0]
  };
}

const appended = missing.map(makeItem);
const next = [...content, ...appended].sort((a, b) => a.id - b.id);
fs.writeFileSync(contentPath, JSON.stringify(next, null, 2) + "\n", "utf8");
console.log(`Added ${appended.length} missing content items: ${missing.join(", ")}`);
