const KO_TRANSLATIONS: Record<string, string> = {
  "元亨利貞": "크게 형통하고, 바름을 지키는 것이 이롭다.",
  "坤元亨利牝馬之貞": "곤은 크게 형통하며, 암말의 곧은 덕을 지키는 것이 이롭다.",
  "潛龍勿用": "잠룡이니, 아직 쓰지 말라.",
  "見龍在田利見大人": "밭에 나타난 용이니, 큰 사람을 만남이 이롭다.",
  "君子終日乾乾夕惕若厲无咎": "군자가 종일 힘쓰고 저녁에도 삼가면 위태로워도 허물이 없다.",
  "或躍在淵无咎": "혹 뛰어오르거나 못에 있으니, 허물이 없다.",
  "飛龍在天利見大人": "하늘을 나는 용이니, 큰 사람을 만남이 이롭다.",
  "亢龍有悔": "지나치게 오른 용은 후회가 있다.",
};

function looksKorean(text: string) {
  return /[가-힣]/.test(text);
}

export function getClassicalAnchorTranslation(anchor?: string, locale: "ko" | "en" = "ko") {
  if (!anchor) return "";
  if (locale === "en") return "Translation pending.";
  if (looksKorean(anchor)) return anchor;
  return KO_TRANSLATIONS[anchor] ?? "한국어 번역 준비중";
}
