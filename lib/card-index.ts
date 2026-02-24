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
  const fallbackQuestions: AxisMap = {
    money: "현금흐름을 불안하게 만드는 작은 누수 1개를 찾았나?",
    work: "지금 해야 할 핵심 행동 1개가 문장으로 명확한가?",
    relation: "협업을 어렵게 만든 오해를 풀기 위한 확인 질문을 했는가?",
    time: "이번 주 회복/집중 시간 블록을 캘린더에 실제로 넣었는가?",
  };

  return {
    id,
    summary: seed?.summary ?? fallbackSummary,
    axes: seed?.axes ?? {},
    questions: {
      money: seed?.questions?.money ?? fallbackQuestions.money,
      work: seed?.questions?.work ?? fallbackQuestions.work,
      relation: seed?.questions?.relation ?? fallbackQuestions.relation,
      time: seed?.questions?.time ?? fallbackQuestions.time,
    },
  };
}

export function toPublicAsset(src: string) {
  if (process.env.NODE_ENV === "production") return `/iching-learning-web${src}`;
  return src;
}
