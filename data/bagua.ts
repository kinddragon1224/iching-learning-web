export type BaguaItem = {
  slug: string;
  nameKo: string;
  nameHanja: string;
  symbol: string;
  keyword: string;
  element: string;
  direction: string;
  season: string;
  freeSummary: string;
  studyPoints: string[];
  modernUse: string;
};

export const BAGUA_ITEMS: BaguaItem[] = [
  {
    slug: "geon",
    nameKo: "건",
    nameHanja: "乾",
    symbol: "☰",
    keyword: "하늘 · 창조",
    element: "천(天)",
    direction: "서북",
    season: "초겨울",
    freeSummary: "건은 시작하고 이끄는 힘이다. 다만 속도보다 기준을 먼저 세울 때 길하다.",
    studyPoints: ["주도성", "책임", "지속적 단련", "과속 경계"],
    modernUse: "새 프로젝트 시작, 리더십 발휘, 의사결정 기준 정렬",
  },
  {
    slug: "gon",
    nameKo: "곤",
    nameHanja: "坤",
    symbol: "☷",
    keyword: "땅 · 수용",
    element: "지(地)",
    direction: "남서",
    season: "늦여름",
    freeSummary: "곤은 받아주고 지탱하는 힘이다. 화려함보다 기반을 단단히 만드는 국면에 적합하다.",
    studyPoints: ["수용", "협력", "지속성", "경계 설정"],
    modernUse: "팀 운영 안정화, 루틴 정착, 관계 신뢰 축적",
  },
  {
    slug: "jin",
    nameKo: "진",
    nameHanja: "震",
    symbol: "☳",
    keyword: "우레 · 시작",
    element: "뢰(雷)",
    direction: "동",
    season: "봄 시작",
    freeSummary: "진은 충격과 각성의 힘이다. 흔들림 이후 재시동을 설계할 때 의미가 커진다.",
    studyPoints: ["재시동", "복구", "우선순위", "초기 대응"],
    modernUse: "위기 대응, 프로젝트 리부트, 실행 재정렬",
  },
  {
    slug: "son",
    nameKo: "손",
    nameHanja: "巽",
    symbol: "☴",
    keyword: "바람 · 스며듦",
    element: "풍(風)",
    direction: "동남",
    season: "늦봄",
    freeSummary: "손은 강하게 밀기보다 스며들어 변화를 만드는 힘이다. 반복 개선에 강하다.",
    studyPoints: ["미세 개선", "설득", "지속 루틴", "누적 효과"],
    modernUse: "습관 개선, 커뮤니케이션 설계, 제품 고도화",
  },
  {
    slug: "gam",
    nameKo: "감",
    nameHanja: "坎",
    symbol: "☵",
    keyword: "물 · 위험",
    element: "수(水)",
    direction: "북",
    season: "겨울",
    freeSummary: "감은 위험을 건너는 지혜다. 감정 반응보다 원칙과 루틴으로 통과해야 한다.",
    studyPoints: ["리스크 관리", "방어선", "위기 루틴", "복구"],
    modernUse: "재무 리스크 대응, 분쟁 통과, 운영 안정화",
  },
  {
    slug: "ri",
    nameKo: "리",
    nameHanja: "離",
    symbol: "☲",
    keyword: "불 · 밝음",
    element: "화(火)",
    direction: "남",
    season: "여름",
    freeSummary: "리는 밝히고 분별하는 힘이다. 기준이 선명할수록 의사결정 정확도가 올라간다.",
    studyPoints: ["명료성", "기준 설정", "표현", "통찰"],
    modernUse: "전략 수립, 지표 기반 판단, 메시지 정제",
  },
  {
    slug: "gan",
    nameKo: "간",
    nameHanja: "艮",
    symbol: "☶",
    keyword: "산 · 멈춤",
    element: "산(山)",
    direction: "북동",
    season: "환절기",
    freeSummary: "간은 멈춤과 경계의 힘이다. 과열 구간에서 정지하는 선택이 오히려 전진을 만든다.",
    studyPoints: ["정지", "경계", "과부하 관리", "내면 정렬"],
    modernUse: "번아웃 방지, 업무 범위 축소, 갈등 완화",
  },
  {
    slug: "tae",
    nameKo: "태",
    nameHanja: "兌",
    symbol: "☱",
    keyword: "연못 · 기쁨",
    element: "택(澤)",
    direction: "서",
    season: "가을",
    freeSummary: "태는 열린 소통과 기쁨의 힘이다. 분위기와 목표를 함께 잡아야 성과로 이어진다.",
    studyPoints: ["소통", "피드백", "정서 에너지", "합의"],
    modernUse: "팀 커뮤니케이션, 협업 회의, 관계 회복",
  },
];

export function getBaguaBySlug(slug: string) {
  return BAGUA_ITEMS.find((item) => item.slug === slug);
}
