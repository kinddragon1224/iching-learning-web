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
  {
    id: 17,
    title: "澤雷隨(택뢰수)",
    freePreview: {
      classicalAnchor: "隨 元亨利貞",
      plainMeaning: "따름의 도를 바르게 지키면 형통하다.",
      modernTeaser: "무작정 추종보다 기준 있는 협력이 핵심이다.",
    },
    proFrame: {
      diagnosis: "변화 속에서 방향 합의가 필요한 정렬 구간.",
      coachingQuestion: "나는 흐름을 따르되 기준을 지키고 있는가?",
      actionStep: "이번 주 협업 기준 1개를 정하고 모두에게 공유한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 18,
    title: "山風蠱(산풍고)",
    freePreview: {
      classicalAnchor: "蠱 元亨",
      plainMeaning: "무너진 것을 바로잡으면 형통하다.",
      modernTeaser: "문제를 덮기보다 구조를 수리하는 때다.",
    },
    proFrame: {
      diagnosis: "누적된 운영 부채가 성과를 잠식하는 상태.",
      coachingQuestion: "지금 가장 먼저 고쳐야 할 시스템 결함은 무엇인가?",
      actionStep: "핵심 결함 1개를 선정해 원인-대응-재발방지로 정리한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 19,
    title: "地澤臨(지택림)",
    freePreview: {
      classicalAnchor: "臨 元亨利貞",
      plainMeaning: "다가가 돌보는 리더십이 길하다.",
      modernTeaser: "확장기일수록 현장과의 접점을 늘려야 한다.",
    },
    proFrame: {
      diagnosis: "성장 초기의 관리 폭증 구간.",
      coachingQuestion: "리더의 관여가 통제인가 지원인가?",
      actionStep: "현장 점검 루틴을 주 1회 고정하고 피드백을 문서화한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 20,
    title: "風地觀(풍지관)",
    freePreview: {
      classicalAnchor: "觀 盥而不薦",
      plainMeaning: "겉치레보다 내실을 살피는 관찰이 중요하다.",
      modernTeaser: "속도보다 관찰과 판단의 질을 올리는 구간이다.",
    },
    proFrame: {
      diagnosis: "판단 자료는 있으나 시야 정리가 부족한 상태.",
      coachingQuestion: "지금 내가 못 보고 있는 관점은 무엇인가?",
      actionStep: "결정 전 관점 3개(고객/팀/재무)로 재점검한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 21,
    title: "火雷噬嗑(화뢰서합)",
    freePreview: {
      classicalAnchor: "噬嗑 亨 利用獄",
      plainMeaning: "막힌 것을 깨물어 해결하면 형통하다.",
      modernTeaser: "미루던 문제를 정확히 처리해야 흐름이 열린다.",
    },
    proFrame: {
      diagnosis: "핵심 장애물이 방치되어 전체 진행을 막는 상태.",
      coachingQuestion: "지금 반드시 처리해야 할 병목은 무엇인가?",
      actionStep: "병목 1개를 오늘 해결하고 영향도를 기록한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 22,
    title: "山火賁(산화비)",
    freePreview: {
      classicalAnchor: "賁 亨",
      plainMeaning: "아름다움은 본질을 살릴 때 의미가 있다.",
      modernTeaser: "디자인은 장식이 아니라 전달력을 높이는 도구다.",
    },
    proFrame: {
      diagnosis: "표현 강화 필요 구간이나 본질 희석 리스크 존재.",
      coachingQuestion: "우리는 보기 좋음보다 이해됨을 만들고 있는가?",
      actionStep: "핵심 메시지 1문장을 먼저 고정한 뒤 시각 요소를 정렬한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 23,
    title: "山地剝(산지박)",
    freePreview: {
      classicalAnchor: "剝 不利有攸往",
      plainMeaning: "깎여 나가는 때엔 무리한 전진이 불리하다.",
      modernTeaser: "지금은 축소·정리·보존이 우선이다.",
    },
    proFrame: {
      diagnosis: "기반 약화로 확장 시 손실이 커질 위험 구간.",
      coachingQuestion: "무엇을 지키고 무엇을 버릴지 정했는가?",
      actionStep: "중단할 것 1개와 유지할 핵심 1개를 명확히 분리한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 24,
    title: "地雷復(지뢰복)",
    freePreview: {
      classicalAnchor: "復 亨",
      plainMeaning: "되돌아옴의 길은 회복과 재시작을 뜻한다.",
      modernTeaser: "작은 복귀 루틴이 큰 반전을 만든다.",
    },
    proFrame: {
      diagnosis: "리듬 이탈 후 재정렬이 필요한 회복 국면.",
      coachingQuestion: "다시 시작하기 위한 최소 행동은 무엇인가?",
      actionStep: "하루 1개 복귀 루틴을 7일 연속 실행한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 25,
    title: "天雷无妄(천뢰무망)",
    freePreview: {
      classicalAnchor: "无妄 元亨利貞",
      plainMeaning: "꾸밈없이 바르면 형통하다.",
      modernTeaser: "요령보다 정직한 실행이 리스크를 줄인다.",
    },
    proFrame: {
      diagnosis: "성과 압박으로 무리수가 나오기 쉬운 구간.",
      coachingQuestion: "지금 선택은 정직한가, 조급한가?",
      actionStep: "근거 없는 가정 1개를 제거하고 사실 기반으로 재결정한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 26,
    title: "山天大畜(산천대축)",
    freePreview: {
      classicalAnchor: "大畜 利貞",
      plainMeaning: "크게 쌓아 두는 인내가 이롭다.",
      modernTeaser: "지금의 억제는 더 큰 도약을 위한 축적이다.",
    },
    proFrame: {
      diagnosis: "확장 전 자원 축적이 필요한 준비 단계.",
      coachingQuestion: "무엇을 더 쌓아야 다음 레벨로 갈 수 있는가?",
      actionStep: "핵심 자산(기술/콘텐츠/현금) 중 1개를 집중 축적한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 27,
    title: "山雷頤(산뢰이)",
    freePreview: {
      classicalAnchor: "頤 貞吉",
      plainMeaning: "기름의 도를 바르게 지키면 길하다.",
      modernTeaser: "무엇을 먹고(정보/관계) 무엇을 말하는지가 삶을 만든다.",
    },
    proFrame: {
      diagnosis: "입력 품질 저하로 판단/에너지 효율이 떨어진 상태.",
      coachingQuestion: "내가 매일 섭취하는 정보는 나를 살리는가?",
      actionStep: "정보 식단을 정리해 유해 입력 1개를 제거한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 28,
    title: "澤風大過(택풍대과)",
    freePreview: {
      classicalAnchor: "大過 棟橈",
      plainMeaning: "지나침의 때엔 구조 보강이 먼저다.",
      modernTeaser: "버티는 힘이 한계에 왔으면 설계를 바꿔야 한다.",
    },
    proFrame: {
      diagnosis: "부하 과중으로 시스템 붕괴 위험이 높은 상태.",
      coachingQuestion: "지금 구조에서 가장 먼저 무너질 지점은 어디인가?",
      actionStep: "업무 하중을 재배분하고 중단 항목 1개를 즉시 실행한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 31,
    title: "澤山咸(택산함)",
    freePreview: {
      classicalAnchor: "咸 亨",
      plainMeaning: "감응이 통하면 형통하다.",
      modernTeaser: "영향은 강요보다 진정성 있는 공명에서 나온다.",
    },
    proFrame: {
      diagnosis: "관계 에너지는 높지만 경계 설정이 필요한 상태.",
      coachingQuestion: "이 감응이 단기 감정인가, 장기 정렬인가?",
      actionStep: "기대치와 경계를 동시에 명문화해 감정 소모를 줄인다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 32,
    title: "雷風恒(뇌풍항)",
    freePreview: {
      classicalAnchor: "恒 亨 无咎",
      plainMeaning: "지속의 도를 지키면 허물이 없다.",
      modernTeaser: "지속은 의지보다 구조에서 나온다.",
    },
    proFrame: {
      diagnosis: "루틴은 있으나 유지 장치가 약한 상태.",
      coachingQuestion: "지속을 방해하는 반복 패턴은 무엇인가?",
      actionStep: "주간 유지 점검표를 만들고 이탈 시 복귀 규칙을 고정한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 33,
    title: "天山遯(천산둔)",
    freePreview: {
      classicalAnchor: "遯 亨",
      plainMeaning: "물러남의 지혜가 형통을 지킨다.",
      modernTeaser: "후퇴는 패배가 아니라 재배치를 위한 선택이다.",
    },
    proFrame: {
      diagnosis: "정면 돌파 비용이 과도한 국면.",
      coachingQuestion: "지금 물러나야 할 전선은 어디인가?",
      actionStep: "우선순위가 낮은 전투 1개를 종료하고 핵심에 집중한다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 34,
    title: "大壯(대장)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 35,
    title: "晉(진)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 36,
    title: "明夷(명이)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 37,
    title: "家人(가인)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 38,
    title: "睽(규)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 39,
    title: "蹇(건)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 40,
    title: "解(해)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 41,
    title: "損(손)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 42,
    title: "益(익)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 43,
    title: "夬(쾌)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 44,
    title: "姤(구)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 45,
    title: "萃(췌)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 46,
    title: "升(승)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 47,
    title: "困(곤)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 48,
    title: "井(정)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 49,
    title: "革(혁)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 50,
    title: "鼎(정)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 53,
    title: "漸(점)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 55,
    title: "豐(풍)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 56,
    title: "旅(려)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 59,
    title: "渙(환)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 60,
    title: "節(절)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 61,
    title: "中孚(중부)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },
  {
    id: 62,
    title: "小過(소과)",
    freePreview: {
      classicalAnchor: "해설 준비중",
      plainMeaning: "핵심 의미를 정리 중이다. 우선 기본 원칙 중심으로 해석하자.",
      modernTeaser: "지금은 과속보다 기준 정렬이 우선이다.",
    },
    proFrame: {
      diagnosis: "세부 해설 작성 전의 임시 진단 상태.",
      coachingQuestion: "이 괘를 지금 상황에 적용할 때 가장 먼저 조정할 1가지는 무엇인가?",
      actionStep: "오늘 실행 1개를 정하고, 결과를 기록해 다음 해석의 근거로 쓴다.",
    },
    linesKorean: ["초효", "이효", "삼효", "사효", "오효", "상효"],
  },

];

const byId = new Map<number, HexagramTrack>(HEXAGRAM_TRACKS.map((t) => [t.id, t]));

export function getHexagramTrack(id: number) {
  return byId.get(id);
}
