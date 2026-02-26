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
  {
    id: 9,
    title: "風天小畜(풍천소축)",
    freePreview: {
      classicalAnchor: "小畜 亨",
      plainMeaning: "작게 모으며 형통을 만든다.",
      modernTeaser: "한 번의 큰 승부보다 작은 축적이 판을 바꾼다.",
    },
    proFrame: {
      diagnosis: "확장 욕구는 큰데 기반 에너지와 자원이 아직 제한적이다.",
      coachingQuestion: "지금 키울 것과 멈출 것을 분리했는가?",
      actionStep: "이번 주 작은 승리 3개를 정의하고 체크리스트로 관리한다.",
    },
    linesKorean: ["초구", "구이", "구삼", "육사", "구오", "상구"],
  },
  {
    id: 10,
    title: "天澤履(천택리)",
    freePreview: {
      classicalAnchor: "履虎尾 不咥人 亨",
      plainMeaning: "위태로운 자리라도 질서를 지키면 형통하다.",
      modernTeaser: "실력보다 태도와 절차가 리스크를 줄인다.",
    },
    proFrame: {
      diagnosis: "민감한 이해관계 구간으로, 표현/절차 실수의 비용이 크다.",
      coachingQuestion: "지금 나는 맞는 말보다 맞는 방식으로 말하고 있는가?",
      actionStep: "결정 전 체크리스트 3개(근거·영향·순서)를 반드시 점검한다.",
    },
    linesKorean: ["초구", "구이", "육삼", "구사", "구오", "상구"],
  },
  {
    id: 11,
    title: "地天泰(지천태)",
    freePreview: {
      classicalAnchor: "泰 小往大來 吉亨",
      plainMeaning: "작은 것이 물러나고 큰 것이 와서 길하고 형통하다.",
      modernTeaser: "흐름이 좋을 때일수록 구조를 고정해야 오래 간다.",
    },
    proFrame: {
      diagnosis: "확장 가능성이 높지만 느슨해지면 반전 리스크가 생긴다.",
      coachingQuestion: "좋은 흐름을 시스템으로 고정했는가?",
      actionStep: "성과 루틴 1개를 표준화하고 팀 공유 규칙으로 문서화한다.",
    },
    linesKorean: ["초구", "구이", "구삼", "육사", "육오", "상육"],
  },
  {
    id: 12,
    title: "天地否(천지비)",
    freePreview: {
      classicalAnchor: "否之匪人 不利君子貞 大往小來",
      plainMeaning: "막힘의 때에는 바름을 지키고 무리한 확장을 피해야 한다.",
      modernTeaser: "지금은 전진보다 내부 정비가 우선이다.",
    },
    proFrame: {
      diagnosis: "소통 단절과 구조 피로가 누적되어 성과가 막히는 구간.",
      coachingQuestion: "어디서 흐름이 막히는지 수치로 확인했는가?",
      actionStep: "낭비되는 프로세스 1개를 제거하고 주간 복구 루틴을 만든다.",
    },
    linesKorean: ["초육", "육이", "육삼", "구사", "구오", "상구"],
  },
  {
    id: 29,
    title: "坎爲水(중수감)",
    freePreview: {
      classicalAnchor: "習坎 有孚 維心亨 行有尚",
      plainMeaning: "위험의 반복 속에서도 중심을 지키면 통과한다.",
      modernTeaser: "위기 구간은 감정이 아니라 원칙으로 건너간다.",
    },
    proFrame: {
      diagnosis: "반복 리스크 국면으로 즉흥 대응이 손실을 키우는 상태.",
      coachingQuestion: "내 위기 대응은 감정 반응인가, 프로토콜인가?",
      actionStep: "비상 대응 3단계(탐지-차단-복구)를 문서화하고 리허설한다.",
    },
    linesKorean: ["초육", "구이", "육삼", "육사", "구오", "상육"],
  },
  {
    id: 30,
    title: "離爲火(중화리)",
    freePreview: {
      classicalAnchor: "離 利貞 亨",
      plainMeaning: "밝게 비추고 바름을 지키면 형통하다.",
      modernTeaser: "판단의 정확도는 정보량이 아니라 기준의 선명도에서 온다.",
    },
    proFrame: {
      diagnosis: "의사결정 재료는 충분하지만 기준 불명확으로 흔들리는 상태.",
      coachingQuestion: "나는 무엇을 기준으로 yes/no를 결정하는가?",
      actionStep: "핵심 지표 2개를 고정하고 모든 결정을 그 기준으로 필터링한다.",
    },
    linesKorean: ["초구", "육이", "구삼", "구사", "육오", "상구"],
  },
  {
    id: 63,
    title: "水火既濟(수화기제)",
    freePreview: {
      classicalAnchor: "既濟 亨 小利貞",
      plainMeaning: "일단 이루었으나 유지와 점검이 더 중요하다.",
      modernTeaser: "완료는 끝이 아니라 운영의 시작이다.",
    },
    proFrame: {
      diagnosis: "성과 직후 안정화 미흡으로 재발 리스크가 잠복한 구간.",
      coachingQuestion: "완료 이후 유지 프로세스를 설계했는가?",
      actionStep: "사후 점검 체크리스트를 만들고 1주 후 리뷰를 예약한다.",
    },
    linesKorean: ["초구", "육이", "구삼", "육사", "구오", "상육"],
  },
  {
    id: 64,
    title: "火水未濟(화수미제)",
    freePreview: {
      classicalAnchor: "未濟 亨 小狐汔濟 濡其尾 无攸利",
      plainMeaning: "거의 다 왔어도 마지막 방심이 화를 부른다.",
      modernTeaser: "마무리 직전일수록 범위 고정과 검증이 우선이다.",
    },
    proFrame: {
      diagnosis: "완료 임계점에서 집중 저하와 범위 확대로 실패 위험이 높은 상태.",
      coachingQuestion: "지금 추가하려는 일이 완료를 지연시키지 않는가?",
      actionStep: "오늘은 마감 항목만 처리하고 신규 요구는 다음 스프린트로 분리한다.",
    },
    linesKorean: ["초육", "구이", "육삼", "구사", "육오", "상구"],
  },
];

const byId = new Map<number, HexagramTrack>(HEXAGRAM_TRACKS.map((t) => [t.id, t]));

export function getHexagramTrack(id: number) {
  return byId.get(id);
}
