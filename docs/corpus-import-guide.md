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

## 3) 검증 실행

```bash
npm run corpus:validate
```

- 64괘 개수
- 괘사 필드 누락
- 효사 line_no(1~6) 정합성
- 효사 6줄 완성 여부

검증 실패 시 콘솔에 상세 원인 출력

## 4) 운영 모니터링

- 웹에서 `/corpus` 접속하면 반영률 대시보드 확인 가능

## 5) 앱 반영

## 3) 앱 반영

`getHexagramCorpus()`는 generated JSON을 우선 사용하고,
없으면 기존 `pro_tracks` 데이터를 fallback으로 사용합니다.

## 4) 주의

- `id`: 1~64
- `lines[].line_no`: 1~6
- 의역/직역 분리 유지
- 불확실 구절은 `ambiguities`에 명시
