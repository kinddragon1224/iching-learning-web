import Link from "next/link";
import { notFound } from "next/navigation";
import { HEXAGRAMS, findHexagram } from "@/data/hexagrams";
import { getCardForHexagram, getHexagramContent } from "@/lib/card-index";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";
import { getHexagramTrack } from "@/data/pro_tracks";
import { getHexagramCorpus } from "@/data/hexagram_corpus";

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

const AXIS_LABEL = { money: "돈", work: "일", relation: "관계", time: "시간" } as const;

function toClassicalLineLabel(label?: string, idx?: number) {
  const map: Record<string, string> = {
    "초구": "初九",
    "초육": "初六",
    "구이": "九二",
    "육이": "六二",
    "구삼": "九三",
    "육삼": "六三",
    "구사": "九四",
    "육사": "六四",
    "구오": "九五",
    "육오": "六五",
    "상구": "上九",
    "상육": "上六",
    "초효": "初爻",
    "이효": "二爻",
    "삼효": "三爻",
    "사효": "四爻",
    "오효": "五爻",
    "상효": "上爻",
  };

  if (label && map[label]) return map[label];
  const fallback = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
  return fallback[idx ?? 0] ?? "爻";
}

export default async function HexagramCardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  const hex = findHexagram(id);
  if (!hex) return notFound();

  const card = getCardForHexagram(id);
  const content = getHexagramContent(id);
  const primaryAxis = getPrimaryAxisById(id) ?? "work";
  const track = getHexagramTrack(id);
  const corpus = getHexagramCorpus(id);
  const prevId = id > 1 ? id - 1 : 64;
  const nextId = id < 64 ? id + 1 : 1;

  const related = HEXAGRAMS
    .filter((h) => h.id !== id)
    .map((h) => {
      const overlap = h.keywords.filter((k) => card.keywords.includes(k)).length;
      return { ...h, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap || Math.abs(a.id - id) - Math.abs(b.id - id))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-6 hex-from-studio">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/" className="underline">← 홈으로 돌아가기</Link>
        <Link href="/studio" className="underline">학습실험실로 가기</Link>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[rgba(198,163,92,0.35)] bg-[rgba(8,10,16,0.75)] hex-hero-pop">
        <div className="relative flex min-h-[360px] items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,178,106,0.08),transparent_58%)]" />
          <div className="relative z-10 rounded-full border border-[rgba(198,163,92,0.4)] px-10 py-8">
            <HexagramLinesOverlay lines={content.lines} size="medium" styleVariant="gold" />
          </div>
        </div>
      </section>

      <header>
        <h1 className="text-2xl font-bold">#{id} {card.full_name ?? card.short_name}</h1>
        <p className="text-[var(--text-muted)]">({card.short_name}){card.trigram_pair ? ` · ${card.trigram_pair}` : ""}</p>
        <span className="mt-2 inline-block rounded-full border px-2 py-0.5 text-xs">{AXIS_LABEL[primaryAxis]}</span>
        <p className="mt-2">{content.summary}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {card.keywords.slice(0, 3).map((k) => (
            <span key={k} className="rounded-full border px-2 py-0.5">#{k}</span>
          ))}
        </div>
      </header>

      {(track || corpus.gua_text.original) && (
        <section className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold">괘사</h2>
          {corpus.gua_text.original ? <p className="text-sm"><b>원문(한자):</b> {corpus.gua_text.original}</p> : null}
          <p className="text-sm"><b>한글 읽기:</b> {corpus.gua_text.reading_ko ?? card.full_name ?? card.short_name}</p>
          <p className="text-sm"><b>보편 해석:</b> {track?.freePreview.plainMeaning ?? content.summary}</p>
          <p className="text-sm text-[var(--text-muted)]"><b>현대 해석:</b> {track?.freePreview.modernTeaser ?? content.summary}</p>
        </section>
      )}

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-semibold">6효 (원문 · Ko · 보편/현대 해석)</h2>
        <ol className="space-y-2 text-sm">
          {(corpus.lines.length > 0 ? corpus.lines : content.lineTexts.map((line, idx) => ({
            line_no: idx + 1,
            original: toClassicalLineLabel(track?.linesKorean?.[idx], idx),
            reading_ko: undefined as string | undefined,
            gloss_en: undefined as string | undefined,
            label_ko: track?.linesKorean?.[idx],
            label_hanja: undefined as string | undefined,
            literal_ko: undefined as string | undefined,
            interpretive_ko: undefined as string | undefined,
          }))).map((row, idx) => {
            const lineLabel = row.label_ko ?? track?.linesKorean?.[idx] ?? `${idx + 1}효`;
            const koReading = row.reading_ko ?? lineLabel;
            const plainMeaning = row.literal_ko ?? content.lineTexts[idx];
            const modernMeaning = row.interpretive_ko && row.interpretive_ko !== row.literal_ko
              ? row.interpretive_ko
              : content.lineTexts[idx];

            const matched = (row.original ?? "").match(/^(初九|初六|九二|六二|九三|六三|九四|六四|九五|六五|上九|上六)[,：:\s]*(.*)$/);
            const lineHanja = row.label_hanja ?? matched?.[1] ?? (row.original ?? "");
            const lineOriginalBody = matched?.[2]?.trim() || "원문 준비 중";

            return (
              <li
                key={idx}
                className="rounded-lg bg-black/20 px-3 py-2 space-y-1 line-step-reveal"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <p><b>{lineHanja}</b> : {lineOriginalBody}</p>
                <p><b>{lineLabel}</b> {koReading}</p>
                <p><b>보편 해석:</b> {plainMeaning}</p>
                <p className="text-[var(--text-muted)]"><b>현대 해석:</b> {modernMeaning}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="rounded-xl border p-4 space-y-3">
        <h2 className="font-semibold">다른 괘 바로 보기</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href={`/hexagram/${prevId}`} className="rounded-lg border px-3 py-2">← 이전 괘 #{prevId}</Link>
          <Link href="/hexagrams" className="rounded-lg border px-3 py-2">전체 64괘 보기</Link>
          <Link href="/search" className="rounded-lg border px-3 py-2">검색으로 이동</Link>
          <Link href={`/hexagram/${nextId}`} className="rounded-lg border px-3 py-2">다음 괘 #{nextId} →</Link>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">관련 괘 추천</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {related.map((r) => (
              <Link key={r.id} href={`/hexagram/${r.id}`} className="rounded-lg border px-3 py-2">
                #{r.id} {r.nameKo}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
