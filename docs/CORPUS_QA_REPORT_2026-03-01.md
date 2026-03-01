# CORPUS QA REPORT — 2026-03-01

## Scope
- Target: `data/hexagram_corpus.generated.json`
- Coverage: 64 hexagrams, each with 6 lines
- Fields checked:
  - Gua: `original`, `reading_ko`, `literal_ko`, `interpretive_ko`
  - Line: `label_hanja`, `label_ko`, `original`, `reading_ko`, `literal_ko`, `interpretive_ko`

## Automated QA Checks
1. Empty field detection
2. Line count per hexagram (`== 6`)
3. `line_no` sequence consistency (1..6)
4. ASCII/romanization residue detection
5. Double-space and obvious formatting residue

## Result Summary
- Empty field issues: **0**
- Line count issues: **0**
- `line_no` mismatch: **0**
- ASCII residue: **0**
- Formatting residue: **0**

## Build/Validation
- `npm run -s corpus:validate` ✅
- `npm run -s build` ✅

## Conclusion
Current corpus is structurally consistent for production display with the agreed format:
- Hanja original
- Korean reading
- Standard interpretation
- Modern interpretation

Remaining quality work (optional): phrase-level theological/philological refinement by tradition (왕필/정이/주희 비교 주석) for scholarly mode.
