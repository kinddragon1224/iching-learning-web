export type HexagramAliasOverride = {
  id: number;
  full_name_ko?: string;
  trigram_pair_ko?: string;
  extra_aliases?: string[];
};

export const HEXAGRAM_ALIAS_OVERRIDES: HexagramAliasOverride[] = [
  {
    id: 25,
    full_name_ko: "천뢰무망",
    trigram_pair_ko: "천뢰",
    extra_aliases: ["무망", "천뢰무망", "천뢰"],
  },
];
