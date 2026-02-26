export type AxisKey = "money" | "work" | "relation" | "time";

export type HexagramTrack = {
  id: number;
  title: string;
  freePreview: {
    classicalAnchor: string;
    plainMeaning: string;
    modernTeaser: string;
  };
  proFrame: {
    diagnosis: string;
    coachingQuestion: string;
    actionStep: string;
  };
  linesKorean: string[];
};

export const HEXAGRAM_TRACKS: HexagramTrack[] = [
  {
    id: 1,
    title: "乾(건)",
    freePreview: {
      classicalAnchor: "元亨利貞",
      plainMeaning: "크게 시작하고 형통하되 바름을 지킬 때 이롭다.",
      modernTeaser: "밀어붙일수록 기준이 먼저다. 속도보다 방향을 고정해라.",
    },
    proFrame: {
      diagnosis: "추진력은 충분하지만 과속/독주 리스크가 동반되는 구간.",
      coachingQuestion: "지금 내 추진은 비전 기반인가, 불안 회피인가?",
      actionStep: "핵심 목표 1개 + 품질 기준 3개를 오늘 문서로 고정한다.",
    },
    linesKorean: ["초구", "구이", "구삼", "구사", "구오", "상구"],
  },
  {
    id: 2,
    title: "坤(곤)",
    freePreview: {
      classicalAnchor: "元亨 利牝馬之貞",
      plainMeaning: "크게 형통하니 유순하고 지속적인 바름이 이롭다.",
      modernTeaser: "앞장서기보다 받쳐주는 힘이 판을 안정시킨다.",
    },
    proFrame: {
      diagnosis: "지지/협력은 강하나 자기 경계가 약해질 수 있는 구간.",
      coachingQuestion: "나는 지금 통제하려는가, 연결하려는가?",
      actionStep: "오늘의 지지 행동 1개(경청/정리/요약)를 실행하고 기록한다.",
    },
    linesKorean: ["초육", "육이", "육삼", "육사", "육오", "상육"],
  },
  {
    id: 54,
    title: "雷澤歸妹(뇌택귀매)",
    freePreview: {
      classicalAnchor: "歸妹 征凶 无攸利",
      plainMeaning: "성급한 결합은 흉하니 이로울 바가 없다.",
      modernTeaser: "결합 자체보다 순서·권한·명분의 정렬이 먼저다.",
    },
    proFrame: {
      diagnosis: "관계/계약/협업의 비대칭이 커서 장기 리스크가 잠재된 구간.",
      coachingQuestion: "지금 합의는 감정 기반인가, 구조 기반인가?",
      actionStep: "확정 전 3조건(역할/의사결정권/종료조건)을 문서로 맞춘다.",
    },
    linesKorean: ["초구", "구이", "육삼", "구사", "육오", "상육"],
  },
];

const byId = new Map<number, HexagramTrack>(HEXAGRAM_TRACKS.map((t) => [t.id, t]));

export function getHexagramTrack(id: number) {
  return byId.get(id);
}
