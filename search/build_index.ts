import { HEXAGRAMS } from "@/data/hexagrams";
import seedAliases from "@/search/hexagram_search_index.json";
import { HEXAGRAM_ALIAS_OVERRIDES } from "@/search/hexagram_alias_overrides";

export type HexagramSearchEntry = {
  id: number;
  nameKo: string;
  fullNameKo?: string;
  trigramPairKo?: string;
  aliases: string[];
};

function uniq(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

export function normalizeQuery(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\p{L}\p{N}#]/gu, "");
}

export function buildHexagramSearchIndex(): HexagramSearchEntry[] {
  const seedMap = new Map<number, string[]>((seedAliases ?? []).map((r) => [r.id, r.aliases]));
  const overrideMap = new Map(HEXAGRAM_ALIAS_OVERRIDES.map((o) => [o.id, o]));

  return HEXAGRAMS.map((h) => {
    const override = overrideMap.get(h.id);
    const seed = seedMap.get(h.id) ?? [];

    const aliases = uniq([
      String(h.id),
      `#${h.id}`,
      `${h.id}번`,
      `${h.id}괘`,
      h.nameKo,
      ...(override?.full_name_ko ? [override.full_name_ko] : []),
      ...(override?.trigram_pair_ko ? [override.trigram_pair_ko] : []),
      ...(override?.extra_aliases ?? []),
      ...seed,
    ]);

    return {
      id: h.id,
      nameKo: h.nameKo,
      fullNameKo: override?.full_name_ko,
      trigramPairKo: override?.trigram_pair_ko,
      aliases,
    };
  });
}

export function searchHexagrams(index: HexagramSearchEntry[], rawInput: string, limit = 5): HexagramSearchEntry[] {
  const q = normalizeQuery(rawInput);
  if (!q) return [];

  const scored = index
    .map((entry) => {
      const normalizedAliases = entry.aliases.map(normalizeQuery);
      const exact = normalizedAliases.some((a) => a === q);
      const partial = normalizedAliases.some((a) => a.includes(q));
      if (!exact && !partial) return null;

      const distance = Math.abs(entry.id - Number(q.replace(/[^0-9]/g, "") || entry.id));
      const score = exact ? 0 : partial ? 1 : 2;
      return { entry, score, distance };
    })
    .filter((x): x is { entry: HexagramSearchEntry; score: number; distance: number } => Boolean(x));

  return scored
    .sort((a, b) => a.score - b.score || a.distance - b.distance || a.entry.id - b.entry.id)
    .slice(0, limit)
    .map((s) => s.entry);
}
