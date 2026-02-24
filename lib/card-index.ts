import cardIndex from "@/data/card_index.json";
import { findHexagram } from "@/data/hexagrams";

type CardSeed = {
  id: number;
  short_name?: string;
  full_name?: string;
  trigram_pair?: string;
  one_liner?: string;
  keywords?: string[];
  card_image?: string;
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

const byId = new Map<number, CardSeed>((cardIndex as CardSeed[]).map((c) => [c.id, c]));

function firstSentence(text: string) {
  const t = text?.trim() ?? "";
  if (!t) return "핵심 요약 준비 중";
  const split = t.split(/[.!?。]/)[0]?.trim();
  return split || t;
}

export function getCardForHexagram(id: number): HexagramCard {
  const base = findHexagram(id);
  const seed = byId.get(id);

  const summary = base?.summary ?? "핵심 요약 준비 중";

  return {
    id,
    short_name: seed?.short_name ?? base?.nameKo ?? `제${id}괘`,
    full_name: seed?.full_name,
    trigram_pair: seed?.trigram_pair,
    one_liner: seed?.one_liner ?? firstSentence(summary),
    keywords: seed?.keywords ?? base?.keywords ?? ["학습", "해석"],
    card_image: seed?.card_image ?? "/cards/placeholder.png",
  };
}

export function toPublicAsset(src: string) {
  if (process.env.NODE_ENV === "production") return `/iching-learning-web${src}`;
  return src;
}
