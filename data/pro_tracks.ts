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
  {
    id: 3,
    title: "水雷屯(수뢰둔)",
    freePreview: {
      classicalAnchor: "屯 元亨利貞 勿用有攸往",
      plainMeaning: "시작은 길하나 혼란기엔 무리한 전진을 삼가야 한다.",
      modernTeaser: "초기 혼란은 정상이다. 확장보다 정렬이 먼저다.",
    },
    proFrame: {
      diagnosis: "초기 단계 변수 과다로 의사결정 피로가 높은 상태.",
      coachingQuestion: "지금 반드시 해결할 변수 1개가 선명한가?",
      actionStep: "이번 주 우선순위 1개만 고정하고 나머지는 보류 리스트로 분리한다.",
    },
    linesKorean: ["초구", "육이", "육삼", "육사", "구오", "상육"],
  },
  {
    id: 4,
    title: "山水蒙(산수몽)",
    freePreview: {
      classicalAnchor: "蒙 亨 匪我求童蒙 童蒙求我",
      plainMeaning: "배움의 때에는 묻고 익히는 자세가 형통을 만든다.",
      modernTeaser: "모를수록 체면보다 질문의 질이 중요하다.",
    },
    proFrame: {
      diagnosis: "지식 격차로 실행 지연이 발생하는 학습 병목 구간.",
      coachingQuestion: "지금 막힌 지점을 한 문장 질문으로 만들었는가?",
      actionStep: "핵심 질문 3개를 정리해 멘토/자료로 즉시 검증한다.",
    },
    linesKorean: ["초육", "구이", "육삼", "육사", "육오", "상구"],
  },
  {
    id: 5,
    title: "水天需(수천수)",
    freePreview: {
      classicalAnchor: "需 有孚 光亨 貞吉",
      plainMeaning: "기다림 속 신뢰를 지키면 결국 길하다.",
      modernTeaser: "조급한 실행보다 준비 밀도가 성패를 가른다.",
    },
    proFrame: {
      diagnosis: "타이밍 미성숙 구간으로 성급한 결정 시 손실 위험이 큼.",
      coachingQuestion: "지금 전진을 막는 핵심 조건은 무엇인가?",
      actionStep: "실행 전 충족해야 할 조건 3개를 정의하고 체크한다.",
    },
    linesKorean: ["초구", "구이", "구삼", "육사", "구오", "상육"],
  },
  {
    id: 6,
    title: "天水訟(천수송)",
    freePreview: {
      classicalAnchor: "訟 有孚 窒 惕",
      plainMeaning: "다툼의 때엔 신중히 경계하고 바름을 지켜야 한다.",
      modernTeaser: "감정 승부가 아니라 사실·기준·문서가 해법이다.",
    },
    proFrame: {
      diagnosis: "책임/권한 충돌이 누적된 분쟁 국면.",
      coachingQuestion: "우리는 의견이 아니라 기준을 합의했는가?",
      actionStep: "쟁점별로 사실·해석·결정안을 분리해 문서로 합의한다.",
    },
    linesKorean: ["초육", "구이", "육삼", "구사", "구오", "상구"],
  },
  {
    id: 7,
    title: "地水師(지수사)",
    freePreview: {
      classicalAnchor: "師 貞 丈人 吉",
      plainMeaning: "조직은 바른 규율과 성숙한 리더십이 길하다.",
      modernTeaser: "의욕보다 구조와 규칙이 실행력을 만든다.",
    },
    proFrame: {
      diagnosis: "팀 에너지는 있으나 역할·보고 체계 미정렬 상태.",
      coachingQuestion: "누가 무엇을 언제 책임지는지 명확한가?",
      actionStep: "역할표(R&R)와 보고 주기를 1페이지로 고정해 공유한다.",
    },
    linesKorean: ["초육", "구이", "육삼", "육사", "육오", "상육"],
  },
  {
    id: 8,
    title: "水地比(수지비)",
    freePreview: {
      classicalAnchor: "比 吉 原筮 元永貞",
      plainMeaning: "함께함은 길하나 바른 기준으로 모여야 한다.",
      modernTeaser: "누구와 붙을지보다 어떤 기준으로 붙을지가 핵심이다.",
    },
    proFrame: {
      diagnosis: "연결 수요는 높지만 경계·기대치 불명확으로 마찰 위험 존재.",
      coachingQuestion: "이 관계의 기대치와 경계를 서로 확인했는가?",
      actionStep: "협업 시작 전 기대치·역할·정산 규칙을 먼저 합의한다.",
    },
    linesKorean: ["초육", "육이", "육삼", "육사", "구오", "상육"],
  },
  {
    id: 13,
    title: "天火同人(천화동인)",
    freePreview: {
      classicalAnchor: "同人 于野 亨",
      plainMeaning: "뜻을 함께하면 형통하다.",
      modernTeaser: "개인 성과보다 공통 목표 정렬이 먼저다.",
    },
    proFrame: {
      diagnosis: "협업 잠재력은 높지만 목표 정의가 분산된 상태.",
      coachingQuestion: "팀이 같은 목표 문장을 말할 수 있는가?",
      actionStep: "공통 목표 1문장 + 금지사항 3개를 합의해 게시한다.",
    },
    linesKorean: ["초구", "육이", "구삼", "구사", "구오", "상구"],
  },
  {
    id: 14,
    title: "火天大有(화천대유)",
    freePreview: {
      classicalAnchor: "大有 元亨",
      plainMeaning: "크게 소유한 때는 책임 있게 운용해야 형통하다.",
      modernTeaser: "성장기일수록 관리 체계를 먼저 세워야 오래 간다.",
    },
    proFrame: {
      diagnosis: "성과 확대 구간으로 운영 부채 누적 위험이 존재.",
      coachingQuestion: "확장 속도에 맞는 관리 체계를 갖췄는가?",
      actionStep: "성과 사용 원칙(저축·재투자·운영비)을 비율로 고정한다.",
    },
    linesKorean: ["초구", "구이", "구삼", "구사", "육오", "상구"],
  },
  {
    id: 15,
    title: "地山謙(지산겸)",
    freePreview: {
      classicalAnchor: "謙 亨 君子有終",
      plainMeaning: "겸손은 형통하며 끝을 좋게 만든다.",
      modernTeaser: "과시를 줄이고 균형을 맞출수록 길이 열린다.",
    },
    proFrame: {
      diagnosis: "성과 편차로 관계 피로가 생기기 쉬운 구간.",
      coachingQuestion: "내 기여를 증명하려다 균형을 깨고 있지 않은가?",
      actionStep: "이번 주 과시성 행동 1개를 줄이고 협업성 행동 1개를 늘린다.",
    },
    linesKorean: ["초육", "육이", "구삼", "육사", "육오", "상육"],
  },
  {
    id: 16,
    title: "雷地豫(뇌지예)",
    freePreview: {
      classicalAnchor: "豫 利建侯行師",
      plainMeaning: "기세가 오를 때 준비된 움직임이 이롭다.",
      modernTeaser: "동기부여만으론 부족하다. 준비된 시동이 필요하다.",
    },
    proFrame: {
      diagnosis: "의욕은 높으나 실행 체크포인트 부재로 이탈 위험 존재.",
      coachingQuestion: "시작 전 중간 점검과 마감 기준이 정해졌는가?",
      actionStep: "시작-중간-마감 3지점 점검 캘린더를 먼저 설정한다.",
    },
    linesKorean: ["초육", "육이", "육삼", "구사", "육오", "상육"],
  },
  {
    id: 51,
    title: "震爲雷(중뢰진)",
    freePreview: {
      classicalAnchor: "震 亨 震來虩虩",
      plainMeaning: "충격 속에서도 중심을 잡으면 형통하다.",
      modernTeaser: "위기는 공포보다 복구 순서가 먼저다.",
    },
    proFrame: {
      diagnosis: "예상 밖 충격으로 판단·소통 혼선이 큰 상태.",
      coachingQuestion: "지금 가장 먼저 복구해야 할 핵심은 무엇인가?",
      actionStep: "24시간 복구 우선순위 1~3을 정해 즉시 실행한다.",
    },
    linesKorean: ["초구", "육이", "육삼", "구사", "육오", "상육"],
  },
  {
    id: 52,
    title: "艮爲山(중산간)",
    freePreview: {
      classicalAnchor: "艮 其背 不獲其身",
      plainMeaning: "멈춰야 할 때 멈추면 허물을 줄인다.",
      modernTeaser: "과열 구간에선 정지가 전략이다.",
    },
    proFrame: {
      diagnosis: "업무/감정 과열로 판단 정확도가 떨어진 상태.",
      coachingQuestion: "지금 멈추지 않으면 무엇이 무너지는가?",
      actionStep: "신규 일 추가를 중단하고 진행 중 1건 마무리에 집중한다.",
    },
    linesKorean: ["초육", "육이", "구삼", "육사", "육오", "상구"],
  },
  {
    id: 57,
    title: "巽爲風(중풍손)",
    freePreview: {
      classicalAnchor: "巽 小亨 利有攸往",
      plainMeaning: "작게 스며들어도 방향이 맞으면 형통하다.",
      modernTeaser: "강한 한 번보다 작은 반복이 구조를 바꾼다.",
    },
    proFrame: {
      diagnosis: "큰 전환보다 미세 개선 누적이 적합한 상태.",
      coachingQuestion: "오늘의 1% 개선 포인트는 무엇인가?",
      actionStep: "매일 15분 개선 루틴을 고정하고 주간 누적을 점검한다.",
    },
    linesKorean: ["초육", "구이", "구삼", "육사", "구오", "상구"],
  },
  {
    id: 58,
    title: "兌爲澤(중택태)",
    freePreview: {
      classicalAnchor: "兌 亨 利貞",
      plainMeaning: "기쁨의 소통이 형통을 만들되 바름이 필요하다.",
      modernTeaser: "분위기와 목표를 함께 잡아야 교류가 성과가 된다.",
    },
    proFrame: {
      diagnosis: "대화량은 충분하나 실행 연결이 약해 공회전 위험 존재.",
      coachingQuestion: "좋은 대화를 실행으로 연결했는가?",
      actionStep: "회의마다 액션 아이템 1개와 담당/기한을 즉시 확정한다.",
    },
    linesKorean: ["초구", "구이", "육삼", "구사", "구오", "상육"],
  },
];

const byId = new Map<number, HexagramTrack>(HEXAGRAM_TRACKS.map((t) => [t.id, t]));

export function getHexagramTrack(id: number) {
  return byId.get(id);
}
