# Corpus Import Guide (Gemini Deep Research)

## 1) 입력 파일 준비

- 템플릿 복사:
  - `reports/corpus_input.template.json` -> `reports/corpus_input.json`
- Gemini 결과를 템플릿 스키마에 맞춰 `hexagrams[]`에 붙여넣기

## 2) 변환 실행

```bash
npm run corpus:import
```

생성 파일:
- `data/hexagram_corpus.generated.json`

## 3) 앱 반영

`getHexagramCorpus()`는 generated JSON을 우선 사용하고,
없으면 기존 `pro_tracks` 데이터를 fallback으로 사용합니다.

## 4) 주의

- `id`: 1~64
- `lines[].line_no`: 1~6
- 의역/직역 분리 유지
- 불확실 구절은 `ambiguities`에 명시
