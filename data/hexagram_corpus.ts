import { getHexagramTrack } from "@/data/pro_tracks";
import generated from "@/data/hexagram_corpus.generated.json";

export type HexagramLineCorpus = {
  line_no: number;
  label_ko?: string;
  label_hanja?: string;
  original?: string;
  reading_ko?: string; // 한자 원문의 한글 독음(예: 潛龍勿用 -> 잠룡물용)
  literal_ko?: string;
  interpretive_ko?: string;
  gloss_en?: string; // 글로벌 사용자용 짧은 영문 풀이
  notes?: string[];
  ambiguities?: string[];
};

export type HexagramCorpus = {
  id: number;
  gua_text: {
    original?: string;
    reading_ko?: string;
    literal_ko?: string;
    interpretive_ko?: string;
    gloss_en?: string;
    notes?: string[];
  };
  lines: HexagramLineCorpus[];
  core_terms?: Array<{ term: string; render: string; rationale?: string }>;
  risk_flags?: string[];
};

type CorpusJson = {
  meta?: { version?: string; updatedAt?: string | null };
  hexagrams?: HexagramCorpus[];
};

const corpusJson = generated as CorpusJson;
const byId = new Map<number, HexagramCorpus>((corpusJson.hexagrams ?? []).map((h) => [h.id, h]));

/**
 * v1: generated JSON 우선 + 기존 pro_tracks fallback.
 */
export function getHexagramCorpus(id: number): HexagramCorpus {
  const fromJson = byId.get(id);
  if (fromJson) return fromJson;

  const track = getHexagramTrack(id);

  return {
    id,
    gua_text: {
      original: track?.freePreview.classicalAnchor,
      literal_ko: track?.freePreview.plainMeaning,
      interpretive_ko: track?.freePreview.modernTeaser,
    },
    lines: [],
    core_terms: [],
    risk_flags: [],
  };
}
