import cardIndex from "@/data/card_index.json";
import hexagramContent from "@/data/hexagram_content.json";
import { findHexagram } from "@/data/hexagrams";

type AxisMap = Partial<Record<"money" | "work" | "relation" | "time", string>>;

type CardSeed = {
  id: number;
  short_name?: string;
  full_name?: string;
  trigram_pair?: string;
  one_liner?: string;
  keywords?: string[];
  card_image?: string;
};

type ContentSeed = {
  id: number;
  name_short?: string;
  name_full?: string;
  trigram_pair?: string;
  image?: string;
  keywords?: string[];
  summary?: string;
  axes?: AxisMap;
  questions?: AxisMap;
  lines?: number[];
};

export type HexagramCard = {
  id: number;
  short_name: string;
  full_name?: string;
  trigram_pair?: string;
  one_liner: string;
  keywords: string[];
  card_image: string;
};

export type HexagramContent = {
  id: number;
  summary: string;
  axes: AxisMap;
  questions: AxisMap;
  lines: number[];
  lineTexts: string[];
};

const byId = new Map<number, CardSeed>((cardIndex as CardSeed[]).map((c) => [c.id, c]));
const contentById = new Map<number, ContentSeed>((hexagramContent as ContentSeed[]).map((c) => [c.id, c]));

function firstSentence(text: string) {
  const t = text?.trim() ?? "";
  if (!t) return "핵심 요약 준비 중";
  const split = t.split(/[.!?。]/)[0]?.trim();
  return split || t;
}

export function getCardForHexagram(id: number): HexagramCard {
  const base = findHexagram(id);
  const seed = byId.get(id);
  const content = contentById.get(id);

  const summary = content?.summary ?? base?.summary ?? "핵심 요약 준비 중";

  return {
    id,
    short_name: seed?.short_name ?? content?.name_short ?? base?.nameKo ?? `제${id}괘`,
    full_name: seed?.full_name ?? content?.name_full,
    trigram_pair: seed?.trigram_pair ?? content?.trigram_pair,
    one_liner: seed?.one_liner ?? firstSentence(summary),
    keywords: seed?.keywords ?? content?.keywords ?? base?.keywords ?? ["학습", "해석"],
    card_image: seed?.card_image ?? content?.image ?? "/cards/placeholder.png",
  };
}

export function getHexagramContent(id: number): HexagramContent {
  const base = findHexagram(id);
  const seed = contentById.get(id);

  const fallbackSummary = base?.summary ?? "핵심 요약 준비 중";
  const fallbackAxes: AxisMap = {
    money: "돈의 흐름은 확장보다 구조를 먼저 점검하는 게 안전해.",
    work: "일은 범위를 줄이고 핵심 실행 1개를 선명하게 잡아.",
    relation: "관계는 단정 대신 확인 질문으로 오해를 줄여.",
    time: "시간은 밀어붙이기보다 우선순위 블록을 먼저 확보해.",
  };
  const fallbackQuestions: AxisMap = {
    money: "현금흐름을 불안하게 만드는 작은 누수 1개를 찾았나?",
    work: "지금 해야 할 핵심 행동 1개가 문장으로 명확한가?",
    relation: "협업을 어렵게 만든 오해를 풀기 위한 확인 질문을 했는가?",
    time: "이번 주 회복/집중 시간 블록을 캘린더에 실제로 넣었는가?",
  };
  const fallbackLineTexts =
    base?.lines ?? [
      "초효: 시작점의 기초를 점검한다.",
      "이효: 관계와 역할의 균형을 확인한다.",
      "삼효: 과속보다 리스크 관리를 우선한다.",
      "사효: 전환 구간에서는 작은 실험으로 검증한다.",
      "오효: 핵심 원칙을 지키며 실행 강도를 높인다.",
      "상효: 마무리와 다음 단계 연결을 준비한다.",
    ];

  return {
    id,
    summary: seed?.summary ?? fallbackSummary,
    axes: {
      money: seed?.axes?.money ?? fallbackAxes.money,
      work: seed?.axes?.work ?? fallbackAxes.work,
      relation: seed?.axes?.relation ?? fallbackAxes.relation,
      time: seed?.axes?.time ?? fallbackAxes.time,
    },
    questions: {
      money: seed?.questions?.money ?? fallbackQuestions.money,
      work: seed?.questions?.work ?? fallbackQuestions.work,
      relation: seed?.questions?.relation ?? fallbackQuestions.relation,
      time: seed?.questions?.time ?? fallbackQuestions.time,
    },
    lines: seed?.lines ?? [0, 0, 0, 0, 0, 0],
    lineTexts: fallbackLineTexts,
  };
}

export function toPublicAsset(src: string) {
  if (process.env.NODE_ENV === "production") return `/iching-learning-web${src}`;
  return src;
}
