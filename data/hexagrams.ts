export type Hexagram = {
  id: number;
  nameKo: string;
  nameEn: string;
  summary: string;
  keywords: string[];
  lines: string[];
};

const base: Record<number, Partial<Hexagram>> = {
  1: {
    nameKo: "건(乾)",
    nameEn: "The Creative",
    summary:
      "중천건은 순수한 창조 에너지가 여섯 효를 관통하는 괘다. 핵심은 강함의 과시가 아니라 때를 따라 자신을 단련하는 지속성과 책임의 품격에 있다.",
    keywords: ["창조", "주도", "자강불식", "책임", "절제", "분별"],
    lines: [
      "초구: 잠룡. 잠재를 키우는 시간, 성급한 과시를 멈춘다.",
      "구이: 현룡재전. 실력을 드러내되 관계 속에서 바르게 쓴다.",
      "구삼: 군자종일건건. 바쁠수록 자기점검, 과열을 경계한다.",
      "구사: 혹약재연. 도약 직전, 무리하지 말고 타이밍을 본다.",
      "구오: 비룡재천. 영향력이 커지는 자리, 책임 윤리가 핵심이다.",
      "상구: 항룡유회. 극점의 교만을 경계하고 균형을 회복한다.",
    ],
  },
  2: {
    nameKo: "곤(坤)",
    nameEn: "The Receptive",
    summary: "수용, 협력, 지지의 힘. 기반을 탄탄히 다진다.",
    keywords: ["수용", "협력", "안정", "기반"],
    lines: [
      "초육: 서리를 밟으면 얼음이 온다. 작은 징후를 본다.",
      "육이: 직방대. 바르고 넓게 품는 태도.",
      "육삼: 함장가정. 실력은 감추고 때를 기다린다.",
      "육사: 괄낭무구. 신중한 침묵이 유리할 때.",
      "육오: 황상원길. 겸손한 중심이 길하다.",
      "상육: 용전우야. 충돌을 피하고 조율하라.",
    ],
  },
  11: {
    nameKo: "태(泰)",
    nameEn: "Peace",
    summary: "순환이 통하고 협업이 잘 되는 시기. 균형 유지가 핵심.",
    keywords: ["화합", "순환", "안정", "협업"],
  },
  12: {
    nameKo: "비(否)",
    nameEn: "Stagnation",
    summary: "소통 단절과 정체의 국면. 내부 정비가 우선.",
    keywords: ["정체", "단절", "재정비", "점검"],
  },
  29: {
    nameKo: "감(坎)",
    nameEn: "The Abysmal",
    summary: "위험의 반복 국면. 원칙과 루틴으로 통과한다.",
    keywords: ["위험", "루틴", "절제", "안전"],
  },
  30: {
    nameKo: "리(離)",
    nameEn: "The Clinging",
    summary: "명료함과 인식의 강화. 근거 기반 판단이 중요.",
    keywords: ["명료", "통찰", "근거", "표현"],
  },
  63: {
    nameKo: "기제(既濟)",
    nameEn: "After Completion",
    summary: "완료 직후 관리 단계. 유지보수와 점검이 필요.",
    keywords: ["완료", "점검", "유지", "안정화"],
  },
  64: {
    nameKo: "미제(未濟)",
    nameEn: "Before Completion",
    summary: "마지막 단계의 불확실성. 검증 후 전진.",
    keywords: ["검증", "전환", "미완", "준비"],
  },
};

const fallbackLines = [
  "초효: 현재 상황의 시작점과 기초를 점검한다.",
  "이효: 관계와 협업의 균형을 확인한다.",
  "삼효: 과속보다 리스크 관리에 집중한다.",
  "사효: 전환 구간에서 작은 실험을 우선한다.",
  "오효: 핵심 원칙을 지키며 실행 강도를 높인다.",
  "상효: 마무리와 다음 단계 연결을 준비한다.",
];

export const HEXAGRAMS: Hexagram[] = Array.from({ length: 64 }, (_, i) => {
  const id = i + 1;
  const custom = base[id] ?? {};

  return {
    id,
    nameKo: custom.nameKo ?? `제${id}괘`,
    nameEn: custom.nameEn ?? `Hexagram ${id}`,
    summary: custom.summary ?? "학습용 요약 준비 중. 핵심 구조와 맥락 중심으로 제공됩니다.",
    keywords: custom.keywords ?? ["학습", "구조", "해석"],
    lines: custom.lines ?? fallbackLines,
  };
});

export const findHexagram = (id: number) => HEXAGRAMS.find((h) => h.id === id);
