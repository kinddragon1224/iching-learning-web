import { getHexagramTrack } from "@/data/pro_tracks";

export type HexagramLineCorpus = {
  line_no: number;
  label_ko?: string;
  label_hanja?: string;
  original?: string;
  literal_ko?: string;
  interpretive_ko?: string;
  notes?: string[];
  ambiguities?: string[];
};

export type HexagramCorpus = {
  id: number;
  gua_text: {
    original?: string;
    literal_ko?: string;
    interpretive_ko?: string;
    notes?: string[];
  };
  lines: HexagramLineCorpus[];
  core_terms?: Array<{ term: string; render: string; rationale?: string }>;
  risk_flags?: string[];
};

/**
 * v1: pro_tracks 데이터를 corpus 스키마로 어댑팅.
 * v2부터는 Gemini Deep Research 산출(JSON)로 lines/core_terms/risk_flags를 채우면 됨.
 */
export function getHexagramCorpus(id: number): HexagramCorpus {
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
