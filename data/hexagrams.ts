export type Hexagram = {
  id: number;
  nameKo: string;
  nameEn: string;
  summary: string;
  keywords: string[];
  lines: string[];
  learningNotes?: string[];
  reflectionQuestions?: string[];
  faithGuide?: string;
};

const NAMES: Record<number, { ko: string; en: string; summary: string; keywords: string[] }> = {
  1: { ko: "건(乾)", en: "The Creative", summary: "창조와 주도의 힘을 바르게 운용하는 국면입니다.", keywords: ["창조", "주도", "책임"] },
  2: { ko: "곤(坤)", en: "The Receptive", summary: "수용과 협력으로 기반을 단단히 만드는 국면입니다.", keywords: ["수용", "협력", "기반"] },
  3: { ko: "둔(屯)", en: "Difficulty at the Beginning", summary: "초기 혼란 속에서 정렬과 준비가 필요한 시기입니다.", keywords: ["초기혼란", "정렬", "준비"] },
  4: { ko: "몽(蒙)", en: "Youthful Folly", summary: "질문과 학습으로 기초를 다져야 하는 시기입니다.", keywords: ["학습", "질문", "기초"] },
  5: { ko: "수(需)", en: "Waiting", summary: "조급함보다 준비와 인내가 유리한 시기입니다.", keywords: ["대기", "축적", "인내"] },
  6: { ko: "송(訟)", en: "Conflict", summary: "분쟁은 감정보다 기준과 문서로 풀어야 합니다.", keywords: ["분쟁", "기준", "합의"] },
  7: { ko: "사(師)", en: "The Army", summary: "조직과 규율로 실행력을 세워야 하는 시기입니다.", keywords: ["조직", "규율", "리더십"] },
  8: { ko: "비(比)", en: "Holding Together", summary: "올바른 기준으로 관계를 맺고 연대해야 합니다.", keywords: ["연결", "협력", "신뢰"] },
  9: { ko: "소축(小畜)", en: "The Taming Power of the Small", summary: "작은 축적이 큰 변화를 준비하는 시기입니다.", keywords: ["축적", "절제", "타이밍"] },
  10: { ko: "리(履)", en: "Treading", summary: "태도와 절차를 지키는 것이 리스크를 줄입니다.", keywords: ["예절", "질서", "주의"] },
  11: { ko: "태(泰)", en: "Peace", summary: "흐름이 트이지만 기본 질서를 유지해야 합니다.", keywords: ["순환", "소통", "확장"] },
  12: { ko: "비(否)", en: "Standstill", summary: "막힘의 때에는 내부 정비가 우선입니다.", keywords: ["정체", "정비", "오해차단"] },
  13: { ko: "동인(同人)", en: "Fellowship", summary: "공통 목표 정렬이 협업 성과를 만듭니다.", keywords: ["연대", "공통목표", "협력"] },
  14: { ko: "대유(大有)", en: "Possession in Great Measure", summary: "성과가 커질수록 관리와 책임이 중요합니다.", keywords: ["풍요", "관리", "책임"] },
  15: { ko: "겸(謙)", en: "Modesty", summary: "겸손과 균형이 지속 가능한 성과를 만듭니다.", keywords: ["겸손", "균형", "조정"] },
  16: { ko: "예(豫)", en: "Enthusiasm", summary: "의욕은 준비된 실행 구조와 함께 가야 합니다.", keywords: ["동기", "준비", "시동"] },
  17: { ko: "수(隨)", en: "Following", summary: "흐름을 따르되 기준을 잃지 않는 것이 핵심입니다.", keywords: ["따름", "정렬", "기준"] },
  18: { ko: "고(蠱)", en: "Work on the Decayed", summary: "누적된 문제를 수리하고 바로잡아야 하는 시기입니다.", keywords: ["정비", "수리", "개선"] },
  19: { ko: "림(臨)", en: "Approach", summary: "현장에 가까이 가는 리더십이 필요한 시기입니다.", keywords: ["접근", "돌봄", "리더십"] },
  20: { ko: "관(觀)", en: "Contemplation", summary: "관찰과 성찰로 판단의 질을 높여야 합니다.", keywords: ["관찰", "성찰", "분별"] },
  21: { ko: "서합(噬嗑)", en: "Biting Through", summary: "막힌 문제를 정면으로 처리해야 흐름이 열립니다.", keywords: ["병목", "해결", "집행"] },
  22: { ko: "비(賁)", en: "Grace", summary: "표현은 본질을 살리는 방향이어야 합니다.", keywords: ["표현", "미학", "본질"] },
  23: { ko: "박(剝)", en: "Splitting Apart", summary: "축소와 보존 전략이 필요한 시기입니다.", keywords: ["축소", "보존", "재정비"] },
  24: { ko: "복(復)", en: "Return", summary: "복귀와 재시작의 리듬을 만드는 시기입니다.", keywords: ["복귀", "재시작", "회복"] },
  25: { ko: "무망(无妄)", en: "Innocence", summary: "요령보다 정직한 실행이 길을 만듭니다.", keywords: ["정직", "순수", "기준"] },
  26: { ko: "대축(大畜)", en: "Great Taming", summary: "확장 전 자원과 실력을 축적해야 합니다.", keywords: ["축적", "억제", "준비"] },
  27: { ko: "이(頤)", en: "Nourishment", summary: "무엇을 입력하고 말하는지가 성과를 좌우합니다.", keywords: ["양육", "입력", "습관"] },
  28: { ko: "대과(大過)", en: "Preponderance of the Great", summary: "과부하 구간에서는 구조 보강이 먼저입니다.", keywords: ["과부하", "보강", "재설계"] },
  29: { ko: "감(坎)", en: "The Abysmal", summary: "반복 위험은 원칙과 루틴으로 통과해야 합니다.", keywords: ["위험", "통과", "원칙"] },
  30: { ko: "리(離)", en: "The Clinging", summary: "밝은 기준이 의사결정의 정확도를 높입니다.", keywords: ["밝음", "기준", "통찰"] },
  31: { ko: "함(咸)", en: "Influence", summary: "감응과 공명을 건강한 경계와 함께 다뤄야 합니다.", keywords: ["감응", "공명", "경계"] },
  32: { ko: "항(恒)", en: "Duration", summary: "지속 가능한 루틴을 세워야 성과가 이어집니다.", keywords: ["지속", "루틴", "안정"] },
  33: { ko: "둔(遯)", en: "Retreat", summary: "전략적 후퇴로 핵심을 지키는 시기입니다.", keywords: ["후퇴", "재배치", "보존"] },
  34: { ko: "대장(大壯)", en: "Great Power", summary: "강함을 절제하며 바르게 써야 하는 시기입니다.", keywords: ["강함", "절제", "책임"] },
  35: { ko: "진(晉)", en: "Progress", summary: "점진적 전진과 명확한 평가가 필요한 시기입니다.", keywords: ["진전", "평가", "성장"] },
  36: { ko: "명이(明夷)", en: "Darkening of the Light", summary: "내면의 빛을 지키며 손실을 줄여야 합니다.", keywords: ["보호", "인내", "내면"] },
  37: { ko: "가인(家人)", en: "The Family", summary: "역할과 규칙이 관계의 질을 만듭니다.", keywords: ["가정", "역할", "질서"] },
  38: { ko: "규(睽)", en: "Opposition", summary: "차이를 인정하고 공통분모를 찾아야 합니다.", keywords: ["차이", "대립", "조율"] },
  39: { ko: "건(蹇)", en: "Obstruction", summary: "막힘을 우회하거나 지원을 구해야 하는 시기입니다.", keywords: ["장애", "우회", "지원"] },
  40: { ko: "해(解)", en: "Deliverance", summary: "긴장을 풀고 문제를 해소하는 시기입니다.", keywords: ["해소", "완화", "회복"] },
  41: { ko: "손(損)", en: "Decrease", summary: "과잉을 줄여 본질을 살려야 합니다.", keywords: ["감소", "절제", "핵심"] },
  42: { ko: "익(益)", en: "Increase", summary: "올바른 배분으로 성장 여력을 키우는 시기입니다.", keywords: ["증가", "배분", "성장"] },
  43: { ko: "쾌(夬)", en: "Breakthrough", summary: "결단이 필요하되 기준과 책임이 동반돼야 합니다.", keywords: ["결단", "돌파", "책임"] },
  44: { ko: "구(姤)", en: "Coming to Meet", summary: "강한 만남은 경계를 세우며 다뤄야 합니다.", keywords: ["만남", "경계", "주의"] },
  45: { ko: "췌(萃)", en: "Gathering Together", summary: "모으는 힘은 목적과 규칙이 있을 때 커집니다.", keywords: ["집결", "연대", "목적"] },
  46: { ko: "승(升)", en: "Pushing Upward", summary: "꾸준한 상승은 단계적 실행에서 나옵니다.", keywords: ["상승", "단계", "꾸준함"] },
  47: { ko: "곤(困)", en: "Oppression", summary: "제약 구간에서는 자원 재배치가 핵심입니다.", keywords: ["제약", "압박", "재배치"] },
  48: { ko: "정(井)", en: "The Well", summary: "근본 자원을 정비해 지속성을 높여야 합니다.", keywords: ["자원", "기반", "공유"] },
  49: { ko: "혁(革)", en: "Revolution", summary: "변화는 타이밍과 정당성을 갖춰야 합니다.", keywords: ["변혁", "타이밍", "정당성"] },
  50: { ko: "정(鼎)", en: "The Cauldron", summary: "가치를 조리해 문화를 만드는 시기입니다.", keywords: ["전환", "문화", "가치"] },
  51: { ko: "진(震)", en: "The Arousing", summary: "충격 이후 빠른 복구와 재정렬이 필요합니다.", keywords: ["충격", "각성", "재시동"] },
  52: { ko: "간(艮)", en: "Keeping Still", summary: "멈춤과 경계로 과열을 낮추는 시기입니다.", keywords: ["정지", "경계", "회복"] },
  53: { ko: "점(漸)", en: "Development", summary: "점진적 발전은 순서를 지킬 때 안정적입니다.", keywords: ["점진", "순서", "발전"] },
  54: { ko: "귀매(歸妹)", en: "The Marrying Maiden", summary: "결합 전 구조와 조건 정렬이 우선입니다.", keywords: ["결합", "조건", "정렬"] },
  55: { ko: "풍(豐)", en: "Abundance", summary: "풍성한 때일수록 관리 체계가 필요합니다.", keywords: ["풍성", "관리", "균형"] },
  56: { ko: "려(旅)", en: "The Wanderer", summary: "임시 국면에서는 원칙과 적응이 함께 필요합니다.", keywords: ["이동", "적응", "원칙"] },
  57: { ko: "손(巽)", en: "The Gentle", summary: "부드러운 침투와 반복 개선이 유효한 시기입니다.", keywords: ["스며듦", "지속", "개선"] },
  58: { ko: "태(兌)", en: "The Joyous", summary: "소통과 기쁨을 실행으로 연결해야 합니다.", keywords: ["기쁨", "소통", "교류"] },
  59: { ko: "환(渙)", en: "Dispersion", summary: "흩어진 에너지를 다시 모아야 하는 시기입니다.", keywords: ["분산", "집중", "재결집"] },
  60: { ko: "절(節)", en: "Limitation", summary: "건강한 한계 설정이 성과를 지켜줍니다.", keywords: ["제한", "규칙", "절도"] },
  61: { ko: "중부(中孚)", en: "Inner Truth", summary: "진실성과 신뢰가 관계를 안정시킵니다.", keywords: ["진실", "신뢰", "내면"] },
  62: { ko: "소과(小過)", en: "Preponderance of the Small", summary: "큰 도약보다 작은 정밀 조정이 맞는 시기입니다.", keywords: ["소폭조정", "정밀", "주의"] },
  63: { ko: "기제(既濟)", en: "After Completion", summary: "완료 후 점검과 유지가 핵심입니다.", keywords: ["마무리", "점검", "유지"] },
  64: { ko: "미제(未濟)", en: "Before Completion", summary: "마지막 단계일수록 검증과 절제가 필요합니다.", keywords: ["미완", "조심", "다음단계"] },
};

const fallbackLines = [
  "초효: 현재 상황의 시작점과 기초를 점검합니다.",
  "이효: 관계와 협업의 균형을 확인합니다.",
  "삼효: 과속보다 리스크 관리에 집중합니다.",
  "사효: 전환 구간에서 작은 실험을 우선합니다.",
  "오효: 핵심 원칙을 지키며 실행 강도를 높입니다.",
  "상효: 마무리와 다음 단계 연결을 준비합니다.",
];

export const HEXAGRAMS: Hexagram[] = Array.from({ length: 64 }, (_, i) => {
  const id = i + 1;
  const n = NAMES[id];

  return {
    id,
    nameKo: n.ko,
    nameEn: n.en,
    summary: n.summary,
    keywords: n.keywords,
    lines: fallbackLines,
  };
});

export const findHexagram = (id: number) => HEXAGRAMS.find((h) => h.id === id);
